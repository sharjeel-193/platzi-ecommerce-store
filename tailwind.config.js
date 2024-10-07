/** @type {import('tailwindcss').Config} */

const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            animation: {
                'spin-slower': 'spin 20s linear infinite', // Slow down the spin to 3 seconds per rotation
            },
            fontFamily: {
                // poppins: ['Poppins', ...fontFamily.sans], // Ensure this includes the default sans serif as fallback
                poppins: ['Poppins', ...fontFamily.sans],
                oswald: ['Oswald', ...fontFamily.sans],
            },
            colors: {
                // Custom Colors for Light and Dark Mode
                primary: '#3B82F6',
                secondary: '#10B981',
                background: {
                    light: '#F3F4F6', // Light mode background
                    dark: '#111827',  // Dark mode background (almost black)
                },
                surface: {
                    light: '#FFFFFF', // Light mode surface (white)
                    dark: '#1F2937',  // Dark mode surface (slate gray)
                },
                text: {
                    light: '#374151', // Light mode text (dark gray)
                    dark: '#E5E7EB',  // Dark mode text (light gray)
                },
                accent: {
                    light: '#F59E0B', // Light mode accent (yellow)
                    dark: '#FBBF24',  // Dark mode accent (lighter yellow)
                },
                error: {
                    light: '#EF4444', // Light mode error (red)
                    dark: '#F87171',  // Dark mode error (lighter red)
                }
            },
        },
    },
    plugins: [],
};
