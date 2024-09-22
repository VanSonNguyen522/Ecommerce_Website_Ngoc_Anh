// "use client"

// import React, { useEffect, useState } from 'react'
// import Input from '../../../../components/Input'
// import axios from 'axios';
// import toast from 'react-hot-toast';
// import router from 'next/router';
// import { signIn, signOut } from 'next-auth/react';

// const LoginForm = () => {

//     useEffect(() =>{
//         signOut({
//             redirect:false
//         });
//     }, [])
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");

//     const [loading, setLoading] = useState(false)

//     const login = async () => {
//         setLoading(true);  
//         const login = await signIn("credentials", {
//             email, password, redirect: false,
//         });
//         // console.log(login);
//         if(login?.ok){
//             toast.success("Correct login");
//             window.location.assign("/");
//         }
//         else if(login?.error){
//             toast.error(login?.error);
//         }
//         setLoading(false);
//         }

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
//                 onClick={login}
//                 className='px-10 py-3 bg-neutral-900 rounded-full text-white disabled:text-white disabled:opacity-70 cursor-pointer'
//             >
//                 Login
//             </div>
//         </div>
//   )
// }

"use client"
// export default LoginForm
import React, { useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Input from '../../../../components/Input';
import toast from 'react-hot-toast';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { data: session, status } = useSession(); // Get session and auth status
  const router = useRouter();

  const login = async () => {
    setLoading(true);
    
    const res = await signIn('credentials', {
      email,
      password,
      redirect: false, // Prevent automatic redirection, handle manually
    });

    if (res?.ok) {
      toast.success('Logged in successfully!');
      router.push('/dashboard'); // Redirect to dashboard after successful login
    } else {
      toast.error(res?.error || 'Login failed');
    }

    setLoading(false);
  };

  // Monitor if the user is logged in
  if (status === 'authenticated') {
    // Optional: You could automatically redirect if the session is present
    router.push('/dashboard');
  }

  return (
    <div className="space-y-5 flex flex-col items-center">
      <Input
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={loading}
      />
      <Input
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={loading}
      />
      <div
        onClick={login}
        className={`px-10 py-3 bg-neutral-900 rounded-full text-white cursor-pointer ${
          loading ? 'opacity-70 cursor-not-allowed' : ''
        }`}
      >
        {loading ? 'Logging in...' : 'Login'}
      </div>
    </div>
  );
};

export default LoginForm;

