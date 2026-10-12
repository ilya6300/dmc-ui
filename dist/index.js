import { jsx as i, jsxs as f } from "react/jsx-runtime";
import { useState as h, useEffect as S } from "react";
import { createPortal as v } from "react-dom";
const n = {
  mainBlue1: "#2196f3",
  mastBlue: "#236192",
  mastYellow: "#f0b323",
  error: "#df2727",
  textMain: "#1e293b",
  textMuted: "#64748b",
  bgCard: "#ffffff",
  cardShadow: "0 4px 12px rgba(0, 0, 0, 0.25)",
  borderLight: "1px solid rgba(0, 0, 0, 0.08)",
  toggleTrackOff: "#cbd5e1",
  focusBg: "#f0f7ff",
  borderInput: "#e2e8f0"
};
function s(...e) {
  return Object.assign({}, ...e.filter(Boolean));
}
const _ = {
  display: "flex",
  flexDirection: "column",
  gap: 10,
  textAlign: "left",
  boxSizing: "border-box"
};
function V({
  children: e,
  style: t,
  as: o = "div",
  ...r
}) {
  return /* @__PURE__ */ i(
    o,
    {
      style: s(_, t),
      ...r,
      children: e
    }
  );
}
const C = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  gap: 10,
  backgroundColor: n.bgCard,
  borderRadius: 12,
  padding: 24,
  boxShadow: n.cardShadow,
  border: n.borderLight,
  boxSizing: "border-box"
}, A = {
  fontSize: 16,
  fontWeight: 600,
  color: n.mastBlue
};
function G({
  children: e,
  style: t,
  title: o,
  w: r,
  as: l = "div",
  ...d
}) {
  return /* @__PURE__ */ f(
    l,
    {
      style: s(C, { width: r ?? "100%" }, t),
      ...d,
      children: [
        o ? /* @__PURE__ */ i("span", { style: A, children: o }) : null,
        e
      ]
    }
  );
}
const O = {
  minHeight: "100%",
  boxSizing: "border-box"
};
function J({ children: e, style: t, ...o }) {
  return /* @__PURE__ */ i("div", { style: s(O, t), ...o, children: e });
}
const T = {
  color: n.textMain,
  fontWeight: 400,
  fontSize: 14
}, R = {
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
}, Y = {
  position: "relative",
  width: 36,
  height: 20,
  borderRadius: 20,
  flexShrink: 0,
  transition: "background-color 0.2s"
}, D = {
  position: "absolute",
  top: 2,
  left: 2,
  width: 16,
  height: 16,
  backgroundColor: "#ffffff",
  borderRadius: "50%",
  transition: "transform 0.2s"
};
function Q({
  active: e,
  label: t,
  variant: o = "switch",
  onClick: r,
  onChange: l,
  style: d,
  disabled: c = !1
}) {
  const [g, p] = h(!1);
  if (o === "text")
    return t ? /* @__PURE__ */ i("span", { style: s(T, d), children: t }) : null;
  const b = (u) => {
    u.preventDefault(), !c && (r == null || r(u), l == null || l(!e));
  }, x = s(Y, {
    backgroundColor: e ? n.mainBlue1 : n.toggleTrackOff
  }), m = s(D, {
    transform: e ? "translateX(16px)" : "translateX(0)"
  }), y = s(
    R,
    c && { cursor: "not-allowed", opacity: 0.55 },
    g && {
      outline: `2px solid ${n.mainBlue1}`,
      outlineOffset: 2,
      borderRadius: 4
    },
    d
  );
  return /* @__PURE__ */ f(
    "button",
    {
      type: "button",
      style: y,
      onClick: b,
      "aria-pressed": !!e,
      disabled: c,
      onFocus: () => p(!0),
      onBlur: () => p(!1),
      children: [
        /* @__PURE__ */ i("span", { style: x, "aria-hidden": "true", children: /* @__PURE__ */ i("span", { style: m }) }),
        t ? /* @__PURE__ */ i("span", { style: T, children: t }) : null
      ]
    }
  );
}
const M = {
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  gap: 12,
  flexShrink: 0
}, j = {
  margin: 0,
  fontSize: 16,
  fontWeight: 600,
  color: n.mastBlue,
  lineHeight: 1.3
}, H = {
  display: "flex",
  alignItems: "center",
  gap: 6,
  flexShrink: 0
}, I = ({
  title: e,
  titleId: t,
  toolbar: o,
  toolbarWrap: r = !0,
  style: l
}) => /* @__PURE__ */ f("header", { style: s(M, l), children: [
  /* @__PURE__ */ i("h2", { id: t, style: j, children: e }),
  o ? r ? /* @__PURE__ */ i("div", { style: H, children: o }) : o : null
] }), z = {
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
}, F = {
  borderColor: n.mainBlue1,
  color: n.mainBlue1,
  backgroundColor: n.focusBg
};
function Z({ onClick: e, title: t = "Закрыть", style: o }) {
  const [r, l] = h(!1), [d, c] = h(!1);
  return /* @__PURE__ */ i(
    "button",
    {
      type: "button",
      title: t,
      "aria-label": t,
      onClick: e,
      style: s(
        z,
        (r || d) && F,
        d && { outline: "none" },
        o
      ),
      onMouseEnter: () => l(!0),
      onMouseLeave: () => l(!1),
      onFocus: () => c(!0),
      onBlur: () => c(!1),
      children: /* @__PURE__ */ i("svg", { width: "16", height: "16", viewBox: "0 0 16 16", "aria-hidden": "true", children: /* @__PURE__ */ i(
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
const W = {
  position: "fixed",
  zIndex: 3,
  top: 0,
  right: 0,
  bottom: 0,
  boxShadow: "0 0 10px 1px #00000070",
  borderRadius: 3,
  background: n.bgCard,
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
}, X = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  flex: 1,
  minHeight: 0
}, N = {
  display: "flex",
  flexDirection: "column",
  flex: 1,
  minHeight: 0,
  gap: 16,
  width: "100%"
}, P = {
  display: "flex",
  flexWrap: "wrap",
  gap: 8,
  justifyContent: "flex-end",
  width: "100%",
  marginTop: 16
};
function ee({
  open: e = !0,
  onClose: t,
  title: o,
  titleId: r,
  toolbar: l,
  headerActions: d,
  children: c,
  footer: g,
  style: p,
  layoutStyle: b,
  rootStyle: x,
  usePortal: m = !0,
  closeOnBackdrop: y = !0
}) {
  const [u, w] = h(!1);
  if (S(() => {
    if (!e) {
      w(!1);
      return;
    }
    const a = requestAnimationFrame(() => w(!0));
    return () => cancelAnimationFrame(a);
  }, [e]), S(() => {
    if (!e)
      return;
    const a = document.body.style.overflow;
    return document.body.style.overflow = "hidden", () => {
      document.body.style.overflow = a;
    };
  }, [e]), S(() => {
    if (!e || !t)
      return;
    const a = (k) => {
      k.key === "Escape" && t();
    };
    return window.addEventListener("keydown", a), () => window.removeEventListener("keydown", a);
  }, [e, t]), !e)
    return null;
  const L = (a) => {
    y && t && a.target === a.currentTarget && t();
  }, B = l ?? d, E = /* @__PURE__ */ i(
    "div",
    {
      role: "dialog",
      "aria-modal": "true",
      "aria-labelledby": r,
      onClick: L,
      style: s(W, {
        transform: u ? "translateX(0)" : "translateX(100%)",
        opacity: u ? 1 : 0.92
      }, x),
      children: /* @__PURE__ */ f(
        "div",
        {
          style: s(X, b),
          onClick: (a) => a.stopPropagation(),
          children: [
            /* @__PURE__ */ f(
              "section",
              {
                style: s(N, p),
                "aria-labelledby": r,
                children: [
                  o ? /* @__PURE__ */ i(
                    I,
                    {
                      title: o,
                      titleId: r,
                      toolbar: B
                    }
                  ) : null,
                  c
                ]
              }
            ),
            g ? /* @__PURE__ */ i("div", { style: P, children: g }) : null
          ]
        }
      )
    }
  );
  return m ? v(E, document.body) : E;
}
const te = (...e) => e.filter(Boolean).join(" ");
export {
  V as Box,
  G as DashCard,
  J as Main,
  ee as SideDrawer,
  Z as SideDrawerCloseButton,
  I as SiteModalHeader,
  Q as Toggle,
  te as joinClass,
  s as mergeStyle,
  n as tokens
};
