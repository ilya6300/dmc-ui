import { jsx as r, jsxs as g, Fragment as we } from "react/jsx-runtime";
import { createContext as ke, useState as S, useCallback as Te, useMemo as Ce, useContext as Ee, useEffect as R, useId as Ie, useRef as Me } from "react";
import { createPortal as Be } from "react-dom";
const Pe = 4, F = "#2196f3", L = "rgb(233, 233, 233)", ee = "#e2e8f0", te = F, We = {
  background: "#ffffff",
  surface: "#ffffff",
  textPrimary: "#1e293b",
  textSecondary: "#64748b",
  border: ee,
  primary: te,
  error: "#df2727",
  mastBlue: F,
  mastYellow: "#f0b323",
  cardShadowColor: "rgba(0, 0, 0, 0.25)",
  focusBg: "#f0f7ff",
  toggleTrackOff: "#cbd5e1",
  knob: "#ffffff"
}, Re = {
  background: "#121212",
  surface: "#1e1e1e",
  textPrimary: L,
  textSecondary: L,
  inputTextPrimary: "#ffffff",
  inputTextMuted: "#b3b3b3",
  border: "#383838",
  primary: te,
  error: "#f87171",
  mastBlue: F,
  mastYellow: "#f0b323",
  cardShadowColor: "rgba(0, 0, 0, 0.45)",
  focusBg: "#1e3a5f",
  toggleTrackOff: "#475569",
  knob: "#ffffff"
};
function ne(e, t = 12) {
  return t === 0 ? "none" : `0 ${Pe}px ${t}px ${e.cardShadowColor}`;
}
function V(e) {
  const t = `1px solid ${e.border}`, n = { ...e };
  return {
    ...n,
    cardShadow: ne(n, 12),
    mainBlue1: e.primary,
    textMain: e.textPrimary,
    textMuted: e.textSecondary,
    bgCard: e.surface,
    borderLight: t,
    lightGrey: ee,
    borderInput: e.border,
    inputTextPrimary: e.inputTextPrimary ?? e.textPrimary,
    inputTextMuted: e.inputTextMuted ?? e.textSecondary
  };
}
const O = {
  light: V(We),
  dark: V(Re)
};
function oe(e) {
  return O[e] ?? O.light;
}
const pt = O.light;
function u(...e) {
  return Object.assign({}, ...e.filter(Boolean));
}
const Le = () => {
}, re = ke({
  theme: "light",
  setTheme: Le,
  colors: oe("light")
});
function ht({
  children: e,
  theme: t,
  onThemeChange: n,
  defaultTheme: o = "light"
}) {
  const [s, l] = S(o), i = t !== void 0, a = i ? t : s, c = Te(
    (d) => {
      const p = typeof d == "function" ? d(a) : d;
      i || l(p), n == null || n(p);
    },
    [i, n, a]
  ), f = Ce(
    () => ({
      theme: a,
      setTheme: c,
      colors: oe(a)
    }),
    [a, c]
  );
  return /* @__PURE__ */ r(re.Provider, { value: f, children: e });
}
function x() {
  return Ee(re);
}
function yt({ children: e, style: t, title: n, w: o, shadow: s = 12, ...l }) {
  const { colors: i } = x(), a = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    gap: 10,
    backgroundColor: i.bgCard,
    borderRadius: 12,
    padding: 24,
    boxShadow: ne(i, s),
    border: i.borderLight,
    boxSizing: "border-box",
    color: i.textPrimary
  }, c = {
    fontSize: 16,
    fontWeight: 600,
    color: i.mastBlue
  };
  return /* @__PURE__ */ g("div", { style: u(a, { width: o ?? "100%" }, t), ...l, children: [
    n ? /* @__PURE__ */ r("span", { style: c, children: n }) : null,
    e
  ] });
}
const Oe = {
  display: "flex",
  boxSizing: "border-box",
  flexWrap: "wrap"
}, K = {
  start: "flex-start",
  end: "flex-end",
  center: "center",
  stretch: "stretch",
  between: "space-between",
  around: "space-around",
  evenly: "space-evenly"
};
function q(e, t) {
  return K[e] ?? K[t];
}
const Ae = {
  row: "row",
  col: "column"
};
function De(e) {
  return Ae[e] ?? "row";
}
function _e({ direction: e, justify: t, align: n, gap: o, w: s }) {
  return {
    flexDirection: De(e),
    justifyContent: q(t, "start"),
    alignItems: q(n, "stretch"),
    gap: o,
    width: s ?? "100%"
  };
}
function gt({
  children: e,
  style: t,
  w: n,
  direction: o = "row",
  justify: s = "start",
  align: l = "stretch",
  gap: i = 10,
  ...a
}) {
  const { colors: c } = x();
  return /* @__PURE__ */ r(
    "div",
    {
      style: u(
        Oe,
        _e({ direction: o, justify: s, align: l, gap: i, w: n }),
        { color: c.textPrimary },
        t
      ),
      ...a,
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
}, ie = "transform 0.6s ease, opacity 0.6s ease", Fe = {
  transform: "translateX(100%)",
  opacity: 0.92
}, ze = {
  transform: "translateX(0)",
  opacity: 1,
  transition: ie
};
function xt({ children: e, style: t, animate: n = !1, ...o }) {
  const [s, l] = S(!n);
  R(() => {
    if (!n) return;
    if (typeof window < "u" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      l(!0);
      return;
    }
    const c = requestAnimationFrame(() => l(!0));
    return () => cancelAnimationFrame(c);
  }, [n]);
  const i = n && !s ? { ...Fe, transition: ie } : n ? ze : null;
  return /* @__PURE__ */ r("div", { style: u(He, i, t), ...o, children: e });
}
const Ne = {
  minHeight: "100%",
  boxSizing: "border-box"
};
function bt({ children: e, style: t, ...n }) {
  return /* @__PURE__ */ r("div", { style: u(Ne, t), ...n, children: e });
}
function je({
  active: e,
  label: t,
  variant: n = "switch",
  onClick: o,
  onChange: s,
  style: l,
  disabled: i = !1,
  ariaLabel: a,
  trackStartIcon: c,
  trackEndIcon: f
}) {
  const { colors: d } = x(), p = {
    color: d.textMain,
    fontWeight: 400,
    fontSize: 14
  }, w = {
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
  }, b = {
    position: "relative",
    width: 36,
    height: 20,
    borderRadius: 20,
    flexShrink: 0,
    transition: "background-color 0.2s"
  }, v = {
    position: "absolute",
    top: 2,
    left: 2,
    width: 16,
    height: 16,
    backgroundColor: d.knob,
    borderRadius: "50%",
    transition: "transform 0.2s",
    zIndex: 1
  };
  if (n === "text")
    return t ? /* @__PURE__ */ r("span", { style: u(p, l), children: t }) : null;
  const T = (E) => {
    E.preventDefault(), !i && (o == null || o(E), s == null || s(!e));
  }, C = u(b, {
    backgroundColor: e ? d.mainBlue1 : d.toggleTrackOff
  }), h = {
    position: "absolute",
    inset: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 3px",
    boxSizing: "border-box",
    pointerEvents: "none",
    color: e ? d.knob : d.textMuted
  }, I = u(v, {
    transform: e ? "translateX(16px)" : "translateX(0)"
  }), m = u(
    w,
    i && { cursor: "not-allowed", opacity: 0.55 },
    l
  );
  return /* @__PURE__ */ g(
    "button",
    {
      type: "button",
      style: m,
      onClick: T,
      "aria-pressed": !!e,
      "aria-label": a || (t ? void 0 : "Переключатель"),
      disabled: i,
      children: [
        /* @__PURE__ */ g("span", { style: C, "aria-hidden": "true", children: [
          c || f ? /* @__PURE__ */ g("span", { style: h, children: [
            /* @__PURE__ */ r("span", { style: { display: "flex", lineHeight: 0 }, children: c }),
            /* @__PURE__ */ r("span", { style: { display: "flex", lineHeight: 0 }, children: f })
          ] }) : null,
          /* @__PURE__ */ r("span", { style: I })
        ] }),
        t ? /* @__PURE__ */ r("span", { style: p, children: t }) : null
      ]
    }
  );
}
const Ye = {
  border: "none",
  outline: "none",
  boxShadow: "none"
}, Z = { display: "flex", lineHeight: 0 };
function $e() {
  return /* @__PURE__ */ g(
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
function Ge() {
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
function mt({
  theme: e,
  onThemeChange: t,
  label: n = "Тёмная тема",
  style: o,
  disabled: s = !1
}) {
  const { theme: l, setTheme: i } = x(), a = e ?? l, c = e !== void 0 && t !== void 0, f = a === "dark";
  return /* @__PURE__ */ r(
    je,
    {
      active: f,
      label: n,
      onChange: (w) => {
        const b = w ? "dark" : "light";
        if (c) {
          t(b);
          return;
        }
        i(b);
      },
      disabled: s,
      ariaLabel: n || (f ? "Включить светлую тему" : "Включить тёмную тему"),
      trackStartIcon: /* @__PURE__ */ r("span", { style: Z, children: /* @__PURE__ */ r(Ge, {}) }),
      trackEndIcon: /* @__PURE__ */ r("span", { style: Z, children: /* @__PURE__ */ r($e, {}) }),
      style: u(Ye, o)
    }
  );
}
function Xe(e, { component: t, darkComponent: n }) {
  return e === "dark" && n ? n : t || null;
}
function Ue(e, { src: t, darkSrc: n }) {
  return e === "dark" && n || t;
}
function St({
  src: e,
  darkSrc: t,
  component: n,
  darkComponent: o,
  alt: s = "",
  style: l,
  width: i,
  height: a,
  ...c
}) {
  const { theme: f } = x(), d = Xe(f, { component: n, darkComponent: o });
  if (d)
    return /* @__PURE__ */ r(
      d,
      {
        style: u(
          i != null || a != null ? { width: i, height: a, display: "block" } : null,
          l
        ),
        "aria-hidden": s ? void 0 : !0,
        role: s ? "img" : void 0,
        "aria-label": s || void 0,
        ...c
      }
    );
  const p = Ue(f, { src: e, darkSrc: t });
  return p ? /* @__PURE__ */ r(
    "img",
    {
      src: p,
      alt: s,
      width: i,
      height: a,
      style: u({ display: "block" }, l),
      ...c
    }
  ) : null;
}
const Ve = {
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  gap: 12,
  flexShrink: 0
}, Ke = {
  display: "flex",
  alignItems: "center",
  gap: 6,
  flexShrink: 0
};
function qe({
  title: e,
  titleId: t,
  toolbar: n,
  toolbarWrap: o = !0,
  style: s
}) {
  const { colors: l } = x(), i = {
    margin: 0,
    fontSize: 16,
    fontWeight: 600,
    color: l.mastBlue,
    lineHeight: 1.3
  };
  return /* @__PURE__ */ g("header", { style: u(Ve, s), children: [
    /* @__PURE__ */ r("h2", { id: t, style: i, children: e }),
    n ? o ? /* @__PURE__ */ r("div", { style: Ke, children: n }) : n : null
  ] });
}
function vt({ onClick: e, title: t = "Закрыть", style: n }) {
  const { colors: o } = x(), [s, l] = S(!1), [i, a] = S(!1), c = {
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
  }, f = {
    borderColor: o.mainBlue1,
    color: o.mainBlue1,
    backgroundColor: o.focusBg
  };
  return /* @__PURE__ */ r(
    "button",
    {
      type: "button",
      title: t,
      "aria-label": t,
      onClick: e,
      style: u(
        c,
        (s || i) && f,
        i && { outline: "none" },
        n
      ),
      onMouseEnter: () => l(!0),
      onMouseLeave: () => l(!1),
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
const Ze = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  flex: 1,
  minHeight: 0
}, Je = {
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
function wt({
  open: e = !0,
  onClose: t,
  title: n,
  titleId: o,
  toolbar: s,
  headerActions: l,
  children: i,
  footer: a,
  w: c,
  style: f,
  layoutStyle: d,
  rootStyle: p,
  usePortal: w = !0,
  closeOnBackdrop: b = !0
}) {
  const { colors: v } = x(), [T, C] = S(!1), h = {
    position: "fixed",
    zIndex: 3,
    top: 0,
    right: 0,
    bottom: 0,
    boxShadow: "0 0 10px 1px #00000070",
    borderRadius: 3,
    background: v.bgCard,
    height: "100%",
    minHeight: 500,
    padding: "20px 24px",
    overflowY: "auto",
    overflowX: "hidden",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    boxSizing: "border-box",
    color: v.textPrimary,
    transition: "transform 0.6s ease, opacity 0.6s ease"
  };
  if (R(() => {
    if (!e) {
      C(!1);
      return;
    }
    const y = requestAnimationFrame(() => C(!0));
    return () => cancelAnimationFrame(y);
  }, [e]), R(() => {
    if (!e)
      return;
    const y = document.body.style.overflow;
    return document.body.style.overflow = "hidden", () => {
      document.body.style.overflow = y;
    };
  }, [e]), R(() => {
    if (!e || !t)
      return;
    const y = (B) => {
      B.key === "Escape" && t();
    };
    return window.addEventListener("keydown", y), () => window.removeEventListener("keydown", y);
  }, [e, t]), !e)
    return null;
  const I = (y) => {
    b && t && y.target === y.currentTarget && t();
  }, m = s ?? l, M = /* @__PURE__ */ r(
    "div",
    {
      role: "dialog",
      "aria-modal": "true",
      "aria-labelledby": o,
      onClick: I,
      style: u(h, {
        transform: T ? "translateX(0)" : "translateX(100%)",
        opacity: T ? 1 : 0.92
      }, c != null && { width: c }, p),
      children: /* @__PURE__ */ g(
        "div",
        {
          style: u(Ze, d),
          onClick: (y) => y.stopPropagation(),
          children: [
            /* @__PURE__ */ g(
              "section",
              {
                style: u(Je, f),
                "aria-labelledby": o,
                children: [
                  n ? /* @__PURE__ */ r(
                    qe,
                    {
                      title: n,
                      titleId: o,
                      toolbar: m
                    }
                  ) : null,
                  i
                ]
              }
            ),
            a ? /* @__PURE__ */ r("div", { style: Qe, children: a }) : null
          ]
        }
      )
    }
  );
  return w ? Be(M, document.body) : M;
}
const le = {
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
], J = 'source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace';
function nt(e) {
  return Object.hasOwn(le, e) ? e : "text";
}
function Q({ digit: e, disabled: t, onPress: n, colors: o, gridColumn: s }) {
  const [l, i] = S(!1), a = l && !t ? o.mastBlue : o.lightGrey, c = l && !t ? o.mastBlue : o.inputTextPrimary, f = {
    boxSizing: "border-box",
    minHeight: 36,
    minWidth: 36,
    padding: "6px 8px",
    borderRadius: 6,
    border: `1px solid ${a}`,
    backgroundColor: o.surface,
    color: c,
    fontSize: 14,
    fontWeight: 500,
    fontFamily: "inherit",
    cursor: t ? "not-allowed" : "pointer",
    opacity: t ? 0.55 : 1,
    outline: "none",
    boxShadow: "none",
    WebkitTapHighlightColor: "transparent",
    transition: "border-color 0.15s ease, color 0.15s ease",
    ...s ? { gridColumn: s } : {}
  }, d = () => i(!1);
  return /* @__PURE__ */ r(
    "button",
    {
      type: "button",
      disabled: t,
      "aria-label": `Цифра ${e}`,
      style: f,
      onMouseDown: (p) => {
        t || p.preventDefault();
      },
      onPointerDown: (p) => {
        t || (p.preventDefault(), i(!0));
      },
      onPointerUp: d,
      onPointerLeave: d,
      onPointerCancel: d,
      onBlur: d,
      onClick: (p) => {
        t || n(e), p.currentTarget.blur();
      },
      children: e
    }
  );
}
function ot({ disabled: e, onDigit: t, colors: n }) {
  return /* @__PURE__ */ g("div", { style: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 6,
    flexShrink: 0
  }, role: "group", "aria-label": "Цифровая клавиатура", children: [
    tt.flatMap(
      (s, l) => s.map((i) => /* @__PURE__ */ r(
        Q,
        {
          digit: i,
          disabled: e,
          colors: n,
          onPress: t
        },
        `${l}-${i}`
      ))
    ),
    /* @__PURE__ */ r(
      Q,
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
function kt({
  type: e = "text",
  label: t,
  value: n,
  defaultValue: o,
  onChange: s,
  placeholder: l,
  disabled: i = !1,
  readOnly: a = !1,
  name: c,
  id: f,
  style: d,
  inputStyle: p,
  min: w = 0,
  max: b,
  error: v = !1,
  msg: T,
  "aria-label": C
}) {
  const { colors: h } = x(), I = Ie(), m = f ?? I, E = Me(null), [M, y] = S(!1), B = nt(e), z = le[B], A = et[B], D = n !== void 0, [ae, N] = S(o ?? ""), _ = D ? n ?? "" : ae, ce = l && String(_).length === 0 && !M, j = {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    minWidth: 140,
    flex: "0 0 auto",
    color: h.inputTextPrimary,
    justifyContent: "space-between",
    height: "100%"
  }, de = {
    fontSize: 12,
    color: h.inputTextMuted
  }, Y = !i && M, ue = v ? h.error : Y ? h.mastBlue : h.lightGrey, $ = !!(v && T), G = `${m}-error`, fe = [l && t ? `${m}-hint` : null, $ ? G : null].filter(Boolean).join(" ") || void 0, pe = {
    fontSize: 12,
    lineHeight: 1.35,
    color: h.error
  }, he = {
    boxSizing: "border-box",
    width: "100%",
    minWidth: A.minWidth,
    maxWidth: A.maxWidth,
    minHeight: 40,
    padding: "8px 12px",
    border: `1px solid ${ue}`,
    borderRadius: 6,
    fontSize: 14,
    lineHeight: 1.35,
    fontFamily: J,
    color: h.inputTextPrimary,
    backgroundColor: h.surface,
    outline: "none",
    boxShadow: !v && Y ? "0 0 0 3px rgba(33, 150, 243, 0.15)" : "none",
    transition: "border-color 0.15s ease, box-shadow 0.15s ease"
  }, ye = {
    position: "relative",
    width: "100%",
    maxWidth: A.maxWidth
  }, ge = {
    position: "absolute",
    left: 12,
    top: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    pointerEvents: "none",
    color: h.inputTextMuted,
    fontSize: 14,
    lineHeight: 1.35,
    fontFamily: J
  }, X = i || a, xe = (k) => {
    D || N(k.target.value), s == null || s(k);
  }, be = (k) => {
    var W;
    D || N(k), E.current && ((W = Object.getOwnPropertyDescriptor(
      window.HTMLInputElement.prototype,
      "value"
    )) == null || W.set);
  }, me = (k) => {
    if (X) return;
    const P = `${_}${k}`;
    be(P);
  }, Se = z === "number" ? {
    min: w,
    ...b != null ? { max: b } : {}
  } : {}, ve = /* @__PURE__ */ g("div", { style: ye, children: [
    /* @__PURE__ */ r(
      "input",
      {
        ref: E,
        id: m,
        type: z,
        name: c,
        ...Se,
        value: _,
        disabled: i,
        readOnly: a,
        placeholder: "",
        "aria-label": t ? void 0 : C || l,
        "aria-invalid": v || void 0,
        "aria-describedby": fe,
        style: u(
          he,
          i && { opacity: 0.55, cursor: "not-allowed" },
          p
        ),
        onChange: xe,
        onFocus: () => y(!0),
        onBlur: () => y(!1)
      }
    ),
    ce ? /* @__PURE__ */ r("span", { style: ge, "aria-hidden": "true", children: l }) : null
  ] }), U = /* @__PURE__ */ g(we, { children: [
    t ? /* @__PURE__ */ r("span", { style: de, children: t }) : null,
    l && t ? /* @__PURE__ */ r("span", { id: `${m}-hint`, style: { display: "none" }, children: l }) : null,
    ve,
    $ ? /* @__PURE__ */ r("span", { id: G, style: pe, children: T }) : null
  ] });
  if (B === "key") {
    const k = {
      display: "flex",
      flexDirection: "column",
      gap: 4,
      padding: 12,
      border: `1px solid ${h.lightGrey}`,
      borderRadius: 8,
      backgroundColor: h.surface,
      color: h.inputTextPrimary,
      flex: "0 0 auto",
      height: "165px"
    }, P = {
      display: "flex",
      alignItems: "flex-start",
      gap: 12
    }, W = u(j, { minWidth: 0 });
    return /* @__PURE__ */ r("div", { style: u(k, d), children: /* @__PURE__ */ g("div", { style: P, children: [
      /* @__PURE__ */ r("label", { htmlFor: m, style: W, children: U }),
      /* @__PURE__ */ r(
        ot,
        {
          disabled: X,
          onDigit: me,
          colors: h
        }
      )
    ] }) });
  }
  return /* @__PURE__ */ r("label", { htmlFor: m, style: u(j, d), children: U });
}
const rt = {
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  gap: 8
}, it = {
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
function H(e) {
  return e.background === O.dark.background;
}
function lt(e, t, n) {
  const o = e || t, s = H(n) ? L : n.toggleTrackOff, l = H(n) ? L : n.textPrimary;
  return !e && H(n) ? {
    borderColor: o ? n.primary : s,
    color: o ? n.primary : l,
    backgroundColor: "transparent"
  } : {
    borderColor: o ? n.primary : n.toggleTrackOff,
    color: o ? n.primary : n.textPrimary,
    backgroundColor: e ? n.focusBg : "transparent"
  };
}
function st({ name: e, active: t, action: n }) {
  const { colors: o } = x(), [s, l] = S(!1), [i, a] = S(!1);
  return /* @__PURE__ */ r(
    "button",
    {
      type: "button",
      onClick: (d) => {
        d.preventDefault(), n == null || n();
      },
      onMouseEnter: () => l(!0),
      onMouseLeave: () => l(!1),
      onFocus: () => a(!0),
      onBlur: () => a(!1),
      style: u(it, lt(t, s || i, o), {
        outline: i ? "none" : void 0
      }),
      children: e
    }
  );
}
function Tt({ items: e, style: t }) {
  const { colors: n } = x();
  return /* @__PURE__ */ r("div", { style: u(rt, { color: n.textPrimary }, t), children: e == null ? void 0 : e.map((o) => /* @__PURE__ */ r(
    st,
    {
      name: o.name,
      active: o.active,
      action: o.action
    },
    o.name
  )) });
}
const se = {
  subt: {
    tag: "span",
    fontSize: 15,
    fontWeight: 600
  },
  title: {
    tag: "span",
    fontSize: 24,
    fontWeight: 700
  },
  p: {
    tag: "p",
    fontSize: 14,
    fontWeight: 400,
    margin: 0
  },
  li: {
    tag: "li",
    fontSize: 14,
    fontWeight: 400
  },
  span: {
    tag: "span",
    fontSize: 14,
    fontWeight: 400
  }
};
function at(e) {
  return Object.hasOwn(se, e) ? e : "span";
}
function Ct({ children: e, variant: t = "span", color: n, style: o }) {
  const { colors: s } = x(), l = at(t), { tag: i, ...a } = se[l], c = i, f = u(
    {
      fontFamily: "inherit",
      color: n ?? s.textPrimary,
      ...a
    },
    o
  );
  return /* @__PURE__ */ r(c, { style: f, children: e });
}
const Et = (...e) => e.filter(Boolean).join(" ");
export {
  yt as Box,
  gt as Container,
  le as INPUT_NATIVE_TYPE,
  St as Icon,
  kt as Input,
  ee as LIGHT_GREY,
  xt as Layout,
  F as MAST_BLUE,
  bt as Main,
  Tt as RadioBtn,
  wt as SideDrawer,
  vt as SideDrawerCloseButton,
  qe as SiteModalHeader,
  Ct as Text,
  ht as ThemeProvider,
  mt as ThemeToggle,
  je as Toggle,
  oe as getThemeColors,
  Et as joinClass,
  u as mergeStyle,
  Xe as resolveIconComponent,
  Ue as resolveIconSrc,
  O as themes,
  pt as tokens,
  x as useTheme
};
