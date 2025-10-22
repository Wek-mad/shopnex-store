import { ComponentConfig } from "@measured/puck";

export interface SpacerProps {
    height: number;
}

export const Spacer: ComponentConfig<SpacerProps> = {
    label: "Spacing",
    fields: {
        height: { type: "number" },
    },
    defaultProps: {
        height: 40,
    },
    render: ({ height }) => <div style={{ height: `${height}px` }} />,
};