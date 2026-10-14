import{j as u,u as g}from"./iframe-CiYZLyXL.js";import{R as y,B as r,i as f,M as j}from"./docsFragments-Drh3_ADq.js";import"./preload-helper-Dp1pzeXC.js";import"./index-UK0xwPLs.js";import"./index-DKkv2d_9.js";function C({children:e}){const{colors:E}=g();return u.jsx("p",{style:{margin:0,color:E.textSecondary,fontSize:14},children:e})}const M={title:"Design System/Box",component:r,tags:["autodocs"],decorators:[e=>u.jsx(j,{style:{padding:24,background:"#e2e8f0"},children:u.jsx(e,{})})],parameters:{docs:{description:{component:`
Карточка контента — inline-стили в компоненте.

${y}

${f("Box","Main")}

**Состав:** \`children\` — содержимое; опционально \`title\` (заголовок), \`w\` (ширина CSS-строкой; без \`w\` — \`100%\`), \`shadow\` (размытие тени в px, по умолчанию \`12\`; \`0\` — без тени), \`style\`, \`as\`.

Текст в \`children\` наследует \`textPrimary\` с карточки; вторичный — \`useTheme().colors.textSecondary\`.

\`\`\`jsx
const { colors } = useTheme();
<Box title="Подписка" w="320px">
  <p style={{ margin: 0, color: colors.textSecondary, fontSize: 14 }}>…</p>
</Box>
\`\`\`
        `}}},argTypes:{title:{description:"Заголовок; без значения заголовок не показывается."},w:{description:"Ширина (`100%`, `320px`, `auto`…); по умолчанию `100%`."},shadow:{control:{type:"number",min:0,step:1},description:"Размытие тени карточки в px; по умолчанию 12; 0 — `box-shadow: none`."},children:{control:!1},style:{control:!1},as:{control:"text"}}},o={name:"С заголовком",args:{title:"Подписка"},render:e=>u.jsx(r,{...e,children:u.jsx(C,{children:"Пример содержимого."})})},n={name:"Минимальный",render:()=>u.jsx(r,{children:"Только текст в карточке"})},s={name:"Ширина w",render:()=>u.jsx(r,{title:"Узкая карточка",w:"280px",children:u.jsx("p",{style:{margin:0,fontSize:14},children:"Ширина задаётся пропом w."})})},t={name:"Без тени",render:()=>u.jsx(r,{title:"shadow={0}",shadow:0,children:u.jsx("p",{style:{margin:0,fontSize:14},children:"Тень отключена пропом shadow."})})},O=["Default","Minimal","CustomWidth","NoShadow"];var a,i,c;o.parameters={...o.parameters,docs:{...(a=o.parameters)==null?void 0:a.docs,source:{originalSource:`{
  name: "С заголовком",
  args: {
    title: "Подписка"
  },
  render: args => <Box {...args}>\r
      <SecondaryText>Пример содержимого.</SecondaryText>\r
    </Box>
}`,...(c=(i=o.parameters)==null?void 0:i.docs)==null?void 0:c.source}}};var d,m,l;n.parameters={...n.parameters,docs:{...(d=n.parameters)==null?void 0:d.docs,source:{originalSource:`{
  name: "Минимальный",
  render: () => <Box>Только текст в карточке</Box>
}`,...(l=(m=n.parameters)==null?void 0:m.docs)==null?void 0:l.source}}};var p,x,h;s.parameters={...s.parameters,docs:{...(p=s.parameters)==null?void 0:p.docs,source:{originalSource:`{
  name: "Ширина w",
  render: () => <Box title="Узкая карточка" w="280px">\r
      <p style={{
      margin: 0,
      fontSize: 14
    }}>Ширина задаётся пропом w.</p>\r
    </Box>
}`,...(h=(x=s.parameters)==null?void 0:x.docs)==null?void 0:h.source}}};var w,S,B;t.parameters={...t.parameters,docs:{...(w=t.parameters)==null?void 0:w.docs,source:{originalSource:`{
  name: "Без тени",
  render: () => <Box title="shadow={0}" shadow={0}>\r
      <p style={{
      margin: 0,
      fontSize: 14
    }}>Тень отключена пропом shadow.</p>\r
    </Box>
}`,...(B=(S=t.parameters)==null?void 0:S.docs)==null?void 0:B.source}}};export{s as CustomWidth,o as Default,n as Minimal,t as NoShadow,O as __namedExportsOrder,M as default};
