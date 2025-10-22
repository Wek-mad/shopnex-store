"use client"

import { useCart } from "@/hooks/use-cart"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { ShoppingCart, Truck } from "lucide-react"

export function CartSummary() {
  const { items, getTotalPrice, getTotalItems } = useCart()

  const subtotal = getTotalPrice()
  const shipping = subtotal > 50 ? 0 : 9.99
  const tax = subtotal * 0.08 // 8% tax
  const total = subtotal + shipping + tax

  const totalItems = getTotalItems()

  if (items.length === 0) {
    return null
  }

  return (
    <Card className="sticky top-8 shadow-lg border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingCart className="h-5 w-5" />
          Order Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Subtotal ({totalItems} items)</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="flex items-center gap-1">
              <Truck className="h-3 w-3" />
              Shipping
            </span>
            <span className={shipping === 0 ? "text-primary font-medium" : ""}>
              {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Tax</span>
            <span>${tax.toFixed(2)}</span>
          </div>
        </div>

        <Separator />

        <div className="flex justify-between font-semibold text-lg">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>

        {subtotal < 50 && (
          <div className="text-xs text-muted-foreground bg-accent/50 p-3 rounded-lg border border-accent">
            Add ${(50 - subtotal).toFixed(2)} more for free shipping!
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col gap-3">
        <Link href="/checkout" className="w-full">
          <Button size="lg" className="w-full">
            Proceed to Checkout
          </Button>
        </Link>
        <Link href="/products" className="w-full">
          <Button variant="outline" size="lg" className="w-full bg-transparent">
            Continue Shopping
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
