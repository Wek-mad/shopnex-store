import { sdk } from './payload'

export interface PaymentMethod {
  id: string
  name: string
  enabled: boolean
  providers: any[]
}

export interface ShippingMethod {
  id: string
  name: string
  enabled: boolean
  baseRate: number
  freeShippingMinOrder?: number
  estimatedDeliveryDays?: string
  notes?: string
}

export interface CheckoutData {
  customer?: {
    email: string
    firstName: string
    lastName: string
    phone?: string
  }
  shippingAddress: {
    firstName: string
    lastName: string
    address: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  billingAddress?: {
    firstName: string
    lastName: string
    address: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  paymentMethodId: string
  shippingMethodId: string
}

export async function getPaymentMethods(): Promise<PaymentMethod[]> {
  try {
    const response = await sdk.find({
      collection: 'payments',
      where: {
        enabled: { equals: true },
      },
      limit: 100,
    })

    return response.docs.map((payment) => ({
      id: payment.id.toString(),
      name: payment.name,
      enabled: payment.enabled ?? false,
      providers: payment.providers || [],
    }))
  } catch (error) {
    console.error('Failed to fetch payment methods:', error)
    return []
  }
}

export async function getShippingMethods(): Promise<ShippingMethod[]> {
  try {
    const response = await sdk.find({
      collection: 'shipping',
      where: {
        enabled: { equals: true },
      },
      limit: 100,
    })

    return response.docs.map((shipping) => {
      const provider = shipping.shippingProvider?.[0] as any
      return {
        id: shipping.id.toString(),
        name: shipping.name,
        enabled: shipping.enabled ?? false,
        baseRate: provider?.baseRate || 0,
        freeShippingMinOrder: provider?.freeShippingMinOrder ?? undefined,
        estimatedDeliveryDays: provider?.estimatedDeliveryDays ?? undefined,
        notes: provider?.notes ?? undefined,
      }
    })
  } catch (error) {
    console.error('Failed to fetch shipping methods:', error)
    return []
  }
}

export async function createOrder(orderData: {
  items: Array<{
    id: string
    name: string
    price: number
    quantity: number
    image?: string
  }>
  customerInfo: {
    email: string
    firstName: string
    lastName: string
    address: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  paymentMethodId: string
  shippingMethodId: string
  subtotal: number
  shipping: number
  tax: number
  total: number
}): Promise<{ orderId?: string; error?: string }> {
  try {
    const requestBody = {
      items: orderData.items,
      customerInfo: orderData.customerInfo,
      paymentMethodId: orderData.paymentMethodId,
      shippingMethodId: orderData.shippingMethodId,
      subtotal: orderData.subtotal,
      shipping: orderData.shipping,
      tax: orderData.tax,
      total: orderData.total,
    }

    const url = `/api/orders/checkout`
    console.log('Making checkout request to:', url)
    console.log('Request body:', requestBody)

    // Use the checkout endpoint instead of direct order creation
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-shop-handle': await getShopHandle(),
      },
      body: JSON.stringify(requestBody),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || 'Checkout failed')
    }

    const result = await response.json()
    return { orderId: result.orderId }
  } catch (error) {
    console.error('Failed to create order:', error)
    return {
      error: error instanceof Error ? error.message : 'Order creation failed',
    }
  }
}

// Helper function to get shop handle (needed for the API call)
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

export function calculateShipping(subtotal: number, shippingMethod: ShippingMethod | null): number {
  if (!shippingMethod) return 0

  // Free shipping threshold
  if (shippingMethod.freeShippingMinOrder && subtotal >= shippingMethod.freeShippingMinOrder) {
    return 0
  }

  return shippingMethod.baseRate
}

export function calculateTax(subtotal: number, taxRate: number = 0.08): number {
  return subtotal * taxRate
}

export function calculateTotal(subtotal: number, shipping: number, tax: number): number {
  return subtotal + shipping + tax
}
