import { gql } from "@instantcommerce/sdk";
import { ShopifyProduct } from "./product";

export interface ProductsConnection {
  products: { edges: { node: ShopifyProduct }[] };
}

export const productsQuery = gql`
  query products(
    $country: CountryCode = ZZ
    $query: String
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
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
