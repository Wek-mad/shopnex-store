import type { CollectionConfig } from "payload";

import { admins, anyone } from "@/access/roles";
import { HandleField } from "@/fields/handle";
import { RichTextEditor } from "@/fields/RichTextEditor/RichTextEditor";

export const Policies: CollectionConfig = {
    slug: "policies",
    access: {
        create: admins,
        delete: admins,
        read: anyone,
        update: admins,
    },
    admin: {
        defaultColumns: ["title", "handle", "createdAt", "updatedAt"],
        group: "Settings",
        useAsTitle: "title",
    },
    fields: [
        {
            name: "title",
            type: "text",
            required: true,
        },
        RichTextEditor({
            name: "description",
            label: "Description",
        }),
        HandleField(),
    ],
};
