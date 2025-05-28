import React from 'react'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import getBaseUrl from '../utils/baseURL'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const AdminLogin = () => {

    const [message, setMessage] = useState('')
    const { setCurrentUser } = useAuth();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const navigate = useNavigate()
    const onSubmit = async (data) => {
        const baseUrl = getBaseUrl();
        const loginUrl = `${baseUrl}/api/auth/admin`;
        
        try {
            console.log('Attempting login to:', loginUrl);
            const response = await axios.post(loginUrl, data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            const { token, user } = response.data;
            console.log('Login response:', response.data);

            if (token) {
                localStorage.setItem('token', token);
                setCurrentUser(user);
                setTimeout(() => {
                    localStorage.removeItem('token')
                    setCurrentUser(null);
                    alert('Session expired')
                    navigate('/admin')
                }, 3600 * 1000)
            }
            alert("Admin login successful")
            navigate('/dashboard')

        } catch (error) {
            console.log('Login error:', error);
            setMessage(error.response?.data?.message || 'Login failed');
        }
    }

    return (
        <div className='min-h-[calc(100vh-120px)] flex items-center justify-center'>
            <div className="w-full max-w-md mx-auto bg-white rounded-lg px-8 pt-6 pb-8 mb-4 border border-gray-200 shadow-lg">
                <h2 className='text-2xl font-bold mb-6 text-red-900 text-center'>Admin Login</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="mb-4">
                        <label className="block text-gray-800 text-sm font-semibold mb-2" htmlFor="username">
                            Username
                        </label>
                        <input
                            {...register("username", { required: true })}
                            className="appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-800 leading-tight focus:outline-none focus:border-red-900 focus:ring-2 focus:ring-red-900/20 transition-all duration-200"
                            id="username"
                            type="username"
                            placeholder="Enter your username"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-800 text-sm font-semibold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            {...register("password", { required: true })}
                            className="appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-800 leading-tight focus:outline-none focus:border-red-900 focus:ring-2 focus:ring-red-900/20 transition-all duration-200"
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                        />
                    </div>

                    {message && (
                        <p className='text-red-600 text-sm font-medium mb-3'>{message}</p>
                    )}

                    <div className="flex flex-col space-y-4">
                        <button
                            className="w-full bg-red-900 hover:bg-red-800 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900/50 transition-all duration-200 transform hover:scale-[1.02]"
                            type="submit"
                        >
                            Login
                        </button>


                    </div>
                </form>
            </div>
        </div>
    )
}

export default AdminLogin