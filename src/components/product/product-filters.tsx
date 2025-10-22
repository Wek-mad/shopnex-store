"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { X, Filter } from "lucide-react";

interface ProductFiltersProps {
    categories: string[];
    onFiltersChange: (filters: FilterState) => void;
    className?: string;
}

export interface FilterState {
    categories: string[];
    priceRange: [number, number];
    inStock: boolean;
    featured: boolean;
}

export function ProductFilters({
    categories,
    onFiltersChange,
    className,
}: ProductFiltersProps) {
    const [filters, setFilters] = useState<FilterState>({
        categories: [],
        priceRange: [0, 500],
        inStock: false,
        featured: false,
    });

    const updateFilters = (newFilters: Partial<FilterState>) => {
        const updated = { ...filters, ...newFilters };
        setFilters(updated);
        onFiltersChange(updated);
    };

    const clearFilters = () => {
        const cleared: FilterState = {
            categories: [],
            priceRange: [0, 500],
            inStock: false,
            featured: false,
        };
        setFilters(cleared);
        onFiltersChange(cleared);
    };

    const hasActiveFilters =
        filters.categories.length > 0 ||
        filters.priceRange[0] > 0 ||
        filters.priceRange[1] < 500 ||
        filters.inStock ||
        filters.featured;

    const handleCategoryChange = (category: string, checked: boolean) => {
        const newCategories = checked
            ? [...filters.categories, category]
            : filters.categories.filter((c) => c !== category);
        updateFilters({ categories: newCategories });
    };

    return (
        <Card className={className}>
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                        <Filter className="h-4 w-4" />
                        Filters
                    </span>
                    {hasActiveFilters && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={clearFilters}
                        >
                            <X className="h-4 w-4 mr-1" />
                            Clear
                        </Button>
                    )}
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Categories */}
                <div className="space-y-3">
                    <h3 className="font-medium">Categories</h3>
                    <div className="space-y-2">
                        {categories.map((category) => (
                            <div
                                key={category}
                                className="flex items-center space-x-2"
                            >
                                <Checkbox
                                    id={`category-${category}`}
                                    checked={filters.categories.includes(
                                        category
                                    )}
                                    onCheckedChange={(checked) =>
                                        handleCategoryChange(
                                            category,
                                            checked as boolean
                                        )
                                    }
                                />
                                <Label
                                    htmlFor={`category-${category}`}
                                    className="text-sm"
                                >
                                    {category}
                                </Label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Price Range */}
                <div className="space-y-3">
                    <h3 className="font-medium">Price Range</h3>
                    <div className="space-y-4">
                        <Slider
                            value={filters.priceRange}
                            onValueChange={(value) =>
                                updateFilters({
                                    priceRange: value as [number, number],
                                })
                            }
                            max={500}
                            min={0}
                            step={10}
                            className="w-full"
                        />
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <span>${filters.priceRange[0]}</span>
                            <span>${filters.priceRange[1]}</span>
                        </div>
                    </div>
                </div>

                {/* Availability */}
                <div className="space-y-3">
                    <h3 className="font-medium">Availability</h3>
                    <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="in-stock"
                                checked={filters.inStock}
                                onCheckedChange={(checked) =>
                                    updateFilters({
                                        inStock: checked as boolean,
                                    })
                                }
                            />
                            <Label htmlFor="in-stock" className="text-sm">
                                In Stock Only
                            </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="featured"
                                checked={filters.featured}
                                onCheckedChange={(checked) =>
                                    updateFilters({
                                        featured: checked as boolean,
                                    })
                                }
                            />
                            <Label htmlFor="featured" className="text-sm">
                                Featured Products
                            </Label>
                        </div>
                    </div>
                </div>

                {/* Active Filters */}
                {hasActiveFilters && (
                    <div className="space-y-2">
                        <h3 className="font-medium">Active Filters</h3>
                        <div className="flex flex-wrap gap-2">
                            {filters.categories.map((category) => (
                                <Badge
                                    key={category}
                                    variant="secondary"
                                    className="gap-1"
                                >
                                    {category}
                                    <button
                                        onClick={() =>
                                            handleCategoryChange(
                                                category,
                                                false
                                            )
                                        }
                                        className="ml-1 hover:bg-secondary-foreground/20 rounded-full p-0.5"
                                    >
                                        <X className="h-3 w-3" />
                                    </button>
                                </Badge>
                            ))}
                            {(filters.priceRange[0] > 0 ||
                                filters.priceRange[1] < 500) && (
                                <Badge variant="secondary" className="gap-1">
                                    ${filters.priceRange[0]} - $
                                    {filters.priceRange[1]}
                                    <button
                                        onClick={() =>
                                            updateFilters({
                                                priceRange: [0, 500],
                                            })
                                        }
                                        className="ml-1 hover:bg-secondary-foreground/20 rounded-full p-0.5"
                                    >
                                        <X className="h-3 w-3" />
                                    </button>
                                </Badge>
                            )}
                            {filters.inStock && (
                                <Badge variant="secondary" className="gap-1">
                                    In Stock
                                    <button
                                        onClick={() =>
                                            updateFilters({ inStock: false })
                                        }
                                        className="ml-1 hover:bg-secondary-foreground/20 rounded-full p-0.5"
                                    >
                                        <X className="h-3 w-3" />
                                    </button>
                                </Badge>
                            )}
                            {filters.featured && (
                                <Badge variant="secondary" className="gap-1">
                                    Featured
                                    <button
                                        onClick={() =>
                                            updateFilters({ featured: false })
                                        }
                                        className="ml-1 hover:bg-secondary-foreground/20 rounded-full p-0.5"
                                    >
                                        <X className="h-3 w-3" />
                                    </button>
                                </Badge>
                            )}
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
