import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Register.module.css'
import Navbar from '../components/Navbar'
import { useEffect, useState } from 'react'

const Home: NextPage = () => {

  return (
    <>
      <Navbar  />
      <h1>View</h1>
      <div className={styles.registerBody}>
        {/* {
          // print all documents 
          localStorage.getItem('documents').map((document:any, index:any) => {
            // return (
              <div className={styles.register} key={index}>
                <div className={styles.register__heading}>
                  <h1>{document.name}</h1>
                  <h2>{document.type}</h2>
                  <h2>{document.date}</h2>
                </div>
                <div className={styles.register__image}>
                  <Image src={document.image} width={300} height={300} />
                </div>
              </div>
            // )
          })
        } */}
      </div>
      
    </>
  )
}

export default Home;
