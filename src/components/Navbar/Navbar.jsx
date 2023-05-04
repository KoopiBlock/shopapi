import Link from 'next/link'
import Image from 'next/image'
import {AiOutlineClose, AiOutlineMenu, AiOutlineShopping, } from 'react-icons/ai'
import styles from './Navbar.module.css'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence, delay } from 'framer-motion'
import Cart from '../Cart/Cart'
 
const Navbar = () => {

    const [screenWidth, setScreenWidth] = useState(0)
    const [isMobile, setIsMobile] = useState(false)
    const [open, setOpen] = useState(false)

    //cart bellow:

    const [cart, setCart] = useState({ id: null, lines: [] });
    const [cartOpen, setCartOpen] = useState(false);
  
    
    useEffect(() => {
       function watchWidth()  {     
        setScreenWidth(window.innerWidth)
       }

       window.addEventListener("resize", watchWidth)
       watchWidth()
      
    }, [])

    useEffect(() => {

        function mobileScreen() {
            if (screenWidth < 830)  {
                setIsMobile(true)
            } else {
                setIsMobile(false)
                setOpen(false)
            }
        }

        mobileScreen()

    }, [screenWidth])

    useEffect(() => {
      
      const getCart = async () => {

          let localCartData = JSON.parse(
              window.localStorage.getItem('koopiBlock:shopify:cart')
          );

          if (localCartData) {

              const cartObj = localCartData

              const exsitingCart = await fetch(`/api/load-cart?cartId=${cartObj.cartId}`
              ).then((res) => res.json())

              setCart({
                  id: localCartData.cartId,
                  checkoutUrl: localCartData.checkoutUrl,
                  estimatedCost: exsitingCart.body.cart.estimatedCost.totalAmount,
                  lines: exsitingCart.body.cart.lines?.edges,
              })

              console.log(exsitingCart.body.cart.estimatedCost.totalAmount)

              return;           

              
          }

          localCartData = await fetch(`/api/create-cart`).then((res) => res.json()) 

          console.log(localCartData)

          setCart({
              id: localCartData.cartId,
              checkoutUrl: localCartData.checkoutUrl,
              estimatedCost: null,
              lines: [],
          })

          window.localStorage.setItem(
              'koopiBlock:shopify:cart',
              JSON.stringify(localCartData),
            );
      }

      getCart();

      const interval = setInterval(() => {

          const state = window.localStorage.getItem('koopiBlock:shopify:status');
    
          if (state && state === 'dirty') {
            getCart();
            window.localStorage.setItem('koopiBlock:shopify:status', 'clean');
          }

        }, 500);
      
      return () => clearInterval(interval);

  }, [])


  const addToCart = async (variantId) => {

    let localCartData = JSON.parse(
      window.localStorage.getItem('koopiBlock:shopify:cart')   
    );

    console.log(variantId)

    const result = await fetch(`/api/add-to-cart?cartId=${localCartData.cartId}&variantId=${variantId}`, {
           method: 'POST', 
    })

    window.localStorage.setItem('koopiBlock:shopify:status', 'dirty')

    
}

  


    const toggleCart = () => {
      setCartOpen(!cartOpen);
      console.log(cartOpen)
    } 

    console.log(cart)

    const menuOpen = () => {
        setOpen(!open)
    }

    const menuClose = () => {
      setOpen(false)
    }

    // this to shekelzzz

    const formattedPrice = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    });

    const toggledecrease = (quantity) => {

    }

    const toggleIncrease = (variantId) => {
        console.log(variantId)
    }

    const animMenu = {
      exit: {
        opacity: 0,
        height: 0,
        transtion: {
          ease: "easeInOut",
          duration:0.3,
          delay: 1.2,
        }
      }
    }

    


    
    
  return (
    <>
        <header className={styles.navbar}>
        <div>
          <div>
            { cartOpen ?    

                <div className={styles.menuIcon} onClick={toggleCart}> 
                      <AiOutlineShopping />
                </div>        
            :
                <div className={styles.menuIcon} onClick={toggleCart}>
                      <AiOutlineClose />
                </div>
                
            }
          </div>
        </div>        
        <div className={styles.logoContainer}>  
          <h3 className={styles.logo}>
            <Link href="/" className={styles.logoLink} onClick={menuClose} >KOOPI BLOCKS</Link>
          </h3>
        </div>
        { isMobile ? 
        <>

        { open ?
         <>
            <div>
                <AiOutlineClose className={styles.menuIcon} onClick={menuOpen}/>
            </div>
            
         </>
         :
         <>
            <div>
                <AiOutlineMenu className={styles.menuIcon} onClick={menuOpen}/>
            </div>
         </>
         }
        
        </> 
        :   
        <>
        <div className={styles.menuContainer}>
            <ul className={styles.linksList}>
              <motion.li className={styles.linkWrap}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <Link href="/" className={styles.link}>התקנות</Link>
              </motion.li>
              <motion.li className={styles.linkWrap}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <Link href="/" className={styles.link}>אודותנו</Link>
              </motion.li>
              <motion.li className={styles.linkWrap}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <Link href="/" className={styles.link}>מידע מקצועי</Link>
              </motion.li>
              <motion.li className={styles.linkWrap}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <Link href="/" className={styles.link}>חנות</Link>
              </motion.li>
              <motion.li className={styles.linkWrap} 
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <Link href="/" className={styles.link} id={styles.cta}>צרו קשר 📞</Link> 
              </motion.li>
            </ul>
          </div>
        </>}
     
       </header>
       <AnimatePresence>

        {/* this mobile menues when opened! */}

       {open &&
        
        <>
          <motion.div
           className={styles.MobileMenuContainer}
           onClick={menuClose}
           variants={animMenu}
           initial={{height: 0, opacity: 0}}
           animate={{height: "100vh", opacity:1}}
           transition={{duration: .5}}
           exit="exit"
          >
              <ul className={styles.MobileLinksList}>
                  <motion.li className={styles.MobileLinkWrap} onClick={menuClose}
                     initial={{y:80,opacity:0}}
                     animate={{y:0, opacity:1}}
                     transition={{delay:.8}}
                     exit={{
                      opacity:0,
                      y:90,
                        transition:{
                          ease:"easeInOut",
                          delay:1
                        }
                     }}
                  >
                      <Link href="/" className={styles.link}>חנות</Link>
                  </motion.li>
                  <motion.li className={styles.MobileLinkWrap} onClick={menuClose}
                    initial={{y:80,opacity:0}}
                    animate={{y:0, opacity:1}}
                    transition={{delay:.7}}
                    exit={{
                     opacity:0,
                     y:90,
                       transition:{
                         ease:"easeInOut",
                         delay:.8
                       }
                    }}
                  >
                      <Link href="/" className={styles.link}>אודותנו</Link>
                  </motion.li>
                  <motion.li className={styles.MobileLinkWrap} onClick={menuClose}
                    initial={{y:80,opacity:0}}
                    animate={{y:0, opacity:1}}
                    transition={{delay:.6}}
                    exit={{
                     opacity:0,
                     y:90,
                       transition:{
                         ease:"easeInOut",
                         delay:.6
                       }
                    }}
                  >
                      <Link href="/" className={styles.link}>מידע מקצועי</Link>
                  </motion.li>
                  <motion.li className={styles.MobileLinkWrap} onClick={menuClose}
                    initial={{y:80,opacity:0}}
                    animate={{y:0, opacity:1}}
                    transition={{delay:.5}}
                    exit={{
                     opacity:0,
                     y:90,
                       transition:{
                         ease:"easeInOut",
                         delay:.4
                       }
                    }}
                  >
                      <Link href="/" className={styles.link}>התקנות</Link>
                  </motion.li>
                  <motion.li className={styles.MobileLinkWrap} onClick={menuClose}
                    initial={{y:80,opacity:0}}
                    animate={{y:0, opacity:1}}
                    transition={{delay:.4}}
                    exit={{
                     opacity:0,
                     y:90,
                       transition:{
                         ease:"easeInOut",
                         delay:.2
                       }
                    }}
                  >
                      <Link href="/" className={styles.link} id={styles.cta} onClick={menuClose}>צרו קשר 📞</Link> 
                  </motion.li>
              </ul>
          </motion.div>
        </>
       }

       {/* this mobile cart when opened! */}

       { cartOpen ? 
                <></>
                :
                <div className={styles.cartContainer}>
                    <h1 className={styles.cartTitle}>
                        :הסלסלה שלך
                    </h1>
                    <ul className={styles.cartList}>
                        {cart.lines.map(({ node: item }) => (
                            <li key={item.merchandise?.id} className={styles.cartListItem}>
                              <div className={styles.productContainer}>
                                <div>
                                  {item.merchandise?.product?.images.edges.map(({ node: image }) => (
                                    <Image
                                      key={image.url}
                                      src={image.url}
                                      alt={'imagine'}
                                      width={100}
                                      height={100}
                                    />
                                  ))}
                                </div>
                                <div>
                                  <p className={styles.product}>
                                      {item.quantity} &times; {item.merchandise?.product?.title}
                                  </p>
                                  <p className={styles.productsPrice}>
                                      {item.quantity * item.merchandise?.priceV2.amount}
                                  </p>
                                  <div>
                                    <button onClick={() => addToCart(item.merchandise?.id)}>+</button>
                                    <p>{item.quantity}</p>
                                    <button onClick={toggledecrease}>-</button>
                                  </div>
                                </div>
                              </div>
                            </li>
                        ))}
                        <li className={styles.cartListItem}>
                            <p className={styles.totalPrice}>סהכ לתשלום: {cart.estimatedCost?.amount} </p>
                        </li>
                    </ul>
                    <div className={styles.containerCont}>
                      <div className={styles.buttonContainer}>
                          <Link  href={`${cart.checkoutUrl}`}>
                              <p className={styles.ctaButton} >מעבר לתשלום</p> 
                          </Link>
                      </div>
                    </div>
                    
                </div>
            }    

       </AnimatePresence>
    </>
  )
}

export default Navbar