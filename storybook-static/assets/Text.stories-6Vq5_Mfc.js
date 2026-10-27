import{j as e,u as h}from"./iframe-BtHEu9Ll.js";import{S as j,R as v,e as n,i as g,M as S}from"./docsFragments-B-ySBce8.js";import"./preload-helper-Dp1pzeXC.js";import"./index-BN7hXfbX.js";import"./index-BibZq7iP.js";const B={title:"Design System/Text",component:n,tags:["autodocs"],render:r=>e.jsx(n,{...r}),args:{size:"m"},decorators:[r=>e.jsx(S,{style:{padding:24},children:e.jsx(r,{})})],parameters:{docs:{description:{component:`
Типографика: подзаголовок, заголовок, абзац, пункт списка, inline-текст. Цвет по умолчанию — основной текст темы.

${v}

${g("Text","Main")}

**Состав:** обязательно \`children\`; опционально \`variant\` (\`subt\` | \`title\` | \`p\` | \`li\` | \`span\`, по умолчанию \`span\`), \`size\` (\`xs\` … \`xl\`), \`color\`, \`style\`.

\`\`\`jsx
<Text variant="title">Заголовок</Text>
<Text variant="p">Абзац текста.</Text>
\`\`\`
        `}}},argTypes:{children:{control:"text",description:"Содержимое."},variant:{options:["subt","title","p","li","span"],control:"select",description:"Стиль и семантический тег; по умолчанию span."},color:{control:"color",description:"CSS-цвет; перекрывает цвет темы."},size:{options:j,control:"select"},style:{control:!1,description:"Дополнительные inline-стили."}}};function y(){const{colors:r}=h();return e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:12},children:[e.jsx(n,{variant:"title",children:"Заголовок (title)"}),e.jsx(n,{variant:"subt",children:"Подзаголовок (subt)"}),e.jsx(n,{variant:"p",children:"Абзац (p) — основной текст блока."}),e.jsxs("ul",{style:{margin:0,paddingLeft:20,color:r.textPrimary},children:[e.jsx(n,{variant:"li",children:"Пункт списка (li)"}),e.jsx(n,{variant:"li",children:"Второй пункт"})]}),e.jsx(n,{variant:"span",children:"Inline (span) внутри "}),e.jsx(n,{variant:"span",color:r.mastBlue,children:"акцентного фрагмента"})]})}const s={name:"Варианты",render:()=>e.jsx(y,{})},a={name:"Минимальный",args:{children:"Текст по умолчанию (span)"}},t={name:"Размеры",parameters:{controls:{disable:!0}},render:()=>e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:8},children:j.map(r=>e.jsxs(n,{size:r,variant:"p",children:["size=",r," — абзац"]},r))})},b=["Variants","Minimal","SizeScale"];var i,o,l;s.parameters={...s.parameters,docs:{...(i=s.parameters)==null?void 0:i.docs,source:{originalSource:`{
  name: "Варианты",
  render: () => <AllVariantsDemo />
}`,...(l=(o=s.parameters)==null?void 0:o.docs)==null?void 0:l.source}}};var c,u,p;a.parameters={...a.parameters,docs:{...(c=a.parameters)==null?void 0:c.docs,source:{originalSource:`{
  name: "Минимальный",
  args: {
    children: "Текст по умолчанию (span)"
  }
}`,...(p=(u=a.parameters)==null?void 0:u.docs)==null?void 0:p.source}}};var d,m,x;t.parameters={...t.parameters,docs:{...(d=t.parameters)==null?void 0:d.docs,source:{originalSource:`{
  name: "Размеры",
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <div style={{
    display: "flex",
    flexDirection: "column",
    gap: 8
  }}>\r
      {SIZE_KEYS.map(size => <Text key={size} size={size} variant="p">\r
          size={size} — абзац\r
        </Text>)}\r
    </div>
}`,...(x=(m=t.parameters)==null?void 0:m.docs)==null?void 0:x.source}}};export{a as Minimal,t as SizeScale,s as Variants,b as __namedExportsOrder,B as default};
