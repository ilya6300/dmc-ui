import type { CSSProperties, ReactElement, ReactNode } from "react";
import { cls } from "../lib/cls";
import { forwardRefWithAs } from "./render";
import styles from "./sections.module.css";
import { Unstyled, type Align, type Justify } from "./unstyled";

const SIZES = {
	xs: { p: "4px", gap: 4, fz: 12, lh: "1.33" },
	s: { p: "4px 8px", gap: 8, fz: 14, lh: "1.25" },
	l: { p: "12px 16px", gap: 16, fz: 18, lh: "1.55" },
	xl: { p: "12px 16px", gap: 16, fz: 20, lh: "1.4" },
} as const;

type SectionsProps = {
	className?: string | ((state: object) => string | undefined);
	bodyClass?: string;
	noPadding?: boolean;
	col?: boolean;
	row?: boolean;
	noWrap?: boolean;
	dense?: boolean;
	square?: boolean;
	size?: keyof typeof SIZES;
	align?: Align;
	justify?: Justify;
	children?: ReactNode;
	leftSection?: ReactNode;
	rightSection?: ReactNode;
	style?: CSSProperties;
};

function metrics({
	dense,
	size,
	noPadding,
}: Pick<SectionsProps, "dense" | "size" | "noPadding">) {
	let p: string | number = "8px 12px";
	let gap: string | number = 12;
	let fz: number | undefined;
	let lh: string | undefined;
	if (dense) {
		p = "4px 8px";
		gap = 8;
	}
	if (size) {
		const sized = SIZES[size];
		p = sized.p;
		gap = sized.gap;
		fz = sized.fz;
		lh = sized.lh;
	}
	if (noPadding) {
		p = 0;
		gap = 0;
	}
	return { p, gap, fz, lh };
}

function side(section: ReactNode) {
	if (!section) {
		return null;
	}
	return (
		<Unstyled
			as="span"
			className={styles.side}
			d="flex"
			wrap="wrap"
			pos="relative"
			dir="column"
			align="center"
			justify="center"
		>
			{section}
		</Unstyled>
	);
}

/** Строка или колонка с телом и боковыми секциями. */
export const Sections = forwardRefWithAs<SectionsProps>(function Sections(
	{
		className,
		bodyClass,
		noPadding,
		col,
		row,
		noWrap,
		dense,
		square,
		size,
		align,
		justify,
		children,
		leftSection,
		rightSection,
		style,
		...props
	},
	ref,
) {
	const sized = metrics({ dense, size, noPadding });
	const rootClassName = cls(typeof className === "function" ? className({}) : className);

	const body = children ? (
		<Unstyled
			as="span"
			className={bodyClass}
			d="flex"
			wrap="wrap"
			pos="relative"
			dir={row ? "row" : "column"}
			align={align ?? "start"}
			justify={justify ?? "center"}
			flex="1 1 auto"
		>
			{children}
		</Unstyled>
	) : null;

	return (
		<Unstyled
			{...props}
			ref={ref}
			d="flex"
			wrap={noWrap ? "nowrap" : "wrap"}
			dir={col ? "column" : undefined}
			pos="relative"
			p={sized.p}
			gap={sized.gap}
			fz={sized.fz}
			lh={sized.lh}
			className={rootClassName || undefined}
			style={{ borderRadius: square ? 0 : 4, ...style }}
		>
			{side(leftSection)}
			{body}
			{side(rightSection)}
		</Unstyled>
	) as ReactElement;
});

Sections.displayName = "internal/Sections";
