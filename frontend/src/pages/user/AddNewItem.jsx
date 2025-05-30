import React, { useState } from 'react'
import { BiImageAdd, BiDollarCircle, BiTag, BiText, BiMapPin, BiPhone, BiUser, BiStar, BiEnvelope } from 'react-icons/bi'
import { FiX, FiCamera, FiCheck } from 'react-icons/fi'
import { HiOutlineSparkles, HiOutlineLightBulb } from 'react-icons/hi'

const AddNewItem = () => {
  const [selectedImages, setSelectedImages] = useState([])
  const [currentStep, setCurrentStep] = useState(1)
  const [errors, setErrors] = useState({})
  const [showErrors, setShowErrors] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    condition: '',
    location: '',
    phone: '',
    email: '',
    meetupOptions: []
  })

  const categories = [
    { value: 'textbooks', label: 'Textbooks', icon: '📚' },
    { value: 'electronics', label: 'Electronics', icon: '💻' },
    { value: 'dorm', label: 'Dorm Essentials', icon: '🏠' },
    { value: 'clothing', label: 'Clothing', icon: '👕' },
    { value: 'sports', label: 'Sports', icon: '⚽' },
    { value: 'gadgets', label: 'Phones & Gadgets', icon: '📱' },
    { value: 'transport', label: 'Transportation', icon: '🚲' },
    { value: 'misc', label: 'Miscellaneous', icon: '📦' }
  ]

  const conditions = [
    { value: 'new', label: 'Brand New', emoji: '✨', color: 'from-green-500 to-emerald-500' },
    { value: 'like-new', label: 'Like New', emoji: '🌟', color: 'from-blue-500 to-cyan-500' },
    { value: 'good', label: 'Good', emoji: '👍', color: 'from-yellow-500 to-orange-500' },
    { value: 'fair', label: 'Fair', emoji: '⚡', color: 'from-orange-500 to-red-500' }
  ]

  const steps = [
    { number: 1, title: 'Photos', icon: BiImageAdd },
    { number: 2, title: 'Details', icon: BiText },
    { number: 3, title: 'Contact', icon: BiUser }
  ]

  // Validation functions for each step
  const validateStep1 = () => {
    const stepErrors = {}
    if (selectedImages.length === 0) {
      stepErrors.images = 'Please add at least one photo of your item'
    }
    return stepErrors
  }

  const validateStep2 = () => {
    const stepErrors = {}
    if (!formData.title.trim()) {
      stepErrors.title = 'Item title is required'
    }
    if (!formData.description.trim()) {
      stepErrors.description = 'Item description is required'
    }
    if (!formData.category) {
      stepErrors.category = 'Please select a category'
    }
    if (!formData.price || formData.price <= 0) {
      stepErrors.price = 'Please enter a valid price'
    }
    if (!formData.condition) {
      stepErrors.condition = 'Please select item condition'
    }
    return stepErrors
  }

  const validateStep3 = () => {
    const stepErrors = {}
    if (!formData.email.trim()) {
      stepErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      stepErrors.email = 'Please enter a valid email address'
    }
    return stepErrors
  }

  // Updated nextStep function with validation
  const nextStep = () => {
    let stepErrors = {}
    
    if (currentStep === 1) {
      stepErrors = validateStep1()
    } else if (currentStep === 2) {
      stepErrors = validateStep2()
    } else if (currentStep === 3) {
      stepErrors = validateStep3()
    }

    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors)
      setShowErrors(true)
      // Scroll to top to show errors
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    // Clear errors and proceed
    setErrors({})
    setShowErrors(false)
    setCurrentStep(prev => Math.min(prev + 1, 3))
  }

  const prevStep = () => {
    setErrors({})
    setShowErrors(false)
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }

  // Clear errors when user starts typing/selecting
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
    setSelectedImages(prev => [...prev, ...files.slice(0, 8 - prev.length)])
    if (errors.images) {
      setErrors(prev => ({ ...prev, images: '' }))
    }
  }

  const removeImage = (index) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800'>
      {/* Hero Section */}
      <div className="relative pt-24 pb-16 px-4">
        <div className="absolute inset-0 bg-gradient-to-r from-dark-accent/10 via-transparent to-yellow-300/10 opacity-50"></div>
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-dark-accent/20 to-yellow-300/20 backdrop-blur-sm border border-dark-accent/30 rounded-full px-6 py-3 mb-6">
            <HiOutlineSparkles className="w-5 h-5 text-dark-accent" />
            <span className="text-dark-accent font-semibold text-sm">Sell to Fellow Warriors</span>
          </div>
          <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-dark-text via-white to-dark-text bg-clip-text text-transparent mb-4'>
            List Your Item
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Turn your unused items into cash by connecting with the Waterloo community
          </p>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="max-w-4xl mx-auto px-4 mb-8">
        <div className="flex items-center justify-center">
          {steps.map((step, index) => {
            const Icon = step.icon
            const isActive = currentStep === step.number
            const isCompleted = currentStep > step.number
            
            return (
              <div key={step.number} className="flex items-center">
                <div className={`flex items-center gap-3 px-4 py-2 rounded-full transition-all duration-300 ${
                  isActive ? 'bg-dark-accent/20 border border-dark-accent/50' :
                  isCompleted ? 'bg-green-500/20 border border-green-500/50' :
                  'bg-gray-800/50 border border-gray-600/30'
                }`}>
                  {isCompleted ? (
                    <FiCheck className="w-5 h-5 text-green-400" />
                  ) : (
                    <Icon className={`w-5 h-5 ${isActive ? 'text-dark-accent' : 'text-gray-400'}`} />
                  )}
                  <span className={`font-semibold text-sm ${
                    isActive ? 'text-dark-accent' :
                    isCompleted ? 'text-green-400' :
                    'text-gray-400'
                  }`}>
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-12 h-0.5 mx-2 ${
                    currentStep > step.number ? 'bg-green-400' : 'bg-gray-600'
                  }`}></div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <div className="bg-gradient-to-br from-gray-800/95 to-gray-900/95 backdrop-blur-sm rounded-3xl border border-gray-700/50 shadow-2xl overflow-hidden">
          
          {/* Error Summary */}
          {showErrors && Object.keys(errors).length > 0 && (
            <div className="bg-red-500/10 border-l-4 border-red-500 p-4 m-6 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                  <FiX className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-red-400 font-semibold">Please fix the following errors:</h3>
                  <ul className="text-red-300 text-sm mt-1 space-y-1">
                    {Object.values(errors).map((error, index) => (
                      <li key={index}>• {error}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Step 1: Photos */}
          {currentStep === 1 && (
            <div className="p-8">
              <div className="text-center mb-8">
                <BiImageAdd className="w-16 h-16 text-dark-accent mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-dark-text mb-2">Add Photos</h2>
                <p className="text-gray-400">Great photos help your item sell faster</p>
                {errors.images && (
                  <p className="text-red-400 text-sm mt-2 bg-red-500/10 px-4 py-2 rounded-lg inline-block">
                    {errors.images}
                  </p>
                )}
              </div>

              <div className={`grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8 ${errors.images ? 'ring-2 ring-red-500/50 rounded-2xl p-4' : ''}`}>
                {/* Main upload area */}
                <div className="col-span-2 row-span-2">
                  <label className="relative group cursor-pointer block h-full min-h-[200px]">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                    <div className={`h-full bg-gradient-to-br from-dark-accent/10 to-yellow-300/10 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center transition-all duration-300 group-hover:border-dark-accent group-hover:bg-dark-accent/5 ${
                      errors.images ? 'border-red-500/50' : 'border-dark-accent/50'
                    }`}>
                      <FiCamera className="w-12 h-12 text-dark-accent mb-4" />
                      <span className="text-dark-accent font-semibold mb-2">Drop photos here</span>
                      <span className="text-gray-400 text-sm">or click to browse</span>
                    </div>
                  </label>
                </div>

                {/* Preview images */}
                {selectedImages.slice(0, 6).map((image, index) => (
                  <div key={index} className="relative group aspect-square">
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-full object-cover rounded-xl"
                    />
                    <button
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <FiX className="w-4 h-4" />
                    </button>
                  </div>
                ))}

                {/* Empty slots */}
                {Array.from({ length: Math.max(0, 6 - selectedImages.length) }).map((_, index) => (
                  <div key={`empty-${index}`} className="aspect-square bg-gray-800/50 border border-gray-600/30 rounded-xl flex items-center justify-center">
                    <span className="text-gray-500 text-2xl">+</span>
                  </div>
                ))}
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <HiOutlineLightBulb className="w-5 h-5 text-blue-400 mt-0.5" />
                  <div>
                    <h3 className="text-blue-400 font-semibold mb-1">Photo Tips</h3>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Use good lighting and clean backgrounds</li>
                      <li>• Show multiple angles and any defects</li>
                      <li>• Include close-ups of important details</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Details */}
          {currentStep === 2 && (
            <div className="p-8">
              <div className="text-center mb-10">
                <BiText className="w-16 h-16 text-dark-accent mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-dark-text mb-2">Item Details</h2>
                <p className="text-gray-400">Tell buyers about your item</p>
              </div>

              <div className="max-w-4xl mx-auto">
                {/* Title Section */}
                <div className="bg-gradient-to-r from-gray-700/30 to-gray-800/30 rounded-2xl p-6 mb-8 border border-gray-600/30">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-dark-accent to-yellow-300 rounded-lg flex items-center justify-center">
                      <span className="text-black font-bold text-lg">1</span>
                    </div>
                    <h3 className="text-xl font-bold text-dark-text">Item Information</h3>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-base font-semibold text-dark-text mb-3">
                        What are you selling? <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        placeholder="e.g., iPhone 13 Pro, Calculus Textbook, Study Desk"
                        className={`w-full px-6 py-4 bg-gray-800/50 border rounded-xl text-dark-text placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 text-lg ${
                          errors.title 
                            ? 'border-red-500/50 focus:ring-red-500/50 focus:border-red-500' 
                            : 'border-gray-600/50 focus:ring-dark-accent/50 focus:border-dark-accent'
                        }`}
                      />
                      {errors.title && (
                        <p className="text-red-400 text-sm mt-2">{errors.title}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-base font-semibold text-dark-text mb-3">
                        Description <span className="text-red-400">*</span>
                      </label>
                      <textarea
                        value={formData.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        placeholder="Describe your item's condition, features, and why someone should buy it. Be honest and detailed to attract serious buyers..."
                        rows="4"
                        className={`w-full px-6 py-4 bg-gray-800/50 border rounded-xl text-dark-text placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 resize-none ${
                          errors.description 
                            ? 'border-red-500/50 focus:ring-red-500/50 focus:border-red-500' 
                            : 'border-gray-600/50 focus:ring-dark-accent/50 focus:border-dark-accent'
                        }`}
                      />
                      <div className="flex justify-between mt-2">
                        <span className="text-xs text-gray-500">Be specific about condition, size, color, etc.</span>
                        <span className="text-xs text-gray-500">{formData.description.length}/500</span>
                      </div>
                      {errors.description && (
                        <p className="text-red-400 text-sm mt-1">{errors.description}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Category Section */}
                <div className="bg-gradient-to-r from-gray-700/30 to-gray-800/30 rounded-2xl p-6 mb-8 border border-gray-600/30">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-r from-dark-accent to-yellow-300 rounded-lg flex items-center justify-center">
                      <span className="text-black font-bold text-lg">2</span>
                    </div>
                    <h3 className="text-xl font-bold text-dark-text">Category</h3>
                    <span className="text-red-400">*</span>
                  </div>
                  
                  {errors.category && (
                    <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 mb-4">
                      <p className="text-red-400 text-sm">{errors.category}</p>
                    </div>
                  )}
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {categories.map(category => (
                      <label key={category.value} className="cursor-pointer group">
                        <input
                          type="radio"
                          name="category"
                          value={category.value}
                          checked={formData.category === category.value}
                          onChange={(e) => handleInputChange('category', e.target.value)}
                          className="hidden"
                        />
                        <div className={`relative p-5 border-2 rounded-2xl transition-all duration-300 text-center hover:scale-105 ${
                          formData.category === category.value
                            ? 'border-dark-accent bg-gradient-to-br from-dark-accent/20 to-yellow-300/10 shadow-lg shadow-dark-accent/20'
                            : errors.category
                            ? 'border-red-500/30 bg-gray-800/30 hover:border-red-500/50'
                            : 'border-gray-600/50 bg-gray-800/30 hover:border-dark-accent/50 hover:bg-gray-700/30'
                        }`}>
                          {formData.category === category.value && (
                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-dark-accent rounded-full flex items-center justify-center">
                              <FiCheck className="w-4 h-4 text-black" />
                            </div>
                          )}
                          <div className="text-3xl mb-3">{category.icon}</div>
                          <div className="text-sm font-semibold text-dark-text">{category.label}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price and Condition Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Price */}
                  <div className="bg-gradient-to-r from-gray-700/30 to-gray-800/30 rounded-2xl p-6 border border-gray-600/30">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                        <BiDollarCircle className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-dark-text">Pricing</h3>
                      <span className="text-red-400">*</span>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-base font-semibold text-dark-text mb-3">
                          Price (CAD) <span className="text-red-400">*</span>
                        </label>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl font-bold">$</span>
                          <input
                            type="number"
                            value={formData.price}
                            onChange={(e) => handleInputChange('price', e.target.value)}
                            placeholder="0"
                            className="w-full pl-12 pr-6 py-4 bg-gray-800/50 border border-gray-600/50 rounded-xl text-dark-text placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all duration-300 text-xl font-semibold"
                          />
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <HiOutlineLightBulb className="w-4 h-4 text-yellow-400" />
                          <span className="text-xs text-gray-400">Check similar listings for competitive pricing</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Condition */}
                  <div className="bg-gradient-to-r from-gray-700/30 to-gray-800/30 rounded-2xl p-6 border border-gray-600/30">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                        <BiStar className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-dark-text">Condition</h3>
                    </div>
                    
                    <div className="space-y-3">
                      {conditions.map(condition => (
                        <label key={condition.value} className="cursor-pointer block group">
                          <input
                            type="radio"
                            name="condition"
                            value={condition.value}
                            checked={formData.condition === condition.value}
                            onChange={(e) => handleInputChange('condition', e.target.value)}
                            className="hidden"
                          />
                          <div className={`relative flex items-center gap-4 p-4 border-2 rounded-xl transition-all duration-300 hover:scale-[1.02] ${
                            formData.condition === condition.value
                              ? `border-dark-accent bg-gradient-to-r ${condition.color}/10 shadow-lg`
                              : 'border-gray-600/50 bg-gray-800/30 hover:border-gray-500'
                          }`}>
                            {formData.condition === condition.value && (
                              <div className="absolute -top-2 -right-2 w-6 h-6 bg-dark-accent rounded-full flex items-center justify-center">
                                <FiCheck className="w-4 h-4 text-black" />
                              </div>
                            )}
                            <span className="text-2xl">{condition.emoji}</span>
                            <div>
                              <div className="font-semibold text-dark-text">{condition.label}</div>
                              <div className="text-xs text-gray-400">
                                {condition.value === 'new' && 'Never used, in original packaging'}
                                {condition.value === 'like-new' && 'Barely used, excellent condition'}
                                {condition.value === 'good' && 'Used but well-maintained'}
                                {condition.value === 'fair' && 'Shows wear but fully functional'}
                              </div>
                            </div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Tips Section */}
                <div className="mt-8 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-2xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <HiOutlineLightBulb className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-blue-400 font-semibold mb-3">Writing Tips for Better Sales</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300 text-sm">
                        <div>
                          <h4 className="font-semibold text-blue-300 mb-2">Title Tips:</h4>
                          <ul className="space-y-1">
                            <li>• Include brand and model</li>
                            <li>• Mention key features</li>
                            <li>• Keep it concise but descriptive</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-blue-300 mb-2">Description Tips:</h4>
                          <ul className="space-y-1">
                            <li>• Be honest about condition</li>
                            <li>• Include dimensions if relevant</li>
                            <li>• Mention reason for selling</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Contact */}
          {currentStep === 3 && (
            <div className="p-8">
              <div className="text-center mb-8">
                <BiUser className="w-16 h-16 text-dark-accent mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-dark-text mb-2">Contact Info</h2>
                <p className="text-gray-400">How should buyers reach you?</p>
              </div>

              <div className="space-y-6 max-w-2xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-base font-semibold text-dark-text mb-3">
                      Email <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <BiEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="your.email@uwaterloo.ca"
                        className={`w-full pl-12 pr-4 py-3 bg-gray-700/50 border rounded-xl text-dark-text placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
                          errors.email 
                            ? 'border-red-500/50 focus:ring-red-500/50 focus:border-red-500' 
                            : 'border-gray-600/50 focus:ring-dark-accent/50 focus:border-dark-accent'
                        }`}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-red-400 text-sm mt-2">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-base font-semibold text-dark-text mb-3">
                      Phone (Optional)
                    </label>
                    <div className="relative">
                      <BiPhone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="(519) 123-4567"
                        className="w-full pl-12 pr-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-dark-text placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-dark-accent/50 focus:border-dark-accent transition-all duration-300"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-base font-semibold text-dark-text mb-3">
                    Meetup Location
                  </label>
                  <div className="relative">
                    <BiMapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      placeholder="e.g., Tim Hortons Campus, Engineering 5, DC Library"
                      className="w-full pl-12 pr-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-dark-text placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-dark-accent/50 focus:border-dark-accent transition-all duration-300"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="border-t border-gray-700/50 p-6">
            <div className="flex justify-between items-center">
              <button
                onClick={prevStep}
                disabled={currentStep === 1}
                className="px-6 py-3 text-gray-400 hover:text-dark-text transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ← Previous
              </button>

              <div className="flex gap-3">
                <button
                  type="button"
                  className="px-6 py-3 bg-gray-600/50 hover:bg-gray-500/50 text-gray-300 hover:text-white rounded-xl transition-all duration-300 font-semibold"
                >
                  Save Draft
                </button>

                {currentStep < 3 ? (
                  <button
                    onClick={nextStep}
                    className="px-8 py-3 bg-gradient-to-r from-dark-accent to-yellow-300 hover:from-yellow-300 hover:to-dark-accent text-black font-bold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    Next →
                  </button>
                ) : (
                  <button
                    type="button"
                    className="px-8 py-3 bg-gradient-to-r from-dark-accent to-yellow-300 hover:from-yellow-300 hover:to-dark-accent text-black font-bold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-2"
                  >
                    <HiOutlineSparkles className="w-5 h-5" />
                    Publish Item
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddNewItem