"use client";

import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../context/CartContext';
import Link from 'next/link';
import Image from 'next/image';
import { FiTrash } from 'react-icons/fi';
import { Loader } from '@/components';

export default function CartPage() {
    const { cart, removeFromCart, clearCart, updateCartQuantity } = useContext(CartContext);
    const [error, setError] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true); // Loading state
    const [finalPrice, setFinalPrice] = useState(0);

    useEffect(() => {
        const fetchAllProducts = async () => {
            let url = "/api/search";
            setLoading(true); // Set loading to true before fetching

            try {
                const res = await fetch(url);
                const data = await res.json();

                if (!res.ok) {
                    throw new Error(`Failed to fetch search results: ${res.statusText}`);
                }

                setProducts(data); // Set the fetched product data
            } catch (error) {
                console.error("Error fetching search results:", error);
                setError("Failed to load search results");
            } finally {
                setLoading(false); // Set loading to false after fetching
            }
        };

        fetchAllProducts();
    }, []);

    // Handle incrementing and decrementing quantity
    const handleQuantityChange = (productId, newQuantity) => {
        if (newQuantity >= 1 && newQuantity <= 5) {
            updateCartQuantity(productId, newQuantity);
        }
    };

    // Check if a product is available
    const isAvailable = (product) => {
        return products.some((p) => p.id === product.id); // Check if the product exists in the products array
    };

    const handleRemoveFromCart = (product) => {
        removeFromCart(product);
    };

    // Calculate the total price for available products
    useEffect(() => {
        const total = cart.reduce((acc, item) => {
            if (isAvailable(item.product)) {
                return acc + item.product.price * item.quantity;
            }
            return acc;
        }, 0);

        setFinalPrice(total);
    }, [cart, products]);

    return (
        <div className="w-10/12 mx-auto py-12 text-text-light dark:text-text-dark">
            <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

            {loading ? (
                <div className='w-full text-center'>
                    <Loader />
                </div>
            ) : (
                <div>
                    {cart.length === 0 ? (
                        <p className="text-center">
                            Your cart is empty.{' '}
                            <Link href="/shop" className="text-blue-500 underline">
                                Continue shopping
                            </Link>
                        </p>
                    ) : (
                        <>
                            <ul className="divide-y divide-gray-200">
                                {cart.map((item) => {
                                    const imageUrl = item.product.images[0].replace(/[\[\]"]/g, '').trim();
                                    const available = isAvailable(item.product);

                                    return (
                                        <li
                                            key={item.product.id}
                                            className={`flex-col my-4 w-full border-2 overflow-hidden border-surface-light dark:border-surface-dark rounded-lg`}
                                        >
                                            {!available && (
                                                <div className='w-full bg-error-dark py-1 text-center text-sm'>
                                                    This Product is not available for now
                                                </div>
                                            )}
                                            <div className={`flex items-center p-2 ${!available && 'bg-red-100 text-text-light'}`}>
                                                {/* Product Image */}
                                                <div className="w-20 h-20 mr-4">
                                                    <Link href={`/product/${item.product.id}`} passHref>
                                                        <Image
                                                            src={imageUrl}
                                                            alt={item.product.title}
                                                            width={80}
                                                            height={80}
                                                            className="object-cover rounded-lg"
                                                        />
                                                    </Link>
                                                </div>

                                                {/* Product Details */}
                                                <div className="ml-2 flex-grow">
                                                    <h2 className="text-lg font-light">{item.product.title}</h2>
                                                    <p className='text-xs font-light text-gray-500'>${item.product.price} each</p>
                                                    <div className="flex justify-between w-full">
                                                        <p className="text-2xl font-normal">${item.product.price * item.quantity}</p>

                                                        {/* Quantity Changer */}
                                                        <div className="flex items-center space-x-2">
                                                            <button
                                                                className="px-2 py-1 bg-surface-light dark:bg-surface-dark rounded"
                                                                onClick={() =>
                                                                    handleQuantityChange(item.product.id, item.quantity - 1)
                                                                }
                                                                disabled={item.quantity <= 1}
                                                            >
                                                                -
                                                            </button>
                                                            <span>{item.quantity}</span>
                                                            <button
                                                                className="px-2 py-1 bg-surface-light dark:bg-surface-dark rounded "
                                                                onClick={() =>
                                                                    handleQuantityChange(item.product.id, item.quantity + 1)
                                                                }
                                                                disabled={item.quantity >= 5}
                                                            >
                                                                +
                                                            </button>

                                                            {/* Remove Button */}
                                                            <button
                                                                onClick={() => handleRemoveFromCart(item.product)}
                                                                className="text-error-light hover:text-error-dark ml-2"
                                                            >
                                                                <FiTrash size={20} />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>

                            <div className='mt-6 w-full grid grid-cols-1 md:grid-cols-2 gap-2 items-center'>
                                <div>
                                    <p className="text-2xl font-light">Total Price: <span className='font-bold'>${finalPrice.toFixed(2)}</span></p>
                                </div>
                                <div className='w-full flex flex-col md:flex-row justify-end gap-2'>
                                    <button
                                        className="bg-secondary text-white px-4 py-2 rounded hover:bg-primary w-full md:w-fit"
                                        disabled={finalPrice === 0}
                                    >
                                        Proceed to Checkout
                                    </button>
                                    <button
                                        className="bg-error-dark text-white px-4 py-2 rounded hover:bg-error-light w-full md:w-fit"
                                        onClick={clearCart}
                                    >
                                        Clear Cart
                                    </button>
                                </div>
                            </div>

                            
                        </>
                    )}
                </div>
            )}
        </div>
    );
}
