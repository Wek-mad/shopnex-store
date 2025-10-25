import crypto from 'crypto'
import { PayloadRequest } from 'payload'

type VietQRCheckoutProps = {
  req: PayloadRequest
  customer: any
  payment: any
  shipping: any
  total: number
  subtotal: number
  shippingCost: number
  taxAmount?: number
  orderId: string
  items: any[]
  shippingAddress: any
  billingAddress: any
}

export async function vietqrCheckout({
  req,
  customer,
  payment,
  shipping,
  total,
  subtotal,
  shippingCost,
  taxAmount,
  orderId,
  items,
  shippingAddress,
  billingAddress,
}: VietQRCheckoutProps) {
  const sessionId = `VQRSID-${crypto.randomUUID()}`

  // Get VietQR configuration from payment provider
  const vietqrProvider = payment?.providers?.[0]
  const bankId = vietqrProvider?.bankId || ''
  const accountNumber = vietqrProvider?.accountNumber || ''
  const accountName = vietqrProvider?.accountName || ''
  const template = vietqrProvider?.template || 'compact'

  // Create order with VietQR payment info
  const orderData = {
    orderId,
    currency: 'vnd', // VietQR uses VND
    orderStatus: 'pending' as const,
    paymentMethod: 'vietqr',
    payment: payment?.id,
    shipping: shipping?.id,
    paymentStatus: 'pending' as const,
    sessionId,
    totalAmount: total,
    shippingAddress,
    billingAddress,
    metadata: {
      items: items.map((item) => ({
        productId: item.id,
        variantId: item.variantId,
        name: item.name,
        price: item.currentPrice || item.price,
        quantity: item.quantity,
        sku: item.sku,
      })),
      subtotal,
      shippingCost,
      taxAmount: taxAmount || 0,
      customer: {
        email: customer?.email,
        firstName: customer?.firstName,
        lastName: customer?.lastName,
        phone: customer?.phone,
      },
      vietqr: {
        bankId,
        accountNumber,
        accountName,
        template,
        amount: Math.round(total), // VietQR requires integer amount
        description: `Payment for order ${orderId}`,
      },
    },
  }

  await req.payload.create({
    collection: 'orders',
    data: orderData,
    req,
  })

  // Redirect to VietQR payment page
  return {
    redirectUrl: `/payment/vietqr/${sessionId}`,
  }
}

