"use client";

import { useContext, useState } from 'react';
import { FiShoppingCart, FiUser, FiLayers, FiShoppingBag } from 'react-icons/fi';
import ThemeSwitcher from '../ThemeSwitcher';
import Link from 'next/link';
import { CartContext } from '@/context/CartContext';

const MobileSidebar = ({ open, toggleSidebar, categories }) => {
    const [isMblCategoryOpen, setIsMblCategoryOpen] = useState(false);
    const [isMblAccountOpen, setIsMblAccountOpen] = useState(false);

    const { cart } = useContext(CartContext)

    const handleSidebarClick = (event) => {
        event.stopPropagation(); // Prevent click from bubbling up to the shadow area
    };

    return (
        <div
            className={`fixed inset-0 bg-gray-800 bg-opacity-50 z-50 transition-opacity duration-300 ${
                open ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            onClick={toggleSidebar} // This will toggle the sidebar when clicking the shadow area
        >
            <div
                className={`sidebar bg-white dark:bg-black dark:text-text-dark w-64 h-full fixed left-0 top-0 p-4 transition-transform duration-300 ${
                    open ? 'translate-x-0' : '-translate-x-full'
                }`}
                onClick={handleSidebarClick} // Prevent clicks inside the sidebar from closing it
            >
                <div className='w-full flex justify-end mb-6'>
                    <ThemeSwitcher />
                </div>

                {/* Categories Section */}
                {categories &&
                    <>
                        <button
                        onClick={() => setIsMblCategoryOpen((prev) => !prev)}
                        className="w-full text-left flex items-center py-2 transition-all duration-300 ease-in-out"
                    >
                        <FiLayers className="mr-2" size={24} /> {/* Icon for Categories */}
                        <span className="flex-grow">Categories</span>
                        <span>{isMblCategoryOpen ? '▲' : '▼'}</span>
                    </button>

                    <nav 
                        className={`pl-4 mt-2 overflow-hidden transition-all duration-300 ease-in-out flex flex-col gap-4 ${
                            isMblCategoryOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                        }`}
                        style={{ transitionProperty: 'max-height, opacity' }}
                    >
                        {
                            categories.map((category) => {
                                const slug = category.name.toLowerCase().replace(/\s+/g, '-');
                                return (
                                    <Link href={`/category/${slug}`} key={category.id}>
                                        {category.name}
                                    </Link>
                                )
                            })
                        }
                    </nav>
                </>}

                <Link href="/shop">
                    <button className="mt-4 flex items-center">
                        <FiShoppingBag size={24} className="mr-2" /> Shop
                    </button>
                </Link>

                {/* Shopping Cart Button */}
                <Link href={"/cart"}>
                    <button className="mt-4 flex items-center relative">
                        <FiShoppingCart size={24} className="mr-2" /> Cart
                        {cart.length > 0 && (
                            <span className="absolute top-[-2px] right-[-18px] h-3 w-3 bg-secondary rounded-full"></span>
                        )}
                    </button>
                </Link>

                {/* Account Section */}
                {/* <button
                    onClick={() => setIsMblAccountOpen((prev) => !prev)}
                    className="w-full text-left flex items-center py-2 transition-all duration-300 ease-in-out mt-4"
                >
                    <FiUser className="mr-2" size={24} />
                    <span className="flex-grow">Account</span>
                    <span>{isMblAccountOpen ? '▲' : '▼'}</span>
                </button> */}

                {/* <nav 
                    className={`pl-4 mt-2 overflow-hidden transition-all duration-300 ease-in-out ${
                        isMblAccountOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                    style={{ transitionProperty: 'max-height, opacity' }}
                >
                    <ul>
                        <li><a href="#" className="block py-2">Login</a></li>
                        <li><a href="#" className="block py-2">Signup</a></li>
                    </ul>
                </nav> */}
            </div>
        </div>
    );
};

export default MobileSidebar;
