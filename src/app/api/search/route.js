// src/app/api/search/route.js
import { NextResponse } from 'next/server';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query'); // Get the query parameter

    if (!query) {
        return NextResponse.json(
            { error: 'Query is required' }, 
            { status: 400 }
        );
    }

    try {
        const response = await fetch(`${process.env.PLATZI_API_URL}/products/?title=${encodeURIComponent(query)}`);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(`Failed to fetch search results: ${response.statusText}`);
        }

        return NextResponse.json(data);
    } catch (error) {
        console.error('Error fetching search results:', error);
        return NextResponse.json(
            { error: 'Failed to load search results' }, 
            { status: 500 }
        );
    }
}
