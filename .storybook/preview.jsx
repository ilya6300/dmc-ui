import "../src/styles/dmc-ui.css";

/** @type { import('@storybook/react-vite').Preview } */
const preview = {
  parameters: {
    options: {
      storySort: {
        order: ["CC-V4", ["Введение", "Box", "*"]],
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      toc: true,
    },
    a11y: {
      test: "todo",
    },
  },
};

export default preview;
