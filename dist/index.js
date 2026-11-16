import { jsx as a, jsxs as g, Fragment as be } from "react/jsx-runtime";
import { createContext as ye, useState as T, useCallback as xe, useMemo as ve, useContext as Se, useEffect as P, useId as U, useRef as Te } from "react";
import { createPortal as ke } from "react-dom";
const we = `/* Литералы бренда и общие токены; style.css ссылается через var() на :root */\r
\r
:root {\r
  --dmc-blue-lg: #2196f3;\r
  --dmc-blue: #236192;\r
  --dmc-yellow: #f0b323;\r
  --dmc-error: #df2727;\r
  --dmc-green: #3cab42;\r
  --lgt-grey-border: 1px solid #0000001f;\r
}
/* Тема: переключаемые литералы здесь; бренд — src/styles/tokens.css (:root) */\r
\r
@import "./src/styles/tokens.css";\r
\r
[data-dmc-theme="light"] {\r
  --dmc-color-background: #ffffff;\r
  --dmc-color-surface: #ffffff;\r
  --dmc-color-text-primary: #1e293b;\r
  --dmc-color-text-secondary: #64748b;\r
  --dmc-color-border: #e2e8f0;\r
  --dmc-color-primary: var(--dmc-blue-lg);\r
  --dmc-color-error: var(--dmc-error);\r
  --dmc-color-toggle-track-off: #cbd5e1;\r
  --dmc-color-knob: #ffffff;\r
  --dmc-color-input-text-primary: #1e293b;\r
  --dmc-color-input-text-muted: #64748b;\r
  --dmc-color-focus-bg: #f0f7ff;\r
  --dmc-color-chip-idle-border: #cbd5e1;\r
  --dmc-color-chip-idle-text: #1e293b;\r
  --dmc-focus-ring: 0 0 0 3px rgba(33, 150, 243, 0.15);\r
  --dmc-card-shadow-color: rgba(0, 0, 0, 0.25);\r
}\r
\r
[data-dmc-theme="dark"] {\r
  --dmc-color-background: #121212;\r
  --dmc-color-surface: #1e1e1e;\r
  --dmc-color-text-primary: rgb(233, 233, 233);\r
  --dmc-color-text-secondary: rgb(233, 233, 233);\r
  --dmc-color-border: #383838;\r
  --dmc-color-primary: var(--dmc-blue-lg);\r
  --dmc-color-error: var(--dmc-error);\r
  --dmc-color-toggle-track-off: #475569;\r
  --dmc-color-knob: #ffffff;\r
  --dmc-color-input-text-primary: #ffffff;\r
  --dmc-color-input-text-muted: #b3b3b3;\r
  --dmc-color-focus-bg: #1e3a5f;\r
  --dmc-color-chip-idle-border: #475569;\r
  --dmc-color-chip-idle-text: rgb(233, 233, 233);\r
  --dmc-focus-ring: 0 0 0 3px rgba(33, 150, 243, 0.25);\r
  --dmc-card-shadow-color: rgba(0, 0, 0, 0.45);\r
}\r
\r
[data-dmc-theme="gray"] {\r
  --dmc-color-background: #3c3c3d;\r
  --dmc-color-surface: #94a3b8;\r
  --dmc-color-text-primary: #f8fafc;\r
  --dmc-color-text-secondary: #e2e8f0;\r
  --dmc-color-border: #475569;\r
  --dmc-color-primary: var(--dmc-blue-lg);\r
  --dmc-color-error: var(--dmc-error);\r
  --dmc-color-toggle-track-off: #475569;\r
  --dmc-color-knob: #ffffff;\r
  --dmc-color-input-text-primary: #ffffff;\r
  --dmc-color-input-text-muted: #cbd5e1;\r
  --dmc-color-focus-bg: #334155;\r
  --dmc-color-chip-idle-border: #475569;\r
  --dmc-color-chip-idle-text: #f8fafc;\r
  --dmc-focus-ring: 0 0 0 3px rgba(33, 150, 243, 0.22);\r
  --dmc-card-shadow-color: rgba(0, 0, 0, 0.35);\r
}`, _e = {
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
  "--dmc-blue": "mastBlue",
  "--dmc-yellow": "mastYellow"
};
function Ee(e) {
  const r = e.indexOf(":root");
  if (r === -1) return "";
  const n = e.indexOf("{", r);
  let o = 0;
  for (let l = n; l < e.length; l++)
    if (e[l] === "{" && (o += 1), e[l] === "}" && (o -= 1, o === 0))
      return e.slice(n + 1, l);
  return "";
}
function Ne(e, t) {
  const r = `[data-dmc-theme="${t}"]`, n = e.indexOf(r);
  if (n === -1) return "";
  const o = e.indexOf("{", n);
  let l = 0;
  for (let c = o; c < e.length; c++)
    if (e[c] === "{" && (l += 1), e[c] === "}" && (l -= 1, l === 0))
      return e.slice(o + 1, c);
  return "";
}
function q(e) {
  const t = {}, r = /(--[\w-]+)\s*:\s*([^;]+);/g;
  let n;
  for (; (n = r.exec(e)) !== null; )
    t[n[1]] = n[2].trim();
  return t;
}
function Z(e, t, r = 0) {
  if (r > 8) return e;
  const n = /^var\(\s*(--[\w-]+)\s*\)$/.exec(e);
  if (!n) return e;
  const o = t[n[1]];
  return o === void 0 ? e : Z(o, t, r + 1);
}
function Ie(e, t = {}) {
  const r = q(e), n = { ...t, ...r }, o = {};
  for (const [l, c] of Object.entries(_e)) {
    const i = r[l] ?? t[l];
    i !== void 0 && (o[c] = Z(i, n));
  }
  return o;
}
const Be = /\[data-dmc-theme="([^"]+)"\]\s*\{/g;
function Me(e) {
  const t = [];
  let r;
  for (; (r = Be.exec(e)) !== null; )
    t.push(r[1]);
  return t;
}
function Pe(e) {
  return q(Ee(e));
}
function ze(e) {
  const t = Pe(e), r = {};
  for (const n of Me(e)) {
    const o = Ne(e, n);
    r[n] = Ie(o, t);
  }
  return r;
}
const Oe = 4, J = ze(we);
function Ce(e) {
  var r;
  const t = `1px solid ${e.border}`;
  return {
    ...e,
    cardShadow: Q(e, 12),
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
function Q(e, t = 12) {
  if (t === 0) return "none";
  const r = e.cardShadowColor ?? "rgba(0, 0, 0, 0.25)";
  return `0 ${Oe}px ${t}px ${r}`;
}
function Ae() {
  const e = {};
  for (const [t, r] of Object.entries(J))
    e[t] = Ce(r);
  return e;
}
const B = Ae();
var X;
const pt = ((X = B.light) == null ? void 0 : X.primary) ?? "#2196f3";
var G;
const ht = ((G = B.light) == null ? void 0 : G.border) ?? "#e2e8f0", Re = [
  { value: "light", label: "Светлая" },
  { value: "dark", label: "Тёмная" },
  { value: "gray", label: "Серая" }
];
function ee(e) {
  return B[e] ?? B.light;
}
const gt = B.light;
function f(...e) {
  return Object.assign({}, ...e.filter(Boolean));
}
const Le = () => {
}, te = ye({
  theme: "light",
  setTheme: Le,
  colors: ee("light")
});
function bt({
  children: e,
  theme: t,
  onThemeChange: r,
  defaultTheme: n = "light"
}) {
  const [o, l] = T(n), c = t !== void 0, i = c ? t : o, s = xe(
    (d) => {
      const m = typeof d == "function" ? d(i) : d;
      c || l(m), r == null || r(m);
    },
    [c, r, i]
  ), u = ve(
    () => ({
      theme: i,
      setTheme: s,
      colors: ee(i)
    }),
    [i, s]
  );
  return /* @__PURE__ */ a(te.Provider, { value: u, children: /* @__PURE__ */ a("div", { className: "dmc-root", "data-dmc-theme": i, children: e }) });
}
function _() {
  return Se(te);
}
function yt({ children: e, style: t, title: r, w: n, shadow: o = 12, ...l }) {
  const { colors: c } = _(), i = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    gap: 10,
    backgroundColor: c.bgCard,
    borderRadius: 12,
    padding: 24,
    boxShadow: Q(c, o),
    border: c.borderLight,
    boxSizing: "border-box",
    color: c.textPrimary
  }, s = {
    fontSize: 16,
    fontWeight: 600,
    color: c.mastBlue
  };
  return /* @__PURE__ */ g("div", { style: f(i, { width: n ?? "100%" }, t), ...l, children: [
    r ? /* @__PURE__ */ a("span", { style: s, children: r }) : null,
    e
  ] });
}
const De = {
  display: "flex",
  boxSizing: "border-box",
  flexWrap: "wrap"
}, j = {
  start: "flex-start",
  end: "flex-end",
  center: "center",
  stretch: "stretch",
  between: "space-between",
  around: "space-around",
  evenly: "space-evenly"
};
function V(e, t) {
  return j[e] ?? j[t];
}
const Fe = {
  row: "row",
  col: "column"
};
function We(e) {
  return Fe[e] ?? "row";
}
function Ye({ direction: e, justify: t, align: r, gap: n, w: o }) {
  return {
    flexDirection: We(e),
    justifyContent: V(t, "start"),
    alignItems: V(r, "stretch"),
    gap: n,
    width: o ?? "100%"
  };
}
function xt({
  children: e,
  style: t,
  w: r,
  direction: n = "row",
  justify: o = "start",
  align: l = "stretch",
  gap: c = 10,
  ...i
}) {
  const { colors: s } = _();
  return /* @__PURE__ */ a(
    "div",
    {
      style: f(
        De,
        Ye({ direction: n, justify: o, align: l, gap: c, w: r }),
        { color: s.textPrimary },
        t
      ),
      ...i,
      children: e
    }
  );
}
const He = {
  display: "flex",
  flexDirection: "column",
  padding: "2% 4%",
  boxSizing: "border-box",
  gap: "10px"
}, re = "transform 0.6s ease, opacity 0.6s ease", $e = {
  transform: "translateX(100%)",
  opacity: 0.92
}, je = {
  transform: "translateX(0)",
  opacity: 1,
  transition: re
};
function vt({ children: e, style: t, animate: r = !1, ...n }) {
  const [o, l] = T(!r);
  P(() => {
    if (!r) return;
    if (typeof window < "u" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      l(!0);
      return;
    }
    const s = requestAnimationFrame(() => l(!0));
    return () => cancelAnimationFrame(s);
  }, [r]);
  const c = r && !o ? { ...$e, transition: re } : r ? je : null;
  return /* @__PURE__ */ a("div", { style: f(He, c, t), ...n, children: e });
}
const Ve = {
  minHeight: "100%",
  boxSizing: "border-box"
};
function St({ children: e, style: t, ...r }) {
  return /* @__PURE__ */ a("div", { style: f(Ve, t), ...r, children: e });
}
const b = (...e) => e.filter(Boolean).join(" "), Ke = ["xs", "s", "m", "l", "xl"], Tt = {
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
}, oe = {
  xs: 0.85,
  s: 0.92,
  m: 1,
  l: 1.08,
  xl: 1.16
};
function E(e) {
  return Ke.includes(e) ? e : "m";
}
function kt(e) {
  return oe[E(e)];
}
function wt(e, t) {
  return Math.round(e * oe[E(t)]);
}
const Xe = /* @__PURE__ */ new Set(["primary", "error", "outline", "green"]);
function Ge(e) {
  return Xe.has(e) ? e : "primary";
}
function _t({
  children: e,
  variant: t = "primary",
  size: r,
  type: n = "button",
  disabled: o = !1,
  onClick: l,
  style: c,
  ...i
}) {
  const s = Ge(t), u = E(r);
  return /* @__PURE__ */ a(
    "button",
    {
      type: n,
      className: b("dmc-button"),
      "data-dmc-variant": s,
      "data-dmc-size": u,
      "data-disabled": o ? "true" : "false",
      disabled: o,
      style: f(void 0, c),
      onClick: l,
      ...i,
      children: e
    }
  );
}
function Et({
  active: e,
  label: t,
  variant: r = "switch",
  onClick: n,
  onChange: o,
  style: l,
  size: c,
  disabled: i = !1,
  ariaLabel: s,
  trackStartIcon: u,
  trackEndIcon: d
}) {
  const m = E(c);
  if (r === "text")
    return t ? /* @__PURE__ */ a(
      "span",
      {
        className: b("dmc-toggle", "dmc-toggle--text"),
        "data-dmc-size": m,
        style: l,
        children: /* @__PURE__ */ a("span", { className: "dmc-toggle__label", children: t })
      }
    ) : null;
  const S = (h) => {
    h.preventDefault(), !i && (n == null || n(h), o == null || o(!e));
  };
  return /* @__PURE__ */ g(
    "button",
    {
      type: "button",
      className: b("dmc-toggle"),
      "data-dmc-size": m,
      "data-active": e ? "true" : "false",
      "data-disabled": i ? "true" : "false",
      style: f(void 0, l),
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
const Ue = {
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
function Nt({
  theme: e,
  onThemeChange: t,
  label: r = "Тема",
  options: n = Re,
  disabled: o = !1,
  style: l,
  id: c
}) {
  const i = U(), { theme: s, setTheme: u, colors: d } = _(), m = e ?? s, S = e !== void 0 && t !== void 0, h = c ?? i, y = (v) => {
    const k = v.target.value;
    if (S) {
      t(k);
      return;
    }
    u(k);
  }, x = f(
    Ue,
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
            value: m,
            onChange: y,
            disabled: o,
            "aria-label": r || "Выбор темы",
            style: x,
            children: n.map(({ value: v, label: k }) => /* @__PURE__ */ a("option", { value: v, children: k }, v))
          }
        )
      ]
    }
  );
}
function qe(e, { component: t, darkComponent: r }) {
  return e === "dark" && r ? r : t || null;
}
function Ze(e, { src: t, darkSrc: r }) {
  return e === "dark" && r || t;
}
function It({
  src: e,
  darkSrc: t,
  component: r,
  darkComponent: n,
  alt: o = "",
  style: l,
  width: c,
  height: i,
  size: s,
  ...u
}) {
  const { theme: d } = _(), m = E(s), S = qe(d, { component: r, darkComponent: n }), h = c != null || i != null, y = h ? c != null || i != null ? { width: c, height: i, display: "block" } : null : {
    width: "var(--dmc-icon-size)",
    height: "var(--dmc-icon-size)"
  };
  if (S)
    return /* @__PURE__ */ a(
      S,
      {
        className: b("dmc-icon"),
        "data-dmc-size": h ? void 0 : m,
        style: f(y, l),
        "aria-hidden": o ? void 0 : !0,
        role: o ? "img" : void 0,
        "aria-label": o || void 0,
        ...u
      }
    );
  const x = Ze(d, { src: e, darkSrc: t });
  return x ? /* @__PURE__ */ a(
    "img",
    {
      src: x,
      alt: o,
      width: c,
      height: i,
      className: b("dmc-icon"),
      "data-dmc-size": h ? void 0 : m,
      style: f(y ?? { display: "block" }, l),
      ...u
    }
  ) : null;
}
const Je = {
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  gap: 12,
  flexShrink: 0
}, Qe = {
  display: "flex",
  alignItems: "center",
  gap: 6,
  flexShrink: 0
};
function et({
  title: e,
  titleId: t,
  toolbar: r,
  toolbarWrap: n = !0,
  style: o
}) {
  const { colors: l } = _(), c = {
    margin: 0,
    fontSize: 16,
    fontWeight: 600,
    color: l.mastBlue,
    lineHeight: 1.3
  };
  return /* @__PURE__ */ g("header", { style: f(Je, o), children: [
    /* @__PURE__ */ a("h2", { id: t, style: c, children: e }),
    r ? n ? /* @__PURE__ */ a("div", { style: Qe, children: r }) : r : null
  ] });
}
function Bt({ onClick: e, title: t = "Закрыть", style: r }) {
  const { colors: n } = _(), [o, l] = T(!1), [c, i] = T(!1), s = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: 36,
    height: 36,
    padding: 0,
    border: `1px solid ${n.borderInput}`,
    borderRadius: 6,
    background: n.bgCard,
    color: n.textMuted,
    cursor: "pointer",
    transition: "border-color 0.15s ease, color 0.15s ease, background-color 0.15s ease"
  }, u = {
    borderColor: n.mainBlue1,
    color: n.mainBlue1,
    backgroundColor: n.focusBg
  };
  return /* @__PURE__ */ a(
    "button",
    {
      type: "button",
      title: t,
      "aria-label": t,
      onClick: e,
      style: f(
        s,
        (o || c) && u,
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
const tt = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  flex: 1,
  minHeight: 0
}, rt = {
  display: "flex",
  flexDirection: "column",
  flex: 1,
  minHeight: 0,
  gap: 16,
  width: "100%"
}, ot = {
  display: "flex",
  flexWrap: "wrap",
  gap: 8,
  justifyContent: "flex-end",
  width: "100%",
  marginTop: 16
};
function Mt({
  open: e = !0,
  onClose: t,
  title: r,
  titleId: n,
  toolbar: o,
  headerActions: l,
  children: c,
  footer: i,
  w: s,
  style: u,
  layoutStyle: d,
  rootStyle: m,
  usePortal: S = !0,
  closeOnBackdrop: h = !0
}) {
  const { colors: y } = _(), [x, v] = T(!1), k = {
    position: "fixed",
    zIndex: 3,
    top: 0,
    right: 0,
    bottom: 0,
    boxShadow: "0 0 10px 1px #00000070",
    borderRadius: 3,
    background: y.bgCard,
    height: "100%",
    minHeight: 500,
    padding: "20px 24px",
    overflowY: "auto",
    overflowX: "hidden",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    boxSizing: "border-box",
    color: y.textPrimary,
    transition: "transform 0.6s ease, opacity 0.6s ease"
  };
  if (P(() => {
    if (!e) {
      v(!1);
      return;
    }
    const p = requestAnimationFrame(() => v(!0));
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
  }, w = o ?? l, I = /* @__PURE__ */ a(
    "div",
    {
      role: "dialog",
      "aria-modal": "true",
      "aria-labelledby": n,
      onClick: z,
      style: f(k, {
        transform: x ? "translateX(0)" : "translateX(100%)",
        opacity: x ? 1 : 0.92
      }, s != null && { width: s }, m),
      children: /* @__PURE__ */ g(
        "div",
        {
          style: f(tt, d),
          onClick: (p) => p.stopPropagation(),
          children: [
            /* @__PURE__ */ g(
              "section",
              {
                style: f(rt, u),
                "aria-labelledby": n,
                children: [
                  r ? /* @__PURE__ */ a(
                    et,
                    {
                      title: r,
                      titleId: n,
                      toolbar: w
                    }
                  ) : null,
                  c
                ]
              }
            ),
            i ? /* @__PURE__ */ a("div", { style: ot, children: i }) : null
          ]
        }
      )
    }
  );
  return S ? ke(I, document.body) : I;
}
const ne = {
  text: "text",
  number: "number",
  key: "number"
}, nt = {
  text: { minWidth: 132, maxWidth: 500 },
  number: { minWidth: 80, maxWidth: 120 },
  key: { minWidth: 80, maxWidth: 120 }
}, ct = [
  ["7", "8", "9"],
  ["4", "5", "6"],
  ["1", "2", "3"]
];
function lt(e) {
  return Object.hasOwn(ne, e) ? e : "text";
}
function K({ digit: e, disabled: t, onPress: r, gridColumn: n }) {
  const [o, l] = T(!1), c = () => l(!1);
  return /* @__PURE__ */ a(
    "button",
    {
      type: "button",
      className: b(
        "dmc-input__keypad-btn",
        n ? "dmc-input__keypad-btn--wide" : null
      ),
      "data-pressed": o && !t ? "true" : "false",
      disabled: t,
      "aria-label": `Цифра ${e}`,
      style: n ? { gridColumn: n } : void 0,
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
function it({ disabled: e, onDigit: t }) {
  return /* @__PURE__ */ g("div", { className: "dmc-input__keypad", role: "group", "aria-label": "Цифровая клавиатура", children: [
    ct.flatMap(
      (r, n) => r.map((o) => /* @__PURE__ */ a(
        K,
        {
          digit: o,
          disabled: e,
          onPress: t
        },
        `${n}-${o}`
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
function Pt({
  type: e = "text",
  label: t,
  value: r,
  defaultValue: n,
  onChange: o,
  placeholder: l,
  disabled: c = !1,
  readOnly: i = !1,
  name: s,
  id: u,
  style: d,
  inputStyle: m,
  size: S,
  min: h = 0,
  max: y,
  error: x = !1,
  msg: v,
  "aria-label": k
}) {
  const z = U(), w = u ?? z, L = Te(null), [I, p] = T(!1), M = E(S), O = lt(e), D = ne[O], C = nt[O], A = r !== void 0, [le, F] = T(n ?? ""), R = A ? r ?? "" : le, ie = l && String(R).length === 0 && !I, W = !!(x && v), Y = `${w}-error`, ae = [l && t ? `${w}-hint` : null, W ? Y : null].filter(Boolean).join(" ") || void 0, se = {
    maxWidth: C.maxWidth
  }, de = {
    minWidth: C.minWidth,
    maxWidth: C.maxWidth
  }, H = c || i, ue = (N) => {
    A || F(N.target.value), o == null || o(N);
  }, fe = (N) => {
    i || c || (A || F(N), o == null || o({ target: { value: N, name: s ?? "" } }));
  }, me = (N) => {
    if (H) return;
    const ge = `${R}${N}`;
    fe(ge);
  }, pe = D === "number" ? {
    min: h,
    ...y != null ? { max: y } : {}
  } : {}, he = /* @__PURE__ */ g("div", { className: "dmc-input__wrap", style: se, children: [
    /* @__PURE__ */ a(
      "input",
      {
        ref: L,
        id: w,
        className: "dmc-input__field",
        "data-focus": I && !c ? "true" : "false",
        "data-error": x ? "true" : "false",
        type: D,
        name: s,
        ...pe,
        value: R,
        disabled: c,
        readOnly: i,
        placeholder: "",
        "aria-label": t ? void 0 : k || l,
        "aria-invalid": x || void 0,
        "aria-describedby": ae,
        style: f(de, m),
        onChange: ue,
        onFocus: () => p(!0),
        onBlur: () => p(!1)
      }
    ),
    ie ? /* @__PURE__ */ a("span", { className: "dmc-input__placeholder", "aria-hidden": "true", children: l }) : null
  ] }), $ = /* @__PURE__ */ g(be, { children: [
    t ? /* @__PURE__ */ a("span", { className: "dmc-input__caption", children: t }) : null,
    l && t ? /* @__PURE__ */ a("span", { id: `${w}-hint`, style: { display: "none" }, children: l }) : null,
    he,
    W ? /* @__PURE__ */ a("span", { id: Y, className: "dmc-input__error", children: v }) : null
  ] });
  return O === "key" ? /* @__PURE__ */ a(
    "div",
    {
      className: b("dmc-input--key-shell"),
      "data-dmc-size": M,
      style: f(void 0, d),
      children: /* @__PURE__ */ g("div", { className: "dmc-input--key-row", children: [
        /* @__PURE__ */ a(
          "label",
          {
            htmlFor: w,
            className: b("dmc-input", "dmc-input--key-column"),
            children: $
          }
        ),
        /* @__PURE__ */ a(it, { disabled: H, onDigit: me })
      ] })
    }
  ) : /* @__PURE__ */ a(
    "label",
    {
      htmlFor: w,
      className: b("dmc-input"),
      "data-dmc-size": M,
      style: f(void 0, d),
      children: $
    }
  );
}
function at({ name: e, active: t, action: r }) {
  const [n, o] = T(!1), [l, c] = T(!1), i = n || l, s = (u) => {
    u.preventDefault(), r == null || r();
  };
  return /* @__PURE__ */ a(
    "button",
    {
      type: "button",
      className: b("dmc-radio-btn__chip"),
      "data-active": t ? "true" : "false",
      "data-highlight": i ? "true" : "false",
      onClick: s,
      onMouseEnter: () => o(!0),
      onMouseLeave: () => o(!1),
      onFocus: () => c(!0),
      onBlur: () => c(!1),
      children: e
    }
  );
}
function zt({ items: e, style: t, size: r }) {
  const n = E(r);
  return /* @__PURE__ */ a(
    "div",
    {
      className: b("dmc-radio-btn"),
      "data-dmc-size": n,
      style: f(void 0, t),
      children: e == null ? void 0 : e.map((o) => /* @__PURE__ */ a(
        at,
        {
          name: o.name,
          active: o.active,
          action: o.action
        },
        o.name
      ))
    }
  );
}
const ce = {
  subt: { tag: "span" },
  title: { tag: "span" },
  p: { tag: "p" },
  li: { tag: "li" },
  span: { tag: "span" }
};
function st(e) {
  return Object.hasOwn(ce, e) ? e : "span";
}
function Ot({ children: e, variant: t = "span", color: r, size: n, style: o }) {
  const { colors: l } = _(), c = st(t), { tag: i } = ce[c], s = i, u = E(n), d = f(
    r != null ? { color: r } : { color: l.textPrimary },
    o
  );
  return /* @__PURE__ */ a(
    s,
    {
      className: b("dmc-text"),
      "data-dmc-variant": c,
      "data-dmc-size": u,
      style: d,
      children: e
    }
  );
}
export {
  yt as Box,
  _t as Button,
  xt as Container,
  ne as INPUT_NATIVE_TYPE,
  It as Icon,
  Pt as Input,
  Tt as LEGACY_M_TOKENS,
  ht as LIGHT_GREY,
  vt as Layout,
  pt as MAST_BLUE,
  St as Main,
  zt as RadioBtn,
  Ke as SIZE_KEYS,
  Mt as SideDrawer,
  Bt as SideDrawerCloseButton,
  et as SiteModalHeader,
  Re as THEME_OPTIONS,
  Ot as Text,
  bt as ThemeProvider,
  Nt as ThemeSelect,
  Et as Toggle,
  kt as getFontScale,
  ee as getThemeColors,
  b as joinClass,
  f as mergeStyle,
  qe as resolveIconComponent,
  Ze as resolveIconSrc,
  E as resolveSize,
  wt as scalePx,
  B as themes,
  gt as tokens,
  _ as useTheme
};
