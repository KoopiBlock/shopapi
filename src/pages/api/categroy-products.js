import { postToShopify } from '../../utils/shopify';

export default async function handler(_req, res) {

    const { categoryId } = _req.query

    console.log(categoryId)


    const data = await postToShopify({
        query: `
            query getProductsByCategory($categoryId: ID!) {
                collection(id: $categoryId) {
                id
                title
                products(first: 100) {
                    edges {
                    node {
                        id
                        title
                        description
                        handle
                        images(first: 1) {
                        edges {
                            node {
                            src
                            altText
                            }
                        }
                        }
                        variants(first: 1) {
                        edges {
                            node {
                            priceV2 {
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
            }
        `,
  variables: { categoryId },
    });

    res.status(200).json(data)

}