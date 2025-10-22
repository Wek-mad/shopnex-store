import { ComponentConfig } from "@measured/puck";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ShoppingBag, ArrowRight, Eye, Download, Play } from "lucide-react";
import { StatItemComponent } from "../components/StatItem";
import { BadgeComponent } from "../components/Badge";
import { createImageField } from "../utils/image-field";

export interface LandingHeroSectionProps {
    title: string;
    subtitle: string;
    heroImage?: string;
    showImage?: boolean;
    buttons?: Array<{
        text: string;
        href: string;
        variant: "default" | "outline" | "ghost" | "link";
        size: "sm" | "default" | "lg";
        icon?: string;
    }>;
    showStats?: boolean;
    stats?: Array<{ value: string; label: string }>;
    showBadges?: boolean;
    badges?: Array<{
        text: string;
        position: "top-right" | "bottom-left" | "top-left" | "bottom-right";
        variant: "primary" | "secondary" | "success" | "warning";
    }>;
}

const getIcon = (iconName: string) => {
    switch (iconName) {
        case "ShoppingBag":
            return <ShoppingBag className="ml-2 h-5 w-5" />;
        case "ArrowRight":
            return <ArrowRight className="ml-2 h-5 w-5" />;
        case "Eye":
            return <Eye className="ml-2 h-5 w-5" />;
        case "Download":
            return <Download className="ml-2 h-5 w-5" />;
        case "Play":
            return <Play className="ml-2 h-5 w-5" />;
        default:
            return null;
    }
};

export const LandingHeroSection: ComponentConfig<LandingHeroSectionProps> = {
    label: "Landing Hero",
    fields: {
        title: { type: "text", contentEditable: true },
        subtitle: { type: "textarea", contentEditable: true },
        heroImage: createImageField("Hero Image", "Select a hero image for the landing section"),
        showImage: {
            type: "radio",
            options: [
                { label: "Yes", value: true },
                { label: "No", value: false },
            ],
        },
        buttons: {
            type: "array",
            getItemSummary: (item) => item.text || "Button",
            arrayFields: {
                text: { type: "text", contentEditable: true },
                href: { type: "text" },
                variant: {
                    type: "select",
                    options: [
                        { label: "Primary", value: "default" },
                        { label: "Secondary", value: "outline" },
                        { label: "Ghost", value: "ghost" },
                        { label: "Link", value: "link" },
                    ],
                },
                size: {
                    type: "select",
                    options: [
                        { label: "Small", value: "sm" },
                        { label: "Default", value: "default" },
                        { label: "Large", value: "lg" },
                    ],
                },
                icon: {
                    type: "select",
                    options: [
                        { label: "None", value: "" },
                        { label: "Shopping Bag", value: "ShoppingBag" },
                        { label: "Arrow Right", value: "ArrowRight" },
                        { label: "Eye", value: "Eye" },
                        { label: "Download", value: "Download" },
                        { label: "Play", value: "Play" },
                    ],
                },
            },
        },
        showStats: {
            type: "radio",
            options: [
                { label: "Yes", value: true },
                { label: "No", value: false },
            ],
        },
        stats: {
            type: "array",
            getItemSummary: (item) => `${item.value} - ${item.label}` || "Stat",
            arrayFields: {
                value: { type: "text" },
                label: { type: "text" },
            },
        },
        showBadges: {
            type: "radio",
            options: [
                { label: "Yes", value: true },
                { label: "No", value: false },
            ],
        },
        badges: {
            type: "array",
            getItemSummary: (item) => item.text || "Badge",
            arrayFields: {
                text: { type: "text" },
                position: {
                    type: "select",
                    options: [
                        { label: "Top Right", value: "top-right" },
                        { label: "Bottom Left", value: "bottom-left" },
                        { label: "Top Left", value: "top-left" },
                        { label: "Bottom Right", value: "bottom-right" },
                    ],
                },
                variant: {
                    type: "select",
                    options: [
                        { label: "Primary", value: "primary" },
                        { label: "Secondary", value: "secondary" },
                        { label: "Success", value: "success" },
                        { label: "Warning", value: "warning" },
                    ],
                },
            },
        },
    },
    defaultProps: {
        title: "Discover Your Next Favorite Product",
        subtitle:
            "Shop the latest trends and timeless classics in our curated collection. Quality products, exceptional service, delivered to your door.",
        heroImage: "/modern-e-commerce-hero-image-with-shopping-bags-an.jpg",
        showImage: true,
        buttons: [
            {
                text: "Shop Now",
                href: "/products",
                variant: "default",
                size: "lg",
                icon: "ShoppingBag",
            },
            {
                text: "Browse Categories",
                href: "/categories",
                variant: "outline",
                size: "lg",
                icon: "ArrowRight",
            },
        ],
        showStats: true,
        stats: [
            { value: "10K+", label: "Happy Customers" },
            { value: "500+", label: "Products" },
            { value: "24/7", label: "Support" },
        ],
        showBadges: true,
        badges: [
            {
                text: "Free Shipping",
                position: "top-right",
                variant: "secondary" as const,
            },
            {
                text: "30-Day Returns",
                position: "bottom-left",
                variant: "primary" as const,
            },
        ],
    },
    render: ({
        title,
        subtitle,
        heroImage,
        showImage = true,
        buttons,
        showStats = true,
        stats,
        showBadges = true,
        badges,
    }) => (
        <section className="relative bg-gradient-to-br from-background to-muted/50 py-20 sm:py-32">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div
                    className={`grid grid-cols-1 ${showImage && heroImage ? "lg:grid-cols-2" : ""} gap-12 items-center`}
                >
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-balance leading-tight">
                                {title}
                            </h1>
                            <p className="text-lg text-muted-foreground text-pretty max-w-lg">
                                {subtitle}
                            </p>
                        </div>

                        {buttons && buttons.length > 0 && (
                            <div className="flex flex-col sm:flex-row gap-4">
                                {buttons.map((button, index) => (
                                    <Link key={index} href={button.href || "#"}>
                                        <Button
                                            variant={
                                                button.variant || "default"
                                            }
                                            size={button.size || "lg"}
                                            className="w-full sm:w-auto"
                                        >
                                            {button.text}
                                            {button.icon &&
                                                getIcon(button.icon)}
                                        </Button>
                                    </Link>
                                ))}
                            </div>
                        )}

                        {showStats && stats && stats.length > 0 && (
                            <div className="grid grid-cols-3 gap-8 pt-8 border-t">
                                {stats.map((stat, index) => (
                                    <StatItemComponent
                                        key={index}
                                        value={stat.value}
                                        label={stat.label}
                                        align="left"
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    {showImage && heroImage && (
                        <div className="relative">
                            <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 p-8 flex items-center justify-center">
                                <img
                                    src={heroImage}
                                    alt="Hero"
                                    className="w-full h-full object-contain"
                                />
                            </div>
                            {showBadges &&
                                badges?.map((badge, index) => (
                                    <BadgeComponent
                                        key={index}
                                        text={badge.text}
                                        position={badge.position}
                                        variant={badge.variant}
                                    />
                                ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    ),
};
