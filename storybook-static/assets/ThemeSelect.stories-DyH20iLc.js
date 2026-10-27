import{j as e,r as x,T as S}from"./iframe-BtHEu9Ll.js";import{T as r,M as g,B as C,f as B,i as y,R as j,g as v}from"./docsFragments-B-ySBce8.js";import"./preload-helper-Dp1pzeXC.js";import"./index-BN7hXfbX.js";import"./index-BibZq7iP.js";const A={title:"Design System/ThemeSelect",component:r,tags:["autodocs"],parameters:{docs:{description:{component:B("Выпадающий список тем: светлая, тёмная, серая. Uncontrolled — через `ThemeProvider`; controlled: `theme` и `onThemeChange`.","Цвета компонентов ДС с классами `dmc-*` задаются в `style.css` пакета (переменные `--dmc-color-*` на `data-dmc-theme`).",v,j,y("ThemeProvider","ThemeSelect","Main","Box"),"**Состав:** опционально `label`, `options`; controlled — `theme` и `onThemeChange`; `style`, `disabled`.",`\`\`\`jsx
<ThemeProvider>
  <Main style={{ padding: 24 }}>
    <ThemeSelect />
    <Box title="Раздел">Контент</Box>
  </Main>
</ThemeProvider>
\`\`\``,'```jsx\nconst [theme, setTheme] = useState("light");\n\n<ThemeProvider theme={theme} onThemeChange={setTheme}>\n  <ThemeSelect theme={theme} onThemeChange={setTheme} />\n</ThemeProvider>\n```')}}},argTypes:{label:{description:"Подпись над select; пустая строка — без подписи."},disabled:{control:"boolean"},theme:{control:!1},onThemeChange:{control:!1}}},n={name:"С Box",parameters:{docs:{source:{code:`<Main style={{ padding: 24 }}>
  <ThemeSelect />
  <Box title="Карточка" style={{ marginTop: 16 }}>…</Box>
</Main>`}}},render:()=>e.jsxs(g,{style:{padding:24},children:[e.jsx(r,{}),e.jsx(C,{title:"Карточка",style:{marginTop:16},children:"Контент меняет оформление при смене темы в toolbar или в списке."})]})},t={name:"Минимальный",parameters:{docs:{source:{code:'<ThemeSelect label="" />'}}},render:()=>e.jsx(r,{label:""})};function M(){const[s,a]=x.useState("light");return e.jsx(S,{theme:s,onThemeChange:a,children:e.jsxs(g,{style:{padding:24},children:[e.jsx(r,{theme:s,onThemeChange:a}),e.jsxs("p",{style:{marginTop:12},children:["Тема: ",s]})]})})}const o={parameters:{docs:{source:{code:`const [theme, setTheme] = useState("light");

<ThemeProvider theme={theme} onThemeChange={setTheme}>
  <ThemeSelect theme={theme} onThemeChange={setTheme} />
</ThemeProvider>`}}},render:()=>e.jsx(M,{})},O=["WithPreview","Minimal","Controlled"];var m,u,h;n.parameters={...n.parameters,docs:{...(m=n.parameters)==null?void 0:m.docs,source:{originalSource:`{
  name: "С Box",
  parameters: {
    docs: {
      source: {
        code: \`<Main style={{ padding: 24 }}>
  <ThemeSelect />
  <Box title="Карточка" style={{ marginTop: 16 }}>…</Box>
</Main>\`
      }
    }
  },
  render: () => <Main style={{
    padding: 24
  }}>\r
      <ThemeSelect />\r
      <Box title="Карточка" style={{
      marginTop: 16
    }}>\r
        Контент меняет оформление при смене темы в toolbar или в списке.\r
      </Box>\r
    </Main>
}`,...(h=(u=n.parameters)==null?void 0:u.docs)==null?void 0:h.source}}};var c,l,i;t.parameters={...t.parameters,docs:{...(c=t.parameters)==null?void 0:c.docs,source:{originalSource:`{
  name: "Минимальный",
  parameters: {
    docs: {
      source: {
        code: '<ThemeSelect label="" />'
      }
    }
  },
  render: () => <ThemeSelect label="" />
}`,...(i=(l=t.parameters)==null?void 0:l.docs)==null?void 0:i.source}}};var d,T,p;o.parameters={...o.parameters,docs:{...(d=o.parameters)==null?void 0:d.docs,source:{originalSource:`{
  parameters: {
    docs: {
      source: {
        code: \`const [theme, setTheme] = useState("light");

<ThemeProvider theme={theme} onThemeChange={setTheme}>
  <ThemeSelect theme={theme} onThemeChange={setTheme} />
</ThemeProvider>\`
      }
    }
  },
  render: () => <ControlledDemo />
}`,...(p=(T=o.parameters)==null?void 0:T.docs)==null?void 0:p.source}}};export{o as Controlled,t as Minimal,n as WithPreview,O as __namedExportsOrder,A as default};
