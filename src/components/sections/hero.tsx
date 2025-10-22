import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, ShoppingBag } from "lucide-react"

export function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-background to-muted/50 py-20 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-balance leading-tight">
                Discover Your Next
                <span className="text-primary"> Favorite </span>
                Product
              </h1>
              <p className="text-lg text-muted-foreground text-pretty max-w-lg">
                Shop the latest trends and timeless classics in our curated collection. Quality products, exceptional
                service, delivered to your door.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/products">
                <Button size="lg" className="w-full sm:w-auto">
                  Shop Now
                  <ShoppingBag className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/categories">
                <Button variant="outline" size="lg" className="w-full sm:w-auto bg-transparent">
                  Browse Categories
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t">
              <div className="text-center sm:text-left">
                <div className="text-2xl font-bold text-primary">10K+</div>
                <div className="text-sm text-muted-foreground">Happy Customers</div>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-2xl font-bold text-primary">500+</div>
                <div className="text-sm text-muted-foreground">Products</div>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-2xl font-bold text-primary">24/7</div>
                <div className="text-sm text-muted-foreground">Support</div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 p-8 flex items-center justify-center">
              <img src="/modern-e-commerce-hero-image-with-shopping-bags-an.jpg" alt="ShopNex Hero" className="w-full h-full object-contain" />
            </div>
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 bg-secondary text-secondary-foreground px-4 py-2 rounded-full text-sm font-medium shadow-lg">
              Free Shipping
            </div>
            <div className="absolute -bottom-4 -left-4 bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium shadow-lg">
              30-Day Returns
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
