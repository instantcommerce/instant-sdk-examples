import { defineBlock, Link, useBlockState } from "@instantcommerce/sdk";
import cx from "classnames";

import { Container, Overlay, Paragraph, Title } from "~/components";
import { ArrowRightIcon } from "~/components/Icons";
import { setBlockTheme, setThemeColors } from "~/config";
import "~/styles/global.scss";

import "./collage.scss";

const Collage = () => {
  const {
    content: { cards, cta, ...headerContent },
    customizer: {
      backgroundColor,
      theme,
      width,
      contentAlignment,
      contentSize,
      mobileLayout,
      imageHeight,
      overlayColor,
      overlayOpacity,
      textColor,
      linkColor,
      linkType,
      ...headerCustomizations
    }
  } = useBlockState();

  return (
    <Container
      backgroundColor={backgroundColor}
      className={width === "contained" ? "max-w-7xl" : "max-w-none"}
      headerProps={{ ...headerContent, ...headerCustomizations, theme }}
      wrapperClassName="collage__container"
      wrapperStyle={{ ...setThemeColors(), ...setBlockTheme(theme) }}
    >
      <div
        className={cx(
          `collage collage--${cards?.length} collage--${mobileLayout} collage--${imageHeight} gap-1 md:gap-2`
        )}
      >
        {cards?.map((card) => (
          // @ts-ignore
          <Link
            to={card?.value?.link?.url}
            className={cx(
              "collage__card group relative w-full flex flex-col p-2 md:p-5 gap-y-1 overflow-hidden",
              contentAlignment === "center"
                ? "justify-center items-center text-center"
                : "justify-end"
            )}
          >
            {card?.value?.image?.filename && (
              <img
                className={cx(
                  "absolute top-0 left-0 right-0 bottom-0 w-0 h-0 min-w-full max-w-full min-h-full max-h-0 object-cover transition-transform group-hover:scale-105 duration-500"
                )}
                alt={card?.value?.image?.alt}
                src={card?.value?.image?.filename}
              />
            )}

            {overlayColor && (
              <Overlay color={overlayColor} opacity={overlayOpacity} />
            )}

            {!!card?.value?.title && (
              <Title
                className={cx("collage__title text-white font-semibold z-10")}
                size={
                  contentSize === "sm"
                    ? "xs"
                    : contentSize === "md"
                    ? "sm"
                    : "md"
                }
                style={{ ...(!!textColor ? { color: textColor } : {}) }}
              >
                {card.value.title}
              </Title>
            )}

            {cta && (
              <Paragraph
                className={cx(
                  "collage__button flex items-center text-white font-medium text-left z-10"
                )}
                size={contentSize}
                style={{ ...(!!linkColor ? { color: linkColor } : {}) }}
              >
                {linkType === "left" && (
                  <ArrowRightIcon className="collage__arrow w-1.5 mr-1.25" />
                )}
                {cta}
                {linkType === "right" && (
                  <ArrowRightIcon className="collage__arrow w-1.5 ml-1.25 transition-transform group-hover:translate-x-0.25" />
                )}
              </Paragraph>
            )}
          </Link>
        ))}
      </div>
    </Container>
  );
};

export default defineBlock({
  component: Collage,
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
      width: {
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
        preview: "left"
      },
      headerSize: {
        type: "select",
        options: [
          { label: "Small", value: "md" },
          { label: "Medium", value: "lg" },
          { label: "Large", value: "xl" }
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
        preview: "link"
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
      mobileLayout: {
        type: "select",
        label: "Mobile layout",
        options: [
          { label: "Collage", value: "collage" },
          { label: "Column", value: "column" }
        ],
        preview: "column"
      },
      imageHeight: {
        type: "select",
        options: [
          { label: "Small", value: "sm" },
          { label: "Medium", value: "md" },
          { label: "Large", value: "lg" }
        ],
        preview: "md"
      },
      overlayColor: {
        type: "color",
        label: "Image overlay color",
        preview: "#000"
      },
      overlayOpacity: {
        type: "number",
        label: "Image overlay opacity",
        min: 0,
        max: 100,
        preview: 40
      },
      contentAlignment: {
        type: "select",
        label: "Card content alignment",
        options: [
          { label: "Left", value: "left" },
          { label: "Center", value: "center" }
        ],
        preview: "left"
      },
      contentSize: {
        type: "select",
        label: "Card text size",
        options: [
          { label: "Small", value: "sm" },
          { label: "Medium", value: "md" },
          { label: "Large", value: "lg" }
        ],
        preview: "md"
      },
      textColor: { type: "color", label: "Text color" },
      linkColor: { type: "color", label: "Link color" },
      linkType: {
        type: "select",
        label: "Card link arrow",
        options: [
          { label: "None", value: "none" },
          { label: "Left", value: "left" },
          { label: "Right", value: "right" }
        ],
        preview: "left"
      }
    }
  },
  contentSchema: {
    fields: {
      pretitle: {
        type: "text",
        label: "Pretitle",
        isTranslatable: true
      },
      title: {
        type: "text",
        label: "Title",
        preview: "High tech performancewear",
        isTranslatable: true
      },
      subtitle: {
        type: "text",
        label: "Description",
        preview: "Clothing that is as amibitious as you are.",
        isTranslatable: true
      },
      buttons: {
        type: "subschema",
        allowed: ["button"],
        max: 1,
        preview: [
          {
            subschema: "button",
            value: {
              text: "View collections",
              link: "https://instantcommerce.io/"
            }
          }
        ]
      },
      cta: {
        type: "text",
        label: "CTA text",
        preview: "Discover the collection",
        isTranslatable: true,
      },
      cards: {
        type: "subschema",
        allowed: ["card"],
        max: 3,
        preview: [
          {
            subschema: "card",
            value: {
              image:
                "https://a.storyblok.com/f/145828/5104x3403/ea3b04ac71/force-majeure-vujikv6pbjq-unsplash.jpg",
              title: "FW22 WOMEN",
              link: "https://instantcommerce.io/"
            }
          },
          {
            subschema: "card",
            value: {
              image:
                "https://a.storyblok.com/f/145828/4390x3245/6fa2d27260/force-majeure-8eu-hahcrhk-unsplash.jpg",
              title: "FW22 MEN",
              link: "https://instantcommerce.io/"
            }
          },
          {
            subschema: "card",
            value: {
              image:
                "https://a.storyblok.com/f/145828/4424x3355/b22d1984af/force-majeure-ggpq78xm8t0-unsplash.jpg",
              title: "FW22 KIDS",
              link: "https://instantcommerce.io/"
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
      card: {
        fields: {
          image: {
            type: "image",
            label: "Image",
          },
          title: {
            type: "text",
            label: "Title",
            isTranslatable: true
          },
          link: {
            type: "link",
            label: "Link",
            isTranslatable: true
          }
        }
      }
    }
  }
});
