"use client"

import React, {useState} from 'react'
import Input from './Input'

export default function RegisterFrom() {
  
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false)

    const login = async () => {
        
    }
    return (
        <div className='space-y-5 flex flex-col items-center' >
            <Input 
                label='Email'
                value= {email}
                onChange={(e) => setEmail(e.target.value)}
                disabled = {loading}
            />

            <Input 
                label='Password'
                value= {password}
                onChange={(e) => setPassword(e.target.value)}
                disabled = {loading}
                type='password'
            />

            <div 
                onClick={login}
                className='px-10 py-3 bg-neutral-900 rounded-full text-white disabled:text-white disabled:opacity-70 '
            >
                Login
            </div>
        </div>
  )
}


