"use client";

import { useState, useMemo } from "react";
import { ProductCard } from "./product-card";
import { ProductFilters, type FilterState } from "./product-filters";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import type { Product } from "@/lib/products";
import { Filter, X, Grid3X3, List } from "lucide-react";

interface ProductListingProps {
    products: Product[];
    categories: string[];
    initialSearchQuery?: string;
}

export function ProductListing({ products, categories, initialSearchQuery }: ProductListingProps) {
    const [sortBy, setSortBy] = useState<string>("name");
    const [showFilters, setShowFilters] = useState(false);
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [searchQuery, setSearchQuery] = useState(initialSearchQuery || "");
    const [filters, setFilters] = useState<FilterState>({
        categories: [],
        priceRange: [0, 500],
        inStock: false,
        featured: false,
    });

    const filteredAndSortedProducts = useMemo(() => {
        let filtered = products;

        // Apply search query filter
        if (searchQuery.trim()) {
            const searchTerm = searchQuery.toLowerCase();
            filtered = filtered.filter((product) =>
                product.name.toLowerCase().includes(searchTerm) ||
                product.description.toLowerCase().includes(searchTerm) ||
                product.category.toLowerCase().includes(searchTerm)
            );
        }

        // Apply filters
        if (filters.categories.length > 0) {
            filtered = filtered.filter((product) =>
                filters.categories.includes(product.category)
            );
        }

        if (filters.priceRange[0] > 0 || filters.priceRange[1] < 500) {
            filtered = filtered.filter(
                (product) =>
                    product.price >= filters.priceRange[0] &&
                    product.price <= filters.priceRange[1]
            );
        }

        if (filters.inStock) {
            filtered = filtered.filter((product) => product.inStock);
        }

        if (filters.featured) {
            filtered = filtered.filter((product) => product.featured);
        }

        // Sort products
        filtered.sort((a, b) => {
            switch (sortBy) {
                case "price-low":
                    return a.price - b.price;
                case "price-high":
                    return b.price - a.price;
                case "name":
                    return a.name.localeCompare(b.name);
                default:
                    return 0;
            }
        });

        return filtered;
    }, [products, filters, sortBy, searchQuery]);

    const clearFilters = () => {
        setFilters({
            categories: [],
            priceRange: [0, 500],
            inStock: false,
            featured: false,
        });
        setSortBy("name");
    };

    const hasActiveFilters =
        filters.categories.length > 0 ||
        filters.priceRange[0] > 0 ||
        filters.priceRange[1] < 500 ||
        filters.inStock ||
        filters.featured ||
        sortBy !== "name";

    return (
        <div className="space-y-6">
            {/* Filters Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowFilters(!showFilters)}
                        className="lg:hidden"
                    >
                        <Filter className="h-4 w-4 mr-2" />
                        Filters
                    </Button>
                    <span className="text-sm text-muted-foreground">
                        {filteredAndSortedProducts.length} products
                    </span>
                </div>

                <div className="flex items-center gap-4">
                    {/* View Mode Toggle */}
                    <div className="hidden sm:flex border rounded-lg p-1">
                        <Button
                            variant={viewMode === "grid" ? "default" : "ghost"}
                            size="sm"
                            onClick={() => setViewMode("grid")}
                            className="h-8 w-8 p-0"
                        >
                            <Grid3X3 className="h-4 w-4" />
                        </Button>
                        <Button
                            variant={viewMode === "list" ? "default" : "ghost"}
                            size="sm"
                            onClick={() => setViewMode("list")}
                            className="h-8 w-8 p-0"
                        >
                            <List className="h-4 w-4" />
                        </Button>
                    </div>

                    {/* Sort */}
                    <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger className="w-48">
                            <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="name">Name A-Z</SelectItem>
                            <SelectItem value="price-low">
                                Price: Low to High
                            </SelectItem>
                            <SelectItem value="price-high">
                                Price: High to Low
                            </SelectItem>
                        </SelectContent>
                    </Select>

                    {hasActiveFilters && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={clearFilters}
                            className="hidden sm:flex"
                        >
                            <X className="h-4 w-4 mr-2" />
                            Clear
                        </Button>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Desktop Filters Sidebar */}
                <div className="hidden lg:block">
                    <ProductFilters
                        categories={categories}
                        onFiltersChange={setFilters}
                        className="sticky top-8"
                    />
                </div>

                {/* Mobile Filters */}
                {showFilters && (
                    <div className="lg:hidden col-span-full">
                        <ProductFilters
                            categories={categories}
                            onFiltersChange={setFilters}
                        />
                    </div>
                )}

                {/* Products */}
                <div className="lg:col-span-3">
                    {filteredAndSortedProducts.length > 0 ? (
                        <div
                            className={
                                viewMode === "grid"
                                    ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
                                    : "space-y-4"
                            }
                        >
                            {filteredAndSortedProducts.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    viewMode={viewMode}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 space-y-4">
                            <p className="text-muted-foreground">
                                No products found matching your criteria.
                            </p>
                            <Button
                                variant="outline"
                                onClick={clearFilters}
                                className="bg-transparent"
                            >
                                Clear Filters
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
