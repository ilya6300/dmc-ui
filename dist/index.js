import { jsx as o, jsxs as g, Fragment as Se } from "react/jsx-runtime";
import { createContext as ve, useState as m, useCallback as we, useMemo as ke, useContext as Te, useEffect as L, useId as Ce, useRef as Ee } from "react";
import { createPortal as Ie } from "react-dom";
const Be = 4, _ = "#2196f3", J = "#e2e8f0", Q = _, Me = {
  background: "#ffffff",
  surface: "#ffffff",
  textPrimary: "#1e293b",
  textSecondary: "#64748b",
  border: J,
  primary: Q,
  error: "#df2727",
  mastBlue: _,
  mastYellow: "#f0b323",
  cardShadowColor: "rgba(0, 0, 0, 0.25)",
  focusBg: "#f0f7ff",
  toggleTrackOff: "#cbd5e1",
  knob: "#ffffff"
}, We = {
  background: "#121212",
  surface: "#1e1e1e",
  textPrimary: "#ffffff",
  textSecondary: "#b3b3b3",
  border: "#383838",
  primary: Q,
  error: "#f87171",
  mastBlue: _,
  mastYellow: "#f0b323",
  cardShadowColor: "rgba(0, 0, 0, 0.45)",
  focusBg: "#1e3a5f",
  toggleTrackOff: "#475569",
  knob: "#ffffff"
};
function ee(e, t = 12) {
  return t === 0 ? "none" : `0 ${Be}px ${t}px ${e.cardShadowColor}`;
}
function X(e) {
  const t = `1px solid ${e.border}`, n = { ...e };
  return {
    ...n,
    cardShadow: ee(n, 12),
    mainBlue1: e.primary,
    textMain: e.textPrimary,
    textMuted: e.textSecondary,
    bgCard: e.surface,
    borderLight: t,
    lightGrey: J,
    borderInput: e.border
  };
}
const D = {
  light: X(Me),
  dark: X(We)
};
function te(e) {
  return D[e] ?? D.light;
}
const ut = D.light;
function u(...e) {
  return Object.assign({}, ...e.filter(Boolean));
}
const Re = () => {
}, ne = ve({
  theme: "light",
  setTheme: Re,
  colors: te("light")
});
function ft({
  children: e,
  theme: t,
  onThemeChange: n,
  defaultTheme: r = "light"
}) {
  const [s, l] = m(r), i = t !== void 0, a = i ? t : s, c = we(
    (d) => {
      const h = typeof d == "function" ? d(a) : d;
      i || l(h), n == null || n(h);
    },
    [i, n, a]
  ), f = ke(
    () => ({
      theme: a,
      setTheme: c,
      colors: te(a)
    }),
    [a, c]
  );
  return /* @__PURE__ */ o(ne.Provider, { value: f, children: e });
}
function x() {
  return Te(ne);
}
function ht({ children: e, style: t, title: n, w: r, shadow: s = 12, ...l }) {
  const { colors: i } = x(), a = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    gap: 10,
    backgroundColor: i.bgCard,
    borderRadius: 12,
    padding: 24,
    boxShadow: ee(i, s),
    border: i.borderLight,
    boxSizing: "border-box",
    color: i.textPrimary
  }, c = {
    fontSize: 16,
    fontWeight: 600,
    color: i.mastBlue
  };
  return /* @__PURE__ */ g("div", { style: u(a, { width: r ?? "100%" }, t), ...l, children: [
    n ? /* @__PURE__ */ o("span", { style: c, children: n }) : null,
    e
  ] });
}
const Le = {
  display: "flex",
  boxSizing: "border-box",
  flexWrap: "wrap"
}, V = {
  start: "flex-start",
  end: "flex-end",
  center: "center",
  stretch: "stretch",
  between: "space-between",
  around: "space-around",
  evenly: "space-evenly"
};
function U(e, t) {
  return V[e] ?? V[t];
}
const Oe = {
  row: "row",
  col: "column"
};
function Pe(e) {
  return Oe[e] ?? "row";
}
function Ae({ direction: e, justify: t, align: n, gap: r, w: s }) {
  return {
    flexDirection: Pe(e),
    justifyContent: U(t, "start"),
    alignItems: U(n, "stretch"),
    gap: r,
    width: s ?? "100%"
  };
}
function pt({
  children: e,
  style: t,
  w: n,
  direction: r = "row",
  justify: s = "start",
  align: l = "stretch",
  gap: i = 10,
  ...a
}) {
  const { colors: c } = x();
  return /* @__PURE__ */ o(
    "div",
    {
      style: u(
        Le,
        Ae({ direction: r, justify: s, align: l, gap: i, w: n }),
        { color: c.textPrimary },
        t
      ),
      ...a,
      children: e
    }
  );
}
const De = {
  display: "flex",
  flexDirection: "column",
  padding: "2% 4%",
  boxSizing: "border-box",
  gap: "10px"
}, oe = "transform 0.6s ease, opacity 0.6s ease", _e = {
  transform: "translateX(100%)",
  opacity: 0.92
}, Fe = {
  transform: "translateX(0)",
  opacity: 1,
  transition: oe
};
function yt({ children: e, style: t, animate: n = !1, ...r }) {
  const [s, l] = m(!n);
  L(() => {
    if (!n) return;
    if (typeof window < "u" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      l(!0);
      return;
    }
    const c = requestAnimationFrame(() => l(!0));
    return () => cancelAnimationFrame(c);
  }, [n]);
  const i = n && !s ? { ..._e, transition: oe } : n ? Fe : null;
  return /* @__PURE__ */ o("div", { style: u(De, i, t), ...r, children: e });
}
const He = {
  minHeight: "100%",
  boxSizing: "border-box"
};
function gt({ children: e, style: t, ...n }) {
  return /* @__PURE__ */ o("div", { style: u(He, t), ...n, children: e });
}
function ze({
  active: e,
  label: t,
  variant: n = "switch",
  onClick: r,
  onChange: s,
  style: l,
  disabled: i = !1,
  ariaLabel: a,
  trackStartIcon: c,
  trackEndIcon: f
}) {
  const { colors: d } = x(), [h, v] = m(!1), b = {
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
    background: "none",
    font: "inherit",
    color: "inherit",
    textAlign: "left"
  }, T = {
    position: "relative",
    width: 36,
    height: 20,
    borderRadius: 20,
    flexShrink: 0,
    transition: "background-color 0.2s"
  }, E = {
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
    return t ? /* @__PURE__ */ o("span", { style: u(b, l), children: t }) : null;
  const p = (y) => {
    y.preventDefault(), !i && (r == null || r(y), s == null || s(!e));
  }, I = u(T, {
    backgroundColor: e ? d.mainBlue1 : d.toggleTrackOff
  }), S = {
    position: "absolute",
    inset: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 3px",
    boxSizing: "border-box",
    pointerEvents: "none",
    color: e ? d.knob : d.textMuted
  }, B = u(E, {
    transform: e ? "translateX(16px)" : "translateX(0)"
  }), C = u(
    w,
    i && { cursor: "not-allowed", opacity: 0.55 },
    h && {
      outline: `2px solid ${d.mainBlue1}`,
      outlineOffset: 2,
      borderRadius: 4
    },
    l
  );
  return /* @__PURE__ */ g(
    "button",
    {
      type: "button",
      style: C,
      onClick: p,
      "aria-pressed": !!e,
      "aria-label": a || (t ? void 0 : "Переключатель"),
      disabled: i,
      onFocus: () => v(!0),
      onBlur: () => v(!1),
      children: [
        /* @__PURE__ */ g("span", { style: I, "aria-hidden": "true", children: [
          c || f ? /* @__PURE__ */ g("span", { style: S, children: [
            /* @__PURE__ */ o("span", { style: { display: "flex", lineHeight: 0 }, children: c }),
            /* @__PURE__ */ o("span", { style: { display: "flex", lineHeight: 0 }, children: f })
          ] }) : null,
          /* @__PURE__ */ o("span", { style: B })
        ] }),
        t ? /* @__PURE__ */ o("span", { style: b, children: t }) : null
      ]
    }
  );
}
const Ne = {
  border: "none",
  outline: "none",
  boxShadow: "none"
}, K = { display: "flex", lineHeight: 0 };
function je() {
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
        /* @__PURE__ */ o("circle", { cx: "12", cy: "12", r: "4" }),
        /* @__PURE__ */ o("path", { d: "M12 2v2" }),
        /* @__PURE__ */ o("path", { d: "M12 20v2" }),
        /* @__PURE__ */ o("path", { d: "m4.93 4.93 1.42 1.42" }),
        /* @__PURE__ */ o("path", { d: "m17.65 17.65 1.42 1.42" }),
        /* @__PURE__ */ o("path", { d: "M2 12h2" }),
        /* @__PURE__ */ o("path", { d: "M20 12h2" }),
        /* @__PURE__ */ o("path", { d: "m6.35 17.65-1.42 1.42" }),
        /* @__PURE__ */ o("path", { d: "m19.07 4.93-1.42 1.42" })
      ]
    }
  );
}
function Ye() {
  return /* @__PURE__ */ o(
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
      children: /* @__PURE__ */ o("path", { d: "M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5 7.75 7.75 0 1 0 20.5 14.2Z" })
    }
  );
}
function xt({
  theme: e,
  onThemeChange: t,
  label: n = "Тёмная тема",
  style: r,
  disabled: s = !1
}) {
  const { theme: l, setTheme: i } = x(), a = e ?? l, c = e !== void 0 && t !== void 0, f = a === "dark";
  return /* @__PURE__ */ o(
    ze,
    {
      active: f,
      label: n,
      onChange: (v) => {
        const b = v ? "dark" : "light";
        if (c) {
          t(b);
          return;
        }
        i(b);
      },
      disabled: s,
      ariaLabel: n || (f ? "Включить светлую тему" : "Включить тёмную тему"),
      trackStartIcon: /* @__PURE__ */ o("span", { style: K, children: /* @__PURE__ */ o(Ye, {}) }),
      trackEndIcon: /* @__PURE__ */ o("span", { style: K, children: /* @__PURE__ */ o(je, {}) }),
      style: u(Ne, r)
    }
  );
}
function $e(e, { component: t, darkComponent: n }) {
  return e === "dark" && n ? n : t || null;
}
function Ge(e, { src: t, darkSrc: n }) {
  return e === "dark" && n || t;
}
function bt({
  src: e,
  darkSrc: t,
  component: n,
  darkComponent: r,
  alt: s = "",
  style: l,
  width: i,
  height: a,
  ...c
}) {
  const { theme: f } = x(), d = $e(f, { component: n, darkComponent: r });
  if (d)
    return /* @__PURE__ */ o(
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
  const h = Ge(f, { src: e, darkSrc: t });
  return h ? /* @__PURE__ */ o(
    "img",
    {
      src: h,
      alt: s,
      width: i,
      height: a,
      style: u({ display: "block" }, l),
      ...c
    }
  ) : null;
}
const Xe = {
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  gap: 12,
  flexShrink: 0
}, Ve = {
  display: "flex",
  alignItems: "center",
  gap: 6,
  flexShrink: 0
};
function Ue({
  title: e,
  titleId: t,
  toolbar: n,
  toolbarWrap: r = !0,
  style: s
}) {
  const { colors: l } = x(), i = {
    margin: 0,
    fontSize: 16,
    fontWeight: 600,
    color: l.mastBlue,
    lineHeight: 1.3
  };
  return /* @__PURE__ */ g("header", { style: u(Xe, s), children: [
    /* @__PURE__ */ o("h2", { id: t, style: i, children: e }),
    n ? r ? /* @__PURE__ */ o("div", { style: Ve, children: n }) : n : null
  ] });
}
function mt({ onClick: e, title: t = "Закрыть", style: n }) {
  const { colors: r } = x(), [s, l] = m(!1), [i, a] = m(!1), c = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: 36,
    height: 36,
    padding: 0,
    border: `1px solid ${r.borderInput}`,
    borderRadius: 6,
    background: r.bgCard,
    color: r.textMuted,
    cursor: "pointer",
    transition: "border-color 0.15s ease, color 0.15s ease, background-color 0.15s ease"
  }, f = {
    borderColor: r.mainBlue1,
    color: r.mainBlue1,
    backgroundColor: r.focusBg
  };
  return /* @__PURE__ */ o(
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
      children: /* @__PURE__ */ o("svg", { width: "16", height: "16", viewBox: "0 0 16 16", "aria-hidden": "true", children: /* @__PURE__ */ o(
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
const Ke = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  flex: 1,
  minHeight: 0
}, qe = {
  display: "flex",
  flexDirection: "column",
  flex: 1,
  minHeight: 0,
  gap: 16,
  width: "100%"
}, Ze = {
  display: "flex",
  flexWrap: "wrap",
  gap: 8,
  justifyContent: "flex-end",
  width: "100%",
  marginTop: 16
};
function St({
  open: e = !0,
  onClose: t,
  title: n,
  titleId: r,
  toolbar: s,
  headerActions: l,
  children: i,
  footer: a,
  w: c,
  style: f,
  layoutStyle: d,
  rootStyle: h,
  usePortal: v = !0,
  closeOnBackdrop: b = !0
}) {
  const { colors: w } = x(), [T, E] = m(!1), p = {
    position: "fixed",
    zIndex: 3,
    top: 0,
    right: 0,
    bottom: 0,
    boxShadow: "0 0 10px 1px #00000070",
    borderRadius: 3,
    background: w.bgCard,
    height: "100%",
    minHeight: 500,
    padding: "20px 24px",
    overflowY: "auto",
    overflowX: "hidden",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    boxSizing: "border-box",
    color: w.textPrimary,
    transition: "transform 0.6s ease, opacity 0.6s ease"
  };
  if (L(() => {
    if (!e) {
      E(!1);
      return;
    }
    const y = requestAnimationFrame(() => E(!0));
    return () => cancelAnimationFrame(y);
  }, [e]), L(() => {
    if (!e)
      return;
    const y = document.body.style.overflow;
    return document.body.style.overflow = "hidden", () => {
      document.body.style.overflow = y;
    };
  }, [e]), L(() => {
    if (!e || !t)
      return;
    const y = (M) => {
      M.key === "Escape" && t();
    };
    return window.addEventListener("keydown", y), () => window.removeEventListener("keydown", y);
  }, [e, t]), !e)
    return null;
  const I = (y) => {
    b && t && y.target === y.currentTarget && t();
  }, S = s ?? l, C = /* @__PURE__ */ o(
    "div",
    {
      role: "dialog",
      "aria-modal": "true",
      "aria-labelledby": r,
      onClick: I,
      style: u(p, {
        transform: T ? "translateX(0)" : "translateX(100%)",
        opacity: T ? 1 : 0.92
      }, c != null && { width: c }, h),
      children: /* @__PURE__ */ g(
        "div",
        {
          style: u(Ke, d),
          onClick: (y) => y.stopPropagation(),
          children: [
            /* @__PURE__ */ g(
              "section",
              {
                style: u(qe, f),
                "aria-labelledby": r,
                children: [
                  n ? /* @__PURE__ */ o(
                    Ue,
                    {
                      title: n,
                      titleId: r,
                      toolbar: S
                    }
                  ) : null,
                  i
                ]
              }
            ),
            a ? /* @__PURE__ */ o("div", { style: Ze, children: a }) : null
          ]
        }
      )
    }
  );
  return v ? Ie(C, document.body) : C;
}
const re = {
  text: "text",
  number: "number",
  key: "number"
}, Je = {
  text: { minWidth: 132, maxWidth: 500 },
  number: { minWidth: 80, maxWidth: 120 },
  key: { minWidth: 80, maxWidth: 120 }
}, Qe = [
  ["7", "8", "9"],
  ["4", "5", "6"],
  ["1", "2", "3"]
], q = 'source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace';
function et(e) {
  return Object.hasOwn(re, e) ? e : "text";
}
function Z({ digit: e, disabled: t, onPress: n, colors: r, gridColumn: s }) {
  const [l, i] = m(!1), a = l && !t ? r.mastBlue : r.lightGrey, c = l && !t ? r.mastBlue : r.textMain, f = {
    boxSizing: "border-box",
    minHeight: 36,
    minWidth: 36,
    padding: "6px 8px",
    borderRadius: 6,
    border: `1px solid ${a}`,
    backgroundColor: r.surface,
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
  return /* @__PURE__ */ o(
    "button",
    {
      type: "button",
      disabled: t,
      "aria-label": `Цифра ${e}`,
      style: f,
      onMouseDown: (h) => {
        t || h.preventDefault();
      },
      onPointerDown: (h) => {
        t || (h.preventDefault(), i(!0));
      },
      onPointerUp: d,
      onPointerLeave: d,
      onPointerCancel: d,
      onBlur: d,
      onClick: (h) => {
        t || n(e), h.currentTarget.blur();
      },
      children: e
    }
  );
}
function tt({ disabled: e, onDigit: t, colors: n }) {
  return /* @__PURE__ */ g("div", { style: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 6,
    flexShrink: 0
  }, role: "group", "aria-label": "Цифровая клавиатура", children: [
    Qe.flatMap(
      (s, l) => s.map((i) => /* @__PURE__ */ o(
        Z,
        {
          digit: i,
          disabled: e,
          colors: n,
          onPress: t
        },
        `${l}-${i}`
      ))
    ),
    /* @__PURE__ */ o(
      Z,
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
function vt({
  type: e = "text",
  label: t,
  value: n,
  defaultValue: r,
  onChange: s,
  placeholder: l,
  disabled: i = !1,
  readOnly: a = !1,
  name: c,
  id: f,
  style: d,
  inputStyle: h,
  min: v = 0,
  max: b,
  error: w = !1,
  msg: T,
  "aria-label": E
}) {
  const { colors: p } = x(), I = Ce(), S = f ?? I, B = Ee(null), [C, y] = m(!1), M = et(e), F = re[M], O = Je[M], P = n !== void 0, [le, H] = m(r ?? ""), A = P ? n ?? "" : le, se = l && String(A).length === 0 && !C, z = {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    minWidth: 140,
    flex: "0 0 auto",
    color: p.textPrimary,
    justifyContent: "space-between",
    height: "100%"
  }, ae = {
    fontSize: 12,
    color: p.textMuted
  }, N = !i && C, ce = w ? p.error : N ? p.mastBlue : p.lightGrey, j = !!(w && T), Y = `${S}-error`, de = [l && t ? `${S}-hint` : null, j ? Y : null].filter(Boolean).join(" ") || void 0, ue = {
    fontSize: 12,
    lineHeight: 1.35,
    color: p.error
  }, fe = {
    boxSizing: "border-box",
    width: "100%",
    minWidth: O.minWidth,
    maxWidth: O.maxWidth,
    minHeight: 40,
    padding: "8px 12px",
    border: `1px solid ${ce}`,
    borderRadius: 6,
    fontSize: 14,
    lineHeight: 1.35,
    fontFamily: q,
    color: p.textMain,
    backgroundColor: p.surface,
    outline: "none",
    boxShadow: !w && N ? "0 0 0 3px rgba(33, 150, 243, 0.15)" : "none",
    transition: "border-color 0.15s ease, box-shadow 0.15s ease"
  }, he = {
    position: "relative",
    width: "100%",
    maxWidth: O.maxWidth
  }, pe = {
    position: "absolute",
    left: 12,
    top: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    pointerEvents: "none",
    color: p.textMuted,
    fontSize: 14,
    lineHeight: 1.35,
    fontFamily: q
  }, $ = i || a, ye = (k) => {
    P || H(k.target.value), s == null || s(k);
  }, ge = (k) => {
    var R;
    P || H(k), B.current && ((R = Object.getOwnPropertyDescriptor(
      window.HTMLInputElement.prototype,
      "value"
    )) == null || R.set);
  }, xe = (k) => {
    if ($) return;
    const W = `${A}${k}`;
    ge(W);
  }, be = F === "number" ? {
    min: v,
    ...b != null ? { max: b } : {}
  } : {}, me = /* @__PURE__ */ g("div", { style: he, children: [
    /* @__PURE__ */ o(
      "input",
      {
        ref: B,
        id: S,
        type: F,
        name: c,
        ...be,
        value: A,
        disabled: i,
        readOnly: a,
        placeholder: "",
        "aria-label": t ? void 0 : E || l,
        "aria-invalid": w || void 0,
        "aria-describedby": de,
        style: u(
          fe,
          i && { opacity: 0.55, cursor: "not-allowed" },
          h
        ),
        onChange: ye,
        onFocus: () => y(!0),
        onBlur: () => y(!1)
      }
    ),
    se ? /* @__PURE__ */ o("span", { style: pe, "aria-hidden": "true", children: l }) : null
  ] }), G = /* @__PURE__ */ g(Se, { children: [
    t ? /* @__PURE__ */ o("span", { style: ae, children: t }) : null,
    l && t ? /* @__PURE__ */ o("span", { id: `${S}-hint`, style: { display: "none" }, children: l }) : null,
    me,
    j ? /* @__PURE__ */ o("span", { id: Y, style: ue, children: T }) : null
  ] });
  if (M === "key") {
    const k = {
      display: "flex",
      flexDirection: "column",
      gap: 4,
      padding: 12,
      border: `1px solid ${p.lightGrey}`,
      borderRadius: 8,
      backgroundColor: p.surface,
      color: p.textPrimary,
      flex: "0 0 auto",
      height: "165px"
    }, W = {
      display: "flex",
      alignItems: "flex-start",
      gap: 12
    }, R = u(z, { minWidth: 0 });
    return /* @__PURE__ */ o("div", { style: u(k, d), children: /* @__PURE__ */ g("div", { style: W, children: [
      /* @__PURE__ */ o("label", { htmlFor: S, style: R, children: G }),
      /* @__PURE__ */ o(
        tt,
        {
          disabled: $,
          onDigit: xe,
          colors: p
        }
      )
    ] }) });
  }
  return /* @__PURE__ */ o("label", { htmlFor: S, style: u(z, d), children: G });
}
const nt = {
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  gap: 8
}, ot = {
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
function rt(e, t, n) {
  const r = e || t;
  return {
    borderColor: r ? n.primary : n.toggleTrackOff,
    color: r ? n.primary : n.textPrimary,
    backgroundColor: e ? n.focusBg : n.surface
  };
}
function it({ name: e, active: t, action: n }) {
  const { colors: r } = x(), [s, l] = m(!1), [i, a] = m(!1);
  return /* @__PURE__ */ o(
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
      style: u(ot, rt(t, s || i, r), {
        outline: i ? "none" : void 0
      }),
      children: e
    }
  );
}
function wt({ items: e, style: t }) {
  const { colors: n } = x();
  return /* @__PURE__ */ o("div", { style: u(nt, { color: n.textPrimary }, t), children: e == null ? void 0 : e.map((r) => /* @__PURE__ */ o(
    it,
    {
      name: r.name,
      active: r.active,
      action: r.action
    },
    r.name
  )) });
}
const ie = {
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
function lt(e) {
  return Object.hasOwn(ie, e) ? e : "span";
}
function kt({ children: e, variant: t = "span", color: n, style: r }) {
  const { colors: s } = x(), l = lt(t), { tag: i, ...a } = ie[l], c = i, f = u(
    {
      fontFamily: "inherit",
      color: n ?? s.textPrimary,
      ...a
    },
    r
  );
  return /* @__PURE__ */ o(c, { style: f, children: e });
}
const Tt = (...e) => e.filter(Boolean).join(" ");
export {
  ht as Box,
  pt as Container,
  re as INPUT_NATIVE_TYPE,
  bt as Icon,
  vt as Input,
  J as LIGHT_GREY,
  yt as Layout,
  _ as MAST_BLUE,
  gt as Main,
  wt as RadioBtn,
  St as SideDrawer,
  mt as SideDrawerCloseButton,
  Ue as SiteModalHeader,
  kt as Text,
  ft as ThemeProvider,
  xt as ThemeToggle,
  ze as Toggle,
  te as getThemeColors,
  Tt as joinClass,
  u as mergeStyle,
  $e as resolveIconComponent,
  Ge as resolveIconSrc,
  D as themes,
  ut as tokens,
  x as useTheme
};
