"use client"

import React, {useState} from 'react'
import Input from './Input'
import toast from 'react-hot-toast'
import axios from 'axios'
import { signIn } from 'next-auth/react'
import Email from 'next-auth/providers/email';
import { useRouter } from 'next/navigation'


export default function RegisterFrom() {
  
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false)

    const router = useRouter();

    const register = async () => {
        setLoading(true)
        try {
            await axios.post("/api/register", { email , password }) 

            // await signIn("credentials", {
            //     email, password,
            //     redirect: false, 
            // })

            toast.success("Successfully Register");

            router.push("/signin");
        }
        catch (err: any)
        {
            console.log(err);
            toast.error(err?.response.data)
            
        }
        finally {
            setLoading(false)
        }
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
                onClick={register}
                className='px-10 py-3 bg-neutral-900 rounded-full text-white disabled:text-white disabled:opacity-70 cursor-pointer'
            >
                Register
            </div>
        </div>
  )
}


