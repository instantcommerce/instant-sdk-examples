import { useState } from "react";
import { defineBlock, useBlockState, Link } from "@instantcommerce/sdk";
import cx from "classnames";

import { Paragraph } from "~/components";
import { CloseIcon } from "~/components/Icons";
import { setStoreColors, setSectionTheme } from "~/config";
import "~/styles/global.scss";

const AnnouncementBanner = () => {
  const {
    content: { text, links, image },
    customizer: {
      theme,
      alignment,
      dismissable,
      hasBackgroundImage,
      backgroundColor,
      textColor,
      linkColor,
      closeColor,
    },
  } = useBlockState();

  const [dismissed, setDismissed] = useState<boolean>(false);

  return (
    <section
      className={cx(
        "bg-theme-bg relative w-full py-2.5 font-medium",
        alignment == "center" ? "text-center" : "text-left",
        dismissed && "hidden"
      )}
      style={{
        ...setStoreColors(),
        ...setSectionTheme(theme),
        ...(!!backgroundColor ? { backgroundColor } : {}),
      }}
    >
      {!!hasBackgroundImage && image?.filename && (
        <img
          className={cx(
            "absolute top-0 left-0 right-0 bottom-0 w-0 h-0 min-w-full max-w-full min-h-full max-h-0 object-cover"
          )}
          alt={image?.alt}
          src={image.filename}
        />
      )}

      <div
        className={cx(
          "relative flex justify-center flex-col sm:flex-row z-10",
          alignment == "center"
            ? "sm:justify-center px-12"
            : "sm:justify-start pl-4 pr-12 md:pl-12"
        )}
      >
        {(!!text || !!links?.[0]?.value?.label) && (
          <Paragraph
            size="sm"
            className="text-theme-title"
            style={{ ...(!!textColor ? { color: textColor } : {}) }}
          >
            {text}
            {!!links?.[0]?.value?.label && (
              // @ts-ignore
              <Link
                to={links[0]?.value?.link}
                className={cx(
                  "text-theme-link inline sm:ml-2 underline transition-opacity hover:opacity-70",
                  text ? "ml-1" : ""
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
          className="text-theme-icon w-5 absolute right-4 top-1/2 -translate-y-1/2"
          style={{ ...(!!closeColor ? { color: closeColor } : {}) }}
        >
          <CloseIcon />
        </button>
      )}
    </section>
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
          { label: "Primary", value: "themePrimary" },
          { label: "Primary inverted", value: "themePrimaryInverted" },
          { label: "Dark", value: "themeDark" },
        ],
        preview: "themeLight",
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
      hasBackgroundImage: {
        type: "toggle",
        preview: false,
      },
      backgroundColor: { type: "color", label: "Background color" },
      textColor: { type: "color", label: "Text color" },
      linkColor: { type: "color", label: "Link color" },
      closeColor: { type: "color", label: "Close button color" },
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
          "https://a.storyblok.com/f/145828/5085x162/8285ff8859/force-majeure-vujikv6pbjq-unsplash.jpg",
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
