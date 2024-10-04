// src/app/api/categories/route.js
import { NextResponse } from 'next/server';

export async function GET(req) {
    try {
        const response = await fetch(`${process.env.PLATZI_API_URL}/categories`);
        const data = await response.json();

        if (!response.ok) {
            throw new Error('Failed to fetch categories');
        }

        const firstFourCategories = data.slice(0, 4);

        return NextResponse.json(firstFourCategories); 
    } catch (error) {
        console.error('Error fetching categories:', error);
        return NextResponse.json(
            { message: 'Failed to load categories' },
            { status: 500 }
        ); 
    }
}
