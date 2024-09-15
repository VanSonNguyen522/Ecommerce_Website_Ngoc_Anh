"use client"

import React, { useState } from 'react'
import Input from './Input'
import axios from 'axios';
import toast from 'react-hot-toast';
import router from 'next/router';
import { signIn } from 'next-auth/react';

const LoginForm = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false)

    const login = async () => {
        setLoading(true);  
        const login = await signIn("credentials", {
            email, password, redirect: false,
        });
        // console.log(login);
        if(login?.ok){
            toast.success("Correct login");
            window.location.assign("/");
        }
        else if(login?.error){
            toast.error(login?.error);
        }
        setLoading(false);
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
                className='px-10 py-3 bg-neutral-900 rounded-full text-white disabled:text-white disabled:opacity-70 cursor-pointer'
            >
                Login
            </div>
        </div>
  )
}

export default LoginForm
