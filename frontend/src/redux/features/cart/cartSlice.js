import { createSlice } from '@reduxjs/toolkit';
import Swal from 'sweetalert2'

const initialState = {
    cartItems: [],
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {
            addToCart: (state,action) => {
                const existingItem = state.cartItems.find(item => item._id === action.payload._id)
                if(!existingItem){
                    state.cartItems.push(action.payload)
                    Swal.fire({
                        toast: true,
                        position: "top-end",
                        icon: "success",
                        title: "Book added to cart",
                        showConfirmButton: false,
                        timer: 1500,
                        timerProgressBar: true,
                        iconColor: '#7f1d1d',
                        customClass: {
                            popup: 'toast-alert',
                            title: 'toast-title',
                            icon: 'toast-icon'
                        }
                    });
                    
                }else{
                    Swal.fire({
                        title: "Already in cart",
                        text: "This book is already in your cart",
                        icon: "warning",
                        showCancelButton: false,
                        confirmButtonColor: '#7f1d1d',
                        iconColor: '#FFB700',
                        confirmButtonText: "Okay",
                        width: '280px',
                        customClass: {
                            popup: 'small-alert',
                            title: 'small-alert-title',
                            confirmButton: 'tiny-button',
                            icon: 'small-icon'
                        }
                    })
                }
            },
            removeFromCart: (state,action) => {
                state.cartItems = state.cartItems.filter(item => item._id !== action.payload)
            },
            clearCart: (state) => {
                state.cartItems = []
            }
    }
})

export const {addToCart, removeFromCart, clearCart} = cartSlice.actions
export default cartSlice.reducer
 