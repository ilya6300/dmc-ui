import{j as e}from"./iframe-BAdS09qN.js";import{R as c,L as a,M as m,B as d,i as y}from"./docsFragments-WzdrOMoJ.js";import"./preload-helper-Dp1pzeXC.js";import"./index-BMp2QMW5.js";import"./index-Cw6mF6u-.js";const L={title:"Design System/Layout",component:a,tags:["autodocs"],parameters:{layout:"fullscreen",docs:{description:{component:`
Колонка контента: flex-колонка, отступы \`0 2% 4%\`, при монтировании — сдвиг справа (0.6s), как legacy \`animation_move_list\`.

${c}

${y("Layout","Main","Box")}

**Состав:** \`children\` — обязательно; опционально \`animate\` (по умолчанию \`false\`), \`style\`.

\`\`\`jsx
<Main style={{ minHeight: "100vh" }}>
  <Layout>
    <Box title="Раздел">…</Box>
  </Layout>
</Main>
\`\`\`
        `}}},argTypes:{children:{control:!1},animate:{description:"Входная анимация; при `false` — только базовый layout.",control:"boolean"},style:{control:!1}}},u={name:"С анимацией",render:()=>e.jsx(m,{style:{minHeight:320,background:"#e2e8f0"},children:e.jsx(a,{animate:!0,children:e.jsx(d,{title:"Список",children:"Контент внутри Layout"})})})},n={name:"Минимальный",render:()=>e.jsx(m,{style:{minHeight:200,background:"#e2e8f0"},children:e.jsx(a,{children:e.jsx("p",{style:{margin:0,fontSize:14},children:"Только Layout без анимации"})})})},B=["Default","Minimal"];var t,r,o;u.parameters={...u.parameters,docs:{...(t=u.parameters)==null?void 0:t.docs,source:{originalSource:`{
  name: "С анимацией",
  render: () => <Main style={{
    minHeight: 320,
    background: "#e2e8f0"
  }}>\r
      <Layout animate>\r
        <Box title="Список">Контент внутри Layout</Box>\r
      </Layout>\r
    </Main>
}`,...(o=(r=u.parameters)==null?void 0:r.docs)==null?void 0:o.source}}};var s,i,l;n.parameters={...n.parameters,docs:{...(s=n.parameters)==null?void 0:s.docs,source:{originalSource:`{
  name: "Минимальный",
  render: () => <Main style={{
    minHeight: 200,
    background: "#e2e8f0"
  }}>\r
      <Layout>\r
        <p style={{
        margin: 0,
        fontSize: 14
      }}>Только Layout без анимации</p>\r
      </Layout>\r
    </Main>
}`,...(l=(i=n.parameters)==null?void 0:i.docs)==null?void 0:l.source}}};export{u as Default,n as Minimal,B as __namedExportsOrder,L as default};
