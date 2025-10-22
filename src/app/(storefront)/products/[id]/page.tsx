import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { ProductDetail } from '@/components/product/product-detail'
import { getProduct } from '@/lib/products'
import { generateProductMetadata, generateProductJsonLd } from '@/lib/seo'
import { seoConfig } from '@/lib/seo-config'

interface ProductPageProps {
  params: Promise<{
    id: string
  }>
}

// Enable ISR for dynamic multi-tenant pages
export const revalidate = 3600

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = await getProduct((await params).id)

  if (!product) {
    return {
      title: 'Product Not Found | ShopNex',
      description: 'The requested product could not be found.',
    }
  }

  return generateProductMetadata({
    title: product.name,
    description: product.description,
    image: product.image,
    url: `${seoConfig.siteUrl}/products/${product.id}`,
    price: product.price,
    category: product.category,
  })
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProduct((await params).id)

  if (!product) {
    notFound()
  }

  const structuredData = generateProductJsonLd({
    title: product.name,
    description: product.description,
    image: product.image,
    url: `${seoConfig.siteUrl}/products/${product.id}`,
    price: product.price,
    category: product.category,
  })

  return (
    <div className="min-h-screen flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Header />
      <main className="flex-1">
        <ProductDetail product={product} />
      </main>
      <Footer />
    </div>
  )
}
