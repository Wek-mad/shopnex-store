import { TextField } from "payload";

export const RichTextEditor = (fieldOverrides: any): TextField => ({
    type: "text",
    admin: {
        components: {
            Field: "@/fields/RichTextEditor/components/Tiptap",
        },
    },
    ...fieldOverrides,
});
