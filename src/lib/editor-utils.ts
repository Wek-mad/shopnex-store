import { Data } from "@measured/puck";

export interface PageData {
  id: string;
  title: string;
  slug: string;
  data: Data;
  createdAt: string;
  updatedAt: string;
}

// Utility functions for managing page data
export const pageUtils = {
  // Save page data to localStorage (in a real app, this would be an API call)
  savePage: (pageData: PageData): void => {
    const pages = pageUtils.getAllPages();
    const existingIndex = pages.findIndex(p => p.id === pageData.id);

    if (existingIndex >= 0) {
      pages[existingIndex] = { ...pageData, updatedAt: new Date().toISOString() };
    } else {
      pages.push({
        ...pageData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
    }

    localStorage.setItem("puck-pages", JSON.stringify(pages));
  },

  // Get all saved pages
  getAllPages: (): PageData[] => {
    try {
      const saved = localStorage.getItem("puck-pages");
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error("Failed to load pages:", error);
      return [];
    }
  },

  // Get a specific page by ID
  getPage: (id: string): PageData | null => {
    const pages = pageUtils.getAllPages();
    return pages.find(p => p.id === id) || null;
  },

  // Get a page by slug
  getPageBySlug: (slug: string): PageData | null => {
    const pages = pageUtils.getAllPages();
    return pages.find(p => p.slug === slug) || null;
  },

  // Delete a page
  deletePage: (id: string): void => {
    const pages = pageUtils.getAllPages();
    const filtered = pages.filter(p => p.id !== id);
    localStorage.setItem("puck-pages", JSON.stringify(filtered));
  },

  // Generate a unique ID
  generateId: (): string => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  },

  // Generate a slug from a title
  generateSlug: (title: string): string => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
};

// Template data for different page types
export const pageTemplates = {
  landing: {
    title: "Landing Page",
    data: {
      content: [
        {
          type: "HeaderBlock",
          props: {
            id: "header-1",
            logoText: "ShopNex",
            navigationItems: [
              { label: "Products", href: "/products" },
              { label: "Categories", href: "/categories" },
              { label: "About", href: "/about" },
            ],
            showSearch: true,
            showCart: true,
          },
        },
        {
          type: "LandingHeroSection",
          props: {
            id: "hero-1",
            title: "Discover Your Next",
            highlightedWord: "Favorite",
            subtitle: "Shop the latest trends and timeless classics in our curated collection. Quality products, exceptional service, delivered to your door.",
            primaryCtaText: "Shop Now",
            primaryCtaLink: "/products",
            secondaryCtaText: "Browse Categories",
            secondaryCtaLink: "/categories",
            heroImage: "/modern-e-commerce-hero-image-with-shopping-bags-an.jpg",
            stats: [
              { value: "10K+", label: "Happy Customers" },
              { value: "500+", label: "Products" },
              { value: "24/7", label: "Support" },
            ],
            badges: [
              { text: "Free Shipping", position: "top-right" },
              { text: "30-Day Returns", position: "bottom-left" },
            ],
          },
        },
        {
          type: "FeaturedProductsSection",
          props: {
            id: "featured-1",
            title: "Featured Products",
            subtitle: "Discover our handpicked selection of premium products",
            viewAllText: "View All Products",
            viewAllLink: "/products",
            products: [],
            columns: 4,
          },
        },
        {
          type: "NewsletterSection",
          props: {
            id: "newsletter-1",
            title: "Stay in the Loop",
            subtitle: "Subscribe to our newsletter for exclusive deals, new arrivals, and style tips.",
            placeholder: "Enter your email",
            buttonText: "Subscribe",
            privacyText: "We respect your privacy. Unsubscribe at any time.",
          },
        },
        {
          type: "FooterSection",
          props: {
            id: "footer-1",
            logoText: "ShopNex",
            description: "Modern e-commerce storefront built for the future of online shopping.",
            sections: [
              {
                title: "Shop",
                links: [
                  { label: "All Products", href: "/products" },
                  { label: "Categories", href: "/categories" },
                  { label: "New Arrivals", href: "/new-arrivals" },
                  { label: "Sale", href: "/sale" },
                ],
              },
              {
                title: "Support",
                links: [
                  { label: "Contact Us", href: "/contact" },
                  { label: "Shipping Info", href: "/shipping" },
                  { label: "Returns", href: "/returns" },
                  { label: "FAQ", href: "/faq" },
                ],
              },
              {
                title: "Company",
                links: [
                  { label: "About Us", href: "/about" },
                  { label: "Privacy Policy", href: "/privacy" },
                  { label: "Terms of Service", href: "/terms" },
                ],
              },
            ],
            copyrightText: "© 2024 ShopNex. All rights reserved.",
          },
        },
      ],
      root: { props: { title: "Landing Page" } },
    },
  },

  about: {
    title: "About Us",
    data: {
      content: [
        {
          type: "HeadingBlock",
          props: {
            id: "heading-1",
            title: "About Our Company",
            level: "h1",
            align: "center",
          },
        },
        {
          type: "TextBlock",
          props: {
            id: "text-1",
            text: "We are passionate about delivering high-quality products that make a difference in our customers' lives.",
            align: "center",
          },
        },
        {
          type: "Spacer",
          props: {
            id: "spacer-1",
            height: 60,
          },
        },
      ],
      root: { props: { title: "About Us" } },
    },
  },

  blank: {
    title: "Blank Page",
    data: {
      content: [
        {
          type: "HeadingBlock",
          props: {
            id: "heading-1",
            title: "New Page",
            level: "h1",
            align: "center",
          },
        },
        {
          type: "TextBlock",
          props: {
            id: "text-1",
            text: "Start building your page by adding components from the sidebar.",
            align: "center",
          },
        },
      ],
      root: { props: { title: "New Page" } },
    },
  },
};