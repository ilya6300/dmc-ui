import{j as a}from"./index-83DXtIcG.js";import{R as m,C as s,i as l}from"./docsFragments-C_nPw_XH.js";import"./iframe-DQQUhNoo.js";import"./preload-helper-Dp1pzeXC.js";import"./index-B6A0Fjfh.js";const N={title:"CC-V4/CcV4Root",component:s,tags:["autodocs"],parameters:{layout:"fullscreen",docs:{description:{component:`
Корневой **контейнер** v4: классы \`company-card-v4\`, опционально \`main-page\` и модификатор страницы.

${m}

### Импорт и использование

${l("CcV4Root")}

\`\`\`jsx
<CcV4Root withMainPage pageVariant="company-list-page-v4">
  <header className="card header-card">…</header>
  <section className="card dash-card">…</section>
</CcV4Root>
\`\`\`

Вложенный контент без \`CcV4Root\` на странице можно обернуть только секцией, если родитель уже внутри \`.company-card-v4\`.
        `}}},argTypes:{children:{description:"Содержимое страницы или секции внутри scope v4.",control:!1},withMainPage:{description:"Добавить класс `main-page` (типичная обёртка страницы ЛК).",control:"boolean"},pageVariant:{description:"Дополнительный BEM-модификатор страницы, например `company-list-page-v4`, `my-companies-page-v4`.",control:"text"},className:{description:"Произвольные дополнительные CSS-классы на корне.",control:"text"},as:{description:"HTML-тег или компонент корня (по умолчанию `div`).",control:"text"}}},e={name:"Страница с main-page",args:{withMainPage:!0,pageVariant:"company-list-page-v4"},render:r=>a.jsxs(s,{...r,style:{padding:16,minHeight:280},children:[a.jsx("header",{className:"card header-card",children:a.jsx("div",{className:"header-top",children:a.jsx("div",{className:"company-title",children:a.jsxs("div",{className:"compamy-title-name-container",children:[a.jsx("span",{className:"req-label",children:"Каталог"}),a.jsx("h1",{children:"Компании"})]})})})}),a.jsx("p",{className:"description-text",style:{marginTop:10},children:"Все дочерние блоки наследуют стили `.company-card-v4`."})]})},n={name:"Только секция (без main-page)",args:{withMainPage:!1,className:"company-card-v4-soft-section"},render:r=>a.jsxs("div",{className:"main-page",style:{padding:16,background:"#e2e8f0"},children:[a.jsx("p",{className:"req-label",children:"Родитель уже main-page — внутри CcV4Root без withMainPage"}),a.jsx(s,{...r,style:{marginTop:8},children:a.jsx("div",{className:"card dash-card",children:a.jsx("span",{className:"dash-card-title",children:"Блок внутри company-card-v4"})})})]})},x=["PageShell","SectionOnly"];var c,i,t;e.parameters={...e.parameters,docs:{...(c=e.parameters)==null?void 0:c.docs,source:{originalSource:`{
  name: "Страница с main-page",
  args: {
    withMainPage: true,
    pageVariant: "company-list-page-v4"
  },
  render: args => <CcV4Root {...args} style={{
    padding: 16,
    minHeight: 280
  }}>\r
      <header className="card header-card">\r
        <div className="header-top">\r
          <div className="company-title">\r
            <div className="compamy-title-name-container">\r
              <span className="req-label">Каталог</span>\r
              <h1>Компании</h1>\r
            </div>\r
          </div>\r
        </div>\r
      </header>\r
      <p className="description-text" style={{
      marginTop: 10
    }}>\r
        Все дочерние блоки наследуют стили \`.company-card-v4\`.\r
      </p>\r
    </CcV4Root>
}`,...(t=(i=e.parameters)==null?void 0:i.docs)==null?void 0:t.source}}};var o,u,d;n.parameters={...n.parameters,docs:{...(o=n.parameters)==null?void 0:o.docs,source:{originalSource:`{
  name: "Только секция (без main-page)",
  args: {
    withMainPage: false,
    className: "company-card-v4-soft-section"
  },
  render: args => <div className="main-page" style={{
    padding: 16,
    background: "#e2e8f0"
  }}>\r
      <p className="req-label">Родитель уже main-page — внутри CcV4Root без withMainPage</p>\r
      <CcV4Root {...args} style={{
      marginTop: 8
    }}>\r
        <div className="card dash-card">\r
          <span className="dash-card-title">Блок внутри company-card-v4</span>\r
        </div>\r
      </CcV4Root>\r
    </div>
}`,...(d=(u=n.parameters)==null?void 0:u.docs)==null?void 0:d.source}}};export{e as PageShell,n as SectionOnly,x as __namedExportsOrder,N as default};
