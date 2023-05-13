import React from 'react'
import { FaYoutube } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";

import styles from './Footer.module.css';

const Footer = () => {
  return (
    <div className={styles.footer}>
        <div className={styles.supportCont}>
            <h1 className={styles.supporTitle}>Customer support</h1>
            <div className={styles.LinksCont}>
                <p className={styles.supLinks}>Email: example@domain</p>
                <p className={styles.supLinks}>Whatsapp: 97278438473</p>
            </div>
        </div>


        <div className={styles.row}>
            <p className={styles.socialTitle}>
                Follow us for More
            </p>
        </div>
        <div className={styles.footDiv}>
            <a href="https://instagram.com" rel="noreferrer">
                <FaInstagram className={styles.logo} />
            </a>
            <a href="https://youtube.com" rel="noreferrer">
                <FaYoutube className={styles.logo} />
            </a>
            <a href="https://facebook.com" rel="noreferrer">
                <FaFacebookF className={styles.logo} />
            </a>
            <a href="https://twitter.com" rel="noreferrer">
                <FaTwitter className={styles.logo} />
            </a>
            <a href="https://tiktok.com" rel="noreferrer">
                <FaTiktok className={styles.logo} />
            </a>
        </div>

        <div className={styles.row}>
            <p className={styles.copyright}>
                &copy;{new Date().getFullYear()} CodeTeamToSaveTheWorld | All rights Reseved | Terms of Service | Terms of Privacy | Refund Policy
            </p>
        </div>
    </div>
  )
}

export default Footer