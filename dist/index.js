import { jsxs as g, jsx as i } from "react/jsx-runtime";
import { useState as h, useEffect as b } from "react";
import { createPortal as _ } from "react-dom";
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
function a(...e) {
  return Object.assign({}, ...e.filter(Boolean));
}
const O = {
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
}, R = {
  fontSize: 16,
  fontWeight: 600,
  color: n.mastBlue
};
function Q({
  children: e,
  style: t,
  title: o,
  w: r,
  as: s = "div",
  ...l
}) {
  return /* @__PURE__ */ g(
    s,
    {
      style: a(O, { width: r ?? "100%" }, t),
      ...l,
      children: [
        o ? /* @__PURE__ */ i("span", { style: R, children: o }) : null,
        e
      ]
    }
  );
}
const A = {
  display: "flex",
  flexDirection: "column",
  padding: "1% 2%",
  boxSizing: "border-box"
}, L = "transform 0.6s ease, opacity 0.6s ease", M = {
  transform: "translateX(100%)",
  opacity: 0.92
}, Y = {
  transform: "translateX(0)",
  opacity: 1,
  transition: L
};
function Z({ children: e, style: t, animate: o = !1, ...r }) {
  const [s, l] = h(!o);
  b(() => {
    if (!o) return;
    if (typeof window < "u" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      l(!0);
      return;
    }
    const u = requestAnimationFrame(() => l(!0));
    return () => cancelAnimationFrame(u);
  }, [o]);
  const d = o && !s ? { ...M, transition: L } : o ? Y : null;
  return /* @__PURE__ */ i("div", { style: a(A, d, t), ...r, children: e });
}
const C = {
  minHeight: "100%",
  boxSizing: "border-box"
};
function ee({ children: e, style: t, ...o }) {
  return /* @__PURE__ */ i("div", { style: a(C, t), ...o, children: e });
}
const T = {
  color: n.textMain,
  fontWeight: 400,
  fontSize: 14
}, I = {
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
}, j = {
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
function te({
  active: e,
  label: t,
  variant: o = "switch",
  onClick: r,
  onChange: s,
  style: l,
  disabled: d = !1
}) {
  const [f, u] = h(!1);
  if (o === "text")
    return t ? /* @__PURE__ */ i("span", { style: a(T, l), children: t }) : null;
  const m = (p) => {
    p.preventDefault(), !d && (r == null || r(p), s == null || s(!e));
  }, y = a(j, {
    backgroundColor: e ? n.mainBlue1 : n.toggleTrackOff
  }), x = a(D, {
    transform: e ? "translateX(16px)" : "translateX(0)"
  }), S = a(
    I,
    d && { cursor: "not-allowed", opacity: 0.55 },
    f && {
      outline: `2px solid ${n.mainBlue1}`,
      outlineOffset: 2,
      borderRadius: 4
    },
    l
  );
  return /* @__PURE__ */ g(
    "button",
    {
      type: "button",
      style: S,
      onClick: m,
      "aria-pressed": !!e,
      disabled: d,
      onFocus: () => u(!0),
      onBlur: () => u(!1),
      children: [
        /* @__PURE__ */ i("span", { style: y, "aria-hidden": "true", children: /* @__PURE__ */ i("span", { style: x }) }),
        t ? /* @__PURE__ */ i("span", { style: T, children: t }) : null
      ]
    }
  );
}
const F = {
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  gap: 12,
  flexShrink: 0
}, N = {
  margin: 0,
  fontSize: 16,
  fontWeight: 600,
  color: n.mastBlue,
  lineHeight: 1.3
}, z = {
  display: "flex",
  alignItems: "center",
  gap: 6,
  flexShrink: 0
}, H = ({
  title: e,
  titleId: t,
  toolbar: o,
  toolbarWrap: r = !0,
  style: s
}) => /* @__PURE__ */ g("header", { style: a(F, s), children: [
  /* @__PURE__ */ i("h2", { id: t, style: N, children: e }),
  o ? r ? /* @__PURE__ */ i("div", { style: z, children: o }) : o : null
] }), X = {
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
}, W = {
  borderColor: n.mainBlue1,
  color: n.mainBlue1,
  backgroundColor: n.focusBg
};
function oe({ onClick: e, title: t = "Закрыть", style: o }) {
  const [r, s] = h(!1), [l, d] = h(!1);
  return /* @__PURE__ */ i(
    "button",
    {
      type: "button",
      title: t,
      "aria-label": t,
      onClick: e,
      style: a(
        X,
        (r || l) && W,
        l && { outline: "none" },
        o
      ),
      onMouseEnter: () => s(!0),
      onMouseLeave: () => s(!1),
      onFocus: () => d(!0),
      onBlur: () => d(!1),
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
const P = {
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
}, K = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  flex: 1,
  minHeight: 0
}, $ = {
  display: "flex",
  flexDirection: "column",
  flex: 1,
  minHeight: 0,
  gap: 16,
  width: "100%"
}, q = {
  display: "flex",
  flexWrap: "wrap",
  gap: 8,
  justifyContent: "flex-end",
  width: "100%",
  marginTop: 16
};
function ne({
  open: e = !0,
  onClose: t,
  title: o,
  titleId: r,
  toolbar: s,
  headerActions: l,
  children: d,
  footer: f,
  style: u,
  layoutStyle: m,
  rootStyle: y,
  usePortal: x = !0,
  closeOnBackdrop: S = !0
}) {
  const [p, E] = h(!1);
  if (b(() => {
    if (!e) {
      E(!1);
      return;
    }
    const c = requestAnimationFrame(() => E(!0));
    return () => cancelAnimationFrame(c);
  }, [e]), b(() => {
    if (!e)
      return;
    const c = document.body.style.overflow;
    return document.body.style.overflow = "hidden", () => {
      document.body.style.overflow = c;
    };
  }, [e]), b(() => {
    if (!e || !t)
      return;
    const c = (v) => {
      v.key === "Escape" && t();
    };
    return window.addEventListener("keydown", c), () => window.removeEventListener("keydown", c);
  }, [e, t]), !e)
    return null;
  const B = (c) => {
    S && t && c.target === c.currentTarget && t();
  }, k = s ?? l, w = /* @__PURE__ */ i(
    "div",
    {
      role: "dialog",
      "aria-modal": "true",
      "aria-labelledby": r,
      onClick: B,
      style: a(P, {
        transform: p ? "translateX(0)" : "translateX(100%)",
        opacity: p ? 1 : 0.92
      }, y),
      children: /* @__PURE__ */ g(
        "div",
        {
          style: a(K, m),
          onClick: (c) => c.stopPropagation(),
          children: [
            /* @__PURE__ */ g(
              "section",
              {
                style: a($, u),
                "aria-labelledby": r,
                children: [
                  o ? /* @__PURE__ */ i(
                    H,
                    {
                      title: o,
                      titleId: r,
                      toolbar: k
                    }
                  ) : null,
                  d
                ]
              }
            ),
            f ? /* @__PURE__ */ i("div", { style: q, children: f }) : null
          ]
        }
      )
    }
  );
  return x ? _(w, document.body) : w;
}
const re = (...e) => e.filter(Boolean).join(" ");
export {
  Q as Box,
  Z as Layout,
  ee as Main,
  ne as SideDrawer,
  oe as SideDrawerCloseButton,
  H as SiteModalHeader,
  te as Toggle,
  re as joinClass,
  a as mergeStyle,
  n as tokens
};
