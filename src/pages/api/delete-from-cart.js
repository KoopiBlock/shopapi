import { postToShopify } from '../../utils/shopify';

/*
    mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
  cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
    cart {
      # Cart fields
    }
    userErrors {
      field
      message
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

     const ProductNum = variantId.slice(22)
     const  realProductId  = `gid://shopify/CartLine/${ProductNum}`

    console.log(cartId, variantId)
    console.log(realCartId, realProductId)


    const data = await postToShopify({
        query: `
        mutation RemoveFromCart($realCartId: ID!, $realProductId: ID!) {
                cartLinesRemove(cartId: $realCartId, lineIds: [$realProductId] ){
                    cart  {
                        lines(first: 100) {
                            edges {
                                node {
                                id
                                quantity
                            
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