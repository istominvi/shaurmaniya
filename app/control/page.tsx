"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { ArrowLeft, BadgeCheck, Camera, ClipboardCheck, Headphones, ShieldCheck } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CharcoalSparks } from "@/components/charcoal-sparks"
import { CartDrawer } from "@/components/cart-drawer"
import { CheckoutDialog } from "@/components/checkout-dialog"
import { LocationDialog } from "@/components/location-dialog"
import { Button } from "@/components/ui/button"
import { getAssetPath } from "@/lib/utils"

const qualitySteps = [
  {
    icon: Camera,
    title: "Онлайн-наблюдение 24/7",
    description: "Кухни и зона выдачи находятся под постоянным видеоконтролем. Любую спорную ситуацию разбираем по записям камер.",
  },
  {
    icon: Headphones,
    title: "Отдел качества на связи",
    description: "Обращения из звонков, мессенджеров и отзывов попадают в единый поток и обрабатываются по регламенту.",
  },
  {
    icon: ClipboardCheck,
    title: "Плановые и внезапные проверки",
    description: "Проводим внутренние аудиты точек: соблюдение рецептур, чистоты, сроков хранения и стандартов сервиса.",
  },
  {
    icon: BadgeCheck,
    title: "Обучение и аттестация команды",
    description: "Сотрудники проходят вводное обучение, регулярные обновления стандартов и внутреннюю аттестацию.",
  },
]

export default function ControlPage() {
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
              Назад к меню
            </Link>
          </Button>

          <div className="overflow-hidden rounded-3xl border border-[#E73F22]/20 bg-white shadow-[0_20px_50px_rgba(231,63,34,0.10)]">
            <div className="grid gap-0 lg:grid-cols-[1.2fr_1fr]">
              <div className="border-b border-[#E73F22]/10 bg-gradient-to-br from-[#E73F22] via-[#f45736] to-[#ff7a55] p-6 text-white md:p-8 lg:border-b-0 lg:border-r">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em]">
                  <ShieldCheck className="h-4 w-4" />
                  Стандарты Шаурмании
                </div>
                <h1 className="mt-4 text-3xl font-bold leading-tight md:text-4xl">Контроль качества</h1>
                <p className="mt-3 max-w-xl text-sm text-white/90 md:text-base">
                  Мы следим за качеством на каждом этапе: от поставки продуктов и приготовления до сборки, упаковки и выдачи заказа.
                </p>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/30 bg-white/10 p-4">
                    <p className="text-2xl font-bold">24/7</p>
                    <p className="text-sm text-white/85">мониторинг ключевых процессов</p>
                  </div>
                  <div className="rounded-2xl border border-white/30 bg-white/10 p-4">
                    <p className="text-2xl font-bold">100%</p>
                    <p className="text-sm text-white/85">точек работают по единым стандартам</p>
                  </div>
                </div>
              </div>

              <div className="relative min-h-[260px] bg-[#2b2b2b]">
                <Image src={getAssetPath("/control/02.png")} alt="Контроль качества в Шаурмании" fill className="object-cover" priority />
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {qualitySteps.map(({ icon: Icon, title, description }) => (
              <article key={title} className="rounded-2xl border border-[#E73F22]/15 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#fff1ed] text-[#E73F22]">
                  <Icon className="h-5 w-5" />
                </div>
                <h2 className="text-lg font-semibold text-zinc-900">{title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600">{description}</p>
              </article>
            ))}
          </div>

          <section className="grid gap-4 md:grid-cols-3">
            <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white">
              <div className="relative aspect-[4/5]">
                <Image src={getAssetPath("/control/01.png")} alt="Контроль стандартов приготовления" fill className="object-cover" />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-zinc-900">Чек-листы на каждой смене</h3>
                <p className="mt-1 text-sm text-zinc-600">Сотрудники фиксируют температуру, условия хранения и санитарное состояние по графику.</p>
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white">
              <div className="relative aspect-[4/5]">
                <Image src={getAssetPath("/control/03.png")} alt="Проверка качества продукции" fill className="object-cover" />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-zinc-900">Контроль выдачи заказов</h3>
                <p className="mt-1 text-sm text-zinc-600">Проверяем комплектность, внешний вид блюда и время сборки перед передачей гостю.</p>
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white">
              <div className="relative aspect-[4/5]">
                <Image src={getAssetPath("/control/04.png")} alt="Качество сервиса и обратная связь" fill className="object-cover" />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-zinc-900">Работа с обратной связью</h3>
                <p className="mt-1 text-sm text-zinc-600">Каждое обращение разбираем индивидуально и используем для улучшения сервиса.</p>
              </div>
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
