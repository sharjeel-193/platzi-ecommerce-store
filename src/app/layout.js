// src/app/layout.js

import "./globals.css"; // Import your global styles
import { Navbar } from "@/components"; // Assuming Navbar is in the components directory
import { ThemeProvider } from "@/context/ThemeContext"; // Assuming you are using a custom ThemeProvider
import { Oswald, Poppins } from "next/font/google";

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
                <div className="w-full min-h-screen flex flex-col bg-background-light dark:bg-background-dark">
                      <Navbar />
                      <main className="flex-grow pt-20 md:pt-36 relative">
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
