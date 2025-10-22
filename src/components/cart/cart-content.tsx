"use client"

import { useCart } from "@/hooks/use-cart"
import { CartItem } from "./cart-item"
import { CartSummary } from "./cart-summary"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { ShoppingBag, ArrowLeft } from "lucide-react"

export function CartContent() {
  const { items, clearCart } = useCart()

  if (items.length === 0) {
    return (
      <div className="text-center py-20 space-y-6">
        <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center">
          <ShoppingBag className="h-12 w-12 text-muted-foreground" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold">Your cart is empty</h2>
          <p className="text-muted-foreground">Add some products to get started</p>
        </div>
        <Link href="/products">
          <Button size="lg">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Continue Shopping
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Cart Items */}
      <div className="lg:col-span-2 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Items ({items.length})</h2>
          <Button variant="ghost" size="sm" onClick={clearCart} className="text-destructive hover:text-destructive">
            Clear Cart
          </Button>
        </div>

        <div className="space-y-3">
          {items.map((item, index) => (
            <div key={item.id}>
              <CartItem item={item} />
              {index < items.length - 1 && <Separator className="mt-3 opacity-50" />}
            </div>
          ))}
        </div>

        <Link href="/products">
          <Button variant="outline" className="w-full sm:w-auto bg-transparent">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Continue Shopping
          </Button>
        </Link>
      </div>

      {/* Cart Summary */}
      <div className="lg:col-span-1">
        <CartSummary />
      </div>
    </div>
  )
}
