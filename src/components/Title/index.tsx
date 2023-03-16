import { AllHTMLAttributes, ElementType } from "react";
import cx from "classnames";

import {
  displaySizeStyles,
  headingSizeStyles,
  titleVariants,
} from "./titleStyles";

type HTMLProperties = {
  as?: ElementType;
} & Omit<AllHTMLAttributes<HTMLElement>, "color" | "height" | "width" | "size">;

type TitleProps = {
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  ellipsis?: boolean;
  variant?: "display" | "heading";
  uppercase?: boolean;
} & HTMLProperties;

export const Title = ({
  as,
  children,
  className,
  ellipsis,
  size = "md",
  variant = "heading",
  uppercase = false,
  ...props
}: TitleProps) => {
  const Component = as || "h4";

  return (
    <Component
      className={cx(
        titleVariants[variant],
        variant === "heading"
          ? headingSizeStyles[size]
          : displaySizeStyles[size],
        uppercase
          ? `uppercase ${
              variant === "display" && size === "xs"
                ? "tracking-wider"
                : variant === "heading" &&
                  (size === "sm" ? "tracking-wide" : "")
            }`
          : "",
        ellipsis ? "truncate" : "",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};
