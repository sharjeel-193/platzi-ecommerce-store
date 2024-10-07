"use client";
import { useEffect, useState, useCallback } from "react";
import { ProductCard, Filters, Loader } from "@/components";

const SearchResultsPage = ({ searchParams }) => {
    const [results, setResults] = useState([]); // Fetched products
    const [filteredResults, setFilteredResults] = useState([]); // Products after applying filters
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true); // Loading state
    const [queryParam, setQueryParam] = useState(false);

    // Fetch search results when the component mounts or searchParams.query changes
    useEffect(() => {
        const fetchSearchResults = async () => {
            const query = searchParams.query;
            setQueryParam(query); // Check if query is present or not

            let url = "/api/search";
            if (query) {
                url += `?query=${encodeURIComponent(query)}`;
            }

            setLoading(true); // Set loading to true before fetching

            try {
                const res = await fetch(url);
                const data = await res.json();

                if (!res.ok) {
                    throw new Error(`Failed to fetch search results: ${res.statusText}`);
                }

                // Set the original results and initialize the filteredResults
                setResults(data);
                setFilteredResults(data); // Initially, filtered results are the same as fetched results
            } catch (error) {
                console.error("Error fetching search results:", error);
                setError("Failed to load search results");
            } finally {
                setLoading(false); // Set loading to false after fetching
            }
        };

        fetchSearchResults();
    }, [searchParams.query]); // Only re-run if the search query changes

    // Handle client-side filtering based on the selected filters
    const handleFilterChange = (filters) => {
        const { category, priceRange, sortOption } = filters;

        let updatedResults = [...results]; // Always filter based on the original results

        // Filter by category
        if (category && category !== "all") {
            updatedResults = updatedResults.filter(
                (product) => product.category.name.toLowerCase() === category.toLowerCase()
            );
        }

        // Filter by price range
        if (priceRange && priceRange !== "all") {
            const [minPrice, maxPrice] = priceRange.split("-");
            updatedResults = updatedResults.filter((product) => {
                const productPrice = product.price;
                const min = parseFloat(minPrice);
                const max = maxPrice === "+" ? Infinity : parseFloat(maxPrice);
                return productPrice >= min && productPrice <= max;
            });
        }

        // Sort the products
        if (sortOption === "price_asc") {
            updatedResults.sort((a, b) => a.price - b.price);
        } else if (sortOption === "price_desc") {
            updatedResults.sort((a, b) => b.price - a.price);
        }

        // Update the filtered results state
        setFilteredResults(updatedResults);
    };

    const handleAddToCart = (product) => {
        console.log(`Adding product to cart: ${product.title}`);
    };

    return (
        <div className="w-11/12 md:w-10/12 mx-auto grid grid-cols-1 md:grid-cols-4 gap-4 py-4 px-0 text-text-light dark:text-text-dark">
            <div className="my-4 w-full sticky top-20 pb-4 md:static md:top-0 z-40 bg-background-light dark:bg-background-dark">
                <Filters onFilterChange={handleFilterChange} />
            </div>
            <div className="col-span-1 md:col-span-3">
                <h2 className="text-xl font-bold mb-2">{queryParam ? `Search for: ${queryParam}` : 'Shop'}</h2>
                {loading ? (
                    <div className='w-full text-center'>
                        <Loader />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 my-4">
                        {error && <p>{error}</p>}
                        {filteredResults.length > 0 ? (
                            filteredResults.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    onAddToCart={handleAddToCart}
                                />
                            ))
                        ) : (
                            <p>No results found.</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchResultsPage;
