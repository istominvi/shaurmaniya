"use client"

import Link from "next/link"
import { useState } from "react"
import {
  ArrowLeft,
  Beef,
  ChefHat,
  CircleCheck,
  Flame,
  HandPlatter,
  Leaf,
  ShieldCheck,
  Soup,
  Sparkles,
  Timer,
  UtensilsCrossed,
} from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CharcoalSparks } from "@/components/charcoal-sparks"
import { CartDrawer } from "@/components/cart-drawer"
import { CheckoutDialog } from "@/components/checkout-dialog"
import { LocationDialog } from "@/components/location-dialog"
import { Button } from "@/components/ui/button"

const qualityPoints = [
  { icon: Flame, text: "степень прожарки мяса" },
  { icon: Timer, text: "температура лаваша" },
  { icon: HandPlatter, text: "соотношение ингредиентов" },
  { icon: Soup, text: "соус" },
]

const menuItems = [
  "классические и авторские шаурмы",
  "большие и сытные порции",
  "горячие закуски",
  "кесадильи",
  "гарниры",
  "напитки",
]

const standards = ["одинаковый вкус", "нормальную порцию", "быстрое обслуживание", "чистоту на кухне"]

const reasons = ["сытность", "честную цену", "стабильное качество", "понятную еду без экспериментов ради экспериментов"]

export default function AboutPage() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isLocationOpen, setIsLocationOpen] = useState(false)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)

  const handleCheckout = () => {
    setIsCartOpen(false)
    setIsCheckoutOpen(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fff8f5] via-[#fffdfa] to-white">
      <CharcoalSparks />
      <Header onCartClick={() => setIsCartOpen(true)} onLocationClick={() => setIsLocationOpen(true)} />

      <main className="relative z-10 w-full px-4 py-8 md:px-8 md:py-10">
        <div className="mx-auto max-w-6xl space-y-8">
          <Button asChild variant="outline" className="rounded-full border-[#E73F22]/30 bg-white/90 text-[#E73F22] hover:bg-[#fff1ed]">
            <Link href="/">
              <ArrowLeft className="mr-1 h-4 w-4" />
              Назад к меню
            </Link>
          </Button>

          <section className="overflow-hidden rounded-3xl border border-[#E73F22]/20 bg-white shadow-[0_20px_50px_rgba(231,63,34,0.10)]">
            <div className="bg-gradient-to-br from-[#E73F22] via-[#f45736] to-[#ff7a55] p-6 text-white md:p-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em]">
                <Sparkles className="h-4 w-4" />
                О бренде
              </div>
              <h1 className="mt-4 text-3xl font-bold leading-tight md:text-5xl">Шаурмания</h1>
              <p className="mt-4 max-w-3xl text-sm leading-relaxed text-white/95 md:text-base">
                Шаурмания — это сеть городских кафе, где привычную шаурму мы сделали полноценной кухней.
              </p>
              <p className="mt-4 max-w-3xl text-sm leading-relaxed text-white/90 md:text-base">
                Мы открывали не точку быстрого питания. Мы хотели создать место, куда приходят не «перекусить», а поесть вкусно, сытно и
                по-настоящему.
              </p>
            </div>

            <div className="grid gap-4 border-t border-[#E73F22]/15 bg-white p-4 md:grid-cols-3 md:p-6">
              <div className="rounded-2xl border border-[#E73F22]/15 bg-[#fff7f4] p-4">
                <Flame className="h-5 w-5 text-[#E73F22]" />
                <p className="mt-2 text-sm font-semibold text-zinc-900">Горячо и сытно</p>
                <p className="mt-1 text-sm text-zinc-600">Готовим каждую позицию после заказа, без разогрева заготовок.</p>
              </div>
              <div className="rounded-2xl border border-[#E73F22]/15 bg-[#fff7f4] p-4">
                <ChefHat className="h-5 w-5 text-[#E73F22]" />
                <p className="mt-2 text-sm font-semibold text-zinc-900">Стабильный вкус</p>
                <p className="mt-1 text-sm text-zinc-600">Рецептура, сборка и контроль одинаковы в каждом кафе сети.</p>
              </div>
              <div className="rounded-2xl border border-[#E73F22]/15 bg-[#fff7f4] p-4">
                <ShieldCheck className="h-5 w-5 text-[#E73F22]" />
                <p className="mt-2 text-sm font-semibold text-zinc-900">Качество каждый день</p>
                <p className="mt-1 text-sm text-zinc-600">Опираемся на свежие продукты и понятные стандарты сервиса.</p>
              </div>
            </div>
          </section>

          <section className="grid gap-4 lg:grid-cols-2">
            <article className="rounded-3xl border border-[#E73F22]/15 bg-white p-6 shadow-sm md:p-7">
              <h2 className="text-2xl font-bold text-zinc-900">Не фастфуд</h2>
              <p className="mt-3 text-sm leading-relaxed text-zinc-700 md:text-base">
                Шаурма — одно из самых популярных блюд в городе, но долгое время к ней относились как к уличной еде. Мы решили это изменить.
                И сделали ставку на главное — вкус, качество и стабильность.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-zinc-700 md:text-base">
                Мясо жарится на гриле, овощи нарезаются перед приготовлением, а каждая шаурма собирается вручную сразу после заказа. Поэтому
                она всегда горячая, сочная и свежая.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-zinc-700 md:text-base">
                Для нас шаурма — это не «лаваш с начинкой». Это сбалансированное горячее блюдо, где важна каждая деталь.
              </p>
            </article>

            <article className="rounded-3xl border border-[#E73F22]/15 bg-gradient-to-br from-[#fff6f2] to-white p-6 shadow-sm md:p-7">
              <h3 className="text-xl font-bold text-zinc-900">Детали, которые формируют вкус</h3>
              <ul className="mt-4 space-y-3">
                {qualityPoints.map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-center gap-3 rounded-xl border border-[#E73F22]/15 bg-white px-3 py-2">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[#fff1ed] text-[#E73F22]">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="text-sm font-medium text-zinc-700">{text}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm leading-relaxed text-zinc-700">Именно поэтому у нас нет «случайного вкуса». Гость получает тот же результат сегодня, завтра и через год.</p>
            </article>
          </section>

          <section className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
            <article className="rounded-3xl border border-[#E73F22]/15 bg-white p-6 shadow-sm md:p-7">
              <h2 className="text-2xl font-bold text-zinc-900">Наши рецепты</h2>
              <p className="mt-3 text-sm leading-relaxed text-zinc-700 md:text-base">
                Основа вкуса «Шаурмании» — наши фирменные соусы. Мы готовим их по собственным рецептам и не используем магазинные заправки.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-zinc-700 md:text-base">
                Мы подбирали сочетания долго: тестировали, меняли пропорции, убирали лишнее, пока не добились того вкуса, ради которого гости
                возвращаются снова.
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
                  <Beef className="h-5 w-5 text-[#E73F22]" />
                  <p className="mt-2 text-sm text-zinc-700">Мясо маринуется и готовится на вертикальном гриле, чтобы сохранить сочность и аромат.</p>
                </div>
                <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
                  <Leaf className="h-5 w-5 text-[#E73F22]" />
                  <p className="mt-2 text-sm text-zinc-700">Овощи используются только свежие — без хранения и заготовок «на день вперёд».</p>
                </div>
              </div>
            </article>

            <article className="rounded-3xl border border-[#E73F22]/15 bg-white p-6 shadow-sm md:p-7">
              <h2 className="text-2xl font-bold text-zinc-900">Меню</h2>
              <p className="mt-3 text-sm leading-relaxed text-zinc-700 md:text-base">«Шаурмания» — это не один вид шаурмы. Это полноценное меню с выбором.</p>
              <ul className="mt-4 space-y-2">
                {menuItems.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-zinc-700">
                    <CircleCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#E73F22]" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm leading-relaxed text-zinc-700 md:text-base">
                Мы постоянно вводим новые позиции и сезонные вкусы, потому что хорошая уличная кухня должна развиваться, а не повторяться.
              </p>
            </article>
          </section>

          <section className="grid gap-4 md:grid-cols-2">
            <article className="rounded-3xl border border-[#E73F22]/15 bg-white p-6 shadow-sm md:p-7">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#fff1ed] px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-[#bf3319]">
                <UtensilsCrossed className="h-4 w-4" />
                Наш стандарт
              </div>
              <p className="mt-4 text-sm leading-relaxed text-zinc-700 md:text-base">Главное правило сети — гость должен быть уверен в результате.</p>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {standards.map((item) => (
                  <li key={item} className="rounded-xl border border-[#E73F22]/20 bg-[#fff9f7] px-3 py-2 text-sm text-zinc-700">
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm leading-relaxed text-zinc-700 md:text-base">Мы строим сеть, в которой можно зайти в любое кафе и точно знать, что тебе понравится.</p>
            </article>

            <article className="rounded-3xl border border-[#E73F22]/15 bg-white p-6 shadow-sm md:p-7">
              <h2 className="text-2xl font-bold text-zinc-900">Почему к нам возвращаются</h2>
              <p className="mt-3 text-sm leading-relaxed text-zinc-700 md:text-base">
                Люди приходят к нам после работы, учебы, встреч и прогулок. Кто-то — потому что рядом. А потом возвращаются уже потому, что
                это стало любимым местом.
              </p>
              <ul className="mt-4 space-y-2">
                {reasons.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-zinc-700">
                    <CircleCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#E73F22]" />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </section>

          <section className="rounded-3xl border border-[#E73F22]/20 bg-gradient-to-r from-[#fff1ed] via-white to-[#fff7f4] p-6 shadow-sm md:p-8">
            <h2 className="text-2xl font-bold text-zinc-900">Наша идея</h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-700 md:text-base">
              Мы не пытаемся сделать «высокую кухню». Мы делаем хорошую городскую еду — доступную, понятную и вкусную каждый день.
            </p>
            <p className="mt-2 text-sm leading-relaxed text-zinc-700 md:text-base">
              Мы хотим, чтобы шаурма ассоциировалась не с перекусом на бегу, а с нормальным горячим обедом.
            </p>
            <p className="mt-4 text-lg font-semibold text-[#bf3319]">Шаурмания — это место, куда заходят по дороге. А возвращаются уже специально.</p>
          </section>
        </div>
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
