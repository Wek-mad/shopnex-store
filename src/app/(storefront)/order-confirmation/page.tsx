"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { OrderConfirmation } from "@/components/checkout/order-confirmation"

export default function OrderConfirmationPage() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get("orderId")
  const [orderData, setOrderData] = useState(null)

  useEffect(() => {
    const storedOrder = localStorage.getItem("lastOrder")
    if (storedOrder) {
      setOrderData(JSON.parse(storedOrder))
    }
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <OrderConfirmation orderId={orderId} orderData={orderData} />
      </main>
      <Footer />
    </div>
  )
}
