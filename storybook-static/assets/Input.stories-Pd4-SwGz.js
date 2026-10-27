import{j as r}from"./iframe-BtHEu9Ll.js";import{S as j,R as v,a as s,i as A,M as C}from"./docsFragments-B-ySBce8.js";import"./preload-helper-Dp1pzeXC.js";import"./index-BN7hXfbX.js";import"./index-BibZq7iP.js";const T={title:"Design System/Input",component:s,tags:["autodocs"],render:e=>r.jsx(s,{...e}),args:{size:"m"},decorators:[e=>r.jsx(C,{style:{padding:24},children:r.jsx(e,{})})],parameters:{docs:{description:{component:`
Поле ввода с опциональной подписью и вариантами \`type\`: \`text\`, \`number\`, \`key\` (поле + цифровая клавиатура).

${v}

${A("Input","Main")}

**Состав:** опционально \`label\`, \`placeholder\`, \`type\` (\`text\` | \`number\` | \`key\`), \`size\` (\`xs\` | \`s\` | \`m\` | \`l\` | \`xl\`, по умолчанию \`m\`), \`value\` / \`defaultValue\`, \`onChange\`, \`disabled\`, \`readOnly\`, \`error\`, \`msg\` (текст под полем только при \`error\` и непустом \`msg\`), \`name\`, \`id\`, \`style\`, \`inputStyle\`, \`aria-label\` (если нет \`label\`).

Для \`type\` \`number\` и \`key\` (нативный \`number\`): по умолчанию \`min={0}\`, верхней границы нет; можно передать свои \`min\` и \`max\`.

Семантический \`type\` не совпадает с нативным HTML: для \`key\` в DOM — \`type="number"\`, справа сетка цифр; при удержании кнопки — рамка и цифра \`mastBlue\` (фон без заливки), «0» на всю ширину сетки.

\`\`\`jsx
<Input label="Версия" type="key" placeholder="..." value={v} onChange={(e) => setV(e.target.value)} />
\`\`\`
        `}}},argTypes:{type:{options:["text","number","key"],control:"radio",description:"Семантический тип поля."},label:{description:"Подпись над полем."},placeholder:{description:"Подсказка; цвет из темы."},value:{control:"text"},disabled:{control:"boolean"},readOnly:{control:"boolean"},error:{control:"boolean",description:"Состояние ошибки: красная рамка поля (colors.error)."},msg:{control:"text",description:"Сообщение под полем; показывается только при error и непустом msg."},min:{description:"Нижняя граница для number/key (по умолчанию 0).",control:"number"},max:{description:"Верхняя граница для number/key; без пропа — без ограничения.",control:"number"},size:{options:j,control:"select",description:"Шкала размеров поля и отступов; по умолчанию m."},style:{control:!1},inputStyle:{control:!1}}},a={name:"Текст с подписью",args:{type:"text",label:"Название",placeholder:"...",defaultValue:""}},u={name:"Число",args:{type:"number",label:"Количество",placeholder:"0",defaultValue:""}},n={name:"Клавиатура (key)",args:{type:"key",label:"Версия",placeholder:"...",defaultValue:""}},t={name:"Минимальный",args:{placeholder:"..."}},o={name:"Размеры",parameters:{controls:{disable:!0}},render:()=>r.jsx("div",{style:{display:"flex",flexDirection:"column",gap:16},children:j.map(e=>r.jsx(s,{size:e,label:`size=${e}`,placeholder:"..."},e))})},l={name:"С ошибкой",args:{type:"text",label:"Email",placeholder:"user@example.com",defaultValue:"not-an-email",error:!0,msg:"Введите корректный адрес электронной почты"}},W=["TextWithLabel","NumberField","KeyWithKeypad","Minimal","SizeScale","WithValidationError"];var c,i,m;a.parameters={...a.parameters,docs:{...(c=a.parameters)==null?void 0:c.docs,source:{originalSource:`{
  name: "Текст с подписью",
  args: {
    type: "text",
    label: "Название",
    placeholder: "...",
    defaultValue: ""
  }
}`,...(m=(i=a.parameters)==null?void 0:i.docs)==null?void 0:m.source}}};var p,d,y;u.parameters={...u.parameters,docs:{...(p=u.parameters)==null?void 0:p.docs,source:{originalSource:`{
  name: "Число",
  args: {
    type: "number",
    label: "Количество",
    placeholder: "0",
    defaultValue: ""
  }
}`,...(y=(d=u.parameters)==null?void 0:d.docs)==null?void 0:y.source}}};var b,g,x;n.parameters={...n.parameters,docs:{...(b=n.parameters)==null?void 0:b.docs,source:{originalSource:`{
  name: "Клавиатура (key)",
  args: {
    type: "key",
    label: "Версия",
    placeholder: "...",
    defaultValue: ""
  }
}`,...(x=(g=n.parameters)==null?void 0:g.docs)==null?void 0:x.source}}};var h,E,f;t.parameters={...t.parameters,docs:{...(h=t.parameters)==null?void 0:h.docs,source:{originalSource:`{
  name: "Минимальный",
  args: {
    placeholder: "..."
  }
}`,...(f=(E=t.parameters)==null?void 0:E.docs)==null?void 0:f.source}}};var S,k,D;o.parameters={...o.parameters,docs:{...(S=o.parameters)==null?void 0:S.docs,source:{originalSource:`{
  name: "Размеры",
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <div style={{
    display: "flex",
    flexDirection: "column",
    gap: 16
  }}>\r
      {SIZE_KEYS.map(size => <Input key={size} size={size} label={\`size=\${size}\`} placeholder="..." />)}\r
    </div>
}`,...(D=(k=o.parameters)==null?void 0:k.docs)==null?void 0:D.source}}};var V,B,z;l.parameters={...l.parameters,docs:{...(V=l.parameters)==null?void 0:V.docs,source:{originalSource:`{
  name: "С ошибкой",
  args: {
    type: "text",
    label: "Email",
    placeholder: "user@example.com",
    defaultValue: "not-an-email",
    error: true,
    msg: "Введите корректный адрес электронной почты"
  }
}`,...(z=(B=l.parameters)==null?void 0:B.docs)==null?void 0:z.source}}};export{n as KeyWithKeypad,t as Minimal,u as NumberField,o as SizeScale,a as TextWithLabel,l as WithValidationError,W as __namedExportsOrder,T as default};
