"use client";

import { useState } from "react";
import {
    CitySelect,
    CountrySelect,
    StateSelect,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import toast from "react-hot-toast";

const CheckoutForm = ({ handleCheckout }) => {
  
    const [userDetails, setUserDetails] = useState({
        name: "",
        streetAddress: "",
        postalCode: "",
        email: "",
        phoneNo: "",
    });
    const [countryId, setCountryId] = useState(0);
    const [stateId, setStateId] = useState(0);
    const [cityId, setCityId] = useState(0);

    // Handle form input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    // Validate and handle checkout
    const handleSubmit = () => {
        if (
            !userDetails.name ||
            !userDetails.streetAddress ||
            !userDetails.email ||
            !userDetails.phoneNo ||
            !userDetails.postalCode ||
            countryId === 0 ||
            stateId === 0 ||
            cityId === 0
        ) {
            toast.error("Please fill in all the required fields.");
            return;
        }

        handleCheckout(); // Call parent checkout handler
    };

    return (
        <div>
            <h2 className="text-xl text-primary font-semibold mb-4">Shipping Details</h2>
            <div className="mb-4">
                <label className="block mb-1 text-sm font-medium">Name:</label>
                <input
                    type="text"
                    name="name"
                    value={userDetails.name}
                    onChange={handleInputChange}
                    className="w-full border-surface-dark dark:border-surface-light border-[1px] bg-transparent rounded-lg p-2 outline-none"
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block mb-1 text-sm font-medium">Street Address:</label>
                <input
                    type="text"
                    name="streetAddress"
                    value={userDetails.streetAddress}
                    onChange={handleInputChange}
                    className="w-full border-surface-dark dark:border-surface-light border-[1px] bg-transparent rounded-lg p-2 outline-none"
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block mb-1 text-sm font-medium">Postal Code:</label>
                <input
                    type="text"
                    name="postalCode"
                    value={userDetails.postalCode}
                    onChange={handleInputChange}
                    className="w-full border-surface-dark dark:border-surface-light border-[1px] bg-transparent rounded-lg p-2 outline-none"
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block mb-1 text-sm font-medium">Country:</label>
                <CountrySelect
                    onChange={(e) => setCountryId(e.id)}
                    placeHolder="Select Country"
                    containerClassName="border-surface-dark dark:border-surface-light border-[1px] rounded-lg"
                />
            </div>

            <div className="mb-4">
                <label className="block mb-1 text-sm font-medium">State:</label>
                <StateSelect
                    countryid={countryId}
                    onChange={(e) => setStateId(e.id)}
                    placeHolder="Select State"
                    containerClassName="border-surface-dark dark:border-surface-light border-[1px] rounded-lg"
                />
            </div>

            <div className="mb-4">
                <label className="block mb-1 text-sm font-medium">City:</label>
                <CitySelect
                    countryid={countryId}
                    stateid={stateId}
                    onChange={(e) => setCityId(e.id)}
                    containerClassName="border-surface-dark dark:border-surface-light border-[1px] rounded-lg"
                    placeHolder="Select City"
                />
            </div>

            <div className="mb-4">
                <label className="block mb-1 text-sm font-medium">Email:</label>
                <input
                    type="email"
                    name="email"
                    value={userDetails.email}
                    onChange={handleInputChange}
                    className="w-full border-surface-dark dark:border-surface-light border-[1px] bg-transparent rounded-lg p-2 outline-none"
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block mb-1 text-sm font-medium">Phone No:</label>
                <input
                    type="text"
                    name="phoneNo"
                    value={userDetails.phoneNo}
                    onChange={handleInputChange}
                    className="w-full border-surface-dark dark:border-surface-light border-[1px] bg-transparent rounded-lg p-2 outline-none"
                    required
                />
            </div>

            <button
                onClick={handleSubmit}
                className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary-dark"
            >
                Pay
            </button>
        </div>
    );
};

export default CheckoutForm;
