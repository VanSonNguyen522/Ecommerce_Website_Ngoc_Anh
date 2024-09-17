import RegisterFrom from '@/app/(auth)/signup/components/RegisterFrom'
import Link from 'next/link'
import React from 'react'

const SignUpPage = () => {
  return (
    <div className='h-screen w-full flex items-center justify-center bg-gray-100'>
        <div className='p-10 bg-white rounded-lg shadow-lg w-full sm:w-3/4 lg:w-auto'>
            <h1 className='text-4xl font-semibold text-center text-neutral-900'>Register</h1>
            <hr className='my-5 '></hr>
            <RegisterFrom/>
            <div className='text-sm text-center text-neutral-500 mt-5'>
                Have an account? <Link href = {"/signin"} className='font-bold text-neutral-900 '>Login</Link> 
            </div>
        </div>
    </div>
  )
}

export default SignUpPage
