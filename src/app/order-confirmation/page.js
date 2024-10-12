// pages/order-confirmation.js
"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image'; 

const OrderConfirmation = () => {
    const [orderId, setOrderId] = useState("");
    const router = useRouter();

    // Function to generate a random order ID
    const generateOrderId = () => {
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const randomLetters = 
            letters.charAt(Math.floor(Math.random() * letters.length)) +
            letters.charAt(Math.floor(Math.random() * letters.length));
        const randomDigits = Math.floor(1000 + Math.random() * 9000); // 4-digit number
        return randomLetters + randomDigits;
    };

    useEffect(() => {
        // Generate an order ID on component mount
        setOrderId(generateOrderId());

        // Optional: Redirect to another page after some time
        const timeout = setTimeout(() => {
            router.push('/'); // Redirect to home after 5 seconds
        }, 7000);

        return () => clearTimeout(timeout); // Cleanup
    }, [router]);

    return (
        <div className="flex flex-col items-center justify-center mt-12 p-4 ">
            {/* Animated Illustration */}
            <div className="mb-8">
                <Image
                    src="/order-confirm.png" 
                    alt="Order Confirmed"
                    width={150}
                    height={150}
                    className="animate-bounce" 
                />
            </div>

            <h1 className="text-2xl font-bold mb-4 text-text-light dark:text-text-dark">
                Order Confirmed!
            </h1>
            <p className="text-lg mb-2 text-text-light dark:text-text-dark">
                Thank you for your purchase!
            </p>
            <p className="text-md text-gray-500 dark:text-gray-300">
                Your order ID: <span className="font-semibold">{orderId}</span>
            </p>

            <p className="mt-4 text-sm text-center text-gray-600 dark:text-gray-400">
                You will be redirected to the homepage shortly.
            </p>
        </div>
    );
};

export default OrderConfirmation;
