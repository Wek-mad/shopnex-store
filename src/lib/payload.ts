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
  fetch: async (url, init) => {
    // Ensure url is a string
    const urlString = typeof url === 'string' ? url : url.toString()

    // Filter out Symbol properties from init and headers
    const cleanInit: RequestInit = {}
    
    if (init) {
      // Copy only string/number keyed properties, excluding Symbol keys
      Object.keys(init).forEach((key) => {
        const value = (init as any)[key]
        if (key === 'headers' && value) {
          // Clean headers separately
          const cleanHeaders: Record<string, string> = {}
          if (value instanceof Headers) {
            value.forEach((val, key) => {
              cleanHeaders[key] = val
            })
          } else if (typeof value === 'object') {
            Object.keys(value).forEach((headerKey) => {
              cleanHeaders[headerKey] = value[headerKey]
            })
          }
          cleanInit.headers = cleanHeaders
        } else {
          (cleanInit as any)[key] = value
        }
      })
    }

    // Use appropriate fetch based on environment
    if (typeof window !== 'undefined') {
      return window.fetch(urlString, cleanInit)
    } else {
      return fetch(urlString, cleanInit)
    }
  },
})

export { sdk }
