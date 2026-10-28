import{j as e,u as p}from"./iframe-BV7CKJmH.js";import{b as r,M as d}from"./theme-toggle-CEYbH-lm.js";import{R as m,i as x}from"./docsFragments-xk9iu6ls.js";import"./preload-helper-Dp1pzeXC.js";import"./index-CMAChaAt.js";import"./index-BBZHYRE1.js";const D={title:"Design System/Text",component:r,tags:["autodocs"],decorators:[t=>e.jsx(d,{style:{padding:24},children:e.jsx(t,{})})],parameters:{docs:{description:{component:`
Типографика: подзаголовок, заголовок, абзац, пункт списка, inline-текст. Цвет по умолчанию — основной текст темы.

${m}

${x("Text","Main")}

**Состав:** обязательно \`children\`; опционально \`variant\` (\`subt\` | \`title\` | \`p\` | \`li\` | \`span\`, по умолчанию \`span\`), \`color\`, \`style\`.

\`\`\`jsx
<Text variant="title">Заголовок</Text>
<Text variant="p">Абзац текста.</Text>
\`\`\`
        `}}},argTypes:{children:{control:"text",description:"Содержимое."},variant:{options:["subt","title","p","li","span"],control:"select",description:"Стиль и семантический тег; по умолчанию span."},color:{control:"color",description:"CSS-цвет; перекрывает цвет темы."},style:{control:!1,description:"Дополнительные inline-стили."}}};function h(){const{colors:t}=p();return e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:12},children:[e.jsx(r,{variant:"title",children:"Заголовок (title)"}),e.jsx(r,{variant:"subt",children:"Подзаголовок (subt)"}),e.jsx(r,{variant:"p",children:"Абзац (p) — основной текст блока."}),e.jsxs("ul",{style:{margin:0,paddingLeft:20,color:t.textPrimary},children:[e.jsx(r,{variant:"li",children:"Пункт списка (li)"}),e.jsx(r,{variant:"li",children:"Второй пункт"})]}),e.jsx(r,{variant:"span",children:"Inline (span) внутри "}),e.jsx(r,{variant:"span",color:t.mastBlue,children:"акцентного фрагмента"})]})}const n={name:"Варианты",render:()=>e.jsx(h,{})},s={name:"Минимальный",args:{children:"Текст по умолчанию (span)"}},B=["Variants","Minimal"];var a,i,o;n.parameters={...n.parameters,docs:{...(a=n.parameters)==null?void 0:a.docs,source:{originalSource:`{
  name: "Варианты",
  render: () => <AllVariantsDemo />
}`,...(o=(i=n.parameters)==null?void 0:i.docs)==null?void 0:o.source}}};var l,c,u;s.parameters={...s.parameters,docs:{...(l=s.parameters)==null?void 0:l.docs,source:{originalSource:`{
  name: "Минимальный",
  args: {
    children: "Текст по умолчанию (span)"
  }
}`,...(u=(c=s.parameters)==null?void 0:c.docs)==null?void 0:u.source}}};export{s as Minimal,n as Variants,B as __namedExportsOrder,D as default};
