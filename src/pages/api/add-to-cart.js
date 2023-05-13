import { postToShopify } from '../../utils/shopify';

/*
      mutation AddToCart($cartId: ID!, $variantId: ID!) {
        cartLinesAdd(cartId: $cartId, lines: [{ quantity: 1, merchandiseId: $variantId}]) {
          cart {
            lines(first: 100) {
              edges {
                node {
                  id
                  quantity
                  merchandise {
                    ... on ProductVariant {
                      product {
                        title
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
*/

export default async function handler(_req, res) {

    // create event to trigger cart state to open!

    console.log(_req.query)


    const { cartId, variantId } =  _req.query

     const cartNum = cartId.slice(18)
     const  realCartId  = `gid://shopify/Cart/${cartNum}`

     const ProductNum = variantId.slice(28)
     const  realProductId  = `gid://shopify/ProductVariant/${ProductNum}`

    console.log(cartId, variantId)
    console.log(realCartId, realProductId)


    const data = await postToShopify({
        query: `
            mutation AddToCart($realCartId: ID!, $realProductId: ID!) {
                cartLinesAdd(cartId: $realCartId, lines: [{ quantity: 1, merchandiseId: $realProductId}]) {
                cart {
                    lines(first: 100) {
                    edges {
                        node {
                        id
                        quantity
                        merchandise {
                            ... on ProductVariant {
                            product {
                                title
                            }
                            }
                        }
                        }
                    }
                    }
                }
                }
            }
        `,
        variables: { realCartId, realProductId },
    })

    console.log(data)
    
    res.status(200).json(data);

}