import type { ReactElement, ReactNode } from "react";
import { cls } from "../lib/cls";
import { forwardRefWithAs, render } from "./render";
import styles from "./sections.module.css";

const SIZES = {
	xs: styles.xs,
	sm: styles.sm,
	lg: styles.lg,
	xl: styles.xl,
} as const;

const ALIGNS = {
	start: styles.alignStart,
	center: styles.alignCenter,
	end: styles.alignEnd,
	stretch: styles.alignStretch,
	baseline: styles.alignBaseline,
	normal: styles.alignNormal,
} as const;

const JUSTIFIES = {
	start: styles.justifyStart,
	center: styles.justifyCenter,
	end: styles.justifyEnd,
	between: styles.justifyBetween,
	around: styles.justifyAround,
	evenly: styles.justifyEvenly,
	stretch: styles.justifyStretch,
	baseline: styles.justifyBaseline,
	normal: styles.justifyNormal,
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
	align?: keyof typeof ALIGNS;
	justify?: keyof typeof JUSTIFIES;
	children?: ReactNode;
	leftSection?: ReactNode;
	rightSection?: ReactNode;
};

function side(section: ReactNode) {
	if (!section) {
		return null;
	}
	return <span className={cls(styles.section, styles.side)}>{section}</span>;
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
		...props
	},
	ref,
) {
	const rootClassName = cls(
		styles.box,
		col ? styles.col : undefined,
		dense ? styles.dense : undefined,
		square ? styles.square : undefined,
		noWrap ? styles.noWrap : undefined,
		noPadding ? styles.noPadding : undefined,
		size ? SIZES[size] : undefined,
		typeof className === "function" ? className({}) : className,
	);

	const bodyClassName = cls(
		styles.section,
		row ? styles.row : undefined,
		align ? ALIGNS[align] : undefined,
		justify ? JUSTIFIES[justify] : undefined,
		bodyClass,
	);

	return render("div", {
		...props,
		className: rootClassName,
		children: (
			<>
				{side(leftSection)}
				{children ? <span className={bodyClassName}>{children}</span> : null}
				{side(rightSection)}
			</>
		),
		ref,
	}) as ReactElement;
});

Sections.displayName = "internal/Sections";
