import React from 'react'
import { FaGoogle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import {useState} from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const {loginUser} = useAuth();
    const onSubmit = async (data) => {
        try {
            await loginUser(data.email, data.password);
            alert("User logged in successfully");
            navigate('/');
        } catch (error) {
            setMessage("Please provide a valid email and password");
            console.log(error);
        }
    }
 
    const handleGoogleSignIn = () => {
        console.log("Google Sign In");
    }

    return (
        <div className='min-h-[calc(100vh-120px)] flex items-center justify-center'>
            <div className="w-full max-w-md mx-auto bg-white rounded-lg px-8 pt-6 pb-8 mb-4 border border-gray-200 shadow-lg">
                <h2 className='text-2xl font-bold mb-6 text-red-900 text-center'>Welcome Back</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="mb-4">
                        <label className="block text-gray-800 text-sm font-semibold mb-2" htmlFor="username">
                            Email
                        </label>
                        <input
                            {...register("email", { required: true })}
                            className="appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-800 leading-tight focus:outline-none focus:border-red-900 focus:ring-2 focus:ring-red-900/20 transition-all duration-200"
                            id="email"
                            type="email"
                            placeholder="Enter your email address"
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

                        <div className="relative flex py-3 items-center">
                            <div className="flex-grow border-t border-gray-300"></div>
                            <span className="flex-shrink mx-4 text-gray-600">or</span>
                            <div className="flex-grow border-t border-gray-300"></div>
                        </div>

                        <button
                            onClick={handleGoogleSignIn}
                            className="w-full flex items-center justify-center bg-yellow-500 hover:bg-yellow-400 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500/50 transition-all duration-200 transform hover:scale-[1.02]"
                        >
                            <FaGoogle className="mr-2" />
                            Sign in with Google
                        </button>
                    </div>
                </form>
                <p className="text-center font-medium mt-6 text-sm text-gray-700">
                    Don't have an account? 
                    <Link to="/register" className='text-red-900 hover:text-red-800 ml-1 font-semibold'>
                        Register here
                    </Link>
                </p>
                <p className="mt-8 text-center text-gray-600 text-xs">
                    &copy;2025 Book Store. All rights reserved.
                </p>
            </div>
        </div>
    )
}

export default Login