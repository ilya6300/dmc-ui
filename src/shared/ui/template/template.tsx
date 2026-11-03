import {
  cloneElement,
  isValidElement,
  useId,
  useLayoutEffect,
  useRef,
  type ReactElement,
  type ReactNode,
} from "react";
import { templateStore, useTemplateSlot, useTemplateVersion } from "../../context/template";

type TemplateProps = {
  slot?: string;
  children?: ReactNode;
  [key: string]: unknown;
};

const MAX_DEPTH = 3;

function propToken(value: unknown): string {
  if (value == null || typeof value === "boolean") return String(value);
  if (typeof value === "string" || typeof value === "number") return String(value);
  if (typeof value === "function") return "[fn]";
  if (Array.isArray(value)) return "[arr]";
  if (typeof value === "object") return "[obj]";
  return String(value);
}

function isSkippedProp(key: string): boolean {
  return key === "ref" || key === "_owner" || key === "children";
}

function propsToken(props: Record<string, unknown>): string {
  const keys = Object.keys(props);
  keys.sort();
  let out = "";
  for (const key of keys) {
    if (isSkippedProp(key)) continue;
    out += `${key}=${propToken(props[key])};`;
  }
  return out;
}

function samePrimitiveProps(
  prev: Record<string, unknown>,
  next: Record<string, unknown>,
): boolean {
  const prevKeys = Object.keys(prev).filter((key) => !isSkippedProp(key));
  const nextKeys = Object.keys(next).filter((key) => !isSkippedProp(key));
  if (prevKeys.length !== nextKeys.length) return false;
  for (const key of nextKeys) {
    if (!Object.hasOwn(prev, key)) return false;
    const left = prev[key];
    const right = next[key];
    if (left === right) continue;
    if (propToken(left) !== propToken(right)) return false;
  }
  return true;
}

function contentToken(node: ReactNode, depth = 0): string {
  if (depth > MAX_DEPTH) return "[deep]";
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) {
    let out = "";
    for (const item of node) {
      out += `${contentToken(item, depth + 1)}|`;
    }
    return out;
  }
  if (isValidElement(node)) {
    const element = node as ReactElement<Record<string, unknown>>;
    const type = element.type;
    let name = "Component";
    if (typeof type === "string") name = type;
    else if (typeof type === "function") {
      const fn = type as { displayName?: string; name?: string };
      name = fn.displayName || fn.name || "Component";
    }
    return `${name}:${propsToken(element.props)}>${contentToken(element.props.children as ReactNode, depth + 1)}`;
  }
  return "?";
}

function namedSlot(slot: string) {
  return function NamedTemplate({ children }: { children?: ReactNode }) {
    return <Template slot={slot}>{children}</Template>;
  };
}

export function Template({ slot = "default", children, ...props }: TemplateProps) {
  const owner = useId();
  const cacheRef = useRef<{ node: ReactNode; key: string }>({ node: undefined, key: "" });
  const propsCacheRef = useRef<{ snapshot: Record<string, unknown>; token: string }>({
    snapshot: {},
    token: "",
  });

  let childKey: string;
  if (cacheRef.current.node === children) {
    childKey = cacheRef.current.key;
  } else {
    childKey = contentToken(children);
    cacheRef.current = { node: children, key: childKey };
  }

  let propKey = propsCacheRef.current.token;
  if (!samePrimitiveProps(propsCacheRef.current.snapshot, props)) {
    propKey = propsToken(props);
    propsCacheRef.current = { snapshot: props, token: propKey };
  }
  const contentKey = `${propKey}#${childKey}`;

  const propsRef = useRef(props);
  propsRef.current = props;
  const childrenRef = useRef(children);
  childrenRef.current = children;

  useLayoutEffect(() => {
    return () => {
      templateStore.unregister(slot, owner);
    };
  }, [slot, owner]);

  useLayoutEffect(() => {
    const current = childrenRef.current;
    const element = isValidElement(current)
      ? cloneElement(current, { key: owner, ...propsRef.current })
      : current;
    templateStore.register(slot, element, contentKey, owner);
  }, [slot, contentKey, owner]);

  return null;
}

Template.Slot = ({
  name = "default",
  children,
  ...slotProps
}: {
  name?: string;
  children?: ReactNode;
  [key: string]: unknown;
}) => {
  const template = useTemplateSlot(name);
  const resolved = template ?? children;

  if (typeof resolved === "function") {
    return (resolved as (props: Record<string, unknown>) => ReactNode)(slotProps);
  }

  if (!isValidElement(resolved)) {
    return <>{resolved}</>;
  }

  if (Object.keys(slotProps).length === 0) {
    return resolved;
  }

  return cloneElement(resolved, { ...slotProps, key: resolved.key });
};

Template.use = () => {
  useTemplateVersion();
  return {
    get: (slotName: string): ReactNode => templateStore.getSlot(slotName),
    has: (slotName: string): boolean => templateStore.getSlot(slotName) != null,
  };
};

Template.Has = ({ name, children }: { name: string; children: ReactNode }) => {
  const template = useTemplateSlot(name);
  return template ? children : null;
};

Template.Title = namedSlot("title");
Template.Header = namedSlot("header");
Template.Footer = namedSlot("footer");
