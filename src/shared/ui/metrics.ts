/** Метрики из style.css (:root) и scale.css — read-only для useTheme. */

import scaleCss from "virtual:dmc-scale-css";
import styleCss from "virtual:dmc-style-css";
import {
  parseRootMetrics,
  parseScaleSizes,
  type ControlMetrics,
  type RootMetrics,
  type ScaleSizeKey,
  type SizeScale,
} from "./parseStyleCss";

export type { ControlMetrics, RootMetrics, ScaleSizeKey, SizeScale };

export const rootMetrics: RootMetrics = parseRootMetrics(styleCss, scaleCss);

export const controlSizes: Record<ScaleSizeKey, ControlMetrics> = parseScaleSizes(scaleCss);
