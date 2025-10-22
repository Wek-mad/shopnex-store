export const homePageData = {
    title: "Home page",
    description: null,
    handle: "home",
    page: {
        root: {
            props: {
                title: "Home page",
                handle: "home"
            }
        },
        zones: {},
        content: [
            {
                type: "HeaderBlock",
                props: {
                    id: "HeaderBlock-0ef3e2e5-cb4d-4a64-9310-c3f91d632128",
                    cartIcon: "bag",
                    logoText: "ShopNex",
                    showCart: true,
                    showSearch: true,
                    cartPosition: "right",
                    showCartBadge: true,
                    cartButtonText: "",
                    showCartDrawer: false,
                    navigationItems: [
                        {
                            href: "/products",
                            label: "Products"
                        },
                        {
                            href: "/categories",
                            label: "Categories"
                        },
                        {
                            href: "/about",
                            label: "About"
                        }
                    ],
                    emptyCartMessage: "Your cart is empty"
                }
            },
            {
                type: "LandingHeroSection",
                props: {
                    id: "LandingHeroSection-93133935-24fe-409f-aaab-7f7a8a269ac4",
                    stats: [
                        {
                            label: "Happy Customers",
                            value: "10K+"
                        },
                        {
                            label: "Products",
                            value: "500+"
                        },
                        {
                            label: "Support",
                            value: "24/7"
                        }
                    ],
                    title: "Discover Your Next Favorite Product",
                    badges: [
                        {
                            text: "Free Shipping",
                            variant: "secondary",
                            position: "top-right"
                        },
                        {
                            text: "30-Day Returns",
                            variant: "primary",
                            position: "bottom-left"
                        }
                    ],
                    buttons: [
                        {
                            href: "/products",
                            icon: "ShoppingBag",
                            size: "lg",
                            text: "Shop Now",
                            variant: "default"
                        },
                        {
                            href: "/categories",
                            icon: "ArrowRight",
                            size: "lg",
                            text: "Browse Categories",
                            variant: "outline"
                        }
                    ],
                    subtitle: "Shop the latest trends and timeless classics in our curated collection. Quality products, exceptional service, delivered to your door.",
                    heroImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/modern-e-commerce-hero-image-with-shopping-bags-an-rSVK0qEjoQUyE3smzJyYc6mU4dGiYY.jpg",
                    showImage: true,
                    showStats: true,
                    showBadges: true,
                    highlightedWord: "Favorite"
                }
            },
            {
                type: "NewsletterSection",
                props: {
                    id: "NewsletterSection-5e39bcde-8eec-4057-b577-c00dcec26805",
                    title: "Stay in the Loop",
                    subtitle: "Subscribe to our newsletter for exclusive deals, new arrivals, and style tips.",
                    buttonText: "Subscribe",
                    placeholder: "Enter your email",
                    privacyText: "We respect your privacy. Unsubscribe at any time."
                }
            },
            {
                type: "FeaturedProductsSection",
                props: {
                    id: "FeaturedProductsSection-6ddd6405-1bb9-445a-9a5b-7f156ee6c7f3",
                    title: "Featured Products",
                    columns: 4,
                    products: [],
                    subtitle: "Discover our handpicked selection of premium products",
                    showPrices: true,
                    viewAllLink: "/products",
                    viewAllText: "View All Products",
                    showAddToCart: true
                }
            },
            {
                type: "FooterSection",
                props: {
                    id: "FooterSection-ed08c7c7-5535-4091-bf89-ad077066ae61",
                    logoText: "ShopNex",
                    sections: [
                        {
                            links: [
                                {
                                    href: "/products",
                                    label: "All Products"
                                },
                                {
                                    href: "/categories",
                                    label: "Categories"
                                },
                                {
                                    href: "/new-arrivals",
                                    label: "New Arrivals"
                                },
                                {
                                    href: "/sale",
                                    label: "Sale"
                                }
                            ],
                            title: "Shop"
                        },
                        {
                            links: [
                                {
                                    href: "/contact",
                                    label: "Contact Us"
                                },
                                {
                                    href: "/shipping",
                                    label: "Shipping Info"
                                },
                                {
                                    href: "/returns",
                                    label: "Returns"
                                },
                                {
                                    href: "/faq",
                                    label: "FAQ"
                                }
                            ],
                            title: "Support"
                        },
                        {
                            links: [
                                {
                                    href: "/about",
                                    label: "About Us"
                                },
                                {
                                    href: "/privacy",
                                    label: "Privacy Policy"
                                },
                                {
                                    href: "/terms",
                                    label: "Terms of Service"
                                }
                            ],
                            title: "Company"
                        }
                    ],
                    description: "Modern e-commerce storefront built for the future of online shopping.",
                    copyrightText: "© 2024 ShopNex. All rights reserved."
                }
            }
        ]
    }
};