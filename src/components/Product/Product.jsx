import React from 'react'
import styles from './Product.module.css'
import Image from 'next/image'
import Link from 'next/link'

import { motion } from 'framer-motion'

const Product = ({ product }) => {

    console.log(product)

    const formattedPrice = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      });


    // to abstaract it out
      const addToCart = async () => {

        let localCartData = JSON.parse(
          window.localStorage.getItem('koopiBlock:shopify:cart')

        
        );

        console.log (localCartData)

        if (!localCartData.cartId) {
          console.error('woops there was an error loading zi cart')
          return
        }

        console.log(localCartData.cartId)
        console.log(product.variantId)

         const result = await fetch(`/api/add-to-cart?cartId=${localCartData.cartId}&variantId=${product.variantId}`, {
           method: 'POST', 
         })

         console.log(result)

         if (!result.ok) {
           console.error('There was a problem adding the item to the cart');
           return;
         }

         window.localStorage.setItem('koopiBlock:shopify:status', 'dirty')

    }
    

  return (
    <div className={styles.product}>
      <Link href={`/product/${product.slug}`}>
        <Image src={product.imageSrc} alt={product.imageAlt} width={400} height={400} />
      </Link>
      <h2>{product.title}</h2>
      <p className={styles.price}>{formattedPrice.format(product.price)}</p>
      <div className={styles.ctaContainer}>
        <motion.p className={styles.ctaLink}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
        >
          פרטים נוספים
        </motion.p>
        <motion.button className={styles.ctaLink} onClick={addToCart}
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.2 }}                        
        >
          הוסף לסלסלה
        </motion.button>
      </div>
    </div>
  );
}

export default Product