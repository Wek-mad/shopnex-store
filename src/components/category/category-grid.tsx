import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

interface CategoryGridProps {
    categories: { title: string; productCount: number }[];
    categoryProductCounts?: Record<string, number>;
}

const categoryImages: Record<string, string> = {
    Electronics: "/placeholder.svg?key=electronics",
    Clothing: "/placeholder.svg?key=clothing",
    "Home & Garden": "/placeholder.svg?key=home-garden",
    "Sports & Outdoors": "/placeholder.svg?key=sports-outdoors",
};

export function CategoryGrid({ categories }: CategoryGridProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories.map((category) => {
                return (
                    <Link
                        key={category.title}
                        href={`/products?category=${encodeURIComponent(category.productCount)}`}
                    >
                        <Card className="py-0 group cursor-pointer overflow-hidden border-0 shadow-sm hover:shadow-lg transition-all duration-300">
                            <CardContent className="p-0">
                                <div className="aspect-square bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                                    <img
                                        src={
                                            categoryImages[category.title] ||
                                            "/placeholder.svg"
                                        }
                                        alt={category.title}
                                        className="w-24 h-24 object-contain group-hover:scale-110 transition-transform duration-300"
                                    />
                                </div>
                                <div className="p-4 text-center">
                                    <h3 className="font-semibold group-hover:text-primary transition-colors">
                                        {category.title}
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        {category.productCount} product
                                        {category.productCount !== 1 ? "s" : ""}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                );
            })}
        </div>
    );
}
