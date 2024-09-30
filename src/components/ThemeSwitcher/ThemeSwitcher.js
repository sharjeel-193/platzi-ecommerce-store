"use client";

import { useTheme } from "@/context/ThemeContext"; 
import { useEffect, useState } from "react";
import { FiSun, FiMoon } from "react-icons/fi";

const ThemeSwitcher = () => {
    const { theme, toggleTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    const handleToggleTheme = () => {
        toggleTheme(); 
    };

    return (
        <div
            className={`w-12 h-6 flex items-center bg-gray-300 dark:bg-gray-600 rounded-full p-1 cursor-pointer transition-all`}
            onClick={handleToggleTheme}
        >
            <div
                className={`w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out flex justify-center items-center
                    ${theme === "light" ? "translate-x-0 bg-yellow-400" : "translate-x-6 bg-gray-800"}`}
            >
                {theme === "light" ? <FiSun className="text-white" /> : <FiMoon className="text-yellow-300" />}
            </div>
        </div>
    );
};

export default ThemeSwitcher;
