"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import AOS from 'aos';
import 'aos/dist/aos.css';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/effect-coverflow';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

// Import required modules for navigation and pagination
import { Navigation, Pagination, EffectCoverflow } from 'swiper/modules';

export default function Home() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: false,
        });
    }, []);

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
            }
        };

        fetchCategories();
    }, []);

    return (
        <div className="w-full text-text-light dark:text-text-dark pb-48">
            <div className="w-11/12 md:w-10/12 mx-auto">
                {/* Banner Section */}
                <div className="flex flex-col md:flex-row items-center my-8 py-12">
                    <div
                        className="flex-1 mb-4 md:mb-0 text-center md:text-left"
                        data-aos="fade-right"
                    >
                        <h1 className="text-4xl md:text-[48px] font-light mb-8 leading-[1.2]">
                            Step into the sphere of unlimited choices
                        </h1>
                        <Link href="/shop" legacyBehavior>
                            <a className="bg-transparent text-secondary border-solid border-secondary border-2 py-2 px-4 rounded-lg 
                                        hover:bg-primary hover:text-white hover:border-primary transition duration-300 font-oswald">
                                Explore Shop
                            </a>
                        </Link>
                    </div>
                    <div data-aos="fade-left">
                        <Image
                            src={"/banner-illustration.png"}
                            alt="Shop Sphere"
                            width={400}
                            height={200}
                            className="w-full"
                        />
                    </div>
                </div>
            </div>

            <div className="w-full bg-surface-light dark:bg-surface-dark my-8 py-36 text-center">
                {/* About Us Section */}
                <div className="w-10/12 mx-auto">
                    <h2 className="text-5xl font-light mb-8" data-aos="fade-down">About Us</h2>
                    <p className="text-base" data-aos="fade-up">
                        Welcome to Shop Sphere, your ultimate destination for a diverse range of products. 
                        We are committed to providing you with a seamless shopping experience and promoting 
                        sustainable choices. Explore our categories and discover endless possibilities.
                    </p>
                </div>
            </div>

            {/* Categories Carousel Section */}
            {categories.length > 0 && (
                <div className="my-8 w-full py-24">
                    <div className="w-10/12 mx-auto">
                        <Swiper
                            modules={[Navigation, EffectCoverflow]}
                            spaceBetween={0}
                            slidesPerView={1}
                            breakpoints={{ 640: { slidesPerView: 2 }, 960: { slidesPerView: 3 } }}
                            pagination={{ clickable: true }}
                            navigation
                            loop={true} // Enable infinite loop
                            effect="coverflow"
                        >
                            {categories.map((category) => {
                                const slug = category.name.toLowerCase().replace(/\s+/g, '-');
                                return (
                                    <SwiperSlide key={category.id}>
                                        <Link
                                            href={`/category/${slug}`}
                                            className="block group relative mx-4 rounded-lg bg-background-light dark:bg-background-dark overflow-hidden shadow-md transform hover:scale-105 hover:rounded-xl transition duration-300"
                                        >
                                            <Image
                                                src={category.image}
                                                alt={category.name}
                                                width={500}
                                                height={300}
                                                className="w-full object-cover"
                                            />
                                            
                                            {/* Only Active one */}
                                            <div className="absolute inset-0 bg-gradient-to-br from-primary from-1% to-transparent to-99% swiper-slide-active:block swiper-slide:not(.swiper-slide-active):hidden">
                                                <h3 className="text-2xl font-light font-oswald m-6">{category.name}</h3>
                                            </div>
                                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                                                {/* <span className="text-white text-xl font-bold">{category.name}</span> */}
                                                <Link href={`/category/${slug}`} className="text-text-dark border-white hover:bg-white hover:text-primary border-2 p py-2 px-4 rounded-full text-sm">
                                                    Shop Here
                                                </Link>
                                            </div>
                                        </Link>
                                    </SwiperSlide>
                                );
                            })}
                        </Swiper>
                    </div>
                </div>
            )}
        </div>
    );
}
