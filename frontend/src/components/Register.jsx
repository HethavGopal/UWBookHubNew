import React from 'react'
import { FaGoogle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import {useState} from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const {createUser, googleSignIn} = useAuth();
    const onSubmit = async (data) => {
        try {
            await createUser(data.email, data.password);
            alert("User created successfully");
            navigate('/');
        } catch (error) {
            setMessage("Please provide a valid email and password");
            console.log(error);
        }
    }
 
    const handleGoogleSignIn = async (e) => {
        e.preventDefault();
        try {
            const result = await googleSignIn();
            console.log("Google sign-in successful:", result);
            navigate('/');
        } catch (error) {
            console.error("Google sign-in error:", error);
            setMessage("Google sign-in failed. Please try again.");
        }
    }

    return (
        <div className='min-h-[calc(100vh-120px)] flex items-center justify-center bg-dark-bg'>
            <div className="w-full max-w-md mx-auto bg-gray-900 rounded-lg px-8 pt-6 pb-8 mb-4 border border-gray-700 shadow-lg">
                <h2 className='text-2xl font-bold mb-6 text-dark-accent text-center'>Create Account</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="mb-4">
                        <label className="block text-dark-text text-sm font-semibold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            {...register("email", { required: true })}
                            className="appearance-none border border-gray-600 bg-gray-800 rounded-lg w-full py-3 px-4 text-dark-text leading-tight focus:outline-none focus:border-dark-accent focus:ring-2 focus:ring-dark-accent/20 transition-all duration-200"
                            id="email"
                            type="email"
                            placeholder="Enter your email address"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-dark-text text-sm font-semibold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            {...register("password", { required: true })}
                            className="appearance-none border border-gray-600 bg-gray-800 rounded-lg w-full py-3 px-4 text-dark-text leading-tight focus:outline-none focus:border-dark-accent focus:ring-2 focus:ring-dark-accent/20 transition-all duration-200"
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                        />
                    </div>

                    {message && (
                        <p className='text-red-400 text-sm font-medium mb-3'>{message}</p>
                    )}

                    <div className="flex flex-col space-y-4">
                        <button
                            className="w-full bg-dark-accent hover:bg-yellow-300 text-black font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-dark-accent/50 transition-all duration-200 transform hover:scale-[1.02]"
                            type="submit"
                        >
                            Create Account
                        </button>

                        <div className="relative flex py-3 items-center">
                            <div className="flex-grow border-t border-gray-600"></div>
                            <span className="flex-shrink mx-4 text-gray-400">or</span>
                            <div className="flex-grow border-t border-gray-600"></div>
                        </div>

                        <button
                            type="button"
                            onClick={handleGoogleSignIn}
                            className="w-full flex items-center justify-center bg-gray-700 hover:bg-gray-600 text-dark-text font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500/50 transition-all duration-200 transform hover:scale-[1.02] border border-gray-600"
                        >
                            <FaGoogle className="mr-2" />
                            Sign up with Google
                        </button>
                    </div>
                </form>
                <p className="text-center font-medium mt-6 text-sm text-gray-300">
                    Already have an account? 
                    <Link to="/login" className='text-dark-accent hover:text-yellow-300 ml-1 font-semibold'>
                        Login here
                    </Link>
                </p>
                <p className="mt-8 text-center text-gray-400 text-xs">
                    &copy;2025 Book Store. All rights reserved.
                </p>
            </div>
        </div>
    )
}

export default Register