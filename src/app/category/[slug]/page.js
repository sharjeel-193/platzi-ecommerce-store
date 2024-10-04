// src/app/category/[slug].js
'use client'
import { useRouter, useParams } from 'next/navigation'
import { useEffect } from 'react';
// import { useRouter } from 'next/router'
const CategoryPage = () => {
    const router = useRouter()
    const params = useParams()

    useEffect(() => {
        console.log(params.slug)
    }, [])
    
    return (
        <div>
            <h1>Category: {params.slug}</h1>
            {/* You can add additional logic to fetch and display products for this category */}
        </div>
    );
};

export default CategoryPage;
