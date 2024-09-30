// src/app/layout.js
"use client"
import "./globals.css";
import { Navbar } from "@/components";
import { ThemeProvider } from "@/context/ThemeContext"; 
import { useEffect, useState } from "react";
import serverLayout from "./serverLayout";
import { Oswald, Poppins } from 'next/font/google';

// Load Oswald and Poppins fonts
const oswald = Oswald({
    weight: ['300','400','500','600','700'], // Customize font weights
    subsets: ['latin'],
    display: 'swap',        // This improves font loading
});
  
const poppins = Poppins({
    weight: ['100','300','400','500','600','700','800','900'],
    subsets: ['latin'],
    display: 'swap',
});


export default function RootLayout({ children }) {
    return (
        <html lang="en" className={poppins.className}>
            <body>
                <ThemeProvider>
                    <div className="w-full min-h-screen flex flex-col">
                        <Navbar />
                        <main className="flex-grow bg-background-light dark:bg-background-dark">
                            {children}
                        </main>
                        <footer>
                            {/* Add footer content here */}
                        </footer>
                    </div>
                </ThemeProvider>
            </body>
        </html>
    );
}