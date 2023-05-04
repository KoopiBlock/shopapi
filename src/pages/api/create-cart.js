import { postToShopify } from '../../utils/shopify';

export default async function handler(_req, res) {
    const data = await postToShopify({
        
        query: `
          mutation CreateCart {
              cartCreate {
                cart {                
                  id
                  checkoutUrl
                }
              }
            }
          `,
        variables: {},
      });

    
    res.status(200).json({
      cartId: data?.cartCreate?.cart?.id,
      checkoutUrl: data.cartCreate?.cart?.checkoutUrl,
    });

   

}