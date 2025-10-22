import { ComponentConfig } from "@measured/puck";
import { Button } from "@/components/ui/button";

export interface ButtonBlockProps {
    text: string;
    href?: string;
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
    size?: "default" | "sm" | "lg" | "icon";
}

export const ButtonBlock: ComponentConfig<ButtonBlockProps> = {
    label: "Action Button",
    fields: {
        text: { type: "text" },
        href: { type: "text" },
        variant: {
            type: "select",
            options: [
                { label: "Default", value: "default" },
                { label: "Destructive", value: "destructive" },
                { label: "Outline", value: "outline" },
                { label: "Secondary", value: "secondary" },
                { label: "Ghost", value: "ghost" },
                { label: "Link", value: "link" },
            ],
        },
        size: {
            type: "select",
            options: [
                { label: "Default", value: "default" },
                { label: "Small", value: "sm" },
                { label: "Large", value: "lg" },
                { label: "Icon", value: "icon" },
            ],
        },
    },
    defaultProps: {
        text: "Click me",
        variant: "default",
        size: "default",
    },
    render: ({ text, href, variant = "default", size = "default" }) => {
        const ButtonComponent = () => (
            <Button variant={variant} size={size}>
                {text}
            </Button>
        );

        if (href) {
            return (
                <a href={href}>
                    <ButtonComponent />
                </a>
            );
        }

        return <ButtonComponent />;
    },
};