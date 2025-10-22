import { ComponentConfig } from "@measured/puck";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";

export interface NewsletterSectionProps {
    title?: string;
    subtitle?: string;
    placeholder?: string;
    buttonText?: string;
    privacyText?: string;
}

export const NewsletterSection: ComponentConfig<NewsletterSectionProps> = {
    label: "Email Signup",
    fields: {
        title: { type: "text" },
        subtitle: { type: "textarea" },
        placeholder: { type: "text" },
        buttonText: { type: "text" },
        privacyText: { type: "text" },
    },
    defaultProps: {
        title: "Stay in the Loop",
        subtitle: "Subscribe to our newsletter for exclusive deals, new arrivals, and style tips.",
        placeholder: "Enter your email",
        buttonText: "Subscribe",
        privacyText: "We respect your privacy. Unsubscribe at any time.",
    },
    render: ({
        title = "Stay in the Loop",
        subtitle = "Subscribe to our newsletter for exclusive deals, new arrivals, and style tips.",
        placeholder = "Enter your email",
        buttonText = "Subscribe",
        privacyText
    }) => (
        <section className="py-16 bg-muted/50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl mx-auto text-center space-y-8">
                    <div className="space-y-4">
                        <Mail className="h-12 w-12 text-primary mx-auto" />
                        {title && (
                            <h3 className="text-2xl sm:text-3xl font-bold text-balance">
                                {title}
                            </h3>
                        )}
                        {subtitle && (
                            <p className="text-muted-foreground text-pretty">
                                {subtitle}
                            </p>
                        )}
                    </div>

                    <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                        <Input
                            type="email"
                            placeholder={placeholder || "Enter your email"}
                            className="flex-1"
                            required
                        />
                        <Button type="submit" className="sm:w-auto">
                            {buttonText || "Subscribe"}
                        </Button>
                    </form>

                    {privacyText && (
                        <p className="text-xs text-muted-foreground">
                            {privacyText}
                        </p>
                    )}
                </div>
            </div>
        </section>
    ),
};