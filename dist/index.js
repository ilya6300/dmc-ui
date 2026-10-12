import { jsx as a, jsxs as p } from "react/jsx-runtime";
import { useEffect as w } from "react";
import { createPortal as x } from "react-dom";
const s = (...e) => e.filter(Boolean).join(" ");
function S({
  children: e,
  className: t,
  pageVariant: r,
  withMainPage: n = !1,
  as: c = "div",
  ...i
}) {
  return /* @__PURE__ */ a(
    c,
    {
      className: s(
        n && "main-page",
        "company-card-v4",
        r,
        t
      ),
      ...i,
      children: e
    }
  );
}
function D({
  variant: e = "primary",
  onClick: t,
  text: r,
  children: n,
  className: c,
  type: i = "button",
  disabled: o,
  compact: d,
  footerSize: m,
  ...u
}) {
  return e === "icon" ? /* @__PURE__ */ p(
    "div",
    {
      className: s("btn_func_container_v4", c),
      onClick: o ? void 0 : t,
      role: "button",
      tabIndex: o ? -1 : 0,
      onKeyDown: (f) => {
        !o && (f.key === "Enter" || f.key === " ") && (f.preventDefault(), t == null || t(f));
      },
      ...u,
      children: [
        /* @__PURE__ */ a("span", { className: "btn_func_container_v4_span", children: "+" }),
        r !== void 0 ? /* @__PURE__ */ a("span", { className: "btn_func_container_v4_text", children: r }) : null
      ]
    }
  ) : /* @__PURE__ */ a(
    "button",
    {
      type: i,
      className: s(e === "outline" ? "btn-outline-v4" : e === "primary" && !(m || d) ? "btn-primary-v4 sub-status-action-btn" : "btn-primary-v4", c),
      onClick: t,
      disabled: o,
      ...u,
      children: n ?? r ?? (e === "primary" ? "Добавить" : null)
    }
  );
}
function E({
  active: e,
  label: t,
  description: r,
  onClick: n,
  onChange: c,
  className: i = "",
  disabled: o = !1
}) {
  const d = (u) => {
    u.preventDefault(), !o && (n == null || n(u), c == null || c(!e));
  }, m = !!(t || r);
  return /* @__PURE__ */ p(
    "button",
    {
      type: "button",
      className: s(
        "cc-v4-toggle-wrapper",
        m && "cc-v4-toggle-wrapper--with-text",
        i
      ),
      onClick: d,
      "aria-pressed": !!e,
      disabled: o,
      children: [
        /* @__PURE__ */ a(
          "span",
          {
            className: s(
              "cc-v4-toggle",
              e && "cc-v4-toggle--on"
            ),
            "aria-hidden": "true"
          }
        ),
        m ? /* @__PURE__ */ p("span", { className: "cc-v4-toggle-text", children: [
          t ? /* @__PURE__ */ a("span", { className: "cc-v4-toggle-label", children: t }) : null,
          r ? /* @__PURE__ */ a("span", { className: "cc-v4-toggle-description", children: r }) : null
        ] }) : null
      ]
    }
  );
}
function j({ children: e, className: t }) {
  return /* @__PURE__ */ a("div", { className: s("cc-v4-soft-list-root", t), children: e });
}
function T({ gridClass: e, columns: t, children: r, className: n }) {
  return /* @__PURE__ */ a(
    "div",
    {
      className: s("cc-v4-soft-header", e, n),
      children: r ?? (t == null ? void 0 : t.map((c) => /* @__PURE__ */ a("span", { className: "cc-v4-soft-th-static", children: /* @__PURE__ */ a("span", { className: "cc-v4-soft-th-label", children: c.label }) }, c.key)))
    }
  );
}
function k({ children: e, className: t }) {
  return /* @__PURE__ */ a("div", { className: s("cc-v4-soft-body", t), children: e });
}
function A({
  as: e = "div",
  gridClass: t,
  className: r,
  children: n,
  ...c
}) {
  return /* @__PURE__ */ a(
    e,
    {
      className: s(
        "cc-v4-soft-row",
        t,
        "reports-soft-row",
        r
      ),
      ...c,
      children: n
    }
  );
}
function H({
  className: e,
  legacy: t = !1,
  v4: r = !0,
  error: n,
  ...c
}) {
  const i = s(
    t && "input_edit_v1",
    r && "site-form-control",
    n && "cc-v4-input--error",
    e
  );
  return /* @__PURE__ */ a("input", { className: i, ...c });
}
const V = ({ title: e, titleId: t, toolbar: r, toolbarWrap: n = !0 }) => /* @__PURE__ */ p("header", { className: "site-modal-header", children: [
  /* @__PURE__ */ a("h2", { id: t, className: "site-modal-title", children: e }),
  r ? n ? /* @__PURE__ */ a("div", { className: "site-modal-toolbar", children: r }) : r : null
] });
function K({
  open: e = !0,
  onClose: t,
  title: r,
  titleId: n,
  toolbar: c,
  headerActions: i,
  children: o,
  footer: d,
  className: m,
  style: u,
  layoutStyle: v,
  rootClassName: y,
  usePortal: b = !0,
  closeOnBackdrop: f = !0
}) {
  if (w(() => {
    if (!e)
      return;
    const l = document.body.style.overflow;
    return document.body.style.overflow = "hidden", () => {
      document.body.style.overflow = l;
    };
  }, [e]), w(() => {
    if (!e || !t)
      return;
    const l = (_) => {
      _.key === "Escape" && t();
    };
    return window.addEventListener("keydown", l), () => window.removeEventListener("keydown", l);
  }, [e, t]), !e)
    return null;
  const N = (l) => {
    f && t && l.target === l.currentTarget && t();
  }, g = c ?? i, h = /* @__PURE__ */ a(
    "div",
    {
      className: s("posi-abs", "subscription-drawer-v4", y),
      role: "dialog",
      "aria-modal": "true",
      "aria-labelledby": n,
      onClick: N,
      children: /* @__PURE__ */ p("div", { className: "flex_center subscription-drawer-layout", style: v, children: [
        /* @__PURE__ */ p(
          "section",
          {
            className: s(
              "subscription-drawer-main",
              "site-modal",
              m
            ),
            style: u,
            "aria-labelledby": n,
            onClick: (l) => l.stopPropagation(),
            children: [
              r ? /* @__PURE__ */ a(
                V,
                {
                  title: r,
                  titleId: n,
                  toolbar: g
                }
              ) : null,
              o
            ]
          }
        ),
        d ? /* @__PURE__ */ a("div", { className: "btn-container-new-company subscription-drawer-actions", children: d }) : null
      ] })
    }
  );
  return b ? x(h, document.body) : h;
}
export {
  S as Box,
  D as CcV4Button,
  H as CcV4Input,
  K as CcV4SideDrawer,
  j as CcV4SoftList,
  k as CcV4SoftListBody,
  T as CcV4SoftListHeader,
  A as CcV4SoftListRow,
  E as CcV4Toggle,
  V as SiteModalHeader,
  s as joinClass
};
