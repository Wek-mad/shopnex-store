import { ImagePickerField } from "../components/ImagePickerField";

export const createImageField = (label: string, placeholder?: string) => ({
  type: "custom" as const,
  render: ({ onChange, value }: { onChange: (value: string | undefined) => void; value: string | undefined }) => (
    <ImagePickerField
      label={label}
      value={value || ""}
      onChange={(newValue: string) => onChange(newValue || undefined)}
      placeholder={placeholder || `Select ${label.toLowerCase()} from your media library`}
    />
  ),
});