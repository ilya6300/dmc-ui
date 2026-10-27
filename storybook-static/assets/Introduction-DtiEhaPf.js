import{j as e}from"./iframe-BtHEu9Ll.js";import{u as c,M as d}from"./blocks-DNnXAOs1.js";import"./preload-helper-Dp1pzeXC.js";import"./index-BN7hXfbX.js";import"./index-BibZq7iP.js";function r(n){const s={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",strong:"strong",...c(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(d,{title:"Design System/Введение"}),`
`,e.jsx(s.h1,{id:"дизайн-система-dmc",children:"Дизайн-система DMC"}),`
`,e.jsxs(s.p,{children:["Библиотека ",e.jsx(s.code,{children:"@dmc/ui"}),": импорт компонентов и ",e.jsx(s.strong,{children:"обязательное"})," подключение стилей ",e.jsx(s.code,{children:"@dmc/ui/styles.css"})," в entry приложения."]}),`
`,e.jsx(s.h2,{id:"быстрый-старт",children:"Быстрый старт"}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-bash",children:`npm install github:ilya6300/dmc-ui
`})}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-jsx",children:`import "@dmc/ui/styles.css";\r
import { Main, Box, ThemeProvider, ThemeSelect } from "@dmc/ui";\r
\r
export function Page() {\r
  return (\r
    <ThemeProvider>\r
      <Main style={{ minHeight: "100vh", padding: 24 }}>\r
        <ThemeSelect />\r
        <Box title="Раздел">…</Box>\r
      </Main>\r
    </ThemeProvider>\r
  );\r
}
`})}),`
`,e.jsx(s.h2,{id:"тема",children:"Тема"}),`
`,e.jsxs(s.p,{children:["Обёрните приложение в ",e.jsx(s.code,{children:"ThemeProvider"}),". Компоненты (",e.jsx(s.code,{children:"Box"}),", ",e.jsx(s.code,{children:"Toggle"}),", ",e.jsx(s.code,{children:"SideDrawer"}),", …) читают палитру через ",e.jsx(s.code,{children:"useTheme()"})," — проп ",e.jsx(s.code,{children:"theme"})," по иерархии не нужен."]}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-jsx",children:`import { useTheme, themes } from "@dmc/ui";\r
\r
const { theme, setTheme, colors } = useTheme();\r
// colors — актуальная палитра; themes.light / themes.dark / themes.gray — справочник
`})}),`
`,e.jsxs(s.p,{children:["Статический импорт ",e.jsx(s.code,{children:"tokens"})," — только снимок ",e.jsx(s.strong,{children:"светлой"})," палитры; для тёмной темы используйте ",e.jsx(s.code,{children:"useTheme().colors"})," или ",e.jsx(s.code,{children:"themes[theme]"}),"."]}),`
`,e.jsxs(s.p,{children:["Выбор пользователя (localStorage и т.д.) хранит ",e.jsx(s.strong,{children:"приложение-потребитель"}),":"]}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-jsx",children:`const [theme, setTheme] = useState("light");\r
<ThemeProvider theme={theme} onThemeChange={setTheme}>\r
  <ThemeSelect />\r
</ThemeProvider>
`})}),`
`,e.jsxs(s.p,{children:["Цвета для CSS-компонентов (",e.jsx(s.code,{children:"dmc-*"}),"): литералы в ",e.jsx(s.code,{children:"style.css"})," пакета (",e.jsx(s.code,{children:'import "@dmc/ui/style.css"'})," или через ",e.jsx(s.code,{children:"styles.css"}),"). Переопределение — свой CSS после ",e.jsx(s.code,{children:"styles.css"})," с ",e.jsx(s.code,{children:"--dmc-color-*"})," на ",e.jsx(s.code,{children:'[data-dmc-theme="…"]'}),"."]}),`
`,e.jsx(s.h2,{id:"компоненты",children:"Компоненты"}),`
`,e.jsxs(s.p,{children:[`| Компонент | Назначение |\r
|-----------|------------|\r
| `,e.jsx(s.a,{href:"?path=/docs/design-system-main--docs",children:"Main"}),` | Обёртка страницы |\r
| `,e.jsx(s.a,{href:"?path=/docs/design-system-layout--docs",children:"Layout"}),` | Колонка контента с входной анимацией |\r
| `,e.jsx(s.a,{href:"?path=/docs/design-system-box--docs",children:"Box"}),` | Карточка контента |\r
| `,e.jsx(s.a,{href:"?path=/docs/design-system-container--docs",children:"Container"}),` | Flex-группировка (колонка / строка) |\r
| `,e.jsx(s.a,{href:"?path=/docs/design-system-toggle--docs",children:"Toggle"}),` | Переключатель |\r
| `,e.jsx(s.a,{href:"?path=/docs/design-system-theme-select--docs",children:"ThemeSelect"}),` | Выбор темы: светлая / тёмная / серая |\r
| `,e.jsx(s.a,{href:"?path=/docs/design-system-icon--docs",children:"Icon"}),` | Иконка (img или SVG-компонент, light/dark) |\r
| `,e.jsx(s.a,{href:"?path=/docs/design-system-side-drawer--docs",children:"SideDrawer"}),` | Боковая панель |\r
| `,e.jsx(s.a,{href:"?path=/docs/design-system-input--docs",children:"Input"}),` | Поле ввода (text / number / key) |\r
| `,e.jsx(s.a,{href:"?path=/docs/design-system-text--docs",children:"Text"}),` | Типографика (subt, title, p, li, span) |\r
| `,e.jsx(s.a,{href:"?path=/docs/design-system-radio-btn--docs",children:"RadioBtn"})," | Группа chip-кнопок (выбор варианта) |"]}),`
`,e.jsxs(s.p,{children:["Палитры: ",e.jsx(s.code,{children:"themes"}),", ",e.jsx(s.code,{children:"getThemeColors"}),"; legacy-снимок: ",e.jsx(s.code,{children:"tokens"})," (только light)."]})]})}function m(n={}){const{wrapper:s}={...c(),...n.components};return s?e.jsx(s,{...n,children:e.jsx(r,{...n})}):r(n)}export{m as default};
