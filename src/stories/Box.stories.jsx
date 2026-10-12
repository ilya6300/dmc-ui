import { Box } from "../index.js";
import { importBlock, ROOT_NOTE } from "./cc-v4/docsFragments.js";

/** @type { import('@storybook/react-vite').Meta } */
const meta = {
  title: "CC-V4/Box",
  component: Box,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
Корневой **контейнер** v4: классы \`company-card-v4\`, опционально \`main-page\` и модификатор страницы.

${ROOT_NOTE}

### Импорт и использование

${importBlock("Box")}

\`\`\`jsx
<Box withMainPage pageVariant="company-list-page-v4">
  <header className="card header-card">…</header>
  <section className="card dash-card">…</section>
</Box>
\`\`\`

Вложенный контент без \`Box\` на странице можно обернуть только секцией, если родитель уже внутри \`.company-card-v4\`.
        `,
      },
    },
  },
  argTypes: {
    children: {
      description: "Содержимое страницы или секции внутри scope v4.",
      control: false,
    },
    withMainPage: {
      description: "Добавить класс `main-page` (типичная обёртка страницы ЛК).",
      control: "boolean",
    },
    pageVariant: {
      description:
        "Дополнительный BEM-модификатор страницы, например `company-list-page-v4`, `my-companies-page-v4`.",
      control: "text",
    },
    className: {
      description: "Произвольные дополнительные CSS-классы на корне.",
      control: "text",
    },
    as: {
      description: "HTML-тег или компонент корня (по умолчанию `div`).",
      control: "text",
    },
  },
};

export default meta;

export const PageShell = {
  name: "Страница с main-page",
  args: {
    withMainPage: true,
    pageVariant: "company-list-page-v4",
  },
  render: (args) => (
    <Box {...args} style={{ padding: 16, minHeight: 280 }}>
      <header className="card header-card">
        <div className="header-top">
          <div className="company-title">
            <div className="compamy-title-name-container">
              <span className="req-label">Каталог</span>
              <h1>Компании</h1>
            </div>
          </div>
        </div>
      </header>
      <p className="description-text" style={{ marginTop: 10 }}>
        Все дочерние блоки наследуют стили `.company-card-v4`.
      </p>
    </Box>
  ),
};

export const SectionOnly = {
  name: "Только секция (без main-page)",
  args: {
    withMainPage: false,
    className: "company-card-v4-soft-section",
  },
  render: (args) => (
    <div className="main-page" style={{ padding: 16, background: "#e2e8f0" }}>
      <p className="req-label">Родитель уже main-page — внутри Box без withMainPage</p>
      <Box {...args} style={{ marginTop: 8 }}>
        <div className="card dash-card">
          <span className="dash-card-title">Блок внутри company-card-v4</span>
        </div>
      </Box>
    </div>
  ),
};
