import React from "react";
import { ComponentConfig } from "@measured/puck";

interface LogoProps {
    logoText: string;
    logoIcon?: string;
}

const LogoComponent = ({ logoText, logoIcon }: LogoProps) => {
    return (
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
    );
};

export const Logo: ComponentConfig<LogoProps> = {
    label: "Brand Logo",
    render: LogoComponent,
    fields: {
        logoText: {
            type: "text",
            label: "Logo Text",
        },
        logoIcon: {
            type: "text",
            label: "Logo Icon URL (optional)",
        },
    },
    defaultProps: {
        logoText: "Brand",
        logoIcon: "",
    },
};