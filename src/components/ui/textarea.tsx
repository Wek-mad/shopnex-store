import * as React from "react";

import { cn } from "@/lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, ...props }, ref) => {
        return (
            <textarea
                className={cn(
                    "flex min-h-[80px] w-full rounded-lg border-2 border-border/60 bg-background px-4 py-3 text-sm transition-all duration-200",
                    "placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground resize-none",
                    "hover:border-primary/40 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2 focus:ring-offset-background",
                    "disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-border/60",
                    "dark:border-border dark:bg-input/50 dark:hover:border-primary/50 dark:focus:border-primary",
                    "aria-invalid:border-destructive aria-invalid:focus:ring-destructive/20",
                    className
                )}
                ref={ref}
                {...props}
            />
        );
    }
);
Textarea.displayName = "Textarea";

export { Textarea };