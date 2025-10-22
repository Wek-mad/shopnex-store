import { ComponentConfig } from "@measured/puck";

export interface HeadingBlockProps {
    title: string;
    level: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
    align?: "left" | "center" | "right";
}

export const HeadingBlock: ComponentConfig<HeadingBlockProps> = {
    label: "Heading Text",
    fields: {
        title: { type: "text" },
        level: {
            type: "select",
            options: [
                { label: "H1", value: "h1" },
                { label: "H2", value: "h2" },
                { label: "H3", value: "h3" },
                { label: "H4", value: "h4" },
                { label: "H5", value: "h5" },
                { label: "H6", value: "h6" },
            ],
        },
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
        title: "Heading",
        level: "h2",
        align: "left",
    },
    render: ({ title, level, align }) => {
        const Heading = level;
        const alignClass = align === "center"
            ? "text-center"
            : align === "right"
                ? "text-right"
                : "text-left";

        const sizeClass = {
            h1: "text-4xl",
            h2: "text-3xl",
            h3: "text-2xl",
            h4: "text-xl",
            h5: "text-lg",
            h6: "text-base"
        }[level];

        return (
            <Heading className={`font-bold ${alignClass} ${sizeClass}`}>
                {title}
            </Heading>
        );
    },
};