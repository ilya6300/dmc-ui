import { jsx as a, jsxs as g, Fragment as ge } from "react/jsx-runtime";
import { createContext as be, useState as T, useCallback as ye, useMemo as xe, useContext as ve, useEffect as P, useId as U, useRef as Se } from "react";
import { createPortal as Te } from "react-dom";
const we = `/* Единственный источник литералов тем: CSS (dmc-*) и JS (useTheme / themes) читают отсюда. */

[data-dmc-theme="light"] {
  --dmc-color-background: #ffffff;
  --dmc-color-surface: #ffffff;
  --dmc-color-text-primary: #1e293b;
  --dmc-color-text-secondary: #64748b;
  --dmc-color-border: #e2e8f0;
  --dmc-color-primary: #2196f3;
  --dmc-color-error: #df2727;
  --dmc-color-toggle-track-off: #cbd5e1;
  --dmc-color-knob: #ffffff;
  --dmc-color-input-text-primary: #1e293b;
  --dmc-color-input-text-muted: #64748b;
  --dmc-color-focus-bg: #f0f7ff;
  --dmc-color-chip-idle-border: #cbd5e1;
  --dmc-color-chip-idle-text: #1e293b;
  --dmc-focus-ring: 0 0 0 3px rgba(33, 150, 243, 0.15);
  --dmc-card-shadow-color: rgba(0, 0, 0, 0.25);
  --main-blue-1: var(--dmc-color-primary);
  --mast-blue: #236192;
  --mast-yellow: #f0b323;
  --error: var(--dmc-color-error);
  --lgt-grey-border: 1px solid #0000001f;
}

[data-dmc-theme="dark"] {
  --dmc-color-background: #121212;
  --dmc-color-surface: #1e1e1e;
  --dmc-color-text-primary: rgb(233, 233, 233);
  --dmc-color-text-secondary: rgb(233, 233, 233);
  --dmc-color-border: #383838;
  --dmc-color-primary: #2196f3;
  --dmc-color-error: #f87171;
  --dmc-color-toggle-track-off: #475569;
  --dmc-color-knob: #ffffff;
  --dmc-color-input-text-primary: #ffffff;
  --dmc-color-input-text-muted: #b3b3b3;
  --dmc-color-focus-bg: #1e3a5f;
  --dmc-color-chip-idle-border: #475569;
  --dmc-color-chip-idle-text: rgb(233, 233, 233);
  --dmc-focus-ring: 0 0 0 3px rgba(33, 150, 243, 0.25);
  --dmc-card-shadow-color: rgba(0, 0, 0, 0.45);
  --main-blue-1: var(--dmc-color-primary);
  --mast-blue: #236192;
  --mast-yellow: #f0b323;
  --error: var(--dmc-color-error);
  --lgt-grey-border: 1px solid #0000001f;
}

[data-dmc-theme="gray"] {
  --dmc-color-background: #3c3c3d;
  --dmc-color-surface: #94a3b8;
  --dmc-color-text-primary: #f8fafc;
  --dmc-color-text-secondary: #e2e8f0;
  --dmc-color-border: #475569;
  --dmc-color-primary: #2196f3;
  --dmc-color-error: #fca5a5;
  --dmc-color-toggle-track-off: #475569;
  --dmc-color-knob: #ffffff;
  --dmc-color-input-text-primary: #ffffff;
  --dmc-color-input-text-muted: #cbd5e1;
  --dmc-color-focus-bg: #334155;
  --dmc-color-chip-idle-border: #475569;
  --dmc-color-chip-idle-text: #f8fafc;
  --dmc-focus-ring: 0 0 0 3px rgba(33, 150, 243, 0.22);
  --dmc-card-shadow-color: rgba(0, 0, 0, 0.35);
  --main-blue-1: var(--dmc-color-primary);
  --mast-blue: #236192;
  --mast-yellow: #f0b323;
  --error: var(--dmc-color-error);
  --lgt-grey-border: 1px solid #0000001f;
}
`, _e = {
  "--dmc-color-background": "background",
  "--dmc-color-surface": "surface",
  "--dmc-color-text-primary": "textPrimary",
  "--dmc-color-text-secondary": "textSecondary",
  "--dmc-color-border": "border",
  "--dmc-color-primary": "primary",
  "--dmc-color-error": "error",
  "--dmc-color-toggle-track-off": "toggleTrackOff",
  "--dmc-color-knob": "knob",
  "--dmc-color-input-text-primary": "inputTextPrimary",
  "--dmc-color-input-text-muted": "inputTextMuted",
  "--dmc-color-focus-bg": "focusBg",
  "--dmc-card-shadow-color": "cardShadowColor",
  "--mast-blue": "mastBlue",
  "--mast-yellow": "mastYellow"
};
function ke(e, t) {
  const r = `[data-dmc-theme="${t}"]`, o = e.indexOf(r);
  if (o === -1) return "";
  const n = e.indexOf("{", o);
  let l = 0;
  for (let c = n; c < e.length; c++)
    if (e[c] === "{" && (l += 1), e[c] === "}" && (l -= 1, l === 0))
      return e.slice(n + 1, c);
  return "";
}
function Ee(e) {
  const t = {}, r = /(--[\w-]+)\s*:\s*([^;]+);/g;
  let o;
  for (; (o = r.exec(e)) !== null; )
    t[o[1]] = o[2].trim();
  return t;
}
function q(e, t, r = 0) {
  if (r > 8) return e;
  const o = /^var\(\s*(--[\w-]+)\s*\)$/.exec(e);
  if (!o) return e;
  const n = t[o[1]];
  return n === void 0 ? e : q(n, t, r + 1);
}
function Ne(e) {
  const t = Ee(e), r = {};
  for (const [o, n] of Object.entries(_e)) {
    const l = t[o];
    l !== void 0 && (r[n] = q(l, t));
  }
  return r;
}
const Ie = /\[data-dmc-theme="([^"]+)"\]\s*\{/g;
function Be(e) {
  const t = [];
  let r;
  for (; (r = Ie.exec(e)) !== null; )
    t.push(r[1]);
  return t;
}
function Me(e) {
  const t = {};
  for (const r of Be(e)) {
    const o = ke(e, r);
    t[r] = Ne(o);
  }
  return t;
}
const Pe = 4, J = Me(we);
function ze(e) {
  var r;
  const t = `1px solid ${e.border}`;
  return {
    ...e,
    cardShadow: Z(e, 12),
    mainBlue1: e.primary,
    textMain: e.textPrimary,
    textMuted: e.textSecondary,
    bgCard: e.surface,
    borderLight: t,
    lightGrey: ((r = J.light) == null ? void 0 : r.border) ?? e.border,
    borderInput: e.border,
    inputTextPrimary: e.inputTextPrimary ?? e.textPrimary,
    inputTextMuted: e.inputTextMuted ?? e.textSecondary
  };
}
function Z(e, t = 12) {
  if (t === 0) return "none";
  const r = e.cardShadowColor ?? "rgba(0, 0, 0, 0.25)";
  return `0 ${Pe}px ${t}px ${r}`;
}
function Ce() {
  const e = {};
  for (const [t, r] of Object.entries(J))
    e[t] = ze(r);
  return e;
}
const B = Ce();
var X;
const dt = ((X = B.light) == null ? void 0 : X.primary) ?? "#2196f3";
var G;
const ut = ((G = B.light) == null ? void 0 : G.border) ?? "#e2e8f0", Oe = [
  { value: "light", label: "Светлая" },
  { value: "dark", label: "Тёмная" },
  { value: "gray", label: "Серая" }
];
function Q(e) {
  return B[e] ?? B.light;
}
const mt = B.light;
function m(...e) {
  return Object.assign({}, ...e.filter(Boolean));
}
const Le = () => {
}, ee = be({
  theme: "light",
  setTheme: Le,
  colors: Q("light")
});
function ft({
  children: e,
  theme: t,
  onThemeChange: r,
  defaultTheme: o = "light"
}) {
  const [n, l] = T(o), c = t !== void 0, i = c ? t : n, s = ye(
    (d) => {
      const f = typeof d == "function" ? d(i) : d;
      c || l(f), r == null || r(f);
    },
    [c, r, i]
  ), u = xe(
    () => ({
      theme: i,
      setTheme: s,
      colors: Q(i)
    }),
    [i, s]
  );
  return /* @__PURE__ */ a(ee.Provider, { value: u, children: /* @__PURE__ */ a("div", { className: "dmc-root", "data-dmc-theme": i, children: e }) });
}
function k() {
  return ve(ee);
}
function pt({ children: e, style: t, title: r, w: o, shadow: n = 12, ...l }) {
  const { colors: c } = k(), i = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    gap: 10,
    backgroundColor: c.bgCard,
    borderRadius: 12,
    padding: 24,
    boxShadow: Z(c, n),
    border: c.borderLight,
    boxSizing: "border-box",
    color: c.textPrimary
  }, s = {
    fontSize: 16,
    fontWeight: 600,
    color: c.mastBlue
  };
  return /* @__PURE__ */ g("div", { style: m(i, { width: o ?? "100%" }, t), ...l, children: [
    r ? /* @__PURE__ */ a("span", { style: s, children: r }) : null,
    e
  ] });
}
const Ae = {
  display: "flex",
  boxSizing: "border-box",
  flexWrap: "wrap"
}, $ = {
  start: "flex-start",
  end: "flex-end",
  center: "center",
  stretch: "stretch",
  between: "space-between",
  around: "space-around",
  evenly: "space-evenly"
};
function V(e, t) {
  return $[e] ?? $[t];
}
const De = {
  row: "row",
  col: "column"
};
function Fe(e) {
  return De[e] ?? "row";
}
function Re({ direction: e, justify: t, align: r, gap: o, w: n }) {
  return {
    flexDirection: Fe(e),
    justifyContent: V(t, "start"),
    alignItems: V(r, "stretch"),
    gap: o,
    width: n ?? "100%"
  };
}
function ht({
  children: e,
  style: t,
  w: r,
  direction: o = "row",
  justify: n = "start",
  align: l = "stretch",
  gap: c = 10,
  ...i
}) {
  const { colors: s } = k();
  return /* @__PURE__ */ a(
    "div",
    {
      style: m(
        Ae,
        Re({ direction: o, justify: n, align: l, gap: c, w: r }),
        { color: s.textPrimary },
        t
      ),
      ...i,
      children: e
    }
  );
}
const We = {
  display: "flex",
  flexDirection: "column",
  padding: "2% 4%",
  boxSizing: "border-box",
  gap: "10px"
}, te = "transform 0.6s ease, opacity 0.6s ease", Ye = {
  transform: "translateX(100%)",
  opacity: 0.92
}, He = {
  transform: "translateX(0)",
  opacity: 1,
  transition: te
};
function gt({ children: e, style: t, animate: r = !1, ...o }) {
  const [n, l] = T(!r);
  P(() => {
    if (!r) return;
    if (typeof window < "u" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      l(!0);
      return;
    }
    const s = requestAnimationFrame(() => l(!0));
    return () => cancelAnimationFrame(s);
  }, [r]);
  const c = r && !n ? { ...Ye, transition: te } : r ? He : null;
  return /* @__PURE__ */ a("div", { style: m(We, c, t), ...o, children: e });
}
const je = {
  minHeight: "100%",
  boxSizing: "border-box"
};
function bt({ children: e, style: t, ...r }) {
  return /* @__PURE__ */ a("div", { style: m(je, t), ...r, children: e });
}
const v = (...e) => e.filter(Boolean).join(" "), $e = ["xs", "s", "m", "l", "xl"], yt = {
  controlMinHeight: 40,
  controlPaddingY: 8,
  controlPaddingX: 12,
  controlFontSize: 14,
  captionFontSize: 12,
  chipPaddingY: 8,
  chipPaddingX: 14,
  chipMinHeight: 30,
  groupGap: 8,
  toggleTrackW: 36,
  toggleTrackH: 20,
  toggleKnob: 16,
  toggleKnobTranslate: 16,
  iconSize: 20
}, re = {
  xs: 0.85,
  s: 0.92,
  m: 1,
  l: 1.08,
  xl: 1.16
};
function N(e) {
  return $e.includes(e) ? e : "m";
}
function xt(e) {
  return re[N(e)];
}
function vt(e, t) {
  return Math.round(e * re[N(t)]);
}
function St({
  active: e,
  label: t,
  variant: r = "switch",
  onClick: o,
  onChange: n,
  style: l,
  size: c,
  disabled: i = !1,
  ariaLabel: s,
  trackStartIcon: u,
  trackEndIcon: d
}) {
  const f = N(c);
  if (r === "text")
    return t ? /* @__PURE__ */ a(
      "span",
      {
        className: v("dmc-toggle", "dmc-toggle--text"),
        "data-dmc-size": f,
        style: l,
        children: /* @__PURE__ */ a("span", { className: "dmc-toggle__label", children: t })
      }
    ) : null;
  const S = (h) => {
    h.preventDefault(), !i && (o == null || o(h), n == null || n(!e));
  };
  return /* @__PURE__ */ g(
    "button",
    {
      type: "button",
      className: v("dmc-toggle"),
      "data-dmc-size": f,
      "data-active": e ? "true" : "false",
      "data-disabled": i ? "true" : "false",
      style: m(void 0, l),
      onClick: S,
      "aria-pressed": !!e,
      "aria-label": s || (t ? void 0 : "Переключатель"),
      disabled: i,
      children: [
        /* @__PURE__ */ g("span", { className: "dmc-toggle__track", "aria-hidden": "true", children: [
          u || d ? /* @__PURE__ */ g("span", { className: "dmc-toggle__track-icons", children: [
            /* @__PURE__ */ a("span", { className: "dmc-toggle__track-icon", children: u }),
            /* @__PURE__ */ a("span", { className: "dmc-toggle__track-icon", children: d })
          ] }) : null,
          /* @__PURE__ */ a("span", { className: "dmc-toggle__knob" })
        ] }),
        t ? /* @__PURE__ */ a("span", { className: "dmc-toggle__label", children: t }) : null
      ]
    }
  );
}
const Ve = {
  fontSize: 13,
  lineHeight: 1.35,
  minHeight: 37,
  padding: "7px 28px 7px 11px",
  borderRadius: 6,
  borderWidth: 1,
  borderStyle: "solid",
  cursor: "pointer",
  maxWidth: "100%"
};
function Tt({
  theme: e,
  onThemeChange: t,
  label: r = "Тема",
  options: o = Oe,
  disabled: n = !1,
  style: l,
  id: c
}) {
  const i = U(), { theme: s, setTheme: u, colors: d } = k(), f = e ?? s, S = e !== void 0 && t !== void 0, h = c ?? i, b = (x) => {
    const w = x.target.value;
    if (S) {
      t(w);
      return;
    }
    u(w);
  }, y = m(
    Ve,
    {
      color: d.textPrimary,
      backgroundColor: d.surface,
      borderColor: d.border
    },
    l
  );
  return /* @__PURE__ */ g(
    "label",
    {
      htmlFor: h,
      style: {
        display: "inline-flex",
        flexDirection: "column",
        gap: 4,
        color: d.textPrimary,
        fontSize: 13
      },
      children: [
        r ? /* @__PURE__ */ a("span", { style: { fontSize: 12, color: d.textSecondary }, children: r }) : null,
        /* @__PURE__ */ a(
          "select",
          {
            id: h,
            value: f,
            onChange: b,
            disabled: n,
            "aria-label": r || "Выбор темы",
            style: y,
            children: o.map(({ value: x, label: w }) => /* @__PURE__ */ a("option", { value: x, children: w }, x))
          }
        )
      ]
    }
  );
}
function Ke(e, { component: t, darkComponent: r }) {
  return e === "dark" && r ? r : t || null;
}
function Xe(e, { src: t, darkSrc: r }) {
  return e === "dark" && r || t;
}
function wt({
  src: e,
  darkSrc: t,
  component: r,
  darkComponent: o,
  alt: n = "",
  style: l,
  width: c,
  height: i,
  size: s,
  ...u
}) {
  const { theme: d } = k(), f = N(s), S = Ke(d, { component: r, darkComponent: o }), h = c != null || i != null, b = h ? c != null || i != null ? { width: c, height: i, display: "block" } : null : {
    width: "var(--dmc-icon-size)",
    height: "var(--dmc-icon-size)"
  };
  if (S)
    return /* @__PURE__ */ a(
      S,
      {
        className: v("dmc-icon"),
        "data-dmc-size": h ? void 0 : f,
        style: m(b, l),
        "aria-hidden": n ? void 0 : !0,
        role: n ? "img" : void 0,
        "aria-label": n || void 0,
        ...u
      }
    );
  const y = Xe(d, { src: e, darkSrc: t });
  return y ? /* @__PURE__ */ a(
    "img",
    {
      src: y,
      alt: n,
      width: c,
      height: i,
      className: v("dmc-icon"),
      "data-dmc-size": h ? void 0 : f,
      style: m(b ?? { display: "block" }, l),
      ...u
    }
  ) : null;
}
const Ge = {
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  gap: 12,
  flexShrink: 0
}, Ue = {
  display: "flex",
  alignItems: "center",
  gap: 6,
  flexShrink: 0
};
function qe({
  title: e,
  titleId: t,
  toolbar: r,
  toolbarWrap: o = !0,
  style: n
}) {
  const { colors: l } = k(), c = {
    margin: 0,
    fontSize: 16,
    fontWeight: 600,
    color: l.mastBlue,
    lineHeight: 1.3
  };
  return /* @__PURE__ */ g("header", { style: m(Ge, n), children: [
    /* @__PURE__ */ a("h2", { id: t, style: c, children: e }),
    r ? o ? /* @__PURE__ */ a("div", { style: Ue, children: r }) : r : null
  ] });
}
function _t({ onClick: e, title: t = "Закрыть", style: r }) {
  const { colors: o } = k(), [n, l] = T(!1), [c, i] = T(!1), s = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: 36,
    height: 36,
    padding: 0,
    border: `1px solid ${o.borderInput}`,
    borderRadius: 6,
    background: o.bgCard,
    color: o.textMuted,
    cursor: "pointer",
    transition: "border-color 0.15s ease, color 0.15s ease, background-color 0.15s ease"
  }, u = {
    borderColor: o.mainBlue1,
    color: o.mainBlue1,
    backgroundColor: o.focusBg
  };
  return /* @__PURE__ */ a(
    "button",
    {
      type: "button",
      title: t,
      "aria-label": t,
      onClick: e,
      style: m(
        s,
        (n || c) && u,
        c && { outline: "none" },
        r
      ),
      onMouseEnter: () => l(!0),
      onMouseLeave: () => l(!1),
      onFocus: () => i(!0),
      onBlur: () => i(!1),
      children: /* @__PURE__ */ a("svg", { width: "16", height: "16", viewBox: "0 0 16 16", "aria-hidden": "true", children: /* @__PURE__ */ a(
        "path",
        {
          d: "M4 4l8 8M12 4l-8 8",
          fill: "none",
          stroke: "currentColor",
          strokeWidth: "1.5",
          strokeLinecap: "round"
        }
      ) })
    }
  );
}
const Je = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  flex: 1,
  minHeight: 0
}, Ze = {
  display: "flex",
  flexDirection: "column",
  flex: 1,
  minHeight: 0,
  gap: 16,
  width: "100%"
}, Qe = {
  display: "flex",
  flexWrap: "wrap",
  gap: 8,
  justifyContent: "flex-end",
  width: "100%",
  marginTop: 16
};
function kt({
  open: e = !0,
  onClose: t,
  title: r,
  titleId: o,
  toolbar: n,
  headerActions: l,
  children: c,
  footer: i,
  w: s,
  style: u,
  layoutStyle: d,
  rootStyle: f,
  usePortal: S = !0,
  closeOnBackdrop: h = !0
}) {
  const { colors: b } = k(), [y, x] = T(!1), w = {
    position: "fixed",
    zIndex: 3,
    top: 0,
    right: 0,
    bottom: 0,
    boxShadow: "0 0 10px 1px #00000070",
    borderRadius: 3,
    background: b.bgCard,
    height: "100%",
    minHeight: 500,
    padding: "20px 24px",
    overflowY: "auto",
    overflowX: "hidden",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    boxSizing: "border-box",
    color: b.textPrimary,
    transition: "transform 0.6s ease, opacity 0.6s ease"
  };
  if (P(() => {
    if (!e) {
      x(!1);
      return;
    }
    const p = requestAnimationFrame(() => x(!0));
    return () => cancelAnimationFrame(p);
  }, [e]), P(() => {
    if (!e)
      return;
    const p = document.body.style.overflow;
    return document.body.style.overflow = "hidden", () => {
      document.body.style.overflow = p;
    };
  }, [e]), P(() => {
    if (!e || !t)
      return;
    const p = (M) => {
      M.key === "Escape" && t();
    };
    return window.addEventListener("keydown", p), () => window.removeEventListener("keydown", p);
  }, [e, t]), !e)
    return null;
  const z = (p) => {
    h && t && p.target === p.currentTarget && t();
  }, _ = n ?? l, I = /* @__PURE__ */ a(
    "div",
    {
      role: "dialog",
      "aria-modal": "true",
      "aria-labelledby": o,
      onClick: z,
      style: m(w, {
        transform: y ? "translateX(0)" : "translateX(100%)",
        opacity: y ? 1 : 0.92
      }, s != null && { width: s }, f),
      children: /* @__PURE__ */ g(
        "div",
        {
          style: m(Je, d),
          onClick: (p) => p.stopPropagation(),
          children: [
            /* @__PURE__ */ g(
              "section",
              {
                style: m(Ze, u),
                "aria-labelledby": o,
                children: [
                  r ? /* @__PURE__ */ a(
                    qe,
                    {
                      title: r,
                      titleId: o,
                      toolbar: _
                    }
                  ) : null,
                  c
                ]
              }
            ),
            i ? /* @__PURE__ */ a("div", { style: Qe, children: i }) : null
          ]
        }
      )
    }
  );
  return S ? Te(I, document.body) : I;
}
const oe = {
  text: "text",
  number: "number",
  key: "number"
}, et = {
  text: { minWidth: 132, maxWidth: 500 },
  number: { minWidth: 80, maxWidth: 120 },
  key: { minWidth: 80, maxWidth: 120 }
}, tt = [
  ["7", "8", "9"],
  ["4", "5", "6"],
  ["1", "2", "3"]
];
function rt(e) {
  return Object.hasOwn(oe, e) ? e : "text";
}
function K({ digit: e, disabled: t, onPress: r, gridColumn: o }) {
  const [n, l] = T(!1), c = () => l(!1);
  return /* @__PURE__ */ a(
    "button",
    {
      type: "button",
      className: v(
        "dmc-input__keypad-btn",
        o ? "dmc-input__keypad-btn--wide" : null
      ),
      "data-pressed": n && !t ? "true" : "false",
      disabled: t,
      "aria-label": `Цифра ${e}`,
      style: o ? { gridColumn: o } : void 0,
      onMouseDown: (i) => {
        t || i.preventDefault();
      },
      onPointerDown: (i) => {
        t || (i.preventDefault(), l(!0));
      },
      onPointerUp: c,
      onPointerLeave: c,
      onPointerCancel: c,
      onBlur: c,
      onClick: (i) => {
        t || r(e), i.currentTarget.blur();
      },
      children: e
    }
  );
}
function ot({ disabled: e, onDigit: t }) {
  return /* @__PURE__ */ g("div", { className: "dmc-input__keypad", role: "group", "aria-label": "Цифровая клавиатура", children: [
    tt.flatMap(
      (r, o) => r.map((n) => /* @__PURE__ */ a(
        K,
        {
          digit: n,
          disabled: e,
          onPress: t
        },
        `${o}-${n}`
      ))
    ),
    /* @__PURE__ */ a(
      K,
      {
        digit: "0",
        disabled: e,
        onPress: t,
        gridColumn: "1 / -1"
      }
    )
  ] });
}
function Et({
  type: e = "text",
  label: t,
  value: r,
  defaultValue: o,
  onChange: n,
  placeholder: l,
  disabled: c = !1,
  readOnly: i = !1,
  name: s,
  id: u,
  style: d,
  inputStyle: f,
  size: S,
  min: h = 0,
  max: b,
  error: y = !1,
  msg: x,
  "aria-label": w
}) {
  const z = U(), _ = u ?? z, D = Se(null), [I, p] = T(!1), M = N(S), C = rt(e), F = oe[C], O = et[C], L = r !== void 0, [ce, R] = T(o ?? ""), A = L ? r ?? "" : ce, le = l && String(A).length === 0 && !I, W = !!(y && x), Y = `${_}-error`, ie = [l && t ? `${_}-hint` : null, W ? Y : null].filter(Boolean).join(" ") || void 0, ae = {
    maxWidth: O.maxWidth
  }, se = {
    minWidth: O.minWidth,
    maxWidth: O.maxWidth
  }, H = c || i, de = (E) => {
    L || R(E.target.value), n == null || n(E);
  }, ue = (E) => {
    i || c || (L || R(E), n == null || n({ target: { value: E, name: s ?? "" } }));
  }, me = (E) => {
    if (H) return;
    const he = `${A}${E}`;
    ue(he);
  }, fe = F === "number" ? {
    min: h,
    ...b != null ? { max: b } : {}
  } : {}, pe = /* @__PURE__ */ g("div", { className: "dmc-input__wrap", style: ae, children: [
    /* @__PURE__ */ a(
      "input",
      {
        ref: D,
        id: _,
        className: "dmc-input__field",
        "data-focus": I && !c ? "true" : "false",
        "data-error": y ? "true" : "false",
        type: F,
        name: s,
        ...fe,
        value: A,
        disabled: c,
        readOnly: i,
        placeholder: "",
        "aria-label": t ? void 0 : w || l,
        "aria-invalid": y || void 0,
        "aria-describedby": ie,
        style: m(se, f),
        onChange: de,
        onFocus: () => p(!0),
        onBlur: () => p(!1)
      }
    ),
    le ? /* @__PURE__ */ a("span", { className: "dmc-input__placeholder", "aria-hidden": "true", children: l }) : null
  ] }), j = /* @__PURE__ */ g(ge, { children: [
    t ? /* @__PURE__ */ a("span", { className: "dmc-input__caption", children: t }) : null,
    l && t ? /* @__PURE__ */ a("span", { id: `${_}-hint`, style: { display: "none" }, children: l }) : null,
    pe,
    W ? /* @__PURE__ */ a("span", { id: Y, className: "dmc-input__error", children: x }) : null
  ] });
  return C === "key" ? /* @__PURE__ */ a(
    "div",
    {
      className: v("dmc-input--key-shell"),
      "data-dmc-size": M,
      style: m(void 0, d),
      children: /* @__PURE__ */ g("div", { className: "dmc-input--key-row", children: [
        /* @__PURE__ */ a(
          "label",
          {
            htmlFor: _,
            className: v("dmc-input", "dmc-input--key-column"),
            children: j
          }
        ),
        /* @__PURE__ */ a(ot, { disabled: H, onDigit: me })
      ] })
    }
  ) : /* @__PURE__ */ a(
    "label",
    {
      htmlFor: _,
      className: v("dmc-input"),
      "data-dmc-size": M,
      style: m(void 0, d),
      children: j
    }
  );
}
function nt({ name: e, active: t, action: r }) {
  const [o, n] = T(!1), [l, c] = T(!1), i = o || l, s = (u) => {
    u.preventDefault(), r == null || r();
  };
  return /* @__PURE__ */ a(
    "button",
    {
      type: "button",
      className: v("dmc-radio-btn__chip"),
      "data-active": t ? "true" : "false",
      "data-highlight": i ? "true" : "false",
      onClick: s,
      onMouseEnter: () => n(!0),
      onMouseLeave: () => n(!1),
      onFocus: () => c(!0),
      onBlur: () => c(!1),
      children: e
    }
  );
}
function Nt({ items: e, style: t, size: r }) {
  const o = N(r);
  return /* @__PURE__ */ a(
    "div",
    {
      className: v("dmc-radio-btn"),
      "data-dmc-size": o,
      style: m(void 0, t),
      children: e == null ? void 0 : e.map((n) => /* @__PURE__ */ a(
        nt,
        {
          name: n.name,
          active: n.active,
          action: n.action
        },
        n.name
      ))
    }
  );
}
const ne = {
  subt: { tag: "span" },
  title: { tag: "span" },
  p: { tag: "p" },
  li: { tag: "li" },
  span: { tag: "span" }
};
function ct(e) {
  return Object.hasOwn(ne, e) ? e : "span";
}
function It({ children: e, variant: t = "span", color: r, size: o, style: n }) {
  const { colors: l } = k(), c = ct(t), { tag: i } = ne[c], s = i, u = N(o), d = m(
    r != null ? { color: r } : { color: l.textPrimary },
    n
  );
  return /* @__PURE__ */ a(
    s,
    {
      className: v("dmc-text"),
      "data-dmc-variant": c,
      "data-dmc-size": u,
      style: d,
      children: e
    }
  );
}
export {
  pt as Box,
  ht as Container,
  oe as INPUT_NATIVE_TYPE,
  wt as Icon,
  Et as Input,
  yt as LEGACY_M_TOKENS,
  ut as LIGHT_GREY,
  gt as Layout,
  dt as MAST_BLUE,
  bt as Main,
  Nt as RadioBtn,
  $e as SIZE_KEYS,
  kt as SideDrawer,
  _t as SideDrawerCloseButton,
  qe as SiteModalHeader,
  Oe as THEME_OPTIONS,
  It as Text,
  ft as ThemeProvider,
  Tt as ThemeSelect,
  St as Toggle,
  xt as getFontScale,
  Q as getThemeColors,
  v as joinClass,
  m as mergeStyle,
  Ke as resolveIconComponent,
  Xe as resolveIconSrc,
  N as resolveSize,
  vt as scalePx,
  B as themes,
  mt as tokens,
  k as useTheme
};
