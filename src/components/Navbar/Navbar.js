"use client";

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { FiSearch, FiUser, FiShoppingCart, FiMenu, FiShoppingBag } from 'react-icons/fi';
import ThemeSwitcher from '../ThemeSwitcher';
import MobileSidebar from '../MobileSidebar';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Navbar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isDesktopSearchActive, setIsDesktopSearchActive] = useState(false);
    const [isMobileSearchActive, setIsMobileSearchActive] = useState(false);
    const [categories, setCategories] = useState(null);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState(''); 

    const router = useRouter();

    const mobileSearchRef = useRef(null);
    const desktopSearchRef = useRef(null);
    const mobileSearchButtonRef = useRef(null);
    const desktopSearchButtonRef = useRef(null);
    
    const handleToggleSidebar = () => {
        setIsSidebarOpen((prev) => !prev);
    };
    const handleToggleDesktopSearch = () => {
        setIsDesktopSearchActive((prev) => !prev);
    };

    const handleToggleMobileSearch = () => {
        setIsMobileSearchActive((prev) => !prev);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault(); // Prevent the default form submission
        if (searchTerm.trim()) {
            router.push(`/shop?query=${encodeURIComponent(searchTerm.trim())}`);
        }
        setSearchTerm('')
    };

    // Fetch categories from internal API route
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch('/api/categories');
                const data = await res.json();

                if (!res.ok) {
                    throw new Error(`Failed to fetch categories: ${res.statusText}`);
                }

                setCategories(data);
            } catch (error) {
                console.error('Error fetching categories:', error);
                setError('Failed to load categories');
            }
        };

        fetchCategories();
    }, []);

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
                !desktopSearchButtonRef.current.contains(event.target)
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
        <header className='w-full fixed top-0 z-50 shadow-lg'>
            <div className='w-full'>
                <div className='w-full bg-background-light dark:bg-background-dark'>
                    <div className='md:w-10/12 w-11/12 mx-auto flex items-center justify-between p-4 text-primary'>
                        {/* Logo Section */}
                        <Link href={'/'}>
                            <div className="flex items-center">
                                <Image src={'/logo.png'} alt='MarketViz Logo' width={42} height={36} />
                                <h1 className='text-primary font-oswald ml-2'>SHOP SPHERE</h1>
                            </div>
                        </Link>

                        {/* Desktop Icons Section */}
                        <div className="hidden md:flex space-x-4 items-center">
                            {/* Sliding Search Bar (Desktop) */}
                            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                                <div
                                    ref={desktopSearchRef}
                                    className={`absolute right-0 bg-gray-200 rounded-full py-2 px-2 transition-all duration-300 ease-in-out ${isDesktopSearchActive ? 'w-64 opacity-100' : 'w-0 opacity-0'}`}
                                >
                                    <input
                                        type="text"
                                        className="w-full bg-transparent outline-none text-black"
                                        placeholder="Search..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)} // Update search term
                                    />
                                </div>
                                
                            </form>
                            <button
                                onClick={handleToggleDesktopSearch}
                                className={`focus:outline-none transition-all duration-300 ease-in-out hover:bg-secondary hover:p-2 hover:text-white rounded-full ${!isDesktopSearchActive ? 'text-primary bg-transparent' : 'text-white bg-secondary p-2 rounded-full'}`}
                                ref={desktopSearchButtonRef}
                            >
                                <FiSearch size={24} />
                            </button>

                            

                            <Link href="/shop">
                                <button className="focus:outline-none transition-all duration-300 ease-in-out hover:bg-secondary hover:p-2 hover:text-white rounded-full">
                                    <FiShoppingBag size={24} />
                                </button>
                            </Link>

                            <Link href={"/cart"}>
                                <button className="focus:outline-none transition-all duration-300 ease-in-out hover:bg-secondary hover:p-2 hover:text-white rounded-full">
                                    <FiShoppingCart size={24} /> 
                                </button>
                            </Link>

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
                    <form onSubmit={handleSearchSubmit}>
                        <input
                            type="text"
                            className="w-full py-2 px-4 bg-gray-200 rounded-full outline-none text-black"
                            placeholder="Search for products..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)} // Update search term
                        />
                    </form>
                </div>

                {/* Category Bar */}
                {categories && (
                    <div className='bg-surface-light dark:bg-surface-dark text-text-light dark:text-text-dark p-2 text-center font-oswald hidden md:block'>
                        {categories.length > 0 ? (
                            categories.map((category) => {
                                // Create a slug from the category name
                                const slug = category.name.toLowerCase().replace(/\s+/g, '-'); // Replace spaces with hyphens
                                return (
                                    <Link 
                                        key={category.id} 
                                        href={`/category/${slug}`} 
                                        className='mx-2 p-2 hover:text-secondary rounded transition-colors duration-200'
                                    >
                                        {category.name.toUpperCase()}
                                    </Link>
                                );
                            })
                        ) : (
                            error || 'No Categories Available'
                        )}
                    </div>
                )}
            </div>

            {/* Sidebar */}
            <MobileSidebar open={isSidebarOpen} toggleSidebar={handleToggleSidebar} categories={categories} />
        </header>
    );
};

export default Navbar;
