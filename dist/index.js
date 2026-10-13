import { jsxs as g, jsx as i } from "react/jsx-runtime";
import { useState as h, useEffect as b } from "react";
import { createPortal as A } from "react-dom";
const s = {
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
function l(...e) {
  return Object.assign({}, ...e.filter(Boolean));
}
const R = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  gap: 10,
  backgroundColor: s.bgCard,
  borderRadius: 12,
  padding: 24,
  boxShadow: s.cardShadow,
  border: s.borderLight,
  boxSizing: "border-box"
}, M = {
  fontSize: 16,
  fontWeight: 600,
  color: s.mastBlue
};
function oe({ children: e, style: t, title: n, w: o, ...r }) {
  return /* @__PURE__ */ g("div", { style: l(R, { width: o ?? "100%" }, t), ...r, children: [
    n ? /* @__PURE__ */ i("span", { style: M, children: n }) : null,
    e
  ] });
}
const Y = {
  display: "flex",
  boxSizing: "border-box"
}, T = {
  start: "flex-start",
  end: "flex-end",
  center: "center",
  stretch: "stretch",
  between: "space-between",
  around: "space-around",
  evenly: "space-evenly"
};
function L(e, t) {
  return T[e] ?? T[t];
}
function C(e) {
  return e === "col" ? "column" : "row";
}
function F({ direction: e, justify: t, align: n, gap: o, w: r }) {
  return {
    flexDirection: C(e),
    justifyContent: L(t, "start"),
    alignItems: L(n, "stretch"),
    gap: o,
    width: r ?? "100%"
  };
}
function re({
  children: e,
  style: t,
  w: n,
  direction: o = "row",
  justify: r = "start",
  align: a = "stretch",
  gap: d = 10,
  ...u
}) {
  return /* @__PURE__ */ i(
    "div",
    {
      style: l(
        Y,
        F({ direction: o, justify: r, align: a, gap: d, w: n }),
        t
      ),
      ...u,
      children: e
    }
  );
}
const I = {
  display: "flex",
  flexDirection: "column",
  padding: "2% 4%",
  boxSizing: "border-box",
  gap: "10px"
}, v = "transform 0.6s ease, opacity 0.6s ease", D = {
  transform: "translateX(100%)",
  opacity: 0.92
}, N = {
  transform: "translateX(0)",
  opacity: 1,
  transition: v
};
function ie({ children: e, style: t, animate: n = !1, ...o }) {
  const [r, a] = h(!n);
  b(() => {
    if (!n) return;
    if (typeof window < "u" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      a(!0);
      return;
    }
    const f = requestAnimationFrame(() => a(!0));
    return () => cancelAnimationFrame(f);
  }, [n]);
  const d = n && !r ? { ...D, transition: v } : n ? N : null;
  return /* @__PURE__ */ i("div", { style: l(I, d, t), ...o, children: e });
}
const j = {
  minHeight: "100%",
  boxSizing: "border-box"
};
function se({ children: e, style: t, ...n }) {
  return /* @__PURE__ */ i("div", { style: l(j, t), ...n, children: e });
}
const B = {
  color: s.textMain,
  fontWeight: 400,
  fontSize: 14
}, z = {
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
}, X = {
  position: "relative",
  width: 36,
  height: 20,
  borderRadius: 20,
  flexShrink: 0,
  transition: "background-color 0.2s"
}, H = {
  position: "absolute",
  top: 2,
  left: 2,
  width: 16,
  height: 16,
  backgroundColor: "#ffffff",
  borderRadius: "50%",
  transition: "transform 0.2s"
};
function le({
  active: e,
  label: t,
  variant: n = "switch",
  onClick: o,
  onChange: r,
  style: a,
  disabled: d = !1
}) {
  const [u, f] = h(!1);
  if (n === "text")
    return t ? /* @__PURE__ */ i("span", { style: l(B, a), children: t }) : null;
  const x = (p) => {
    p.preventDefault(), !d && (o == null || o(p), r == null || r(!e));
  }, y = l(X, {
    backgroundColor: e ? s.mainBlue1 : s.toggleTrackOff
  }), m = l(H, {
    transform: e ? "translateX(16px)" : "translateX(0)"
  }), S = l(
    z,
    d && { cursor: "not-allowed", opacity: 0.55 },
    u && {
      outline: `2px solid ${s.mainBlue1}`,
      outlineOffset: 2,
      borderRadius: 4
    },
    a
  );
  return /* @__PURE__ */ g(
    "button",
    {
      type: "button",
      style: S,
      onClick: x,
      "aria-pressed": !!e,
      disabled: d,
      onFocus: () => f(!0),
      onBlur: () => f(!1),
      children: [
        /* @__PURE__ */ i("span", { style: y, "aria-hidden": "true", children: /* @__PURE__ */ i("span", { style: m }) }),
        t ? /* @__PURE__ */ i("span", { style: B, children: t }) : null
      ]
    }
  );
}
const W = {
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  gap: 12,
  flexShrink: 0
}, P = {
  margin: 0,
  fontSize: 16,
  fontWeight: 600,
  color: s.mastBlue,
  lineHeight: 1.3
}, K = {
  display: "flex",
  alignItems: "center",
  gap: 6,
  flexShrink: 0
}, $ = ({
  title: e,
  titleId: t,
  toolbar: n,
  toolbarWrap: o = !0,
  style: r
}) => /* @__PURE__ */ g("header", { style: l(W, r), children: [
  /* @__PURE__ */ i("h2", { id: t, style: P, children: e }),
  n ? o ? /* @__PURE__ */ i("div", { style: K, children: n }) : n : null
] }), q = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: 36,
  height: 36,
  padding: 0,
  border: `1px solid ${s.borderInput}`,
  borderRadius: 6,
  background: s.bgCard,
  color: s.textMuted,
  cursor: "pointer",
  transition: "border-color 0.15s ease, color 0.15s ease, background-color 0.15s ease"
}, U = {
  borderColor: s.mainBlue1,
  color: s.mainBlue1,
  backgroundColor: s.focusBg
};
function ae({ onClick: e, title: t = "Закрыть", style: n }) {
  const [o, r] = h(!1), [a, d] = h(!1);
  return /* @__PURE__ */ i(
    "button",
    {
      type: "button",
      title: t,
      "aria-label": t,
      onClick: e,
      style: l(
        q,
        (o || a) && U,
        a && { outline: "none" },
        n
      ),
      onMouseEnter: () => r(!0),
      onMouseLeave: () => r(!1),
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
const V = {
  position: "fixed",
  zIndex: 3,
  top: 0,
  right: 0,
  bottom: 0,
  boxShadow: "0 0 10px 1px #00000070",
  borderRadius: 3,
  background: s.bgCard,
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
}, G = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  flex: 1,
  minHeight: 0
}, J = {
  display: "flex",
  flexDirection: "column",
  flex: 1,
  minHeight: 0,
  gap: 16,
  width: "100%"
}, Q = {
  display: "flex",
  flexWrap: "wrap",
  gap: 8,
  justifyContent: "flex-end",
  width: "100%",
  marginTop: 16
};
function de({
  open: e = !0,
  onClose: t,
  title: n,
  titleId: o,
  toolbar: r,
  headerActions: a,
  children: d,
  footer: u,
  style: f,
  layoutStyle: x,
  rootStyle: y,
  usePortal: m = !0,
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
    const c = (O) => {
      O.key === "Escape" && t();
    };
    return window.addEventListener("keydown", c), () => window.removeEventListener("keydown", c);
  }, [e, t]), !e)
    return null;
  const k = (c) => {
    S && t && c.target === c.currentTarget && t();
  }, _ = r ?? a, w = /* @__PURE__ */ i(
    "div",
    {
      role: "dialog",
      "aria-modal": "true",
      "aria-labelledby": o,
      onClick: k,
      style: l(V, {
        transform: p ? "translateX(0)" : "translateX(100%)",
        opacity: p ? 1 : 0.92
      }, y),
      children: /* @__PURE__ */ g(
        "div",
        {
          style: l(G, x),
          onClick: (c) => c.stopPropagation(),
          children: [
            /* @__PURE__ */ g(
              "section",
              {
                style: l(J, f),
                "aria-labelledby": o,
                children: [
                  n ? /* @__PURE__ */ i(
                    $,
                    {
                      title: n,
                      titleId: o,
                      toolbar: _
                    }
                  ) : null,
                  d
                ]
              }
            ),
            u ? /* @__PURE__ */ i("div", { style: Q, children: u }) : null
          ]
        }
      )
    }
  );
  return m ? A(w, document.body) : w;
}
const ce = (...e) => e.filter(Boolean).join(" ");
export {
  oe as Box,
  re as Container,
  ie as Layout,
  se as Main,
  de as SideDrawer,
  ae as SideDrawerCloseButton,
  $ as SiteModalHeader,
  le as Toggle,
  ce as joinClass,
  l as mergeStyle,
  s as tokens
};
