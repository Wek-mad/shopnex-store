import {
    MetaTitleField,
    MetaDescriptionField,
    OverviewField,
    PreviewField,
} from "@payloadcms/plugin-seo/fields";
import { Field } from "payload";

export const SeoField = (): Field => ({
    label: "Search Engine Optimization",
    type: "collapsible",
    admin: {
        initCollapsed: true,
    },
    fields: [
        {
            type: "group",
            name: "meta",
            label: "",
            fields: [
                MetaTitleField({
                    hasGenerateFn: false,
                }),
                MetaDescriptionField({
                    hasGenerateFn: false,
                }),
                OverviewField({}),
                PreviewField({}),
            ],
        },
    ],
});
