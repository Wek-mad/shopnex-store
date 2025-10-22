import type { Metadata } from 'next'
import { seoConfig, type SEOPageKey } from '@/lib/seo-config'

interface BaseMetaProps {
  title?: string
  description?: string
  image?: string
  url?: string
  noIndex?: boolean
}

interface ProductMetaProps extends BaseMetaProps {
  price?: number
  currency?: string
  sku?: string
  brand?: string
  category?: string
}

interface PageMetaProps {
  pageKey: SEOPageKey
  title?: string
  description?: string
  image?: string
  url?: string
  templateData?: string[]
}

export function generateMetadata({
  title,
  description,
  image,
  url = seoConfig.siteUrl,
  noIndex = false,
}: BaseMetaProps): Metadata {
  const metaTitle = title || seoConfig.defaultTitle
  const metaDescription = description || seoConfig.defaultDescription
  const metaImage = image || `${seoConfig.siteUrl}${seoConfig.defaultImage}`

  return {
    title: metaTitle,
    description: metaDescription,
    openGraph: {
      ...seoConfig.openGraph,
      title: metaTitle,
      description: metaDescription,
      url,
      images: [
        {
          url: metaImage,
          width: 1200,
          height: 630,
          alt: metaTitle,
        },
      ],
    },
    twitter: {
      ...seoConfig.twitter,
      title: metaTitle,
      description: metaDescription,
      images: [metaImage],
    },
    robots: noIndex ? { index: false, follow: false } : seoConfig.robots,
  }
}

export function generatePageMetadata({
  pageKey,
  title,
  description,
  image,
  url,
  templateData = [],
}: PageMetaProps): Metadata {
  const pageConfig = seoConfig.pages[pageKey]

  let metaTitle = title || seoConfig.defaultTitle
  let metaDescription = description

  if (pageConfig) {
    // Handle title templates
    if (pageConfig.titleTemplate && title) {
      metaTitle = pageConfig.titleTemplate.replace('%s', title)
    } else if ('title' in pageConfig) {
      metaTitle = pageConfig.title
    }

    // Handle description templates
    if (pageConfig.descriptionTemplate && templateData.length > 0) {
      metaDescription = pageConfig.descriptionTemplate
      templateData.forEach((data, index) => {
        metaDescription = metaDescription?.replace('%s', data) || metaDescription
      })
    } else if (pageConfig.description && !description) {
      metaDescription = pageConfig.description
    }
  }

  return generateMetadata({
    title: metaTitle,
    description: metaDescription,
    image,
    url,
    noIndex: pageConfig?.noIndex,
  })
}

export function generateProductMetadata({
  title,
  description,
  image,
  url,
}: ProductMetaProps): Metadata {
  return generatePageMetadata({
    pageKey: 'productDetail',
    title,
    description,
    image,
    url,
    templateData: [title || '', description || seoConfig.defaultDescription],
  })
}

export function generateProductJsonLd({
  title,
  description,
  image,
  url,
  price,
  currency = 'USD',
  sku,
  brand = seoConfig.brand,
  category,
}: ProductMetaProps) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: title,
    description,
    image,
    url,
    brand: {
      '@type': 'Brand',
      name: brand,
    },
    ...(sku && { sku }),
    ...(category && { category }),
    ...(price && {
      offers: {
        '@type': 'Offer',
        price: price.toString(),
        priceCurrency: currency,
        availability: 'https://schema.org/InStock',
      },
    }),
  }
}

export function generatePageJsonLd({ title, description, url }: BaseMetaProps) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url,
  }
}
