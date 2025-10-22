import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { Render } from '@measured/puck' // or your custom editor
import { getPageByHandle } from '@/lib/puck-pages'
import { config } from '@/collections/Pages/editor/puck-config'
import { generateMetadata as generateSEOMetadata, generatePageJsonLd } from '@/lib/seo'
import { seoConfig } from '@/lib/seo-config'

interface DynamicPageProps {
  params: Promise<{ pages: string }>
}

export async function generateMetadata({ params }: DynamicPageProps): Promise<Metadata> {
  const slug = (await params).pages
  const page = await getPageByHandle({ handle: slug })

  if (!page) {
    return {
      title: 'Page Not Found | ShopNex',
      description: 'The requested page could not be found.',
    }
  }

  return generateSEOMetadata({
    title: page.title,
    description: page.description || undefined,
    url: `${seoConfig.siteUrl}/${slug}`,
  })
}

export default async function DynamicPage({ params }: DynamicPageProps) {
  const slug = (await params).pages
  const page = await getPageByHandle({ handle: slug })

  if (!page) return notFound()

  const structuredData = generatePageJsonLd({
    title: page.title,
    description: page.description || undefined,
    url: `${seoConfig.siteUrl}/${slug}`,
  })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Render config={config} data={page.page as any} />
    </>
  )
}
