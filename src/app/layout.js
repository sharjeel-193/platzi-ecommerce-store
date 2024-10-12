// src/app/layout.js

import "./globals.css"; 
import { Navbar } from "@/components"; 
import { CartProvider } from "@/context/CartContext";
import { ThemeProvider } from "@/context/ThemeContext"; 
import { Oswald, Poppins } from "next/font/google";
import { Toaster } from "react-hot-toast";

// Load Google fonts
const oswald = Oswald({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
    weight: ["100", "300", "400", "500", "600", "700", "800", "900"],
    subsets: ["latin"],
    display: "swap",
});

// Default metadata object for title and description
export const metadata = {
    title: "Shop Sphere - Your Online Marketplace",
    description: "Explore the best deals on Shop Sphere, your go-to online marketplace.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={poppins.className}> {/* Apply Poppins font */}
        <body>
            <ThemeProvider> {/* Assuming ThemeProvider is necessary */}
                <CartProvider>
                    <div className="w-full min-h-screen flex flex-col bg-background-light dark:bg-background-dark">
                        <Navbar />
                        <main className="flex-grow pt-20 md:pt-36 relative">
                            {children}
                        </main>
                        <footer>
                            {/* Add footer content here */}
                        </footer>
                        <Toaster position="bottom-right" reverseOrder={false} />
                    </div>
                </CartProvider>
            </ThemeProvider>
        </body>
    </html>
  );
}
