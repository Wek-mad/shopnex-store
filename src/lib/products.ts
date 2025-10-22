import { sdk } from './payload'
import { CACHE_TIMES } from './cache-config'
import type { Product as PayloadProduct, Collection as PayloadCollection } from '@/payload-types'

export interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  images: string[]
  category: string
  inStock: boolean
  featured?: boolean
}

// Transform Payload product to shop product format
function transformProduct(payloadProduct: PayloadProduct): Product {
  const firstVariant = payloadProduct.variants[0]
  const images =
    firstVariant?.gallery
      ?.map((media) => {
        if (typeof media === 'object' && media.url) {
          return media.url
        }
        return ''
      })
      .filter(Boolean) || []

  return {
    id: payloadProduct.id.toString(),
    name: payloadProduct.title,
    description: payloadProduct.description || '',
    price: firstVariant?.price || 0,
    image: images[0] || '',
    images: images,
    category: payloadProduct.collections?.[0]
      ? typeof payloadProduct.collections[0] === 'object'
        ? payloadProduct.collections[0].title
        : 'Uncategorized'
      : 'Uncategorized',
    inStock: (firstVariant?.stockCount || 0) > 0,
    featured: payloadProduct.visible || false,
  }
}

export async function getProducts(): Promise<Product[]> {
  try {
    const response = await sdk.find(
      {
        collection: 'products',
        where: {
          visible: { equals: true },
        },
        populate: {
          collections: {
            title: true,
          },
        },
        limit: 100,
      },
      {
        next: {
          revalidate: CACHE_TIMES.products,
        },
      },
    )

    return response.docs.map(transformProduct)
  } catch (error) {
    console.error('Failed to fetch products:', error)
    return []
  }
}

export async function getProduct(id: string): Promise<Product | undefined> {
  try {
    const product = await sdk.findByID(
      {
        collection: 'products',
        id: parseInt(id),
        populate: {
          collections: {
            title: true,
          },
        },
      },
      {
        next: {
          revalidate: CACHE_TIMES.products,
        },
      },
    )

    return transformProduct(product)
  } catch (error) {
    console.error('Failed to fetch product:', error)
    return undefined
  }
}

export async function getFeaturedProducts(): Promise<Product[]> {
  try {
    const response = await sdk.find(
      {
        collection: 'products',
        where: {
          visible: { equals: true },
        },
        populate: {
          collections: {
            title: true,
          },
        },
        limit: 8,
      },
      {
        next: {
          revalidate: CACHE_TIMES.products,
        },
      },
    )

    return response.docs.map(transformProduct)
  } catch (error) {
    console.error('Failed to fetch featured products:', error)
    return []
  }
}

export async function getMappedCategories(): Promise<{ title: string; productCount: number }[]> {
  try {
    const response = await sdk.find(
      {
        collection: 'collections',
        limit: 100,
        depth: 5,
      },
      {
        next: {
          revalidate: CACHE_TIMES.collections,
        },
      },
    )

    return response.docs.map((collection) => ({
      title: collection.title,
      productCount: collection.products?.docs?.length || 0,
    }))
  } catch (error) {
    console.error('Failed to fetch categories:', error)
    return []
  }
}
export async function getCategories(): Promise<string[]> {
  try {
    const response = await sdk.find(
      {
        collection: 'collections',
        limit: 100,
        depth: 5,
      },
      {
        next: {
          revalidate: CACHE_TIMES.collections,
        },
      },
    )

    return response.docs.map((collection) => collection.title)
  } catch (error) {
    console.error('Failed to fetch categories:', error)
    return []
  }
}

export async function getCollections(): Promise<PayloadCollection[]> {
  try {
    const response = await sdk.find(
      {
        collection: 'collections',
        limit: 100,
      },
      {
        next: {
          revalidate: CACHE_TIMES.collections,
        },
      },
    )

    return response.docs
  } catch (error) {
    console.error('Failed to fetch collections:', error)
    return []
  }
}
