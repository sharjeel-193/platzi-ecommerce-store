import Link from 'next/link';
import Image from 'next/image';

export default function Custom404() {
    return (
        <div className="text-center text-text-light dark:text-text-dark pt-36">
            <div className="text-center">
                {/* Glowing 404 Title */}
                <h1 className="text-[120px] md:text-[200px] font-bold ">
                    404
                </h1>

                {/* "Page Not Found" Subtitle */}
                <p className="text-lg md:text-2xl font-light mb-8 glow-text mt-24 mx-4">
                    Oops! The page you are looking for does not exist.
                </p>

                {/* Home Button */}
                <Link href="/" className="bg-transparent border border-black text-black dark:border-white dark:text-white py-2 px-6 rounded-full shadow-lg hover:bg-black hover:text-primary transition duration-300">
                    Go Back Home
                </Link>
            </div>
        </div>
    );
}
