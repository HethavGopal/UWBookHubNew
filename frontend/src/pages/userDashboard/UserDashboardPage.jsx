import React, { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { auth } from '../../firebase/firebase.config'
import getBaseUrl from '../../utils/baseURL'
import { Link } from 'react-router-dom'
import { 
  FiPlus, 
  FiEdit3, 
  FiTrash2, 
  FiEye, 
  FiMapPin, 
  FiDollarSign, 
  FiCalendar, 
  FiPackage,
  FiSearch,
  FiFilter,
  FiGrid,
  FiList,
  FiTrendingUp,
  FiMessageSquare,
  FiShare2,
  FiPauseCircle,
  FiPlayCircle,
  FiRefreshCw
} from 'react-icons/fi'
import { BsShield } from 'react-icons/bs'
import { HiOutlineEye } from 'react-icons/hi'

const UserDashboardPage = () => {
  const { currentUser } = useAuth()
  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [viewMode, setViewMode] = useState('grid') // 'grid' or 'list'
  const [sortBy, setSortBy] = useState('newest')
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    inactive: 0
  })

  // Fetch user listings
  const fetchUserListings = async () => {
    if (!currentUser) return

    try {
      setLoading(true)
      const token = await currentUser.getIdToken()
      const response = await fetch(`${getBaseUrl()}/api/listings/user-listings`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error('Failed to fetch listings')
      }

      const data = await response.json()
      setListings(data.listings || [])
      
      // Calculate stats
      const total = data.listings?.length || 0
      const active = data.listings?.filter(l => l.status === 'active').length || 0
      const inactive = data.listings?.filter(l => l.status === 'inactive').length || 0
      
      setStats({
        total,
        active,
        inactive
      })

    } catch (err) {
      setError(err.message)
      console.error('Error fetching user listings:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (currentUser) {
      fetchUserListings()
    }
  }, [currentUser])

  // Delete listing
  const handleDeleteListing = async (listingId) => {
    if (!window.confirm('Are you sure you want to delete this listing?')) return

    try {
      const token = await currentUser.getIdToken()
      const response = await fetch(`${getBaseUrl()}/api/listings/${listingId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      if (response.ok) {
        setListings(listings.filter(listing => listing._id !== listingId))
        alert('Listing deleted successfully!')
      } else {
        throw new Error('Failed to delete listing')
      }
    } catch (err) {
      alert('Error deleting listing: ' + err.message)
    }
  }

  // Toggle listing status
  const handleToggleStatus = async (listingId, currentStatus) => {
    try {
      const token = await currentUser.getIdToken()
      const newStatus = currentStatus === 'active' ? 'inactive' : 'active'
      
      const response = await fetch(`${getBaseUrl()}/api/listings/${listingId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      })

      if (response.ok) {
        setListings(listings.map(listing => 
          listing._id === listingId 
            ? { ...listing, status: newStatus }
            : listing
        ))
        alert(`Listing ${newStatus === 'active' ? 'activated' : 'deactivated'} successfully!`)
      } else {
        throw new Error('Failed to update listing status')
      }
    } catch (err) {
      alert('Error updating listing: ' + err.message)
    }
  }

  // Helper function for condition colors
  const getConditionColor = (condition) => {
    switch(condition) {
      case 'new': return 'text-green-400 bg-green-400/20'
      case 'like-new': return 'text-blue-400 bg-blue-400/20'
      case 'good': return 'text-yellow-400 bg-yellow-400/20'
      case 'fair': return 'text-orange-400 bg-orange-400/20'
      default: return 'text-gray-400 bg-gray-400/20'
    }
  }

  // Filter and sort listings
  const filteredListings = listings
    .filter(listing => {
      const matchesSearch = listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           listing.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === 'all' || listing.category === selectedCategory
      const matchesStatus = selectedStatus === 'all' || listing.status === selectedStatus
      return matchesSearch && matchesCategory && matchesStatus
    })
    .sort((a, b) => {
      switch(sortBy) {
        case 'newest': return new Date(b.createdAt) - new Date(a.createdAt)
        case 'oldest': return new Date(a.createdAt) - new Date(b.createdAt)
        case 'price-high': return b.price - a.price
        case 'price-low': return a.price - b.price
        case 'title': return a.title.localeCompare(b.title)
        default: return 0
      }
    })

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'textbooks', label: 'Textbooks' },
    { value: 'electronics', label: 'Electronics' },
    { value: 'dorm', label: 'Dorm Essentials' },
    { value: 'clothing', label: 'Clothing' },
    { value: 'sports', label: 'Sports' },
    { value: 'gadgets', label: 'Phones & Gadgets' },
    { value: 'transport', label: 'Transportation' },
    { value: 'misc', label: 'Miscellaneous' }
  ]

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
        <div className="text-center p-8">
          <h2 className="text-2xl font-bold text-dark-text mb-4">Please log in to view your dashboard</h2>
          <Link 
            to="/login" 
            className="bg-gradient-to-r from-dark-accent to-yellow-300 text-black px-6 py-3 rounded-lg font-semibold hover:scale-105 transition-transform duration-200"
          >
            Login
          </Link>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-dark-accent mx-auto mb-4"></div>
          <p className="text-dark-text text-lg">Loading your listings...</p>
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
                My Listings
              </h1>
              <p className="text-gray-400">Manage your marketplace items</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={fetchUserListings}
                className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-dark-text px-4 py-2 rounded-lg transition-colors duration-200"
                disabled={loading}
              >
                <FiRefreshCw className={`text-sm ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </button>
              <Link
                to="/user/add-new-item"
                className="flex items-center gap-2 bg-gradient-to-r from-dark-accent to-yellow-300 text-black px-6 py-2 rounded-lg font-semibold hover:scale-105 transition-transform duration-200"
              >
                <FiPlus className="text-sm" />
                Add New Item
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 p-4 rounded-xl border border-gray-700/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-dark-accent/20 rounded-lg flex items-center justify-center">
                <FiPackage className="text-dark-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold text-dark-text">{stats.total}</p>
                <p className="text-gray-400 text-sm">Total Listings</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 p-4 rounded-xl border border-gray-700/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-400/20 rounded-lg flex items-center justify-center">
                <FiPlayCircle className="text-green-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-dark-text">{stats.active}</p>
                <p className="text-gray-400 text-sm">Active</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 p-4 rounded-xl border border-gray-700/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-400/20 rounded-lg flex items-center justify-center">
                <FiPauseCircle className="text-orange-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-dark-text">{stats.inactive}</p>
                <p className="text-gray-400 text-sm">Inactive</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 p-6 rounded-xl border border-gray-700/50 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            {/* Search */}
            <div className="md:col-span-2 relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search your listings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-900/50 border border-gray-600 rounded-lg text-dark-text placeholder-gray-400 focus:outline-none focus:border-dark-accent transition-colors duration-200"
              />
            </div>

            {/* Category Filter */}
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 bg-gray-900/50 border border-gray-600 rounded-lg text-dark-text focus:outline-none focus:border-dark-accent transition-colors duration-200"
              >
                {categories.map(cat => (
                  <option key={cat.value} value={cat.value}>{cat.label}</option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-3 py-2 bg-gray-900/50 border border-gray-600 rounded-lg text-dark-text focus:outline-none focus:border-dark-accent transition-colors duration-200"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            {/* Sort */}
            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 bg-gray-900/50 border border-gray-600 rounded-lg text-dark-text focus:outline-none focus:border-dark-accent transition-colors duration-200"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="price-high">Price: High to Low</option>
                <option value="price-low">Price: Low to High</option>
                <option value="title">Title A-Z</option>
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex bg-gray-900/50 border border-gray-600 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`flex-1 px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                  viewMode === 'grid' 
                    ? 'bg-dark-accent text-black' 
                    : 'text-gray-400 hover:text-dark-text'
                }`}
              >
                <FiGrid className="mx-auto" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`flex-1 px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                  viewMode === 'list' 
                    ? 'bg-dark-accent text-black' 
                    : 'text-gray-400 hover:text-dark-text'
                }`}
              >
                <FiList className="mx-auto" />
              </button>
            </div>
          </div>
        </div>

        {/* Listings */}
        {error && (
          <div className="bg-red-900/20 border border-red-700/30 text-red-400 p-4 rounded-xl mb-6">
            Error loading listings: {error}
          </div>
        )}

        {filteredListings.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-dark-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiPackage className="text-4xl text-dark-accent" />
            </div>
            <h3 className="text-xl font-semibold text-dark-text mb-2">
              {listings.length === 0 ? 'No listings yet' : 'No listings match your filters'}
            </h3>
            <p className="text-gray-400 mb-6">
              {listings.length === 0 
                ? 'Create your first listing to get started!' 
                : 'Try adjusting your search criteria'
              }
            </p>
            {listings.length === 0 && (
              <Link
                to="/user/add-new-item"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-dark-accent to-yellow-300 text-black px-6 py-3 rounded-lg font-semibold hover:scale-105 transition-transform duration-200"
              >
                <FiPlus className="text-sm" />
                Add Your First Item
              </Link>
            )}
          </div>
        ) : (
          <div className={viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' 
            : 'space-y-4'
          }>
            {filteredListings.map((listing) => (
              viewMode === 'grid' ? (
                // Grid View Card
                <div key={listing._id} className="bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-xl overflow-hidden border border-gray-700/50 hover:border-dark-accent/50 transition-all duration-300 group">
                  <div className="relative">
                    <img
                      src={listing.images?.[0] || '/placeholder-book.jpg'}
                      alt={listing.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 left-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getConditionColor(listing.condition)}`}>
                        <BsShield className="inline w-2.5 h-2.5 mr-1" />
                        {listing.condition}
                      </span>
                    </div>
                    <div className="absolute top-2 right-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        listing.status === 'active' 
                          ? 'text-green-400 bg-green-400/20' 
                          : 'text-orange-400 bg-orange-400/20'
                      }`}>
                        {listing.status}
                      </span>
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="font-semibold text-dark-text mb-2 line-clamp-2 group-hover:text-dark-accent transition-colors duration-200">
                      {listing.title}
                    </h3>
                    
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xl font-bold text-dark-accent">${listing.price}</span>
                      <span className="text-sm text-gray-400 capitalize">{listing.category}</span>
                    </div>

                    {listing.location && (
                      <div className="flex items-center gap-1 text-xs text-gray-400 mb-3">
                        <FiMapPin className="w-3 h-3" />
                        <span className="truncate">{listing.location}</span>
                      </div>
                    )}

                    <div className="flex items-center gap-1 text-xs text-gray-400 mb-4">
                      <FiCalendar className="w-3 h-3" />
                      <span>Listed {new Date(listing.createdAt).toLocaleDateString()}</span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <Link
                        to={`/listings/${listing._id}`}
                        className="flex-1 bg-gray-800 hover:bg-gray-700 text-dark-text py-2 px-3 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center gap-1"
                      >
                        <FiEye className="text-xs" />
                        View
                      </Link>
                      <button
                        onClick={() => handleToggleStatus(listing._id, listing.status)}
                        className={`bg-gray-800 hover:bg-gray-700 text-dark-text py-2 px-3 rounded-lg text-sm font-medium transition-colors duration-200 ${
                          listing.status === 'active' ? 'text-orange-400' : 'text-green-400'
                        }`}
                        title={listing.status === 'active' ? 'Deactivate' : 'Activate'}
                      >
                        {listing.status === 'active' ? <FiPauseCircle /> : <FiPlayCircle />}
                      </button>
                      <button
                        onClick={() => handleDeleteListing(listing._id)}
                        className="bg-red-900/20 hover:bg-red-900/40 text-red-400 py-2 px-3 rounded-lg text-sm font-medium transition-colors duration-200"
                        title="Delete"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                // List View Row
                <div key={listing._id} className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-xl border border-gray-700/50 hover:border-dark-accent/50 transition-all duration-300 p-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={listing.images?.[0] || '/placeholder-book.jpg'}
                      alt={listing.title}
                      className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                    />
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-dark-text truncate pr-4">{listing.title}</h3>
                        <span className="text-xl font-bold text-dark-accent flex-shrink-0">${listing.price}</span>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-400 mb-2">
                        <span className="capitalize">{listing.category}</span>
                        <span className={`px-2 py-1 rounded text-xs ${getConditionColor(listing.condition)}`}>
                          {listing.condition}
                        </span>
                        <span className={`px-2 py-1 rounded text-xs ${
                          listing.status === 'active' 
                            ? 'text-green-400 bg-green-400/20' 
                            : 'text-orange-400 bg-orange-400/20'
                        }`}>
                          {listing.status}
                        </span>
                        {listing.location && (
                          <span className="flex items-center gap-1">
                            <FiMapPin className="w-3 h-3" />
                            {listing.location}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <FiCalendar className="w-3 h-3" />
                          {new Date(listing.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Link
                        to={`/listings/${listing._id}`}
                        className="bg-gray-800 hover:bg-gray-700 text-dark-text py-2 px-3 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center gap-1"
                      >
                        <FiEye className="text-xs" />
                        View
                      </Link>
                      <button
                        onClick={() => handleToggleStatus(listing._id, listing.status)}
                        className={`bg-gray-800 hover:bg-gray-700 text-dark-text py-2 px-3 rounded-lg text-sm font-medium transition-colors duration-200 ${
                          listing.status === 'active' ? 'text-orange-400' : 'text-green-400'
                        }`}
                        title={listing.status === 'active' ? 'Deactivate' : 'Activate'}
                      >
                        {listing.status === 'active' ? <FiPauseCircle /> : <FiPlayCircle />}
                      </button>
                      <button
                        onClick={() => handleDeleteListing(listing._id)}
                        className="bg-red-900/20 hover:bg-red-900/40 text-red-400 py-2 px-3 rounded-lg text-sm font-medium transition-colors duration-200"
                        title="Delete"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </div>
                </div>
              )
            ))}
          </div>
        )}

        {/* Results Count */}
        {filteredListings.length > 0 && (
          <div className="mt-8 text-center text-gray-400">
            Showing {filteredListings.length} of {listings.length} listings
          </div>
        )}
      </div>
    </div>
  )
}

export default UserDashboardPage