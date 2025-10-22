"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/hooks/use-cart";
import type { Product } from "@/lib/products";
import {
    ShoppingCart,
    Heart,
    Share2,
    Truck,
    Shield,
    RotateCcw,
    Star,
} from "lucide-react";

interface ProductDetailProps {
    product: Product;
}

export function ProductDetail({ product }: ProductDetailProps) {
    const { addItem } = useCart();
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    const handleAddToCart = async () => {
        setIsLoading(true);

        // Simulate loading
        await new Promise((resolve) => setTimeout(resolve, 500));

        for (let i = 0; i < quantity; i++) {
            addItem({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
            });
        }

        setIsLoading(false);
    };

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Product Images */}
                <div className="space-y-4">
                    {/* Main Image */}
                    <div className="aspect-square rounded-lg overflow-hidden bg-muted/50">
                        <Image
                            src={product.images[selectedImage] || product.image}
                            alt={product.name}
                            width={600}
                            height={600}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Thumbnail Images */}
                    {product.images.length > 1 && (
                        <div className="flex gap-2 overflow-x-auto">
                            {product.images.map((image, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedImage(index)}
                                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                                        selectedImage === index
                                            ? "border-primary"
                                            : "border-transparent"
                                    }`}
                                >
                                    <Image
                                        src={image || "/placeholder.svg"}
                                        alt={`${product.name} ${index + 1}`}
                                        width={80}
                                        height={80}
                                        className="w-full h-full object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Product Info */}
                <div className="space-y-6">
                    {/* Header */}
                    <div className="space-y-4">
                        <div className="flex items-start justify-between">
                            <div className="space-y-2">
                                <Badge variant="secondary">
                                    {product.category}
                                </Badge>
                                <h1 className="text-3xl sm:text-4xl font-bold text-balance">
                                    {product.name}
                                </h1>
                            </div>
                            <div className="flex gap-2">
                                <Button variant="ghost" size="icon">
                                    <Heart className="h-5 w-5" />
                                </Button>
                                <Button variant="ghost" size="icon">
                                    <Share2 className="h-5 w-5" />
                                </Button>
                            </div>
                        </div>

                        {/* Rating */}
                        {/* <div className="flex items-center gap-2">
                            <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`h-4 w-4 ${i < 4 ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`}
                                    />
                                ))}
                            </div>
                            <span className="text-sm text-muted-foreground">
                                (4.0) • 127 reviews
                            </span>
                        </div> */}

                        <div className="text-3xl font-bold">
                            ${product.price}
                        </div>
                    </div>

                    <Separator />

                    {/* Description */}
                    <div className="space-y-4">
                        <h3 className="font-semibold">Description</h3>

                        <div
                            className="text-muted-foreground leading-relaxed"
                            dangerouslySetInnerHTML={{
                                __html: product.description,
                            }}
                        />
                    </div>

                    <Separator />

                    {/* Add to Cart */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center border rounded-lg">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() =>
                                        setQuantity(Math.max(1, quantity - 1))
                                    }
                                    disabled={quantity <= 1}
                                >
                                    -
                                </Button>
                                <span className="px-4 py-2 min-w-[3rem] text-center">
                                    {quantity}
                                </span>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setQuantity(quantity + 1)}
                                >
                                    +
                                </Button>
                            </div>
                            <span className="text-sm text-muted-foreground">
                                {product.inStock ? "In Stock" : "Out of Stock"}
                            </span>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button
                                size="lg"
                                onClick={handleAddToCart}
                                disabled={!product.inStock || isLoading}
                                className="flex-1"
                            >
                                {isLoading ? (
                                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent mr-2" />
                                ) : (
                                    <ShoppingCart className="h-5 w-5 mr-2" />
                                )}
                                {isLoading ? "Adding..." : "Add to Cart"}
                            </Button>
                            <Button
                                variant="outline"
                                size="lg"
                                className="sm:w-auto bg-transparent"
                            >
                                Buy Now
                            </Button>
                        </div>
                    </div>

                    <Separator />

                    {/* Features */}
                    <div className="space-y-4">
                        <h3 className="font-semibold">
                            Why Choose This Product
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                                <Truck className="h-5 w-5 text-primary" />
                                <div className="text-sm">
                                    <div className="font-medium">
                                        Free Shipping
                                    </div>
                                    <div className="text-muted-foreground">
                                        On orders over $50
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                                <Shield className="h-5 w-5 text-primary" />
                                <div className="text-sm">
                                    <div className="font-medium">
                                        2 Year Warranty
                                    </div>
                                    <div className="text-muted-foreground">
                                        Full coverage
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                                <RotateCcw className="h-5 w-5 text-primary" />
                                <div className="text-sm">
                                    <div className="font-medium">
                                        30-Day Returns
                                    </div>
                                    <div className="text-muted-foreground">
                                        No questions asked
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
