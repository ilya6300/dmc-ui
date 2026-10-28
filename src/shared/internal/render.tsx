import {
	cloneElement,
	createContext,
	createElement,
	forwardRef,
	Fragment,
	isValidElement,
	useContext,
	useMemo,
	useRef,
	type ComponentPropsWithoutRef,
	type CSSProperties,
	type ElementType,
	type ForwardedRef,
	type ForwardRefExoticComponent,
	type PropsWithoutRef,
	type ReactElement,
	type RefAttributes,
	type ReactNode,
} from "react";
import { cls } from "../lib/cls";

type AsProps = {
	as?: ElementType;
	to?: string;
};

export type ResolveAs = (props: AsProps) => ElementType | null | undefined;

function defaultResolveAs({ as, to }: AsProps): ElementType | undefined {
	return to ? "a" : as;
}

type RenderContextValue = {
	render: ResolveAs;
} & Record<string, unknown>;

const defaultContext: RenderContextValue = {
	render: defaultResolveAs,
};

const RenderContext = createContext<RenderContextValue>(defaultContext);

type StateFn<S, T> = (state: S, rest: object) => T;

export type RenderProps<S = unknown> = {
	as?: ElementType;
	to?: string;
	"if"?: (state: S) => boolean;
	children?: ReactNode | ((state: S) => ReactNode);
	className?: string | StateFn<S, string | undefined>;
	style?: CSSProperties | StateFn<S, CSSProperties | undefined>;
	id?: string;
	"aria-labelledby"?: string;
} & Record<string, unknown>;

export type PolymorphicProps<P, T extends ElementType> = Omit<
	P & Omit<ComponentPropsWithoutRef<T>, keyof P | "as"> & { as?: T },
	"ref"
>;

type RenderProviderProps = {
	children: ReactNode;
	render?: ResolveAs;
} & Record<string, unknown>;

function shallowEqual(
	left: Record<string, unknown>,
	right: Record<string, unknown>,
): boolean {
	const leftKeys = Object.keys(left);
	const rightKeys = Object.keys(right);
	if (leftKeys.length !== rightKeys.length) {
		return false;
	}
	for (const key of leftKeys) {
		if (left[key] !== right[key]) {
			return false;
		}
	}
	return true;
}

function contextDefaults(context: RenderContextValue): Record<string, unknown> {
	const defaults: Record<string, unknown> = {};
	for (const key of Object.keys(context)) {
		if (key === "render") {
			continue;
		}
		defaults[key] = context[key];
	}
	return defaults;
}

function keepsRenderCallback(component: ElementType): boolean {
	if (typeof component !== "object" || component === null) {
		return false;
	}
	return typeof (component as { render?: unknown }).render === "function";
}

function isRecord(value: unknown): value is Record<string, unknown> {
	return !!value && typeof value === "object" && !Array.isArray(value);
}

function classArg(value: unknown) {
	if (typeof value === "string" || typeof value === "number") {
		return value;
	}
	if (isRecord(value)) {
		return value;
	}
	return undefined;
}

function styleArg(value: unknown): CSSProperties | undefined {
	return isRecord(value) ? (value as CSSProperties) : undefined;
}

export function RenderProvider({
	children,
	render = defaultResolveAs,
	...defaults
}: RenderProviderProps) {
	const defaultsRef = useRef<Record<string, unknown>>(defaults);
	if (!shallowEqual(defaultsRef.current, defaults)) {
		defaultsRef.current = defaults;
	}
	const stableDefaults = defaultsRef.current;
	const value = useMemo<RenderContextValue>(
		() => ({ ...stableDefaults, render }),
		[stableDefaults, render],
	);

	return <RenderContext.Provider value={value}>{children}</RenderContext.Provider>;
}

export function useRenderContext(): RenderContextValue {
	return useContext(RenderContext);
}

type PolymorphicComponent<P, D extends ElementType> = ForwardRefExoticComponent<
	PropsWithoutRef<PolymorphicProps<P, D>> & RefAttributes<Element>
>;

export function forwardRefWithAs<P, D extends ElementType = "div">(
	component: (
		props: PolymorphicProps<P, D>,
		ref: ForwardedRef<Element>,
	) => ReactElement | null,
): PolymorphicComponent<P, D> {
	const named = component as typeof component & {
		displayName?: string;
		name?: string;
	};
	const Forwarded = forwardRef<Element, PolymorphicProps<P, D>>(
		component as never,
	) as PolymorphicComponent<P, D>;
	Forwarded.displayName = named.displayName ?? named.name;
	return Forwarded;
}

function resolveField(
	value: unknown,
	component: ElementType,
	state: unknown,
	rest: object,
): unknown {
	if (typeof value !== "function") {
		return value;
	}
	if (keepsRenderCallback(component)) {
		return (arg?: Record<string, unknown>) =>
			value({ ...arg, ...(isRecord(state) ? state : {}) }, rest);
	}
	return value(isRecord(state) ? state : {}, rest);
}

/**
 * Вызывать безусловно из рендера компонента: внутри читается контекст.
 */
export function render<S = unknown>(
	tag: ElementType,
	props: RenderProps<S>,
	state?: S,
): ReactNode {
	const context = useRenderContext();
	const resolve = context.render ?? defaultResolveAs;
	const merged: Record<string, unknown> = {
		...contextDefaults(context),
		...props,
		as: resolve(props),
	};
	const resolvedAs = merged.as as ElementType | null | undefined;
	const children = merged.children as RenderProps<S>["children"];
	const when = merged.if as ((state: S) => boolean) | undefined;
	const rest: Record<string, unknown> = { ...merged };
	delete rest.as;
	delete rest.children;
	delete rest.if;
	delete rest.render;

	if (when?.(state as S) === false) {
		return null;
	}

	const Component = resolvedAs === undefined ? tag : resolvedAs;
	if (!Component) {
		return null;
	}

	const resolved: Record<string, unknown> = { ...rest };
	for (const key of ["className", "style"] as const) {
		if (key in rest && rest[key] && typeof rest[key] === "function") {
			resolved[key] = resolveField(rest[key], Component, state, rest);
		}
	}

	if (
		resolved["aria-labelledby"] &&
		resolved["aria-labelledby"] === resolved.id
	) {
		delete resolved["aria-labelledby"];
	}

	const resolvedChildren =
		typeof children === "function" ? children(state as S) : children;

	if (Component === Fragment) {
		if (!isValidElement(resolvedChildren)) {
			return resolvedChildren;
		}

		const childProps = (resolvedChildren.props ?? {}) as Record<string, unknown>;
		const childClass = classArg(
			typeof childProps.className === "function"
				? childProps.className(state, resolved.className)
				: childProps.className,
		);
		const childStyle = styleArg(
			typeof childProps.style === "function"
				? childProps.style(state, resolved.style)
				: childProps.style,
		);
		const parentStyle = styleArg(resolved.style);
		const className = cls(childClass, classArg(resolved.className));
		const style = { ...childStyle, ...parentStyle };
		const { className: _className, style: _style, ...restProps } = resolved;
		const patch: Record<string, unknown> = { ...restProps };
		if (className) {
			patch.className = className;
		}
		if (Object.keys(style).length > 0) {
			patch.style = style;
		}

		return cloneElement(resolvedChildren, patch);
	}

	return createElement(Component, resolved, resolvedChildren);
}

render.displayName = "internal/render";
