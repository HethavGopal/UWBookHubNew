import React from 'react'
import { FaGoogle, FaEye, FaEyeSlash } from 'react-icons/fa';
import { HiMail, HiLockClosed, HiShieldCheck } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import {useState} from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [message, setMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const {loginUser, googleSignIn} = useAuth();
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
 
    const handleGoogleSignIn = async (e) => {
        e.preventDefault(); // Prevent form submission
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
        <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 py-12 px-4'>
            <div className="w-full max-w-md mx-auto bg-gradient-to-b from-gray-900/95 to-gray-800/95 backdrop-blur-md rounded-2xl px-8 pt-8 pb-8 border border-gray-700/50 shadow-2xl relative overflow-hidden">
                {/* Subtle background effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-dark-accent/5 via-transparent to-dark-accent/5 opacity-50"></div>
                
                <div className="relative z-10">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-dark-accent to-yellow-300 rounded-2xl mb-4 shadow-lg">
                            <HiShieldCheck className="w-8 h-8 text-black" />
                        </div>
                        <h2 className='text-3xl font-bold bg-gradient-to-r from-dark-text via-gray-200 to-dark-text bg-clip-text text-transparent'>Welcome Back</h2>
                        <p className="text-gray-400 text-sm mt-2">Sign in to access your account</p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div>
                            <label className="block text-dark-text text-sm font-semibold mb-3" htmlFor="email">
                                Email Address
                            </label>
                            <div className="relative">
                                <HiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    {...register("email", { required: true })}
                                    className="appearance-none border border-gray-600/50 bg-gradient-to-r from-gray-800/80 to-gray-700/80 backdrop-blur-sm rounded-xl w-full py-3.5 pl-12 pr-4 text-dark-text leading-tight focus:outline-none focus:border-dark-accent focus:ring-2 focus:ring-dark-accent/20 transition-all duration-300 hover:border-gray-500"
                                    id="email"
                                    type="email"
                                    placeholder="Enter your email address"
                                />
                            </div>
                        </div>
                        
                        <div>
                            <label className="block text-dark-text text-sm font-semibold mb-3" htmlFor="password">
                                Password
                            </label>
                            <div className="relative">
                                <HiLockClosed className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    {...register("password", { required: true })}
                                    className="appearance-none border border-gray-600/50 bg-gradient-to-r from-gray-800/80 to-gray-700/80 backdrop-blur-sm rounded-xl w-full py-3.5 pl-12 pr-12 text-dark-text leading-tight focus:outline-none focus:border-dark-accent focus:ring-2 focus:ring-dark-accent/20 transition-all duration-300 hover:border-gray-500"
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-dark-accent transition-colors duration-300"
                                >
                                    {showPassword ? <FaEyeSlash className="w-4 h-4" /> : <FaEye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        {message && (
                            <div className='bg-red-900/20 border border-red-700/50 text-red-400 text-sm font-medium p-3 rounded-xl'>
                                {message}
                            </div>
                        )}

                        <div className="space-y-4">
                            <button
                                className="w-full bg-gradient-to-r from-dark-accent to-yellow-300 hover:from-yellow-300 hover:to-dark-accent text-black font-bold py-3.5 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-dark-accent/50 transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-dark-accent/25"
                                type="submit"
                            >
                                Sign In
                            </button>

                            <div className="relative flex py-4 items-center">
                                <div className="flex-grow border-t border-gray-600/50"></div>
                                <span className="flex-shrink mx-4 text-gray-400 bg-gray-800/50 px-3 py-1 rounded-full text-xs">or continue with</span>
                                <div className="flex-grow border-t border-gray-600/50"></div>
                            </div>

                            <button
                                type="button"
                                onClick={handleGoogleSignIn}
                                className="w-full flex items-center justify-center bg-gradient-to-r from-gray-700/80 to-gray-600/80 hover:from-gray-600/80 hover:to-gray-500/80 text-dark-text font-semibold py-3.5 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500/50 transition-all duration-300 transform hover:scale-[1.02] border border-gray-600/50 hover:border-gray-500/50 shadow-lg"
                            >
                                <FaGoogle className="mr-3 text-red-400" />
                                Sign in with Google
                            </button>
                        </div>
                    </form>
                    
                    <div className="text-center mt-8 space-y-4">
                        <p className="text-gray-300 text-sm">
                            Don't have an account? 
                            <Link to="/register" className='text-dark-accent hover:text-yellow-300 ml-1 font-semibold transition-colors duration-300 hover:underline'>
                                Create one here
                            </Link>
                        </p>
                        <div className="flex items-center justify-center gap-4 text-xs text-gray-400">
                            <span>&copy;2025 BookHub</span>
                            <span>•</span>
                            <span>Secure Login</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login