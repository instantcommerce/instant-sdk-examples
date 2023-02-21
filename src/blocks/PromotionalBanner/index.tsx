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

const PromotionalBanner = () => {
  const {
    content: { text },
    customizer: { theme, alignment, dismissable, backgroundColor, textColor },
  } = useBlockState();

  const [dismissed, setDismissed] = useState<boolean>(false);

  // missing:
  // - RichText doesn't work on preview so can't fix the link resolver
  // - container width

  return (
    <div
      className={cx(
        "relative w-full bg-theme-bg py-1.25 text-sm",
        `text-${alignment}`,
        dismissed && "hidden"
      )}
      style={{
        ...setThemeColors(),
        ...setBlockTheme(theme),
        ...(!!backgroundColor ? { backgroundColor } : {}),
        ...(!!textColor ? { color: textColor } : {}),
      }}
    >
      {!!text && (
        <RichText
          value={text}
          markResolvers={{
            [MARK_ITALIC]: (children) => (
              <span className="italic">{children}</span>
            ),
            [MARK_BOLD]: (children) => <strong>{children}</strong>,
            [MARK_LINK]: (children, props) => {
              const { href, linktype } = props;

              return (
                <a
                  href={`${linktype === "email" ? "mailto:" : ""}${href}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  {children}
                </a>
              );
            },
          }}
        />
      )}

      {!!dismissable && (
        <button
          onClick={() => setDismissed(true)}
          className="w-2.5 absolute right-0 top-1/2 -translate-y-1/2"
        >
          <CloseIcon />
        </button>
      )}
    </div>
  );
};

export default defineBlock({
  component: PromotionalBanner,
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
      backgroundColor: { type: "color", label: "Background color" },
      textColor: { type: "color", label: "Text color" },
    },
  },
  contentSchema: {
    fields: {
      text: {
        type: "richText",
        toolbar: ["bold", "italic", "underline", "link"],
        label: "Text",
        preview: "Welcome to our new site! Learn more",
      },
    },
  },
});
