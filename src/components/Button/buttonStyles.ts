export const baseStyles =
  "relative flex flex-row justify-center items-center text-center whitespace-no-wrap overflow-hidden transition-all";

export const variantStyles = {
  primary:
    "bg-primary-500 border-primary-500 text-white hover:bg-primary-700 hover:border-primary-700 focus:shadow-[0px_0px_0px_4px_var(--color-primary-200)] disabled:bg-primary-200 disabled:border-primary-200",
  secondary:
    "bg-white border-primary-100 text-primary-600 hover:bg-primary-200 hover:border-primary-200 focus:shadow-[0px_0px_0px_4px_var(--color-primary-200)] disabled:bg-primary-50 disabled:border-primary-50",
  gray: "bg-white border-gray-300 text-gray-700 hover:bg-primary-50 focus:shadow-[0px_0px_0px_4px_var(--color-primary-100)] disabled:bg-gray-200 disabled:border-gray-200",
  dark: "bg-gray-800 border-gray-300 text-white hover:bg-black focus:shadow-[0px_0px_0px_4px_var(--color-primary-100)] disabled:bg-gray-700 disabled:border-gray-700",
  link: "text-gray-700 hover:text-gray-500 focus:text-gray-500 disabled:text-gray-300",
  linkPrimary:
    "text-primary-600 hover:text-primary-700 focus:text-primary-700 disabled:text-gray-300",
  linkInverted:
    "text-white hover:text-gray-200 focus:text-gray-200 disabled:text-gray-200",
  unstyled: "",
};

export const buttonSizeStyles = {
  sm: "h-[36px] px-3.5 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-5 text-base",
  xl: "h-[52px] px-6 text-base",
  "2xl": "h-14 px-8 text-base",
};

export const buttonCornerStyles = {
  none: "rounded-none",
  xs: "rounded-xs",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  full: "rounded-full",
};

export const buttonWeightStyles = {
  base: "font-base",
  medium: "font-medium",
  bold: "font-bold",
};

export const linkSizeStyles = {
  sm: "text-sm leading-relaxed",
  md: "text-base leading-loose",
  lg: "text-lg leading-wide",
  xl: "text-xl tracking-tight leading-relaxed",
  "2xl": "text-xl -tracking-tight leading-relaxed",
};
