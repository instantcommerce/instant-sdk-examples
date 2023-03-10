export const heroVariantStyles = {
  cover: "",
  textImage: "flex-col-reverse md:flex-row-reverse",
  imageText: "flex-col md:flex-row",
};

export const heroWidthStyles = {
  contained: "max-w-[1440px] mx-auto",
  full: "w-full",
};

export const heroHeightStyles = {
  sm: "min-h-[480px]",
  md: "min-h-[520px] md:min-h-[640px]",
  lg: "min-h-[580px] md:min-h-[780px]",
};

export const heroImageStyles = {
  cover: "right-0 left-0",
  textImage: "right-0 w-2/4",
  imageText: "left-0 w-2/4",
};

export const heroImageMobileStyles = {
  cover: "absolute top-0 bottom-0 right-0 left-0 md:hidden",
  textImage:
    "relative min-h-[204px] w-full md:w-2/4 h-full flex-1 md:flex-none",
  imageText:
    "relative min-h-[204px] w-full md:w-2/4 h-full flex-1 md:flex-none",
};

export const heroVerticalStyles = {
  top: "justify-start",
  center: "justify-center",
  bottom: "justify-end",
};

export const heroHorizontalStyles = {
  left: "items-start mr-auto",
  center: "items-center mx-auto text-center",
  right: "items-end ml-auto text-right",
};
