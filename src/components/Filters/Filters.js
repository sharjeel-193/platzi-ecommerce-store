"use client";
import { useState, useEffect } from "react";

const Filters = ({ wantCategory, wantPriceRange, wantSortOption, onFilterChange }) => {
    const [category, setCategory] = useState("all");
    const [priceRange, setPriceRange] = useState("all");
    const [sortOption, setSortOption] = useState("not_specific");

    // Update the filters whenever there's a change in state
    useEffect(() => {
        onFilterChange({ category, priceRange, sortOption });
    }, [category, priceRange, sortOption]); // Removed onFilterChange from dependencies

    const priceRanges = [
        { label: "All", value: "all" },  // Added "All" price range
        { label: "0 to 20", value: "0-20" },
        { label: "20 to 50", value: "20-50" },
        { label: "50 to 100", value: "50-100" },
        { label: "100 >", value: "100-+" },
    ];

    const sortOptions = [
        { label: "Not Specific", value: "not_specific" },
        { label: "Price: Low to High", value: "price_asc" },
        { label: "Price: High to Low", value: "price_desc" },
    ];

    return (
        <div className="sticky md:top-36 w-full bg-white dark:bg-gray-800 p-4 shadow-md rounded-lg z-40">
            <h2 className="text-lg font-bold mb-2">Filters</h2>

            {/* Container with horizontal scroll on mobile */}
            <div className="flex flex-row md:flex-col mb-4 overflow-x-auto whitespace-nowrap md:whitespace-normal scrollbar-hide">
                
                {/* Category Filter */}
                {wantCategory &&
                <>
                    <div className="hidden md:flex flex-col m-2">
                        <label className="block mb-2">Category:</label>
                        <div className="flex flex-col">
                            {["all", "clothes", "electronics", "furniture", "shoes", "miscellaneous"].map((cat) => (
                                <label key={cat} className="flex items-center mb-2">
                                    <input
                                        type="radio"
                                        value={cat}
                                        checked={category === cat}
                                        onChange={() => setCategory(cat)}
                                        className="mr-2"
                                    />
                                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                                </label>
                            ))}
                        </div>
                    </div>
                    <div className="md:hidden m-2">
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="border rounded-md p-2 text-text-light font-poppins"
                        >
                            <option value="all">Category</option>
                            {["all", "clothes", "electronics", "furniture", "shoes", "miscellaneous"].map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                                </option>
                            ))}
                        </select>
                    </div>
                </>}

                {/* Price Range Filter */}
                {wantPriceRange &&
                <>
                    <div className="hidden md:flex flex-col m-2">
                        <label className="block mb-2">Price Range:</label>
                        <div className="flex flex-wrap gap-2">
                            {priceRanges.map((range) => (
                                <button
                                    key={range.value}
                                    onClick={() => setPriceRange(range.value)}
                                    className={`px-4 py-2 rounded-full border ${
                                        priceRange === range.value
                                            ? "bg-primary text-text-light dark:text-text-dark"
                                            : "bg-transparent text-surface-dark border-surface-dark dark:text-surface-light dark:border-surface-light"
                                    } transition-colors duration-200`}
                                >
                                    {range.label}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="md:hidden m-2">
                        <select
                            value={priceRange}
                            onChange={(e) => setPriceRange(e.target.value)}
                            className="border rounded-md p-2 text-text-light font-poppins"
                        >
                            <option value="all">Price Range</option>
                            {priceRanges.map((range) => (
                                <option key={range.value} value={range.value}>
                                    {range.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </>}

                {/* Sort Dropdown */}
                {wantSortOption &&
                <div className="m-2">
                    <label className="hidden md:block mb-1">Sort By:</label>
                    <select
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value)}
                        className="border rounded-md p-2 text-text-light font-poppins"
                    >
                        <option value="price_asc">Sort By</option>
                        {sortOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>}
            </div>
        </div>
    );
};

export default Filters;
