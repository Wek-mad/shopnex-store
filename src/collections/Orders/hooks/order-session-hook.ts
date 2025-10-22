import type { AfterChangeHook } from '@/admin/types'
import type { Order } from '@/payload-types'

import { generateCookie, getCookieExpiration, mergeHeaders } from 'payload'

export const orderSessionHook: AfterChangeHook<Order> = ({ doc, operation, req }) => {
  if (operation !== 'create') {
    return
  }

  const cartCookie = generateCookie({
    name: 'order-session',
    expires: getCookieExpiration({ seconds: 60 * 60 * 24 * 30 }),
    path: '/',
    returnCookieAsObject: false,
    value: String(doc.id),
  })

  const newHeaders = new Headers({
    'Set-Cookie': cartCookie as string,
  })

  req.responseHeaders = req.responseHeaders
    ? mergeHeaders(req.responseHeaders, newHeaders)
    : newHeaders
}
