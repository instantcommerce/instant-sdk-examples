import { useState, useEffect } from "react";
import {
  defineBlock,
  useBlockState,
  useShopifyClient,
  useCart,
  useRequestData,
} from "@instantcommerce/sdk";
import cx from "classnames";

import { useMoney } from "~/hooks";
import {
  ProductConnection,
  productQuery,
  ShopifyProduct,
  ShopifyVariant,
} from "~/lib/shopify";
import { Button, Paragraph, Title } from "~/components";

import { setStoreColors, setSectionTheme } from "~/config";
import "~/styles/global.scss";

const ProductCta = () => {
  const {
    content: {
      productId,
      variantId,
      image,
      buttonText,
      soldOutText,
      title,
      description,
    },
    customizer: {
      theme,
      width,
      buttonType,
      buttonCorners,
      buttonWeight,
      imageAlignment,
      imageRatio,
      contentAlignment,
      textAlignment,
      backgroundColor,
      titleColor,
      titleSize,
      descriptionColor,
      priceColor,
    },
  } = useBlockState();

  const shopifyClient = useShopifyClient();
  const { locale, country } = useRequestData();
  const { addLine } = useCart();

  const [product, setProduct] = useState<ShopifyProduct>();
  const [variant, setVariant] = useState<ShopifyVariant>();
  const price = useMoney(variant?.priceV2);

  const loadProduct = async (id: string) => {
    try {
      const result = await shopifyClient.request<ProductConnection>(
        productQuery,
        {
          id: `gid://shopify/Product/${id}`,
          country,
          language: locale.toUpperCase(),
        }
      );

      setProduct(result.product);
      setVariant(
        !!variantId
          ? result.product?.variants?.edges?.find(
              (p) =>
                p?.node?.id?.split("gid://shopify/ProductVariant/")?.[1] ===
                variantId
            )?.node
          : result.product?.variants?.edges?.[0]?.node
      );
    } catch (e) {
      console.log(e);
    }
  };

  const addToCart = async () => {
    try {
      addLine({
        productId: `gid://shopify/Product/${productId}`,
        variantId: `gid://shopify/ProductVariant/${variantId}`,
        quantity: 1,
        showModalOnSuccess: true,
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (productId) {
      loadProduct(productId);
    }
  }, [productId, variantId]);

  return (
    <section
      className={cx("product-cta py-[72px]", width === "contained" && "px-4")}
    >
      <div
        className={cx(
          "product-cta__container",
          "section w-full bg-theme-bg flex flex-col",
          width === "contained" && "max-w-7xl mx-auto",
          imageAlignment === "right" && "sm:flex-row-reverse",
          imageAlignment === "left" && "sm:flex-row"
        )}
        style={{
          ...setStoreColors(),
          ...setSectionTheme(theme),
          ...(!!backgroundColor ? { backgroundColor } : {}),
        }}
      >
        {(!!product?.images?.edges?.[0]?.node?.url || !!image?.filename) && (
          <div
            className={cx(
              "product-cta__image",
              "flex-1 bg-cover bg-center",
              imageRatio === "portrait" ? "aspect-[4/5]" : "aspect-square"
            )}
            style={{
              backgroundImage: `url(${
                image?.filename || product?.images?.edges?.[0]?.node?.url
              })`,
            }}
            role="img"
            aria-label={image?.alt || ""}
          />
        )}

        <div
          className={cx(
            "product-cta__cta-container",
            "flex-1 h-full py-10 lg:py-28 px-6",
            width === "full" && "sm:px-4",
            contentAlignment === "center" && "sm:self-center",
            contentAlignment === "bottom" && "sm:self-end",
            textAlignment === "center" && "text-center"
          )}
        >
          <div className="product-cta__cta-inner-container max-w-[352px] mx-auto h-full flex flex-col justify-center">
            <Title
              as="h2"
              size={titleSize}
              className="product-cta__title text-theme-title font-medium"
              style={{ ...(!!titleColor ? { color: titleColor } : {}) }}
            >
              {!!title ? title : product?.title}
            </Title>

            {(!!description || !!product?.description) && (
              <Paragraph
                className="product-cta__description mt-3 text-theme-subtitle"
                style={{
                  ...(!!descriptionColor ? { color: descriptionColor } : {}),
                }}
              >
                {!!description ? description : product?.description}
              </Paragraph>
            )}

            {!!price?.localizedString && (
              <div
                className="product-cta__price mt-3 text-theme-highlightedText font-medium"
                style={{
                  ...(!!priceColor ? { color: priceColor } : {}),
                }}
              >
                {price?.localizedString}
              </div>
            )}

            <Button
              variant={buttonType}
              corners={buttonCorners}
              weight={buttonWeight}
              className="product-cta__button mt-8"
              onClick={addToCart}
              disabled={!variant?.availableForSale}
            >
              {variant?.availableForSale ? buttonText : soldOutText}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default defineBlock({
  component: ProductCta,
  customizerSchema: {
    fields: {
      theme: {
        type: "select",
        options: [
          { label: "Light", value: "themeLight" },
          { label: "Primary light", value: "themePrimaryLight" },
          { label: "Primary", value: "themePrimary" },
          { label: "Dark", value: "themeDark" },
        ],
        preview: "themeLight",
      },
      width: {
        type: "select",
        options: [
          { label: "Boxed", value: "contained" },
          { label: "Full width", value: "full" },
        ],
        preview: "contained",
      },
      buttonType: {
        type: "select",
        options: [
          { label: "Primary", value: "primary" },
          { label: "Secondary", value: "secondary" },
          { label: "Gray", value: "gray" },
          { label: "Link", value: "link" },
          { label: "Link primary", value: "linkPrimary" },
          { label: "Link inverted", value: "linkInverted" },
        ],
        preview: "primary",
      },
      buttonCorners: {
        type: "select",
        options: [
          { label: "None", value: "none" },
          { label: "Small", value: "xs" },
          { label: "Medium", value: "md" },
          { label: "Large", value: "lg" },
          { label: "Full", value: "full" },
        ],
        preview: "none",
      },
      buttonWeight: {
        type: "select",
        options: [
          { label: "Regular", value: "base" },
          { label: "Medium", value: "medium" },
          { label: "Bold", value: "bold" },
        ],
        preview: "medium",
      },
      imageAlignment: {
        type: "select",
        options: [
          { label: "Left", value: "left" },
          { label: "Right", value: "right" },
        ],
        preview: "left",
      },
      imageRatio: {
        type: "select",
        options: [
          { label: "Square", value: "square" },
          { label: "Portrait", value: "portrait" },
        ],
        preview: "square",
      },
      contentAlignment: {
        type: "select",
        options: [
          { label: "Top", value: "top" },
          { label: "Center", value: "center" },
          { label: "Bottom", value: "bottom" },
        ],
        preview: "center",
      },
      titleSize: {
        type: "select",
        options: [
          { label: "Small", value: "md" },
          { label: "Medium", value: "lg" },
          { label: "Large", value: "xl" },
        ],
        preview: "md",
      },
      textAlignment: {
        type: "select",
        options: [
          { label: "Left", value: "left" },
          { label: "Center", value: "center" },
        ],
        preview: "left",
      },
      backgroundColor: { type: "color", label: "Background color" },
      titleColor: { type: "color", label: "Title color" },
      descriptionColor: { type: "color", label: "Text color" },
      priceColor: { type: "color", label: "Price color" },
    },
  },
  contentSchema: {
    fields: {
      productId: {
        type: "text",
        label: "Product ID",
        preview: "7433855598791",
      },
      variantId: {
        type: "text",
        label: "Variant ID",
        preview: "42848196755655",
      },
      image: {
        type: "image",
        label: "Image",
        preview:
          "https://a.storyblok.com/f/145828/3360x1890/b3fc3c826b/image-2.png",
      },
      title: {
        type: "text",
        label: "Title",
        preview: "Minimal black sweater",
        isRequired: false,
        isTranslatable: true,
      },
      description: {
        type: "text",
        label: "Description",
        preview:
          "Our take on one of the classic essentials. Stylish, minimal, got-to-have.",
        isRequired: false,
        isTranslatable: true,
      },
      buttonText: {
        type: "text",
        label: "Button text",
        preview: "Add to cart",
        isTranslatable: true,
        isRequired: true,
      },
      soldOutText: {
        type: "text",
        label: "Button sold out text",
        preview: "Sold out",
        isTranslatable: true,
        isRequired: true,
      },
    },
  },
});
