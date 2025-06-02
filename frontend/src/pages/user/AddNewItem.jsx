import React, { useState } from 'react'
import { BiImageAdd, BiDollarCircle, BiTag, BiText, BiMapPin, BiPhone, BiUser, BiStar, BiEnvelope } from 'react-icons/bi'
import { FiX, FiCamera, FiCheck, FiEdit, FiDollarSign, FiArrowLeft, FiArrowRight } from 'react-icons/fi'
import { HiOutlineSparkles, HiOutlineLightBulb } from 'react-icons/hi'

import axios from 'axios';
import { auth, storage } from '../../firebase/firebase.config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import getBaseUrl from '../../utils/baseURL';

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
    meetupOptions: [],
    contactMethod: 'email'
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Final validation of all steps
    const step1Errors = validateStep1()
    const step2Errors = validateStep2()
    const step3Errors = validateStep3()
    
    const allErrors = { ...step1Errors, ...step2Errors, ...step3Errors }
    
    if (Object.keys(allErrors).length > 0) {
      setErrors(allErrors)
      setShowErrors(true)
      // Go back to first step with errors
      if (step1Errors && Object.keys(step1Errors).length > 0) {
        setCurrentStep(1)
      } else if (step2Errors && Object.keys(step2Errors).length > 0) {
        setCurrentStep(2)
      } else if (step3Errors && Object.keys(step3Errors).length > 0) {
        setCurrentStep(3)
      }
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    try {
      setLoading(true)
      // Get current user and token
      const user = auth.currentUser;
      if (!user) throw new Error('User not authenticated');
      
      const token = await user.getIdToken();

      // Generate unique listing ID for organizing images
      const listingId = `listing_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      // Upload images to Firebase Storage
      const imageUrls = [];
      if (selectedImages.length > 0) {
        console.log('Uploading images to Firebase Storage...');
        
        for (let i = 0; i < selectedImages.length; i++) {
          const image = selectedImages[i];
          const fileExtension = image.name.split('.').pop();
          const fileName = `listings/${user.uid}/${listingId}/image_${i + 1}.${fileExtension}`;
          
          // Create storage reference
          const storageRef = storage;
          const imageRef = ref(storageRef, fileName);
          
          // Upload image
          const uploadTask = await uploadBytes(imageRef, image);
          
          // Get download URL
          const downloadURL = await getDownloadURL(imageRef);
          imageUrls.push(downloadURL);
          
          console.log(`Image ${i + 1} uploaded:`, downloadURL);
        }
      }

      // Prepare data for backend
      const submitData = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        condition: formData.condition,
        price: parseFloat(formData.price),
        email: formData.email,
        phone: formData.phone || '',
        location: formData.location || '',
        images: imageUrls 
      };

      console.log('Submitting item data:', submitData);

      // Debug logging
      const apiUrl = `${getBaseUrl()}/api/listings/create-listing`;
      console.log('API URL:', apiUrl);
      console.log('Token exists:', !!token);
      console.log('Token preview:', token ? token.substring(0, 20) + '...' : 'No token');

      // Send data to backend
      const response = await axios.post(apiUrl, submitData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('Backend response:', response.data);
      alert('Item posted successfully! 🎉');
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        price: '',
        category: '',
        condition: '',
        location: '',
        phone: '',
        email: '',
        meetupOptions: [],
        contactMethod: 'email'
      })
      setSelectedImages([])
      setCurrentStep(1)
      setErrors({})
      setShowErrors(false)
      setLoading(false)
      
    } catch (error) {
      console.error("Error in creating listing:", error);
      alert('Error posting item. Please try again.');
      setLoading(false)
    }
  }

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
      <div className="relative pt-20 pb-8 sm:pt-24 sm:pb-16 px-4">
        <div className="absolute inset-0 bg-gradient-to-r from-dark-accent/10 via-transparent to-yellow-300/10 opacity-50"></div>
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-dark-accent/20 to-yellow-300/20 backdrop-blur-sm border border-dark-accent/30 rounded-full px-4 py-2 sm:px-6 sm:py-3 mb-4 sm:mb-6">
            <HiOutlineSparkles className="w-4 h-4 sm:w-5 sm:h-5 text-dark-accent" />
            <span className="text-dark-accent font-semibold text-xs sm:text-sm">Sell to Fellow Warriors</span>
          </div>
          <h1 className='text-2xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-dark-text via-white to-dark-text bg-clip-text text-transparent mb-3 sm:mb-4'>
            List Your Item
          </h1>
          <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto px-4">
            Turn your unused items into cash by connecting with the Waterloo community
          </p>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="max-w-4xl mx-auto px-4 mb-6 sm:mb-8">
        <div className="flex items-center justify-center overflow-x-auto">
          {steps.map((step, index) => {
            const Icon = step.icon
            const isActive = currentStep === step.number
            const isCompleted = currentStep > step.number
            
            return (
              <div key={step.number} className="flex items-center flex-shrink-0">
                <div className={`flex items-center gap-2 sm:gap-3 px-3 py-2 sm:px-4 sm:py-2 rounded-full transition-all duration-300 ${
                  isActive ? 'bg-dark-accent/20 border border-dark-accent/50' :
                  isCompleted ? 'bg-green-500/20 border border-green-500/50' :
                  'bg-gray-800/50 border border-gray-600/30'
                }`}>
                  {isCompleted ? (
                    <FiCheck className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
                  ) : (
                    <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${isActive ? 'text-dark-accent' : 'text-gray-400'}`} />
                  )}
                  <span className={`font-semibold text-xs sm:text-sm ${
                    isActive ? 'text-dark-accent' :
                    isCompleted ? 'text-green-400' :
                    'text-gray-400'
                  }`}>
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-8 sm:w-12 h-0.5 mx-1 sm:mx-2 ${
                    currentStep > step.number ? 'bg-green-400' : 'bg-gray-600'
                  }`}></div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-3 sm:px-4 pb-8 sm:pb-12">
        <div className="bg-gradient-to-br from-gray-800/95 to-gray-900/95 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-gray-700/50 shadow-2xl overflow-hidden">
          
          {/* Error Summary */}
          {showErrors && Object.keys(errors).length > 0 && (
            <div className="bg-red-500/10 border-l-4 border-red-500 p-4 m-3 sm:m-6 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 sm:w-6 sm:h-6 bg-red-500 rounded-full flex items-center justify-center">
                  <FiX className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-red-400 font-semibold text-sm sm:text-base">Please fix the following errors:</h3>
                  <ul className="text-red-300 text-xs sm:text-sm mt-1 space-y-1">
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
            <div className="p-4 sm:p-8">
              <div className="text-center mb-6 sm:mb-8">
                <BiImageAdd className="w-12 h-12 sm:w-16 sm:h-16 text-dark-accent mx-auto mb-3 sm:mb-4" />
                <h2 className="text-xl sm:text-2xl font-bold text-dark-text mb-2">Add Photos</h2>
                <p className="text-gray-400 text-sm sm:text-base">Great photos help your item sell faster</p>
                {errors.images && (
                  <p className="text-red-400 text-sm mt-2 bg-red-500/10 px-3 py-2 sm:px-4 sm:py-2 rounded-lg inline-block">
                    {errors.images}
                  </p>
                )}
              </div>

              <div className={`grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4 mb-6 sm:mb-8 ${errors.images ? 'ring-2 ring-red-500/50 rounded-2xl p-3 sm:p-4' : ''}`}>
                {/* Main upload area */}
                <div className="col-span-2 row-span-2">
                  <label className="relative group cursor-pointer block h-full min-h-[150px] sm:min-h-[200px]">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                    <div className={`h-full bg-gradient-to-br from-dark-accent/10 to-yellow-300/10 border-2 border-dashed rounded-xl sm:rounded-2xl flex flex-col items-center justify-center transition-all duration-300 group-hover:border-dark-accent group-hover:bg-dark-accent/5 ${
                      errors.images ? 'border-red-500/50' : 'border-dark-accent/50'
                    }`}>
                      <FiCamera className="w-8 h-8 sm:w-12 sm:h-12 text-dark-accent mb-2 sm:mb-4" />
                      <span className="text-dark-accent font-semibold text-sm sm:text-base mb-1 sm:mb-2">Drop photos here</span>
                      <span className="text-gray-400 text-xs sm:text-sm text-center px-2">or tap to browse</span>
                    </div>
                  </label>
                </div>

                {/* Preview images */}
                {selectedImages.slice(0, 6).map((image, index) => (
                  <div key={index} className="relative group aspect-square">
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-full object-cover rounded-lg sm:rounded-xl"
                    />
                    <button
                      onClick={() => removeImage(index)}
                      className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 touch-manipulation"
                    >
                      <FiX className="w-3 h-3 sm:w-4 sm:h-4" />
                    </button>
                  </div>
                ))}

                {/* Empty slots */}
                {Array.from({ length: Math.max(0, 6 - selectedImages.length) }).map((_, index) => (
                  <div key={`empty-${index}`} className="aspect-square bg-gray-800/50 border border-gray-600/30 rounded-lg sm:rounded-xl flex items-center justify-center">
                    <span className="text-gray-500 text-xl sm:text-2xl">+</span>
                  </div>
                ))}
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg sm:rounded-xl p-3 sm:p-4">
                <div className="flex items-start gap-3">
                  <HiOutlineLightBulb className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="text-blue-400 font-semibold mb-1 text-sm sm:text-base">Photo Tips</h3>
                    <ul className="text-gray-300 text-xs sm:text-sm space-y-1">
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
            <div className="p-4 sm:p-8">
              <div className="text-center mb-6 sm:mb-8">
                <FiEdit className="w-12 h-12 sm:w-16 sm:h-16 text-dark-accent mx-auto mb-3 sm:mb-4" />
                <h2 className="text-xl sm:text-2xl font-bold text-dark-text mb-2">Item Details</h2>
                <p className="text-gray-400 text-sm sm:text-base">Provide detailed information about your item</p>
              </div>

              <div className="space-y-6 sm:space-y-8">
                {/* 1. Item Information */}
                <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                  <div className="flex items-center gap-3 mb-4 sm:mb-6">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-white">Item Information</h3>
                      <p className="text-gray-400 text-sm">Basic details about your item</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-300 font-semibold mb-2 text-sm sm:text-base">
                        Title <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g., iPhone 14 Pro Max - Space Black"
                        className={`w-full bg-gray-800/50 border rounded-lg sm:rounded-xl px-3 py-3 sm:px-4 sm:py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-dark-accent transition-all duration-300 text-sm sm:text-base ${
                          errors.title ? 'border-red-500/50 ring-2 ring-red-500/20' : 'border-gray-600/50'
                        }`}
                        value={formData.title}
                        onChange={(e) => {
                          setFormData({ ...formData, title: e.target.value })
                          if (errors.title) {
                            setErrors({ ...errors, title: null })
                          }
                        }}
                      />
                      {errors.title && (
                        <p className="text-red-400 text-xs sm:text-sm mt-1">{errors.title}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-gray-300 font-semibold mb-2 text-sm sm:text-base">
                        Description <span className="text-red-400">*</span>
                      </label>
                      <textarea
                        placeholder="Describe your item in detail. Include condition, specifications, reason for selling..."
                        rows={4}
                        className={`w-full bg-gray-800/50 border rounded-lg sm:rounded-xl px-3 py-3 sm:px-4 sm:py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-dark-accent transition-all duration-300 resize-none text-sm sm:text-base ${
                          errors.description ? 'border-red-500/50 ring-2 ring-red-500/20' : 'border-gray-600/50'
                        }`}
                        value={formData.description}
                        onChange={(e) => {
                          setFormData({ ...formData, description: e.target.value })
                          if (errors.description) {
                            setErrors({ ...errors, description: null })
                          }
                        }}
                      />
                      {errors.description && (
                        <p className="text-red-400 text-xs sm:text-sm mt-1">{errors.description}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* 2. Category */}
                <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                  <div className="flex items-center gap-3 mb-4 sm:mb-6">
                    <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-white">Category</h3>
                      <p className="text-gray-400 text-sm">Choose the best category for your item</p>
                    </div>
                  </div>
                  
                  {errors.category && (
                    <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                      <p className="text-red-400 text-xs sm:text-sm">{errors.category}</p>
                    </div>
                  )}
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                    {categories.map((category, index) => {
                      const Icon = category.icon
                      const isSelected = formData.category === category.name
                      return (
                        <button
                          key={index}
                          type="button"
                          onClick={() => {
                            setFormData({ ...formData, category: category.name })
                            if (errors.category) {
                              setErrors({ ...errors, category: null })
                            }
                          }}
                          className={`group relative p-3 sm:p-4 rounded-lg sm:rounded-xl border-2 transition-all duration-300 touch-manipulation ${
                            isSelected
                              ? 'border-dark-accent bg-dark-accent/10 shadow-lg'
                              : `border-gray-600/50 bg-gray-800/30 hover:border-gray-500 hover:bg-gray-800/50 ${errors.category ? 'border-red-500/50' : ''}`
                          }`}
                        >
                          <Icon className={`w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 sm:mb-3 ${isSelected ? 'text-dark-accent' : 'text-gray-400 group-hover:text-gray-300'}`} />
                          <span className={`block text-xs sm:text-sm font-semibold text-center ${isSelected ? 'text-dark-accent' : 'text-gray-300'}`}>
                            {category.name}
                          </span>
                          {isSelected && (
                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-dark-accent rounded-full flex items-center justify-center">
                              <FiCheck className="w-3 h-3 text-white" />
                            </div>
                          )}
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* 3. Pricing */}
                <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                  <div className="flex items-center gap-3 mb-4 sm:mb-6">
                    <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-sm">3</div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-white">Pricing</h3>
                      <p className="text-gray-400 text-sm">Set a competitive price</p>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-gray-300 font-semibold mb-2 text-sm sm:text-base">
                      Price (CAD) <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                        <FiDollarSign className="w-5 h-5 text-gray-400" />
                      </div>
                      <input
                        type="number"
                        placeholder="0.00"
                        min="0"
                        step="0.01"
                        className={`w-full bg-gray-800/50 border rounded-lg sm:rounded-xl pl-10 sm:pl-12 pr-3 py-3 sm:pr-4 sm:py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300 text-sm sm:text-base ${
                          errors.price ? 'border-red-500/50 ring-2 ring-red-500/20' : 'border-gray-600/50'
                        }`}
                        value={formData.price}
                        onChange={(e) => {
                          setFormData({ ...formData, price: e.target.value })
                          if (errors.price) {
                            setErrors({ ...errors, price: null })
                          }
                        }}
                      />
                    </div>
                    {errors.price && (
                      <p className="text-red-400 text-xs sm:text-sm mt-1">{errors.price}</p>
                    )}
                  </div>
                </div>

                {/* 4. Condition */}
                <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                  <div className="flex items-center gap-3 mb-4 sm:mb-6">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm">4</div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-white">Condition</h3>
                      <p className="text-gray-400 text-sm">Rate the condition of your item</p>
                    </div>
                  </div>
                  
                  {errors.condition && (
                    <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                      <p className="text-red-400 text-xs sm:text-sm">{errors.condition}</p>
                    </div>
                  )}
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    {conditions.map((condition, index) => {
                      const isSelected = formData.condition === condition.name
                      return (
                        <button
                          key={index}
                          type="button"
                          onClick={() => {
                            setFormData({ ...formData, condition: condition.name })
                            if (errors.condition) {
                              setErrors({ ...errors, condition: null })
                            }
                          }}
                          className={`group relative text-left p-3 sm:p-4 rounded-lg sm:rounded-xl border-2 transition-all duration-300 touch-manipulation ${
                            isSelected
                              ? 'border-purple-400 bg-purple-500/10 shadow-lg'
                              : `border-gray-600/50 bg-gray-800/30 hover:border-gray-500 hover:bg-gray-800/50 ${errors.condition ? 'border-red-500/50' : ''}`
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-3 h-3 rounded-full flex-shrink-0 ${isSelected ? 'bg-purple-400' : 'bg-gray-500'}`}></div>
                            <div>
                              <h4 className={`font-bold text-sm sm:text-base ${isSelected ? 'text-purple-300' : 'text-gray-300'}`}>
                                {condition.name}
                              </h4>
                              <p className={`text-xs sm:text-sm ${isSelected ? 'text-purple-400' : 'text-gray-400'}`}>
                                {condition.description}
                              </p>
                            </div>
                          </div>
                          {isSelected && (
                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-purple-400 rounded-full flex items-center justify-center">
                              <FiCheck className="w-3 h-3 text-white" />
                            </div>
                          )}
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Writing Tips */}
                <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg sm:rounded-xl p-4 sm:p-6">
                  <div className="flex items-start gap-3">
                    <HiOutlineLightBulb className="w-5 h-5 sm:w-6 sm:h-6 text-orange-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="text-orange-400 font-semibold mb-3 text-sm sm:text-base">Writing Tips for Better Sales</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-gray-300">
                        <div>
                          <h4 className="font-semibold text-white mb-2">Title Tips:</h4>
                          <ul className="space-y-1">
                            <li>• Include brand and model</li>
                            <li>• Mention key features</li>
                            <li>• Keep it concise but descriptive</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-white mb-2">Description Tips:</h4>
                          <ul className="space-y-1">
                            <li>• Be honest about condition</li>
                            <li>• Include original purchase info</li>
                            <li>• Mention what's included</li>
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
            <div className="p-4 sm:p-8">
              <div className="text-center mb-6 sm:mb-8">
                <BiUser className="w-12 h-12 sm:w-16 sm:h-16 text-dark-accent mx-auto mb-3 sm:mb-4" />
                <h2 className="text-xl sm:text-2xl font-bold text-dark-text mb-2">Contact Information</h2>
                <p className="text-gray-400 text-sm sm:text-base">How buyers can reach you</p>
              </div>

              <div className="max-w-2xl mx-auto space-y-6">
                {/* Contact Method Selection */}
                <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                  <div className="flex items-center gap-3 mb-4 sm:mb-6">
                    <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-white">Preferred Contact Method</h3>
                      <p className="text-gray-400 text-sm">Choose how buyers should contact you</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    {['Email', 'Phone'].map((method) => {
                      const isSelected = formData.contactMethod === method.toLowerCase()
                      const Icon = method === 'Email' ? BiEnvelope : BiPhone
                      return (
                        <button
                          key={method}
                          type="button"
                          onClick={() => setFormData({ ...formData, contactMethod: method.toLowerCase() })}
                          className={`flex items-center gap-3 p-3 sm:p-4 rounded-lg sm:rounded-xl border-2 transition-all duration-300 touch-manipulation ${
                            isSelected
                              ? 'border-cyan-400 bg-cyan-500/10 shadow-lg'
                              : 'border-gray-600/50 bg-gray-800/30 hover:border-gray-500 hover:bg-gray-800/50'
                          }`}
                        >
                          <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${isSelected ? 'text-cyan-400' : 'text-gray-400'}`} />
                          <span className={`font-semibold text-sm sm:text-base ${isSelected ? 'text-cyan-300' : 'text-gray-300'}`}>
                            {method}
                          </span>
                          {isSelected && (
                            <div className="ml-auto w-5 h-5 bg-cyan-400 rounded-full flex items-center justify-center">
                              <FiCheck className="w-3 h-3 text-white" />
                            </div>
                          )}
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Contact Details */}
                <div className="bg-gradient-to-r from-green-500/10 to-teal-500/10 border border-green-500/30 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                  <div className="flex items-center gap-3 mb-4 sm:mb-6">
                    <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-white">Contact Details</h3>
                      <p className="text-gray-400 text-sm">Your contact information</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-300 font-semibold mb-2 text-sm sm:text-base">
                        Email Address <span className="text-red-400">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                          <BiEnvelope className="w-5 h-5 text-gray-400" />
                        </div>
                        <input
                          type="email"
                          placeholder="your.email@uwaterloo.ca"
                          className={`w-full bg-gray-800/50 border rounded-lg sm:rounded-xl pl-10 sm:pl-12 pr-3 py-3 sm:pr-4 sm:py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300 text-sm sm:text-base ${
                            errors.email ? 'border-red-500/50 ring-2 ring-red-500/20' : 'border-gray-600/50'
                          }`}
                          value={formData.email}
                          onChange={(e) => {
                            setFormData({ ...formData, email: e.target.value })
                            if (errors.email) {
                              setErrors({ ...errors, email: null })
                            }
                          }}
                        />
                      </div>
                      {errors.email && (
                        <p className="text-red-400 text-xs sm:text-sm mt-1">{errors.email}</p>
                      )}
                    </div>

                    {formData.contactMethod === 'phone' && (
                      <div>
                        <label className="block text-gray-300 font-semibold mb-2 text-sm sm:text-base">
                          Phone Number
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                            <BiPhone className="w-5 h-5 text-gray-400" />
                          </div>
                          <input
                            type="tel"
                            placeholder="(xxx) xxx-xxxx"
                            className="w-full bg-gray-800/50 border border-gray-600/50 rounded-lg sm:rounded-xl pl-10 sm:pl-12 pr-3 py-3 sm:pr-4 sm:py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300 text-sm sm:text-base"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Meeting Preferences */}
                <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                  <div className="flex items-center gap-3 mb-4 sm:mb-6">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm">3</div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-white">Meeting Preferences</h3>
                      <p className="text-gray-400 text-sm">Where to meet buyers</p>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-gray-300 font-semibold mb-2 text-sm sm:text-base">
                      Preferred Meeting Location
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                        <BiMapPin className="w-5 h-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        placeholder="e.g., SLC, DC Library, Tim Hortons on University"
                        className="w-full bg-gray-800/50 border border-gray-600/50 rounded-lg sm:rounded-xl pl-10 sm:pl-12 pr-3 py-3 sm:pr-4 sm:py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 text-sm sm:text-base"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                {/* Safety Tips */}
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg sm:rounded-xl p-4 sm:p-6">
                  <div className="flex items-start gap-3">
                    <HiOutlineLightBulb className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="text-yellow-400 font-semibold mb-3 text-sm sm:text-base">Safety Tips</h3>
                      <ul className="text-gray-300 text-xs sm:text-sm space-y-1">
                        <li>• Meet in public places on campus (SLC, libraries, food courts)</li>
                        <li>• Bring a friend or meet during busy hours</li>
                        <li>• Check buyer's WatIAM credentials before meeting</li>
                        <li>• Trust your instincts - if something feels off, cancel</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="border-t border-gray-700/50 p-4 sm:p-6 bg-gray-800/30">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-4xl mx-auto">
              {currentStep > 1 && (
                <button
                  onClick={prevStep}
                  className="flex items-center justify-center gap-2 px-4 py-3 sm:px-6 sm:py-4 bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 font-semibold rounded-lg sm:rounded-xl transition-all duration-300 text-sm sm:text-base touch-manipulation"
                >
                  <FiArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                  Previous
                </button>
              )}
              
              <div className="flex-1" />
              
              {currentStep < 3 ? (
                <button
                  onClick={nextStep}
                  className="flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-dark-accent to-yellow-300 hover:from-dark-accent/90 hover:to-yellow-300/90 text-black font-bold rounded-lg sm:rounded-xl transition-all duration-300 text-sm sm:text-base touch-manipulation shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                >
                  Continue
                  <FiArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 disabled:from-gray-600 disabled:to-gray-600 text-white font-bold rounded-lg sm:rounded-xl transition-all duration-300 text-sm sm:text-base touch-manipulation shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:transform-none disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-white"></div>
                      Publishing...
                    </>
                  ) : (
                    <>
                      <FiCheck className="w-4 h-4 sm:w-5 sm:h-5" />
                      Publish Listing
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddNewItem