import{j as r}from"./iframe-BV7CKJmH.js";import{M as o,B as c}from"./theme-toggle-CEYbH-lm.js";import{R as d,i as p}from"./docsFragments-xk9iu6ls.js";import"./preload-helper-Dp1pzeXC.js";import"./index-CMAChaAt.js";import"./index-BBZHYRE1.js";const E={title:"Design System/Main",component:o,tags:["autodocs"],parameters:{layout:"fullscreen",docs:{description:{component:`
Обёртка страницы — только \`style\`.

${d}

${p("Main","Box")}

\`\`\`jsx
<Main style={{ minHeight: "100vh", padding: 24 }}>
  <Box title="Раздел">…</Box>
</Main>
\`\`\`
        `}}},argTypes:{children:{control:!1},style:{description:"Inline-стили корня.",control:!1}}},e={name:"Страница со скроллом",render:()=>r.jsx(o,{style:{height:320,overflow:"auto",background:"#e2e8f0",padding:24},children:Array.from({length:8},(g,a)=>r.jsxs(c,{style:{marginBottom:10},children:["Блок ",a+1]},a))})},n={name:"Минимальный",render:()=>r.jsx(o,{style:{padding:16},children:r.jsx("p",{style:{margin:0,fontSize:12},children:"Main без вложенного Box"})})},j=["ScrollablePage","Minimal"];var t,u,s;e.parameters={...e.parameters,docs:{...(t=e.parameters)==null?void 0:t.docs,source:{originalSource:`{
  name: "Страница со скроллом",
  render: () => <Main style={{
    height: 320,
    overflow: "auto",
    background: "#e2e8f0",
    padding: 24
  }}>\r
      {Array.from({
      length: 8
    }, (_, i) => <Box key={i} style={{
      marginBottom: 10
    }}>\r
          Блок {i + 1}\r
        </Box>)}\r
    </Main>
}`,...(s=(u=e.parameters)==null?void 0:u.docs)==null?void 0:s.source}}};var i,l,m;n.parameters={...n.parameters,docs:{...(i=n.parameters)==null?void 0:i.docs,source:{originalSource:`{
  name: "Минимальный",
  render: () => <Main style={{
    padding: 16
  }}>\r
      <p style={{
      margin: 0,
      fontSize: 12
    }}>Main без вложенного Box</p>\r
    </Main>
}`,...(m=(l=n.parameters)==null?void 0:l.docs)==null?void 0:m.source}}};export{n as Minimal,e as ScrollablePage,j as __namedExportsOrder,E as default};
