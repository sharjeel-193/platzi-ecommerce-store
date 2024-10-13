"use client";

import { useEffect, useState, useContext } from "react";
import Image from "next/image";
import { Loader } from "@/components";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Pagination, Thumbs } from "swiper/modules";
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';

import { CartContext } from '@/context/CartContext';
import { FaShoppingCart } from "react-icons/fa";

const ProductDetailsPage = ({ params }) => {
    const { id } = params;
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        // Fetch the product details from the API
        const fetchProductDetails = async () => {
            try {
                const response = await fetch(`/api/products/${id}`);
                if (!response.ok) {
                    throw new Error("Product not found");
                }

                const data = await response.json();
                setProduct(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchProductDetails();
        }
    }, [id]);

    const handleAddToCart = (e) => {
        e.preventDefault();
        addToCart(product, 1);
    }

    if (loading) {
        return (
            <div className="text-center py-10">
                <Loader />
            </div>
        );
    }

    if (error) {
        return <div className="text-center text-error-light py-10">Error: {error}</div>;
    }



    return (
        <div className="w-10/12 mx-auto py-12 text-text-light dark:text-text-dark">
            {product && (
                <>
                    <div className="w-full flex flex-col md:flex-row md:justify-between md:items-end mt-2 mb-8">
                        <h1 className="text-4xl font-light">{product.title}</h1>
                        <div className="text-right">
                            <span className="border border-gray-300 rounded-full px-3 py-1 text-xs font-light text-secondary"> {/* Category Chip */}
                                {product.category.name}
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Image Slider with Swiper */}
                        <div className="w-full md:w-1/2">
                            {/* Main Slider */}
                            <Swiper
                                spaceBetween={5}
                                navigation={true}
                                pagination={{
                                    clickable: true,
                                }}
                                thumbs={{ swiper: thumbsSwiper }}
                                modules={[FreeMode, Navigation, Pagination, Thumbs]}
                                className="mb-4"
                            >
                                {product.images.map((img, index) => {
                                    const imgUrl=img.replace(/[\[\]"]/g, '').trim()
                                    return (
                                        <SwiperSlide key={index}>
                                            <div className="w-full flex justify-center">
                                                <Image
                                                    src={imgUrl}
                                                    alt={product.title}
                                                    width={500}
                                                    height={500}
                                                    className="rounded-lg"
                                                />
                                            </div>
                                        </SwiperSlide>
                                    )
                                })}
                            </Swiper>

                            {/* Thumbnails */}
                            <Swiper
                                onSwiper={setThumbsSwiper}
                                spaceBetween={10}
                                slidesPerView={product.images.length}
                                watchSlidesProgress={true}
                                className="mt-4"
                                freeMode={true}
                            >
                                {product.images.map((img, index) => {
                                    const imgUrl=img.replace(/[\[\]"]/g, '').trim()
                                    return (
                                        <SwiperSlide key={index}>
                                            <div className="w-full h-20 overflow-hidden rounded-lg">
                                                <Image
                                                    src={imgUrl}
                                                    alt={`Thumbnail ${index + 1}`}
                                                    // width={80}
                                                    // height={80}
                                                    layout="fill"
                                                    className="object-cover cursor-pointer rounded-lg"
                                                />
                                            </div>
                                        </SwiperSlide>
                                    )
                                })}
                            </Swiper>
                        </div>

                        {/* Product Details */}
                        <div className="w-full md:w-1/2">
                            <p className="text-lg mb-4">{product.description}</p>
                            <div className="flex w-full flex-col md:flex-row justify-between items-center gap-2">
                                <div className="text-2xl font-semibold text-primary">
                                    Price: ${product.price}
                                </div>
                                <div>
                                    <button
                                        onClick={handleAddToCart}
                                        className="flex items-center justify-center bg-secondary text-white py-2 px-4 rounded-md hover:bg-primary hover:font-bold transition-colors duration-200"
                                    >
                                        <FaShoppingCart className="mr-2" />
                                        <span>Add to Cart</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default ProductDetailsPage;
