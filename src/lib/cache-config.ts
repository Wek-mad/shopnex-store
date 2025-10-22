/**
 * Cache configuration for ISR revalidation times
 * Values are in seconds
 */
export const CACHE_TIMES = {
    products: parseInt(process.env.NEXT_REVALIDATE_PRODUCTS || "600"), // 10 minutes
    collections: parseInt(process.env.NEXT_REVALIDATE_COLLECTIONS || "1800"), // 30 minutes
    pages: parseInt(process.env.NEXT_REVALIDATE_PAGES || "3600"), // 1 hour
    shopInfo: parseInt(process.env.NEXT_REVALIDATE_SHOP_INFO || "180"), // 3 minutes
    categories: parseInt(process.env.NEXT_REVALIDATE_CATEGORIES || "180"), // 3 minutes
} as const;
