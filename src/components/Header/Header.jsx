import React from 'react'
import Image from 'next/image'
import backgroundImg from '../../../public/backgorund.png'
import coolPic from '../../../public/cool.jpg'
import styles from './Header.module.css' 

// add props

// add state wich check for witdh and changes acoording to screen width

const headerStyle ={
  width: "100%",
  height: "100%",
  backgroundSize: "cover", 
  backgroundPosition: "center",
  transition: '200ms opacity ease-in-out',
  transitionDelay: '200ms',
  backgroundImage: `url(${backgroundImg.src})`,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}

const Header = () => {
  return (
    <div className={styles.sectionContainer}>
        <div style={headerStyle} className={styles.headerConatiner} >
          <h1 className={styles.headerTitle}>מכשירי טעינה</h1>       
        </div>      
    </div>
  )
}

export default Header