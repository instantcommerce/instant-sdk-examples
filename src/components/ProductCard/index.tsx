import cx from "classnames";

import { ShopifyProduct } from "~/lib/shopify";
import { useMoney } from "~/hooks";

import { Button, Paragraph, Title } from "..";

type ProductCardProps = {
  className?: string;
  // customizations
  imageAspectRatio?: "landscape" | "portrait" | "square";
  imageFillBehavior?: "contain" | "cover";
  productLabelPosition?:
    | "bottomImage"
    | "bottomLeftImage"
    | "topLeftImage"
    | "none";
  hoverEffect?: "none" | "secondImage" | "zoom";
  pretitleType?: "none" | "productType" | "vendor";
  textAlignment?: "left" | "center";
  textSize?: "xs" | "sm" | "md" | "lg";
  descriptionType?: "description" | "none";
  // content
  product: ShopifyProduct;
};

export const ProductCard = ({
  className,
  descriptionType,
  hoverEffect,
  imageAspectRatio,
  imageFillBehavior,
  pretitleType,
  product,
  textSize,
  textAlignment,
}: ProductCardProps) => {
  let pretitleText;
  let descriptionText;

  const priceMoney = useMoney(product?.priceRange?.minVariantPrice);
  const oldPriceMoney = useMoney(product?.compareAtPriceRange?.minVariantPrice);
  let oldPrice;
  let price;

  if (pretitleType === "vendor" && !!product?.vendor) {
    pretitleText = product.vendor;
  } else if (pretitleType === "productType" && !!product?.productType) {
    pretitleText = product.productType;
  }

  if (descriptionType === "description" && !!product?.description) {
    descriptionText = product.description;
  }

  if (
    priceMoney?.localizedString &&
    product?.priceRange?.minVariantPrice?.amount !==
      product?.priceRange?.maxVariantPrice?.amount
  ) {
    price = `from ${priceMoney?.localizedString}`;
  } else {
    price = priceMoney?.localizedString || "–";
  }

  if (
    oldPriceMoney?.localizedString &&
    product?.compareAtPriceRange?.maxVariantPrice?.amount !== "0.0"
  ) {
    if (
      product?.compareAtPriceRange?.minVariantPrice?.amount !==
      product?.compareAtPriceRange?.maxVariantPrice?.amount
    ) {
      oldPrice = `from ${oldPriceMoney?.localizedString}`;
    } else {
      oldPrice = oldPriceMoney?.localizedString;
    }
  } else {
    oldPrice = undefined;
  }

  return (
    <Button
      className={cx(
        "flex flex-col group",
        textAlignment === "center" ? "text-center" : "text-left",
        className
      )}
      to={`/products/${product?.handle}`}
    >
      <div
        className={cx(
          "relative w-full overflow-hidden mb-4",
          imageAspectRatio === "landscape"
            ? "pt-[66.66%]"
            : imageAspectRatio === "portrait"
            ? "pt-[150%]"
            : "pt-[100%]"
        )}
      >
        {!!product?.images?.edges[1]?.node?.url &&
          hoverEffect === "secondImage" && (
            <img
              className={cx(
                "absolute top-0 left-0 right-0 bottom-0 w-0 h-0 min-w-full max-w-full min-h-full max-h-0",
                imageFillBehavior === "cover"
                  ? "object-cover"
                  : "object-contain"
              )}
              src={product?.images?.edges[1]?.node?.url}
            />
          )}

        <img
          className={cx(
            "absolute top-0 left-0 right-0 bottom-0 w-0 h-0 min-w-full max-w-full min-h-full max-h-0 opacity-1 transition-transform",
            imageFillBehavior === "cover" ? "object-cover" : "object-contain",
            !!product?.images?.edges[1]?.node?.url &&
              hoverEffect === "secondImage"
              ? "group-hover:opacity-0 duration-300"
              : "",

            hoverEffect === "zoom" ? "group-hover:scale-125 duration-500" : ""
          )}
          src={product?.images?.edges[0]?.node?.url}
        />
      </div>

      {!!pretitleText && (
        <Paragraph size="sm" className={cx("text-theme-text mb-0.5")}>
          {pretitleText}
        </Paragraph>
      )}

      <Title
        variant="heading"
        size={textSize === "lg" ? "md" : textSize === "md" ? "sm" : "xs"}
        className={cx("text-theme-title font-medium")}
      >
        {product.title}
      </Title>

      {!!descriptionText && (
        <Paragraph
          size={textSize === "lg" ? "md" : "sm"}
          className={cx("text-theme-subtitle mt-0.5 line-clamp-3 break-words")}
        >
          {descriptionText}
        </Paragraph>
      )}

      <div
        className={cx(
          "flex",
          descriptionText ? "mt-4" : "mt-1",
          textAlignment === "center" ? "justify-center" : "justify-start"
        )}
      >
        {!!oldPrice && (
          <Paragraph
            className={cx("text-theme-text mr-2 line-through")}
            size={textSize === "lg" ? "lg" : "md"}
          >
            {oldPrice}
          </Paragraph>
        )}
        <Paragraph
          size={textSize === "lg" ? "lg" : "md"}
          className={cx("text-theme-title font-bold")}
        >
          {price}
        </Paragraph>
      </div>
    </Button>
  );
};
