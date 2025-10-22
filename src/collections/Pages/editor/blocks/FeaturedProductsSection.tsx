import { ComponentConfig } from "@measured/puck";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product/product-card";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Product } from "@/lib/products";

export interface FeaturedProductsSectionProps {
    title?: string;
    subtitle?: string;
    viewAllText?: string;
    viewAllLink?: string;
    products: Product[]; // Using any for external field compatibility
    columns?: 2 | 3 | 4;
    showPrices?: boolean;
    showAddToCart?: boolean;
}

export const FeaturedProductsSection: ComponentConfig<FeaturedProductsSectionProps> =
    {
        label: "Featured Products",
        fields: {
            title: { type: "text" },
            subtitle: { type: "text" },
            viewAllText: { type: "text" },
            viewAllLink: { type: "text" },
            products: {
                type: "array",
                arrayFields: {
                    id: { type: "text" },
                    name: { type: "text" },
                    description: { type: "textarea" },
                    price: { type: "number" },
                    image: { type: "text" },
                    images: { type: "array", arrayFields: { type: "text" } },
                    category: { type: "text" },
                    inStock: {
                        type: "radio",
                        options: [
                            { label: "Yes", value: true },
                            { label: "No", value: false },
                        ],
                    },
                },
                getItemSummary: (item) => item.name || "Product",
            },
            columns: {
                type: "select",
                options: [
                    { label: "2 Columns", value: 2 },
                    { label: "3 Columns", value: 3 },
                    { label: "4 Columns", value: 4 },
                ],
            },
            showPrices: {
                type: "radio",
                options: [
                    { label: "Yes", value: true },
                    { label: "No", value: false },
                ],
            },
            showAddToCart: {
                type: "radio",
                options: [
                    { label: "Yes", value: true },
                    { label: "No", value: false },
                ],
            },
        },
        defaultProps: {
            title: "Featured Products",
            subtitle: "Discover our handpicked selection of premium products",
            viewAllText: "View All Products",
            viewAllLink: "/products",
            products: [],
            columns: 4,
            showPrices: true,
            showAddToCart: true,
        },
        render: ({
            title = "Featured Products",
            subtitle = "Discover our handpicked selection of premium products",
            viewAllText = "View All Products",
            viewAllLink = "/products",
            products,
            columns = 4,
            showPrices = true,
            showAddToCart = true,
            puck,
        }) => {
            const allProducts =
                products && products.length > 0
                    ? products
                    : puck?.metadata?.featuredProducts || [];
            const columnClass = {
                2: "lg:grid-cols-2",
                3: "lg:grid-cols-3",
                4: "lg:grid-cols-4",
            }[columns];

            if (!allProducts || allProducts.length === 0) {
                return (
                    <section className="py-16 sm:py-24">
                        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="text-center space-y-4">
                                <h2 className="text-3xl sm:text-4xl font-bold">
                                    {title}
                                </h2>
                                <p className="text-muted-foreground">
                                    {subtitle}
                                </p>
                                <div className="py-12 border-2 border-dashed rounded-lg">
                                    <p className="text-muted-foreground">
                                        No products to display
                                    </p>
                                    <p className="text-sm text-muted-foreground mt-2">
                                        Products will be loaded dynamically
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>
                );
            }

            return (
                <section className="py-16 sm:py-24">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-12">
                            <div className="space-y-2">
                                {title && (
                                    <h2 className="text-3xl sm:text-4xl font-bold text-balance">
                                        {title}
                                    </h2>
                                )}
                                {subtitle && (
                                    <p className="text-muted-foreground text-pretty">
                                        {subtitle}
                                    </p>
                                )}
                            </div>
                            {viewAllText && (
                                <Link href={viewAllLink || "/products"}>
                                    <Button variant="outline">
                                        {viewAllText}
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </Link>
                            )}
                        </div>

                        <div
                            className={`grid grid-cols-1 sm:grid-cols-2 ${columnClass} gap-6`}
                        >
                            {allProducts && Array.isArray(allProducts)
                                ? allProducts.map((product) => (
                                      <div key={product.id} className="group">
                                          <ProductCard product={product} />
                                      </div>
                                  ))
                                : null}
                        </div>
                    </div>
                </section>
            );
        },
    };
