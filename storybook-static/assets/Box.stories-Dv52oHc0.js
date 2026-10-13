import{j as u}from"./iframe-BAdS09qN.js";import{R as g,B as n,t as B,i as E,M as f}from"./docsFragments-WzdrOMoJ.js";import"./preload-helper-Dp1pzeXC.js";import"./index-BMp2QMW5.js";import"./index-Cw6mF6u-.js";const y={title:"Design System/Box",component:n,tags:["autodocs"],decorators:[o=>u.jsx(f,{style:{padding:24,background:"#e2e8f0"},children:u.jsx(o,{})})],parameters:{docs:{description:{component:`
Карточка контента — inline-стили в компоненте.

${g}

${E("Box","Main")}

**Состав:** \`children\` — содержимое; опционально \`title\` (заголовок), \`w\` (ширина CSS-строкой; без \`w\` — \`100%\`), \`style\`, \`as\`.

\`\`\`jsx
<Box title="Подписка" w="320px">
  <p style={{ margin: 0, color: tokens.textMuted, fontSize: 14 }}>…</p>
</Box>
\`\`\`
        `}}},argTypes:{title:{description:"Заголовок; без значения заголовок не показывается."},w:{description:"Ширина (`100%`, `320px`, `auto`…); по умолчанию `100%`."},children:{control:!1},style:{control:!1},as:{control:"text"}}},e={name:"С заголовком",args:{title:"Подписка"},render:o=>u.jsx(n,{...o,children:u.jsx("p",{style:{margin:0,color:B.textMuted,fontSize:14},children:"Пример содержимого."})})},r={name:"Минимальный",render:()=>u.jsx(n,{children:"Только текст в карточке"})},t={name:"Ширина w",render:()=>u.jsx(n,{title:"Узкая карточка",w:"280px",children:u.jsx("p",{style:{margin:0,fontSize:14},children:"Ширина задаётся пропом w."})})},A=["Default","Minimal","CustomWidth"];var s,a,i;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`{
  name: "С заголовком",
  args: {
    title: "Подписка"
  },
  render: args => <Box {...args}>\r
      <p style={{
      margin: 0,
      color: tokens.textMuted,
      fontSize: 14
    }}>\r
        Пример содержимого.\r
      </p>\r
    </Box>
}`,...(i=(a=e.parameters)==null?void 0:a.docs)==null?void 0:i.source}}};var c,l,m;r.parameters={...r.parameters,docs:{...(c=r.parameters)==null?void 0:c.docs,source:{originalSource:`{
  name: "Минимальный",
  render: () => <Box>Только текст в карточке</Box>
}`,...(m=(l=r.parameters)==null?void 0:l.docs)==null?void 0:m.source}}};var p,d,x;t.parameters={...t.parameters,docs:{...(p=t.parameters)==null?void 0:p.docs,source:{originalSource:`{
  name: "Ширина w",
  render: () => <Box title="Узкая карточка" w="280px">\r
      <p style={{
      margin: 0,
      fontSize: 14
    }}>Ширина задаётся пропом w.</p>\r
    </Box>
}`,...(x=(d=t.parameters)==null?void 0:d.docs)==null?void 0:x.source}}};export{t as CustomWidth,e as Default,r as Minimal,A as __namedExportsOrder,y as default};
