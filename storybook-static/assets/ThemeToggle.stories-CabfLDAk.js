import{j as e,r as x,T as C}from"./iframe-BAdS09qN.js";import{R as B,T as n,M as T,B as j,i as D}from"./docsFragments-WzdrOMoJ.js";import"./preload-helper-Dp1pzeXC.js";import"./index-BMp2QMW5.js";import"./index-Cw6mF6u-.js";const P={title:"Design System/ThemeToggle",component:n,tags:["autodocs"],parameters:{docs:{description:{component:`
Отдельный переключатель светлой и тёмной темы. В uncontrolled-режиме меняет тему через \`ThemeProvider\`.
Controlled: пропы \`theme\` и \`onThemeChange\`.

Вложенный \`ThemeProvider\` перекрывает внешний.

${B}

${D("ThemeProvider","ThemeToggle","Main","Box")}
        `}}},argTypes:{label:{description:"Подпись рядом с переключателем."},disabled:{control:"boolean"},theme:{control:!1},onThemeChange:{control:!1}}},r={name:"С Box",render:()=>e.jsxs(T,{style:{padding:24},children:[e.jsx(n,{}),e.jsx(j,{title:"Карточка",style:{marginTop:16},children:"Контент меняет оформление при смене темы в toolbar или переключателе."})]})},o={name:"Минимальный",render:()=>e.jsx(n,{label:""})};function E(){const[s,a]=x.useState("light");return e.jsx(C,{theme:s,onThemeChange:a,children:e.jsxs(T,{style:{padding:24},children:[e.jsx(n,{theme:s,onThemeChange:a}),e.jsxs("p",{style:{marginTop:12},children:["Тема: ",s]})]})})}const u={render:()=>e.jsx(E,{})},S=["WithPreview","Minimal","Controlled"];var t,m,l;r.parameters={...r.parameters,docs:{...(t=r.parameters)==null?void 0:t.docs,source:{originalSource:`{
  name: "С Box",
  render: () => <Main style={{
    padding: 24
  }}>\r
      <ThemeToggle />\r
      <Box title="Карточка" style={{
      marginTop: 16
    }}>\r
        Контент меняет оформление при смене темы в toolbar или переключателе.\r
      </Box>\r
    </Main>
}`,...(l=(m=r.parameters)==null?void 0:m.docs)==null?void 0:l.source}}};var i,d,c;o.parameters={...o.parameters,docs:{...(i=o.parameters)==null?void 0:i.docs,source:{originalSource:`{
  name: "Минимальный",
  render: () => <ThemeToggle label="" />
}`,...(c=(d=o.parameters)==null?void 0:d.docs)==null?void 0:c.source}}};var p,h,g;u.parameters={...u.parameters,docs:{...(p=u.parameters)==null?void 0:p.docs,source:{originalSource:`{
  render: () => <ControlledDemo />
}`,...(g=(h=u.parameters)==null?void 0:h.docs)==null?void 0:g.source}}};export{u as Controlled,o as Minimal,r as WithPreview,S as __namedExportsOrder,P as default};
