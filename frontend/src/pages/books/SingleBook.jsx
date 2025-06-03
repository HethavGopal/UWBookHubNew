import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { FiHeart, FiShare2, FiUser, FiMapPin, FiMail, FiPhone, FiBookOpen, FiTrendingUp, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { BsShield } from 'react-icons/bs'
import { HiOutlineEye } from 'react-icons/hi'
import getBaseUrl from '../../utils/baseURL'

const SingleBook = () => {
    const { id } = useParams();
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('overview');
    const [isFavorited, setIsFavorited] = useState(false);
    const [showContactInfo, setShowContactInfo] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Scroll to top immediately when component mounts or ID changes
    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'instant'
        });
        // Reset image index when ID changes
        setCurrentImageIndex(0);
    }, [id]);

    useEffect(() => {
        const fetchListing = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${getBaseUrl()}/api/listings/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch listing');
                }
                const data = await response.json();
                setListing(data.listing);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchListing();
        }
    }, [id]);

    // Helper function to get condition color
    const getConditionColor = (condition) => {
        switch(condition) {
            case 'new': return 'text-green-400 bg-green-400/20'
            case 'like-new': return 'text-blue-400 bg-blue-400/20'
            case 'good': return 'text-yellow-400 bg-yellow-400/20'
            case 'fair': return 'text-orange-400 bg-orange-400/20'
            default: return 'text-gray-400 bg-gray-400/20'
        }
    };

    if(loading) return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-dark-accent"></div>
        </div>
    );
    
    if(error || !listing) return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
            <div className="text-red-400 text-xl">Failed to load listing details: {error}</div>
        </div>
    );

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: listing.title,
                text: `Check out this listing: ${listing.title}`,
                url: window.location.href,
            })
        } else {
            navigator.clipboard.writeText(window.location.href)
            alert('Link copied to clipboard!')
        }
    }

    

    const mockSimilarListings = [
        { id: 2, title: "Advanced Chemistry", price: 45, image: "https://via.placeholder.com/300x400/4A90E2/FFFFFF?text=Chemistry" },
        { id: 3, title: "Organic Chemistry", price: 52, image: "https://via.placeholder.com/300x400/E74C3C/FFFFFF?text=Organic" },
        { id: 4, title: "Physics Fundamentals", price: 38, image: "https://via.placeholder.com/300x400/2ECC71/FFFFFF?text=Physics" }
    ]

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 py-8">
            <div className="max-w-7xl mx-auto px-4">
                {/* Breadcrumb */}
                <nav className="mb-8">
                    <ol className="flex items-center space-x-2 text-sm text-gray-400">
                        <li><Link to="/" className="hover:text-dark-accent transition-colors duration-300">Home</Link></li>
                        <li>/</li>
                        <li><Link to="/marketplace" className="hover:text-dark-accent transition-colors duration-300">Marketplace</Link></li>
                        <li>/</li>
                        <li className="text-dark-accent">{listing?.title}</li>
                    </ol>
                </nav>

                {/* Main Listing Information */}
                <div className="bg-gradient-to-b from-gray-900/95 to-gray-800/95 backdrop-blur-md rounded-2xl p-8 border border-gray-700/50 shadow-2xl mb-8">
                    <div className="grid lg:grid-cols-2 gap-8">
                        {/* Image Section */}
                        <div className="flex flex-col p-6 bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-xl relative min-h-[650px]">
                            {/* Category badge - top right of container */}
                            <div className="absolute top-2 right-2 bg-dark-accent text-black px-3 py-1 rounded-full text-sm font-bold z-10">
                                {listing.category}
                            </div>
                            
                            {/* Condition badge - top left of container */}
                            <div className={`absolute top-2 left-2 px-3 py-1 rounded-full text-sm font-bold z-10 ${getConditionColor(listing.condition)}`}>
                                <BsShield className="inline w-3 h-3 mr-1" />
                                {listing.condition}
                            </div>
                            
                            {/* Navigation arrows at container edges - only show if multiple images */}
                            {listing.images && listing.images.length > 1 && (
                                <>
                                    <button
                                        onClick={() => setCurrentImageIndex(prev => prev === 0 ? listing.images.length - 1 : prev - 1)}
                                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-dark-accent/90 hover:bg-dark-accent text-black p-2.5 rounded-full transition-all duration-300 shadow-lg z-10"
                                    >
                                        <FiChevronLeft className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={() => setCurrentImageIndex(prev => prev === listing.images.length - 1 ? 0 : prev + 1)}
                                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-dark-accent/90 hover:bg-dark-accent text-black p-2.5 rounded-full transition-all duration-300 shadow-lg z-10"
                                    >
                                        <FiChevronRight className="w-5 h-5" />
                                    </button>
                                </>
                            )}
                            
                            {/* Main image container - centered */}
                            <div className="flex-1 flex items-center justify-center py-4">
                                <div className="relative">
                                    <img
                                        src={listing.images && listing.images.length > 0 ? listing.images[currentImageIndex] : '/placeholder-book.jpg'}
                                        alt={listing.title}
                                        className="max-h-[500px] max-w-full object-contain rounded-xl shadow-2xl transition-all duration-300 border border-gray-600/30"
                                    />
                                </div>
                            </div>
                            
                            {/* Image counter - between main image and thumbnails */}
                            {listing.images && listing.images.length > 1 && (
                                <div className="flex justify-center mb-2">
                                    <div className="bg-dark-accent/90 text-black px-4 py-2 rounded-full text-sm font-semibold shadow-md">
                                        {currentImageIndex + 1} / {listing.images.length}
                                    </div>
                                </div>
                            )}
                            
                            {/* Thumbnail strip at the very bottom */}
                            {listing.images && listing.images.length > 1 && (
                                <div className="mt-auto pt-4 border-t border-gray-600/30">
                                    <div className="flex gap-2 justify-center max-w-full overflow-x-auto pb-1">
                                        {listing.images.map((image, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setCurrentImageIndex(index)}
                                                className={`flex-shrink-0 w-14 h-14 rounded-md overflow-hidden border-2 transition-all duration-300 ${
                                                    index === currentImageIndex 
                                                        ? 'border-dark-accent shadow-md ring-1 ring-dark-accent/50' 
                                                        : 'border-gray-500/50 hover:border-gray-400 hover:shadow-sm'
                                                }`}
                                            >
                                                <img
                                                    src={image}
                                                    alt={`${listing.title} - Image ${index + 1}`}
                                                    className="w-full h-full object-cover"
                                                />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Content Section */}
                        <div className="space-y-6">
                            <div>
                                <h1 className="text-4xl font-bold bg-gradient-to-r from-dark-text via-gray-200 to-dark-text bg-clip-text text-transparent mb-4">
                                    {listing.title}
                                </h1>
                                {listing.location && (
                                    <div className="flex items-center gap-2 text-gray-400 mb-4">
                                        <FiMapPin className="w-4 h-4" />
                                        <span>{listing.location}</span>
                                    </div>
                                )}
                            </div>

                            <p className="text-gray-300 text-lg leading-relaxed">{listing.description}</p>

                            {/* Price Section */}
                            <div className="bg-gradient-to-r from-dark-accent/20 to-yellow-300/20 p-4 rounded-xl border border-dark-accent/30">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <span className="text-3xl font-bold text-dark-accent">${listing.price}</span>
                                        <span className="text-gray-400 ml-2">• Negotiable</span>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-sm text-gray-400">Condition</div>
                                        <div className={`font-semibold capitalize ${getConditionColor(listing.condition).split(' ')[0]}`}>
                                            {listing.condition}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="grid grid-cols-2 gap-4">
                                <button 
                                    onClick={() => setShowContactInfo(!showContactInfo)}
                                    className="bg-gradient-to-r from-dark-accent to-yellow-300 hover:from-yellow-300 hover:to-dark-accent text-black font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-dark-accent/25 flex items-center justify-center gap-2">
                                    <FiMail className="text-xl" />
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
                                            <div className="text-dark-text font-semibold">Seller</div>
                                            <div className="text-gray-400 text-sm">UW Student • Active {new Date(listing.createdAt).toLocaleDateString()}</div>
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
                                            <span>{listing.email}</span>
                                        </div>
                                        {listing.phone && (
                                            <div className="flex items-center gap-2 text-gray-300">
                                                <FiPhone className="w-4 h-4" />
                                                <span>{listing.phone}</span>
                                            </div>
                                        )}
                                        {listing.meetingPoint && (
                                            <div className="flex items-center gap-2 text-gray-300">
                                                <FiMapPin className="w-4 h-4" />
                                                <span>Preferred meetup: {listing.meetingPoint}</span>
                                            </div>
                                        )}
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
                            { id: 'similar', label: 'Similar Items', icon: FiTrendingUp }
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
                                <h3 className="text-2xl font-bold text-dark-text mb-4">Listing Details</h3>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <div className="flex justify-between">
                                            <span className="text-gray-400">Category:</span>
                                            <span className="text-dark-text font-semibold capitalize">{listing.category}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-400">Condition:</span>
                                            <span className={`font-semibold capitalize ${getConditionColor(listing.condition).split(' ')[0]}`}>
                                                {listing.condition}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-400">Status:</span>
                                            <span className="text-dark-accent font-semibold capitalize">{listing.status || 'active'}</span>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        {listing.location && (
                                            <div className="flex justify-between">
                                                <span className="text-gray-400">Location:</span>
                                                <span className="text-dark-text">{listing.location}</span>
                                            </div>
                                        )}
                                        {listing.meetingPoint && (
                                            <div className="flex justify-between">
                                                <span className="text-gray-400">Meetup Options:</span>
                                                <span className="text-dark-text">{listing.meetingPoint}</span>
                                            </div>
                                        )}
                                        <div className="flex justify-between">
                                            <span className="text-gray-400">Listed:</span>
                                            <span className="text-gray-300">{new Date(listing.createdAt).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'similar' && (
                            <div className="space-y-6">
                                <h3 className="text-2xl font-bold text-dark-text">Similar Items</h3>
                                <div className="grid md:grid-cols-3 gap-6">
                                    {mockSimilarListings.map((similarListing) => (
                                        <div key={similarListing.id} className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 p-4 rounded-xl border border-gray-700/50 hover:border-dark-accent/50 transition-all duration-300 cursor-pointer group">
                                            <img
                                                src={similarListing.image}
                                                alt={similarListing.title}
                                                className="w-full h-48 object-cover rounded-lg mb-4 group-hover:scale-105 transition-transform duration-300"
                                            />
                                            <h4 className="font-semibold text-dark-text mb-2">{similarListing.title}</h4>
                                            <p className="text-dark-accent font-bold">${similarListing.price}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleBook;