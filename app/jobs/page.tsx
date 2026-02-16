"use client"

import Link from "next/link"
import { useState } from "react"
import {
  ArrowLeft,
  BriefcaseBusiness,
  Clock3,
  HeartHandshake,
  MapPin,
  Phone,
  Rocket,
  Send,
  ShieldCheck,
  Users,
} from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CharcoalSparks } from "@/components/charcoal-sparks"
import { CartDrawer } from "@/components/cart-drawer"
import { CheckoutDialog } from "@/components/checkout-dialog"
import { LocationDialog } from "@/components/location-dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const benefits = [
  {
    icon: ShieldCheck,
    title: "Стабильные выплаты",
    description: "Официальная зарплата 2 раза в месяц, без задержек.",
  },
  {
    icon: Rocket,
    title: "Быстрый старт",
    description: "Обучаем с нуля, наставник помогает пройти адаптацию.",
  },
  {
    icon: HeartHandshake,
    title: "Команда рядом",
    description: "Поддержка управляющего и коллег в каждой смене.",
  },
  {
    icon: Users,
    title: "Карьерный рост",
    description: "От сотрудника кухни до администратора или управляющего.",
  },
]

const vacancies = [
  {
    title: "Повар-шаурмист",
    salary: "от 55 000 ₽",
    schedule: "2/2, дневные и вечерние смены",
    duties: "Приготовление блюд по техкартам, контроль качества и чистоты рабочего места.",
  },
  {
    title: "Кассир",
    salary: "от 45 000 ₽",
    schedule: "2/2, гибкий график",
    duties: "Приём заказов, работа с кассой, помощь гостям в выборе блюд.",
  },
  {
    title: "Курьер",
    salary: "от 60 000 ₽",
    schedule: "Сменный график",
    duties: "Доставка заказов по Чите, соблюдение стандартов сервиса и скорости.",
  },
]

const hiringSteps = [
  "Оставляете заявку на сайте или по телефону",
  "Мы связываемся с вами в течение рабочего дня",
  "Приглашаем на знакомство и короткое собеседование",
  "Выходите на оплачиваемую стажировку",
]

export default function JobsPage() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isLocationOpen, setIsLocationOpen] = useState(false)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const [isSent, setIsSent] = useState(false)

  const handleCheckout = () => {
    setIsCartOpen(false)
    setIsCheckoutOpen(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fff8f5] via-[#fffdfa] to-white">
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
            <div className="grid gap-0 lg:grid-cols-[1.4fr_1fr]">
              <div className="bg-gradient-to-br from-[#E73F22] via-[#f25534] to-[#ff7a56] px-5 py-7 text-white md:px-8 md:py-9">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.12em]">
                  <BriefcaseBusiness className="h-4 w-4" />
                  Работа в Шаурмании
                </div>

                <h1 className="mt-4 text-3xl font-bold leading-tight md:text-4xl">Работа, с которой возможно всё</h1>
                <p className="mt-3 max-w-xl text-sm text-white/90 md:text-base">
                  Присоединяйтесь к команде Шаурмании в Чите: стабильный доход, понятные условия, обучение и реальный рост внутри сети.
                </p>

                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl border border-white/30 bg-white/10 p-4">
                    <p className="text-2xl font-bold">100+</p>
                    <p className="text-sm text-white/85">сотрудников в команде</p>
                  </div>
                  <div className="rounded-2xl border border-white/30 bg-white/10 p-4">
                    <p className="text-2xl font-bold">2 раза</p>
                    <p className="text-sm text-white/85">в месяц выплата зарплаты</p>
                  </div>
                  <div className="rounded-2xl border border-white/30 bg-white/10 p-4">
                    <p className="text-2xl font-bold">3-5 дней</p>
                    <p className="text-sm text-white/85">адаптация с наставником</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#fff4ef] p-6 md:p-8">
                <h2 className="text-lg font-semibold text-zinc-900">Контакты HR</h2>
                <p className="mt-2 text-sm leading-relaxed text-zinc-700">Откликнитесь на вакансию — поможем выбрать подходящую позицию и филиал рядом с домом.</p>

                <div className="mt-5 space-y-3 text-sm text-zinc-700">
                  <a
                    href="tel:+73022000000"
                    className="flex items-center gap-2 rounded-xl border border-[#E73F22]/20 bg-white px-4 py-3 font-medium transition-colors hover:bg-[#fff8f5]"
                  >
                    <Phone className="h-4 w-4 text-[#E73F22]" />
                    +7 (3022) 00-00-00
                  </a>
                  <p className="flex items-center gap-2 rounded-xl border border-[#E73F22]/20 bg-white px-4 py-3">
                    <MapPin className="h-4 w-4 text-[#E73F22]" />
                    г. Чита, все районы
                  </p>
                  <p className="flex items-center gap-2 rounded-xl border border-[#E73F22]/20 bg-white px-4 py-3">
                    <Clock3 className="h-4 w-4 text-[#E73F22]" />
                    Ответ на отклик в течение дня
                  </p>
                </div>

                <p className="mt-4 text-xs text-zinc-500">Можно без опыта — главное желание работать в команде и ответственность.</p>
              </div>
            </div>
          </div>

          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {benefits.map(({ icon: Icon, title, description }) => (
              <article key={title} className="rounded-2xl border border-[#E73F22]/15 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#fff1ed] text-[#E73F22]">
                  <Icon className="h-5 w-5" />
                </div>
                <h2 className="text-lg font-semibold text-zinc-900">{title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600">{description}</p>
              </article>
            ))}
          </section>

          <section className="grid gap-4 lg:grid-cols-[1.5fr_1fr]">
            <article className="rounded-2xl border border-zinc-200 bg-white p-6">
              <h2 className="text-xl font-semibold text-zinc-900">Открытые вакансии</h2>
              <div className="mt-4 space-y-4">
                {vacancies.map((vacancy) => (
                  <div key={vacancy.title} className="rounded-xl border border-zinc-100 bg-[#fffaf8] p-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="text-base font-semibold text-zinc-900">{vacancy.title}</h3>
                      <span className="rounded-full bg-white px-3 py-1 text-sm font-semibold text-[#E73F22]">{vacancy.salary}</span>
                    </div>
                    <p className="mt-2 text-sm text-zinc-600">{vacancy.duties}</p>
                    <p className="mt-2 text-sm font-medium text-zinc-700">График: {vacancy.schedule}</p>
                  </div>
                ))}
              </div>
            </article>

            <article className="rounded-2xl border border-zinc-200 bg-white p-6">
              <h2 className="text-xl font-semibold text-zinc-900">Как устроиться</h2>
              <ol className="mt-4 space-y-3 text-sm text-zinc-700">
                {hiringSteps.map((step, index) => (
                  <li key={step} className="flex items-start gap-3">
                    <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#fff1ed] text-xs font-bold text-[#E73F22]">
                      {index + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </article>
          </section>

          <section className="rounded-2xl border border-zinc-200 bg-white p-6 md:p-8">
            <h2 className="text-2xl font-semibold text-zinc-900">Откликнуться на вакансию</h2>
            <p className="mt-2 text-sm text-zinc-600">Заполните короткую форму, и мы свяжемся с вами для собеседования.</p>

            <form
              className="mt-5 grid gap-4 md:grid-cols-2"
              onSubmit={(event) => {
                event.preventDefault()
                setIsSent(true)
              }}
            >
              <div className="space-y-2">
                <label htmlFor="job-name" className="text-sm font-medium text-zinc-700">
                  Имя
                </label>
                <Input id="job-name" name="job-name" placeholder="Как к вам обращаться" required />
              </div>

              <div className="space-y-2">
                <label htmlFor="job-phone" className="text-sm font-medium text-zinc-700">
                  Телефон
                </label>
                <Input id="job-phone" name="job-phone" placeholder="+7 (___) ___-__-__" required />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label htmlFor="job-position" className="text-sm font-medium text-zinc-700">
                  Интересующая вакансия
                </label>
                <Input id="job-position" name="job-position" placeholder="Например: Кассир" required />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label htmlFor="job-message" className="text-sm font-medium text-zinc-700">
                  Комментарий
                </label>
                <Textarea id="job-message" name="job-message" placeholder="Удобный график, район, опыт работы" rows={4} />
              </div>

              <div className="md:col-span-2">
                <Button type="submit" className="w-full gap-2 bg-[#E73F22] text-white hover:bg-[#d7361d] md:w-auto">
                  <Send className="h-4 w-4" />
                  Отправить отклик
                </Button>
              </div>
            </form>

            {isSent && (
              <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                Спасибо! Мы получили ваш отклик и свяжемся с вами в течение дня.
              </div>
            )}
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
