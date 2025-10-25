import type { Block, CollectionConfig } from "payload";

import { admins, anyone } from "@/access/roles";

import { groups } from "./groups";

export const ManualProvider: Block = {
    slug: "manual",
    admin: {
        disableBlockName: true,
    },
    fields: [
        {
            name: "methodType",
            type: "select",
            label: "Manual Payment Type",
            options: [
                { label: "Cash on Delivery", value: "cod" },
                { label: "Bank Transfer", value: "bankTransfer" },
                { label: "In-Store Payment", value: "inStore" },
                { label: "Other", value: "other" },
            ],
            required: true,
        },
        {
            name: "instructions",
            type: "textarea",
            admin: {
                description: "Shown to customers at checkout.",
            },
            label: "Payment Instructions",
            required: true,
        },
        {
            name: "details",
            type: "array",
            admin: {
                condition: (data) => {
                    const manualProvider = data?.providers.find(
                        (provider: any) =>
                            provider.blockType === "manualProvider"
                    );
                    return manualProvider?.methodType === "bankTransfer";
                },
            },
            fields: [
                {
                    type: "row",
                    fields: [
                        {
                            name: "label",
                            type: "text",
                            required: true,
                        },
                        {
                            name: "value",
                            type: "text",
                            required: true,
                        },
                    ],
                },
            ],
            label: "Details",
        },
    ],
    imageURL: "/manual-payment.png",
    labels: {
        plural: "Manual Providers",
        singular: "Manual Provider",
    },
};

export const VietQRProvider: Block = {
    slug: "vietqr",
    admin: {
        disableBlockName: true,
    },
    fields: [
        {
            name: "bankId",
            type: "text",
            label: "Bank ID",
            admin: {
                description: "Bank identification code (e.g., VCB, TCB, MB, ACB, etc.)",
            },
            required: true,
        },
        {
            name: "accountNumber",
            type: "text",
            label: "Account Number",
            admin: {
                description: "Your bank account number",
            },
            required: true,
        },
        {
            name: "accountName",
            type: "text",
            label: "Account Name",
            admin: {
                description: "Account holder name",
            },
            required: true,
        },
        {
            name: "template",
            type: "select",
            label: "QR Template",
            options: [
                { label: "Compact", value: "compact" },
                { label: "Compact 2", value: "compact2" },
                { label: "Standard", value: "qr_only" },
                { label: "Print", value: "print" },
            ],
            defaultValue: "compact",
        },
        {
            name: "instructions",
            type: "textarea",
            label: "Payment Instructions",
            admin: {
                description: "Additional instructions shown to customers",
            },
            defaultValue: "Please scan the QR code with your banking app to complete the payment.",
        },
    ],
    imageURL: "/vietqr-payment.png",
    labels: {
        plural: "VietQR Providers",
        singular: "VietQR Provider",
    },
};

export const Payments: CollectionConfig = {
    slug: "payments",
    access: {
        create: admins,
        delete: admins,
        read: anyone,
        update: admins,
    },
    admin: {
        group: groups.settings,
        useAsTitle: "name",
    },
    fields: [
    {
        name: "name",
        type: "text",
        required: true,
    },
        {
            name: "enabled",
            type: "checkbox",
            admin: {
                position: "sidebar",
            },
            defaultValue: true,
        },
        {
            name: "providers",
            label: "Provider",
            type: "blocks",
            blocks: [ManualProvider, VietQRProvider],
            maxRows: 1,
        },
    ],
};
