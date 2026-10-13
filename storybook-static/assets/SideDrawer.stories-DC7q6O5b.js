import{j as e,r as i}from"./iframe-BAdS09qN.js";import{R as w,S as s,M as y,i as B,t as g,a as C}from"./docsFragments-WzdrOMoJ.js";import"./preload-helper-Dp1pzeXC.js";import"./index-BMp2QMW5.js";import"./index-Cw6mF6u-.js";const S={flex:1,minHeight:0},M={color:g.textMuted,fontSize:14,margin:0},E={padding:"8px 16px",borderRadius:6,border:"none",background:g.mainBlue1,color:"#fff",cursor:"pointer"},R={title:"Design System/SideDrawer",component:s,tags:["autodocs"],parameters:{layout:"fullscreen",docs:{description:{component:`
Боковая панель — стили только в компоненте.

${w}

${B("SideDrawer","SideDrawerCloseButton","Main")}
        `}}},argTypes:{open:{control:"boolean"},onClose:{action:"closed"},title:{},titleId:{},toolbar:{control:!1},children:{control:!1},usePortal:{control:"boolean"}}};function h({usePortal:b=!1}){const j=i.useId(),[a,n]=i.useState(!0);return e.jsxs(y,{style:{padding:24,minHeight:400},children:[a?null:e.jsx("button",{type:"button",style:E,onClick:()=>n(!0),children:"Открыть drawer"}),e.jsx(s,{open:a,onClose:()=>n(!1),title:"Комментарии по лицензиям",titleId:j,usePortal:b,toolbar:e.jsx(C,{onClick:()=>n(!1)}),children:e.jsx("div",{style:S,children:e.jsx("p",{style:M,children:"Контент боковой панели."})})})]})}const r={render:()=>e.jsx(h,{})},t={name:"С portal в body",render:()=>e.jsx(h,{usePortal:!0})},o={name:"Минимальный (без title)",render:()=>e.jsx(y,{style:{padding:24,minHeight:200},children:e.jsx(s,{open:!0,usePortal:!1,children:e.jsx("div",{style:S,children:"Только тело панели"})})})},I=["Default","WithPortal","Minimal"];var l,u,d;r.parameters={...r.parameters,docs:{...(l=r.parameters)==null?void 0:l.docs,source:{originalSource:`{
  render: () => <DrawerDemo />
}`,...(d=(u=r.parameters)==null?void 0:u.docs)==null?void 0:d.source}}};var c,p,m;t.parameters={...t.parameters,docs:{...(c=t.parameters)==null?void 0:c.docs,source:{originalSource:`{
  name: "С portal в body",
  render: () => <DrawerDemo usePortal />
}`,...(m=(p=t.parameters)==null?void 0:p.docs)==null?void 0:m.source}}};var x,f,D;o.parameters={...o.parameters,docs:{...(x=o.parameters)==null?void 0:x.docs,source:{originalSource:`{
  name: "Минимальный (без title)",
  render: () => <Main style={{
    padding: 24,
    minHeight: 200
  }}>\r
      <SideDrawer open usePortal={false}>\r
        <div style={bodyStyle}>Только тело панели</div>\r
      </SideDrawer>\r
    </Main>
}`,...(D=(f=o.parameters)==null?void 0:f.docs)==null?void 0:D.source}}};export{r as Default,o as Minimal,t as WithPortal,I as __namedExportsOrder,R as default};
