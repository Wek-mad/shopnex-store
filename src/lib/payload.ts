import { PayloadSDK } from '@shopnex/payload-sdk'
import { Config } from '@/payload-types'

// Create SDK with dynamic shop handle resolution
const sdk = new PayloadSDK<Config>({
  baseURL: (process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000') + '/api',
  baseInit: {
    headers: {
      'Content-Type': 'application/json',
    },
  },
  // Custom fetch that adds shop handle dynamically
  fetch: async (...args) => {
    const [url, init] = args

    // Merge headers with dynamic shop handle
    const modifiedInit = {
      ...init,
      headers: {
        ...(init?.headers || {}),
      },
    }

    // Use appropriate fetch based on environment
    if (typeof window !== 'undefined') {
      return window.fetch(url, modifiedInit)
    } else {
      return fetch(url, modifiedInit)
    }
  },
})

export { sdk }
