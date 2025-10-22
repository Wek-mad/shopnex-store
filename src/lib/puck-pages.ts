import { sdk } from './payload'
import { CACHE_TIMES } from './cache-config'
import { Page } from '@/payload-types'

export async function getPageByHandle({ handle }: { handle: string }): Promise<Page | null> {
  try {
    const response = await sdk.find(
      {
        collection: 'pages',
        where: {
          handle: { equals: handle },
        },
        limit: 1,
      },
      {
        next: {
          revalidate: CACHE_TIMES.pages,
        },
      },
    )

    return response.docs[0] || null
  } catch (error) {
    console.error('Failed to fetch puck pages:', error)
    return null
  }
}
