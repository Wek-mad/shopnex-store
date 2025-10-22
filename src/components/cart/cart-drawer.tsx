"use client";

import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CartItem } from "./cart-item";
import Link from "next/link";
import { ShoppingCart, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";

export function CartDrawer({
    showCartDrawer = false,
}: {
    showCartDrawer?: boolean;
}) {
    const [open, setOpen] = useState(showCartDrawer);
    const { items, getTotalPrice, getTotalItems } = useCart();
    const totalItems = getTotalItems();
    const totalPrice = getTotalPrice();

    useEffect(() => {
        setOpen(showCartDrawer);
    }, [showCartDrawer]);

    return (
        <Sheet
            open={open}
            onOpenChange={(val) => {
                setOpen(val);
            }}
        >
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                    <ShoppingCart className="h-5 w-5" />
                    {totalItems > 0 && (
                        <Badge
                            variant="destructive"
                            className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                        >
                            {totalItems}
                        </Badge>
                    )}
                    <span className="sr-only">Shopping cart</span>
                </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-lg">
                <SheetHeader>
                    <SheetTitle className="flex items-center gap-2">
                        <ShoppingCart className="h-5 w-5" />
                        Shopping Cart ({totalItems})
                    </SheetTitle>
                </SheetHeader>

                {items.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full space-y-4">
                        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                            <ShoppingBag className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <div className="text-center space-y-2">
                            <p className="font-medium">Your cart is empty</p>
                            <p className="text-sm text-muted-foreground">
                                Add some products to get started
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col h-full p-4">
                        {/* Cart Items */}
                        <div className="flex-1 overflow-y-auto py-4 space-y-4">
                            {items.map((item) => (
                                <div key={item.id}>
                                    <CartItem item={item} />
                                    <Separator className="mt-4" />
                                </div>
                            ))}
                        </div>

                        {/* Cart Summary */}
                        <div className="border-t pt-4 space-y-4">
                            <div className="flex justify-between font-semibold text-lg">
                                <span>Total</span>
                                <span>${totalPrice.toFixed(2)}</span>
                            </div>

                            <div className="space-y-2 flex flex-col">
                                <Link href="/cart" className="w-full">
                                    <Button
                                        variant="outline"
                                        size="lg"
                                        className="w-full bg-transparent"
                                    >
                                        View Cart
                                    </Button>
                                </Link>
                                <Link href="/checkout" className="w-full">
                                    <Button size="lg" className="w-full">
                                        Checkout
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </SheetContent>
        </Sheet>
    );
}
