"use client"
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const PaymentForm = ({ totalAmount }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!stripe || !elements) {
            return;
        }

        const cardElement = elements.getElement(CardElement);

        try {
            const { error, paymentMethod } = await stripe.createPaymentMethod({
                type: "card",
                card: cardElement,
            });

            if (error) {
                toast.error(error.message);
                setLoading(false);
            } else {
                toast.success("Payment successful!");

                // Here you'd normally call your backend to process the payment
                router.push("/order-confirmation");
                setLoading(false);
            }
        } catch (error) {
            toast.error("Payment failed. Try again.");
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full rounded-lg">
            <div className="mb-4">
                <div className="w-4/5 max-w-80 text-center mx-auto text-error-light text-xs mb-4">
                  * Please use dummy card numbers for testing purposes only. Do not enter your actual card information.
                </div>
                <label className="block text-sm font-medium">Card Details</label>
                <CardElement
                    className="border rounded-lg p-2 text-text-light bg-surface-light  "
                    options={{
                        style: {
                            invalid: { color: "#fa755a", iconColor: "#fa755a" },
                        },
                    }}
                />
            </div>
            <button
                type="submit"
                className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary-dark"
                disabled={!stripe || loading}
            >
                {loading ? "Processing..." : `Pay $${totalAmount}`}
            </button>
        </form>
    );
};

export default PaymentForm;
