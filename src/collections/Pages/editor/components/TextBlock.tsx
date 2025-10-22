import { ComponentConfig } from "@measured/puck";

export interface TextBlockProps {
    text: string;
    align?: "left" | "center" | "right";
}

export const TextBlock: ComponentConfig<TextBlockProps> = {
    label: "Text Paragraph",
    fields: {
        text: { type: "textarea" },
        align: {
            type: "radio",
            options: [
                { label: "Left", value: "left" },
                { label: "Center", value: "center" },
                { label: "Right", value: "right" },
            ],
        },
    },
    defaultProps: {
        text: "Add your text here...",
        align: "left",
    },
    render: ({ text, align }) => {
        const alignClass = align === "center"
            ? "text-center"
            : align === "right"
                ? "text-right"
                : "text-left";

        return (
            <p className={`${alignClass} text-muted-foreground`}>
                {text}
            </p>
        );
    },
};