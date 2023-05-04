import Head from 'next/head'
import React from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'

import styles from './Layout.module.css'


const Layout = ({ children }) => {
  return ( 
    <div className={styles.layout}>
        <Head>
            <title>My Shop</title>
        </Head>
        <header className={styles.stickyNavbar}>
            <Navbar />
        </header>
        <main>
            {children}
        </main>
        <footer>
            <Footer />
        </footer>
    </div>
  )
}

export default Layout