import { defineBlock, useBlockState, Link } from "@instantcommerce/sdk";
import cx from "classnames";
import { useState } from "react";
import { Paragraph } from "../../components";
import { CloseIcon } from "../../components/Icons";

import { setThemeColors } from "../../config/setThemeColors";
import { setBlockTheme } from "../../config/themeMapping";

import "../../styles/global.scss";

const AnnouncementBanner = () => {
  const {
    content: { text, links, image },
    customizer: {
      theme,
      alignment,
      dismissable,
      backgroundImage,
      backgroundColor,
      textColor,
      linkColor,
      closeColor
    }
  } = useBlockState();

  const [dismissed, setDismissed] = useState<boolean>(false);

  return (
    <div
      className={cx(
        "announcement-banner relative w-full bg-theme-bg py-1.25 text-sm",
        alignment == "center" ? "text-center" : "text-left",
        dismissed && "hidden",
        backgroundImage && "bg-cover"
      )}
      style={{
        ...setThemeColors(),
        ...setBlockTheme(theme),
        ...(!!backgroundColor ? { backgroundColor } : {}),
        ...(!!backgroundImage
          ? { backgroundImage: `url(${image?.filename})` }
          : {})
      }}
    >
      <div
        className={cx(
          "announcement-banner__text-wrapper flex flex-col sm:flex-row mx-auto justify-center",
          alignment == "center"
            ? "sm:justify-center px-6"
            : "sm:justify-start pl-2 pr-6 md:pl-6"
        )}
      >
        {(!!text || !!links?.[0]?.value?.label) && (
          <Paragraph
            className="announcement-banner__text font-medium text-sm text-theme-title"
            style={{ ...(!!textColor ? { color: textColor } : {}) }}
          >
            {text}
            {!!links?.[0]?.value?.label && (
              // @ts-ignore
              <Link
                to={links[0]?.value?.link}
                className={cx(
                  "announcement-banner__link inline sm:ml-1 text-sm font-medium underline text-theme-link transition-opacity hover:opacity-70",
                  text ? "ml-0.5" : ""
                )}
                style={{ ...(!!linkColor ? { color: linkColor } : {}) }}
              >
                {links[0].value.label}
              </Link>
            )}
          </Paragraph>
        )}
      </div>

      {!!dismissable && (
        <button
          onClick={() => setDismissed(true)}
          className="announcement-banner__icon w-2.5 absolute right-2 top-1/2 -translate-y-1/2 text-theme-icon"
          style={{ ...(!!closeColor ? { color: closeColor } : {}) }}
        >
          <CloseIcon />
        </button>
      )}
    </div>
  );
};

export default defineBlock({
  component: AnnouncementBanner,
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
        preview: "themeGray"
      },
      alignment: {
        type: "select",
        options: [
          { label: "Left", value: "left" },
          { label: "Center", value: "center" }
        ],
        preview: "center"
      },
      dismissable: {
        type: "toggle",
        preview: false
      },
      backgroundImage: {
        type: "toggle",
        preview: false
      },
      backgroundColor: { type: "color", label: "Background color" },
      textColor: { type: "color", label: "Text color" },
      linkColor: { type: "color", label: "Link color" },
      closeColor: { type: "color", label: "Close button color" }
    }
  },
  contentSchema: {
    fields: {
      text: {
        type: "text",
        label: "Text",
        preview: "Welcome to our new site!"
      },
      links: {
        type: "subschema",
        allowed: ["link"],
        max: 1,
        preview: [
          {
            subschema: "link",
            value: { label: "Learn more", link: "https://instantcommerce.io/" }
          }
        ]
      },
      image: {
        type: "image",
        label: "Background image",
        preview:
          "https://a.storyblok.com/f/145828/1440x40/e5735c2906/autumn.png"
      }
    },
    subschemas: {
      link: {
        fields: {
          label: {
            type: "text",
            label: "Label",
            isTranslatable: true,
            isRequired: true
          },
          link: {
            type: "text",
            label: "Link",
            isTranslatable: true,
            isRequired: true
          }
        }
      }
    }
  }
});
