import{j as r}from"./iframe-BtHEu9Ll.js";import{S as y,R as E,I as c,i as v,M as w,T as D}from"./docsFragments-B-ySBce8.js";import"./preload-helper-Dp1pzeXC.js";import"./index-BN7hXfbX.js";import"./index-BibZq7iP.js";function z({style:e}){return r.jsx("svg",{width:"100%",height:"100%",viewBox:"0 0 24 24",style:e,"aria-hidden":"true",children:r.jsx("circle",{cx:"12",cy:"12",r:"5",fill:"currentColor"})})}function R({style:e}){return r.jsx("svg",{width:"100%",height:"100%",viewBox:"0 0 24 24",style:e,"aria-hidden":"true",children:r.jsx("path",{d:"M14 3a7 7 0 1 0 0 14 9 9 0 0 1 0-14z",fill:"currentColor"})})}const b={title:"Design System/Icon",component:c,tags:["autodocs"],render:e=>r.jsx(c,{...e}),args:{size:"m"},decorators:[e=>r.jsxs(w,{style:{padding:24},children:[r.jsx(D,{}),r.jsx("div",{style:{marginTop:16},children:r.jsx(e,{})})]})],parameters:{docs:{description:{component:`
Иконка с поддержкой тёмной темы: \`src\` / \`darkSrc\` для img или \`component\` / \`darkComponent\` для SVG как React-компонентов.

${E}

${v("Icon","ThemeProvider","ThemeSelect")}
        `}}},argTypes:{src:{description:"URL изображения (светлая тема)."},darkSrc:{description:"URL для тёмной темы; если нет — используется src."},alt:{description:"Обязателен для ветки img."},component:{control:!1},darkComponent:{control:!1},size:{options:y,control:"select",description:"Размер по шкале, если не заданы width/height."}}},n={name:"Img с darkSrc",args:{src:"https://placehold.co/32x32/2196f3/ffffff?text=L",darkSrc:"https://placehold.co/32x32/2196f3/121212?text=D",alt:"Демо",width:32,height:32}},t={name:"Img без darkSrc",args:{src:"https://placehold.co/32x32/2196f3/ffffff?text=1",alt:"Одна картинка",width:32,height:32}},a={name:"React-компоненты",args:{size:"m",style:{color:"#2196f3"}},render:e=>r.jsx(c,{...e,component:z,darkComponent:R,width:void 0,height:void 0})},o={name:"Минимальный",args:{size:"m",src:"https://placehold.co/48x48/2196f3/ffffff?text=i",alt:"Демо"}},s={name:"Размеры",parameters:{controls:{disable:!0}},render:()=>r.jsx("div",{style:{display:"flex",alignItems:"center",gap:12},children:y.map(e=>r.jsx(c,{size:e,component:z,style:{color:"#2196f3"}},e))})},L=["ImagePair","ImageFallback","ComponentPair","Minimal","SizeScale"];var i,d,u;n.parameters={...n.parameters,docs:{...(i=n.parameters)==null?void 0:i.docs,source:{originalSource:`{
  name: "Img с darkSrc",
  args: {
    src: "https://placehold.co/32x32/2196f3/ffffff?text=L",
    darkSrc: "https://placehold.co/32x32/2196f3/121212?text=D",
    alt: "Демо",
    width: 32,
    height: 32
  }
}`,...(u=(d=n.parameters)==null?void 0:d.docs)==null?void 0:u.source}}};var m,l,p;t.parameters={...t.parameters,docs:{...(m=t.parameters)==null?void 0:m.docs,source:{originalSource:`{
  name: "Img без darkSrc",
  args: {
    src: "https://placehold.co/32x32/2196f3/ffffff?text=1",
    alt: "Одна картинка",
    width: 32,
    height: 32
  }
}`,...(p=(l=t.parameters)==null?void 0:l.docs)==null?void 0:p.source}}};var f,h,g;a.parameters={...a.parameters,docs:{...(f=a.parameters)==null?void 0:f.docs,source:{originalSource:`{
  name: "React-компоненты",
  args: {
    size: "m",
    style: {
      color: "#2196f3"
    }
  },
  render: args => <Icon {...args} component={SunIcon} darkComponent={MoonIcon} width={undefined} height={undefined} />
}`,...(g=(h=a.parameters)==null?void 0:h.docs)==null?void 0:g.source}}};var x,S,I;o.parameters={...o.parameters,docs:{...(x=o.parameters)==null?void 0:x.docs,source:{originalSource:`{
  name: "Минимальный",
  args: {
    size: "m",
    src: "https://placehold.co/48x48/2196f3/ffffff?text=i",
    alt: "Демо"
  }
}`,...(I=(S=o.parameters)==null?void 0:S.docs)==null?void 0:I.source}}};var k,C,j;s.parameters={...s.parameters,docs:{...(k=s.parameters)==null?void 0:k.docs,source:{originalSource:`{
  name: "Размеры",
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <div style={{
    display: "flex",
    alignItems: "center",
    gap: 12
  }}>\r
      {SIZE_KEYS.map(size => <Icon key={size} size={size} component={SunIcon} style={{
      color: "#2196f3"
    }} />)}\r
    </div>
}`,...(j=(C=s.parameters)==null?void 0:C.docs)==null?void 0:j.source}}};export{a as ComponentPair,t as ImageFallback,n as ImagePair,o as Minimal,s as SizeScale,L as __namedExportsOrder,b as default};
