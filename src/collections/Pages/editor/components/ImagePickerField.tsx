'use client'

import { Button, useListDrawer } from '@payloadcms/ui'
import { ImageIcon, X } from 'lucide-react'

interface ImagePickerFieldProps {
  label?: string
  value?: string
  onChange: (value: string) => void
  placeholder?: string
}

export function ImagePickerField({
  label = 'Image',
  value,
  onChange,
  placeholder = 'Select an image',
}: ImagePickerFieldProps) {
  const [ListDrawer, , { openDrawer: openMediaDrawer, closeDrawer: closeMediaDrawer }] =
    useListDrawer({
      collectionSlugs: ['media'],
      uploads: true,
    })

  const handleImageSelect = () => {
    openMediaDrawer()
  }

  const handleRemoveImage = () => {
    onChange('')
  }

  const getImagePreview = () => {
    if (value) {
      return (
        <div className="image-preview-container">
          <div className="relative inline-block">
            <img
              src={value}
              alt="Selected image"
              className="max-w-48 max-h-32 object-cover rounded border"
            />
            <button
              type="button"
              onClick={handleRemoveImage}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
            >
              <X size={12} />
            </button>
          </div>
          <div className="mt-2 text-sm text-gray-600">
            <p className="font-medium">Current image:</p>
            <p className="break-all">{value}</p>
          </div>
        </div>
      )
    }
    return null
  }

  return (
    <div className="image-picker-field">
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>

      <div className="space-y-3">
        {getImagePreview()}

        <div className="flex gap-2">
          <Button
            type="button"
            className="px-2 py-2 rounded-sm"
            buttonStyle="secondary"
            onClick={handleImageSelect}
            icon={<ImageIcon size={16} />}
          >
            {value ? 'Change Image' : 'Select Image'}
          </Button>

          {value && (
            <Button
              type="button"
              className="px-2 py-2 rounded-sm"
              buttonStyle="secondary"
              onClick={handleRemoveImage}
              icon={<X size={16} />}
            >
              Remove
            </Button>
          )}
        </div>

        {!value && <p className="text-sm text-gray-500">{placeholder}</p>}
      </div>

      <ListDrawer
        onSelect={(selection) => {
          if (selection?.doc) {
            const selectedMedia = selection.doc as any
            const imageUrl = selectedMedia.url || selectedMedia.filename

            if (imageUrl) {
              onChange(imageUrl)
              closeMediaDrawer()
            }
          }
        }}
      />
    </div>
  )
}

// Export for use in Puck external fields
export default ImagePickerField
