import {
	forwardRef,
	useEffect,
	useState,
	type CSSProperties,
	type ElementType,
	type ForwardedRef,
	type ReactElement,
	type ReactNode,
} from "react";
import { render } from "./render";

const BREAKPOINTS = [
	{ key: "xl", query: "(min-width: 1280px)" },
	{ key: "lg", query: "(min-width: 1024px)" },
	{ key: "md", query: "(min-width: 768px)" },
	{ key: "sm", query: "(min-width: 640px)" },
	{ key: "xs", query: "(min-width: 384px)" },
] as const;

const BREAKPOINT_KEYS = new Set<string>([
	"base",
	...BREAKPOINTS.map((item) => item.key),
]);

const STYLE_PROPS = {
	d: "display",
	w: "width",
	h: "height",
	p: "padding",
	px: "paddingInline",
	py: "paddingBlock",
	pt: "paddingTop",
	pr: "paddingRight",
	pb: "paddingBottom",
	pl: "paddingLeft",
	m: "margin",
	mx: "marginInline",
	my: "marginBlock",
	mt: "marginTop",
	mr: "marginRight",
	mb: "marginBottom",
	ml: "marginLeft",
	fz: "fontSize",
	lh: "lineHeight",
	maw: "maxWidth",
	mah: "maxHeight",
	miw: "minWidth",
	mih: "minHeight",
	pos: "position",
	inset: "inset",
	top: "top",
	right: "right",
	bottom: "bottom",
	left: "left",
	bg: "background",
	bd: "border",
	c: "color",
	align: "alignItems",
	justify: "justifyContent",
	wrap: "flexWrap",
	dir: "flexDirection",
	gap: "gap",
	flex: "flex",
} as const;

type StyleProp = keyof typeof STYLE_PROPS;

const LENGTH_PROPS = new Set<StyleProp>([
	"w",
	"h",
	"p",
	"px",
	"py",
	"pt",
	"pr",
	"pb",
	"pl",
	"m",
	"mx",
	"my",
	"mt",
	"mr",
	"mb",
	"ml",
	"fz",
	"lh",
	"maw",
	"mah",
	"miw",
	"mih",
	"inset",
	"top",
	"right",
	"bottom",
	"left",
	"gap",
]);

type StyleValue = string | number;
type ResponsiveValue = {
	base?: StyleValue;
	xs?: StyleValue;
	sm?: StyleValue;
	md?: StyleValue;
	lg?: StyleValue;
	xl?: StyleValue;
};

type UnstyledStyleProps = {
	[Key in StyleProp]?: StyleValue | ResponsiveValue;
};

type UnstyledProps = UnstyledStyleProps & {
	as?: ElementType;
	style?: CSSProperties;
	children?: ReactNode;
} & Record<string, unknown>;

function readActiveBreakpoints(): ReadonlySet<string> {
	const active = new Set<string>();
	if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
		return active;
	}
	for (const breakpoint of BREAKPOINTS) {
		if (window.matchMedia(breakpoint.query).matches) {
			active.add(breakpoint.key);
		}
	}
	return active;
}

function useActiveBreakpoints(): ReadonlySet<string> {
	const [active, setActive] = useState(readActiveBreakpoints);

	useEffect(() => {
		if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
			return;
		}
		const lists = BREAKPOINTS.map((breakpoint) => window.matchMedia(breakpoint.query));
		const update = () => {
			const next = readActiveBreakpoints();
			setActive((current) => {
				if (current.size === next.size && [...next].every((key) => current.has(key))) {
					return current;
				}
				return next;
			});
		};
		lists.forEach((list) => list.addEventListener("change", update));
		update();
		return () => {
			lists.forEach((list) => list.removeEventListener("change", update));
		};
	}, []);

	return active;
}

function isResponsive(value: unknown): value is ResponsiveValue {
	if (!value || typeof value !== "object" || Array.isArray(value)) {
		return false;
	}
	return Object.keys(value).some((key) => BREAKPOINT_KEYS.has(key));
}

function resolveResponsive(value: unknown, active: ReadonlySet<string>): unknown {
	if (!isResponsive(value)) {
		return value;
	}
	for (const breakpoint of BREAKPOINTS) {
		const next = value[breakpoint.key];
		if (active.has(breakpoint.key) && next != null) {
			return next;
		}
	}
	return value.base;
}

function toCss(prop: StyleProp, value: unknown): string | undefined {
	if (value == null || value === false) {
		return undefined;
	}
	if (typeof value === "number") {
		return LENGTH_PROPS.has(prop) ? `${value}px` : String(value);
	}
	return String(value);
}

function shorthandStyle(
	props: Record<string, unknown>,
	active: ReadonlySet<string>,
): CSSProperties {
	const style: Record<string, string> = {};
	for (const key of Object.keys(STYLE_PROPS) as StyleProp[]) {
		if (!(key in props)) {
			continue;
		}
		const cssValue = toCss(key, resolveResponsive(props[key], active));
		if (cssValue == null) {
			continue;
		}
		style[STYLE_PROPS[key]] = cssValue;
	}
	return style;
}

/** Короткий набор размеров, отступов и flex-свойств в inline-стилях. */
export const Unstyled = forwardRef(function Unstyled(
	{ as, style, children, ...props }: UnstyledProps,
	ref: ForwardedRef<Element>,
) {
	const active = useActiveBreakpoints();
	const domProps: Record<string, unknown> = {};
	for (const key of Object.keys(props)) {
		if (!(key in STYLE_PROPS)) {
			domProps[key] = props[key];
		}
	}

	return render(as ?? "div", {
		...domProps,
		style: { ...shorthandStyle(props, active), ...style },
		children,
		ref,
	}) as ReactElement;
});

Unstyled.displayName = "internal/Unstyled";
