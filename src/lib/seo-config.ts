export const seoConfig = {
  defaultTitle: 'ShopNex - Modern E-Commerce Storefront',
  defaultDescription: 'A minimal, modern e-commerce storefront built with Next.js',
  siteName: 'ShopNex',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://shopnex.com',
  defaultImage: '/og-image.jpg',
  twitterHandle: '@shopnex',
  locale: 'en_US',
  brand: 'ShopNex',

  pages: {
    home: {
      titleTemplate: '%s',
      description: 'Discover premium products at ShopNex. Shop the latest trends with fast shipping and excellent customer service.',
    },
    products: {
      titleTemplate: '%s | ShopNex',
      description: 'Discover our complete collection of premium products. Shop the latest trends and find exactly what you need.',
    },
    productDetail: {
      titleTemplate: '%s | ShopNex',
      descriptionTemplate: 'Shop %s at ShopNex. %s',
    },
    search: {
      titleTemplate: 'Search Results for "%s" | ShopNex',
      descriptionTemplate: 'Shop products matching "%s" at ShopNex. Find exactly what you\'re looking for in our curated collection.',
    },
    categories: {
      title: 'Categories | ShopNex',
      description: 'Browse our product categories. Find exactly what you need by shopping our organized collections.',
    },
    cart: {
      title: 'Shopping Cart | ShopNex',
      description: 'Review your selected items and proceed to checkout. Secure shopping cart with easy item management.',
      noIndex: true,
    },
    checkout: {
      title: 'Checkout | ShopNex',
      description: 'Complete your purchase securely. Enter shipping and payment information to finalize your order.',
      noIndex: true,
    },
    orderConfirmation: {
      title: 'Order Confirmation | ShopNex',
      description: 'Thank you for your order! Your purchase has been confirmed and is being processed.',
      noIndex: true,
    },
  },

  // Open Graph defaults
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'ShopNex',
  },

  // Twitter defaults
  twitter: {
    card: 'summary_large_image',
  },

  // Robots defaults
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export type SEOPageKey = keyof typeof seoConfig.pages