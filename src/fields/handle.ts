import type { Field } from "payload";

import { formatSlug } from "@/utils/format-slug";

export const HandleField = (fieldToUse = "title"): Field => ({
    name: "handle",
    type: "text",
    admin: {
        position: "sidebar",
        readOnly: true,
    },
    hooks: {
        beforeValidate: [formatSlug(fieldToUse)],
    },
    index: true,
});
