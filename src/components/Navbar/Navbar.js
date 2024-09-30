// src/components/Navbar.js
"use client";

import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';

const Navbar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { resolvedTheme, theme, setTheme } = useTheme();
    const [isSearchActive, setIsSearchActive] = useState(false);

    const handleToggleSidebar = () => {
        setIsSidebarOpen((prev) => !prev);
    };

    const handleToggleTheme = () => {
        setTheme(resolvedTheme === "light"? "dark": "light")
    };

    const handleToggleSearch = () => {
        setIsSearchActive((prev) => !prev);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isSidebarOpen && !event.target.closest('.sidebar')) {
                setIsSidebarOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isSidebarOpen]);

    return (
        <header className='w-full'>
            <div className='w-full'>
                <div className='w-full flex items-center justify-between p-4 bg-surface-light dark:bg-primary-dark'>
                    <div className="flex items-center">
                        <h1 className="text-xl font-bold text-primary-light">Logo</h1>
                    </div>
                    <div className="hidden md:flex space-x-4 text-secondary-light">
                        <button onClick={handleToggleSearch} className="relative">
                            <span className="material-icons">search</span>
                            {isSearchActive && <input type="text" className="absolute left-0 mt-2 bg-gray-200" />}
                        </button>
                        <button onClick={handleToggleTheme}>
                            {theme === "dark" ? '🌙' : '☀️'}
                        </button>
                        <button>
                            <span className="material-icons">account_circle</span>
                        </button>
                    </div>
                    <button className="md:hidden" onClick={handleToggleSidebar}>
                        <span className="material-icons">menu</span>
                    </button>
                </div>
                <div className='bg-surface-dark text-text-dark p-2 text-center'>
                    CATEGORY 1 - CATEGORY 2
                </div>
            </div>

          {/* Sidebar */}
          <div className={`fixed inset-0 bg-gray-800 bg-opacity-50 z-50 transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={handleToggleSidebar}>
              <div className={`sidebar bg-white w-64 h-full fixed left-0 top-0 p-4 transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                  <button onClick={handleToggleTheme}>
                      {theme === 'dark' ? '🌙' : '☀️'} Theme
                  </button>
                  <nav className="mt-4">
                      <ul>
                          <li><a href="#" className="block py-2">Category 1</a></li>
                          <li><a href="#" className="block py-2">Category 2</a></li>
                          <li><a href="#" className="block py-2">Category 3</a></li>
                      </ul>
                  </nav>
                  <button onClick={handleToggleSidebar} className="mt-4">
                      <span className="material-icons">shopping_cart</span> Cart
                  </button>
                  <button onClick={handleToggleSidebar} className="mt-4">
                      <span className="material-icons">account_circle</span> Account
                  </button>
              </div>
          </div>
        </header>
    );
};

export default Navbar;
