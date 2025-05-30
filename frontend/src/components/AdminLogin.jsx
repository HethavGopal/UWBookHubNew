import React from 'react'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import getBaseUrl from '../utils/baseURL'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { HiUser, HiLockClosed, HiShieldExclamation, HiExclamationCircle } from 'react-icons/hi';
import { FaSpinner } from 'react-icons/fa';

const AdminLogin = () => {

    const [message, setMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false);
    const { setCurrentUser } = useAuth();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const navigate = useNavigate()
    const onSubmit = async (data) => {
        setIsLoading(true);
        setMessage('');
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
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 py-12 px-4'>
            <div className="w-full max-w-md mx-auto bg-gradient-to-b from-gray-900/95 to-gray-800/95 backdrop-blur-md rounded-2xl px-8 pt-8 pb-8 border border-gray-700/50 shadow-2xl relative overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-700">
                {/* Subtle background effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-red-900/10 via-transparent to-red-900/10 opacity-50"></div>
                
                <div className="relative z-10">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-red-900 to-red-700 rounded-2xl mb-4 shadow-lg animate-in zoom-in duration-500 delay-200">
                            <HiShieldExclamation className="w-8 h-8 text-white" />
                        </div>
                        <h2 className='text-3xl font-bold bg-gradient-to-r from-red-400 via-red-300 to-red-400 bg-clip-text text-transparent animate-in slide-in-from-top-2 duration-500 delay-300'>Admin Portal</h2>
                        <p className="text-gray-400 text-sm mt-2 animate-in fade-in duration-500 delay-400">Secure administrative access</p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="animate-in slide-in-from-left-2 duration-500 delay-500">
                            <label className="block text-dark-text text-sm font-semibold mb-3" htmlFor="username">
                                Username
                            </label>
                            <div className="relative">
                                <HiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    {...register("username", { 
                                        required: "Username is required",
                                        minLength: {
                                            value: 3,
                                            message: "Username must be at least 3 characters"
                                        }
                                    })}
                                    className={`appearance-none border ${errors.username ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-gray-600/50 focus:border-red-500 focus:ring-red-500/20'} bg-gradient-to-r from-gray-800/80 to-gray-700/80 backdrop-blur-sm rounded-xl w-full py-3.5 pl-12 pr-4 text-dark-text leading-tight focus:outline-none focus:ring-2 transition-all duration-300 hover:border-gray-500`}
                                    id="username"
                                    type="username"
                                    placeholder="Enter your username"
                                    disabled={isLoading}
                                />
                                {errors.username && (
                                    <HiExclamationCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-400 w-5 h-5" />
                                )}
                            </div>
                            {errors.username && (
                                <p className="text-red-400 text-xs mt-2 flex items-center gap-1">
                                    <HiExclamationCircle className="w-3 h-3" />
                                    {errors.username.message}
                                </p>
                            )}
                        </div>
                        
                        <div className="animate-in slide-in-from-right-2 duration-500 delay-600">
                            <label className="block text-dark-text text-sm font-semibold mb-3" htmlFor="password">
                                Password
                            </label>
                            <div className="relative">
                                <HiLockClosed className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    {...register("password", { 
                                        required: "Password is required",
                                        minLength: {
                                            value: 6,
                                            message: "Password must be at least 6 characters"
                                        }
                                    })}
                                    className={`appearance-none border ${errors.password ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-gray-600/50 focus:border-red-500 focus:ring-red-500/20'} bg-gradient-to-r from-gray-800/80 to-gray-700/80 backdrop-blur-sm rounded-xl w-full py-3.5 pl-12 pr-4 text-dark-text leading-tight focus:outline-none focus:ring-2 transition-all duration-300 hover:border-gray-500`}
                                    id="password"
                                    type="password"
                                    placeholder="Enter your password"
                                    disabled={isLoading}
                                />
                                {errors.password && (
                                    <HiExclamationCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-400 w-5 h-5" />
                                )}
                            </div>
                            {errors.password && (
                                <p className="text-red-400 text-xs mt-2 flex items-center gap-1">
                                    <HiExclamationCircle className="w-3 h-3" />
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        {/* Security Notice */}
                        <div className="bg-yellow-900/20 border border-yellow-700/50 text-yellow-400 text-xs p-3 rounded-xl flex items-center gap-2 animate-in fade-in duration-500 delay-700">
                            <HiShieldExclamation className="w-4 h-4 flex-shrink-0" />
                            <span>This is a secure admin area. All activities are logged and monitored.</span>
                        </div>

                        {message && (
                            <div className='bg-red-900/20 border border-red-700/50 text-red-400 text-sm font-medium p-3 rounded-xl flex items-center gap-2 animate-in slide-in-from-top-1 duration-300'>
                                <HiExclamationCircle className="w-4 h-4 flex-shrink-0" />
                                {message}
                            </div>
                        )}

                        <div className="space-y-4">
                            <button
                                className="w-full bg-gradient-to-r from-red-900 to-red-700 hover:from-red-800 hover:to-red-600 text-white font-bold py-3.5 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/50 transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-red-900/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 animate-in slide-in-from-bottom-2 duration-500 delay-800"
                                type="submit"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <FaSpinner className="w-4 h-4 animate-spin" />
                                        Authenticating...
                                    </>
                                ) : (
                                    'Admin Login'
                                )}
                            </button>
                        </div>
                    </form>
                    
                    <div className="text-center mt-8 space-y-4 animate-in fade-in duration-500 delay-900">
                        <div className="flex items-center justify-center gap-4 text-xs text-gray-400">
                            <span>&copy;2025 BookHub</span>
                            <span>•</span>
                            <span>Admin Panel</span>
                            <span>•</span>
                            <span>Encrypted Session</span>
                        </div>
                        <div className="flex items-center justify-center gap-2 text-xs text-red-400">
                            <HiShieldExclamation className="w-3 h-3" />
                            <span>Authorized personnel only</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminLogin