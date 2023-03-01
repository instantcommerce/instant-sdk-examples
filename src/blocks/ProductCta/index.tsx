import { useState, useEffect } from "react";
import {
  defineBlock,
  useBlockState,
  gql,
  useShopifyClient,
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
    content: { productId, variantID, image },
    customizer: {
      theme,
      variant,
      width,
      buttonType,
      imageAlignment,
      imageRatio,
      contentAlignment,
      textAlignment,
      backgroundColor,
    },
  } = useBlockState();

  const shopifyClient = useShopifyClient();

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

  useEffect(() => {
    if (!!productId) {
      loadProduct(productId);
    }
  }, [productId]);

  useEffect(() => {
    if (!!product) {
      const variant = !!variantID
        ? product?.variants?.edges?.find(
            (p) =>
              p?.node?.id?.split("gid://shopify/ProductVariant/")?.[1] ===
              variantID
          )
        : product?.variants?.edges?.[0]?.node;

      setPrice(variant?.price);
    }
  }, [product]);

  console.log(product);

  // price is in what currency ? D:
  // how to handle variants ?
  // add to cart functionality missing

  return (
    <section className={cx("product-cta", width === "contained" && "px-2")}>
      <div
        className={cx(
          "section w-full bg-theme-bg flex flex-col",
          width === "contained" && "max-w-7xl mx-auto",
          // "h-[640px]",
          imageAlignment === "right" && "sm:flex-row-reverse",
          imageAlignment === "left" && "sm:flex-row",
          imageAlignment === "bg" && "bg-cover py-[92px]"
        )}
        style={{
          ...setThemeColors(),
          ...setBlockTheme(theme),
          ...(!!backgroundColor ? { backgroundColor } : {}),
          ...(imageAlignment === "bg"
            ? { backgroundImage: `url(${image?.filename})` }
            : {}),
        }}
      >
        {!!image?.filename && imageAlignment !== "bg" && (
          <div
            className={cx(
              "flex-1 bg-cover bg-center",
              imageRatio === "portrait" ? "aspect-[4/5]" : "aspect-square"
            )}
            style={{ backgroundImage: `url(${image?.filename})` }}
          />
        )}

        <div
          className={cx(
            "flex-1 h-full py-5 lg:py-14 px-3",
            width === "full" && "sm:px-2",
            contentAlignment === "center" && "self-center",
            contentAlignment === "bottom" && "self-end",
            textAlignment === "center" && "text-center",
            variant === "block" && "bg-theme-bg"
          )}
        >
          <div className="max-w-[352px] mx-auto h-full flex flex-col justify-center">
            <Title as="h2" className="text-theme-title">
              {product?.title}
            </Title>

            <Paragraph className="mt-1.5 text-theme-subtitle">
              {product?.description}
            </Paragraph>

            <div className="mt-1.5 text-theme-text">{price}</div>

            <Button variant={buttonType} className="mt-4">
              Add to cart
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
      variant: {
        type: "select",
        options: [
          { label: "Simple", value: "simple" },
          { label: "Block overlay", value: "block" },
          { label: "Overlay", value: "overlay" },
        ],
        preview: "simple",
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
      imageAlignment: {
        type: "select",
        options: [
          { label: "Left", value: "left" },
          { label: "Right", value: "right" },
          { label: "Background", value: "bg" },
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
      textAlignment: {
        type: "select",
        options: [
          { label: "Left", value: "left" },
          { label: "Center", value: "center" },
        ],
        preview: "left",
      },
      backgroundColor: { type: "color", label: "Background color" },
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
    },
  },
});
