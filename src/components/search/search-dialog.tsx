"use client";

import { useState, useEffect, useMemo } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, X, TrendingUp, Clock } from "lucide-react";
import Link from "next/link";
import { getProducts, type Product } from "@/lib/products";
import { useRouter } from "next/navigation";

interface SearchDialogProps {
    trigger?: React.ReactNode;
}

export function SearchDialog({ trigger }: SearchDialogProps) {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const [recentSearches, setRecentSearches] = useState<string[]>([]);
    const router = useRouter();

    // Load recent searches from localStorage
    useEffect(() => {
        const saved = localStorage.getItem("recentSearches");
        if (saved) {
            setRecentSearches(JSON.parse(saved));
        }
    }, []);

    // Load products on mount
    useEffect(() => {
        const loadProducts = async () => {
            setLoading(true);
            try {
                const allProducts = await getProducts();
                setProducts(allProducts);
            } catch (error) {
                console.error("Failed to load products:", error);
            }
            setLoading(false);
        };
        loadProducts();
    }, []);

    // Filter products based on search query
    const filteredProducts = useMemo(() => {
        if (!query.trim()) return [];

        const searchTerm = query.toLowerCase();
        return products
            .filter(product =>
                product.name.toLowerCase().includes(searchTerm) ||
                product.description.toLowerCase().includes(searchTerm) ||
                product.category.toLowerCase().includes(searchTerm)
            )
            .slice(0, 6); // Limit to 6 results
    }, [products, query]);

    // Popular searches (could be dynamic in real implementation)
    const popularSearches = ["Headphones", "T-shirts", "Sneakers", "Laptops", "Books"];

    const saveSearch = (searchQuery: string) => {
        if (!searchQuery.trim()) return;

        const updated = [searchQuery, ...recentSearches.filter(s => s !== searchQuery)].slice(0, 5);
        setRecentSearches(updated);
        localStorage.setItem("recentSearches", JSON.stringify(updated));
    };

    const handleSearch = (searchQuery: string) => {
        saveSearch(searchQuery);
        setOpen(false);
        router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleSearch(query);
        }
    };

    const clearRecentSearches = () => {
        setRecentSearches([]);
        localStorage.removeItem("recentSearches");
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {trigger || (
                    <Button variant="ghost" size="icon">
                        <Search className="h-5 w-5" />
                        <span className="sr-only">Search</span>
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="max-w-2xl p-0 gap-0">
                <div className="flex items-center border-b px-6 py-4">
                    <Search className="h-5 w-5 text-muted-foreground mr-3" />
                    <Input
                        placeholder="Search products..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-lg"
                        autoFocus
                    />
                    {query && (
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setQuery("")}
                            className="h-8 w-8"
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    )}
                </div>

                <div className="max-h-96 overflow-y-auto">
                    {/* Search Results */}
                    {query && (
                        <div className="p-6">
                            <h3 className="font-semibold mb-4">Products</h3>
                            {loading ? (
                                <div className="space-y-3">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="flex items-center space-x-3">
                                            <div className="w-12 h-12 bg-muted rounded animate-pulse" />
                                            <div className="flex-1 space-y-2">
                                                <div className="h-4 bg-muted rounded animate-pulse" />
                                                <div className="h-3 bg-muted rounded animate-pulse w-2/3" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : filteredProducts.length > 0 ? (
                                <div className="space-y-2">
                                    {filteredProducts.map((product) => (
                                        <Link
                                            key={product.id}
                                            href={`/products/${product.id}`}
                                            className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted transition-colors"
                                            onClick={() => setOpen(false)}
                                        >
                                            <img
                                                src={product.image || "/placeholder.jpg"}
                                                alt={product.name}
                                                className="w-12 h-12 object-cover rounded"
                                            />
                                            <div className="flex-1 min-w-0">
                                                <p className="font-medium truncate">{product.name}</p>
                                                <div className="flex items-center gap-2">
                                                    <p className="text-sm text-muted-foreground">${product.price}</p>
                                                    <Badge variant="secondary" className="text-xs">
                                                        {product.category}
                                                    </Badge>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                    <Button
                                        variant="ghost"
                                        className="w-full mt-4"
                                        onClick={() => handleSearch(query)}
                                    >
                                        View all results for "{query}"
                                    </Button>
                                </div>
                            ) : (
                                <div className="text-center py-8 text-muted-foreground">
                                    <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                    <p>No products found for "{query}"</p>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Recent and Popular Searches */}
                    {!query && (
                        <div className="p-6 space-y-6">
                            {recentSearches.length > 0 && (
                                <div>
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="font-semibold flex items-center gap-2">
                                            <Clock className="h-4 w-4" />
                                            Recent Searches
                                        </h3>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={clearRecentSearches}
                                            className="text-xs"
                                        >
                                            Clear
                                        </Button>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {recentSearches.map((search, index) => (
                                            <Badge
                                                key={index}
                                                variant="secondary"
                                                className="cursor-pointer hover:bg-muted-foreground/20"
                                                onClick={() => handleSearch(search)}
                                            >
                                                {search}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div>
                                <h3 className="font-semibold mb-4 flex items-center gap-2">
                                    <TrendingUp className="h-4 w-4" />
                                    Popular Searches
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {popularSearches.map((search, index) => (
                                        <Badge
                                            key={index}
                                            variant="outline"
                                            className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                                            onClick={() => handleSearch(search)}
                                        >
                                            {search}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}