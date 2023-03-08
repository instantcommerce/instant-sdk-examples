import { gql } from "@instantcommerce/sdk";

export interface Product {
  title: string;
  description: string;
  images: {
    edges: any[];
  };
  variants: {
    edges: any[];
  };
}

export interface ProductResponse {
  product: Product;
}

export const productQuery = gql`
  query getProductById($id: ID!) {
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
