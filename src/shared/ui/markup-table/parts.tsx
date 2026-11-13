import { forwardRef, type CSSProperties, type HTMLAttributes, type ReactNode, type TdHTMLAttributes, type ThHTMLAttributes } from "react";
import { Unstyled } from "../../internal";
import { cls } from "../../lib";
import { mergeStyle } from "../theme-context/tokens";

type Align = "start" | "center" | "end";

function alignClass(align?: Align) {
  if (align === "center") return "dmc-markup-table__align-center";
  if (align === "end") return "dmc-markup-table__align-end";
  return undefined;
}

export const MarkupTableContainer = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(function MarkupTableContainer(
  { children, ...rest },
  ref,
) {
  return (
    <div ref={ref} {...rest}>
      {children}
    </div>
  );
});

export const MarkupTableCaption = forwardRef<HTMLTableCaptionElement, HTMLAttributes<HTMLTableCaptionElement>>(
  function MarkupTableCaption({ className, children, ...rest }, ref) {
    return (
      <caption ref={ref} className={cls("dmc-markup-table__caption", className)} {...rest}>
        {children}
      </caption>
    );
  },
);

export const MarkupTableCellTitle = forwardRef<HTMLSpanElement, HTMLAttributes<HTMLSpanElement>>(function MarkupTableCellTitle(
  { className, children, ...rest },
  ref,
) {
  return (
    <span ref={ref} className={cls("dmc-markup-table__cell-title", className)} {...rest}>
      {children}
    </span>
  );
});

type Tint = {
  /** Фон: токен Unstyled (`surface`, `primary`, …) или CSS-цвет. */
  bg?: string;
  /** Цвет текста: токен Unstyled или CSS-цвет. */
  c?: string;
};

export const MarkupTableTable = forwardRef<HTMLTableElement, HTMLAttributes<HTMLTableElement> & Tint>(function MarkupTableTable(
  { className, children, bg, c, style, ...rest },
  ref,
) {
  return (
    <Unstyled
      {...rest}
      as="table"
      ref={ref}
      className={cls("dmc-markup-table__table", className)}
      bg={bg}
      c={c}
      style={style}
    >
      {children}
    </Unstyled>
  );
});

export const MarkupTableCol = forwardRef<HTMLTableColElement, HTMLAttributes<HTMLTableColElement>>(function MarkupTableCol(
  { className, ...rest },
  ref,
) {
  return <col ref={ref} className={cls("dmc-markup-table__col", className)} {...rest} />;
});

export const MarkupTableThead = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(function MarkupTableThead(
  { className, children, ...rest },
  ref,
) {
  return (
    <thead ref={ref} className={cls("dmc-markup-table__thead", className)} {...rest}>
      {children}
    </thead>
  );
});

export const MarkupTableTbody = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(function MarkupTableTbody(
  { className, children, ...rest },
  ref,
) {
  return (
    <tbody ref={ref} className={cls("dmc-markup-table__tbody", className)} {...rest}>
      {children}
    </tbody>
  );
});

export const MarkupTableTfoot = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(function MarkupTableTfoot(
  { className, children, ...rest },
  ref,
) {
  return (
    <tfoot ref={ref} className={cls("dmc-markup-table__tfoot", className)} {...rest}>
      {children}
    </tfoot>
  );
});

export const MarkupTableTr = forwardRef<HTMLTableRowElement, HTMLAttributes<HTMLTableRowElement> & Tint>(function MarkupTableTr(
  { className, children, bg, c, style, ...rest },
  ref,
) {
  return (
    <Unstyled
      {...rest}
      as="tr"
      ref={ref}
      className={cls("dmc-markup-table__tr", className)}
      bg={bg}
      c={c}
      style={style}
    >
      {children}
    </Unstyled>
  );
});

export type MarkupCellProps = Tint & {
  align?: Align;
  children?: ReactNode;
  style?: CSSProperties;
};

export const MarkupTableTh = forwardRef<HTMLTableCellElement, Omit<ThHTMLAttributes<HTMLTableCellElement>, "align"> & MarkupCellProps>(
  function MarkupTableTh({ className, align, children, bg, c, style, ...rest }, ref) {
    return (
      <Unstyled
        {...rest}
        as="th"
        ref={ref}
        className={cls("dmc-markup-table__th", alignClass(align), className)}
        bg={bg}
        c={c}
        style={mergeStyle(style)}
      >
        {children}
      </Unstyled>
    );
  },
);

export const MarkupTableTd = forwardRef<HTMLTableCellElement, Omit<TdHTMLAttributes<HTMLTableCellElement>, "align"> & MarkupCellProps>(
  function MarkupTableTd({ className, align, children, bg, c, style, ...rest }, ref) {
    return (
      <Unstyled
        {...rest}
        as="td"
        ref={ref}
        className={cls("dmc-markup-table__td", alignClass(align), className)}
        bg={bg}
        c={c}
        style={mergeStyle(style)}
      >
        {children}
      </Unstyled>
    );
  },
);
