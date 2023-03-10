import { defineBlock, useBlockState } from "@instantcommerce/sdk";
import cx from "classnames";

import { Button, Overlay, Paragraph, Title } from "~/components";
import { setThemeColors, setBlockTheme } from "~/config";
import "~/styles/global.scss";

import {
  heroVariantStyles,
  heroWidthStyles,
  heroHeightStyles,
  heroImageStyles,
  heroImageMobileStyles,
  heroVerticalStyles,
  heroHorizontalStyles,
} from "./heroStyles";

const HeroBlock = () => {
  const {
    content: { image, mobileImage, pretitle, title, subtitle, buttons },
    customizer: {
      theme,
      backgroundColor,
      overlayColor,
      overlayOpacity,
      variant,
      width,
      height,
      verticalAlign,
      horizontalAlign,
      pretitleSize,
      pretitleColor,
      titleSize,
      titleColor,
      subtitleSize,
      subtitleColor,
      firstButtonType,
      secondButtonType,
      buttonCorners,
      buttonWeight,
    },
  } = useBlockState();

  return (
    <section
      className={cx("hero bg-theme-bg relative w-full")}
      style={{
        ...setThemeColors(),
        ...setBlockTheme(theme),
        ...(!!backgroundColor ? { backgroundColor } : {}),
      }}
    >
      <div
        className={cx(
          "hero__image absolute top-0 bottom-0 hidden md:flex bg-cover",
          heroImageStyles[variant]
        )}
      >
        {image?.filename && (
          <img
            className={cx(
              "absolute top-0 left-0 right-0 bottom-0 w-0 h-0 min-w-full max-w-full min-h-full max-h-0 object-cover"
            )}
            alt={image?.alt}
            src={image?.filename}
          />
        )}
        {overlayColor && (
          <Overlay color={overlayColor} opacity={overlayOpacity} />
        )}
      </div>
      <div
        className={cx(
          "hero__wrapper flex w-full",
          heroVariantStyles[variant],
          heroWidthStyles[width],
          heroHeightStyles[height]
        )}
      >
        <div
          className={cx(
            "hero__image--mobile flex bg-cover md:!bg-none",
            heroImageMobileStyles[variant]
          )}
          style={{ backgroundImage: `url(${mobileImage?.filename})` }}
        >
          {overlayColor && (
            <Overlay
              className="md:hidden"
              color={overlayColor}
              opacity={overlayOpacity}
            />
          )}
        </div>
        <div
          className={cx(
            "hero__content flex flex-col md:flex-1 sm:max-w-[50%] px-4 py-12 md:py-20 z-10",
            !(width === "contained" && variant === "cover")
              ? "md:px-20 lg:max-w-[768px]"
              : "lg:max-w-[640px]",
            heroVerticalStyles[verticalAlign],
            heroHorizontalStyles[horizontalAlign]
          )}
        >
          {pretitle && (
            <Paragraph
              className={cx(
                "hero__pretitle text-theme-pretitle mb-2 font-medium"
              )}
              size={pretitleSize}
              style={!!pretitleColor ? { color: pretitleColor } : {}}
            >
              {pretitle}
            </Paragraph>
          )}

          {title && (
            <Title
              className={cx(
                "hero__title text-theme-title font-medium leading-tight"
              )}
              size={titleSize}
              style={!!titleColor ? { color: titleColor } : {}}
              variant="display"
              as="h1"
            >
              {title}
            </Title>
          )}

          {subtitle && (
            <Paragraph
              className={cx("hero__subtitle text-theme-subtitle mt-4")}
              size={subtitleSize}
              style={!!subtitleColor ? { color: subtitleColor } : {}}
            >
              {subtitle}
            </Paragraph>
          )}

          {buttons && (
            <div
              className={cx("hero__buttons-wrapper flex flex-wrap mt-8 gap-4")}
            >
              {buttons?.[0]?.value?.text && (
                <Button
                  size={
                    ["link", "linkPrimary", "linkInverted"].includes(
                      firstButtonType
                    )
                      ? "sm"
                      : "md"
                  }
                  variant={firstButtonType}
                  to={buttons?.[0]?.value?.link}
                  corners={buttonCorners}
                  weight={buttonWeight}
                >
                  {buttons?.[0]?.value?.text}
                </Button>
              )}

              {buttons?.[1]?.value?.text && (
                <Button
                  size={
                    ["link", "linkPrimary", "linkInverted"].includes(
                      secondButtonType
                    )
                      ? "sm"
                      : "md"
                  }
                  variant={secondButtonType}
                  to={buttons?.[1]?.value?.link}
                  corners={buttonCorners}
                  weight={buttonWeight}
                >
                  {buttons?.[1]?.value?.text}
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default defineBlock({
  component: HeroBlock,
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
        preview: "themeDark",
      },
      variant: {
        type: "select",
        options: [
          { label: "Cover", value: "cover" },
          { label: "Image text", value: "imageText" },
          { label: "Text image", value: "textImage" },
        ],
        preview: "cover",
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
      width: {
        type: "select",
        options: [
          { label: "Boxed", value: "contained" },
          { label: "Full width", value: "full" },
        ],
        preview: "full",
      },
      height: {
        type: "select",
        options: [
          { label: "Small", value: "sm" },
          { label: "Medium", value: "md" },
          { label: "Large", value: "lg" },
        ],
        preview: "md",
      },
      horizontalAlign: {
        type: "select",
        options: [
          { label: "Left", value: "left" },
          { label: "Center", value: "center" },
          { label: "Right", value: "right" },
        ],
        preview: "left",
      },
      verticalAlign: {
        type: "select",
        options: [
          { label: "Top", value: "top" },
          { label: "Center", value: "center" },
          { label: "Bottom", value: "bottom" },
        ],
        preview: "center",
      },
      pretitleSize: {
        type: "select",
        options: [
          { label: "Small", value: "md" },
          { label: "Medium", value: "lg" },
          { label: "Large", value: "xl" },
        ],
        preview: "md",
      },
      titleSize: {
        type: "select",
        options: [
          { label: "Small", value: "md" },
          { label: "Medium", value: "lg" },
          { label: "Large", value: "xl" },
        ],
        preview: "lg",
      },
      subtitleSize: {
        type: "select",
        options: [
          { label: "Small", value: "md" },
          { label: "Medium", value: "lg" },
          { label: "Large", value: "xl" },
        ],
        preview: "lg",
      },
      pretitleColor: { type: "color", label: "Pretitle color" },
      titleColor: { type: "color", label: "Title color" },
      subtitleColor: { type: "color", label: "Description color" },
      backgroundColor: { type: "color", label: "Background color" },
      firstButtonType: {
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
      secondButtonType: {
        type: "select",
        options: [
          { label: "Primary", value: "primary" },
          { label: "Secondary", value: "secondary" },
          { label: "Gray", value: "gray" },
          { label: "Link", value: "link" },
          { label: "Link primary", value: "linkPrimary" },
          { label: "Link inverted", value: "linkInverted" },
        ],
        preview: "linkInverted",
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
    },
  },
  contentSchema: {
    fields: {
      pretitle: {
        type: "text",
        label: "Pretitle",
        preview: "FW22 Collection",
        isTranslatable: true,
      },
      title: {
        type: "text",
        label: "Title",
        preview: "We bring a new revolution of fashion.",
        isTranslatable: true,
      },
      subtitle: {
        type: "text",
        label: "Description",
        preview:
          "Experience every detail with our new fabrics. We made them lightweight yet warm for the coming season.",
        isTranslatable: true,
      },
      image: {
        type: "image",
        preview:
          "https://a.storyblok.com/f/145828/2880x1560/ae2a6a0894/dark.jpg",
      },
      mobileImage: {
        type: "image",
        preview:
          "https://a.storyblok.com/f/145828/2880x1560/ae2a6a0894/dark.jpg",
      },
      buttons: {
        type: "subschema",
        allowed: ["button"],
        max: 3,
        preview: [
          {
            subschema: "button",
            value: {
              text: "Explore the Campaign",
              link: "https://a.storyblok.com/f/145828/2880x1560/ae2a6a0894/dark.jpg",
            },
          },
          {
            subschema: "button",
            value: {
              text: "Discover other campaigns",
              link: "https://a.storyblok.com/f/145828/2880x1560/ae2a6a0894/dark.jpg",
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
    },
  },
});
