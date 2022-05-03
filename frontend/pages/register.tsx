import type { NextPage } from 'next'
import { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Register.module.css'
import Navbar from '../components/Navbar'
import axios from 'axios';

const Register: NextPage = () => {
    // states for form fields 
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [publicKey, setPublicKey] = useState('')

    // handle form submission
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // check if passwords match
        if (password !== confirmPassword) {
            alert('Passwords do not match')
            return
        }
        // check if email is valid
        // if (!email.includes('@')) {
        //     alert('Email is not valid')
        //     return
        // }

        // if all fields are valid, send request to server
        axios.post('http://localhost:5000/signUp', {
            body: JSON.stringify({
                email,
                password,
                publicKey
            })
        })
            .then(res => {
                console.log(res)
                return res
            })
            // .then(res => {
            //     if (res.success) {
            //         alert('Registration successful')
            //         window.location.href = '/login'
            //     } else {
            //         alert(res.message)
            //     }
            // })

        // reset fields to empty
        setEmail('')
        setPassword('')
        setConfirmPassword('')
        setPublicKey('')

    }



  return (
    <>
      <Navbar  />
      <div className={styles.registerBody}>
        <div className={styles.register}>
            <div className={styles.register__heading}>
                <h1>Register</h1>
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

                    <div className={styles.register__formField}>
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input type="password" id="confirmPassword" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                    </div>

                    <div className={styles.register__formField}>
                        <label htmlFor="publicKey">publicKey</label>
                        <input type="text" id="publicKey" value={publicKey} onChange={e => setPublicKey(e.target.value)} />
                    </div>

                    <div className={styles.register__formSubmit}>
                        <button type="submit">Register</button>
                    </div>
                </form>
            </div>
        </div>
      </div>
      
    </>
  )
}

export default Register;
