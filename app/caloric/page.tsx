"use client"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { ArrowLeft, Flame, Wheat, Droplets, Drumstick } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CharcoalSparks } from "@/components/charcoal-sparks"
import { CartDrawer } from "@/components/cart-drawer"
import { CheckoutDialog } from "@/components/checkout-dialog"
import { LocationDialog } from "@/components/location-dialog"
import { Button } from "@/components/ui/button"

const CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vSF-SrUyWUFNrlauDFOomL9FIO9xYN2NhYcdkBTcmz1GP3P-FYgCreNtqgox_v2yG4ku8Uu7dmDaCNI/pub?gid=777696626&single=true&output=csv"

interface NutritionRow {
  name: string
  weight: string
  calories: string
  protein: string
  fat: string
  carbs: string
}

const splitCsvLine = (line: string) => {
  const values: string[] = []
  let current = ""
  let inQuotes = false

  for (let index = 0; index < line.length; index += 1) {
    const character = line[index]

    if (character === '"') {
      const nextCharacter = line[index + 1]
      if (inQuotes && nextCharacter === '"') {
        current += '"'
        index += 1
      } else {
        inQuotes = !inQuotes
      }
      continue
    }

    if (character === "," && !inQuotes) {
      values.push(current.trim())
      current = ""
      continue
    }

    current += character
  }

  values.push(current.trim())
  return values
}

const parseNutritionCsv = (rawCsv: string): NutritionRow[] => {
  const lines = rawCsv
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)

  if (lines.length < 2) {
    return []
  }

  return lines.slice(1).map((line) => {
    const [name = "", weight = "", calories = "", protein = "", fat = "", carbs = ""] = splitCsvLine(line)
    return {
      name,
      weight,
      calories,
      protein,
      fat,
      carbs,
    }
  })
}

export default function CaloricPage() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isLocationOpen, setIsLocationOpen] = useState(false)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const [rows, setRows] = useState<NutritionRow[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const loadNutrition = async () => {
      try {
        setIsLoading(true)
        setHasError(false)

        const response = await fetch(CSV_URL)
        if (!response.ok) {
          throw new Error("Ошибка загрузки таблицы")
        }

        const csv = await response.text()
        setRows(parseNutritionCsv(csv))
      } catch {
        setHasError(true)
      } finally {
        setIsLoading(false)
      }
    }

    void loadNutrition()
  }, [])

  const averageCalories = useMemo(() => {
    if (rows.length === 0) {
      return null
    }

    const validCalories = rows
      .map((item) => Number(item.calories.replace(",", ".")))
      .filter((value) => Number.isFinite(value))

    if (validCalories.length === 0) {
      return null
    }

    return Math.round(validCalories.reduce((sum, value) => sum + value, 0) / validCalories.length)
  }, [rows])

  const handleCheckout = () => {
    setIsCartOpen(false)
    setIsCheckoutOpen(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fff8f5] to-white">
      <CharcoalSparks />
      <Header onCartClick={() => setIsCartOpen(true)} onLocationClick={() => setIsLocationOpen(true)} />

      <main className="relative z-10 w-full px-4 py-8 md:px-8 md:py-10">
        <section className="mx-auto max-w-6xl">
          <div className="mb-5">
            <Button asChild variant="outline" className="rounded-full border-[#E73F22]/30 bg-white/85 text-[#E73F22] hover:bg-[#fff1ed]">
              <Link href="/">
                <ArrowLeft className="mr-1 h-4 w-4" />
                Назад к меню
              </Link>
            </Button>
          </div>

          <div className="overflow-hidden rounded-3xl border border-[#E73F22]/20 bg-white shadow-[0_20px_50px_rgba(231,63,34,0.10)]">
            <div className="border-b border-[#E73F22]/10 bg-gradient-to-r from-[#E73F22] to-[#ff7045] px-5 py-6 text-white md:px-8">
              <h1 className="text-2xl font-bold md:text-3xl">Калорийность и КБЖУ</h1>
              <p className="mt-2 text-sm text-white/90 md:text-base">Состав, вес и пищевая ценность наших позиций.</p>

              {averageCalories !== null && (
                <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-3 py-1.5 text-sm">
                  <Flame className="h-4 w-4" />
                  Средняя энергетическая ценность: ~{averageCalories} ккал
                </div>
              )}
            </div>

            <div className="p-4 md:p-6">
              {isLoading && <p className="text-sm text-zinc-500">Загружаем таблицу…</p>}

              {hasError && (
                <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
                  Не удалось загрузить таблицу калорийности. Попробуйте обновить страницу немного позже.
                </div>
              )}

              {!isLoading && !hasError && (
                <div className="overflow-x-auto rounded-2xl border border-zinc-100">
                  <table className="min-w-full overflow-hidden text-sm">
                    <thead className="bg-[#fff5f2] text-xs uppercase tracking-wide text-[#b34732]">
                      <tr>
                        <th className="px-4 py-3 text-left">Наименование</th>
                        <th className="px-4 py-3 text-left">Вес</th>
                        <th className="px-4 py-3 text-left">
                          <span className="inline-flex items-center gap-1">
                            <Flame className="h-3.5 w-3.5" />
                            Энерг. ценность
                          </span>
                        </th>
                        <th className="px-4 py-3 text-left">
                          <span className="inline-flex items-center gap-1">
                            <Drumstick className="h-3.5 w-3.5" />
                            Белки
                          </span>
                        </th>
                        <th className="px-4 py-3 text-left">
                          <span className="inline-flex items-center gap-1">
                            <Droplets className="h-3.5 w-3.5" />
                            Жиры
                          </span>
                        </th>
                        <th className="px-4 py-3 text-left">
                          <span className="inline-flex items-center gap-1">
                            <Wheat className="h-3.5 w-3.5" />
                            Углеводы
                          </span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100 bg-white">
                      {rows.map((row) => (
                        <tr key={row.name} className="transition-colors hover:bg-[#fffaf8]">
                          <td className="px-4 py-3 font-medium text-zinc-900">{row.name}</td>
                          <td className="px-4 py-3 text-zinc-700">{row.weight}</td>
                          <td className="px-4 py-3 text-zinc-700">{row.calories}</td>
                          <td className="px-4 py-3 text-zinc-700">{row.protein}</td>
                          <td className="px-4 py-3 text-zinc-700">{row.fat}</td>
                          <td className="px-4 py-3 text-zinc-700">{row.carbs}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
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
