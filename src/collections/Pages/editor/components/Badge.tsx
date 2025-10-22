import React from "react";
import { ComponentConfig } from "@measured/puck";

interface BadgeProps {
    text: string;
    position?: "top-right" | "bottom-left" | "top-left" | "bottom-right";
    variant?: "primary" | "secondary" | "success" | "warning";
}

export const BadgeComponent = ({
    text,
    position = "top-right",
    variant = "primary"
}: BadgeProps) => {
    const positionClasses = {
        "top-right": "-top-4 -right-4",
        "bottom-left": "-bottom-4 -left-4",
        "top-left": "-top-4 -left-4",
        "bottom-right": "-bottom-4 -right-4"
    };

    const variantClasses = {
        primary: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        success: "bg-green-500 text-white",
        warning: "bg-yellow-500 text-yellow-900"
    };

    return (
        <div
            className={`absolute px-4 py-2 rounded-full text-sm font-medium shadow-lg ${variantClasses[variant]} ${positionClasses[position]}`}
        >
            {text}
        </div>
    );
};

export const Badge: ComponentConfig<BadgeProps> = {
    label: "Info Badge",
    render: BadgeComponent,
    fields: {
        text: {
            type: "text",
            label: "Badge Text",
        },
        position: {
            type: "select",
            label: "Position",
            options: [
                { label: "Top Right", value: "top-right" },
                { label: "Top Left", value: "top-left" },
                { label: "Bottom Right", value: "bottom-right" },
                { label: "Bottom Left", value: "bottom-left" },
            ],
        },
        variant: {
            type: "select",
            label: "Style",
            options: [
                { label: "Primary", value: "primary" },
                { label: "Secondary", value: "secondary" },
                { label: "Success", value: "success" },
                { label: "Warning", value: "warning" },
            ],
        },
    },
    defaultProps: {
        text: "New",
        position: "top-right",
        variant: "primary",
    },
};