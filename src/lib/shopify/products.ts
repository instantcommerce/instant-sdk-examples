import { gql } from '@instantcommerce/sdk';

export type MoneyV2 = {
  amount: any;
  currencyCode: any;
};

type ProductPriceRange = {
  maxVariantPrice: MoneyV2;
  minVariantPrice: MoneyV2;
};

type ImageConnection = {
  edges: {
    node: {
      altText?: string;
      height?: number;
      id?: string;
      url: any;
      width?: number;
    };
  }[];
};

export interface ShopifyProduct {
  availableForSale: boolean;
  compareAtPriceRange: ProductPriceRange;
  description: string;
  handle: string;
  id: string;
  images: ImageConnection;
  priceRange: ProductPriceRange;
  productType: string;
  tags: string[];
  title: string;
  vendor: string;
}

export interface ShopifyProducts {
  products: { edges: { node: ShopifyProduct }[] };
}

export const productsQuery = gql`
  query products(
    $query: String
  ) {
    products(first: 10, query: $query) {
      edges {
        node {
          id
          title
          description
          handle
          vendor
          productType
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
            maxVariantPrice {
              amount
              currencyCode
            }
          }
          compareAtPriceRange {
            minVariantPrice {
              amount
              currencyCode
            }
            maxVariantPrice {
              amount
              currencyCode
            }
          }
          availableForSale
          tags
          images(first: 2) {
            edges {
              node {
                id
                url
                altText
                width
                height
              }
            }
          }
        }
      }
    }
  }
`;
