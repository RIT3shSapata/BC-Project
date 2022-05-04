import type { NextPage } from 'next'
import { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { NextResponse } from 'next/server';
import styles from '../styles/Register.module.css'
import Navbar from '../components/Navbar'
import axios from 'axios';

const Login: NextPage = () => {
    // states for form fields 
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // handle form submission
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // check if passwords match

        // if all fields are valid, send request to server
        try{
            const response = await axios.post('http://localhost:5000/signIn', {
                "email":email,
                "password":password
            })
            console.log(response)
            // localStorage.setItem('loggedIn', 'true')
            // localStorage.setItem('documents', JSON.stringify(response.data.documents))
        }catch(err){
            console.log(err)
            alert("Wrong credentials! Try Again")
            setPassword('')

            return
        }


        // reset fields to empty
        setEmail('')
        setPassword('')

        // store login state in local storage
        

        //redirect to home page

        window.location.href = '/'


    }



  return (
    <>
      <Navbar  />
      <div className={styles.registerBody}>
        <div className={styles.register}>
            <div className={styles.register__heading}>
                <h1>Login</h1>
            </div>
            <div className={styles.register__form}>
                <form onSubmit={handleSubmit}>
                    {/* signup form field  */}
                    <div className={styles.register__formField}>
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} />
                    </div>

                    <div className={styles.register__formField}>
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} />
                    </div>

                    <div className={styles.register__formSubmit}>
                        <button type="submit">Login</button>
                    </div>
                </form>
            </div>
        </div>
      </div>
      
    </>
  )
}

export default Login;
