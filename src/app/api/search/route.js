import { NextResponse } from "next/server";

export async function GET(req) {
    const { searchParams } = new URL(req.url); // Parse URL and get search params
    const query = searchParams.get("query");   // Get the 'query' parameter from searchParams
    const category = searchParams.get("category");

    try {
        // Base URL for the API
        let url = `${process.env.PLATZI_API_URL}/products/?`;

        // If there is a query, modify the URL to filter products by title
        if (query) {
            url += `title=${encodeURIComponent(query)}&`;
        }

        if (category) {
            url += `categoryId=${encodeURIComponent(category)}&`;
        }

        // Fetch data from the external API
        const response = await fetch(url);
        const data = await response.json();

        // Check if the response is not okay
        if (!response.ok) {
            throw new Error("Failed to fetch products");
        }

        // Filter out products with images from 'placeimg.com'
        const filteredProducts = data.filter(product => {
            return !product.images.some(image => image.includes('abc.com'));
        });

        // Return the filtered products as JSON
        return NextResponse.json(filteredProducts);
    } catch (error) {
        // Handle errors and return a 500 response with an error message
        console.error("Error fetching products:", error);
        return NextResponse.json({ message: "Failed to load products" }, { status: 500 });
    }
}
