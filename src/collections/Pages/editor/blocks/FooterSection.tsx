import { ComponentConfig } from "@measured/puck";
import Link from "next/link";

export interface FooterSectionProps {
    logoText: string;
    logoIcon?: string;
    description?: string;
    sections: Array<{
        title: string;
        links: Array<{
            label: string;
            href: string;
        }>;
    }>;
    copyrightText?: string;
}

export const FooterSection: ComponentConfig<FooterSectionProps> = {
    label: "Footer Links",
    fields: {
        logoText: { type: "text" },
        logoIcon: { type: "text" },
        description: { type: "textarea" },
        sections: {
            type: "array",
            getItemSummary: (item) => item.title || "Section",
            arrayFields: {
                title: { type: "text" },
                links: {
                    type: "array",
                    getItemSummary: (item) => item.label || "Link",
                    arrayFields: {
                        label: { type: "text" },
                        href: { type: "text" },
                    },
                },
            },
        },
        copyrightText: { type: "text" },
    },
    defaultProps: {
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
    render: ({ logoText, logoIcon, description, sections, copyrightText = "© 2024 ShopNex. All rights reserved." }) => (
        <footer className="border-t bg-muted/50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                                {logoIcon ? (
                                    <img src={logoIcon} alt={logoText} className="w-6 h-6" />
                                ) : (
                                    <span className="text-primary-foreground font-bold text-lg">
                                        {logoText.charAt(0)}
                                    </span>
                                )}
                            </div>
                            <span className="text-xl font-bold text-foreground">{logoText}</span>
                        </div>
                        {description && (
                            <p className="text-muted-foreground text-sm">
                                {description}
                            </p>
                        )}
                    </div>

                    {sections.map((section, index) => (
                        <div key={index} className="space-y-4">
                            <h3 className="font-semibold">{section.title}</h3>
                            <ul className="space-y-2 text-sm">
                                {section.links.map((link, linkIndex) => (
                                    <li key={linkIndex}>
                                        <Link
                                            href={link.href}
                                            className="text-muted-foreground hover:text-foreground transition-colors"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {copyrightText && (
                    <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
                        <p>{copyrightText}</p>
                    </div>
                )}
            </div>
        </footer>
    ),
};