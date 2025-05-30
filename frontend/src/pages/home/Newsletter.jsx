import React, { useState } from 'react'
import { BiEnvelope, BiCheck, BiTrendingUp, BiBookOpen, BiDollarCircle } from 'react-icons/bi'

const Newsletter = () => {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email) return

    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsSubscribed(true)
      setIsLoading(false)
      setEmail('')
    }, 1500)
  }

  const benefits = [
    {
      icon: BiTrendingUp,
      title: 'New Book Alerts',
      description: 'Get notified when books in your field are listed'
    },
    {
      icon: BiDollarCircle,
      title: 'Price Drop Alerts',
      description: 'Never miss a deal on expensive textbooks'
    },
    {
      icon: BiBookOpen,
      title: 'Study Tips',
      description: 'Exclusive study guides and academic resources'
    }
  ]

  if (isSubscribed) {
    return (
      <section className="py-20 max-w-screen-2xl mx-auto px-4">
        <div className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 backdrop-blur-sm rounded-3xl p-12 border border-green-700/30 text-center">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full">
              <BiCheck className="w-12 h-12 text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-dark-text mb-4">Welcome to the Community!</h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8">
            Thank you for subscribing! You'll receive your first newsletter with exclusive deals and study tips within 24 hours.
          </p>
          <button 
            onClick={() => setIsSubscribed(false)}
            className="text-dark-accent hover:text-yellow-300 transition-colors duration-300 font-semibold"
          >
            Subscribe another email
          </button>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 max-w-screen-2xl mx-auto px-4">
      <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-sm rounded-3xl border border-gray-700/50 overflow-hidden relative">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-dark-accent/5 via-transparent to-yellow-300/5 opacity-50"></div>
        
        <div className="relative z-10 p-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-gradient-to-r from-dark-accent to-yellow-300 rounded-2xl">
                    <BiEnvelope className="w-6 h-6 text-black" />
                  </div>
                  <span className="text-dark-accent font-bold text-sm tracking-wider uppercase">Stay Updated</span>
                </div>
                <h2 className="text-4xl font-bold bg-gradient-to-r from-dark-text via-gray-200 to-dark-text bg-clip-text text-transparent">
                  Never Miss a Deal
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed">
                  Join UW students getting the best textbook deals, study tips, and exclusive offers delivered straight to their inbox.
                </p>
              </div>

              {/* Benefits */}
              <div className="space-y-4">
                {benefits.map((benefit, index) => {
                  const Icon = benefit.icon
                  return (
                    <div key={index} className="flex items-start gap-4 group">
                      <div className="p-2 bg-gradient-to-r from-gray-700 to-gray-600 rounded-xl group-hover:from-dark-accent/20 group-hover:to-yellow-300/20 transition-all duration-300">
                        <Icon className="w-5 h-5 text-dark-accent" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-dark-text group-hover:text-dark-accent transition-colors duration-300">
                          {benefit.title}
                        </h3>
                        <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Right side - Form */}
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-gray-700/50 to-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-600/30">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <label htmlFor="email" className="block text-sm font-semibold text-dark-text">
                      Your UW Email Address
                    </label>
                    <div className="relative">
                      <BiEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your.email@uwaterloo.ca"
                        className="w-full pl-12 pr-4 py-3 bg-gradient-to-r from-gray-800/80 to-gray-700/80 border border-gray-600/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-dark-accent/50 focus:border-dark-accent text-dark-text placeholder-gray-400 transition-all duration-300"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-dark-accent to-yellow-300 text-black font-bold py-3 px-6 rounded-xl hover:from-yellow-300 hover:to-dark-accent transition-all duration-300 shadow-lg hover:shadow-dark-accent/25 transform hover:-translate-y-1 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-black border-t-transparent"></div>
                        Subscribing...
                      </div>
                    ) : (
                      'Subscribe for Free'
                    )}
                  </button>

                  <p className="text-xs text-gray-400 text-center">
                    No spam, unsubscribe at any time. We respect your privacy.
                  </p>
                </form>
              </div>

              {/* Trust indicators */}
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-dark-accent">Trusted</div>
                  <div className="text-xs text-gray-400">Platform</div>
                </div>
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-dark-accent">Weekly</div>
                  <div className="text-xs text-gray-400">Updates</div>
                </div>
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-dark-accent">0</div>
                  <div className="text-xs text-gray-400">Spam</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Newsletter 