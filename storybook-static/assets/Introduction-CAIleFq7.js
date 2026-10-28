import{j as e}from"./iframe-BV7CKJmH.js";import{u as d,M as h}from"./blocks-Dvx1Tz8T.js";import"./preload-helper-Dp1pzeXC.js";import"./index-CMAChaAt.js";import"./index-BBZHYRE1.js";function r(s){const n={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",strong:"strong",...d(),...s.components};return e.jsxs(e.Fragment,{children:[e.jsx(h,{title:"Design System/Введение"}),`
`,e.jsx(n.h1,{id:"дизайн-система-dmc",children:"Дизайн-система DMC"}),`
`,e.jsxs(n.p,{children:["Библиотека ",e.jsx(n.code,{children:"@dmc/ui"}),": ",e.jsx(n.strong,{children:"только импорт компонентов"}),", без отдельного CSS. Оформление — inline-стили внутри пакета."]}),`
`,e.jsx(n.h2,{id:"быстрый-старт",children:"Быстрый старт"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-bash",children:`npm install github:ilya6300/dmc-ui
`})}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-jsx",children:`import { Main, Box, ThemeProvider, ThemeToggle } from "@dmc/ui";\r
\r
export function Page() {\r
  return (\r
    <ThemeProvider>\r
      <Main style={{ minHeight: "100vh", padding: 24 }}>\r
        <ThemeToggle />\r
        <Box title="Раздел">…</Box>\r
      </Main>\r
    </ThemeProvider>\r
  );\r
}
`})}),`
`,e.jsx(n.h2,{id:"тема",children:"Тема"}),`
`,e.jsxs(n.p,{children:["Обёрните приложение в ",e.jsx(n.code,{children:"ThemeProvider"}),". Компоненты (",e.jsx(n.code,{children:"Box"}),", ",e.jsx(n.code,{children:"Toggle"}),", ",e.jsx(n.code,{children:"SideDrawer"}),", …) читают палитру через ",e.jsx(n.code,{children:"useTheme()"})," — проп ",e.jsx(n.code,{children:"theme"})," по иерархии не нужен."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-jsx",children:`import { useTheme, themes } from "@dmc/ui";\r
\r
const { theme, setTheme, colors } = useTheme();\r
// colors — актуальная палитра; themes.light / themes.dark — справочник
`})}),`
`,e.jsxs(n.p,{children:["Статический импорт ",e.jsx(n.code,{children:"tokens"})," — только снимок ",e.jsx(n.strong,{children:"светлой"})," палитры; для тёмной темы используйте ",e.jsx(n.code,{children:"useTheme().colors"})," или ",e.jsx(n.code,{children:"themes[theme]"}),"."]}),`
`,e.jsxs(n.p,{children:["Выбор пользователя (localStorage и т.д.) хранит ",e.jsx(n.strong,{children:"приложение-потребитель"}),":"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-jsx",children:`const [theme, setTheme] = useState("light");\r
<ThemeProvider theme={theme} onThemeChange={setTheme}>\r
  <ThemeToggle />\r
</ThemeProvider>
`})}),`
`,e.jsx(n.h2,{id:"компоненты",children:"Компоненты"}),`
`,e.jsxs(n.p,{children:[`| Компонент | Назначение |\r
|-----------|------------|\r
| `,e.jsx(n.a,{href:"?path=/docs/design-system-main--docs",children:"Main"}),` | Обёртка страницы |\r
| `,e.jsx(n.a,{href:"?path=/docs/design-system-layout--docs",children:"Layout"}),` | Колонка контента с входной анимацией |\r
| `,e.jsx(n.a,{href:"?path=/docs/design-system-box--docs",children:"Box"}),` | Карточка контента |\r
| `,e.jsx(n.a,{href:"?path=/docs/design-system-container--docs",children:"Container"}),` | Flex-группировка (колонка / строка) |\r
| `,e.jsx(n.a,{href:"?path=/docs/design-system-button--docs",children:"Button"}),` | Кнопка |\r
| `,e.jsx(n.a,{href:"?path=/docs/design-system-toggle--docs",children:"Toggle"}),` | Переключатель |\r
| `,e.jsx(n.a,{href:"?path=/docs/design-system-theme-toggle--docs",children:"ThemeToggle"}),` | Переключатель светлой / тёмной темы |\r
| `,e.jsx(n.a,{href:"?path=/docs/design-system-icon--docs",children:"Icon"}),` | Иконка (img или SVG-компонент, light/dark) |\r
| `,e.jsx(n.a,{href:"?path=/docs/design-system-side-drawer--docs",children:"SideDrawer"}),` | Боковая панель |\r
| `,e.jsx(n.a,{href:"?path=/docs/design-system-input--docs",children:"Input"}),` | Поле ввода (text / number / key) |\r
| `,e.jsx(n.a,{href:"?path=/docs/design-system-text--docs",children:"Text"}),` | Типографика (subt, title, p, li, span) |\r
| `,e.jsx(n.a,{href:"?path=/docs/design-system-radio-btn--docs",children:"RadioBtn"})," | Группа chip-кнопок (выбор варианта) |"]}),`
`,e.jsxs(n.p,{children:["Палитры: ",e.jsx(n.code,{children:"themes"}),", ",e.jsx(n.code,{children:"getThemeColors"}),"; legacy-снимок: ",e.jsx(n.code,{children:"tokens"})," (только light)."]})]})}function a(s={}){const{wrapper:n}={...d(),...s.components};return n?e.jsx(n,{...s,children:e.jsx(r,{...s})}):r(s)}export{a as default};
