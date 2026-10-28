import{j as e,r as x,T as C}from"./iframe-BV7CKJmH.js";import{T as t,M as p,B}from"./theme-toggle-CEYbH-lm.js";import{R as v,i as y}from"./docsFragments-xk9iu6ls.js";import"./preload-helper-Dp1pzeXC.js";import"./index-CMAChaAt.js";import"./index-BBZHYRE1.js";const f={title:"Design System/ThemeToggle",component:t,tags:["autodocs"],parameters:{docs:{description:{component:`
Переключатель \`Toggle\` с иконками луны (слева в треке) и солнца (справа); \`currentColor\` на треке.
Uncontrolled — \`ThemeProvider\`; controlled: \`theme\` и \`onThemeChange\`.

Вложенный \`ThemeProvider\` перекрывает внешний.

${v}

${y("ThemeProvider","ThemeToggle","Main","Box")}

**Состав:** опционально \`label\`; controlled — \`theme\` и \`onThemeChange\`; \`style\`, \`disabled\`.

\`\`\`jsx
<ThemeProvider>
  <Main style={{ padding: 24 }}>
    <ThemeToggle />
    <Box title="Раздел">Контент</Box>
  </Main>
</ThemeProvider>
\`\`\`

Controlled (состояние темы в приложении):

\`\`\`jsx
const [theme, setTheme] = useState("light");

<ThemeProvider theme={theme} onThemeChange={setTheme}>
  <ThemeToggle theme={theme} onThemeChange={setTheme} label="Тёмная тема" />
</ThemeProvider>
\`\`\`
        `}}},argTypes:{label:{description:"Опциональная подпись; без неё доступное имя задаётся автоматически."},disabled:{control:"boolean"},theme:{control:!1},onThemeChange:{control:!1}}},o={name:"С Box",parameters:{docs:{source:{code:`<Main style={{ padding: 24 }}>
  <ThemeToggle />
  <Box title="Карточка" style={{ marginTop: 16 }}>…</Box>
</Main>`}}},render:()=>e.jsxs(p,{style:{padding:24},children:[e.jsx(t,{}),e.jsx(B,{title:"Карточка",style:{marginTop:16},children:"Контент меняет оформление при смене темы в toolbar или переключателе."})]})},r={name:"Минимальный",parameters:{docs:{source:{code:"<ThemeToggle />"}}},render:()=>e.jsx(t,{label:""})};function P(){const[s,m]=x.useState("light");return e.jsx(C,{theme:s,onThemeChange:m,children:e.jsxs(p,{style:{padding:24},children:[e.jsx(t,{theme:s,onThemeChange:m}),e.jsxs("p",{style:{marginTop:12},children:["Тема: ",s]})]})})}const n={parameters:{docs:{source:{code:`const [theme, setTheme] = useState("light");

<ThemeProvider theme={theme} onThemeChange={setTheme}>
  <ThemeToggle theme={theme} onThemeChange={setTheme} />
</ThemeProvider>`}}},render:()=>e.jsx(P,{})},A=["WithPreview","Minimal","Controlled"];var a,u,h;o.parameters={...o.parameters,docs:{...(a=o.parameters)==null?void 0:a.docs,source:{originalSource:`{
  name: "С Box",
  parameters: {
    docs: {
      source: {
        code: \`<Main style={{ padding: 24 }}>
  <ThemeToggle />
  <Box title="Карточка" style={{ marginTop: 16 }}>…</Box>
</Main>\`
      }
    }
  },
  render: () => <Main style={{
    padding: 24
  }}>\r
      <ThemeToggle />\r
      <Box title="Карточка" style={{
      marginTop: 16
    }}>\r
        Контент меняет оформление при смене темы в toolbar или переключателе.\r
      </Box>\r
    </Main>
}`,...(h=(u=o.parameters)==null?void 0:u.docs)==null?void 0:h.source}}};var l,i,d;r.parameters={...r.parameters,docs:{...(l=r.parameters)==null?void 0:l.docs,source:{originalSource:`{
  name: "Минимальный",
  parameters: {
    docs: {
      source: {
        code: "<ThemeToggle />"
      }
    }
  },
  render: () => <ThemeToggle label="" />
}`,...(d=(i=r.parameters)==null?void 0:i.docs)==null?void 0:d.source}}};var T,c,g;n.parameters={...n.parameters,docs:{...(T=n.parameters)==null?void 0:T.docs,source:{originalSource:`{
  parameters: {
    docs: {
      source: {
        code: \`const [theme, setTheme] = useState("light");

<ThemeProvider theme={theme} onThemeChange={setTheme}>
  <ThemeToggle theme={theme} onThemeChange={setTheme} />
</ThemeProvider>\`
      }
    }
  },
  render: () => <ControlledDemo />
}`,...(g=(c=n.parameters)==null?void 0:c.docs)==null?void 0:g.source}}};export{n as Controlled,r as Minimal,o as WithPreview,A as __namedExportsOrder,f as default};
