import { defineBlock, useBlockState } from "@instantcommerce/sdk";
import cx from "classnames";
import { Paragraph } from "../../components/Paragraph";

import { Title } from "../../components/Title";
import { setThemeColors } from "../../config/setThemeColors";
import { setBlockTheme } from "../../config/themeMapping";

import "../../styles/global.css";

const SocialProof = () => {
  const {
    content: { pretitle, title, subtitle, logos },
    customizer: {
      theme,
      contentAlignment,
      containerWidth,
      divider,
      headerAlignment,
      headerSize,
      mobileScrollDirection,
      // custom styling
      backgroundColor,
      dividerColor,
      pretitleColor,
      titleColor,
      subtitleColor,
    },
  } = useBlockState();
  console.log(dividerColor);

  return (
    <div
      className={cx("relative w-full bg-theme-bg")}
      style={{
        ...setThemeColors(),
        ...setBlockTheme(theme),
        ...(!!backgroundColor ? { backgroundColor } : {}),
      }}
    >
      <div
        className={cx(
          "w-full px-2 mx-auto py-9",
          containerWidth === "contained" && "max-w-7xl"
        )}
      >
        <div className={`text-${headerAlignment}`}>
          {pretitle && (
            <Paragraph
              className={cx("font-medium mb-1.5 text-theme-pretitle")}
              size="md"
              style={!!pretitleColor ? { color: pretitleColor } : {}}
            >
              {pretitle}
            </Paragraph>
          )}
          {title && (
            <Title
              className={cx("font-medium text-theme-title")}
              uppercase
              size={headerSize}
              style={!!titleColor ? { color: titleColor } : {}}
              variant="heading"
              as="h2"
            >
              {title}
            </Title>
          )}
          {subtitle && (
            <Paragraph
              className={cx("mt-1.5 text-theme-subtitle")}
              size="lg"
              style={!!subtitleColor ? { color: subtitleColor } : {}}
            >
              {subtitle}
            </Paragraph>
          )}
        </div>

        {!!divider && (
          <div
            className="w-full border-b mt-4"
            style={!!dividerColor ? { borderColor: dividerColor } : {}}
          />
        )}

        <div
          className={cx(
            "w-full flex md:flex-row items-center mt-4 md:gap-y-0",
            mobileScrollDirection === "vertical"
              ? "flex-col gap-y-6"
              : "gap-x-6 overflow-x-auto snap-x",
            contentAlignment === "left"
              ? "justify-between"
              : "justify-center md:gap-x-10"
          )}
        >
          {logos?.map((logo: any) => {
            return (
              <img
                className="max-h-8 object-contain"
                src={logo?.value?.logo?.filename?.preview}
              />
            );
          })}
        </div>
      </div>
    </div>
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
      divider: {
        type: "toggle",
        preview: false,
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
          { label: "Small", value: "md" },
          { label: "Medium", value: "lg" },
          { label: "Large", value: "xl" },
        ],
        preview: "lg",
      },
      mobileScrollDirection: {
        type: "select",
        options: [
          { label: "Vertical", value: "vertical" },
          { label: "Horizontal", value: "horizontal" },
        ],
        preview: "vertical",
      },
      backgroundColor: { type: "color", label: "Background color" },
      dividerColor: { type: "color", label: "Divider color" },
      pretitleColor: { type: "color", label: "Header pretitle color" },
      titleColor: { type: "color", label: "Header title color" },
      subtitleColor: { type: "color", label: "Header subtitle color" },
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
                  "https://a.storyblok.com/f/145828/1280x457/5475d43099/logo_nike.png",
              },
            },
          },
          {
            subschema: "logo",
            value: {
              logo: {
                type: "image",
                preview:
                  "https://a.storyblok.com/f/145828/48x56/1fa37346e5/apple_logo.png",
              },
            },
          },
          {
            subschema: "logo",
            value: {
              logo: {
                type: "image",
                preview:
                  "https://a.storyblok.com/f/145828/281x28/20a3c59ff8/louis_vuitton_logo.png",
              },
            },
          },
          {
            subschema: "logo",
            value: {
              logo: {
                type: "image",
                preview:
                  "https://a.storyblok.com/f/145828/212x37/e1d8452ad5/chalk.png",
              },
            },
          },
        ],
      },
    },
    subschemas: {
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
