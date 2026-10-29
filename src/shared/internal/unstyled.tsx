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
	{ key: "l", query: "(min-width: 1024px)" },
	{ key: "m", query: "(min-width: 768px)" },
	{ key: "s", query: "(min-width: 640px)" },
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
	bd: "border",
	bg: "background",
	c: "color",
	align: "alignItems",
	justify: "justifyContent",
	wrap: "flexWrap",
	dir: "flexDirection",
	gap: "gap",
	flex: "flex",
} as const;

const ALIGNS = {
	start: "flex-start",
	center: "center",
	end: "flex-end",
	stretch: "stretch",
	baseline: "baseline",
	normal: "normal",
} as const;

const JUSTIFIES = {
	start: "flex-start",
	center: "center",
	end: "flex-end",
	between: "space-between",
	around: "space-around",
	evenly: "space-evenly",
	stretch: "stretch",
	baseline: "baseline",
	normal: "normal",
} as const;

const COLORS = {
	primary: "color-primary",
	secondary: "color-secondary",
	success: "color-success",
	warning: "color-warning",
	error: "color-error",
	surface: "color-surface",
} as const;

const SIZES = {
	base: "base",
	xs: "xs",
	s: "s",
	m: "m",
	l: "l",
	xl: "xl",
} as const;

const PADDING_PROPS = new Set<StyleProp>(["p", "px", "py", "pt", "pr", "pb", "pl"]);
const MARGIN_PROPS = new Set<StyleProp>(["m", "mx", "my", "mt", "mr", "mb", "ml"]);

export type Align = keyof typeof ALIGNS;
export type Justify = keyof typeof JUSTIFIES;
export type Color = keyof typeof COLORS;
export type Size = keyof typeof SIZES;

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
	s?: StyleValue;
	m?: StyleValue;
	l?: StyleValue;
	xl?: StyleValue;
};

type ColorValue = Color | (string & {}) | number;
type SizeValue = Size | (string & {}) | number;

type SpaceProp =
	| "p"
	| "px"
	| "py"
	| "pt"
	| "pr"
	| "pb"
	| "pl"
	| "m"
	| "mx"
	| "my"
	| "mt"
	| "mr"
	| "mb"
	| "ml"
	| "bd";

type UnstyledStyleProps = {
	[Key in Exclude<StyleProp, "align" | "justify" | "bg" | "c" | SpaceProp>]?: StyleValue | ResponsiveValue;
} & {
	align?: Align | ResponsiveOf<Align>;
	justify?: Justify | ResponsiveOf<Justify>;
	bg?: ColorValue | ResponsiveOf<ColorValue>;
	c?: ColorValue | ResponsiveOf<ColorValue>;
} & {
	[Key in SpaceProp]?: SizeValue | ResponsiveOf<SizeValue>;
};

type ResponsiveOf<T extends StyleValue> = {
	base?: T;
	xs?: T;
	s?: T;
	m?: T;
	l?: T;
	xl?: T;
};

type UnstyledProps = UnstyledStyleProps & {
	as?: ElementType;
	style?: CSSProperties;
	/** Имя в `--dmc-<prefix>-`. Без него переменные читаются как `--dmc-`. */
	prefix?: string;
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

function dmcVar(token: string, prefix?: string): string {
	const scope = prefix ? `${prefix}-` : "";
	return `var(--dmc-${scope}${token})`;
}

function keywordCss(prop: StyleProp, value: unknown, prefix?: string): unknown {
	if (typeof value !== "string") {
		return value;
	}
	if (prop === "align" && value in ALIGNS) {
		return ALIGNS[value as Align];
	}
	if (prop === "justify" && value in JUSTIFIES) {
		return JUSTIFIES[value as Justify];
	}
	if ((prop === "bg" || prop === "c") && value in COLORS) {
		return dmcVar(COLORS[value as Color], prefix);
	}
	if (value in SIZES) {
		if (PADDING_PROPS.has(prop)) {
			return dmcVar(`padding-${value}`, prefix);
		}
		if (MARGIN_PROPS.has(prop)) {
			return dmcVar(`margin-${value}`, prefix);
		}
		if (prop === "bd") {
			return dmcVar(`border-radius-${value}`, prefix);
		}
	}
	return value;
}

function toCss(prop: StyleProp, value: unknown, prefix?: string): string | undefined {
	const resolved = keywordCss(prop, value, prefix);
	if (resolved == null || resolved === false) {
		return undefined;
	}
	if (typeof resolved === "number") {
		return LENGTH_PROPS.has(prop) ? `${resolved}px` : String(resolved);
	}
	return String(resolved);
}

function shorthandStyle(
	props: Record<string, unknown>,
	active: ReadonlySet<string>,
	prefix?: string,
): CSSProperties {
	const style: Record<string, string> = {};
	for (const key of Object.keys(STYLE_PROPS) as StyleProp[]) {
		if (!(key in props)) {
			continue;
		}
		const cssValue = toCss(key, resolveResponsive(props[key], active), prefix);
		if (cssValue == null) {
			continue;
		}
		style[STYLE_PROPS[key]] = cssValue;
	}
	return style;
}

const EMPTY_BREAKPOINTS: ReadonlySet<string> = new Set();

function hasResponsiveStyle(props: object): boolean {
	const record = props as Record<string, unknown>;
	for (const key of Object.keys(STYLE_PROPS)) {
		if (key in record && isResponsive(record[key])) {
			return true;
		}
	}
	return false;
}

function paint(
	as: ElementType | undefined,
	props: Record<string, unknown>,
	style: CSSProperties | undefined,
	children: ReactNode,
	ref: ForwardedRef<Element>,
	active: ReadonlySet<string>,
	prefix?: string,
): ReactElement {
	const domProps: Record<string, unknown> = {};
	for (const key of Object.keys(props)) {
		if (!(key in STYLE_PROPS)) {
			domProps[key] = props[key];
		}
	}

	return render(as ?? "div", {
		...domProps,
		style: { ...shorthandStyle(props, active, prefix), ...style },
		children,
		ref,
	}) as ReactElement;
}

const StaticUnstyled = forwardRef(function StaticUnstyled(
	{ as, style, children, prefix, ...props }: UnstyledProps,
	ref: ForwardedRef<Element>,
) {
	return paint(as, props, style, children, ref, EMPTY_BREAKPOINTS, prefix);
});

const ResponsiveUnstyled = forwardRef(function ResponsiveUnstyled(
	{ as, style, children, prefix, ...props }: UnstyledProps,
	ref: ForwardedRef<Element>,
) {
	const active = useActiveBreakpoints();
	return paint(as, props, style, children, ref, active, prefix);
});

/** Короткий набор размеров, отступов и flex-свойств в inline-стилях. */
export const Unstyled = forwardRef(function Unstyled(
	props: UnstyledProps,
	ref: ForwardedRef<Element>,
) {
	if (hasResponsiveStyle(props)) {
		return <ResponsiveUnstyled {...props} ref={ref} />;
	}
	return <StaticUnstyled {...props} ref={ref} />;
});

Unstyled.displayName = "internal/Unstyled";
