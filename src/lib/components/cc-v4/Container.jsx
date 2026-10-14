import React from "react";
import { mergeStyle } from "./tokens";
import { useTheme } from "./ThemeContext.jsx";

const CONTAINER_BASE = {
  display: "flex",
  boxSizing: "border-box",
  flexWrap: "wrap",
};

const FLEX = {
  start: "flex-start",
  end: "flex-end",
  center: "center",
  stretch: "stretch",
  between: "space-between",
  around: "space-around",
  evenly: "space-evenly",
};

function resolveFlex(key, fallback) {
  return FLEX[key] ?? FLEX[fallback];
}

const DIRECTIONS = {
  row: "row",
  col: "column",
};

function flexDirectionFrom(direction) {
  return DIRECTIONS[direction] ?? "row";
}

function containerFlexStyle({ direction, justify, align, gap, w }) {
  return {
    flexDirection: flexDirectionFrom(direction),
    justifyContent: resolveFlex(justify, "start"),
    alignItems: resolveFlex(align, "stretch"),
    gap,
    width: w ?? "100%",
  };
}

/** Flex-строка или колонка для группировки контента (отступы и gap по умолчанию). */
export function Container({
  children,
  style,
  w,
  direction = "row",
  justify = "start",
  align = "stretch",
  gap = 10,
  ...rest
}) {
  const { colors } = useTheme();

  return (
    <div
      style={mergeStyle(
        CONTAINER_BASE,
        containerFlexStyle({ direction, justify, align, gap, w }),
        { color: colors.textPrimary },
        style,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
