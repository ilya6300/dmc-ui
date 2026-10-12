import{j as c}from"./index-83DXtIcG.js";import{u as r,M as d}from"./blocks-C8JyuRmj.js";import"./iframe-DQQUhNoo.js";import"./preload-helper-Dp1pzeXC.js";import"./index-B6A0Fjfh.js";function s(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...r(),...e.components};return c.jsxs(c.Fragment,{children:[c.jsx(d,{title:"CC-V4/Введение"}),`
`,c.jsx(n.h1,{id:"cc-v4--дизайн-система-dmc",children:"CC-V4 — дизайн-система DMC"}),`
`,c.jsxs(n.p,{children:["Библиотека ",c.jsx(n.code,{children:"@dmc/ui"})," повторяет канон карточки компании v4: обёртка ",c.jsx(n.code,{children:"company-card-v4"}),", кнопки, soft-таблицы, переключатели, поля ввода и боковые панели."]}),`
`,c.jsx(n.h2,{id:"быстрый-старт",children:"Быстрый старт"}),`
`,c.jsxs(n.ol,{children:[`
`,c.jsx(n.li,{children:"Установите пакет (из монорепозитория):"}),`
`]}),`
`,c.jsx(n.pre,{children:c.jsx(n.code,{className:"language-bash",children:`npm install file:../dmc-ui
`})}),`
`,c.jsxs(n.ol,{start:"2",children:[`
`,c.jsxs(n.li,{children:["Подключите стили ",c.jsx(n.strong,{children:"один раз"})," в корне приложения (например ",c.jsx(n.code,{children:"App.css"})," или ",c.jsx(n.code,{children:"index.js"}),"):"]}),`
`]}),`
`,c.jsx(n.pre,{children:c.jsx(n.code,{className:"language-js",children:`import "@dmc/ui/styles.css";
`})}),`
`,c.jsxs(n.ol,{start:"3",children:[`
`,c.jsxs(n.li,{children:["Оберните страницу в контейнер ",c.jsx(n.strong,{children:c.jsx(n.a,{href:"./?path=/docs/cc-v4-cc-v4-root--docs",children:"CcV4Root"})})," — без него часть токенов и сеток не применится:"]}),`
`]}),`
`,c.jsx(n.pre,{children:c.jsx(n.code,{className:"language-jsx",children:`import { CcV4Root } from "@dmc/ui";\r
\r
export function CompanyListPage() {\r
  return (\r
    <CcV4Root withMainPage pageVariant="company-list-page-v4">\r
      {/* header-card, dash-card, списки CcV4SoftList* … */}\r
    </CcV4Root>\r
  );\r
}
`})}),`
`,c.jsx(n.h2,{id:"компоненты",children:"Компоненты"}),`
`,c.jsxs(n.p,{children:[`| Компонент | Назначение |\r
|-----------|------------|\r
| `,c.jsx(n.a,{href:"?path=/docs/cc-v4-cc-v4-root--docs",children:"CcV4Root"})," | Контейнер ",c.jsx(n.code,{children:".company-card-v4"})," (+ опционально ",c.jsx(n.code,{children:"main-page"}),`, модификатор страницы) |\r
| `,c.jsx(n.a,{href:"?path=/docs/cc-v4-button--docs",children:"CcV4Button"}),` | Кнопки primary / outline / icon |\r
| `,c.jsx(n.a,{href:"?path=/docs/cc-v4-toggle--docs",children:"CcV4Toggle"}),` | Переключатель с label и опциональным описанием |\r
| `,c.jsx(n.a,{href:"?path=/docs/cc-v4-soft-list--docs",children:"CcV4SoftList"}),` | Таблица-список: header / body / row |\r
| `,c.jsx(n.a,{href:"?path=/docs/cc-v4-input--docs",children:"CcV4Input"})," | Поле ввода v4 (",c.jsx(n.code,{children:"site-form-control"}),`) |\r
| `,c.jsx(n.a,{href:"?path=/docs/cc-v4-side-drawer--docs",children:"CcV4SideDrawer"})," | Боковая модальная панель |"]}),`
`,c.jsxs(n.h2,{id:"модификаторы-страниц-pagevariant",children:["Модификаторы страниц (",c.jsx(n.code,{children:"pageVariant"}),")"]}),`
`,c.jsxs(n.p,{children:["Примеры значений ",c.jsx(n.code,{children:"pageVariant"})," на ",c.jsx(n.code,{children:"CcV4Root"})," (как в dmc-lk):"]}),`
`,c.jsxs(n.ul,{children:[`
`,c.jsxs(n.li,{children:[c.jsx(n.code,{children:"company-list-page-v4"})," — каталог компаний / партнёров"]}),`
`,c.jsxs(n.li,{children:[c.jsx(n.code,{children:"my-companies-page-v4"})," — «Мои компании»"]}),`
`,c.jsxs(n.li,{children:[c.jsx(n.code,{children:"alert-center-v4"})," — центр уведомлений"]}),`
`,c.jsxs(n.li,{children:[c.jsx(n.code,{children:"reports-page-v4"})," — отчёты"]}),`
`]}),`
`,c.jsxs(n.p,{children:["Дополнительные классы можно передать через ",c.jsx(n.code,{children:"className"}),"."]})]})}function h(e={}){const{wrapper:n}={...r(),...e.components};return n?c.jsx(n,{...e,children:c.jsx(s,{...e})}):s(e)}export{h as default};
