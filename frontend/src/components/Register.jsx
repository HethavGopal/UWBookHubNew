import React from 'react'
import { FaGoogle, FaEye, FaEyeSlash, FaSpinner } from 'react-icons/fa';
import { HiMail, HiLockClosed, HiUserAdd, HiExclamationCircle, HiCheckCircle } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import {useState} from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [message, setMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [acceptTerms, setAcceptTerms] = useState(false);
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const password = watch("password");

    const {createUser, googleSignIn} = useAuth();
    const onSubmit = async (data) => {
        if (!acceptTerms) {
            setMessage("Please accept the terms and conditions");
            return;
        }
        setIsLoading(true);
        setMessage('');
        try {
            await createUser(data.email, data.password);
            alert("User created successfully");
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

    const getPasswordStrength = (password) => {
        if (!password) return { strength: 0, label: '', color: '' };
        let strength = 0;
        if (password.length >= 8) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;

        const levels = [
            { strength: 0, label: '', color: '' },
            { strength: 1, label: 'Weak', color: 'bg-red-500' },
            { strength: 2, label: 'Fair', color: 'bg-yellow-500' },
            { strength: 3, label: 'Good', color: 'bg-blue-500' },
            { strength: 4, label: 'Strong', color: 'bg-green-500' }
        ];
        return levels[strength];
    };

    const passwordStrength = getPasswordStrength(password);

    return (
        <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 py-12 px-4'>
            <div className="w-full max-w-md mx-auto bg-gradient-to-b from-gray-900/95 to-gray-800/95 backdrop-blur-md rounded-2xl px-8 pt-8 pb-8 border border-gray-700/50 shadow-2xl relative overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-700">
                {/* Subtle background effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-dark-accent/5 via-transparent to-dark-accent/5 opacity-50"></div>
                
                <div className="relative z-10">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-dark-accent to-yellow-300 rounded-2xl mb-4 shadow-lg animate-in zoom-in duration-500 delay-200">
                            <HiUserAdd className="w-8 h-8 text-black" />
                        </div>
                        <h2 className='text-3xl font-bold bg-gradient-to-r from-dark-text via-gray-200 to-dark-text bg-clip-text text-transparent animate-in slide-in-from-top-2 duration-500 delay-300'>Create Account</h2>
                        <p className="text-gray-400 text-sm mt-2 animate-in fade-in duration-500 delay-400">Join the Waterloo student marketplace</p>
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
                            {/* Password Strength Indicator */}
                            {password && (
                                <div className="mt-2">
                                    <div className="flex items-center justify-between text-xs">
                                        <span className="text-gray-400">Password strength:</span>
                                        <span className={`font-medium ${passwordStrength.strength >= 3 ? 'text-green-400' : passwordStrength.strength >= 2 ? 'text-yellow-400' : 'text-red-400'}`}>
                                            {passwordStrength.label}
                                        </span>
                                    </div>
                                    <div className="w-full bg-gray-700 rounded-full h-1.5 mt-1">
                                        <div 
                                            className={`h-1.5 rounded-full transition-all duration-300 ${passwordStrength.color}`}
                                            style={{ width: `${(passwordStrength.strength / 4) * 100}%` }}
                                        ></div>
                                    </div>
                                </div>
                            )}
                            {errors.password && (
                                <p className="text-red-400 text-xs mt-2 flex items-center gap-1">
                                    <HiExclamationCircle className="w-3 h-3" />
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        <div className="animate-in slide-in-from-left-2 duration-500 delay-700">
                            <label className="block text-dark-text text-sm font-semibold mb-3" htmlFor="confirmPassword">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <HiLockClosed className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    {...register("confirmPassword", { 
                                        required: "Please confirm your password",
                                        validate: value => value === password || "Passwords do not match"
                                    })}
                                    className={`appearance-none border ${errors.confirmPassword ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-gray-600/50 focus:border-dark-accent focus:ring-dark-accent/20'} bg-gradient-to-r from-gray-800/80 to-gray-700/80 backdrop-blur-sm rounded-xl w-full py-3.5 pl-12 pr-12 text-dark-text leading-tight focus:outline-none focus:ring-2 transition-all duration-300 hover:border-gray-500`}
                                    id="confirmPassword"
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Confirm your password"
                                    disabled={isLoading}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-dark-accent transition-colors duration-300"
                                    disabled={isLoading}
                                >
                                    {showConfirmPassword ? <FaEyeSlash className="w-4 h-4" /> : <FaEye className="w-4 h-4" />}
                                </button>
                            </div>
                            {errors.confirmPassword && (
                                <p className="text-red-400 text-xs mt-2 flex items-center gap-1">
                                    <HiExclamationCircle className="w-3 h-3" />
                                    {errors.confirmPassword.message}
                                </p>
                            )}
                        </div>

                        {/* Terms and Conditions */}
                        <div className="animate-in fade-in duration-500 delay-800">
                            <label className="flex items-start">
                                <input
                                    type="checkbox"
                                    checked={acceptTerms}
                                    onChange={(e) => setAcceptTerms(e.target.checked)}
                                    className="w-4 h-4 text-dark-accent bg-gray-700 border-gray-600 rounded focus:ring-dark-accent focus:ring-2 mt-0.5"
                                    disabled={isLoading}
                                />
                                <span className="ml-2 text-sm text-gray-300">
                                    I agree to the{' '}
                                    <Link to="/terms" className="text-dark-accent hover:text-yellow-300 transition-colors duration-300 underline">
                                        Terms of Service
                                    </Link>
                                    {' '}and{' '}
                                    <Link to="/privacy" className="text-dark-accent hover:text-yellow-300 transition-colors duration-300 underline">
                                        Privacy Policy
                                    </Link>
                                </span>
                            </label>
                        </div>

                        {message && (
                            <div className='bg-red-900/20 border border-red-700/50 text-red-400 text-sm font-medium p-3 rounded-xl flex items-center gap-2 animate-in slide-in-from-top-1 duration-300'>
                                <HiExclamationCircle className="w-4 h-4 flex-shrink-0" />
                                {message}
                            </div>
                        )}

                        <div className="space-y-4">
                            <button
                                className="w-full bg-gradient-to-r from-dark-accent to-yellow-300 hover:from-yellow-300 hover:to-dark-accent text-black font-bold py-3.5 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-dark-accent/50 transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-dark-accent/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 animate-in slide-in-from-bottom-2 duration-500 delay-900"
                                type="submit"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <FaSpinner className="w-4 h-4 animate-spin" />
                                        Creating account...
                                    </>
                                ) : (
                                    'Create Account'
                                )}
                            </button>

                            <div className="relative flex py-4 items-center animate-in fade-in duration-500 delay-1000">
                                <div className="flex-grow border-t border-gray-600/50"></div>
                                <span className="flex-shrink mx-4 text-gray-400 bg-gray-800/50 px-3 py-1 rounded-full text-xs">or continue with</span>
                                <div className="flex-grow border-t border-gray-600/50"></div>
                            </div>

                            <button
                                type="button"
                                onClick={handleGoogleSignIn}
                                className="w-full flex items-center justify-center bg-gradient-to-r from-gray-700/80 to-gray-600/80 hover:from-gray-600/80 hover:to-gray-500/80 text-dark-text font-semibold py-3.5 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500/50 transition-all duration-300 transform hover:scale-[1.02] border border-gray-600/50 hover:border-gray-500/50 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none animate-in slide-in-from-bottom-2 duration-500 delay-1100"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <FaSpinner className="w-4 h-4 animate-spin mr-3" />
                                ) : (
                                    <FaGoogle className="mr-3 text-red-400" />
                                )}
                                Sign up with Google
                            </button>
                        </div>
                    </form>
                    
                    <div className="text-center mt-8 space-y-4 animate-in fade-in duration-500 delay-1200">
                        <p className="text-gray-300 text-sm">
                            Already have an account? 
                            <Link to="/login" className='text-dark-accent hover:text-yellow-300 ml-1 font-semibold transition-colors duration-300 hover:underline'>
                                Login here
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register