"use client";

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { FiSearch, FiUser, FiShoppingCart, FiMenu, FiLayers} from 'react-icons/fi';
import ThemeSwitcher from '../ThemeSwitcher';
import MobileSidebar from '../MobileSidebar';

const Navbar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isDesktopSearchActive, setIsDesktopSearchActive] = useState(false);
    const [isMobileSearchActive, setIsMobileSearchActive] = useState(false);
    const mobileSearchRef = useRef(null); // Ref for mobile search bar
    const desktopSearchRef = useRef(null);
    const mobileSearchButtonRef = useRef(null);
    const desktopSearchButttonRef = useRef(null);
    const [isMblCategoryOpen, setIsMblCategoryOpen] = useState(false);
    const [isMblAccountOpen, setIsMblAccountOpen] = useState(false);

    const handleToggleSidebar = () => {
        setIsSidebarOpen((prev) => !prev);
    };
    const handleToggleDesktopSearch = () => {
        setIsDesktopSearchActive((prev) => !prev);
    };

    const handleToggleMobileSearch = () => {
        setIsMobileSearchActive((prev) => !prev);
    };

    // Close sidebar or search when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                isMobileSearchActive && 
                mobileSearchRef.current && 
                !mobileSearchRef.current.contains(event.target) &&
                !mobileSearchButtonRef.current.contains(event.target)
            ) {
                setIsMobileSearchActive(false); // Hide mobile search bar if clicked outside
            }
            if (
                isDesktopSearchActive && 
                desktopSearchRef.current && 
                !desktopSearchRef.current.contains(event.target) &&
                !desktopSearchButttonRef.current.contains(event.target)
            ) {
                setIsDesktopSearchActive(false); // Hide desktop search bar if clicked outside
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isMobileSearchActive, isDesktopSearchActive]);

    return (
        <header className='w-full'>
            <div className='w-full'>
                <div className='w-full bg-background-light dark:bg-background-dark'>
                    <div className='md:w-10/12 w-11/12 mx-auto flex items-center justify-between p-4 text-primary'>
                        {/* Logo Section */}
                        <div className="flex items-center">
                            <Image src={'/logo.png'} alt='MarketViz Logo' width={42} height={36} />
                            <h1 className='text-primary font-oswald ml-2'>SHOP SPHERE</h1>
                        </div>

                        {/* Desktop Icons Section */}
                        <div className="hidden md:flex space-x-4 items-center">
                            {/* Sliding Search Bar (Desktop) */}
                            <div className="relative flex items-center" >
                                <div
                                    ref={desktopSearchRef}
                                    className={`absolute right-0 bg-gray-200 rounded-full py-2 px-2 transition-all duration-300 ease-in-out ${isDesktopSearchActive ? 'w-64 opacity-100' : 'w-0 opacity-0'}`}
                                >
                                    <input
                                        type="text"
                                        className="w-full bg-transparent outline-none text-black"
                                        placeholder="Search..."
                                    />
                                </div>
                            </div>
                            <button
                                onClick={handleToggleDesktopSearch}
                                className={`focus:outline-none transition-all duration-300 ease-in-out hover:bg-secondary hover:p-2 hover:text-white rounded-full ${!isDesktopSearchActive ? 'text-primary bg-transparent' : 'text-white bg-secondary p-2 rounded-full'}`}
                                ref={desktopSearchButttonRef}
                            >
                                <FiSearch size={24} />
                            </button>


                            <button className="focus:outline-none transition-all duration-300 ease-in-out hover:bg-secondary hover:p-2 hover:text-white rounded-full">
                                <FiShoppingCart size={24} /> 
                            </button>

                            {/* Account Icon */}
                            <div className="relative group">
                                <button className="focus:outline-none group-hover:bg-secondary group-hover:p-2 group-hover:text-white rounded-full">
                                    <FiUser size={24} />
                                </button>
                                {/* Dropdown Content */}
                                <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-700 rounded-lg shadow-lg hidden group-hover:block">
                                    <ul className="py-2">
                                        <li>
                                            <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-200 dark:hover:bg-gray-600">Login</a>
                                        </li>
                                        <li>
                                            <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-200 dark:hover:bg-gray-600">Signup</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Mobile Menu Button and Search Icon */}
                        <div className="flex md:hidden items-center">
                            {/* Search Icon for Mobile */}
                            <button onClick={handleToggleMobileSearch} className="focus:outline-none mr-4" ref={mobileSearchButtonRef}>
                                <FiSearch size={24} />
                            </button>

                            {/* Hamburger Icon for Sidebar */}
                            <button className="focus:outline-none" onClick={handleToggleSidebar}>
                                <FiMenu size={24} />
                            </button>
                        </div>

                        {/* Global Theme Switcher (Top-Right Position) */}
                        <div className="absolute top-4 right-4 hidden md:block">
                            <ThemeSwitcher />
                        </div>
                        
                    </div>
                </div>

                {/* Mobile Search Bar */}
                <div
                    ref={mobileSearchRef}
                    className={`block md:hidden w-full px-4 overflow-hidden transition-max-height duration-300 ease-in-out ${
                        isMobileSearchActive ? 'max-h-20 opacity-100 py-2' : 'max-h-0 opacity-0 py-0'
                    }`}
                >
                    <input
                        type="text"
                        className="w-full py-2 px-4 bg-gray-200 rounded-full outline-none text-black"
                        placeholder="Search for products..."
                    />
                </div>

                {/* Category Bar */}
                <div className='bg-surface-light dark:bg-surface-dark text-text-light dark:text-text-dark p-2 text-center font-oswald hidden md:block'>
                    CATEGORY 1 - CATEGORY 2
                </div>
            </div>

            {/* Sidebar */}
            <MobileSidebar open={isSidebarOpen} toggleSidebar={handleToggleSidebar} />
        </header>
    );
};

export default Navbar;
