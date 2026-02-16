"use client"

import Link from "next/link"
import { useState } from "react"
import {
  ArrowLeft,
  BadgeCheck,
  Box,
  ClipboardList,
  Handshake,
  Leaf,
  PackageCheck,
  Phone,
  ShieldCheck,
  Truck,
} from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CharcoalSparks } from "@/components/charcoal-sparks"
import { CartDrawer } from "@/components/cart-drawer"
import { CheckoutDialog } from "@/components/checkout-dialog"
import { LocationDialog } from "@/components/location-dialog"
import { Button } from "@/components/ui/button"

const advantages = [
  {
    icon: Truck,
    title: "Регулярные заказы",
    description: "Работаем по плану закупок и формируем стабильный график поставок для ключевых категорий.",
  },
  {
    icon: BadgeCheck,
    title: "Прозрачные условия",
    description: "Фиксируем требования к качеству, срокам и документам до старта сотрудничества.",
  },
  {
    icon: Handshake,
    title: "Долгосрочное партнёрство",
    description: "Заинтересованы в поставщиках, с которыми можно расти и масштабироваться по сети.",
  },
]

const productCategories = [
  "Мясо, птица, полуфабрикаты",
  "Овощи, зелень и свежие ингредиенты",
  "Соусы, специи и бакалея",
  "Лаваш, выпечка и хлебобулочные изделия",
  "Упаковка и расходные материалы",
]

const requirements = [
  "Соответствие ТР ТС, СанПиН и действующим нормам хранения/логистики.",
  "Полный комплект документов: декларации, сертификаты, ветеринарные/товаросопроводительные документы.",
  "Стабильное качество партий и соблюдение согласованных сроков поставки.",
  "Готовность к тестовым поставкам и выборочному входному контролю.",
]

const processSteps = [
  {
    icon: ClipboardList,
    title: "1. Заявка",
    description: "Вы отправляете коммерческое предложение с прайсом, условиями поставки и контактами.",
  },
  {
    icon: PackageCheck,
    title: "2. Проверка",
    description: "Оцениваем ассортимент, документы и соответствие требованиям сети.",
  },
  {
    icon: Box,
    title: "3. Тестовая партия",
    description: "Проводим пробную поставку и проверяем качество продукции на точках.",
  },
  {
    icon: ShieldCheck,
    title: "4. Договор",
    description: "Согласовываем условия и запускаем регулярную работу по графику.",
  },
]

export default function SuppliersPage() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isLocationOpen, setIsLocationOpen] = useState(false)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)

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
            <div className="grid gap-0 lg:grid-cols-[1.15fr_1fr]">
              <div className="border-b border-[#E73F22]/10 bg-gradient-to-br from-[#E73F22] via-[#f45736] to-[#ff7a55] p-6 text-white md:p-8 lg:border-b-0 lg:border-r">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em]">
                  <Handshake className="h-4 w-4" />
                  Работа с поставщиками
                </div>
                <h1 className="mt-4 text-3xl font-bold leading-tight md:text-4xl">Поставщикам</h1>
                <p className="mt-3 max-w-xl text-sm text-white/90 md:text-base">
                  Приглашаем к сотрудничеству производителей и дистрибьюторов продуктов, упаковки и расходных материалов.
                </p>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/30 bg-white/10 p-4">
                    <p className="text-2xl font-bold">10+</p>
                    <p className="text-sm text-white/85">категорий закупки по сети</p>
                  </div>
                  <div className="rounded-2xl border border-white/30 bg-white/10 p-4">
                    <p className="text-2xl font-bold">Единый</p>
                    <p className="text-sm text-white/85">стандарт проверки качества</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#fff4ef] p-6 md:p-8">
                <h2 className="text-lg font-semibold text-zinc-900">Как отправить предложение</h2>
                <p className="mt-2 text-sm leading-relaxed text-zinc-700">
                  Направьте на почту закупок информацию о компании, ассортимент, прайс-лист и условия логистики.
                </p>

                <div className="mt-5 space-y-3">
                  <a
                    href="mailto:supply@shaurmania.ru"
                    className="block rounded-xl border border-[#E73F22]/20 bg-white px-4 py-3 text-sm font-medium text-zinc-800 transition-colors hover:bg-[#fff8f5]"
                  >
                    supply@shaurmania.ru
                  </a>
                  <a
                    href="tel:+73022000000"
                    className="flex items-center gap-2 rounded-xl border border-[#E73F22]/20 bg-white px-4 py-3 text-sm font-medium text-zinc-800 transition-colors hover:bg-[#fff8f5]"
                  >
                    <Phone className="h-4 w-4 text-[#E73F22]" />
                    +7 (3022) 00-00-00
                  </a>
                </div>

                <p className="mt-4 text-xs text-zinc-500">В теме письма укажите: «Коммерческое предложение — название компании».</p>
              </div>
            </div>
          </div>

          <section className="grid gap-4 md:grid-cols-3">
            {advantages.map(({ icon: Icon, title, description }) => (
              <article key={title} className="rounded-2xl border border-[#E73F22]/15 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#fff1ed] text-[#E73F22]">
                  <Icon className="h-5 w-5" />
                </div>
                <h2 className="text-lg font-semibold text-zinc-900">{title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600">{description}</p>
              </article>
            ))}
          </section>

          <section className="grid gap-4 lg:grid-cols-2">
            <article className="rounded-2xl border border-zinc-200 bg-white p-6">
              <h2 className="text-xl font-semibold text-zinc-900">Что закупаем</h2>
              <ul className="mt-4 space-y-3 text-sm text-zinc-700">
                {productCategories.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <Leaf className="mt-0.5 h-4 w-4 shrink-0 text-[#E73F22]" />
                    {item}
                  </li>
                ))}
              </ul>
            </article>

            <article className="rounded-2xl border border-zinc-200 bg-white p-6">
              <h2 className="text-xl font-semibold text-zinc-900">Требования к поставкам</h2>
              <ul className="mt-4 space-y-3 text-sm text-zinc-700">
                {requirements.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#E73F22]" />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </section>

          <section className="rounded-2xl border border-zinc-200 bg-white p-6">
            <h2 className="text-xl font-semibold text-zinc-900">Этапы подключения</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {processSteps.map(({ icon: Icon, title, description }) => (
                <div key={title} className="rounded-xl border border-zinc-100 bg-[#fffaf8] p-4">
                  <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white text-[#E73F22] shadow-sm">
                    <Icon className="h-4 w-4" />
                  </div>
                  <h3 className="text-sm font-semibold text-zinc-900">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-600">{description}</p>
                </div>
              ))}
            </div>
          </section>
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
