import { defineBlock, useBlockState } from "@instantcommerce/sdk";
import cx from "classnames";

import { Container } from "../../components";
import { setThemeColors } from "../../config/setThemeColors";
import { setBlockTheme } from "../../config/themeMapping";

import "../../styles/global.css";

const SocialProof = () => {
  const {
    content: { logos, ...headerContent },
    customizer: {
      theme,
      contentAlignment,
      containerWidth,
      mobileScrollDirection,
      backgroundColor,
      ...headerCustomizations
    },
  } = useBlockState();

  return (
    <Container
      backgroundColor={backgroundColor}
      wrapperClassName="social-proof"
      className={containerWidth === "contained" ? "max-w-7xl" : "max-w-none"}
      headerProps={{ ...headerContent, ...headerCustomizations, theme }}
      wrapperStyle={{ ...setThemeColors(), ...setBlockTheme(theme) }}
    >
      <div
        className={cx(
          mobileScrollDirection === "horizontal" &&
            "w-[calc(100% + 32px)] md:w-full -mx-2 md:mx-0 overflow-x-auto snap-x"
        )}
      >
        <div
          className={cx(
            "logo-wrapper",
            "flex md:flex-row items-center md:gap-y-0",
            mobileScrollDirection === "vertical"
              ? "flex-col gap-y-6"
              : "gap-x-6 px-2 md:px-0",
            contentAlignment === "left"
              ? "sm:justify-between"
              : "sm:justify-center sm:gap-x-10"
          )}
        >
          {logos?.map((logo, i) => {
            return (
              <img
                key={i}
                className="logo-image max-h-5 object-contain"
                src={logo?.value?.logo?.filename?.preview}
              />
            );
          })}
        </div>
      </div>
    </Container>
  );
};

export default defineBlock({
  component: SocialProof,
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
      contentAlignment: {
        type: "select",
        options: [
          { label: "Left", value: "left" },
          { label: "Center", value: "center" },
        ],
        preview: "center",
      },
      containerWidth: {
        type: "select",
        options: [
          { label: "Boxed", value: "contained" },
          { label: "Full width", value: "full" },
        ],
        preview: "contained",
      },
      mobileScrollDirection: {
        type: "select",
        options: [
          { label: "Vertical", value: "vertical" },
          { label: "Horizontal", value: "horizontal" },
        ],
        preview: "vertical",
      },
      headerAlignment: {
        type: "select",
        options: [
          { label: "Left", value: "left" },
          { label: "Center", value: "center" },
        ],
        preview: "center",
      },
      headerSize: {
        type: "select",
        options: [
          { label: "Small", value: "sm" },
          { label: "Medium", value: "md" },
          { label: "Large", value: "lg" },
        ],
        preview: "md",
      },
      pretitleColor: { type: "color", label: "Pretitle color" },
      titleColor: { type: "color", label: "Title color" },
      subtitleColor: { type: "color", label: "Description color" },
      backgroundColor: { type: "color", label: "Background color" },
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
      buttonRadius: {
        type: "select",
        options: [
          { label: "None", value: "none" },
          { label: "Small", value: "xs" },
          { label: "Medium", value: "md" },
          { label: "Large", value: "lg" },
          { label: "Full", value: "full" },
        ],
        preview: "none",
      },
      buttonWeight: {
        type: "select",
        options: [
          { label: "Regular", value: "base" },
          { label: "Medium", value: "medium" },
          { label: "Bold", value: "bold" },
        ],
        preview: "medium",
      },
      buttonLocation: {
        type: "select",
        options: [
          { label: "Top", value: "top" },
          { label: "Bottom", value: "bottom" },
        ],
        preview: "top",
      },
      dividerColor: { type: "color", label: "Divider color" },
      hasDivider: { type: "toggle", label: "Has divider", preview: true },
    },
  },
  contentSchema: {
    fields: {
      pretitle: {
        type: "text",
        label: "Pretitle",
        preview: "Lorem ipsum",
        isTranslatable: true,
      },
      title: {
        type: "text",
        label: "Title",
        preview: "Lorem ipsum",
        isTranslatable: true,
      },
      subtitle: {
        type: "text",
        label: "Description",
        preview: "Lorem ipsum dolor sit amet",
        isTranslatable: true,
      },
      buttons: {
        type: "subschema",
        allowed: ["button"],
        max: 1,
        preview: [
          {
            subschema: "button",
            value: {
              text: "Button text",
              link: "https://a.storyblok.com/f/145828/5000x3333/564e281ca1/force-majeure-du8abwm5z2g-unsplash.jpg",
            },
          },
        ],
      },
      logos: {
        type: "subschema",
        allowed: ["logo"],
        max: 6,
        preview: [
          {
            subschema: "logo",
            value: {
              logo: {
                type: "image",
                preview:
                  "https://a.storyblok.com/f/145828/248x73/cb00a9dc8f/rugg-ed.png",
              },
            },
          },
          {
            subschema: "logo",
            value: {
              logo: {
                type: "image",
                preview:
                  "https://a.storyblok.com/f/145828/166x46/05bc6e4e11/hypemode.png",
              },
            },
          },
          {
            subschema: "logo",
            value: {
              logo: {
                type: "image",
                preview:
                  "https://a.storyblok.com/f/145828/211x37/386e98b4a8/chalk.png",
              },
            },
          },
          {
            subschema: "logo",
            value: {
              logo: {
                type: "image",
                preview:
                  "https://a.storyblok.com/f/145828/292x30/a9237d40ed/outhouse.png",
              },
            },
          },
        ],
      },
    },
    subschemas: {
      button: {
        fields: {
          text: {
            type: "text",
            label: "Text",
            isTranslatable: true,
            isRequired: true,
            maxLength: 40,
          },
          link: {
            type: "link",
            label: "Link",
            isTranslatable: true,
            isRequired: true,
          },
        },
      },
      logo: {
        fields: {
          logo: {
            type: "image",
            label: "Logo",
            isTranslatable: false,
            isRequired: true,
          },
        },
      },
    },
  },
});
