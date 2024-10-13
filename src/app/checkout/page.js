"use client";

import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../context/CartContext";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { PaymentForm, Modal, CheckoutForm } from "@/components"; 

export default function CheckoutPage() {
    const { cart, removeFromCart, clearCart } = useContext(CartContext);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);
    const [isModalOpen, setModalOpen] = useState(false);
    const [availableItems, setAvailableItems] = useState([]);
    const router = useRouter();

    // Fetch all products and filter available items
    useEffect(() => {
        const fetchAllProducts = async () => {
        try {
            const res = await fetch("/api/search");
            const data = await res.json();

            if (!res.ok) {
                throw new Error("Failed to fetch products");
            }

            setProducts(data);
        } catch (error) {
            setError("Failed to load products.");
        } finally {
            setLoading(false);
        }
        };

        fetchAllProducts();
    }, []);

    // Filter available products and calculate total price
    useEffect(() => {
        const filterAvailableItems = () => {
            const available = cart.filter((item) =>
                products.some((product) => product.id === item.product.id)
            );

            setAvailableItems(available)

            const total = available.reduce(
                (sum, item) => sum + item.product.price * item.quantity,
                0
            );

            setTotalPrice(total);
        };

        if (products.length > 0) {
            filterAvailableItems();
        }
    }, [cart, products]);

    // Handle Checkout Button (opens modal)
    const handleCheckout = () => {
        setModalOpen(true); // Open modal when user clicks pay
    };

    const handleRecheckCart = () => {
        router.replace('/cart');
    }

    const handleOrderPlacement = () => {
        router.push("/order-confirmation");
        availableItems.forEach((item) => removeFromCart(item.product, true))
    }

    if (loading) {
        return (
        <div className="w-full text-center py-12">
            <p>Loading...</p>
        </div>
        );
    }

    return (
        <div className="w-10/12 mx-auto py-12 text-text-light dark:text-text-dark">
            <h1 className="text-4xl font-light mt-2 mb-8">Checkout</h1>

            {cart.length === 0 ? (
                <div className="w-full flex flex-col items-center justify-center">
                <p>Your Order is Empty</p>
                <Link href="/shop" className="text-blue-500 underline">
                    <button 
                        className="bg-transparent border-primary text-primary border-2 rounded-lg text-md mt-4 px-4 py-2 mx-auto hover:text-white hover:bg-primary"
                    >
                        Continue to Shopping
                    </button>
                </Link>
            </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Cart Summary (only available items) */}
                        <div>
                            <h2 className="text-xl font-semibold text-primary mb-4">Order Summary</h2>
                            <ul className="divide-y divide-gray-200">
                                {availableItems.map((item) => {
                                    const imageUrl = item.product.images[0]
                                        .replace(/[\[\]"]/g, "")
                                        .trim();

                                    return (
                                        <li key={item.product.id} className="flex items-center py-4">
                                            <div className="w-16 h-16 mr-4">
                                                <Image
                                                    src={imageUrl}
                                                    alt={item.product.title}
                                                    width={80}
                                                    height={80}
                                                    className="object-cover rounded-lg"
                                                />
                                            </div>
                                            <div className="flex-grow">
                                                <h3 className="text-lg">{item.product.title}</h3>
                                                <p className="text-xs text-gray-500">
                                                    ${item.product.price} each
                                                </p>
                                                <p className="text-sm font-semibold">
                                                    Total: ${item.product.price * item.quantity}
                                                </p>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                            <div className="mt-4 text-lg font-semibold">
                                Total Price: ${totalPrice.toFixed(2)}
                            </div>
                            <div className="w-full text-center">
                                <button 
                                    className="bg-transparent border-primary text-primary border-2 rounded-lg text-xs mt-4 px-4 py-2 mx-auto hover:text-white hover:bg-primary"
                                    onClick={handleRecheckCart}
                                >
                                    Recheck Shopping Cart
                                </button>
                            </div>
                        </div>

                        {/* Checkout Form */}
                        <CheckoutForm 
                            handleCheckout={handleCheckout} 
                        />
                    </div>
                </>
            )}

            {/* Payment Modal */}
            <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} headingText={'Pay by Card'}>
                <PaymentForm totalAmount={totalPrice} finalizeOrder={handleOrderPlacement} />
            </Modal>
        </div>
    );
}
