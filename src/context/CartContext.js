"use client";

import { createContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

// Create a Context for the Cart
export const CartContext = createContext();

// Create a Provider component
export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    // Load cart from localStorage if it exists
    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            setCart(JSON.parse(storedCart));
        }
    }, []);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    // Function to add product to the cart with quantity
    const addToCart = (product, quantity) => {
        setCart((prevCart) => {
            const cartCopy = [...prevCart];
            const existingProductIndex = cartCopy.findIndex((item) => item.product.id === product.id);

            if (existingProductIndex !== -1) {
                // If product exists, increment its quantity
                cartCopy[existingProductIndex].quantity += quantity;
            } else {
                // Add new product to the cart with specified quantity
                cartCopy.push({ product, quantity });
            }

            return cartCopy;
        });
        
        toast.success(`${product.title} added to the cart`)
    };

    // Function to update the quantity of a product in the cart
    const updateCartQuantity = (productId, newQuantity) => {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.product.id === productId ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    // Function to remove a product from the cart by id
    const removeFromCart = (product, orderPlaced=false) => {
        setCart((prevCart) => prevCart.filter((item) => item.product.id !== product.id));
        if (orderPlaced){
            toast.success('Congratulations! Order Placed!');
        } else {
            toast.error(
                `${product.title} removed from cart`
            )
        }
    };

    // Function to clear the entire cart
    const clearCart = () => {
        setCart([]);
    };

    return (
        <CartContext.Provider
            value={{ cart, addToCart, removeFromCart, clearCart, updateCartQuantity }}
        >
            {children}
        </CartContext.Provider>
    );
};
