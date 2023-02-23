import {
  defineBlock,
  RichText,
  useBlockState,
  MARK_BOLD,
  MARK_ITALIC,
  MARK_LINK,
} from "@instantcommerce/sdk";
import cx from "classnames";
import { useState } from "react";
import { CloseIcon } from "../../components/Icons";

import { setThemeColors } from "../../config/setThemeColors";
import { setBlockTheme } from "../../config/themeMapping";

import "../../styles/global.css";

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
    },
  } = useBlockState();

  const [dismissed, setDismissed] = useState<boolean>(false);

  return (
    <div
      className={cx(
        "relative w-full bg-theme-bg py-1.25 text-sm",
        `text-${alignment}`,
        dismissed && "hidden",
        backgroundImage && "bg-cover"
      )}
      style={{
        ...setThemeColors(),
        ...setBlockTheme(theme),
        ...(!!backgroundColor ? { backgroundColor } : {}),
        ...(!!backgroundImage
          ? { backgroundImage: `url(${image?.filename})` }
          : {}),
      }}
    >
      <div
        className={cx(
          "flex flex-col sm:flex-row max-w-7xl px-6 mx-auto justify-center",
          alignment == "center" ? "sm:justify-center" : "sm:justify-start"
        )}
      >
        {!!text && (
          <div
            className="text-theme-title"
            style={{ ...(!!textColor ? { color: textColor } : {}) }}
          >
            {text}
          </div>
        )}

        {!!links?.[0]?.value?.label && (
          <a
            href={links[0]?.value?.link}
            className="ml-1 text-theme-link"
            style={{ ...(!!linkColor ? { color: linkColor } : {}) }}
          >
            {links[0].value.label}
          </a>
        )}
      </div>

      {!!dismissable && (
        <button
          onClick={() => setDismissed(true)}
          className="w-2.5 absolute right-2 top-1/2 -translate-y-1/2 text-theme-icon"
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
          { label: "Dark", value: "themeDark" },
        ],
        preview: "themeGray",
      },
      alignment: {
        type: "select",
        options: [
          { label: "Left", value: "left" },
          { label: "Center", value: "center" },
        ],
        preview: "center",
      },
      dismissable: {
        type: "toggle",
        preview: false,
      },
      backgroundImage: {
        type: "toggle",
        preview: false,
      },
      backgroundColor: { type: "color", label: "Background color" },
      textColor: { type: "color", label: "Text color" },
      linkColor: { type: "color", label: "Link color" },
    },
  },
  contentSchema: {
    fields: {
      text: {
        type: "text",
        label: "Text",
        preview: "Welcome to our new site!",
      },
      links: {
        type: "subschema",
        allowed: ["link"],
        max: 1,
        preview: [
          {
            subschema: "link",
            value: { label: "Learn more", link: "https://instantcommerce.io/" },
          },
        ],
      },
      image: {
        type: "image",
        label: "Background image",
        preview:
          "https://a.storyblok.com/f/145828/1440x40/e5735c2906/autumn.png",
      },
    },
    subschemas: {
      link: {
        fields: {
          label: {
            type: "text",
            label: "Label",
            isTranslatable: true,
            isRequired: true,
          },
          link: {
            type: "text",
            label: "Link",
            isTranslatable: true,
            isRequired: true,
          },
        },
      },
    },
  },
});
