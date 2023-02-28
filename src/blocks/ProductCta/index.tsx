import { defineBlock, useBlockState } from "@instantcommerce/sdk";
import cx from "classnames";

import { setBlockTheme, setThemeColors } from "../../config";
import "../../styles/global.css";

const ProductCta = () => {
  const {
    content,
    customizer: { backgroundColor, theme, width },
  } = useBlockState();

  return (
    <section className="product-cta px-2">
      <div
        className="section w-full bg-theme-bg"
        style={{
          ...setThemeColors(),
          ...setBlockTheme(theme),
          ...(!!backgroundColor ? { backgroundColor } : {}),
        }}
      >
        <div className="w-full h-full">image</div>
        <div className="w-full h-full">content</div>
      </div>
    </section>
  );
};

export default defineBlock({
  component: ProductCta,
  customizerSchema: {
    fields: {
      theme: {
        type: "select",
        options: [
          { label: "Light", value: "themeLight" },
          { label: "Gray", value: "themeGray" },
          { label: "Primary light", value: "themePrimaryLight" },
          { label: "Primary", value: "themePrimary" },
          { label: "Dark", value: "themeDark" },
        ],
        preview: "themeLight",
      },
      width: {
        type: "select",
        options: [
          { label: "Boxed", value: "contained" },
          { label: "Full width", value: "full" },
        ],
        preview: "contained",
      },
      backgroundColor: { type: "color", label: "Background color" },
    },
  },
  contentSchema: {
    fields: {
      title: { type: "text", label: "Title", preview: "Hero title" },
    },
  },
});
