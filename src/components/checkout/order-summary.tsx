"use client";

import { useCart } from "@/hooks/use-cart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

interface OrderSummaryProps {
    subtotal?: number;
    shipping?: number;
    tax?: number;
    total?: number;
    shippingMethodName?: string;
}

export function OrderSummary({
    subtotal: propSubtotal,
    shipping: propShipping,
    tax: propTax,
    total: propTotal,
    shippingMethodName,
}: OrderSummaryProps) {
    const { items, getTotalPrice } = useCart();

    // Use provided values or fallback to cart calculations
    const subtotal = propSubtotal ?? getTotalPrice();
    const shipping = propShipping ?? (subtotal > 50 ? 0 : 9.99);
    const tax = propTax ?? subtotal * 0.08;
    const total = propTotal ?? subtotal + shipping + tax;

    return (
        <Card>
            <CardHeader>
                <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {/* Items */}
                <div className="space-y-3">
                    {items.map((item) => (
                        <div key={item.id} className="flex gap-3">
                            <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-muted/50">
                                <Image
                                    src={item.image || "/placeholder.svg"}
                                    alt={item.name}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                    {item.quantity}
                                </div>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium line-clamp-2">
                                    {item.name}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    ${item.price.toFixed(2)}
                                </p>
                            </div>
                            <div className="text-sm font-medium">
                                ${(item.price * item.quantity).toFixed(2)}
                            </div>
                        </div>
                    ))}
                </div>

                <Separator />

                {/* Totals */}
                <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                        <span>Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span>
                            Shipping
                            {shippingMethodName
                                ? ` (${shippingMethodName})`
                                : ""}
                        </span>
                        <span
                            className={
                                shipping === 0
                                    ? "text-secondary font-medium"
                                    : ""
                            }
                        >
                            {shipping === 0
                                ? "FREE"
                                : `$${shipping.toFixed(2)}`}
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
            </CardContent>
        </Card>
    );
}
