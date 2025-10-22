import { ComponentConfig } from "@measured/puck";
import { ProductCard } from "@/components/product/product-card";

export interface ProductGridProps {
    title?: string;
    products: any; // Using any for external field compatibility
    columns?: 2 | 3 | 4;
}

export const ProductGrid: ComponentConfig<ProductGridProps> = {
    label: "Product Grid",
    fields: {
        title: { type: "text" },
        products: {
            type: "array",
            arrayFields: {
                id: { type: "text" },
                name: { type: "text" },
                description: { type: "textarea" },
                price: { type: "number" },
                image: { type: "text" },
                category: { type: "text" },
                inStock: { type: "radio", options: [
                    { label: "Yes", value: true },
                    { label: "No", value: false }
                ] },
            },
            getItemSummary: (item: any) => item.name || "Product",
        },
        columns: {
            type: "select",
            options: [
                { label: "2 Columns", value: 2 },
                { label: "3 Columns", value: 3 },
                { label: "4 Columns", value: 4 },
            ],
        },
    },
    defaultProps: {
        title: "Featured Products",
        products: [],
        columns: 4,
    },
    render: ({ title, products, columns = 4 }) => {
        const columnClass = {
            2: "lg:grid-cols-2",
            3: "lg:grid-cols-3",
            4: "lg:grid-cols-4",
        }[columns];

        return (
            <section className="py-16">
                <div className="container mx-auto px-4">
                    {title && (
                        <h2 className="text-3xl font-bold text-center mb-12">
                            {title}
                        </h2>
                    )}
                    <div className={`grid grid-cols-1 sm:grid-cols-2 ${columnClass} gap-6`}>
                        {products && Array.isArray(products) ? products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        )) : (
                            <div className="col-span-full text-center py-8 text-muted-foreground">
                                No products available
                            </div>
                        )}
                    </div>
                </div>
            </section>
        );
    },
};