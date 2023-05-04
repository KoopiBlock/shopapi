import { postToShopify } from '../../utils/shopify';

export default async function handler(_req, res) {
    const data = await postToShopify({
      query: `
      mutation createCart($cartInput: CartInput) {
        cartCreate(input: $cartInput) {
          cart {
            id
            createdAt
            updatedAt
            lines(first:10) {
              edges {
                node {
                  id
                  quantity
                  merchandise {
                    ...
                  }
                }
              }
            }
            estimatedCost {
              totalAmount {...}
              subtotalAmount {...}
              totalTaxAmount {...}
              totalDutyAmount {...}
            }
          }
        }
      }
      `,
      variables: {
        cartInput: {
            lines: [
              {
                quantity,
                merchandiseId: itemId
              }
            ]
          }
      },
    })

    res.status(200).json(data);

    }