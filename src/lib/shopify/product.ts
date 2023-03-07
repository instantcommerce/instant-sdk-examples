import { gql } from "@instantcommerce/sdk";

export interface Product {
  title: string;
  description: string;
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
