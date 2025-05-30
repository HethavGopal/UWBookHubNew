import React from 'react'
import { FaGoogle, FaEye, FaEyeSlash, FaSpinner } from 'react-icons/fa';
import { HiMail, HiLockClosed, HiShieldCheck, HiExclamationCircle } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import {useState} from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [message, setMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const {loginUser, googleSignIn} = useAuth();
    const onSubmit = async (data) => {
        setIsLoading(true);
        setMessage('');
        try {
            await loginUser(data.email, data.password);
            alert("User logged in successfully");
            navigate('/');
        } catch (error) {
            setMessage("Please provide a valid email and password");
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }
 
    const handleGoogleSignIn = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const result = await googleSignIn();
            console.log("Google sign-in successful:", result);
            navigate('/');
        } catch (error) {
            console.error("Google sign-in error:", error);
            setMessage("Google sign-in failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 py-12 px-4'>
            <div className="w-full max-w-md mx-auto bg-gradient-to-b from-gray-900/95 to-gray-800/95 backdrop-blur-md rounded-2xl px-8 pt-8 pb-8 border border-gray-700/50 shadow-2xl relative overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-700">
                {/* Subtle background effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-dark-accent/5 via-transparent to-dark-accent/5 opacity-50"></div>
                
                <div className="relative z-10">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-dark-accent to-yellow-300 rounded-2xl mb-4 shadow-lg animate-in zoom-in duration-500 delay-200">
                            <HiShieldCheck className="w-8 h-8 text-black" />
                        </div>
                        <h2 className='text-3xl font-bold bg-gradient-to-r from-dark-text via-gray-200 to-dark-text bg-clip-text text-transparent animate-in slide-in-from-top-2 duration-500 delay-300'>Welcome Back</h2>
                        <p className="text-gray-400 text-sm mt-2 animate-in fade-in duration-500 delay-400">Sign in to access your account</p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="animate-in slide-in-from-left-2 duration-500 delay-500">
                            <label className="block text-dark-text text-sm font-semibold mb-3" htmlFor="email">
                                Email Address
                            </label>
                            <div className="relative">
                                <HiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    {...register("email", { 
                                        required: "Email is required",
                                        pattern: {
                                            value: /^\S+@\S+$/i,
                                            message: "Please enter a valid email address"
                                        }
                                    })}
                                    className={`appearance-none border ${errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-gray-600/50 focus:border-dark-accent focus:ring-dark-accent/20'} bg-gradient-to-r from-gray-800/80 to-gray-700/80 backdrop-blur-sm rounded-xl w-full py-3.5 pl-12 pr-4 text-dark-text leading-tight focus:outline-none focus:ring-2 transition-all duration-300 hover:border-gray-500`}
                                    id="email"
                                    type="email"
                                    placeholder="Enter your email address"
                                    disabled={isLoading}
                                />
                                {errors.email && (
                                    <HiExclamationCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-400 w-5 h-5" />
                                )}
                            </div>
                            {errors.email && (
                                <p className="text-red-400 text-xs mt-2 flex items-center gap-1">
                                    <HiExclamationCircle className="w-3 h-3" />
                                    {errors.email.message}
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
                                    className={`appearance-none border ${errors.password ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-gray-600/50 focus:border-dark-accent focus:ring-dark-accent/20'} bg-gradient-to-r from-gray-800/80 to-gray-700/80 backdrop-blur-sm rounded-xl w-full py-3.5 pl-12 pr-12 text-dark-text leading-tight focus:outline-none focus:ring-2 transition-all duration-300 hover:border-gray-500`}
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    disabled={isLoading}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-dark-accent transition-colors duration-300"
                                    disabled={isLoading}
                                >
                                    {showPassword ? <FaEyeSlash className="w-4 h-4" /> : <FaEye className="w-4 h-4" />}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="text-red-400 text-xs mt-2 flex items-center gap-1">
                                    <HiExclamationCircle className="w-3 h-3" />
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between animate-in fade-in duration-500 delay-700">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    className="w-4 h-4 text-dark-accent bg-gray-700 border-gray-600 rounded focus:ring-dark-accent focus:ring-2"
                                    disabled={isLoading}
                                />
                                <span className="ml-2 text-sm text-gray-300">Remember me</span>
                            </label>
                            <Link to="/forgot-password" className="text-sm text-dark-accent hover:text-yellow-300 transition-colors duration-300">
                                Forgot password?
                            </Link>
                        </div>

                        {message && (
                            <div className='bg-red-900/20 border border-red-700/50 text-red-400 text-sm font-medium p-3 rounded-xl flex items-center gap-2 animate-in slide-in-from-top-1 duration-300'>
                                <HiExclamationCircle className="w-4 h-4 flex-shrink-0" />
                                {message}
                            </div>
                        )}

                        <div className="space-y-4">
                            <button
                                className="w-full bg-gradient-to-r from-dark-accent to-yellow-300 hover:from-yellow-300 hover:to-dark-accent text-black font-bold py-3.5 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-dark-accent/50 transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-dark-accent/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 animate-in slide-in-from-bottom-2 duration-500 delay-800"
                                type="submit"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <FaSpinner className="w-4 h-4 animate-spin" />
                                        Signing in...
                                    </>
                                ) : (
                                    'Sign In'
                                )}
                            </button>

                            <div className="relative flex py-4 items-center animate-in fade-in duration-500 delay-900">
                                <div className="flex-grow border-t border-gray-600/50"></div>
                                <span className="flex-shrink mx-4 text-gray-400 bg-gray-800/50 px-3 py-1 rounded-full text-xs">or continue with</span>
                                <div className="flex-grow border-t border-gray-600/50"></div>
                            </div>

                            <button
                                type="button"
                                onClick={handleGoogleSignIn}
                                className="w-full flex items-center justify-center bg-gradient-to-r from-gray-700/80 to-gray-600/80 hover:from-gray-600/80 hover:to-gray-500/80 text-dark-text font-semibold py-3.5 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500/50 transition-all duration-300 transform hover:scale-[1.02] border border-gray-600/50 hover:border-gray-500/50 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none animate-in slide-in-from-bottom-2 duration-500 delay-1000"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <FaSpinner className="w-4 h-4 animate-spin mr-3" />
                                ) : (
                                    <FaGoogle className="mr-3 text-red-400" />
                                )}
                                Sign in with Google
                            </button>
                        </div>
                    </form>
                    
                    <div className="text-center mt-8 space-y-4 animate-in fade-in duration-500 delay-1100">
                        <p className="text-gray-300 text-sm">
                            Don't have an account? 
                            <Link to="/register" className='text-dark-accent hover:text-yellow-300 ml-1 font-semibold transition-colors duration-300 hover:underline'>
                                Create one here
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login