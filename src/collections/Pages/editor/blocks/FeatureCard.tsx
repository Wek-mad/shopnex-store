import { ComponentConfig } from "@measured/puck";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createImageField } from "../utils/image-field";

export interface FeatureCardProps {
    title: string;
    description: string;
    icon?: string;
}

export const FeatureCard: ComponentConfig<FeatureCardProps> = {
    label: "Feature Card",
    fields: {
        title: { type: "text" },
        description: { type: "textarea" },
        icon: createImageField("Icon", "Select an icon or image for this feature"),
    },
    defaultProps: {
        title: "Feature Title",
        description: "Feature description goes here...",
    },
    render: ({ title, description, icon }) => (
        <Card>
            <CardHeader>
                {icon && (
                    <div className="w-12 h-12 mb-4">
                        <img
                            src={icon}
                            alt={title}
                            className="w-full h-full object-contain"
                        />
                    </div>
                )}
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">{description}</p>
            </CardContent>
        </Card>
    ),
};