import React, { useEffect, useState } from "react";
import { mergeStyle } from "./tokens";

const LAYOUT_STYLE = {
  display: "flex",
  flexDirection: "column",
  padding: "0 2% 4%",
  boxSizing: "border-box",
};

const ENTER_TRANSITION = "transform 0.6s ease, opacity 0.6s ease";

const ENTER_FROM = {
  transform: "translateX(100%)",
  opacity: 0.92,
};

const ENTER_TO = {
  transform: "translateX(0)",
  opacity: 1,
  transition: ENTER_TRANSITION,
};

/** Колонка контента страницы с входной анимацией (аналог legacy `animation_move_list`). */
export function Layout({ children, style, animate = false, ...rest }) {
  const [entered, setEntered] = useState(!animate);

  useEffect(() => {
    if (!animate) return;

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      setEntered(true);
      return;
    }

    const frame = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(frame);
  }, [animate]);

  const motionStyle =
    animate && !entered
      ? { ...ENTER_FROM, transition: ENTER_TRANSITION }
      : animate
        ? ENTER_TO
        : null;

  return (
    <div style={mergeStyle(LAYOUT_STYLE, motionStyle, style)} {...rest}>
      {children}
    </div>
  );
}
