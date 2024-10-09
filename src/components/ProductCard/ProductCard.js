import Image from 'next/image';
import { FaShoppingCart } from 'react-icons/fa'; // Importing an icon from react-icons
import Link from 'next/link'; // Import Link from next/link

const ProductCard = ({ product, onAddToCart }) => {
    const imageUrl = Array.isArray(product.images) && product.images.length > 0
        ? product.images[0].replace(/[\[\]"]/g, '').trim() // Remove brackets and quotes if they exist
        : '/fallback-image.jpg'; // Provide a fallback image if there is no valid image

    return (
        <Link href={`/product/${product.id}`} passHref> {/* Link to the details page */}
            <div 
                className="bg-surface-light dark:bg-surface-dark p-6 h-full max-h-[460px]
                            rounded-lg shadow-lg hover:shadow-xl transition duration-300 flex flex-col 
                            cursor-pointer transform hover:scale-105 hover:translate-y-[-2px] z-10"> {/* Added hover effects */}
                {/* Product Image */}
                <div className="w-full h-48 relative mb-4">
                    <Image
                        src={imageUrl}
                        alt={product.title}
                        fill
                        className="object-cover rounded-lg"
                    />
                </div>

                {/* Product Details */}
                <div className="flex flex-col flex-grow"> {/* Use flex-grow to fill remaining space */}
                    <div className="mb-auto"> {/* Ensures this section takes only needed space */}
                        {/* Product Title */}
                        <h3 className="text-xl text-gray-800 dark:text-gray-200">
                            {product.title}
                        </h3>

                        {/* Product Price and Category */}
                        <div className="flex justify-between items-center mt-2">
                            <p className="text-primary font-bold text-lg">
                                ${product.price.toFixed(2)}
                            </p>
                            <span className="border border-gray-300 rounded-full px-3 py-1 text-xs font-light text-gray-700 dark:bg-gray-800 dark:text-gray-300"> {/* Category Chip */}
                                {product.category.name}
                            </span>
                        </div>
                    </div>
                    {/* Add to Cart Button */}
                    <button
                        onClick={(e) => { // Prevent the link click when button is clicked
                            e.stopPropagation();
                            onAddToCart(product);
                        }}
                        className="flex items-center justify-center mt-4 bg-secondary text-white py-2 px-4 rounded-md hover:bg-primary hover:font-bold transition-colors duration-200"
                    >
                        <FaShoppingCart className="mr-2" /> {/* Cart icon */}
                        <span>Add to Cart</span>
                    </button>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
