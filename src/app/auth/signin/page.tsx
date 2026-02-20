'use client'
import { FcGoogle } from "react-icons/fc";

import { useState } from 'react'
import { signIn, useSession } from 'next-auth/react'
import Link from 'next/link'


const Signin = () => {
  const session = useSession()
    const [formData, setFormData] = useState({
        
        email: '',
        password: '',
        
    })
    console.log(session.data?.user)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        try {
          const result = await signIn('credentials',{
                email: formData.email,
                password: formData.password,
                redirect: true,
                callbackUrl: '/'
            })
            
        } catch (error) {
            console.error('Signin error:', error)
        }
        setFormData({
            
            email: '',
            password: '',
            
        })
    }

    return (
        <div className='flex items-center justify-center min-h-screen bg-linear-to-br from-blue-50 to-indigo-100'>
            <div className='bg-white p-8 rounded-xl shadow-lg w-96'>
                <h1 className='text-3xl font-bold mb-2 text-center text-gray-800'>welcome Back</h1>
                <p className='text-center text-gray-600 mb-6'>Sign in to your account</p>                
                <form onSubmit={handleSignIn} className='space-y-4'>
                    

                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type='email'
                        name='email'
                        placeholder='Email'
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                    
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                        type='password'
                        name='password'
                        placeholder='Password'
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                    
                    <button
                        type='submit'
                        className='w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition'
                    >
                        Sign In
                    </button>
                </form>

                <div className='my-4 flex items-center'>
                    <div className='flex-1 border-t border-gray-300'></div>
                    <span className='px-2 text-gray-500 text-sm'>or</span>
                    <div className='flex-1 border-t border-gray-300'></div>
                </div>

                <button
                    onClick={() => signIn('google')}
                    className='w-full flex items-center justify-center bg-white border border-gray-300 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-50 transition'
                >
                   <FcGoogle className='mr-2 inline text-2xl' /> Sign Up with Google
                </button>

                <p className='text-center text-gray-700 mt-6'>
                    Dont  have an account?{' '}
                    <Link href='/auth/signup' className='text-blue-500 font-semibold hover:underline'>
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default Signin