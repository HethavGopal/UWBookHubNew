import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { useFetchBookByIdQuery } from '../../redux/features/cart/booksAPI'
import getImgUrl from '../../utils/getImgUrl'
import { FiShoppingCart, FiBookmark, FiShare2, FiBook, FiClock } from 'react-icons/fi'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../redux/features/cart/cartSlice'

const SingleBook = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const { data: book, isLoading, isError } = useFetchBookByIdQuery(id);

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
    };

    if(isLoading) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-900"></div>
        </div>
    );
    
    if(isError) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-red-600 text-xl">Failed to load book details</div>
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <nav className="mb-8">
                <ol className="flex items-center space-x-2 text-sm text-gray-500">
                    <li><Link to="/" className="hover:text-red-900">Home</Link></li>
                    <li>/</li>
                    <li className="text-red-900">{book?.category}</li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Left Column - Image */}
                <div className="flex flex-col space-y-6">
                    <div className="relative group">
                        <img
                            src={getImgUrl(book.coverImage)}
                            alt={book.title}
                            className="w-full max-w-md mx-auto object-contain rounded-lg"
                        />
                        <div className="absolute top-4 right-4 flex space-x-3">
                            <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-colors">
                                <FiBookmark className="w-5 h-5 text-red-900" />
                            </button>
                            <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-colors">
                                <FiShare2 className="w-5 h-5 text-red-900" />
                            </button>
                        </div>
                    </div>

                    {/* Quick Info Box */}
                    <div className="bg-red-50 p-6 rounded-lg space-y-4">
                        <h3 className="font-medium text-red-900 flex items-center gap-2">
                            <FiBook /> Quick Details
                        </h3>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <span className="text-gray-600">Course:</span>
                                <p className="font-medium">CS 246</p>
                            </div>
                            <div>
                                <span className="text-gray-600">Condition:</span>
                                <p className="font-medium">Good</p>
                            </div>
                            <div>
                                <span className="text-gray-600">Term Used:</span>
                                <p className="font-medium">Fall 2023</p>
                            </div>
                            <div>
                                <span className="text-gray-600">Campus:</span>
                                <p className="font-medium">Main Campus</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column - Content */}
                <div className="space-y-6">
                    <div>
                        <div className="flex items-center gap-3 mb-3">
                            <span className="px-3 py-1 bg-red-100 text-red-900 text-sm font-medium rounded-full">
                                {book?.category}
                            </span>
                            <span className="flex items-center gap-1 text-sm text-gray-500">
                                <FiClock className="w-4 h-4" />
                                Posted {new Date(book?.createdAt).toLocaleDateString()}
                            </span>
                        </div>

                        <h1 className="text-3xl font-bold text-gray-900 mb-4">{book.title}</h1>
                        
                        <div className="flex items-baseline gap-4 mb-6">
                            <span className="text-3xl font-bold text-red-900">${book.newPrice}</span>
                            <span className="text-xl text-gray-500 line-through">${book.oldPrice}</span>
                            <span className="px-2 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                                Save ${(book.oldPrice - book.newPrice).toFixed(2)}
                            </span>
                        </div>
                    </div>

                    <div className="prose prose-red max-w-none">
                        <h3 className="text-lg font-medium text-gray-900">About this book</h3>
                        <p className="text-gray-600 leading-relaxed">
                            {book.description}
                        </p>
                    </div>

                    <div className="border-t border-gray-200 pt-6 mt-8">
                        <div className="flex gap-4">
                            <button 
                                onClick={() => handleAddToCart(book)}
                                className="flex-1 bg-red-900 text-white px-8 py-3 rounded-lg hover:bg-red-800 transition-colors duration-300 flex items-center justify-center gap-2 font-medium"
                            >
                                <FiShoppingCart className="w-5 h-5" />
                                Add to Cart
                            </button>
                            <button 
                                className="px-8 py-3 border-2 border-red-900 text-red-900 rounded-lg hover:bg-red-50 transition-colors duration-300 font-medium"
                            >
                                Contact Seller
                            </button>
                        </div>
                        <p className="mt-4 text-sm text-gray-500 text-center">
                            Meet on campus for exchange • Secure payment through platform
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleBook;