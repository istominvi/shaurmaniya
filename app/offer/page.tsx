"use client"

import Link from "next/link"
import { useState } from "react"
import { ArrowLeft, Building2, CheckCircle2, MapPin, Phone, Send } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CharcoalSparks } from "@/components/charcoal-sparks"
import { CartDrawer } from "@/components/cart-drawer"
import { CheckoutDialog } from "@/components/checkout-dialog"
import { LocationDialog } from "@/components/location-dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const locationRequirements = [
  "Первая линия или оживлённый пешеходный поток",
  "Площадь от 30 до 80 м² с возможностью организации кухни",
  "Мощность электросети от 20 кВт",
  "Наличие водоснабжения, канализации и вытяжки",
  "Долгосрочный договор аренды на прозрачных условиях",
  "Хорошая транспортная доступность и парковка рядом",
]

export default function OfferPage() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isLocationOpen, setIsLocationOpen] = useState(false)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const [isSent, setIsSent] = useState(false)

  const handleCheckout = () => {
    setIsCartOpen(false)
    setIsCheckoutOpen(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fff8f5] to-white">
      <CharcoalSparks />
      <Header onCartClick={() => setIsCartOpen(true)} onLocationClick={() => setIsLocationOpen(true)} />

      <main className="relative z-10 w-full px-4 py-8 md:px-8 md:py-10">
        <section className="mx-auto max-w-6xl space-y-6">
          <Button asChild variant="outline" className="rounded-full border-[#E73F22]/30 bg-white/85 text-[#E73F22] hover:bg-[#fff1ed]">
            <Link href="/">
              <ArrowLeft className="mr-1 h-4 w-4" />
              Назад
            </Link>
          </Button>

          <div className="overflow-hidden rounded-3xl border border-[#E73F22]/20 bg-white shadow-[0_20px_50px_rgba(231,63,34,0.10)]">
            <div className="border-b border-[#E73F22]/10 bg-gradient-to-r from-[#E73F22] to-[#ff7045] px-5 py-6 text-white md:px-8 md:py-8">
              <p className="mb-2 text-sm font-medium uppercase tracking-wide text-white/90">Для собственников недвижимости</p>
              <h1 className="text-2xl font-bold md:text-4xl">Предложить помещение</h1>
              <p className="mt-3 max-w-3xl text-sm text-white/90 md:text-base">
                Если у вас есть помещение в Чите и вы хотите открыть в нём Шаурманию — отправьте заявку.
                Мы быстро свяжемся, уточним детали и дадим обратную связь по локации.
              </p>
            </div>

            <div className="grid gap-6 p-4 md:grid-cols-2 md:gap-8 md:p-8">
              <article className="space-y-6 rounded-2xl border border-zinc-100 bg-[#fffaf8] p-5">
                <h2 className="text-xl font-semibold text-zinc-900">Что для нас важно в помещении</h2>

                <ul className="space-y-3">
                  {locationRequirements.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-zinc-700 md:text-base">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#E73F22]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="rounded-xl border border-[#E73F22]/15 bg-white p-4">
                  <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-[#b34732]">Контакты для связи</h3>
                  <div className="space-y-2 text-sm text-zinc-700">
                    <p className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-[#E73F22]" />
                      +7 (3022) 00-00-00
                    </p>
                    <p className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-[#E73F22]" />
                      г. Чита, рассматриваем все районы
                    </p>
                    <p className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-[#E73F22]" />
                      Команда развития сети Шаурмания
                    </p>
                  </div>
                </div>
              </article>

              <article className="rounded-2xl border border-zinc-100 bg-white p-5">
                <h2 className="text-xl font-semibold text-zinc-900">Отправить предложение</h2>
                <p className="mt-2 text-sm text-zinc-600">Заполните форму — мы свяжемся с вами в ближайшее время.</p>

                <form
                  className="mt-5 space-y-4"
                  onSubmit={(event) => {
                    event.preventDefault()
                    setIsSent(true)
                  }}
                >
                  <div className="space-y-2">
                    <label htmlFor="contact-name" className="text-sm font-medium text-zinc-700">
                      Имя
                    </label>
                    <Input id="contact-name" name="contact-name" placeholder="Как к вам обращаться" required />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="contact-phone" className="text-sm font-medium text-zinc-700">
                      Телефон
                    </label>
                    <Input id="contact-phone" name="contact-phone" placeholder="+7 (___) ___-__-__" required />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="offer-address" className="text-sm font-medium text-zinc-700">
                      Адрес помещения
                    </label>
                    <Input id="offer-address" name="offer-address" placeholder="Улица, дом, район" required />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="offer-message" className="text-sm font-medium text-zinc-700">
                      Комментарий
                    </label>
                    <Textarea
                      id="offer-message"
                      name="offer-message"
                      placeholder="Площадь, этаж, трафик, стоимость аренды и другие детали"
                      rows={5}
                    />
                  </div>

                  <Button type="submit" className="w-full gap-2 bg-[#E73F22] text-white hover:bg-[#d7361d]">
                    <Send className="h-4 w-4" />
                    Отправить заявку
                  </Button>
                </form>

                {isSent && (
                  <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                    Спасибо! Ваша заявка отправлена. Мы свяжемся с вами после проверки локации.
                  </div>
                )}
              </article>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <CartDrawer
        open={isCartOpen}
        onOpenChange={setIsCartOpen}
        onCheckout={handleCheckout}
        onLocationClick={() => setIsLocationOpen(true)}
      />

      <CheckoutDialog open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen} />
      <LocationDialog open={isLocationOpen} onOpenChange={setIsLocationOpen} />
    </div>
  )
}
