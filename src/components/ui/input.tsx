import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
    return (
        <input
            type={type}
            data-slot="input"
            className={cn(
                "flex w-full rounded-lg border-2 border-border/60 bg-background px-4 py-2 text-sm transition-all duration-200",
                "placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground",
                "hover:border-primary/40 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2 focus:ring-offset-background",
                "disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-border/60",
                "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
                "dark:border-border dark:bg-input/50 dark:hover:border-primary/50 dark:focus:border-primary",
                "aria-invalid:border-destructive aria-invalid:focus:ring-destructive/20",
                className
            )}
            {...props}
        />
    );
}

export { Input };
