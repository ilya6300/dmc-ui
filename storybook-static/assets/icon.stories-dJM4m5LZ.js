import{j as e}from"./iframe-BV7CKJmH.js";import{I as o,M as S,T as k}from"./theme-toggle-CEYbH-lm.js";import{R as j,i as C}from"./docsFragments-xk9iu6ls.js";import"./preload-helper-Dp1pzeXC.js";import"./index-CMAChaAt.js";import"./index-BBZHYRE1.js";function w({style:r}){return e.jsx("svg",{width:"24",height:"24",viewBox:"0 0 24 24",style:r,"aria-hidden":"true",children:e.jsx("circle",{cx:"12",cy:"12",r:"5",fill:"currentColor"})})}function T({style:r}){return e.jsx("svg",{width:"24",height:"24",viewBox:"0 0 24 24",style:r,"aria-hidden":"true",children:e.jsx("path",{d:"M14 3a7 7 0 1 0 0 14 9 9 0 0 1 0-14z",fill:"currentColor"})})}const B={title:"Design System/Icon",component:o,tags:["autodocs"],decorators:[r=>e.jsxs(S,{style:{padding:24},children:[e.jsx(k,{}),e.jsx("div",{style:{marginTop:16},children:e.jsx(r,{})})]})],parameters:{docs:{description:{component:`
Иконка с поддержкой тёмной темы: \`src\` / \`darkSrc\` для img или \`component\` / \`darkComponent\` для SVG как React-компонентов.

${j}

${C("Icon","ThemeProvider","ThemeToggle")}
        `}}},argTypes:{src:{description:"URL изображения (светлая тема)."},darkSrc:{description:"URL для тёмной темы; если нет — используется src."},alt:{description:"Обязателен для ветки img."},component:{control:!1},darkComponent:{control:!1}}},t={name:"Img с darkSrc",render:()=>e.jsx(o,{src:"https://placehold.co/32x32/2196f3/ffffff?text=L",darkSrc:"https://placehold.co/32x32/2196f3/121212?text=D",alt:"Демо",width:32,height:32})},a={name:"Img без darkSrc",render:()=>e.jsx(o,{src:"https://placehold.co/32x32/2196f3/ffffff?text=1",alt:"Одна картинка",width:32,height:32})},c={name:"React-компоненты",render:()=>e.jsx(o,{component:w,darkComponent:T,style:{color:"#2196f3"}})},n={name:"Минимальный",render:()=>e.jsx(o,{src:"https://placehold.co/24x24/000000/ffffff?text=i",alt:"",width:24,height:24})},P=["ImagePair","ImageFallback","ComponentPair","Minimal"];var s,i,d;t.parameters={...t.parameters,docs:{...(s=t.parameters)==null?void 0:s.docs,source:{originalSource:`{
  name: "Img с darkSrc",
  render: () => <Icon src="https://placehold.co/32x32/2196f3/ffffff?text=L" darkSrc="https://placehold.co/32x32/2196f3/121212?text=D" alt="Демо" width={32} height={32} />
}`,...(d=(i=t.parameters)==null?void 0:i.docs)==null?void 0:d.source}}};var m,u,p;a.parameters={...a.parameters,docs:{...(m=a.parameters)==null?void 0:m.docs,source:{originalSource:`{
  name: "Img без darkSrc",
  render: () => <Icon src="https://placehold.co/32x32/2196f3/ffffff?text=1" alt="Одна картинка" width={32} height={32} />
}`,...(p=(u=a.parameters)==null?void 0:u.docs)==null?void 0:p.source}}};var l,f,h;c.parameters={...c.parameters,docs:{...(l=c.parameters)==null?void 0:l.docs,source:{originalSource:`{
  name: "React-компоненты",
  render: () => <Icon component={SunIcon} darkComponent={MoonIcon} style={{
    color: "#2196f3"
  }} />
}`,...(h=(f=c.parameters)==null?void 0:f.docs)==null?void 0:h.source}}};var x,g,I;n.parameters={...n.parameters,docs:{...(x=n.parameters)==null?void 0:x.docs,source:{originalSource:`{
  name: "Минимальный",
  render: () => <Icon src="https://placehold.co/24x24/000000/ffffff?text=i" alt="" width={24} height={24} />
}`,...(I=(g=n.parameters)==null?void 0:g.docs)==null?void 0:I.source}}};export{c as ComponentPair,a as ImageFallback,t as ImagePair,n as Minimal,P as __namedExportsOrder,B as default};
