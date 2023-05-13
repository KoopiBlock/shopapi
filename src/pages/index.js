import Head from 'next/head'

import styles from '../styles/Home.module.css'

import {Product, Header } from '@/components';

export async function getServerSideProps() {

  // to be changed, we dont want this to be seen in client side

  const url = new URL(process.env.URL || 'http://localhost:3000');
  url.pathname = '/api/product';

  const url2 = new URL(process.env.URL || 'http://localhost:3000');
  url2.pathname = '/api/create-cart';


  const productRes = await fetch(url.toString());
  const cartRes =  await fetch(url2.toString());

  

  if (!productRes.ok) {
    console.error(productRes);
    return { props: {} };
  }

  if (!cartRes.ok) {
    console.error(cartRes);
    return { props: {} };
  }

  const data = await productRes.json();

  const cartData = await cartRes.json();

  const products = data.products.edges
    .map(({ node }) => {
      if (node.totalInventory <= 0) {
        return false;
      }

      return {
        id: node.id,
        title: node.title,
        description: node.description,
        imageSrc: node.images.edges[0].node.src,
        imageAlt: node.title,
        price: node.variants.edges[0].node.priceV2.amount,
        slug: node.handle,
        variantId: node.variants.edges[0].node.id
      };
    })
    .filter(Boolean);

    

  return {
    props: { 
      products: products,
      cart: cartData, 
    },
  }
}



export default function Home({products}) {

  

  return (
    <div className={styles.container}>
        <div>
          <Header />
        </div>
        <div>
          <div className={styles.titleContainer}>
            <h1>פה יהיו קטגוריות למוצרים</h1>
          </div>
          <div className={styles.productsSection}>
              {products.map((product) => (
                <Product key={product.id} product={product} />
              ))}
          </div>
        </div>

    </div>
  )
}



