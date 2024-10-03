// "use client"

// import React, {useEffect, useState} from 'react'
// import Input from '../../../../components/Input'
// import toast from 'react-hot-toast'
// import axios from 'axios'
// import { signIn, signOut } from 'next-auth/react'
// import Email from 'next-auth/providers/email';
// import { useRouter } from 'next/navigation'


// export default function RegisterFrom() {
    
//     useEffect(() =>{
//         signOut({
//             redirect:false
//         });
//     }, [])

//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");

//     const [loading, setLoading] = useState(false)

//     const router = useRouter();

//     const register = async () => {
//         setLoading(true)
//         try {
//             await axios.post("/api/register", { email , password }) 

//             // await signIn("credentials", {
//             //     email, password,
//             //     redirect: false, 
//             // })

//             toast.success("Successfully Register");

//             router.push("/signin");
//         }
//         catch (err: any)
//         {
//             console.log(err);
//             toast.error(err?.response.data)
            
//         }
//         finally {
//             setLoading(false)
//         }
//     }
//     return (
//         <div className='space-y-5 flex flex-col items-center' >
//             <Input 
//                 label='Email'
//                 value= {email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 disabled = {loading}
//             />

//             <Input 
//                 label='Password'
//                 value= {password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 disabled = {loading}
//                 type='password'
//             />

//             <div 
//                 onClick={register}
//                 className='px-10 py-3 bg-neutral-900 rounded-full text-white disabled:text-white disabled:opacity-70 cursor-pointer'
//             >
//                 Register
//             </div>
//         </div>
//   )
// }


"use client"

import React, { useEffect, useState } from 'react'
import Input from '../../../../components/Input'
import toast from 'react-hot-toast'
import axios from 'axios'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function RegisterForm() {
    
    useEffect(() => {
        signOut({ redirect: false });
    }, [])

    const [name, setName] = useState(""); // New state for name
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false)

    const router = useRouter();

    const register = async () => {
        setLoading(true)
        try {
            await axios.post("/api/register", { name, email, password }) // Pass name to the API

            toast.success("Successfully Registered");
            router.push("/signin");
        }
        catch (err: any) {
            console.log(err);
            toast.error(err?.response.data)
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <div className='space-y-5 flex flex-col items-center'>
            <Input 
                label='Name'
                value={name}
                onChange={(e) => setName(e.target.value)} // Handle name input
                disabled={loading}
            />

            <Input 
                label='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
            />

            <Input 
                label='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
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
