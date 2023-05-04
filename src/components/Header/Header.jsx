import React from 'react'
import Image from 'next/image'

import coolPic from '../../../public/cool.jpg'
import styles from './Header.module.css'

// add props

// add state wich check for witdh and changes acoording to screen width

const Header = () => {
  return (
    <div className={styles.sectionContainer}>
        <div className={styles.headerContainer}>
            
                <Image
                    className={styles.header}
                    src={coolPic}
                    alt='This is a header'
                    style={{width: '100%', height: '100%', }}
                />

        </div>
      
    </div>
  )
}

export default Header