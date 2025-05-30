import React, { useState } from 'react'
import { BiEnvelope } from 'react-icons/bi'
import { HiOutlineSparkles, HiOutlineAcademicCap, HiOutlineShieldCheck } from 'react-icons/hi'

const Newsletter = () => {
    const [email, setEmail] = useState('')
    const [isSubscribed, setIsSubscribed] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const handleSubscribe = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500))
        
        setIsSubscribed(true)
        setIsLoading(false)
        setEmail('')
    }

    const trustIndicators = [
        {
            icon: HiOutlineAcademicCap,
            text: "UWaterloo Exclusive"
        },
        {
            icon: HiOutlineShieldCheck,
            text: "Trusted Platform"
        },
        {
            icon: HiOutlineSparkles,
            text: "Weekly Updates"
        }
    ]

    return (
        <section className="py-12 sm:py-16 md:py-20 px-3 sm:px-4">
            <div className="max-w-4xl mx-auto">
                <div className="bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-md rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 lg:p-16 border border-gray-700/50 shadow-2xl relative overflow-hidden">
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 bg-gradient-to-br from-dark-accent/10 to-yellow-300/10 rounded-full blur-2xl sm:blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48 bg-gradient-to-tr from-yellow-300/5 to-dark-accent/5 rounded-full blur-xl sm:blur-2xl"></div>
                    
                    <div className="relative z-10 text-center">
                        {/* Header */}
                        <div className="mb-6 sm:mb-8">
                            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-r from-dark-accent to-yellow-300 rounded-xl sm:rounded-2xl mb-4 sm:mb-6 shadow-lg">
                                <BiEnvelope className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-black" />
                            </div>
                            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-dark-text via-gray-200 to-dark-text bg-clip-text text-transparent mb-3 sm:mb-4 leading-tight">
                                Stay Connected with Waterloo Exchange
                            </h2>
                            <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed px-2 sm:px-0">
                                <span className="sm:hidden">Get updates on new listings and campus deals!</span>
                                <span className="hidden sm:inline">Get weekly updates on new marketplace listings, exclusive deals from fellow Warriors, and important campus marketplace announcements delivered to your UWaterloo email.</span>
                            </p>
                        </div>

                        {/* Subscription Form */}
                        {!isSubscribed ? (
                            <form onSubmit={handleSubscribe} className="mb-6 sm:mb-8">
                                <div className="flex flex-col gap-3 sm:gap-4 max-w-lg mx-auto">
                                    <div className="flex-1 relative">
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Enter your @uwaterloo.ca email"
                                            className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-gray-800/80 to-gray-700/80 backdrop-blur-sm rounded-xl border border-gray-600/50 text-dark-text placeholder-gray-400 focus:outline-none focus:border-dark-accent focus:ring-2 focus:ring-dark-accent/20 transition-all duration-300 text-sm sm:text-base"
                                            required
                                            disabled={isLoading}
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={isLoading || !email}
                                        className="bg-gradient-to-r from-dark-accent to-yellow-300 hover:from-yellow-300 hover:to-dark-accent text-black font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-dark-accent/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 text-sm sm:text-base"
                                    >
                                        {isLoading ? (
                                            <>
                                                <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                                                Subscribing...
                                            </>
                                        ) : (
                                            'Subscribe'
                                        )}
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <div className="mb-6 sm:mb-8 bg-green-900/20 border border-green-700/50 rounded-xl p-4 sm:p-6 max-w-md mx-auto">
                                <div className="flex items-center justify-center gap-2 text-green-400 mb-2">
                                    <HiOutlineSparkles className="w-4 h-4 sm:w-5 sm:h-5" />
                                    <span className="font-semibold text-sm sm:text-base">Successfully Subscribed!</span>
                                </div>
                                <p className="text-green-300 text-xs sm:text-sm">
                                    Welcome to the Waterloo Exchange community! Check your email for a confirmation message.
                                </p>
                            </div>
                        )}

                        {/* Trust Indicators */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-gray-400 mb-4 sm:mb-6">
                            {trustIndicators.map((indicator, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    <indicator.icon className="w-3 h-3 sm:w-4 sm:h-4 text-dark-accent" />
                                    <span>{indicator.text}</span>
                                </div>
                            ))}
                        </div>

                        {/* Privacy Note */}
                        <p className="text-xs text-gray-500 leading-relaxed px-2 sm:px-0">
                            Your email is safe with us. We only send relevant marketplace updates and never share your information. 
                            Unsubscribe anytime with one click.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Newsletter 