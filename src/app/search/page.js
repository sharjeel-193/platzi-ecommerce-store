"use client"
import { useEffect, useState } from 'react';

const SearchResultsPage = ({ searchParams }) => {
    const [results, setResults] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSearchResults = async () => {
            if (searchParams.query) {
                try {
                    const res = await fetch(`/api/search?query=${encodeURIComponent(searchParams.query)}`);
                    const data = await res.json();

                    if (!res.ok) {
                        throw new Error(`Failed to fetch search results: ${res.statusText}`);
                    }

                    setResults(data);
                } catch (error) {
                    console.error('Error fetching search results:', error);
                    setError('Failed to load search results');
                }
            }
        };

        fetchSearchResults();
    }, [searchParams.query]);

    return (
        <div>
            <h1>Search Results for: {searchParams.query}</h1>
            {error && <p>{error}</p>}
            <ul>
                {results.length > 0 ? (
                    results.map((item) => (
                        <li key={item.id}>{item.title}</li> // Adjust as necessary to match your data structure
                    ))
                ) : (
                    <p>No results found.</p>
                )}
            </ul>
        </div>
    );
};

export default SearchResultsPage;
