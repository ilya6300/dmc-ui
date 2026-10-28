import { jsx as r, jsxs as b, Fragment as ve } from "react/jsx-runtime";
import { createContext as Be, useState as m, useCallback as _e, useMemo as Ce, useContext as Ae, useId as Ie, useEffect as $ } from "react";
import { createPortal as Oe } from "react-dom";
const Le = 4, Z = "#2196f3", j = "rgb(233, 233, 233)", de = "#e2e8f0", ue = Z, Me = {
  background: "#ffffff",
  surface: "#ffffff",
  textPrimary: "#1e293b",
  textSecondary: "#64748b",
  border: de,
  primary: ue,
  error: "#df2727",
  mastBlue: Z,
  mastYellow: "#f0b323",
  cardShadowColor: "rgba(0, 0, 0, 0.25)",
  focusBg: "#f0f7ff",
  toggleTrackOff: "#cbd5e1",
  knob: "#ffffff"
}, Re = {
  background: "#121212",
  surface: "#1e1e1e",
  textPrimary: j,
  textSecondary: j,
  inputTextPrimary: "#ffffff",
  inputTextMuted: "#b3b3b3",
  border: "#383838",
  primary: ue,
  error: "#f87171",
  mastBlue: Z,
  mastYellow: "#f0b323",
  cardShadowColor: "rgba(0, 0, 0, 0.45)",
  focusBg: "#1e3a5f",
  toggleTrackOff: "#475569",
  knob: "#ffffff"
};
function fe(e, t = 12) {
  return t === 0 ? "none" : `0 ${Le}px ${t}px ${e.cardShadowColor}`;
}
function te(e) {
  return {
    ...e,
    cardShadow: fe(e, 12),
    mainBlue1: e.primary,
    textMain: e.textPrimary,
    textMuted: e.textSecondary,
    bgCard: e.surface,
    borderLight: `1px solid ${e.border}`,
    lightGrey: de,
    borderInput: e.border,
    inputTextPrimary: e.inputTextPrimary ?? e.textPrimary,
    inputTextMuted: e.inputTextMuted ?? e.textSecondary
  };
}
const K = {
  light: te(Me),
  dark: te(Re)
};
function pe(e) {
  return K[e] ?? K.light;
}
const Pe = () => {
}, he = Be({
  theme: "light",
  setTheme: Pe,
  colors: pe("light")
});
function Vt({
  children: e,
  theme: t,
  onThemeChange: n,
  defaultTheme: o = "light"
}) {
  const [i, s] = m(o), l = t !== void 0, a = l ? t : i, u = _e(
    (d) => {
      const f = typeof d == "function" ? d(a) : d;
      l || s(f), n == null || n(f);
    },
    [l, n, a]
  ), h = Ce(
    () => ({
      theme: a,
      setTheme: u,
      colors: pe(a)
    }),
    [a, u]
  );
  return /* @__PURE__ */ r(he.Provider, { value: h, children: e });
}
function S() {
  return Ae(he);
}
const qt = K.light;
function c(...e) {
  return Object.assign({}, ...e.filter(Boolean));
}
const We = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  gap: 10,
  borderRadius: 12,
  padding: 24,
  boxSizing: "border-box"
}, De = {
  fontSize: 16,
  fontWeight: 600
};
function Zt({
  children: e,
  style: t,
  title: n,
  w: o,
  shadow: i = 12,
  as: s = "div",
  ...l
}) {
  const { colors: a } = S();
  return /* @__PURE__ */ b(
    s,
    {
      style: c(
        We,
        {
          width: o ?? "100%",
          backgroundColor: a.bgCard,
          boxShadow: fe(a, i),
          border: a.borderLight,
          color: a.textPrimary
        },
        t
      ),
      ...l,
      children: [
        n ? /* @__PURE__ */ r("span", { style: c(De, { color: a.mastBlue }), children: n }) : null,
        e
      ]
    }
  );
}
const ne = {
  sm: { minHeight: 28, padding: "4px 8px", fontSize: 12 },
  md: { minHeight: 36, padding: "8px 12px", fontSize: 14 },
  lg: { minHeight: 44, padding: "10px 16px", fontSize: 16 }
}, oe = {
  position: "relative",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 12,
  boxSizing: "border-box",
  margin: 0,
  borderStyle: "solid",
  borderWidth: 1,
  fontFamily: "inherit",
  fontWeight: 500,
  lineHeight: 1.2,
  letterSpacing: "0.04em",
  userSelect: "none",
  overflow: "hidden",
  transition: "background-color 0.2s ease, color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease, opacity 0.2s ease"
}, re = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center"
}, He = "0 1px 3px rgba(0, 0, 0, 0.35)", Ne = "0 8px 16px rgba(0, 0, 0, 0.28)", Fe = "0 4px 12px rgba(0, 0, 0, 0.32)", ze = {
  text: !0,
  plain: !0,
  link: !0
};
function V(e, t) {
  if (typeof e != "string" || !/^#[0-9a-fA-F]{6}$/.test(e))
    return e;
  const n = Math.round(t * 255).toString(16).padStart(2, "0");
  return `${e}${n}`;
}
function Ye(e, t) {
  return e === "error" ? t.error : e === "warning" ? t.mastYellow : t.primary;
}
function $e(e, t) {
  return e === "warning" ? t.textPrimary : t.knob;
}
function je(e) {
  return e === "round" ? "50%" : e === "rounded" ? 999 : e === "square" ? 0 : 4;
}
function Jt({
  children: e,
  variant: t = "filled",
  color: n = "primary",
  size: o = "md",
  shape: i = "default",
  block: s = !1,
  flat: l = !1,
  loading: a = !1,
  disabled: u = !1,
  active: h = !1,
  leftSection: d,
  rightSection: f,
  type: w = "button",
  style: B,
  onClick: x,
  ..._
}) {
  const { colors: k } = S(), [p, R] = m(!1), [T, C] = m(!1), [g, v] = m(!1), A = ne[o] ?? ne.md, E = Ye(n, k), y = u || a, I = !y && (p || T || g || h), O = !y && (g || h), P = !e && !!d != !!f, D = !!ze[t], H = t === "filled" || t === "outline";
  let L = E, M = $e(n, k), N = "transparent";
  t === "outline" ? (L = "transparent", M = E, N = E) : t === "tonal" ? (L = V(E, I ? 0.28 : 0.2), M = E) : D ? (L = I ? V(E, O ? 0.16 : 0.1) : "transparent", M = E) : I && (L = E);
  const F = t === "filled" && I && !y ? `inset 0 0 0 999px rgba(0, 0, 0, ${O ? 0.22 : 0.12})` : null, z = !H || l || y || O ? null : p ? Ne : T ? Fe : He, J = T && !y ? `0 0 0 3px ${V(k.primary, 0.35)}` : null, U = [F, z, J].filter(Boolean).join(", ") || "none", G = c(oe, {
    minHeight: A.minHeight,
    minWidth: P || i === "round" ? A.minHeight : void 0,
    padding: P || i === "round" ? 0 : A.padding,
    fontSize: A.fontSize,
    width: s ? "100%" : void 0,
    borderRadius: je(i),
    textTransform: t === "link" ? "none" : "uppercase",
    textDecoration: t === "link" && p && !y ? "underline" : "none",
    letterSpacing: t === "link" ? "normal" : oe.letterSpacing,
    backgroundColor: L,
    color: M,
    borderColor: N,
    boxShadow: U,
    opacity: y ? 0.5 : D && !I ? 0.92 : 1,
    cursor: y ? "not-allowed" : "pointer",
    transform: O ? "scale(0.98)" : "none",
    outline: "none"
  }), X = (Y) => {
    if (y) {
      Y.preventDefault();
      return;
    }
    x == null || x(Y);
  };
  return /* @__PURE__ */ b(
    "button",
    {
      ..._,
      type: w,
      disabled: y,
      "aria-busy": a || void 0,
      "aria-pressed": h || void 0,
      style: c(G, B),
      onMouseEnter: () => R(!0),
      onMouseLeave: () => {
        R(!1), v(!1);
      },
      onFocus: () => C(!0),
      onBlur: () => {
        C(!1), v(!1);
      },
      onMouseDown: () => v(!0),
      onMouseUp: () => v(!1),
      onClick: X,
      children: [
        d ? /* @__PURE__ */ r("span", { style: re, children: d }) : null,
        e,
        f ? /* @__PURE__ */ r("span", { style: re, children: f }) : null
      ]
    }
  );
}
const Ke = {
  display: "flex",
  boxSizing: "border-box",
  flexWrap: "wrap"
}, ie = {
  start: "flex-start",
  end: "flex-end",
  center: "center",
  stretch: "stretch",
  between: "space-between",
  around: "space-around",
  evenly: "space-evenly"
};
function se(e, t) {
  return ie[e] ?? ie[t];
}
const Ue = {
  row: "row",
  col: "column"
};
function Ge(e) {
  return Ue[e] ?? "row";
}
function Xe({ direction: e, justify: t, align: n, gap: o, w: i }) {
  return {
    flexDirection: Ge(e),
    justifyContent: se(t, "start"),
    alignItems: se(n, "stretch"),
    gap: o,
    width: i ?? "100%"
  };
}
function Qt({
  children: e,
  style: t,
  w: n,
  direction: o = "row",
  justify: i = "start",
  align: s = "stretch",
  gap: l = 10,
  ...a
}) {
  const { colors: u } = S();
  return /* @__PURE__ */ r(
    "div",
    {
      style: c(
        Ke,
        Xe({ direction: o, justify: i, align: s, gap: l, w: n }),
        { color: u.textPrimary },
        t
      ),
      ...a,
      children: e
    }
  );
}
const le = { display: "block" };
function Ve(e, { component: t, darkComponent: n }) {
  return e === "dark" && n ? n : t || null;
}
function qe(e, { src: t, darkSrc: n }) {
  return e === "dark" && n || t;
}
function en({
  src: e,
  darkSrc: t,
  component: n,
  darkComponent: o,
  alt: i = "",
  style: s,
  width: l,
  height: a,
  ...u
}) {
  const { theme: h } = S(), d = Ve(h, { component: n, darkComponent: o });
  if (d)
    return /* @__PURE__ */ r(
      d,
      {
        style: c(
          l != null || a != null ? { width: l, height: a, ...le } : null,
          s
        ),
        "aria-hidden": i ? void 0 : !0,
        role: i ? "img" : void 0,
        "aria-label": i || void 0,
        ...u
      }
    );
  const f = qe(h, { src: e, darkSrc: t });
  return f ? /* @__PURE__ */ r(
    "img",
    {
      src: f,
      alt: i,
      width: l,
      height: a,
      style: c(le, s),
      ...u
    }
  ) : null;
}
const ge = {
  text: "text",
  number: "number",
  key: "number"
}, Ze = {
  text: { minWidth: 132, maxWidth: 500 },
  number: { minWidth: 80, maxWidth: 120 },
  key: { minWidth: 80, maxWidth: 120 }
}, Je = [
  ["7", "8", "9"],
  ["4", "5", "6"],
  ["1", "2", "3"]
], ye = 'source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace', Qe = {
  boxSizing: "border-box",
  minHeight: 36,
  minWidth: 36,
  padding: "6px 8px",
  borderRadius: 6,
  fontSize: 14,
  fontWeight: 500,
  fontFamily: "inherit",
  outline: "none",
  boxShadow: "none",
  WebkitTapHighlightColor: "transparent",
  transition: "border-color 0.15s ease, color 0.15s ease"
}, et = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: 6,
  flexShrink: 0
}, tt = {
  display: "flex",
  flexDirection: "column",
  gap: 4,
  minWidth: 140,
  flex: "0 0 auto",
  justifyContent: "space-between",
  height: "100%"
}, nt = { fontSize: 12 }, ot = {
  fontSize: 12,
  lineHeight: 1.35
}, rt = {
  boxSizing: "border-box",
  width: "100%",
  minHeight: 40,
  padding: "8px 12px",
  borderRadius: 6,
  fontSize: 14,
  lineHeight: 1.35,
  fontFamily: ye,
  outline: "none",
  transition: "border-color 0.15s ease, box-shadow 0.15s ease"
}, it = { opacity: 0.55, cursor: "not-allowed" }, st = {
  position: "absolute",
  left: 12,
  top: 0,
  bottom: 0,
  display: "flex",
  alignItems: "center",
  pointerEvents: "none",
  fontSize: 14,
  lineHeight: 1.35,
  fontFamily: ye
}, lt = {
  display: "flex",
  flexDirection: "column",
  gap: 4,
  padding: 12,
  borderRadius: 8,
  flex: "0 0 auto",
  height: "165px"
}, at = {
  display: "flex",
  alignItems: "flex-start",
  gap: 12
}, ct = {
  position: "relative",
  width: "100%"
}, dt = { minWidth: 0 }, ut = { display: "none" };
function ft(e) {
  return Object.hasOwn(ge, e) ? e : "text";
}
function ae({ digit: e, disabled: t, onPress: n, colors: o, gridColumn: i }) {
  const [s, l] = m(!1), a = s && !t ? o.mastBlue : o.lightGrey, u = s && !t ? o.mastBlue : o.inputTextPrimary, h = c(
    Qe,
    {
      border: `1px solid ${a}`,
      backgroundColor: o.surface,
      color: u,
      cursor: t ? "not-allowed" : "pointer",
      opacity: t ? 0.55 : 1
    },
    i ? { gridColumn: i } : null
  ), d = () => l(!1);
  return /* @__PURE__ */ r(
    "button",
    {
      type: "button",
      disabled: t,
      "aria-label": `Цифра ${e}`,
      style: h,
      onMouseDown: (f) => {
        t || f.preventDefault();
      },
      onPointerDown: (f) => {
        t || (f.preventDefault(), l(!0));
      },
      onPointerUp: d,
      onPointerLeave: d,
      onPointerCancel: d,
      onBlur: d,
      onClick: (f) => {
        t || n(e), f.currentTarget.blur();
      },
      children: e
    }
  );
}
function pt({ disabled: e, onDigit: t, colors: n }) {
  return /* @__PURE__ */ b("div", { style: et, role: "group", "aria-label": "Цифровая клавиатура", children: [
    Je.flatMap(
      (o, i) => o.map((s) => /* @__PURE__ */ r(
        ae,
        {
          digit: s,
          disabled: e,
          colors: n,
          onPress: t
        },
        `${i}-${s}`
      ))
    ),
    /* @__PURE__ */ r(
      ae,
      {
        digit: "0",
        disabled: e,
        colors: n,
        onPress: t,
        gridColumn: "1 / -1"
      }
    )
  ] });
}
function tn({
  type: e = "text",
  label: t,
  value: n,
  defaultValue: o,
  onChange: i,
  placeholder: s,
  disabled: l = !1,
  readOnly: a = !1,
  name: u,
  id: h,
  style: d,
  inputStyle: f,
  min: w = 0,
  max: B,
  error: x = !1,
  msg: _,
  "aria-label": k
}) {
  const { colors: p } = S(), R = Ie(), T = h ?? R, [C, g] = m(!1), v = ft(e), A = ge[v], E = Ze[v], y = n !== void 0, [I, O] = m(o ?? ""), P = y ? n ?? "" : I, D = s && String(P).length === 0 && !C, H = c(tt, {
    color: p.inputTextPrimary
  }), L = c(nt, {
    color: p.inputTextMuted
  }), M = !l && C, N = x ? p.error : M ? p.mastBlue : p.lightGrey, F = !!(x && _), z = `${T}-error`, U = [s && t ? `${T}-hint` : null, F ? z : null].filter(Boolean).join(" ") || void 0, G = c(ot, { color: p.error }), X = c(rt, {
    minWidth: E.minWidth,
    maxWidth: E.maxWidth,
    border: `1px solid ${N}`,
    color: p.inputTextPrimary,
    backgroundColor: p.surface,
    boxShadow: !x && M ? "0 0 0 3px rgba(33, 150, 243, 0.15)" : "none"
  }), Y = c(ct, {
    maxWidth: E.maxWidth
  }), Se = c(st, {
    color: p.inputTextMuted
  }), Q = l || a, Te = (W) => {
    y || O(W.target.value), i == null || i(W);
  }, Ee = (W) => {
    Q || y || O(`${P}${W}`);
  }, we = A === "number" ? {
    min: w,
    ...B != null ? { max: B } : {}
  } : {}, ke = /* @__PURE__ */ b("div", { style: Y, children: [
    /* @__PURE__ */ r(
      "input",
      {
        id: T,
        type: A,
        name: u,
        ...we,
        value: P,
        disabled: l,
        readOnly: a,
        placeholder: "",
        "aria-label": t ? void 0 : k || s,
        "aria-invalid": x || void 0,
        "aria-describedby": U,
        style: c(X, l && it, f),
        onChange: Te,
        onFocus: () => g(!0),
        onBlur: () => g(!1)
      }
    ),
    D ? /* @__PURE__ */ r("span", { style: Se, "aria-hidden": "true", children: s }) : null
  ] }), ee = /* @__PURE__ */ b(ve, { children: [
    t ? /* @__PURE__ */ r("span", { style: L, children: t }) : null,
    s && t ? /* @__PURE__ */ r("span", { id: `${T}-hint`, style: ut, children: s }) : null,
    ke,
    F ? /* @__PURE__ */ r("span", { id: z, style: G, children: _ }) : null
  ] });
  if (v === "key") {
    const W = c(lt, {
      border: `1px solid ${p.lightGrey}`,
      backgroundColor: p.surface,
      color: p.inputTextPrimary
    });
    return /* @__PURE__ */ r("div", { style: c(W, d), children: /* @__PURE__ */ b("div", { style: at, children: [
      /* @__PURE__ */ r("label", { htmlFor: T, style: c(H, dt), children: ee }),
      /* @__PURE__ */ r(
        pt,
        {
          disabled: Q,
          onDigit: Ee,
          colors: p
        }
      )
    ] }) });
  }
  return /* @__PURE__ */ r("label", { htmlFor: T, style: c(H, d), children: ee });
}
const ht = {
  display: "flex",
  flexDirection: "column",
  padding: "2% 4%",
  boxSizing: "border-box",
  gap: "10px"
}, xe = "transform 0.6s ease, opacity 0.6s ease", gt = {
  transform: "translateX(100%)",
  opacity: 0.92
}, yt = {
  transform: "translateX(0)",
  opacity: 1,
  transition: xe
};
function nn({ children: e, style: t, animate: n = !1, ...o }) {
  const [i, s] = m(!n);
  $(() => {
    if (!n) return;
    if (typeof window < "u" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      s(!0);
      return;
    }
    const u = requestAnimationFrame(() => s(!0));
    return () => cancelAnimationFrame(u);
  }, [n]);
  const l = n && !i ? { ...gt, transition: xe } : n ? yt : null;
  return /* @__PURE__ */ r("div", { style: c(ht, l, t), ...o, children: e });
}
const xt = {
  minHeight: "100%",
  boxSizing: "border-box"
};
function on({ children: e, style: t, ...n }) {
  return /* @__PURE__ */ r("div", { style: c(xt, t), ...n, children: e });
}
const bt = {
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  gap: 8
}, mt = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "8px 14px",
  minHeight: 30,
  fontSize: 14,
  fontWeight: 500,
  borderRadius: 6,
  borderWidth: 1,
  borderStyle: "solid",
  cursor: "pointer",
  margin: 0,
  font: "inherit",
  boxSizing: "border-box",
  transition: "border-color 0.15s ease, background-color 0.15s ease, color 0.15s ease"
};
function q(e) {
  return e.background === K.dark.background;
}
function St(e, t, n) {
  const o = e || t, i = q(n) ? j : n.toggleTrackOff, s = q(n) ? j : n.textPrimary;
  return !e && q(n) ? {
    borderColor: o ? n.primary : i,
    color: o ? n.primary : s,
    backgroundColor: "transparent"
  } : {
    borderColor: o ? n.primary : n.toggleTrackOff,
    color: o ? n.primary : n.textPrimary,
    backgroundColor: e ? n.focusBg : "transparent"
  };
}
function Tt({ name: e, active: t, action: n }) {
  const { colors: o } = S(), [i, s] = m(!1), [l, a] = m(!1);
  return /* @__PURE__ */ r(
    "button",
    {
      type: "button",
      onClick: (d) => {
        d.preventDefault(), n == null || n();
      },
      onMouseEnter: () => s(!0),
      onMouseLeave: () => s(!1),
      onFocus: () => a(!0),
      onBlur: () => a(!1),
      style: c(mt, St(t, i || l, o), {
        outline: l ? "none" : void 0
      }),
      children: e
    }
  );
}
function rn({ items: e, style: t }) {
  const { colors: n } = S();
  return /* @__PURE__ */ r("div", { style: c(bt, { color: n.textPrimary }, t), children: e == null ? void 0 : e.map((o) => /* @__PURE__ */ r(
    Tt,
    {
      name: o.name,
      active: o.active,
      action: o.action
    },
    o.name
  )) });
}
const Et = {
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  gap: 12,
  flexShrink: 0
}, wt = {
  display: "flex",
  alignItems: "center",
  gap: 6,
  flexShrink: 0
}, kt = {
  margin: 0,
  fontSize: 16,
  fontWeight: 600,
  lineHeight: 1.3
};
function vt({
  title: e,
  titleId: t,
  toolbar: n,
  toolbarWrap: o = !0,
  style: i
}) {
  const { colors: s } = S(), l = c(kt, { color: s.mastBlue });
  return /* @__PURE__ */ b("header", { style: c(Et, i), children: [
    /* @__PURE__ */ r("h2", { id: t, style: l, children: e }),
    n ? o ? /* @__PURE__ */ r("div", { style: wt, children: n }) : n : null
  ] });
}
const Bt = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: 36,
  height: 36,
  padding: 0,
  borderRadius: 6,
  cursor: "pointer",
  transition: "border-color 0.15s ease, color 0.15s ease, background-color 0.15s ease"
}, _t = { outline: "none" };
function sn({ onClick: e, title: t = "Закрыть", style: n }) {
  const { colors: o } = S(), [i, s] = m(!1), [l, a] = m(!1), u = i || l;
  return /* @__PURE__ */ r(
    "button",
    {
      type: "button",
      title: t,
      "aria-label": t,
      onClick: e,
      style: c(
        Bt,
        {
          border: `1px solid ${o.borderInput}`,
          background: o.bgCard,
          color: o.textMuted
        },
        u && {
          borderColor: o.mainBlue1,
          color: o.mainBlue1,
          backgroundColor: o.focusBg
        },
        l && _t,
        n
      ),
      onMouseEnter: () => s(!0),
      onMouseLeave: () => s(!1),
      onFocus: () => a(!0),
      onBlur: () => a(!1),
      children: /* @__PURE__ */ r("svg", { width: "16", height: "16", viewBox: "0 0 16 16", "aria-hidden": "true", children: /* @__PURE__ */ r(
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
const Ct = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  flex: 1,
  minHeight: 0
}, At = {
  display: "flex",
  flexDirection: "column",
  flex: 1,
  minHeight: 0,
  gap: 16,
  width: "100%"
}, It = {
  display: "flex",
  flexWrap: "wrap",
  gap: 8,
  justifyContent: "flex-end",
  width: "100%",
  marginTop: 16
}, Ot = {
  position: "fixed",
  zIndex: 3,
  top: 0,
  right: 0,
  bottom: 0,
  boxShadow: "0 0 10px 1px #00000070",
  borderRadius: 3,
  height: "100%",
  minHeight: 500,
  padding: "20px 24px",
  overflowY: "auto",
  overflowX: "hidden",
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  boxSizing: "border-box",
  transition: "transform 0.6s ease, opacity 0.6s ease"
};
function ln({
  open: e = !0,
  onClose: t,
  title: n,
  titleId: o,
  toolbar: i,
  headerActions: s,
  children: l,
  footer: a,
  w: u,
  style: h,
  layoutStyle: d,
  rootStyle: f,
  usePortal: w = !0,
  closeOnBackdrop: B = !0
}) {
  const { colors: x } = S(), [_, k] = m(!1);
  if ($(() => {
    if (!e) {
      k(!1);
      return;
    }
    const g = requestAnimationFrame(() => k(!0));
    return () => cancelAnimationFrame(g);
  }, [e]), $(() => {
    if (!e)
      return;
    const g = document.body.style.overflow;
    return document.body.style.overflow = "hidden", () => {
      document.body.style.overflow = g;
    };
  }, [e]), $(() => {
    if (!e || !t)
      return;
    const g = (v) => {
      v.key === "Escape" && t();
    };
    return window.addEventListener("keydown", g), () => window.removeEventListener("keydown", g);
  }, [e, t]), !e)
    return null;
  const p = (g) => {
    B && t && g.target === g.currentTarget && t();
  }, R = i ?? s, T = {
    transform: _ ? "translateX(0)" : "translateX(100%)",
    opacity: _ ? 1 : 0.92
  }, C = /* @__PURE__ */ r(
    "div",
    {
      role: "dialog",
      "aria-modal": "true",
      "aria-labelledby": o,
      onClick: p,
      style: c(
        Ot,
        { background: x.bgCard, color: x.textPrimary },
        T,
        u != null && { width: u },
        f
      ),
      children: /* @__PURE__ */ b(
        "div",
        {
          style: c(Ct, d),
          onClick: (g) => g.stopPropagation(),
          children: [
            /* @__PURE__ */ b(
              "section",
              {
                style: c(At, h),
                "aria-labelledby": o,
                children: [
                  n ? /* @__PURE__ */ r(
                    vt,
                    {
                      title: n,
                      titleId: o,
                      toolbar: R
                    }
                  ) : null,
                  l
                ]
              }
            ),
            a ? /* @__PURE__ */ r("div", { style: It, children: a }) : null
          ]
        }
      )
    }
  );
  return w ? Oe(C, document.body) : C;
}
const Lt = { fontFamily: "inherit" }, be = {
  subt: { tag: "span", style: { fontSize: 15, fontWeight: 600 } },
  title: { tag: "span", style: { fontSize: 24, fontWeight: 700 } },
  p: { tag: "p", style: { fontSize: 14, fontWeight: 400, margin: 0 } },
  li: { tag: "li", style: { fontSize: 14, fontWeight: 400 } },
  span: { tag: "span", style: { fontSize: 14, fontWeight: 400 } }
};
function Mt(e) {
  return Object.hasOwn(be, e) ? e : "span";
}
function an({ children: e, variant: t = "span", color: n, style: o }) {
  const { colors: i } = S(), { tag: s, style: l } = be[Mt(t)], a = c(
    Lt,
    { color: n ?? i.textPrimary },
    l,
    o
  );
  return /* @__PURE__ */ r(s, { style: a, children: e });
}
const Rt = {
  fontWeight: 400,
  fontSize: 14
}, Pt = {
  display: "flex",
  alignItems: "center",
  gap: 8,
  cursor: "pointer",
  fontSize: 14,
  margin: 0,
  padding: 0,
  border: "none",
  outline: "none",
  background: "none",
  font: "inherit",
  color: "inherit",
  textAlign: "left"
}, Wt = {
  position: "relative",
  width: 36,
  height: 20,
  borderRadius: 20,
  flexShrink: 0,
  transition: "background-color 0.2s"
}, Dt = {
  position: "absolute",
  top: 2,
  left: 2,
  width: 16,
  height: 16,
  borderRadius: "50%",
  transition: "transform 0.2s",
  zIndex: 1
}, Ht = {
  position: "absolute",
  inset: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0 3px",
  boxSizing: "border-box",
  pointerEvents: "none"
}, ce = { display: "flex", lineHeight: 0 }, Nt = { cursor: "not-allowed", opacity: 0.55 };
function Ft({
  active: e,
  label: t,
  variant: n = "switch",
  onClick: o,
  onChange: i,
  style: s,
  disabled: l = !1,
  ariaLabel: a,
  trackStartIcon: u,
  trackEndIcon: h
}) {
  const { colors: d } = S(), f = c(Rt, { color: d.textMain });
  if (n === "text")
    return t ? /* @__PURE__ */ r("span", { style: c(f, s), children: t }) : null;
  const w = (p) => {
    p.preventDefault(), !l && (o == null || o(p), i == null || i(!e));
  }, B = c(Wt, {
    backgroundColor: e ? d.mainBlue1 : d.toggleTrackOff
  }), x = c(Ht, {
    color: e ? d.knob : d.textMuted
  }), _ = c(Dt, {
    backgroundColor: d.knob,
    transform: e ? "translateX(16px)" : "translateX(0)"
  }), k = c(
    Pt,
    l && Nt,
    s
  );
  return /* @__PURE__ */ b(
    "button",
    {
      type: "button",
      style: k,
      onClick: w,
      "aria-pressed": !!e,
      "aria-label": a || (t ? void 0 : "Переключатель"),
      disabled: l,
      children: [
        /* @__PURE__ */ b("span", { style: B, "aria-hidden": "true", children: [
          u || h ? /* @__PURE__ */ b("span", { style: x, children: [
            /* @__PURE__ */ r("span", { style: ce, children: u }),
            /* @__PURE__ */ r("span", { style: ce, children: h })
          ] }) : null,
          /* @__PURE__ */ r("span", { style: _ })
        ] }),
        t ? /* @__PURE__ */ r("span", { style: f, children: t }) : null
      ]
    }
  );
}
const zt = {
  border: "none",
  outline: "none",
  boxShadow: "none"
}, me = { display: "flex", lineHeight: 0 };
function Yt() {
  return /* @__PURE__ */ b(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: "12",
      height: "12",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.7",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": "true",
      children: [
        /* @__PURE__ */ r("circle", { cx: "12", cy: "12", r: "4" }),
        /* @__PURE__ */ r("path", { d: "M12 2v2" }),
        /* @__PURE__ */ r("path", { d: "M12 20v2" }),
        /* @__PURE__ */ r("path", { d: "m4.93 4.93 1.42 1.42" }),
        /* @__PURE__ */ r("path", { d: "m17.65 17.65 1.42 1.42" }),
        /* @__PURE__ */ r("path", { d: "M2 12h2" }),
        /* @__PURE__ */ r("path", { d: "M20 12h2" }),
        /* @__PURE__ */ r("path", { d: "m6.35 17.65-1.42 1.42" }),
        /* @__PURE__ */ r("path", { d: "m19.07 4.93-1.42 1.42" })
      ]
    }
  );
}
function $t() {
  return /* @__PURE__ */ r(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: "12",
      height: "12",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.7",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": "true",
      children: /* @__PURE__ */ r("path", { d: "M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5 7.75 7.75 0 1 0 20.5 14.2Z" })
    }
  );
}
const jt = /* @__PURE__ */ r("span", { style: me, children: /* @__PURE__ */ r($t, {}) }), Kt = /* @__PURE__ */ r("span", { style: me, children: /* @__PURE__ */ r(Yt, {}) });
function cn({
  theme: e,
  onThemeChange: t,
  label: n = "Тёмная тема",
  style: o,
  disabled: i = !1
}) {
  const { theme: s, setTheme: l } = S(), u = (e ?? s) === "dark";
  return /* @__PURE__ */ r(
    Ft,
    {
      active: u,
      label: n,
      onChange: (f) => {
        const w = f ? "dark" : "light";
        if (e !== void 0 && t) {
          t(w);
          return;
        }
        l(w);
      },
      disabled: i,
      ariaLabel: n || (u ? "Включить светлую тему" : "Включить тёмную тему"),
      trackStartIcon: jt,
      trackEndIcon: Kt,
      style: c(zt, o)
    }
  );
}
export {
  Zt as Box,
  Jt as Button,
  Qt as Container,
  ge as INPUT_NATIVE_TYPE,
  en as Icon,
  tn as Input,
  de as LIGHT_GREY,
  nn as Layout,
  Z as MAST_BLUE,
  on as Main,
  rn as RadioBtn,
  ln as SideDrawer,
  sn as SideDrawerCloseButton,
  vt as SiteModalHeader,
  an as Text,
  Vt as ThemeProvider,
  cn as ThemeToggle,
  Ft as Toggle,
  pe as getThemeColors,
  c as mergeStyle,
  Ve as resolveIconComponent,
  qe as resolveIconSrc,
  K as themes,
  qt as tokens,
  S as useTheme
};
