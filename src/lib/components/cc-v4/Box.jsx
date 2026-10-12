import React from "react";
import { joinClass } from "./joinClass";

/**
 * Корневой контейнер CC-V4: scope для всех v4-стилей (`company-card-v4`).
 *
 * @param {React.ReactNode} children — разметка страницы (header-card, dash-card, списки).
 * @param {boolean} [withMainPage=false] — добавить класс `main-page`.
 * @param {string} [pageVariant] — модификатор страницы (`company-list-page-v4`, …).
 * @param {string} [className] — дополнительные классы.
 * @param {keyof JSX.IntrinsicElements | React.ElementType} [as='div'] — тег корня.
 */
export function Box({
  children,
  className,
  pageVariant,
  withMainPage = false,
  as = "div",
  ...rest
}) {
  const Component = as;
  return (
    <Component
      className={joinClass(
        withMainPage && "main-page",
        "company-card-v4",
        pageVariant,
        className,
      )}
      {...rest}
    >
      {children}
    </Component>
  );
}
