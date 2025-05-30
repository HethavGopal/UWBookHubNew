import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import getImgUrl from '../../utils/getImgUrl'
import { FiShoppingCart, FiHeart, FiShare2, FiStar, FiUser, FiMapPin, FiMail, FiPhone, FiBookOpen, FiTrendingUp } from 'react-icons/fi'
import { HiOutlineThumbUp, HiOutlineThumbDown, HiOutlineEye } from 'react-icons/hi'

const BookDetails = () => {
  const { id } = useParams()
  const [book, setBook] = useState(null)
  const [activeTab, setActiveTab] = useState('overview')
  const [isFavorited, setIsFavorited] = useState(false)
  const [showContactInfo, setShowContactInfo] = useState(false)
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)

  useEffect(() => {
    fetch('/books.json')
      .then(res => res.json())
      .then(data => {
        const foundBook = data.find(b => b._id === parseInt(id))
        setBook(foundBook)
      })
  }, [id])

  if (!book) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
        <div className="text-dark-text text-xl">Loading...</div>
      </div>
    )
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: book.title,
        text: `Check out this book: ${book.title}`,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    }
  }

  const mockReviews = [
    { id: 1, user: "Sarah M.", rating: 5, comment: "Great condition book! Exactly as described.", date: "2 days ago" },
    { id: 2, user: "Mike R.", rating: 4, comment: "Good deal, fast response from seller.", date: "1 week ago" },
    { id: 3, user: "Emma L.", rating: 5, comment: "Perfect for my coursework. Highly recommend!", date: "2 weeks ago" }
  ]

  const mockSimilarBooks = [
    { id: 2, title: "Advanced Chemistry", price: 45, image: "book-2.png" },
    { id: 3, title: "Organic Chemistry", price: 52, image: "book-3.png" },
    { id: 4, title: "Physics Fundamentals", price: 38, image: "book-4.png" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Main Book Information */}
        <div className="bg-gradient-to-b from-gray-900/95 to-gray-800/95 backdrop-blur-md rounded-2xl p-8 border border-gray-700/50 shadow-2xl mb-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Image Section */}
            <div className="flex items-center justify-center p-6 bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-xl">
              <div className="relative group">
                <img
                  src={getImgUrl(book.coverImage)}
                  alt={book.title}
                  className="max-h-[500px] object-contain rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-4 right-4 bg-dark-accent text-black px-3 py-1 rounded-full text-sm font-bold">
                  {book.category}
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-dark-text via-gray-200 to-dark-text bg-clip-text text-transparent mb-4">
                  {book.title}
                </h1>
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FiStar
                        key={star}
                        className={`w-5 h-5 ${star <= 4 ? 'text-dark-accent fill-current' : 'text-gray-400'}`}
                      />
                    ))}
                    <span className="text-gray-400 ml-2">(4.2 • 28 reviews)</span>
                  </div>
                </div>
              </div>

              <p className="text-gray-300 text-lg leading-relaxed">{book.description}</p>

              {/* Price Section */}
              <div className="bg-gradient-to-r from-dark-accent/20 to-yellow-300/20 p-4 rounded-xl border border-dark-accent/30">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-3xl font-bold text-dark-accent">${book.newPrice}</span>
                    <span className="text-gray-400 ml-2">• Negotiable</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-400">Condition</div>
                    <div className="text-green-400 font-semibold">Excellent</div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-4">
                <button className="bg-gradient-to-r from-dark-accent to-yellow-300 hover:from-yellow-300 hover:to-dark-accent text-black font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-dark-accent/25 flex items-center justify-center gap-2">
                  <FiShoppingCart className="text-xl" />
                  Contact Seller
                </button>
                
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setIsFavorited(!isFavorited)}
                    className={`p-4 rounded-xl border transition-all duration-300 flex items-center justify-center ${
                      isFavorited 
                        ? 'bg-red-500/20 border-red-500/50 text-red-400' 
                        : 'bg-gray-700/50 border-gray-600/50 text-gray-400 hover:text-red-400'
                    }`}
                  >
                    <FiHeart className={`text-xl ${isFavorited ? 'fill-current' : ''}`} />
                  </button>
                  
                  <button
                    onClick={handleShare}
                    className="p-4 rounded-xl border bg-gray-700/50 border-gray-600/50 text-gray-400 hover:text-dark-accent transition-all duration-300 flex items-center justify-center"
                  >
                    <FiShare2 className="text-xl" />
                  </button>
                </div>
              </div>

              {/* Seller Quick Info */}
              <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 p-4 rounded-xl border border-gray-700/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-dark-accent to-yellow-300 rounded-full flex items-center justify-center">
                      <FiUser className="text-black" />
                    </div>
                    <div>
                      <div className="text-dark-text font-semibold">Alex Johnson</div>
                      <div className="text-gray-400 text-sm">UW Student • 4.8★ (45 sales)</div>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowContactInfo(!showContactInfo)}
                    className="text-dark-accent hover:text-yellow-300 transition-colors duration-300 text-sm font-semibold"
                  >
                    {showContactInfo ? 'Hide' : 'Show'} Contact
                  </button>
                </div>
                
                {showContactInfo && (
                  <div className="mt-4 pt-4 border-t border-gray-700/50 space-y-2 animate-in slide-in-from-top-1 duration-300">
                    <div className="flex items-center gap-2 text-gray-300">
                      <FiMail className="w-4 h-4" />
                      <span>alex.johnson@uw.edu</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <FiPhone className="w-4 h-4" />
                      <span>(206) 555-0123</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <FiMapPin className="w-4 h-4" />
                      <span>University District, Seattle</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="bg-gradient-to-b from-gray-900/95 to-gray-800/95 backdrop-blur-md rounded-2xl border border-gray-700/50 shadow-2xl">
          {/* Tab Navigation */}
          <div className="flex border-b border-gray-700/50">
            {[
              { id: 'overview', label: 'Overview', icon: FiBookOpen },
              { id: 'reviews', label: 'Reviews', icon: FiStar },
              { id: 'similar', label: 'Similar Books', icon: FiTrendingUp }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'text-dark-accent border-b-2 border-dark-accent bg-dark-accent/10'
                    : 'text-gray-400 hover:text-dark-text'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-dark-text mb-4">Book Details</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Category:</span>
                      <span className="text-dark-text font-semibold">{book.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Condition:</span>
                      <span className="text-green-400 font-semibold">Excellent</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Availability:</span>
                      <span className="text-dark-accent font-semibold">Available Now</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Location:</span>
                      <span className="text-dark-text">University District</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Meetup Options:</span>
                      <span className="text-dark-text">Campus, Coffee Shop</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Views:</span>
                      <span className="text-gray-300 flex items-center gap-1">
                        <HiOutlineEye className="w-4 h-4" />
                        247 views
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-bold text-dark-text">Student Reviews</h3>
                  <button className="bg-gradient-to-r from-dark-accent to-yellow-300 text-black px-4 py-2 rounded-lg font-semibold hover:from-yellow-300 hover:to-dark-accent transition-all duration-300">
                    Write Review
                  </button>
                </div>
                
                <div className="space-y-4">
                  {mockReviews.map((review) => (
                    <div key={review.id} className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 p-4 rounded-xl border border-gray-700/50">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-dark-text">{review.user}</span>
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <FiStar
                                key={star}
                                className={`w-4 h-4 ${star <= review.rating ? 'text-dark-accent fill-current' : 'text-gray-400'}`}
                              />
                            ))}
                          </div>
                        </div>
                        <span className="text-gray-400 text-sm">{review.date}</span>
                      </div>
                      <p className="text-gray-300">{review.comment}</p>
                      <div className="flex items-center gap-4 mt-3">
                        <button className="flex items-center gap-1 text-gray-400 hover:text-green-400 transition-colors">
                          <HiOutlineThumbUp className="w-4 h-4" />
                          <span className="text-sm">Helpful (3)</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'similar' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-dark-text">Similar Books</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  {mockSimilarBooks.map((similarBook) => (
                    <div key={similarBook.id} className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 p-4 rounded-xl border border-gray-700/50 hover:border-dark-accent/50 transition-all duration-300 cursor-pointer group">
                      <img
                        src={getImgUrl(similarBook.image)}
                        alt={similarBook.title}
                        className="w-full h-48 object-cover rounded-lg mb-4 group-hover:scale-105 transition-transform duration-300"
                      />
                      <h4 className="font-semibold text-dark-text mb-2">{similarBook.title}</h4>
                      <p className="text-dark-accent font-bold">${similarBook.price}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookDetails 