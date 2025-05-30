import React from 'react'
import { BiSearch, BiChat, BiPackage, BiDollarCircle, BiGroup, BiShield, BiBookOpen } from 'react-icons/bi'
import { FiArrowRight } from 'react-icons/fi'

const HowItWorks = () => {
  const steps = [
    {
      step: '01',
      icon: BiSearch,
      title: 'Browse & Search',
      description: 'Find the textbooks you need using our advanced search and category filters.'
    },
    {
      step: '02',
      icon: BiChat,
      title: 'Connect with Sellers',
      description: 'Message fellow UW students directly to ask questions and negotiate prices.'
    },
    {
      step: '03',
      icon: BiPackage,
      title: 'Meet & Exchange',
      description: 'Arrange a convenient meetup on campus to exchange books and complete your purchase.'
    }
  ]

  const benefits = [
    {
      title: 'Save up to 70%',
      description: 'Get textbooks at a fraction of the retail price from fellow students',
      icon: BiDollarCircle
    },
    {
      title: 'Student Community',
      description: 'Connect directly with fellow UW students in your program',
      icon: BiGroup
    },
    {
      title: 'Verified Users',
      description: 'All users are verified UW students for your safety and security',
      icon: BiShield
    },
    {
      title: 'Easy Selling',
      description: 'Turn your old textbooks into cash quickly and efficiently',
      icon: BiBookOpen
    }
  ]

  return (
    <section className="py-20 max-w-screen-2xl mx-auto px-4">
      {/* Header */}
      <div className="mb-16 text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <div className="w-2 h-10 bg-gradient-to-b from-dark-accent to-yellow-300 rounded-full"></div>
          <span className="text-dark-accent font-bold text-sm tracking-wider uppercase">Simple Process</span>
          <div className="w-2 h-10 bg-gradient-to-b from-yellow-300 to-dark-accent rounded-full"></div>
        </div>
        <h2 className="text-4xl font-bold bg-gradient-to-r from-dark-text via-gray-200 to-dark-text bg-clip-text text-transparent">
          How It Works
        </h2>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          Getting your textbooks has never been easier. Follow these simple steps to start saving money today.
        </p>
      </div>

      {/* Steps */}
      <div className="mb-20">
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={step.step} className="relative group">
                {/* Connection line for desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-dark-accent/50 to-transparent z-0">
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
                      <FiArrowRight className="text-dark-accent w-4 h-4" />
                    </div>
                  </div>
                )}

                <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-dark-accent/30 transition-all duration-500 group hover:shadow-2xl hover:shadow-dark-accent/10 hover:-translate-y-2 relative z-10 h-full">
                  {/* Step number */}
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-r from-dark-accent to-yellow-300 rounded-2xl flex items-center justify-center text-black font-bold text-lg shadow-lg">
                    {step.step}
                  </div>

                  <div className="flex flex-col items-center text-center space-y-4 pt-4">
                    {/* Icon with simple background */}
                    <div className="p-4 bg-gradient-to-r from-gray-600/50 to-gray-500/50 rounded-2xl group-hover:from-dark-accent/20 group-hover:to-yellow-300/20 transition-all duration-300 group-hover:scale-110">
                      <Icon className="w-8 h-8 text-dark-accent" />
                    </div>

                    {/* Content */}
                    <div className="space-y-3">
                      <h3 className="text-xl font-bold text-dark-text group-hover:text-dark-accent transition-colors duration-300">
                        {step.title}
                      </h3>
                      <p className="text-gray-300 text-sm leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Benefits */}
      <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-3xl p-10 border border-gray-700/30">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-dark-text mb-4">Why Choose UW BookHub?</h3>
          <p className="text-gray-300 text-lg">Join thousands of satisfied UW students</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon
            return (
              <div key={index} className="group h-full">
                <div className="bg-gradient-to-br from-gray-700/50 to-gray-800/50 rounded-2xl p-8 hover:bg-gradient-to-br hover:from-gray-600/50 hover:to-gray-700/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-dark-accent/10 h-full flex flex-col">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-gradient-to-r from-gray-600/50 to-gray-500/50 rounded-xl group-hover:from-dark-accent/20 group-hover:to-yellow-300/20 transition-all duration-300">
                      <Icon className="w-6 h-6 text-dark-accent" />
                    </div>
                    <h4 className="text-xl font-bold text-dark-text group-hover:text-dark-accent transition-colors duration-300">
                      {benefit.title}
                    </h4>
                  </div>
                  <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300 flex-1">
                    {benefit.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <button className="bg-gradient-to-r from-dark-accent to-yellow-300 text-black hover:from-yellow-300 hover:to-dark-accent px-8 py-3 rounded-xl font-bold text-base shadow-lg hover:shadow-dark-accent/25 transform hover:-translate-y-1 hover:scale-105 transition-all duration-300">
            Start Saving Today
          </button>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks 