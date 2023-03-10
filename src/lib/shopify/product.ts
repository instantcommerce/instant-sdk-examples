import { gql } from "@instantcommerce/sdk";

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

export type ShopifyVariant = {
  availableForSale: boolean;
  id: string;
  priceV2: MoneyV2;
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
  variants: { edges: { node: ShopifyVariant }[] };
}

export interface ProductConnection {
  product: ShopifyProduct;
}

export const productQuery = gql`
  query getProductById(
    $id: ID!
    $country: CountryCode = ZZ
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    product(id: $id) {
      title
      description
      ... on Product {
        images(first: 1) {
          edges {
            node {
              altText
              url
            }
          }
        }
      }
      ... on Product {
        variants(first: 100) {
          edges {
            node {
              id
              availableForSale
              priceV2 {
                ... on MoneyV2 {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
    }
  }
`;
