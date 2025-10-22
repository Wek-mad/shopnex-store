"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useCart, type CartItem as CartItemType } from "@/hooks/use-cart"
import { Minus, Plus, Trash2 } from "lucide-react"

interface CartItemProps {
  item: CartItemType
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart()

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(item.id)
    } else {
      updateQuantity(item.id, newQuantity)
    }
  }

  return (
    <div className="flex gap-4 p-4 bg-card rounded-lg border border-border hover:shadow-sm transition-shadow">
      {/* Product Image */}
      <Link href={`/products/${item.id}`} className="flex-shrink-0">
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden bg-muted/30 border border-border/50">
          <Image
            src={item.image || "/placeholder.svg"}
            alt={item.name}
            width={96}
            height={96}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
          />
        </div>
      </Link>

      {/* Product Details */}
      <div className="flex-1 space-y-2">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
          <div className="space-y-1">
            <Link href={`/products/${item.id}`}>
              <h3 className="font-medium text-sm sm:text-base hover:text-primary transition-colors line-clamp-2">
                {item.name}
              </h3>
            </Link>
            {item.variant && <p className="text-xs text-muted-foreground">{item.variant}</p>}
          </div>
          <div className="text-right">
            <div className="font-semibold">${(item.price * item.quantity).toFixed(2)}</div>
            <div className="text-sm text-muted-foreground">${item.price.toFixed(2)} each</div>
          </div>
        </div>

        {/* Quantity Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center border rounded-lg bg-background hover:border-primary/30 transition-colors">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleQuantityChange(item.quantity - 1)}
              className="h-8 w-8 p-0"
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="px-3 py-1 text-sm min-w-[2rem] text-center">{item.quantity}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleQuantityChange(item.quantity + 1)}
              className="h-8 w-8 p-0"
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => removeItem(item.id)}
            className="text-destructive hover:text-destructive h-8 w-8 p-0"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
