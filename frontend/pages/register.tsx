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
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // check if passwords match
        if (password !== confirmPassword) {
            alert('Passwords do not match')
            return
        }
        // if all fields are valid, send request to server
        try{
            const response = await axios.post('http://localhost:5000/signUp', {
                "email":email,
                "password":password,
                "publicKey":publicKey
            })
            console.log(response)
        }catch(err){
            console.log(err)
            alert("Error With Field!! Try Again")
            return
        }
        
        // reset fields to empty
        setEmail('')
        setPassword('')
        setConfirmPassword('')
        setPublicKey('')

        //redirect to login page
        window.location.href = '/login'
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
