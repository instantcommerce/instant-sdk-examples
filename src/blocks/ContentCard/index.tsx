import { defineBlock, useBlockState } from "@instantcommerce/sdk";
import cx from "classnames";

import { Container, Button, Overlay } from "../../components";
import { ArrowRightIcon } from "../../components/Icons";
import { setBlockTheme, setThemeColors } from "../../config";
import "../../styles/global.css";

const ContentCard = () => {
  const {
    content: { cards, ...headerContent },
    customizer: {
      backgroundColor,
      theme,
      width,
      contentAlignment,
      contentSize,
      overlayColor,
      overlayOpacity,
      ...headerCustomizations
    },
  } = useBlockState();

  return (
    <Container
      backgroundColor={backgroundColor}
      className={width === "contained" ? "max-w-7xl" : "max-w-none"}
      headerProps={{ ...headerContent, ...headerCustomizations, theme }}
      wrapperClassName="content-card"
      wrapperStyle={{ ...setThemeColors(), ...setBlockTheme(theme) }}
    >
      <div className="content-card__container w-full flex flex-col gap-y-2 md:gap-y-0 md:flex-row md:gap-x-4">
        {cards?.map((card) => (
          <a
            href={card?.value?.link?.url}
            className={cx(
              "content-card__card w-full bg-cover bg-center p-5 h-[360px] flex flex-col relative gap-y-2",
              contentAlignment === "center"
                ? "justify-center items-center text-center"
                : "justify-end"
            )}
            style={{ backgroundImage: `url(${card?.value?.image?.filename})` }}
          >
            {overlayColor && (
              <Overlay color={overlayColor} opacity={overlayOpacity} />
            )}

            {!!card?.value?.title && (
              <div
                className={cx(
                  "content-card__title text-white font-semibold relative z-20",
                  contentSize === "md" && "text-xl",
                  contentSize === "lg" && "text-2xl",
                  contentSize === "xl" && "text-3xl"
                )}
              >
                {card.value.title}
              </div>
            )}
            <Button
              variant="unstyled"
              className={cx(
                "content-card__button text-white flex items-center text-left relative z-20",
                contentSize === "md" && "text-xs",
                contentSize === "lg" && "text-sm",
                contentSize === "xl" && "text-base"
              )}
            >
              <ArrowRightIcon className="content-card__arrow w-1.5 mr-1.25" />
              Discover the collection
            </Button>
          </a>
        ))}
      </div>
    </Container>
  );
};

export default defineBlock({
  component: ContentCard,
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
      headerAlignment: {
        type: "select",
        options: [
          { label: "Left", value: "left" },
          { label: "Center", value: "center" },
        ],
        preview: "left",
      },
      headerSize: {
        type: "select",
        options: [
          { label: "Small", value: "md" },
          { label: "Medium", value: "lg" },
          { label: "Large", value: "xl" },
        ],
        preview: "lg",
      },
      contentAlignment: {
        type: "select",
        label: "Card content alignment",
        options: [
          { label: "Left", value: "left" },
          { label: "Center", value: "center" },
        ],
        preview: "left",
      },
      contentSize: {
        type: "select",
        label: "Card text size",
        options: [
          { label: "Small", value: "md" },
          { label: "Medium", value: "lg" },
          { label: "Large", value: "xl" },
        ],
        preview: "lg",
      },
      overlayColor: {
        type: "color",
        label: "Image overlay color",
        preview: "#000",
      },
      overlayOpacity: {
        type: "number",
        label: "Image overlay opacity",
        min: 0,
        max: 100,
        preview: 10,
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
        preview: "link",
      },
      buttonCorners: {
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
      hasDivider: { type: "toggle", label: "Has divider", preview: false },
    },
  },
  contentSchema: {
    fields: {
      pretitle: {
        type: "text",
        label: "Pretitle",
        preview: "Winter 2022",
        isTranslatable: true,
      },
      title: {
        type: "text",
        label: "Title",
        preview: "COOL COLLECTIONS",
        isTranslatable: true,
      },
      subtitle: {
        type: "text",
        label: "Description",
        preview: "Shop the latest trends.",
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
              text: "View collections",
              link: "https://instantcommerce.io/",
            },
          },
        ],
      },
      cards: {
        type: "subschema",
        allowed: ["card"],
        max: 4,
        preview: [
          {
            subschema: "card",
            value: {
              image:
                "https://a.storyblok.com/f/145828/2880x1560/ae2a6a0894/dark.jpg",
              title: "SHOP WOMEN",
              link: "https://instantcommerce.io/",
            },
          },
          {
            subschema: "card",
            value: {
              image:
                "https://a.storyblok.com/f/145828/4390x3245/6fa2d27260/force-majeure-8eu-hahcrhk-unsplash.jpg",
              title: "SHOP MEN",
              link: "https://instantcommerce.io/",
            },
          },
          {
            subschema: "card",
            value: {
              image:
                "https://a.storyblok.com/f/145828/4424x3355/b22d1984af/force-majeure-ggpq78xm8t0-unsplash.jpg",
              title: "SHOP WOMEN",
              link: "https://instantcommerce.io/",
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
      card: {
        fields: {
          image: {
            type: "image",
            label: "Image",
            isTranslatable: false,
            isRequired: false,
          },
          title: {
            type: "text",
            label: "Title",
            isTranslatable: true,
            isRequired: true,
          },
          link: {
            type: "link",
            label: "Link",
            isTranslatable: true,
            isRequired: true,
          },
        },
      },
    },
  },
});
