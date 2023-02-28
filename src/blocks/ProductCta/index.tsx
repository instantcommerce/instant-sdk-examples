import { defineBlock, useBlockState } from "@instantcommerce/sdk";
import cx from "classnames";
import { Button, Paragraph, Title } from "../../components";

import { setBlockTheme, setThemeColors } from "../../config";
import "../../styles/global.css";

const ProductCta = () => {
  const {
    content: { image },
    customizer: { backgroundColor, theme, width, buttonType, imageAlignment },
  } = useBlockState();

  return (
    <section className={cx("product-cta", width === "contained" && "px-2")}>
      <div
        className={cx(
          "section w-full bg-theme-bg flex flex-col",
          "h-[640px]",
          imageAlignment === "right" ? "md:flex-row-reverse" : "md:flex-row"
        )}
        style={{
          ...setThemeColors(),
          ...setBlockTheme(theme),
          ...(!!backgroundColor ? { backgroundColor } : {}),
        }}
      >
        {!!image?.filename && (
          <div
            className="flex-1 bg-cover bg-center"
            style={{ backgroundImage: `url(${image?.filename})` }}
          />
        )}

        <div className="flex-1 h-full">
          <div className="max-w-[352px] mx-auto h-full flex flex-col justify-center">
            <Title as="h2" className="text-theme-title">
              Minimal black sweater
            </Title>

            <Paragraph className="mt-1.5 text-theme-subtitle">
              Our take on one of the classic essentials. Stylish, minimal,
              got-to-have.
            </Paragraph>

            <div className="mt-1.5 text-theme-text">{"€20,00"}</div>

            <Button variant={buttonType} className="mt-4">
              Add to cart
            </Button>
          </div>
        </div>
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
      buttonType: {
        type: "select",
        options: [
          { label: "Primary", value: "primary" },
          { label: "Secondary", value: "secondary" },
          { label: "Gray", value: "gray" },
          { label: "Link", value: "link" },
          { label: "Link primary", value: "linkPrimary" },
          { label: "Link inverted", value: "linkInverted" },
        ],
        preview: "primary",
      },
      imageAlignment: {
        type: "select",
        options: [
          { label: "Left", value: "left" },
          { label: "Right", value: "right" },
          { label: "Background", value: "bg" },
        ],
        preview: "left",
      },
      backgroundColor: { type: "color", label: "Background color" },
    },
  },
  contentSchema: {
    fields: {
      title: { type: "text", label: "Title", preview: "Hero title" },
      image: {
        type: "image",
        label: "Image",
        preview:
          "https://a.storyblok.com/f/145828/4424x3355/b22d1984af/force-majeure-ggpq78xm8t0-unsplash.jpg",
      },
    },
  },
});
