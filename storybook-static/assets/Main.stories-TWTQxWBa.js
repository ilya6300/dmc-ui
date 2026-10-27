import{j as r}from"./iframe-BtHEu9Ll.js";import{R as c,M as a,B as d,i as p}from"./docsFragments-B-ySBce8.js";import"./preload-helper-Dp1pzeXC.js";import"./index-BN7hXfbX.js";import"./index-BibZq7iP.js";const h={title:"Design System/Main",component:a,tags:["autodocs"],parameters:{layout:"fullscreen",docs:{description:{component:`
Обёртка страницы — только \`style\`.

${c}

${p("Main","Box")}

\`\`\`jsx
<Main style={{ minHeight: "100vh", padding: 24 }}>
  <Box title="Раздел">…</Box>
</Main>
\`\`\`
        `}}},argTypes:{children:{control:!1},style:{description:"Inline-стили корня.",control:!1}}},e={name:"Страница со скроллом",render:()=>r.jsx(a,{style:{height:320,overflow:"auto",background:"#e2e8f0",padding:24},children:Array.from({length:8},(g,o)=>r.jsxs(d,{style:{marginBottom:10},children:["Блок ",o+1]},o))})},n={name:"Минимальный",render:()=>r.jsx(a,{style:{padding:16},children:r.jsx("p",{style:{margin:0,fontSize:12},children:"Main без вложенного Box"})})},E=["ScrollablePage","Minimal"];var t,u,s;e.parameters={...e.parameters,docs:{...(t=e.parameters)==null?void 0:t.docs,source:{originalSource:`{
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
}`,...(m=(l=n.parameters)==null?void 0:l.docs)==null?void 0:m.source}}};export{n as Minimal,e as ScrollablePage,E as __namedExportsOrder,h as default};
