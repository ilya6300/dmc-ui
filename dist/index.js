import { jsx as o, jsxs as g } from "react/jsx-runtime";
import { createContext as z, useState as m, useCallback as N, useMemo as W, useContext as P, useEffect as T } from "react";
import { createPortal as X } from "react-dom";
const $ = 4, C = "#2196f3", D = C, G = {
  background: "#ffffff",
  surface: "#ffffff",
  textPrimary: "#1e293b",
  textSecondary: "#64748b",
  border: "#e2e8f0",
  primary: D,
  error: "#df2727",
  mastBlue: C,
  mastYellow: "#f0b323",
  cardShadowColor: "rgba(0, 0, 0, 0.25)",
  focusBg: "#f0f7ff",
  toggleTrackOff: "#cbd5e1",
  knob: "#ffffff"
}, U = {
  background: "#121212",
  surface: "#1e1e1e",
  textPrimary: "#ffffff",
  textSecondary: "#b3b3b3",
  border: "#383838",
  primary: D,
  error: "#f87171",
  mastBlue: C,
  mastYellow: "#f0b323",
  cardShadowColor: "rgba(0, 0, 0, 0.45)",
  focusBg: "#1e3a5f",
  toggleTrackOff: "#475569",
  knob: "#ffffff"
};
function F(e, t = 12) {
  return t === 0 ? "none" : `0 ${$}px ${t}px ${e.cardShadowColor}`;
}
function A(e) {
  const t = `1px solid ${e.border}`, n = { ...e };
  return {
    ...n,
    cardShadow: F(n, 12),
    mainBlue1: e.primary,
    textMain: e.textPrimary,
    textMuted: e.textSecondary,
    bgCard: e.surface,
    borderLight: t,
    borderInput: e.border
  };
}
const B = {
  light: A(G),
  dark: A(U)
};
function H(e) {
  return B[e] ?? B.light;
}
const ye = B.light;
function u(...e) {
  return Object.assign({}, ...e.filter(Boolean));
}
const q = () => {
}, Y = z({
  theme: "light",
  setTheme: q,
  colors: H("light")
});
function xe({
  children: e,
  theme: t,
  onThemeChange: n,
  defaultTheme: r = "light"
}) {
  const [s, a] = m(r), i = t !== void 0, l = i ? t : s, c = N(
    (d) => {
      const p = typeof d == "function" ? d(l) : d;
      i || a(p), n == null || n(p);
    },
    [i, n, l]
  ), f = W(
    () => ({
      theme: l,
      setTheme: c,
      colors: H(l)
    }),
    [l, c]
  );
  return /* @__PURE__ */ o(Y.Provider, { value: f, children: e });
}
function x() {
  return P(Y);
}
function me({ children: e, style: t, title: n, w: r, shadow: s = 12, ...a }) {
  const { colors: i } = x(), l = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    gap: 10,
    backgroundColor: i.bgCard,
    borderRadius: 12,
    padding: 24,
    boxShadow: F(i, s),
    border: i.borderLight,
    boxSizing: "border-box"
  }, c = {
    fontSize: 16,
    fontWeight: 600,
    color: i.mastBlue
  };
  return /* @__PURE__ */ g("div", { style: u(l, { width: r ?? "100%" }, t), ...a, children: [
    n ? /* @__PURE__ */ o("span", { style: c, children: n }) : null,
    e
  ] });
}
const K = {
  display: "flex",
  boxSizing: "border-box",
  flexWrap: "wrap"
}, R = {
  start: "flex-start",
  end: "flex-end",
  center: "center",
  stretch: "stretch",
  between: "space-between",
  around: "space-around",
  evenly: "space-evenly"
};
function O(e, t) {
  return R[e] ?? R[t];
}
function Z(e) {
  return e === "col" ? "column" : "row";
}
function J({ direction: e, justify: t, align: n, gap: r, w: s }) {
  return {
    flexDirection: Z(e),
    justifyContent: O(t, "start"),
    alignItems: O(n, "stretch"),
    gap: r,
    width: s ?? "100%"
  };
}
function we({
  children: e,
  style: t,
  w: n,
  direction: r = "row",
  justify: s = "start",
  align: a = "stretch",
  gap: i = 10,
  ...l
}) {
  return /* @__PURE__ */ o(
    "div",
    {
      style: u(
        K,
        J({ direction: r, justify: s, align: a, gap: i, w: n }),
        t
      ),
      ...l,
      children: e
    }
  );
}
const Q = {
  display: "flex",
  flexDirection: "column",
  padding: "2% 4%",
  boxSizing: "border-box",
  gap: "10px"
}, j = "transform 0.6s ease, opacity 0.6s ease", V = {
  transform: "translateX(100%)",
  opacity: 0.92
}, ee = {
  transform: "translateX(0)",
  opacity: 1,
  transition: j
};
function Se({ children: e, style: t, animate: n = !1, ...r }) {
  const [s, a] = m(!n);
  T(() => {
    if (!n) return;
    if (typeof window < "u" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      a(!0);
      return;
    }
    const c = requestAnimationFrame(() => a(!0));
    return () => cancelAnimationFrame(c);
  }, [n]);
  const i = n && !s ? { ...V, transition: j } : n ? ee : null;
  return /* @__PURE__ */ o("div", { style: u(Q, i, t), ...r, children: e });
}
const te = {
  minHeight: "100%",
  boxSizing: "border-box"
};
function ve({ children: e, style: t, ...n }) {
  return /* @__PURE__ */ o("div", { style: u(te, t), ...n, children: e });
}
function ne({
  active: e,
  label: t,
  variant: n = "switch",
  onClick: r,
  onChange: s,
  style: a,
  disabled: i = !1,
  ariaLabel: l,
  trackStartIcon: c,
  trackEndIcon: f
}) {
  const { colors: d } = x(), [p, b] = m(!1), y = {
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
  }, S = {
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
    return t ? /* @__PURE__ */ o("span", { style: u(y, a), children: t }) : null;
  const L = (k) => {
    k.preventDefault(), !i && (r == null || r(k), s == null || s(!e));
  }, M = u(S, {
    backgroundColor: e ? d.mainBlue1 : d.toggleTrackOff
  }), I = {
    position: "absolute",
    inset: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 3px",
    boxSizing: "border-box",
    pointerEvents: "none",
    color: e ? d.knob : d.textMuted
  }, v = u(E, {
    transform: e ? "translateX(16px)" : "translateX(0)"
  }), h = u(
    w,
    i && { cursor: "not-allowed", opacity: 0.55 },
    p && {
      outline: `2px solid ${d.mainBlue1}`,
      outlineOffset: 2,
      borderRadius: 4
    },
    a
  );
  return /* @__PURE__ */ g(
    "button",
    {
      type: "button",
      style: h,
      onClick: L,
      "aria-pressed": !!e,
      "aria-label": l || (t ? void 0 : "Переключатель"),
      disabled: i,
      onFocus: () => b(!0),
      onBlur: () => b(!1),
      children: [
        /* @__PURE__ */ g("span", { style: M, "aria-hidden": "true", children: [
          c || f ? /* @__PURE__ */ g("span", { style: I, children: [
            /* @__PURE__ */ o("span", { style: { display: "flex", lineHeight: 0 }, children: c }),
            /* @__PURE__ */ o("span", { style: { display: "flex", lineHeight: 0 }, children: f })
          ] }) : null,
          /* @__PURE__ */ o("span", { style: v })
        ] }),
        t ? /* @__PURE__ */ o("span", { style: y, children: t }) : null
      ]
    }
  );
}
const oe = {
  border: "none",
  outline: "none",
  boxShadow: "none"
}, _ = { display: "flex", lineHeight: 0 };
function re() {
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
function ie() {
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
function ke({
  theme: e,
  onThemeChange: t,
  label: n = "Тёмная тема",
  style: r,
  disabled: s = !1
}) {
  const { theme: a, setTheme: i } = x(), l = e ?? a, c = e !== void 0 && t !== void 0, f = l === "dark";
  return /* @__PURE__ */ o(
    ne,
    {
      active: f,
      label: n,
      onChange: (b) => {
        const y = b ? "dark" : "light";
        if (c) {
          t(y);
          return;
        }
        i(y);
      },
      disabled: s,
      ariaLabel: n || (f ? "Включить светлую тему" : "Включить тёмную тему"),
      trackStartIcon: /* @__PURE__ */ o("span", { style: _, children: /* @__PURE__ */ o(ie, {}) }),
      trackEndIcon: /* @__PURE__ */ o("span", { style: _, children: /* @__PURE__ */ o(re, {}) }),
      style: u(oe, r)
    }
  );
}
function se(e, { component: t, darkComponent: n }) {
  return e === "dark" && n ? n : t || null;
}
function le(e, { src: t, darkSrc: n }) {
  return e === "dark" && n || t;
}
function Te({
  src: e,
  darkSrc: t,
  component: n,
  darkComponent: r,
  alt: s = "",
  style: a,
  width: i,
  height: l,
  ...c
}) {
  const { theme: f } = x(), d = se(f, { component: n, darkComponent: r });
  if (d)
    return /* @__PURE__ */ o(
      d,
      {
        style: u(
          i != null || l != null ? { width: i, height: l, display: "block" } : null,
          a
        ),
        "aria-hidden": s ? void 0 : !0,
        role: s ? "img" : void 0,
        "aria-label": s || void 0,
        ...c
      }
    );
  const p = le(f, { src: e, darkSrc: t });
  return p ? /* @__PURE__ */ o(
    "img",
    {
      src: p,
      alt: s,
      width: i,
      height: l,
      style: u({ display: "block" }, a),
      ...c
    }
  ) : null;
}
const ae = {
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  gap: 12,
  flexShrink: 0
}, ce = {
  display: "flex",
  alignItems: "center",
  gap: 6,
  flexShrink: 0
};
function de({
  title: e,
  titleId: t,
  toolbar: n,
  toolbarWrap: r = !0,
  style: s
}) {
  const { colors: a } = x(), i = {
    margin: 0,
    fontSize: 16,
    fontWeight: 600,
    color: a.mastBlue,
    lineHeight: 1.3
  };
  return /* @__PURE__ */ g("header", { style: u(ae, s), children: [
    /* @__PURE__ */ o("h2", { id: t, style: i, children: e }),
    n ? r ? /* @__PURE__ */ o("div", { style: ce, children: n }) : n : null
  ] });
}
function Ee({ onClick: e, title: t = "Закрыть", style: n }) {
  const { colors: r } = x(), [s, a] = m(!1), [i, l] = m(!1), c = {
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
      onMouseEnter: () => a(!0),
      onMouseLeave: () => a(!1),
      onFocus: () => l(!0),
      onBlur: () => l(!1),
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
const ue = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  flex: 1,
  minHeight: 0
}, fe = {
  display: "flex",
  flexDirection: "column",
  flex: 1,
  minHeight: 0,
  gap: 16,
  width: "100%"
}, he = {
  display: "flex",
  flexWrap: "wrap",
  gap: 8,
  justifyContent: "flex-end",
  width: "100%",
  marginTop: 16
};
function Le({
  open: e = !0,
  onClose: t,
  title: n,
  titleId: r,
  toolbar: s,
  headerActions: a,
  children: i,
  footer: l,
  style: c,
  layoutStyle: f,
  rootStyle: d,
  usePortal: p = !0,
  closeOnBackdrop: b = !0
}) {
  const { colors: y } = x(), [w, S] = m(!1), E = {
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
    transition: "transform 0.6s ease, opacity 0.6s ease"
  };
  if (T(() => {
    if (!e) {
      S(!1);
      return;
    }
    const h = requestAnimationFrame(() => S(!0));
    return () => cancelAnimationFrame(h);
  }, [e]), T(() => {
    if (!e)
      return;
    const h = document.body.style.overflow;
    return document.body.style.overflow = "hidden", () => {
      document.body.style.overflow = h;
    };
  }, [e]), T(() => {
    if (!e || !t)
      return;
    const h = (k) => {
      k.key === "Escape" && t();
    };
    return window.addEventListener("keydown", h), () => window.removeEventListener("keydown", h);
  }, [e, t]), !e)
    return null;
  const L = (h) => {
    b && t && h.target === h.currentTarget && t();
  }, M = s ?? a, v = /* @__PURE__ */ o(
    "div",
    {
      role: "dialog",
      "aria-modal": "true",
      "aria-labelledby": r,
      onClick: L,
      style: u(E, {
        transform: w ? "translateX(0)" : "translateX(100%)",
        opacity: w ? 1 : 0.92
      }, d),
      children: /* @__PURE__ */ g(
        "div",
        {
          style: u(ue, f),
          onClick: (h) => h.stopPropagation(),
          children: [
            /* @__PURE__ */ g(
              "section",
              {
                style: u(fe, c),
                "aria-labelledby": r,
                children: [
                  n ? /* @__PURE__ */ o(
                    de,
                    {
                      title: n,
                      titleId: r,
                      toolbar: M
                    }
                  ) : null,
                  i
                ]
              }
            ),
            l ? /* @__PURE__ */ o("div", { style: he, children: l }) : null
          ]
        }
      )
    }
  );
  return p ? X(v, document.body) : v;
}
const Me = (...e) => e.filter(Boolean).join(" ");
export {
  me as Box,
  we as Container,
  Te as Icon,
  Se as Layout,
  C as MAST_BLUE,
  ve as Main,
  Le as SideDrawer,
  Ee as SideDrawerCloseButton,
  de as SiteModalHeader,
  xe as ThemeProvider,
  ke as ThemeToggle,
  ne as Toggle,
  H as getThemeColors,
  Me as joinClass,
  u as mergeStyle,
  se as resolveIconComponent,
  le as resolveIconSrc,
  B as themes,
  ye as tokens,
  x as useTheme
};
