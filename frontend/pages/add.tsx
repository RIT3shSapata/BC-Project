import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Register.module.css'
import Navbar from '../components/Navbar'
import {useState} from 'react';
import axios from 'axios';

const Add: NextPage = () => {
    // create states document_id, document_type, name, dateOfBirth, Address, file 
    const [document_id, setDocument_id] = useState('')
    const [document_type, setDocument_type] = useState('')
    const [name, setName] = useState('')
    const [dateOfBirth, setDateOfBirth] = useState('')
    const [address, setAddress] = useState('')
    const [file, setFile] = useState('')

    // handle form submission
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // handle file upload
        const formData = new FormData()
        formData.append('file', file)
        try{
            const response = await axios.post('http://localhost:5000/upload', formData)
            console.log(response)
        }
        catch(err){
            console.log(err)
        }
        // if all fields are valid, send request to server
        try{
            const response = await axios.post('http://localhost:5000/add', {
                "document_id":document_id,
                "document_type":document_type,
                "name":name,
                "dateOfBirth":dateOfBirth,
                "address":address
            })
            console.log(response)
        }
        catch(err){
            console.log(err)
        }
    }

  return (
    <>
      <Navbar  />
      <div className={styles.registerBody}>
        <div className={styles.register}>
            <div className={styles.register__heading}>
                <h1>Add Document</h1>
            </div>
            <div className={styles.register__form}>
                <form onSubmit={handleSubmit}>
                    {/* signup form field  */}
                    <div className={styles.register__formField}>
                        <label htmlFor="document_id">Document ID</label>
                        <input type="text" id="document_id" value={document_id} onChange={e => setDocument_id(e.target.value)} />
                    </div>

                    <div className={styles.register__formField}>
                        <label htmlFor="document_type">Document Type</label>
                        <input type="text" id="document_type" value={document_type} onChange={e => setDocument_type(e.target.value)} />
                    </div>

                    <div className={styles.register__formField}>
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} />
                    </div>

                    <div className={styles.register__formField}>
                        <label htmlFor="dateOfBirth">Date of Birth</label>
                        <input type="text" id="dateOfBirth" value={dateOfBirth} onChange={e => setDateOfBirth(e.target.value)} />
                    </div>

                    <div className={styles.register__formField}>
                        <label htmlFor="address">Address</label>
                        <input type="text" id="address" value={address} onChange={e => setAddress(e.target.value)} />
                    </div>

                    <div className={styles.register__formField}>
                        <label htmlFor="file">File</label>
                        <input type="file" id="file" value={file} onChange={e => setFile(e.target.value)} />
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

export default Add;
