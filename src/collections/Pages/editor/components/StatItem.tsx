import React from "react";
import { ComponentConfig } from "@measured/puck";

interface StatItemProps {
    value: string;
    label: string;
    align?: "left" | "center" | "right";
}

export const StatItemComponent = ({
    value,
    label,
    align = "center"
}: StatItemProps) => {
    return (
        <div className={`text-${align}`}>
            <div className="text-2xl font-bold text-primary">{value}</div>
            <div className="text-sm text-muted-foreground">{label}</div>
        </div>
    );
};

export const StatItem: ComponentConfig<StatItemProps> = {
    label: "Statistic Item",
    render: StatItemComponent,
    fields: {
        value: {
            type: "text",
            label: "Value",
        },
        label: {
            type: "text",
            label: "Label",
        },
        align: {
            type: "select",
            label: "Alignment",
            options: [
                { label: "Left", value: "left" },
                { label: "Center", value: "center" },
                { label: "Right", value: "right" },
            ],
        },
    },
    defaultProps: {
        value: "100+",
        label: "Customers",
        align: "center",
    },
};