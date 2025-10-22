import { ComponentConfig } from "@measured/puck";
import { Button } from "@/components/ui/button";
import { StatItemComponent } from "../components/StatItem";
import { BadgeComponent } from "../components/Badge";
import { ImagePickerField } from "../components/ImagePickerField";

export interface HeroSectionProps {
    title: string;
    subtitle: string;
    backgroundImage?: string;
    ctaText?: string;
    ctaLink?: string;
    secondaryCtaText?: string;
    secondaryCtaLink?: string;
    heroImage?: string;
    stats?: Array<{ value: string; label: string }>;
    badges?: Array<{
        text: string;
        position: "top-right" | "bottom-left" | "top-left" | "bottom-right";
    }>;
}

export const HeroSection: ComponentConfig<HeroSectionProps> = {
    label: "Hero Banner",
    fields: {
        title: { type: "text" },
        subtitle: { type: "textarea" },
        backgroundImage: {
          type: "custom",
          label: "Background Image",
          render: ({ onChange, value }) => (
            <ImagePickerField
              label="Background Image"
              value={value || ""}
              onChange={onChange}
              placeholder="Select a background image from your media library"
            />
          ),
        },
        ctaText: { type: "text" },
        ctaLink: { type: "text" },
        secondaryCtaText: { type: "text" },
        secondaryCtaLink: { type: "text" },
        heroImage: {
          type: "custom",
          label: "Hero Image",
          render: ({ onChange, value }) => (
            <ImagePickerField
              label="Hero Image"
              value={value || ""}
              onChange={onChange}
              placeholder="Select a hero image from your media library"
            />
          ),
        },
        stats: {
            type: "array",
            getItemSummary: (item) => `${item.value} - ${item.label}` || "Stat",
            arrayFields: {
                value: { type: "text" },
                label: { type: "text" },
            },
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
            },
        },
    },
    defaultProps: {
        title: "Welcome to Our Store",
        subtitle: "Discover amazing products at great prices",
        ctaText: "Shop Now",
        ctaLink: "/products",
    },
    render: ({
        title,
        subtitle,
        backgroundImage,
        ctaText,
        ctaLink,
        secondaryCtaText,
        secondaryCtaLink,
        heroImage,
        stats,
        badges,
    }) => (
        <div
            className="relative min-h-[500px] flex items-center justify-center text-center bg-gradient-to-r from-primary/10 to-secondary/10"
            style={
                backgroundImage
                    ? {
                          backgroundImage: `url(${backgroundImage})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                      }
                    : {}
            }
        >
            <div className="relative z-10 max-w-4xl px-4">
                <h1 className="text-4xl sm:text-6xl font-bold mb-6 text-balance">
                    {title}
                </h1>
                <p className="text-xl sm:text-2xl mb-8 text-muted-foreground text-pretty">
                    {subtitle}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                    {ctaText && (
                        <Button size="lg" asChild>
                            <a href={ctaLink || "#"}>{ctaText}</a>
                        </Button>
                    )}
                    {secondaryCtaText && (
                        <Button variant="outline" size="lg" asChild>
                            <a href={secondaryCtaLink || "#"}>
                                {secondaryCtaText}
                            </a>
                        </Button>
                    )}
                </div>
                {heroImage && (
                    <div className="relative mt-8">
                        <img
                            src={heroImage}
                            alt="Hero"
                            className="rounded-lg shadow-lg mx-auto max-w-md"
                        />
                        {badges?.map((badge, index) => (
                            <BadgeComponent
                                key={index}
                                text={badge.text}
                                position={badge.position}
                                variant="primary"
                            />
                        ))}
                    </div>
                )}
                {stats && stats.length > 0 && (
                    <div className="grid grid-cols-3 gap-8 pt-8 mt-8 border-t max-w-lg mx-auto">
                        {stats.map((stat, index) => (
                            <StatItemComponent
                                key={index}
                                value={stat.value}
                                label={stat.label}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    ),
};