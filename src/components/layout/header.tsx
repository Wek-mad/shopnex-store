"use client";

import Link from "next/link";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { MobileNav } from "./mobile-nav";
import { SearchDialog } from "@/components/search/search-dialog";
import { AccountMenu } from "@/components/account/account-menu";

export function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2">
                        <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                            <span className="text-primary-foreground font-bold text-lg">
                                S
                            </span>
                        </div>
                        <span className="text-xl font-bold text-foreground">
                            ShopNex
                        </span>
                    </Link>

                    {/* Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <Link
                            href="/products"
                            className="text-foreground hover:text-primary transition-colors"
                        >
                            Products
                        </Link>
                        <Link
                            href="/categories"
                            className="text-foreground hover:text-primary transition-colors"
                        >
                            Categories
                        </Link>
                        <Link
                            href="/about"
                            className="text-foreground hover:text-primary transition-colors"
                        >
                            About
                        </Link>
                    </nav>

                    {/* Actions */}
                    <div className="flex items-center space-x-4">
                        <SearchDialog />

                        <AccountMenu />

                        <CartDrawer />

                        <MobileNav />
                    </div>
                </div>
            </div>
        </header>
    );
}
