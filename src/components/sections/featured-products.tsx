import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product/product-card"
import { getFeaturedProducts } from "@/lib/products"
import { ArrowRight } from "lucide-react"

export async function FeaturedProducts() {
  const featuredProducts = await getFeaturedProducts()

  return (
    <section className="py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-12">
          <div className="space-y-2">
            <h2 className="text-3xl sm:text-4xl font-bold text-balance">Featured Products</h2>
            <p className="text-muted-foreground text-pretty">Discover our handpicked selection of premium products</p>
          </div>
          <Link href="/products">
            <Button variant="outline">
              View All Products
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
