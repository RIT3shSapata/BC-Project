import React from 'react'
import Head from 'next/head'
import styles from '../styles/Navbar.module.css'


const Navbar = () => {
  return (
    <>
    <Head>
        <title>Decentralised DigiLocker</title>
        <meta name="description" content="A decentralised locker for all your documents" />
        <link rel="icon" href="/favicon.ico" />
    </Head>

    <div className={styles.navbar}>
        <div className={styles.navbar__left}>
			<div className={styles.navbarButton}>
				<a href="/view">
					<p> View </p>
				</a>	
			</div>
			<div className={styles.navbarButton}>
				<a href="/view">
					<p> Add </p>
				</a>	
			</div>
        </div>
        <div className={styles.navbar__logo}>
        	<a href="/">
				<h1>DigiLocker</h1>
			</a>
        </div>
        <div className={styles.navbar__right}>
			<div className={styles.navbarButton}>
				<a href="/login">
					<p>Log In</p>
				</a>
			</div>
			<div className={styles.navbarButton}>
				<a href="/register">
					<p> Register </p>
				</a>
			</div>
        </div>
    </div>
    </>
  )
}

export default Navbar;