import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import getImgUrl from '../../utils/getImgUrl'
import { removeFromCart, clearCart } from '../../redux/features/cart/cartSlice'

const CartPage = () => {
    const cartItems = useSelector((state) => state.cart.cartItems)
    const dispatch = useDispatch()

    const totalPrice = cartItems.reduce((acc, item) => acc + item.newPrice, 0).toFixed(2)

    const handleRemoveFromCart = (product) => {
        dispatch(removeFromCart(product?._id))
    }

    const handleClearCart = () => {
        dispatch(clearCart())
    }

    return (
        <>
            <div className="flex mt-8 h-full flex-col overflow-hidden bg-white shadow-xl rounded-lg">
                <div className="flex-1 overflow-y-auto px-4 py-5 sm:px-6">
                    <div className="flex items-start justify-between">
                        <div className="text-base font-medium text-gray-900">Shopping cart</div>
                        <div className="ml-3 flex h-7 items-center">
                            <button
                                onClick={handleClearCart}
                                type="button"
                                className="relative py-1 px-3 bg-red-900 text-white text-xs rounded-md hover:bg-red-800 transition-all duration-200"
                            >
                                Clear Cart
                            </button>
                        </div>
                    </div>

                    <div className="mt-6">
                        <div className="flow-root">
                            {cartItems.length > 0 ? (
                                <ul role="list" className="-my-4 divide-y divide-gray-200">
                                    {cartItems.map((product) => (
                                        <li key={product?._id} className="flex py-4">
                                            <div className="h-24 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 bg-white flex items-center justify-center p-2">
                                                <img
                                                    alt={product?.title}
                                                    src={getImgUrl(product?.coverImage)}
                                                    className="h-full w-auto object-contain hover:scale-105 transition-transform duration-200"
                                                />
                                            </div>

                                            <div className="ml-4 flex flex-1 flex-col">
                                                <div>
                                                    <div className="flex justify-between text-sm font-medium text-gray-900">
                                                        <h3>
                                                            <Link to='/' className="hover:text-red-900 transition-colors">{product?.title}</Link>
                                                        </h3>
                                                        <p className="ml-4">${product?.newPrice}</p>
                                                    </div>
                                                    <p className="mt-1 text-xs text-gray-500 capitalize"><span className="font-medium">Category:</span> {product?.category}</p>
                                                </div>
                                                <div className="flex flex-1 items-end justify-between text-xs">
                                                    <p className="text-gray-500"><span className="font-medium">Qty:</span> 1</p>

                                                    <div className="flex">
                                                        <button 
                                                        onClick={() => handleRemoveFromCart(product)}
                                                        type="button" 
                                                        className="font-medium text-red-900 hover:text-red-800 text-xs">
                                                            Remove
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className='text-sm text-gray-500'>No Products in Cart</p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                    <div className="flex justify-between text-sm font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>${totalPrice ? totalPrice : 0}</p>
                    </div>
                    <p className="mt-0.5 text-xs text-gray-500">Shipping and taxes calculated at checkout.</p>
                    <div className="mt-4">
                        <Link
                            to="/checkout"
                            className="flex items-center justify-center rounded-md border border-transparent bg-[#FFB700] px-4 py-2 text-sm font-medium text-black shadow-sm hover:bg-[#F2A900] transition-all duration-200"
                        >
                            Checkout
                        </Link>
                    </div>
                    <div className="mt-4 flex justify-center text-center text-xs text-gray-500">
                        <Link to="/" className="flex items-center text-red-900 hover:text-red-800">
                            <span>Continue Shopping</span>
                            <span aria-hidden="true" className="ml-1">&rarr;</span>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CartPage