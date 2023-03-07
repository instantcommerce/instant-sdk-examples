import { useState, useEffect } from "react";
import {
  defineBlock,
  useBlockState,
  gql,
  useShopifyClient,
  useCart,
} from "@instantcommerce/sdk";
import cx from "classnames";
import { Button, Paragraph, Title } from "../../components";

import { setBlockTheme, setThemeColors } from "../../config";
import "../../styles/global.css";

interface Product {
  title: string;
  description: string;
  variants: {
    edges: any[];
  };
}

interface Response {
  product: Product;
}

const productQuery = gql`
  query getProductById($id: ID!) {
    product(id: $id) {
      title
      description
      ... on Product {
        variants(first: 100) {
          edges {
            node {
              id
              price
            }
          }
        }
      }
    }
  }
`;

const ProductCta = () => {
  const {
    content: { productId, variantId, image, buttonText },
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
  const { addLine } = useCart();

  const [product, setProduct] = useState<Product>();
  const [price, setPrice] = useState<string>("");

  const loadProduct = async (id: string) => {
    try {
      const result = await shopifyClient.request<Response>(productQuery, {
        id: `gid://shopify/Product/${id}`,
      });

      setProduct(result.product);
    } catch (e) {
      console.log(e);
    }
  };

  const addToCart = async () => {
    try {
      addLine({ productId, variantId, quantity: 1, showModalOnSuccess: true });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (!!productId) {
      loadProduct(productId);
    }
  }, [productId]);

  useEffect(() => {
    if (!!product) {
      const variant = !!variantId
        ? product?.variants?.edges?.find(
            (p) =>
              p?.node?.id?.split("gid://shopify/ProductVariant/")?.[1] ===
              variantId
          )
        : product?.variants?.edges?.[0]?.node;

      setPrice(variant?.node?.price);
    }
  }, [product]);

  return (
    <section className={cx("product-cta", width === "contained" && "px-2")}>
      <div
        className={cx(
          "product-cta__container",
          "section w-full bg-theme-bg flex flex-col",
          width === "contained" && "max-w-7xl mx-auto",
          imageAlignment === "right" && "sm:flex-row-reverse",
          imageAlignment === "left" && "sm:flex-row"
        )}
        style={{
          ...setThemeColors(),
          ...setBlockTheme(theme),
          ...(!!backgroundColor ? { backgroundColor } : {}),
        }}
      >
        {!!image?.filename && (
          <div
            className={cx(
              "product-cta__image",
              "flex-1 bg-cover bg-center",
              imageRatio === "portrait" ? "aspect-[4/5]" : "aspect-square"
            )}
            style={{ backgroundImage: `url(${image?.filename})` }}
          />
        )}

        <div
          className={cx(
            "product-cta__cta-container",
            "flex-1 h-full py-5 lg:py-14 px-3",
            width === "full" && "sm:px-2",
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
              {product?.title}
            </Title>

            {!!product?.description && (
              <Paragraph
                className="product-cta__description mt-1.5 text-theme-subtitle"
                style={{
                  ...(!!descriptionColor ? { color: descriptionColor } : {}),
                }}
              >
                {product?.description}
              </Paragraph>
            )}

            {!!price && (
              <div
                className="product-cta__price mt-1.5 text-theme-text"
                style={{
                  ...(!!priceColor ? { color: priceColor } : {}),
                }}
              >
                {price}
              </div>
            )}

            <Button
              variant={buttonType}
              corners={buttonCorners}
              weight={buttonWeight}
              className="product-cta__button mt-4"
              onClick={addToCart}
            >
              {buttonText}
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
          { label: "Gray", value: "themeGray" },
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
          "https://a.storyblok.com/f/145828/4424x3355/b22d1984af/force-majeure-ggpq78xm8t0-unsplash.jpg",
      },
      buttonText: {
        type: "text",
        label: "Button text",
        preview: "Add to cart",
      },
    },
  },
});
