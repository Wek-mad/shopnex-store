import type { Order } from '@/payload-types'
import type { Access, Where } from 'payload'

import { checkRole } from '@/access/roles'

export const readOrderAccess: Access<Order> = ({ req }) => {
  if (checkRole(['admin'], req.user)) {
    return true
  }
  const session = (req.query?.where as Where)?.sessionId || null

  if (!session) {
    return false
  }

  return {
    sessionId: session,
  }
}
