"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import Image from "next/image"
import { CheckCircle, Package, Truck, Mail, Download } from "lucide-react"

interface OrderData {
  id: string
  items: Array<{
    id: string
    name: string
    price: number
    quantity: number
    image: string
  }>
  total: number
  subtotal?: number
  shipping?: number
  tax?: number
  shippingMethod?: string
  customerInfo: {
    email: string
    name: string
    address: string
  }
  date: string
}

interface OrderConfirmationProps {
  orderId: string | null
  orderData: OrderData | null
}

export function OrderConfirmation({ orderId, orderData }: OrderConfirmationProps) {
  if (!orderId || !orderData) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Order Not Found</h1>
            <p className="text-muted-foreground">We couldn't find your order information.</p>
          </div>
          <Link href="/products">
            <Button size="lg">Continue Shopping</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Success Header */}
        <div className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center">
            <CheckCircle className="h-8 w-8 text-secondary" />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl font-bold">Order Confirmed!</h1>
            <p className="text-muted-foreground">
              Thank you for your purchase. Your order has been received and is being processed.
            </p>
          </div>
        </div>

        {/* Order Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Order Details</span>
              <span className="text-sm font-normal text-muted-foreground">#{orderData.id}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Customer Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Contact Information
                </h3>
                <p className="text-sm text-muted-foreground">{orderData.customerInfo.email}</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <Truck className="h-4 w-4" />
                  Shipping Address
                </h3>
                <div className="text-sm text-muted-foreground">
                  <p>{orderData.customerInfo.name}</p>
                  <p>{orderData.customerInfo.address}</p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Order Items */}
            <div className="space-y-4">
              <h3 className="font-semibold flex items-center gap-2">
                <Package className="h-4 w-4" />
                Items Ordered
              </h3>
              <div className="space-y-3">
                {orderData.items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted/50">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="font-medium text-sm">{item.name}</p>
                      <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                    </div>
                    <div className="text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</div>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Order Total */}
            <div className="space-y-2">
              {orderData.subtotal !== undefined && (
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>${orderData.subtotal.toFixed(2)}</span>
                </div>
              )}
              {orderData.shipping !== undefined && (
                <div className="flex justify-between text-sm">
                  <span>Shipping{orderData.shippingMethod ? ` (${orderData.shippingMethod})` : ''}</span>
                  <span className={orderData.shipping === 0 ? "text-secondary font-medium" : ""}>
                    {orderData.shipping === 0 ? "FREE" : `$${orderData.shipping.toFixed(2)}`}
                  </span>
                </div>
              )}
              {orderData.tax !== undefined && (
                <div className="flex justify-between text-sm">
                  <span>Tax</span>
                  <span>${orderData.tax.toFixed(2)}</span>
                </div>
              )}
              <Separator />
              <div className="flex justify-between items-center">
                <span className="font-semibold text-lg">Total Paid</span>
                <span className="font-bold text-xl">${orderData.total.toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card>
          <CardHeader>
            <CardTitle>What's Next?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="text-center space-y-2">
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Confirmation Email</h4>
                  <p className="text-xs text-muted-foreground">Sent to your email address</p>
                </div>
              </div>
              <div className="text-center space-y-2">
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Package className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Processing</h4>
                  <p className="text-xs text-muted-foreground">1-2 business days</p>
                </div>
              </div>
              <div className="text-center space-y-2">
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Truck className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Shipping</h4>
                  <p className="text-xs text-muted-foreground">3-5 business days</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="outline" className="bg-transparent">
            <Download className="h-4 w-4 mr-2" />
            Download Receipt
          </Button>
          <Link href="/products">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
