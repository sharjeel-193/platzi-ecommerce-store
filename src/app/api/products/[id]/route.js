// app/api/products/[id]/route.js

import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
    const { id } = params;

    try {
        const response = await fetch(`${process.env.PLATZI_API_URL}/products/${id}`);
        const data = await response.json();

        if (!response.ok) {
            throw new Error('Failed to fetch product details');
        }

        return NextResponse.json(data); 
    } catch (error) {
        console.error('Error fetching product details:', error);
        return NextResponse.json(
            { message: 'Failed to load product details' },
            { status: 500 }
        ); 
    }
}
