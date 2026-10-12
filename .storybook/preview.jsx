/** @type { import('@storybook/react-vite').Preview } */
const preview = {
  parameters: {
    options: {
      storySort: {
        order: ["Design System", ["Введение", "Box", "*"]],
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
