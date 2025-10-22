import type { Metadata } from 'next'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { CheckoutForm } from '@/components/checkout/checkout-form'

import { seoConfig } from '@/lib/seo-config'

export const metadata: Metadata = {
  title: seoConfig.pages.checkout.title,
  description: seoConfig.pages.checkout.description,
  robots: {
    index: false,
    follow: false,
  },
}

export default function CheckoutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="space-y-6">
            <CheckoutForm />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
