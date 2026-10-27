import{j as e,r as d}from"./iframe-BtHEu9Ll.js";import{R as v,c as s,M as u,t as C,i as E,d as k}from"./docsFragments-B-ySBce8.js";import"./preload-helper-Dp1pzeXC.js";import"./index-BN7hXfbX.js";import"./index-BibZq7iP.js";const l={flex:1,minHeight:0},b={color:C.textMuted,fontSize:14,margin:0},H={padding:"8px 16px",borderRadius:6,border:"none",background:C.mainBlue1,color:"#fff",cursor:"pointer"},F={title:"Design System/SideDrawer",component:s,tags:["autodocs"],parameters:{layout:"fullscreen",docs:{description:{component:`
Боковая панель — стили только в компоненте.

**Состав:** обязательные — контент (\`children\`); опциональные — \`open\`, \`onClose\`, \`title\`, \`titleId\`, \`toolbar\` / \`headerActions\`, \`footer\`, \`w\` (ширина панели, CSS-строка), \`usePortal\`, \`closeOnBackdrop\`, \`style\`, \`layoutStyle\`, \`rootStyle\`.

${v}

${E("SideDrawer","SideDrawerCloseButton","Main")}
        `}}},argTypes:{open:{control:"boolean"},onClose:{action:"closed"},title:{},titleId:{},toolbar:{control:!1},children:{control:!1},usePortal:{control:"boolean"},w:{control:"text",description:"Ширина панели (CSS, например 400px или 40%). Без значения — по контенту."}}};function B({usePortal:M=!1}){const P=d.useId(),[i,a]=d.useState(!0);return e.jsxs(u,{style:{padding:24,minHeight:400},children:[i?null:e.jsx("button",{type:"button",style:H,onClick:()=>a(!0),children:"Открыть drawer"}),e.jsx(s,{open:i,onClose:()=>a(!1),title:"Комментарии по лицензиям",titleId:P,usePortal:M,toolbar:e.jsx(k,{onClick:()=>a(!1)}),children:e.jsx("div",{style:l,children:e.jsx("p",{style:b,children:"Контент боковой панели."})})})]})}const r={render:()=>e.jsx(B,{})},t={name:"С portal в body",render:()=>e.jsx(B,{usePortal:!0})},o={name:"Минимальный (без title)",render:()=>e.jsx(u,{style:{padding:24,minHeight:200},children:e.jsx(s,{open:!0,usePortal:!1,children:e.jsx("div",{style:l,children:"Только тело панели"})})})},n={name:"Ширина (w)",render:()=>e.jsx(u,{style:{padding:24,minHeight:200},children:e.jsx(s,{open:!0,usePortal:!1,w:"360px",title:"Узкая панель",children:e.jsx("div",{style:l,children:e.jsx("p",{style:b,children:'Ширина задана через w="360px".'})})})})},T=["Default","WithPortal","Minimal","CustomWidth"];var c,p,m;r.parameters={...r.parameters,docs:{...(c=r.parameters)==null?void 0:c.docs,source:{originalSource:`{
  render: () => <DrawerDemo />
}`,...(m=(p=r.parameters)==null?void 0:p.docs)==null?void 0:m.source}}};var x,y,h;t.parameters={...t.parameters,docs:{...(x=t.parameters)==null?void 0:x.docs,source:{originalSource:`{
  name: "С portal в body",
  render: () => <DrawerDemo usePortal />
}`,...(h=(y=t.parameters)==null?void 0:y.docs)==null?void 0:h.source}}};var D,S,f;o.parameters={...o.parameters,docs:{...(D=o.parameters)==null?void 0:D.docs,source:{originalSource:`{
  name: "Минимальный (без title)",
  render: () => <Main style={{
    padding: 24,
    minHeight: 200
  }}>\r
      <SideDrawer open usePortal={false}>\r
        <div style={bodyStyle}>Только тело панели</div>\r
      </SideDrawer>\r
    </Main>
}`,...(f=(S=o.parameters)==null?void 0:S.docs)==null?void 0:f.source}}};var g,w,j;n.parameters={...n.parameters,docs:{...(g=n.parameters)==null?void 0:g.docs,source:{originalSource:`{
  name: "Ширина (w)",
  render: () => <Main style={{
    padding: 24,
    minHeight: 200
  }}>\r
      <SideDrawer open usePortal={false} w="360px" title="Узкая панель">\r
        <div style={bodyStyle}>\r
          <p style={muted}>Ширина задана через w=&quot;360px&quot;.</p>\r
        </div>\r
      </SideDrawer>\r
    </Main>
}`,...(j=(w=n.parameters)==null?void 0:w.docs)==null?void 0:j.source}}};export{n as CustomWidth,r as Default,o as Minimal,t as WithPortal,T as __namedExportsOrder,F as default};
