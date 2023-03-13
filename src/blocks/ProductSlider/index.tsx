import { useEffect, useState } from "react";
import {
  defineBlock,
  useShopifyClient,
  useBlockState,
  useRequestData,
} from "@instantcommerce/sdk";
import cx from "classnames";

// import { variantStyles as buttonVariantStyles } from '~/components/Button/buttonStyles';
import { Container, Paragraph, ProductCard } from "~/components";
import { setStoreColors, setSectionTheme } from "~/config";
import { ProductsConnection, productsQuery } from "~/lib/shopify";
import "~/styles/global.scss";

import "./product-slider.scss";

const ProductSlider = () => {
  const {
    content: { productTitles, productTags, ...headerContent },
    customizer: {
      backgroundColor,
      theme,
      width,
      // product card
      imageAspectRatio,
      imageFillBehavior,
      productLabelPosition,
      hoverEffect,
      pretitleType,
      textAlignment,
      textSize,
      descriptionType,
      sliderButtonType,
      ...headerCustomizations
    },
  } = useBlockState();
  // Coming soon: refs
  // const sliderRef = useRef<HTMLDivElement>(null);
  const { locale, country } = useRequestData();
  const shopifyClient = useShopifyClient();

  const [products, setProducts] = useState<ProductsConnection["products"]>();
  const [isLoading, setIsLoading] = useState(true);

  const loadProductsByTag = async () => {
    try {
      let query;
      const productTagsQuery = productTags
        ?.split(",")
        ?.map((tag: string) => `tag:"${tag}"`)
        ?.join(" OR ");
      const productTitlesQuery = productTitles
        ?.split(",")
        ?.map((title: string) => `title:"${title}"`)
        ?.join(" OR ");

      if (productTags && productTitles) {
        query = [productTagsQuery, productTitlesQuery]?.join(" OR ");
      } else if (productTags) {
        query = productTagsQuery;
      } else if (productTitles) {
        query = productTitlesQuery;
      }

      const result = await shopifyClient.request<ProductsConnection>(
        productsQuery,
        {
          query,
          country,
          language: locale.toUpperCase(),
        }
      );

      setProducts(result.products);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    loadProductsByTag();
    setIsLoading(false);
  }, [productTags, productTitles]);

  // Coming soon: slider buttons
  // const onButtonClick = useCallback(
  //   (type: 'previous' | 'next') => {
  //     if (sliderRef.current) {
  //       const slideScrollPosition =
  //         type === 'next'
  //           ? sliderRef.current.scrollLeft + 1
  //           : sliderRef.current.scrollLeft - 1;

  //       sliderRef.current.scrollTo({
  //         left: slideScrollPosition
  //       });
  //     }
  //   },
  //   [sliderRef]
  // );

  return (
    <Container
      backgroundColor={backgroundColor}
      className="!px-0"
      headerProps={{
        ...headerContent,
        ...headerCustomizations,
        theme,
        className: cx(
          "px-4",
          width === "contained" ? "max-w-7xl mx-auto" : "max-w-none"
        ),
      }}
      wrapperClassName="product-slider__container"
      wrapperStyle={{
        ...setStoreColors(),
        ...setSectionTheme(theme),
      }}
    >
      {!isLoading && (
        <>
          {products?.edges && products?.edges?.length > 0 ? (
            <div
              className={cx(
                "slider",
                width === "contained"
                  ? "slider--contained"
                  : "slider--fullWidth"
              )}
            >
              <div
                className={cx("slider__inner flex gap-8")}
                id="product-slider"
              >
                {products.edges.map((product) => (
                  <ProductCard
                    {...{
                      imageAspectRatio,
                      imageFillBehavior,
                      productLabelPosition,
                      hoverEffect,
                      pretitleType,
                      textAlignment,
                      textSize,
                      descriptionType,
                    }}
                    product={product?.node}
                    className="min-w-[280px] w-[280px] snap-start"
                    key={product?.node?.id}
                  />
                ))}
              </div>

              {/* Coming soon: slider buttons */}
              {/* <Button
            variant={sliderButtonType}
            className="slider__button slider__button--prev"
            onClick={() => onButtonClick('prev')}
          >
            Prev
          </Button>

          <Button
            variant={sliderButtonType}
            className="slider__button slider__button--next"
            onClick={() => onButtonClick('next')}
          >
            Next
          </Button> */}
            </div>
          ) : (
            <Paragraph
              as="p"
              size="md"
              className={cx(
                "product-slider__none-found text-theme-subtitle w-full px-4",
                headerCustomizations?.alignment === "center"
                  ? "text-center"
                  : "text-left",
                width === "contained" ? "max-w-7xl mx-auto" : "max-w-none"
              )}
              style={
                !!headerCustomizations?.subtitleColor
                  ? { color: headerCustomizations?.subtitleColor }
                  : {}
              }
            >
              No products found
            </Paragraph>
          )}
        </>
      )}
    </Container>
  );
};

export default defineBlock({
  component: ProductSlider,
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
        preview: "themeDark",
      },
      width: {
        type: "select",
        options: [
          { label: "Boxed", value: "contained" },
          { label: "Full width", value: "full" },
        ],
        preview: "contained",
      },
      headerAlignment: {
        type: "select",
        options: [
          { label: "Left", value: "left" },
          { label: "Center", value: "center" },
        ],
        preview: "left",
      },
      headerSize: {
        type: "select",
        options: [
          { label: "Small", value: "md" },
          { label: "Medium", value: "lg" },
          { label: "Large", value: "xl" },
        ],
        preview: "md",
      },
      pretitleColor: { type: "color", label: "Pretitle color" },
      titleColor: { type: "color", label: "Title color" },
      subtitleColor: { type: "color", label: "Description color" },
      backgroundColor: { type: "color", label: "Background color" },
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
      buttonLocation: {
        type: "select",
        options: [
          { label: "Top", value: "top" },
          { label: "Bottom", value: "bottom" },
        ],
        preview: "top",
      },
      dividerColor: { type: "color", label: "Divider color" },
      hasDivider: { type: "toggle", label: "Has divider", preview: false },
      // Product slider
      // Coming soon: slider buttons
      // sliderButtonType: {
      //   type: 'select',
      //   options: [
      //     { label: 'Light', value: 'gray' },
      //     { label: 'Primary', value: 'primary' },
      //     { label: 'Secondary', value: 'secondary' },
      //     { label: 'Dark', value: 'dark' }
      //   ],
      //   preview: 'gray'
      // },
      // Product card
      imageAspectRatio: {
        type: "select",
        options: [
          { label: "Landscape", value: "landscape" },
          { label: "Portrait", value: "portrait" },
          { label: "Square", value: "square" },
        ],
        preview: "square",
      },
      imageFillBehavior: {
        type: "select",
        options: [
          { label: "Contain", value: "contain" },
          { label: "Cover", value: "cover" },
        ],
        preview: "cover",
      },
      productLabelPosition: {
        type: "select",
        options: [
          { label: "Bottom image", value: "bottomImage" },
          { label: "Bottom left image", value: "bottomLeftImage" },
          { label: "Top left image", value: "topLeftImage" },
          { label: "None", value: "none" },
        ],
        preview: "topLeftImage",
      },
      hoverEffect: {
        type: "select",
        options: [
          { label: "None", value: "none" },
          { label: "Second image", value: "secondImage" },
          { label: "Zoom", value: "zoom" },
        ],
        preview: "none",
      },
      // hasRating: { type: 'toggle', label: 'Has rating', preview: false },
      pretitleType: {
        type: "select",
        options: [
          { label: "None", value: "none" },
          { label: "Product type", value: "productType" },
          { label: "Vendor", value: "vendor" },
        ],
        preview: "vendor",
      },
      textAlignment: {
        type: "select",
        options: [
          { label: "Left", value: "left" },
          { label: "Center", value: "center" },
        ],
        preview: "left",
      },
      textSize: {
        type: "select",
        options: [
          { label: "Small", value: "sm" },
          { label: "Medium", value: "md" },
          { label: "Large", value: "lg" },
        ],
        preview: "md",
      },
      descriptionType: {
        type: "select",
        options: [
          { label: "Description", value: "description" },
          { label: "None", value: "none" },
        ],
        preview: "none",
      },
    },
  },
  contentSchema: {
    fields: {
      pretitle: {
        type: "text",
        label: "Pretitle",
        isTranslatable: true,
      },
      title: {
        type: "text",
        label: "Title",
        preview: "Best selling items",
        isTranslatable: true,
      },
      subtitle: {
        type: "text",
        label: "Description",
        preview: "Our most popular items from softshell materials.",
        isTranslatable: true,
      },
      buttons: {
        type: "subschema",
        allowed: ["button"],
        max: 1,
        preview: [
          {
            subschema: "button",
            value: {
              text: "Discover all",
              link: "https://a.storyblok.com/f/145828/5000x3333/564e281ca1/force-majeure-du8abwm5z2g-unsplash.jpg",
            },
          },
        ],
      },
      productTitles: {
        type: "text",
        label: "Product titles",
        description:
          "Display products matching this title. Can be multiple (comma-separated). Will be hidden if no products are found. ",
        isTranslatable: true,
      },
      productTags: {
        type: "text",
        label: "Product tag",
        description:
          "Display products matching this tag. Can be multiple (comma-separated). Can be a metafield with a tag as value. Will be hidden if no products are found.",
        isTranslatable: true,
      },
    },
    subschemas: {
      button: {
        fields: {
          text: {
            type: "text",
            label: "Text",
            isTranslatable: true,
            isRequired: true,
            maxLength: 40,
          },
          link: {
            type: "link",
            label: "Link",
            isTranslatable: true,
            isRequired: true,
          },
        },
      },
    },
  },
});
