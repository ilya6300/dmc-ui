import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import { mergeStyle } from "../tokens";

const MAIN_STYLE: CSSProperties = {
  minHeight: "100%",
  boxSizing: "border-box",
};

export type MainProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
  style?: CSSProperties;
};

/** Обёртка страницы ЛК; оформление только через `style`. */
export function Main({ children, style, ...rest }: MainProps) {
  return (
    <div style={mergeStyle(MAIN_STYLE, style)} {...rest}>
      {children}
    </div>
  );
}
