'use client'
import { FcGoogle } from "react-icons/fc";

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import axios from "axios";

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        try {
            const result = await axios.post('/api/auth/register', {
                name: formData.name,
                email: formData.email,
                password: formData.password,
                
            })
            console.log('Signup result:', result)
        } catch (error) {
            console.error('Signup error:', error)
        }
        setFormData({
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
        })
    }

    return (
        <div className='flex items-center justify-center min-h-screen bg-linear-to-br from-blue-50 to-indigo-100'>
            <div className='bg-white p-8 rounded-xl shadow-lg w-96'>
                <h1 className='text-3xl font-bold mb-2 text-center text-gray-800'>Create Account</h1>
                <p className='text-center text-gray-600 mb-6'>Join us today</p>
                
                <form onSubmit={handleSubmit} className='space-y-4'>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                        type='text'
                        name='name'
                        placeholder='Name'
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />

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
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                    <input
                        type='password'
                        name='confirmPassword'
                        placeholder='Confirm Password'
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                    
                    <button
                        type='submit'
                        className='w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition'
                    >
                        Sign Up
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
                    Already have an account?{' '}
                    <Link href='/auth/signin' className='text-blue-500 font-semibold hover:underline'>
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default Signup