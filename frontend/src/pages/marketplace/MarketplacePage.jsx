import React, { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import getBaseUrl from '../../utils/baseURL'
import { Link, useSearchParams } from 'react-router-dom'
import { 
  FiSearch, 
  FiFilter, 
  FiGrid, 
  FiList, 
  FiMapPin, 
  FiCalendar, 
  FiHeart,
  FiShare2,
  FiEye,
  FiDollarSign,
  FiRefreshCw,
  FiSliders,
  FiX,
  FiChevronDown,
  FiChevronUp
} from 'react-icons/fi'
import { BsShield, BsFilter } from 'react-icons/bs'
import { HiOutlineAdjustments } from 'react-icons/hi'

const MarketplacePage = () => {
  const { currentUser } = useAuth()
  const [searchParams, setSearchParams] = useSearchParams()
  const [listings, setListings] = useState([])
  const [filteredListings, setFilteredListings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  // Search and Filter States
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedCondition, setSelectedCondition] = useState('all')
  const [priceRange, setPriceRange] = useState({ min: '', max: '' })
  const [selectedLocation, setSelectedLocation] = useState('')
  const [sortBy, setSortBy] = useState('newest')
  const [viewMode, setViewMode] = useState('grid')
  
  // UI States
  const [showFilters, setShowFilters] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(12)
  const [favorites, setFavorites] = useState(new Set())
  
  // Stats
  const [stats, setStats] = useState({
    total: 0,
    categories: {},
    priceRange: { min: 0, max: 1000 }
  })

  // Categories and Conditions
  const categories = [
    { value: 'all', label: 'All Categories', icon: '📦' },
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
    { value: 'all', label: 'All Conditions' },
    { value: 'new', label: 'Brand New', color: 'text-green-400 bg-green-400/20' },
    { value: 'like-new', label: 'Like New', color: 'text-blue-400 bg-blue-400/20' },
    { value: 'good', label: 'Good', color: 'text-yellow-400 bg-yellow-400/20' },
    { value: 'fair', label: 'Fair', color: 'text-orange-400 bg-orange-400/20' }
  ]

  // Initialize filters from URL parameters
  useEffect(() => {
    const categoryParam = searchParams.get('category')
    const searchParam = searchParams.get('search') 
    const conditionParam = searchParams.get('condition')
    const sortParam = searchParams.get('sort')

    if (categoryParam && categories.find(cat => cat.value === categoryParam)) {
      setSelectedCategory(categoryParam)
    }
    if (searchParam) {
      setSearchTerm(searchParam)
    }
    if (conditionParam && conditions.find(cond => cond.value === conditionParam)) {
      setSelectedCondition(conditionParam)
    }
    if (sortParam) {
      setSortBy(sortParam)
    }
    
    // Scroll to top when page loads or parameters change
    window.scrollTo(0, 0)
  }, [])

  // Update URL when filters change
  const updateSearchParams = (newParams) => {
    const params = new URLSearchParams(searchParams)
    
    Object.entries(newParams).forEach(([key, value]) => {
      if (value && value !== 'all' && value !== '') {
        params.set(key, value)
      } else {
        params.delete(key)
      }
    })
    
    setSearchParams(params)
  }

  // Update category filter and URL
  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
    updateSearchParams({ category })
  }

  // Update search term and URL
  const handleSearchChange = (search) => {
    setSearchTerm(search)
    updateSearchParams({ search })
  }

  // Update condition filter and URL
  const handleConditionChange = (condition) => {
    setSelectedCondition(condition)
    updateSearchParams({ condition })
  }

  // Update sort and URL
  const handleSortChange = (sort) => {
    setSortBy(sort)
    updateSearchParams({ sort })
  }

  // Fetch all listings
  const fetchAllListings = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${getBaseUrl()}/api/listings/get-all-listings`)
      
      if (!response.ok) {
        throw new Error('Failed to fetch listings')
      }

      const data = await response.json()
      const activeListings = data.listings?.filter(listing => listing.status === 'active') || []
      setListings(activeListings)
      
      // Calculate stats
      calculateStats(activeListings)
      
    } catch (err) {
      setError(err.message)
      console.error('Error fetching listings:', err)
    } finally {
      setLoading(false)
    }
  }

  // Calculate statistics
  const calculateStats = (listingsData) => {
    const total = listingsData.length
    const categories = {}
    let minPrice = Infinity
    let maxPrice = 0

    listingsData.forEach(listing => {
      // Category counts
      categories[listing.category] = (categories[listing.category] || 0) + 1
      
      // Price range
      if (listing.price < minPrice) minPrice = listing.price
      if (listing.price > maxPrice) maxPrice = listing.price
    })

    setStats({
      total,
      categories,
      priceRange: { min: minPrice === Infinity ? 0 : minPrice, max: maxPrice }
    })
  }

  // Filter and sort listings
  useEffect(() => {
    let filtered = [...listings]

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(listing => 
        listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        listing.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        listing.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(listing => listing.category === selectedCategory)
    }

    // Condition filter
    if (selectedCondition !== 'all') {
      filtered = filtered.filter(listing => listing.condition === selectedCondition)
    }

    // Price range filter
    if (priceRange.min !== '') {
      filtered = filtered.filter(listing => listing.price >= parseFloat(priceRange.min))
    }
    if (priceRange.max !== '') {
      filtered = filtered.filter(listing => listing.price <= parseFloat(priceRange.max))
    }

    // Location filter
    if (selectedLocation) {
      filtered = filtered.filter(listing => 
        listing.location?.toLowerCase().includes(selectedLocation.toLowerCase())
      )
    }

    // Sorting
    filtered.sort((a, b) => {
      switch(sortBy) {
        case 'newest': return new Date(b.createdAt) - new Date(a.createdAt)
        case 'oldest': return new Date(a.createdAt) - new Date(b.createdAt)
        case 'price-low': return a.price - b.price
        case 'price-high': return b.price - a.price
        case 'title': return a.title.localeCompare(b.title)
        default: return 0
      }
    })

    setFilteredListings(filtered)
    setCurrentPage(1) // Reset to first page when filters change
  }, [listings, searchTerm, selectedCategory, selectedCondition, priceRange, selectedLocation, sortBy])

  useEffect(() => {
    fetchAllListings()
  }, [])

  // Helper functions
  const getConditionColor = (condition) => {
    const conditionObj = conditions.find(c => c.value === condition)
    return conditionObj?.color || 'text-gray-400 bg-gray-400/20'
  }

  const toggleFavorite = (listingId) => {
    const newFavorites = new Set(favorites)
    if (newFavorites.has(listingId)) {
      newFavorites.delete(listingId)
    } else {
      newFavorites.add(listingId)
    }
    setFavorites(newFavorites)
  }

  const clearFilters = () => {
    setSearchTerm('')
    setSelectedCategory('all')
    setSelectedCondition('all')
    setPriceRange({ min: '', max: '' })
    setSelectedLocation('')
    setSortBy('newest')
    // Clear URL parameters
    setSearchParams(new URLSearchParams())
  }

  // Pagination
  const totalPages = Math.ceil(filteredListings.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentListings = filteredListings.slice(startIndex, endIndex)

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-dark-accent mx-auto mb-4"></div>
          <p className="text-dark-text text-lg">Loading marketplace...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-dark-text via-gray-200 to-dark-text bg-clip-text text-transparent mb-2">
                Marketplace
              </h1>
              <p className="text-gray-400">
                {stats.total} active listings • Find what you need
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={fetchAllListings}
                className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-dark-text px-4 py-2 rounded-lg transition-colors duration-200"
                disabled={loading}
              >
                <FiRefreshCw className={`text-sm ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </button>
              {currentUser && (
                <Link
                  to="/add-new-item"
                  className="flex items-center gap-2 bg-gradient-to-r from-dark-accent to-yellow-300 text-black px-6 py-2 rounded-lg font-semibold hover:scale-105 transition-transform duration-200"
                >
                  <FiDollarSign className="text-sm" />
                  Sell Item
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 p-4 rounded-xl border border-gray-700/50">
            <div className="text-center">
              <p className="text-2xl font-bold text-dark-accent">{stats.total}</p>
              <p className="text-gray-400 text-sm">Total Items</p>
            </div>
          </div>
          <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 p-4 rounded-xl border border-gray-700/50">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-400">{Object.keys(stats.categories).length}</p>
              <p className="text-gray-400 text-sm">Categories</p>
            </div>
          </div>
        </div>

        {/* Search and Quick Filters */}
        <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 p-4 sm:p-6 rounded-xl border border-gray-700/50 mb-8">
          <div className="flex flex-col gap-4">
            {/* Search Bar */}
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search items, descriptions, categories..."
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-dark-text placeholder-gray-400 focus:outline-none focus:border-dark-accent transition-colors duration-200 text-sm sm:text-base"
              />
            </div>

            {/* Quick Filters and Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              {/* Category Quick Filters */}
              <div className="flex flex-wrap gap-2 flex-1">
                {categories.slice(0, 4).map(category => (
                  <button
                    key={category.value}
                    onClick={() => handleCategoryChange(category.value)}
                    className={`px-2 sm:px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                      selectedCategory === category.value
                        ? 'bg-dark-accent text-black'
                        : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'
                    }`}
                  >
                    <span className="mr-1">{category.icon}</span>
                    <span className="hidden sm:inline">{category.label}</span>
                    <span className="sm:hidden">{category.label.split(' ')[0]}</span>
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2 justify-between sm:justify-end">
                {/* Advanced Filters Toggle */}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 ${
                    showFilters ? 'bg-dark-accent text-black' : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'
                  }`}
                >
                  <HiOutlineAdjustments className="text-sm" />
                  <span className="hidden sm:inline">Filters</span>
                  {showFilters ? <FiChevronUp className="text-xs" /> : <FiChevronDown className="text-xs" />}
                </button>

                {/* View Mode Toggle */}
                <div className="flex bg-gray-700/50 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`px-2 sm:px-3 py-1.5 text-sm transition-colors duration-200 ${
                      viewMode === 'grid' ? 'bg-dark-accent text-black' : 'text-gray-300 hover:text-dark-text'
                    }`}
                    title="Grid View"
                  >
                    <FiGrid />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`px-2 sm:px-3 py-1.5 text-sm transition-colors duration-200 ${
                      viewMode === 'list' ? 'bg-dark-accent text-black' : 'text-gray-300 hover:text-dark-text'
                    }`}
                    title="List View"
                  >
                    <FiList />
                  </button>
                </div>

                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="px-2 sm:px-3 py-1.5 bg-gray-700/50 border border-gray-600 rounded-lg text-dark-text text-xs sm:text-sm focus:outline-none focus:border-dark-accent transition-colors duration-200 min-w-0"
                >
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                  <option value="price-low">Price ↑</option>
                  <option value="price-high">Price ↓</option>
                  <option value="title">A-Z</option>
                </select>
              </div>
            </div>
          </div>

          {/* Advanced Filters Panel */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-600/50">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-900/50 border border-gray-600 rounded-lg text-dark-text focus:outline-none focus:border-dark-accent transition-colors duration-200 text-sm"
                  >
                    {categories.map(cat => (
                      <option key={cat.value} value={cat.value}>{cat.label}</option>
                    ))}
                  </select>
                </div>

                {/* Condition Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Condition</label>
                  <select
                    value={selectedCondition}
                    onChange={(e) => handleConditionChange(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-900/50 border border-gray-600 rounded-lg text-dark-text focus:outline-none focus:border-dark-accent transition-colors duration-200 text-sm"
                  >
                    {conditions.map(condition => (
                      <option key={condition.value} value={condition.value}>{condition.label}</option>
                    ))}
                  </select>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Price Range</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={priceRange.min}
                      onChange={(e) => setPriceRange({...priceRange, min: e.target.value})}
                      className="w-full px-3 py-2 bg-gray-900/50 border border-gray-600 rounded-lg text-dark-text placeholder-gray-400 focus:outline-none focus:border-dark-accent transition-colors duration-200 text-sm"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange({...priceRange, max: e.target.value})}
                      className="w-full px-3 py-2 bg-gray-900/50 border border-gray-600 rounded-lg text-dark-text placeholder-gray-400 focus:outline-none focus:border-dark-accent transition-colors duration-200 text-sm"
                    />
                  </div>
                </div>

                {/* Location Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
                  <input
                    type="text"
                    placeholder="Enter location..."
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-900/50 border border-gray-600 rounded-lg text-dark-text placeholder-gray-400 focus:outline-none focus:border-dark-accent transition-colors duration-200 text-sm"
                  />
                </div>
              </div>

              {/* Clear Filters */}
              <div className="mt-4 flex justify-end">
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-2 px-4 py-2 bg-red-900/20 hover:bg-red-900/40 text-red-400 rounded-lg transition-colors duration-200 text-sm"
                >
                  <FiX className="text-sm" />
                  Clear All Filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Active Filters Display */}
        {(searchTerm || selectedCategory !== 'all' || selectedCondition !== 'all' || priceRange.min || priceRange.max || selectedLocation) && (
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <span className="text-xs sm:text-sm text-gray-400">Active filters:</span>
            {searchTerm && (
              <span className="px-2 py-1 bg-dark-accent/20 text-dark-accent rounded text-xs sm:text-sm">
                Search: "{searchTerm.length > 20 ? searchTerm.substring(0, 20) + '...' : searchTerm}"
              </span>
            )}
            {selectedCategory !== 'all' && (
              <span className="px-2 py-1 bg-blue-400/20 text-blue-400 rounded text-xs sm:text-sm">
                {categories.find(c => c.value === selectedCategory)?.label}
              </span>
            )}
            {selectedCondition !== 'all' && (
              <span className="px-2 py-1 bg-green-400/20 text-green-400 rounded text-xs sm:text-sm">
                {conditions.find(c => c.value === selectedCondition)?.label}
              </span>
            )}
            {(priceRange.min || priceRange.max) && (
              <span className="px-2 py-1 bg-purple-400/20 text-purple-400 rounded text-xs sm:text-sm">
                ${priceRange.min || '0'} - ${priceRange.max || '∞'}
              </span>
            )}
            {selectedLocation && (
              <span className="px-2 py-1 bg-orange-400/20 text-orange-400 rounded text-xs sm:text-sm">
                Location: {selectedLocation.length > 15 ? selectedLocation.substring(0, 15) + '...' : selectedLocation}
              </span>
            )}
          </div>
        )}

        {/* Results Summary */}
        <div className="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
          <p className="text-gray-400 text-sm">
            Showing {startIndex + 1}-{Math.min(endIndex, filteredListings.length)} of {filteredListings.length} results
          </p>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-900/20 border border-red-700/30 text-red-400 p-4 rounded-xl mb-6">
            Error loading listings: {error}
          </div>
        )}

        {/* Listings Grid/List */}
        {currentListings.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-dark-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiSearch className="text-4xl text-dark-accent" />
            </div>
            <h3 className="text-xl font-semibold text-dark-text mb-2">No listings found</h3>
            <p className="text-gray-400 mb-6">Try adjusting your search criteria or filters</p>
            <button
              onClick={clearFilters}
              className="bg-gradient-to-r from-dark-accent to-yellow-300 text-black px-6 py-3 rounded-lg font-semibold hover:scale-105 transition-transform duration-200"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <>
            <div className={viewMode === 'grid' 
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6' 
              : 'space-y-4'
            }>
              {currentListings.map((listing) => (
                viewMode === 'grid' ? (
                  // Grid View Card
                  <div key={listing._id} className="bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-xl overflow-hidden border border-gray-700/50 hover:border-dark-accent/50 transition-all duration-300 group">
                    <div className="relative">
                      <Link to={`/listings/${listing._id}`}>
                        <img
                          src={listing.images?.[0] || '/placeholder-book.jpg'}
                          alt={listing.title}
                          className="w-full h-40 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </Link>
                      <div className="absolute top-2 left-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getConditionColor(listing.condition)}`}>
                          <BsShield className="inline w-2.5 h-2.5 mr-1" />
                          {listing.condition}
                        </span>
                      </div>
                      <div className="absolute top-2 right-2 flex gap-1">
                        <button
                          onClick={() => toggleFavorite(listing._id)}
                          className={`p-1.5 rounded-full transition-colors duration-200 ${
                            favorites.has(listing._id) 
                              ? 'bg-red-500 text-white' 
                              : 'bg-black/20 text-white hover:bg-red-500/80'
                          }`}
                        >
                          <FiHeart className="text-xs" fill={favorites.has(listing._id) ? 'currentColor' : 'none'} />
                        </button>
                      </div>
                    </div>

                    <div className="p-3 sm:p-4">
                      <Link to={`/listings/${listing._id}`}>
                        <h3 className="font-semibold text-dark-text mb-2 line-clamp-2 group-hover:text-dark-accent transition-colors duration-200 text-sm sm:text-base">
                          {listing.title}
                        </h3>
                      </Link>
                      
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-lg sm:text-xl font-bold text-dark-accent">${listing.price}</span>
                        <span className="text-xs sm:text-sm text-gray-400 capitalize">{listing.category}</span>
                      </div>

                      {listing.location && (
                        <div className="flex items-center gap-1 text-xs text-gray-400 mb-3">
                          <FiMapPin className="w-3 h-3 flex-shrink-0" />
                          <span className="truncate">{listing.location}</span>
                        </div>
                      )}

                      <div className="flex items-center gap-1 text-xs text-gray-400 mb-4">
                        <FiCalendar className="w-3 h-3 flex-shrink-0" />
                        <span>Listed {new Date(listing.createdAt).toLocaleDateString()}</span>
                      </div>

                      <Link
                        to={`/listings/${listing._id}`}
                        className="w-full bg-gradient-to-r from-dark-accent/90 to-yellow-300/90 hover:from-dark-accent hover:to-yellow-300 text-black py-2 px-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 text-sm font-bold transform hover:scale-105"
                      >
                        <FiEye className="text-sm" />
                        <span className="hidden sm:inline">View Details</span>
                        <span className="sm:hidden">View</span>
                      </Link>
                    </div>
                  </div>
                ) : (
                  // List View Row
                  <div key={listing._id} className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-xl border border-gray-700/50 hover:border-dark-accent/50 transition-all duration-300 p-3 sm:p-4">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <Link to={`/listings/${listing._id}`}>
                        <img
                          src={listing.images?.[0] || '/placeholder-book.jpg'}
                          alt={listing.title}
                          className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg flex-shrink-0"
                        />
                      </Link>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <Link to={`/listings/${listing._id}`}>
                            <h3 className="font-semibold text-dark-text hover:text-dark-accent transition-colors duration-200 truncate pr-2 sm:pr-4 text-sm sm:text-base">
                              {listing.title}
                            </h3>
                          </Link>
                          <span className="text-lg sm:text-xl font-bold text-dark-accent flex-shrink-0">${listing.price}</span>
                        </div>
                        
                        <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-400 mb-2 flex-wrap">
                          <span className="capitalize">{listing.category}</span>
                          <span className={`px-2 py-1 rounded text-xs ${getConditionColor(listing.condition)}`}>
                            {listing.condition}
                          </span>
                          {listing.location && (
                            <span className="flex items-center gap-1">
                              <FiMapPin className="w-3 h-3 flex-shrink-0" />
                              <span className="truncate max-w-20 sm:max-w-none">{listing.location}</span>
                            </span>
                          )}
                          <span className="flex items-center gap-1">
                            <FiCalendar className="w-3 h-3 flex-shrink-0" />
                            <span className="hidden sm:inline">{new Date(listing.createdAt).toLocaleDateString()}</span>
                            <span className="sm:hidden">{new Date(listing.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                          </span>
                        </div>
                        
                        <p className="text-gray-400 text-xs sm:text-sm line-clamp-2 hidden sm:block">{listing.description}</p>
                      </div>

                      <div className="flex flex-col sm:flex-row items-center gap-2 flex-shrink-0">
                        <button
                          onClick={() => toggleFavorite(listing._id)}
                          className={`p-2 rounded-lg transition-colors duration-200 ${
                            favorites.has(listing._id) 
                              ? 'bg-red-500 text-white' 
                              : 'bg-gray-700 text-gray-300 hover:bg-red-500/80 hover:text-white'
                          }`}
                        >
                          <FiHeart className="text-sm" fill={favorites.has(listing._id) ? 'currentColor' : 'none'} />
                        </button>
                        <Link
                          to={`/listings/${listing._id}`}
                          className="bg-gradient-to-r from-dark-accent to-yellow-300 text-black py-2 px-3 sm:px-4 rounded-lg font-semibold hover:scale-105 transition-transform duration-200 flex items-center gap-2 text-sm"
                        >
                          <FiEye className="text-sm" />
                          <span className="hidden sm:inline">View</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                )
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex justify-center">
                <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto pb-2">
                  <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-2 sm:px-3 py-2 bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed text-dark-text rounded-lg transition-colors duration-200 text-sm flex-shrink-0"
                  >
                    <span className="hidden sm:inline">Previous</span>
                    <span className="sm:hidden">Prev</span>
                  </button>
                  
                  {[...Array(Math.min(totalPages, window.innerWidth < 640 ? 3 : 5))].map((_, index) => {
                    const maxVisible = window.innerWidth < 640 ? 3 : 5
                    const pageNumber = currentPage <= Math.floor(maxVisible/2) + 1 ? index + 1 : currentPage - Math.floor(maxVisible/2) + index
                    if (pageNumber > totalPages) return null
                    
                    return (
                      <button
                        key={pageNumber}
                        onClick={() => setCurrentPage(pageNumber)}
                        className={`px-2 sm:px-3 py-2 rounded-lg transition-colors duration-200 text-sm flex-shrink-0 ${
                          currentPage === pageNumber
                            ? 'bg-dark-accent text-black'
                            : 'bg-gray-800 hover:bg-gray-700 text-dark-text'
                        }`}
                      >
                        {pageNumber}
                      </button>
                    )
                  })}
                  
                  <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-2 sm:px-3 py-2 bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed text-dark-text rounded-lg transition-colors duration-200 text-sm flex-shrink-0"
                  >
                    <span className="hidden sm:inline">Next</span>
                    <span className="sm:hidden">Next</span>
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default MarketplacePage 