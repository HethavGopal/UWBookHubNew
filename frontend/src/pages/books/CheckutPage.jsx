import React from 'react'
import { useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { useState } from 'react'        
import { useAuth } from '../../context/AuthContext'

const CheckutPage = () => {
    const cartItems = useSelector((state) => state.cart.cartItems);
    const totalPrice = cartItems.reduce((acc, item) => acc + item.newPrice, 0).toFixed(2);
    const {currentUser} = useAuth();

    const {
        register, 
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({
        mode: "onChange",
        defaultValues: {
            email: currentUser?.email || '',
        }
    });

    const [isChecked, setIsChecked] = useState(false);

    const onSubmit = (data) => {
        console.log(data)
        const newOrder  = {
            name: data.name,
            enamil: currentUser?.email,
            address: {
                city: data.city,
                country: data.country,
                state: data.state,
                zipcode: data.zipcode,
            },
            phone: data.phone,
            productsIds: cartItems.map((item) => item?._id),
            totalPrice: totalPrice,

        }
        console.log(newOrder)
    }

    // Add a direct form submission handler
    const handleFormSubmit = (e) => {
        e.preventDefault();
        console.log("Form submit event triggered");
        console.log("Form validation state:", { isValid, errors });
        
        handleSubmit((data) => {
            console.log("HandleSubmit callback reached");
            onSubmit(data);
        })(e);
    };

    return (
        <section className="min-h-screen bg-gray-50">
            <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                {/* Order Summary Section */}
                <div className="mb-8 p-6 bg-white border border-gray-200 rounded-lg">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Order Summary</h2>
                    <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                        <div>
                            <p className="text-gray-600 mb-1">Total Items: <span className="font-medium text-gray-800">{cartItems.length}</span></p>
                            <p className="text-gray-600">Payment Method: <span className="font-medium text-gray-800">Cash On Delivery</span></p>
                        </div>
                        <div className="text-right">
                            <p className="text-gray-600 mb-1">Total Amount:</p>
                            <p className="text-2xl font-bold text-red-900">${totalPrice}</p>
                        </div>
                    </div>
                </div>

                {/* Checkout Form Section */}
                <div className="bg-white border border-gray-200 rounded-lg">
                    <div className="p-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-6">Shipping Details</h2>
                        <form onSubmit={handleFormSubmit} className="grid gap-6 grid-cols-1 md:grid-cols-2">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                                <input
                                    {...register("name", { 
                                        required: "Name is required",
                                        minLength: { value: 2, message: "Name must be at least 2 characters" }
                                    })}
                                    type="text"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-900 focus:border-red-900"
                                />
                                {errors.name && <span className="text-red-500 text-xs mt-1">{errors.name.message}</span>}
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                                <input
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: "Invalid email address"
                                        }
                                    })}
                                    type="email"
                                    defaultValue={currentUser?.email}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-900 focus:border-red-900"
                                />
                                {errors.email && <span className="text-red-500 text-xs mt-1">{errors.email.message}</span>}
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                                <input
                                    {...register("phone", {
                                        required: "Phone number is required",
                                        pattern: {
                                            value: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4}$/,
                                            message: "Invalid phone number format"
                                        }
                                    })}
                                    
                                    type="tel"
                                    placeholder="+123 456 7890"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-900 focus:border-red-900"
                                />
                                {errors.phone && <span className="text-red-500 text-xs mt-1">{errors.phone.message}</span>}
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Street Address</label>
                                <input
                                    {...register("address", {
                                        required: "Address is required",
                                        minLength: { value: 5, message: "Address must be at least 5 characters" }
                                    })}
                                    type="text"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-900 focus:border-red-900"
                                />
                                {errors.address && <span className="text-red-500 text-xs mt-1">{errors.address.message}</span>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                                <input
                                    {...register("city", {
                                        required: "City is required"
                                    })}
                                    type="text"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-900 focus:border-red-900"
                                />
                                {errors.city && <span className="text-red-500 text-xs mt-1">{errors.city.message}</span>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">State / Province</label>
                                <input
                                    {...register("state", {
                                        required: "State is required"
                                    })}
                                    type="text"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-900 focus:border-red-900"
                                />
                                {errors.state && <span className="text-red-500 text-xs mt-1">{errors.state.message}</span>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                                <input
                                    {...register("country", {
                                        required: "Country is required"
                                    })}
                                    type="text"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-900 focus:border-red-900"
                                />
                                {errors.country && <span className="text-red-500 text-xs mt-1">{errors.country.message}</span>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">ZIP / Postal Code</label>
                                <input
                                    {...register("zipcode", {
                                        required: "Zipcode is required",
                                        pattern: {
                                            value: /^\d{5}(-\d{4})?$/,
                                            message: "Invalid zipcode format"
                                        }
                                    })}
                                    type="text"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-900 focus:border-red-900"
                                />
                                {errors.zipcode && <span className="text-red-500 text-xs mt-1">{errors.zipcode.message}</span>}
                            </div>

                            <div className="md:col-span-2 mt-4">
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={isChecked}
                                        onChange={(e) => setIsChecked(e.target.checked)}
                                        className="h-4 w-4 text-red-900 focus:ring-red-900 border-gray-300 rounded"
                                    />
                                    <label className="ml-2 text-sm text-gray-600">
                                        I agree to the{" "}
                                        <Link className="text-red-900 hover:text-red-800 underline">
                                            Terms & Conditions
                                        </Link>{" "}
                                        and{" "}
                                        <Link className="text-red-900 hover:text-red-800 underline">
                                            Shopping Policy
                                        </Link>
                                    </label>
                                </div>
                            </div>

                            <div className="md:col-span-2 mt-6">
                                <button
                                    type="submit"
                                    disabled={!isChecked}
                                    className={`w-full py-3 px-4 text-white font-medium rounded-md ${
                                        !isChecked
                                            ? "bg-gray-400 cursor-not-allowed"
                                            : "bg-red-900 hover:bg-red-800 transition-colors duration-200"
                                    }`}
                                >
                                    Place Order
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default CheckutPage