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
    }
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
          "logo-container__wrapper",
          mobileScrollDirection === "horizontal" &&
            "md:w-full -mx-2 md:mx-0 overflow-x-auto md:overflow-x-visible snap-x md:snap-none"
        )}
      >
        <div
          className={cx(
            "logo-container",
            "flex md:flex-row flex-wrap items-center gap-6",
            mobileScrollDirection === "vertical"
              ? "w-full flex-col"
              : "min-w-max md:min-w-0 md:w-full px-2 md:px-0",
            contentAlignment === "left"
              ? "justify-between"
              : "justify-center md:gap-x-10"
          )}
        >
          {logos?.map((logo) => {
            return (
              <img
                key={logo?.value?.logo?.id}
                alt={logo?.value?.logo?.alt}
                className="logo max-h-5 object-contain"
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
          { label: "Dark", value: "themeDark" }
        ],
        preview: "themeLight"
      },
      containerWidth: {
        type: "select",
        options: [
          { label: "Boxed", value: "contained" },
          { label: "Full width", value: "full" }
        ],
        preview: "contained"
      },
      headerAlignment: {
        type: "select",
        options: [
          { label: "Left", value: "left" },
          { label: "Center", value: "center" }
        ],
        preview: "center"
      },
      headerSize: {
        type: "select",
        options: [
          { label: "Small", value: "sm" },
          { label: "Medium", value: "md" },
          { label: "Large", value: "lg" }
        ],
        preview: "lg"
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
          { label: "Link inverted", value: "linkInverted" }
        ],
        preview: "primary"
      },
      buttonCorners: {
        type: "select",
        options: [
          { label: "None", value: "none" },
          { label: "Small", value: "xs" },
          { label: "Medium", value: "md" },
          { label: "Large", value: "lg" },
          { label: "Full", value: "full" }
        ],
        preview: "none"
      },
      buttonWeight: {
        type: "select",
        options: [
          { label: "Regular", value: "base" },
          { label: "Medium", value: "medium" },
          { label: "Bold", value: "bold" }
        ],
        preview: "medium"
      },
      buttonLocation: {
        type: "select",
        options: [
          { label: "Top", value: "top" },
          { label: "Bottom", value: "bottom" }
        ],
        preview: "top"
      },
      dividerColor: { type: "color", label: "Divider color" },
      hasDivider: { type: "toggle", label: "Has divider", preview: false },
      contentAlignment: {
        label: "Logos' alignment",
        type: "select",
        options: [
          { label: "Left", value: "left" },
          { label: "Center", value: "center" }
        ],
        preview: "center"
      },
      mobileScrollDirection: {
        type: "select",
        options: [
          { label: "Vertical", value: "vertical" },
          { label: "Horizontal", value: "horizontal" }
        ],
        preview: "vertical"
      }
    }
  },
  contentSchema: {
    fields: {
      pretitle: {
        type: "text",
        label: "Pretitle",
        preview: "",
        isTranslatable: true
      },
      title: {
        type: "text",
        label: "Title",
        preview: "",
        isTranslatable: true
      },
      subtitle: {
        type: "text",
        label: "Description",
        preview: "We sell more than 500 brands",
        isTranslatable: true
      },
      buttons: {
        type: "subschema",
        allowed: ["button"],
        max: 1,
        preview: []
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
                  "https://a.storyblok.com/f/145828/248x73/cb00a9dc8f/rugg-ed.png"
              }
            }
          },
          {
            subschema: "logo",
            value: {
              logo: {
                type: "image",
                preview:
                  "https://a.storyblok.com/f/145828/166x46/05bc6e4e11/hypemode.png"
              }
            }
          },
          {
            subschema: "logo",
            value: {
              logo: {
                type: "image",
                preview:
                  "https://a.storyblok.com/f/145828/211x37/386e98b4a8/chalk.png"
              }
            }
          },
          {
            subschema: "logo",
            value: {
              logo: {
                type: "image",
                preview:
                  "https://a.storyblok.com/f/145828/292x30/a9237d40ed/outhouse.png"
              }
            }
          }
        ]
      }
    },
    subschemas: {
      button: {
        fields: {
          text: {
            type: "text",
            label: "Text",
            isTranslatable: true,
            isRequired: true,
            maxLength: 40
          },
          link: {
            type: "link",
            label: "Link",
            isTranslatable: true,
            isRequired: true
          }
        }
      },
      logo: {
        fields: {
          logo: {
            type: "image",
            label: "Logo",
            isTranslatable: false,
            isRequired: true
          }
        }
      }
    }
  }
});
