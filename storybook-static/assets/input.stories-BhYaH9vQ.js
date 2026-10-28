import{j as o}from"./iframe-BV7CKJmH.js";import{a as V,M as B}from"./theme-toggle-CEYbH-lm.js";import{R as D,i as S}from"./docsFragments-xk9iu6ls.js";import"./preload-helper-Dp1pzeXC.js";import"./index-CMAChaAt.js";import"./index-BBZHYRE1.js";const W={title:"Design System/Input",component:V,tags:["autodocs"],decorators:[k=>o.jsx(B,{style:{padding:24},children:o.jsx(k,{})})],parameters:{docs:{description:{component:`
Поле ввода с опциональной подписью и вариантами \`type\`: \`text\`, \`number\`, \`key\` (поле + цифровая клавиатура).

${D}

${S("Input","Main")}

**Состав:** опционально \`label\`, \`placeholder\`, \`type\` (\`text\` | \`number\` | \`key\`), \`value\` / \`defaultValue\`, \`onChange\`, \`disabled\`, \`readOnly\`, \`error\`, \`msg\` (текст под полем только при \`error\` и непустом \`msg\`), \`name\`, \`id\`, \`style\`, \`inputStyle\`, \`aria-label\` (если нет \`label\`).

Для \`type\` \`number\` и \`key\` (нативный \`number\`): по умолчанию \`min={0}\`, верхней границы нет; можно передать свои \`min\` и \`max\`.

Семантический \`type\` не совпадает с нативным HTML: для \`key\` в DOM — \`type="number"\`, справа сетка цифр; при удержании кнопки — рамка и цифра \`mastBlue\` (фон без заливки), «0» на всю ширину сетки.

\`\`\`jsx
<Input label="Версия" type="key" placeholder="..." value={v} onChange={(e) => setV(e.target.value)} />
\`\`\`
        `}}},argTypes:{type:{options:["text","number","key"],control:"radio",description:"Семантический тип поля."},label:{description:"Подпись над полем."},placeholder:{description:"Подсказка; цвет из темы."},value:{control:"text"},disabled:{control:"boolean"},readOnly:{control:"boolean"},error:{control:"boolean",description:"Состояние ошибки: красная рамка поля (colors.error)."},msg:{control:"text",description:"Сообщение под полем; показывается только при error и непустом msg."},min:{description:"Нижняя граница для number/key (по умолчанию 0).",control:"number"},max:{description:"Верхняя граница для number/key; без пропа — без ограничения.",control:"number"},style:{control:!1},inputStyle:{control:!1}}},e={name:"Текст с подписью",args:{type:"text",label:"Название",placeholder:"...",defaultValue:""}},u={name:"Число",args:{type:"number",label:"Количество",placeholder:"0",defaultValue:""}},r={name:"Клавиатура (key)",args:{type:"key",label:"Версия",placeholder:"...",defaultValue:""}},a={name:"Минимальный",args:{placeholder:"..."}},t={name:"С ошибкой",args:{type:"text",label:"Email",placeholder:"user@example.com",defaultValue:"not-an-email",error:!0,msg:"Введите корректный адрес электронной почты"}},j=["TextWithLabel","NumberField","KeyWithKeypad","Minimal","WithValidationError"];var n,l,s;e.parameters={...e.parameters,docs:{...(n=e.parameters)==null?void 0:n.docs,source:{originalSource:`{
  name: "Текст с подписью",
  args: {
    type: "text",
    label: "Название",
    placeholder: "...",
    defaultValue: ""
  }
}`,...(s=(l=e.parameters)==null?void 0:l.docs)==null?void 0:s.source}}};var m,p,c;u.parameters={...u.parameters,docs:{...(m=u.parameters)==null?void 0:m.docs,source:{originalSource:`{
  name: "Число",
  args: {
    type: "number",
    label: "Количество",
    placeholder: "0",
    defaultValue: ""
  }
}`,...(c=(p=u.parameters)==null?void 0:p.docs)==null?void 0:c.source}}};var i,d,y;r.parameters={...r.parameters,docs:{...(i=r.parameters)==null?void 0:i.docs,source:{originalSource:`{
  name: "Клавиатура (key)",
  args: {
    type: "key",
    label: "Версия",
    placeholder: "...",
    defaultValue: ""
  }
}`,...(y=(d=r.parameters)==null?void 0:d.docs)==null?void 0:y.source}}};var b,g,h;a.parameters={...a.parameters,docs:{...(b=a.parameters)==null?void 0:b.docs,source:{originalSource:`{
  name: "Минимальный",
  args: {
    placeholder: "..."
  }
}`,...(h=(g=a.parameters)==null?void 0:g.docs)==null?void 0:h.source}}};var x,E,f;t.parameters={...t.parameters,docs:{...(x=t.parameters)==null?void 0:x.docs,source:{originalSource:`{
  name: "С ошибкой",
  args: {
    type: "text",
    label: "Email",
    placeholder: "user@example.com",
    defaultValue: "not-an-email",
    error: true,
    msg: "Введите корректный адрес электронной почты"
  }
}`,...(f=(E=t.parameters)==null?void 0:E.docs)==null?void 0:f.source}}};export{r as KeyWithKeypad,a as Minimal,u as NumberField,e as TextWithLabel,t as WithValidationError,j as __namedExportsOrder,W as default};
