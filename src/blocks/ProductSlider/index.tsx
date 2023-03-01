import { defineBlock, useBlockState } from '@instantcommerce/sdk';
import cx from 'classnames';

import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';

import { variantStyles as buttonVariantStyles } from '../../components/Button/buttonStyles';
import { Button, Container, ProductCard } from '../../components';
import { setThemeColors, setBlockTheme } from '../../config';
import { ShopifyProducts, productsQuery } from '../../lib/shopify';

import '../../styles/global.css';

import { useShopifyClient } from '@instantcommerce/sdk';
import { useEffect, useState } from 'react';

const ProductSlider = () => {
  const {
    content: { productTag, ...headerContent },
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
    }
  } = useBlockState();
  const swiper = useSwiper();

  const shopifyClient = useShopifyClient();

  const [products, setProducts] = useState<ShopifyProducts['products']>();

  const loadProducts = async () => {
    try {
      const result = await shopifyClient.request<ShopifyProducts>(
        productsQuery,
        { query: productTag && `tag:${productTag}` }
      );

      setProducts(result.products);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <Container
      backgroundColor={backgroundColor}
      className={width === 'contained' ? 'max-w-7xl' : 'max-w-none'}
      headerProps={{ ...headerContent, ...headerCustomizations, theme }}
      wrapperClassName="product-slider"
      wrapperStyle={{
        ...setThemeColors(),
        ...setBlockTheme(theme)
      }}
    >
      {/* <Button variant={sliderButtonType || 'gray'}>Next</Button>
      <Button variant={sliderButtonType || 'gray'}>Prev</Button> */}
      {!!products?.edges?.[0]?.node?.title && (
        <Swiper
          navigation
          className="w-full"
          breakpoints={{
            768: { slidesPerView: 1.1, spaceBetween: 16 },
            1024: { slidesPerView: 2.1, spaceBetween: 16 },
            1280: { slidesPerView: 4, spaceBetween: 32 }
          }}
        >
          {products.edges.map((product) => (
            <SwiperSlide key={product?.node?.id}>
              <ProductCard
                {...{
                  imageAspectRatio,
                  imageFillBehavior,
                  productLabelPosition,
                  hoverEffect,
                  pretitleType,
                  textAlignment,
                  textSize,
                  descriptionType
                }}
                product={product?.node}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </Container>
  );
};

export default defineBlock({
  component: ProductSlider,
  customizerSchema: {
    fields: {
      theme: {
        type: 'select',
        options: [
          { label: 'Light', value: 'themeLight' },
          { label: 'Gray', value: 'themeGray' },
          { label: 'Primary light', value: 'themePrimaryLight' },
          { label: 'Primary', value: 'themePrimary' },
          { label: 'Dark', value: 'themeDark' }
        ],
        preview: 'themeDark'
      },
      width: {
        type: 'select',
        options: [
          { label: 'Boxed', value: 'contained' },
          { label: 'Full width', value: 'full' }
        ],
        preview: 'contained'
      },
      headerAlignment: {
        type: 'select',
        options: [
          { label: 'Left', value: 'left' },
          { label: 'Center', value: 'center' }
        ],
        preview: 'left'
      },
      headerSize: {
        type: 'select',
        options: [
          { label: 'Small', value: 'md' },
          { label: 'Medium', value: 'lg' },
          { label: 'Large', value: 'xl' }
        ],
        preview: 'md'
      },
      pretitleColor: { type: 'color', label: 'Pretitle color' },
      titleColor: { type: 'color', label: 'Title color' },
      subtitleColor: { type: 'color', label: 'Description color' },
      backgroundColor: { type: 'color', label: 'Background color' },
      buttonType: {
        type: 'select',
        options: [
          { label: 'Primary', value: 'primary' },
          { label: 'Secondary', value: 'secondary' },
          { label: 'Gray', value: 'gray' },
          { label: 'Link', value: 'link' },
          { label: 'Link primary', value: 'linkPrimary' },
          { label: 'Link inverted', value: 'linkInverted' }
        ],
        preview: 'primary'
      },
      buttonCorners: {
        type: 'select',
        options: [
          { label: 'None', value: 'none' },
          { label: 'Small', value: 'xs' },
          { label: 'Medium', value: 'md' },
          { label: 'Large', value: 'lg' },
          { label: 'Full', value: 'full' }
        ],
        preview: 'none'
      },
      buttonWeight: {
        type: 'select',
        options: [
          { label: 'Regular', value: 'base' },
          { label: 'Medium', value: 'medium' },
          { label: 'Bold', value: 'bold' }
        ],
        preview: 'medium'
      },
      buttonLocation: {
        type: 'select',
        options: [
          { label: 'Top', value: 'top' },
          { label: 'Bottom', value: 'bottom' }
        ],
        preview: 'top'
      },
      dividerColor: { type: 'color', label: 'Divider color' },
      hasDivider: { type: 'toggle', label: 'Has divider', preview: false },
      // Product slider
      sliderButtonType: {
        type: 'select',
        options: [
          { label: 'Light', value: 'gray' },
          { label: 'Primary', value: 'primary' },
          { label: 'Secondary', value: 'secondary' },
          { label: 'Dark', value: 'dark' }
        ],
        preview: 'gray'
      },
      // Product card
      imageAspectRatio: {
        type: 'select',
        options: [
          { label: 'Landscape', value: 'landscape' },
          { label: 'Portrait', value: 'portrait' },
          { label: 'Square', value: 'square' }
        ],
        preview: 'square'
      },
      imageFillBehavior: {
        type: 'select',
        options: [
          { label: 'Contain', value: 'contain' },
          { label: 'Cover', value: 'cover' }
        ],
        preview: 'cover'
      },
      productLabelPosition: {
        type: 'select',
        options: [
          { label: 'Bottom image', value: 'bottomImage' },
          { label: 'Bottom left image', value: 'bottomLeftImage' },
          { label: 'Top left image', value: 'topLeftImage' },
          { label: 'None', value: 'none' }
        ],
        preview: 'topLeftImage'
      },
      hoverEffect: {
        type: 'select',
        options: [
          { label: 'None', value: 'none' },
          { label: 'Second image', value: 'secondImage' },
          { label: 'Zoom', value: 'zoom' }
        ],
        preview: 'none'
      },
      // hasRating: { type: 'toggle', label: 'Has rating', preview: false },
      pretitleType: {
        type: 'select',
        options: [
          { label: 'None', value: 'none' },
          { label: 'Product type', value: 'productType' },
          { label: 'Vendor', value: 'vendor' }
        ],
        preview: 'vendor'
      },
      textAlignment: {
        type: 'select',
        options: [
          { label: 'Left', value: 'left' },
          { label: 'Center', value: 'center' }
        ],
        preview: 'left'
      },
      textSize: {
        type: 'select',
        options: [
          { label: 'Small', value: 'sm' },
          { label: 'Medium', value: 'md' },
          { label: 'Large', value: 'lg' }
        ],
        preview: 'md'
      },
      descriptionType: {
        type: 'select',
        options: [
          { label: 'Description', value: 'description' },
          { label: 'None', value: 'none' }
        ],
        preview: 'none'
      }
    }
  },
  contentSchema: {
    fields: {
      pretitle: {
        type: 'text',
        label: 'Pretitle',
        preview: 'Hero pretitle',
        isTranslatable: true
      },
      title: {
        type: 'text',
        label: 'Title',
        preview: 'Hero title',
        isTranslatable: true
      },
      subtitle: {
        type: 'text',
        label: 'Description',
        preview:
          'Hero subtitle dolor sit amet, consectetur adipiscing elit. Cras dui ligula, sollicitudin eu scelerisque non, ullamcorper sit amet massa. Aliquam et neque malesuada, tempus lorem gravida, rutrum urna.',
        isTranslatable: true
      },
      buttons: {
        type: 'subschema',
        allowed: ['button'],
        max: 1,
        preview: [
          {
            subschema: 'button',
            value: {
              text: 'Button text',
              link: 'https://a.storyblok.com/f/145828/5000x3333/564e281ca1/force-majeure-du8abwm5z2g-unsplash.jpg'
            }
          }
        ]
      },
      productTag: {
        type: 'text',
        label: 'Product tag',
        preview: 'best sellers,sale',
        isTranslatable: true
      }
    },
    subschemas: {
      button: {
        fields: {
          text: {
            type: 'text',
            label: 'Text',
            isTranslatable: true,
            isRequired: true,
            maxLength: 40
          },
          link: {
            type: 'link',
            label: 'Link',
            isTranslatable: true,
            isRequired: true
          }
        }
      }
    }
  }
});
