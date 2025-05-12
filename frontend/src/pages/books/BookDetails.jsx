import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import getImgUrl from '../../utils/getImgUrl'
import { FiShoppingCart } from 'react-icons/fi'

const BookDetails = () => {
  const { id } = useParams()
  const [book, setBook] = useState(null)

  useEffect(() => {
    fetch('/books.json')
      .then(res => res.json())
      .then(data => {
        const foundBook = data.find(b => b._id === parseInt(id))
        setBook(foundBook)
      })
  }, [id])

  

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8">
      <div className="bg-white shadow-2xl rounded-2xl p-8 border-t-4 border-[#FF3811]">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Image Section */}
          <div className="flex items-center justify-center p-4">
            <img
              src={getImgUrl(book.coverImage)}
              alt={book.title}
              className="max-h-[500px] object-contain"
            />
          </div>

          {/* Content Section */}
          <div className="space-y-6">
            <div>
              <span className="text-[#FF3811] font-bold">{book.category}</span>
              <h1 className="text-4xl font-bold text-gray-800 mt-2">{book.title}</h1>
            </div>

            <p className="text-gray-600 text-lg">{book.description}</p>

            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold text-gray-900">${book.newPrice}</span>
              <span className="text-xl text-gray-500 line-through">${book.oldPrice}</span>
            </div>

            <button className="w-full md:w-auto bg-[#FFB700] text-black py-3 px-8 rounded-lg hover:bg-[#F2A900] transition-colors duration-300 flex items-center justify-center gap-2">
              <FiShoppingCart className="text-xl" />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookDetails 