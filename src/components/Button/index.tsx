import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import { Link, LinkProps } from "@instantcommerce/sdk";
import cx from "classnames";

import {
  baseStyles,
  buttonCornerStyles,
  buttonSizeStyles,
  buttonWeightStyles,
  linkSizeStyles,
  variantStyles,
} from "./buttonStyles";

type BaseProps = {
  corners?: "none" | "xs" | "sm" | "md" | "lg" | "full";
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
  variant?:
    | "primary"
    | "secondary"
    | "light"
    | "dark"
    | "link"
    | "linkPrimary"
    | "linkLight"
    | "unstyled";
  weight?: "base" | "medium" | "bold";
};

type ElementProps =
  | LinkProps
  | DetailedHTMLProps<
      ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >;

export type ButtonProps = BaseProps & ElementProps;

export const Button = ({
  children,
  className,
  corners = "none",
  size,
  variant = "unstyled",
  weight = "medium",
  ...props
}: ButtonProps) => {
  let hasButtonStyles;

  if (["primary", "secondary", "light", "dark"].includes(variant)) {
    hasButtonStyles = true;
  }

  const baseProps = {
    className: cx(
      "button",
      variant !== "unstyled" ? baseStyles : "",
      variantStyles[variant],
      hasButtonStyles
        ? buttonSizeStyles[size || "md"]
        : size
        ? linkSizeStyles[size]
        : "",
      buttonCornerStyles[corners],
      buttonWeightStyles[weight],
      className
    ),
  };

  if ("to" in props) {
    return (
      // @ts-ignore
      <Link {...baseProps} to={props?.to}>
        {children}
      </Link>
    );
  }

  return (
    <button {...baseProps} {...props}>
      {children}
    </button>
  );
};
