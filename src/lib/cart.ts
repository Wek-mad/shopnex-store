import { sdk } from './payload'
import type { Cart, Product } from '@/payload-types'

export interface CartItem {
  productId: string
  variantId?: string
  quantity: number
  name: string
  price: number
  image?: string
  variant?: string
}

export async function createCart(): Promise<string | null> {
  try {
    // Use the dedicated cart creation endpoint
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/carts/checkout-cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-shop-handle': await getShopHandle(),
      },
      body: JSON.stringify({
        items: [],
        customerInfo: null,
      }),
    })

    if (!response.ok) {
      throw new Error('Failed to create cart')
    }

    const data = await response.json()
    return data.cartId?.toString() || null
  } catch (error) {
    console.error('Failed to create cart:', error)
    return null
  }
}

// Helper function to get shop handle
async function getShopHandle(): Promise<string> {
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname
    const parts = hostname.split('.')
    if (parts.length >= 2 && !['www', 'app', 'api', 'localhost'].includes(parts[0])) {
      return parts[0]
    }
  }
  return process.env.NEXT_PUBLIC_SHOP_HANDLE || 'npkr9uofi3n'
}

export async function getCart(cartId: string): Promise<Cart | null> {
  try {
    const cart = await sdk.findByID({
      collection: 'carts',
      id: parseInt(cartId),
    })

    return cart
  } catch (error) {
    console.error('Failed to fetch cart:', error)
    return null
  }
}

export async function addToCart(
  cartId: string,
  productId: string,
  variantId: string,
  quantity: number = 1,
): Promise<boolean> {
  try {
    // First get the current cart
    const cart = await getCart(cartId)
    if (!cart) return false

    // Get product details
    const product = await sdk.findByID({
      collection: 'products',
      id: parseInt(productId),
    })

    if (!product) return false

    // Find the variant
    const variant = product.variants.find((v) => v.id === variantId)
    if (!variant) return false

    // Check if item already exists in cart
    const existingItems = cart.cartItems || []
    const existingItemIndex = existingItems.findIndex(
      (item) => item.product === parseInt(productId) && item.variantId === variantId,
    )

    let updatedItems
    if (existingItemIndex >= 0) {
      // Update quantity of existing item
      updatedItems = [...existingItems]
      updatedItems[existingItemIndex].quantity += quantity
    } else {
      // Add new item
      const newItem = {
        variantId,
        product: parseInt(productId),
        quantity,
        price: variant.price,
        name: product.title,
      }
      updatedItems = [...existingItems, newItem]
    }

    // Update cart
    await sdk.update({
      collection: 'carts',
      id: parseInt(cartId),
      data: {
        cartItems: updatedItems,
      },
    })

    return true
  } catch (error) {
    console.error('Failed to add to cart:', error)
    return false
  }
}

export async function updateCartItem(
  cartId: string,
  productId: string,
  variantId: string,
  quantity: number,
): Promise<boolean> {
  try {
    const cart = await getCart(cartId)
    if (!cart) return false

    const cartItems = cart.cartItems || []
    const updatedItems = cartItems.map((item) => {
      if (item.product === parseInt(productId) && item.variantId === variantId) {
        return { ...item, quantity }
      }
      return item
    })

    await sdk.update({
      collection: 'carts',
      id: parseInt(cartId),
      data: {
        cartItems: updatedItems,
      },
    })

    return true
  } catch (error) {
    console.error('Failed to update cart item:', error)
    return false
  }
}

export async function removeFromCart(
  cartId: string,
  productId: string,
  variantId: string,
): Promise<boolean> {
  try {
    const cart = await getCart(cartId)
    if (!cart) return false

    const cartItems = cart.cartItems || []
    const updatedItems = cartItems.filter(
      (item) => !(item.product === parseInt(productId) && item.variantId === variantId),
    )

    await sdk.update({
      collection: 'carts',
      id: parseInt(cartId),
      data: {
        cartItems: updatedItems,
      },
    })

    return true
  } catch (error) {
    console.error('Failed to remove from cart:', error)
    return false
  }
}

export async function clearCart(cartId: string): Promise<boolean> {
  try {
    await sdk.update({
      collection: 'carts',
      id: parseInt(cartId),
      data: {
        cartItems: [],
      },
    })

    return true
  } catch (error) {
    console.error('Failed to clear cart:', error)
    return false
  }
}

export function getCartItemsFromCart(cart: Cart): CartItem[] {
  if (!cart.cartItems) return []

  return cart.cartItems.map((item) => {
    const product = typeof item.product === 'object' ? item.product : null
    const variant = product?.variants.find((v) => v.id === item.variantId)

    return {
      productId:
        typeof item.product === 'number'
          ? item.product.toString()
          : item.product?.id?.toString() || '',
      variantId: item.variantId,
      quantity: item.quantity,
      name: item.name || product?.title || 'Unknown Product',
      price: item.price || variant?.price || 0,
      image: typeof variant?.gallery?.[0] === 'object' ? variant.gallery[0]?.url || '' : '',
      variant: variant?.options?.map((opt) => `${opt.option}: ${opt.value}`).join(', ') || '',
    }
  })
}

export function calculateCartSubtotal(items: CartItem[]): number {
  return items.reduce((total, item) => total + item.price * item.quantity, 0)
}
