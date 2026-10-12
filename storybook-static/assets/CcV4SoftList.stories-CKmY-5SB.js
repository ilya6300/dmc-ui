import{j as s}from"./index-83DXtIcG.js";import{R as i,d as e,e as u,f as d,g as l,C,i as m}from"./docsFragments-C_nPw_XH.js";import"./iframe-DQQUhNoo.js";import"./preload-helper-Dp1pzeXC.js";import"./index-B6A0Fjfh.js";const t="cc-v4-soft-grid company-list-grid",y={title:"CC-V4/SoftList",component:e,tags:["autodocs"],parameters:{docs:{description:{component:`
Составной список v4: \`cc-v4-soft-list-root\`, заголовок колонок, тело и строки (\`cc-v4-soft-row\`).

${i}

### Импорт

${m("CcV4SoftList","CcV4SoftListHeader","CcV4SoftListBody","CcV4SoftListRow","CcV4Root")}

\`\`\`jsx
const GRID_CLASS = "cc-v4-soft-grid company-list-grid";

<CcV4SoftList>
  <CcV4SoftListHeader gridClass={GRID_CLASS} columns={[...]} />
  <CcV4SoftListBody className="company-list-body">
    <CcV4SoftListRow as={Link} gridClass={GRID_CLASS} to={url}>…</CcV4SoftListRow>
  </CcV4SoftListBody>
</CcV4SoftList>
\`\`\`

\`gridClass\` задаётся снаружи (разные сетки отчётов, софта, каталога).
        `}}},decorators:[n=>s.jsx(C,{withMainPage:!0,style:{padding:24},children:s.jsx("div",{className:"card dash-card",children:s.jsx(n,{})})})]},o={name:"Три колонки",render:()=>s.jsxs(e,{children:[s.jsx(u,{gridClass:t,columns:[{key:"a",label:"Название"},{key:"b",label:"ИНН"},{key:"c",label:"Адрес"}]}),s.jsx(d,{children:s.jsxs(l,{gridClass:t,children:[s.jsx("span",{children:"ООО Пример"}),s.jsx("span",{className:"company-card-v4-mono",children:"7700000000"}),s.jsx("span",{children:"Москва"})]})})]})},R=["ThreeColumns"];var a,c,r;o.parameters={...o.parameters,docs:{...(a=o.parameters)==null?void 0:a.docs,source:{originalSource:`{
  name: "Три колонки",
  render: () => <CcV4SoftList>\r
      <CcV4SoftListHeader gridClass={GRID} columns={[{
      key: "a",
      label: "Название"
    }, {
      key: "b",
      label: "ИНН"
    }, {
      key: "c",
      label: "Адрес"
    }]} />\r
      <CcV4SoftListBody>\r
        <CcV4SoftListRow gridClass={GRID}>\r
          <span>ООО Пример</span>\r
          <span className="company-card-v4-mono">7700000000</span>\r
          <span>Москва</span>\r
        </CcV4SoftListRow>\r
      </CcV4SoftListBody>\r
    </CcV4SoftList>
}`,...(r=(c=o.parameters)==null?void 0:c.docs)==null?void 0:r.source}}};export{o as ThreeColumns,R as __namedExportsOrder,y as default};
