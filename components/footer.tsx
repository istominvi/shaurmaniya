"use client"

import { useState } from "react"
import Image from "next/image"
import { Phone, MapPin, ExternalLink, Instagram, Store, Clock } from "lucide-react"
import branchesData from "@/lib/branches.json"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

interface Branch {
  address: string
  district: string
  phone: string
  schedule: string
  link2gis: string
  linkYandex: string
}

interface BranchCoordinates {
  lat: number
  lon: number
}

interface FooterLink {
  label: string
  href: string
}

const customerLinks: FooterLink[] = [
  { label: "Акции", href: "#promotions" },
  { label: "Калорийность и состав", href: "#nutrition" },
  { label: "Контроль качества", href: "#quality-control" },
  { label: "Контакты", href: "#contacts" },
]

const companyLinks: FooterLink[] = [
  { label: "О нас", href: "#about" },
  { label: "Поставщикам", href: "#suppliers" },
  { label: "Предложить помещение", href: "#rent-offer" },
  { label: "Работа", href: "#jobs" },
]

const legalLinks: FooterLink[] = [
  { label: "Обработка персональных данных", href: "#privacy" },
  { label: "Пользовательское соглашение", href: "#terms" },
  { label: "Товарный знак", href: "#trademark" },
]

const parseCoordinates = (branch: Branch): BranchCoordinates | null => {
  const parseFromUrl = (value: string): BranchCoordinates | null => {
    if (!value) {
      return null
    }

    try {
      const url = new URL(value)
      const llParam = url.searchParams.get("ll")

      if (llParam) {
        const [lon, lat] = llParam.split(",").map(Number)
        if (Number.isFinite(lat) && Number.isFinite(lon)) {
          return { lat, lon }
        }
      }

      const mParam = url.searchParams.get("m")
      if (mParam) {
        const [coords] = mParam.split("/")
        const [lon, lat] = coords.split(",").map(Number)
        if (Number.isFinite(lat) && Number.isFinite(lon)) {
          return { lat, lon }
        }
      }
    } catch {
      return null
    }

    return null
  }

  return parseFromUrl(branch.linkYandex) || parseFromUrl(branch.link2gis)
}

const VkIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="currentColor">
    <path d="M12.785 17.873h1.435s.433-.046.654-.275c.204-.211.197-.608.197-.608s-.028-1.857.836-2.13c.852-.27 1.946 1.794 3.107 2.587.878.6 1.544.468 1.544.468l3.102-.043s1.624-.101.853-1.379c-.063-.105-.453-.953-2.334-2.7-1.968-1.828-1.704-1.533.666-4.688 1.444-1.921 2.023-3.094 1.843-3.596-.172-.479-1.235-.353-1.235-.353l-3.494.022s-.259-.035-.451.078c-.188.111-.309.37-.309.37s-.553 1.47-1.29 2.721c-1.556 2.639-2.178 2.779-2.432 2.615-.59-.381-.443-1.53-.443-2.347 0-2.55.387-3.613-.754-3.889-.379-.091-.657-.151-1.626-.161-1.243-.013-2.294.004-2.89.296-.397.193-.703.625-.516.65.232.031.757.143 1.033.519.356.485.343 1.576.343 1.576s.205 3.001-.478 3.375c-.469.257-1.112-.267-2.495-2.662-.708-1.226-1.243-2.584-1.243-2.584s-.103-.251-.289-.386c-.226-.164-.542-.216-.542-.216L.633 5.43s-.524.015-.716.243c-.171.204-.014.624-.014.624s2.429 5.682 5.179 8.542c2.522 2.621 5.383 3.034 7.703 3.034Z" />
  </svg>
)

const TwoGisIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="none">
    <rect x="2.5" y="2.5" width="19" height="19" rx="4" stroke="currentColor" strokeWidth="2" />
    <path d="M7 9h6v2H9v2h3c1.66 0 3 1.34 3 3s-1.34 3-3 3H7v-2h5a1 1 0 1 0 0-2H9a2 2 0 0 1-2-2V9Zm10 0h-2v10h2V9Z" fill="currentColor" />
  </svg>
)

export function Footer() {
  const [isBranchesOpen, setIsBranchesOpen] = useState(false)
  const branches = branchesData as Branch[]
  const branchCoordinates = branches.map(parseCoordinates).filter((point): point is BranchCoordinates => point !== null)

  const center =
    branchCoordinates.length > 0
      ? {
          lat: branchCoordinates.reduce((acc, point) => acc + point.lat, 0) / branchCoordinates.length,
          lon: branchCoordinates.reduce((acc, point) => acc + point.lon, 0) / branchCoordinates.length,
        }
      : { lat: 52.033333, lon: 113.5 }

  const mapPoints = branchCoordinates.map((point) => `${point.lon},${point.lat},pm2rdm`).join("~")
  const mapWidgetParams = new URLSearchParams({
    ll: `${center.lon},${center.lat}`,
    z: "11",
    pt: mapPoints,
  })

  const mapWidgetUrl = `https://yandex.ru/map-widget/v1/?${mapWidgetParams.toString()}`

  return (
    <footer className="relative z-10 bg-[#E73F22] text-white">
      <div className="w-full px-4 py-12 md:px-8">
        <div className="grid gap-10 border-b border-white/20 pb-10 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div className="space-y-4">
            <Image src="/images/logo_footer.svg" alt="Шаурмания" width={220} height={48} className="h-auto w-[220px]" priority />
            <p className="max-w-lg text-sm leading-relaxed text-white/85">
              Готовим шаурму, бургеры и закуски из свежих ингредиентов. Заберите заказ в ближайшем филиале или оформите
              доставку по Чите.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-base font-semibold">Покупателям</h4>
            <ul className="space-y-3 text-sm text-white/85">
              {customerLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="transition-colors hover:text-white">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            <Dialog open={isBranchesOpen} onOpenChange={setIsBranchesOpen}>
              <DialogTrigger asChild>
                <button
                  type="button"
                  className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/10 px-3 py-2 text-sm font-medium transition hover:bg-white/20"
                >
                  <Store className="h-4 w-4" />
                  Наши филиалы
                </button>
              </DialogTrigger>
              <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-5xl">
                <DialogHeader>
                  <DialogTitle>Наши филиалы в Чите</DialogTitle>
                </DialogHeader>

                <div className="overflow-hidden rounded-xl border border-border bg-muted/20">
                  <iframe src={mapWidgetUrl} title="Интерактивная карта филиалов" className="h-[320px] w-full" loading="lazy" />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {branches.map((branch, index) => (
                    <div key={`${branch.address}-${index}`} className="rounded-xl border border-border bg-card p-4 text-card-foreground">
                      <div className="space-y-3">
                        <div className="flex items-start gap-2 text-sm text-muted-foreground">
                          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#E73F22]" />
                          <div>
                            <p className="font-semibold text-foreground">{branch.address}</p>
                            <p>{branch.district}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2 text-sm text-muted-foreground">
                          <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[#E73F22]" />
                          <span>{branch.schedule}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Phone className="h-4 w-4 shrink-0 text-[#E73F22]" />
                          <span>{branch.phone}</span>
                        </div>
                      </div>

                      <div className="mt-3 flex flex-wrap gap-2 text-sm">
                        {branch.link2gis && (
                          <a
                            href={branch.link2gis}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative rounded-md border border-zinc-200 bg-white px-3 py-1.5 pr-6 font-medium text-zinc-700 transition-colors hover:bg-zinc-50"
                          >
                            2Gis
                            <ExternalLink className="absolute right-2 top-1.5 h-3 w-3 text-zinc-400" />
                          </a>
                        )}
                        {branch.linkYandex && (
                          <a
                            href={branch.linkYandex}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative rounded-md border border-zinc-200 bg-white px-3 py-1.5 pr-6 font-medium text-zinc-700 transition-colors hover:bg-zinc-50"
                          >
                            Яндекс
                            <ExternalLink className="absolute right-2 top-1.5 h-3 w-3 text-zinc-400" />
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div>
            <h4 className="mb-4 text-base font-semibold">Компания</h4>
            <ul className="space-y-3 text-sm text-white/85">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="transition-colors hover:text-white">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-base font-semibold">Документы</h4>
            <ul className="space-y-3 text-sm text-white/85">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="transition-colors hover:text-white">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-8" id="socials">
              <p className="mb-3 text-sm font-semibold text-white">Мы в соцсетях</p>
              <div className="flex flex-wrap gap-2">
                <a
                  href="#vk"
                  aria-label="VK"
                  className="inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/10 px-3 py-2 text-sm font-medium transition hover:bg-white/20"
                >
                  <VkIcon /> VK
                </a>
                <a
                  href="#instagram"
                  aria-label="Instagram"
                  className="inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/10 px-3 py-2 text-sm font-medium transition hover:bg-white/20"
                >
                  <Instagram className="h-4 w-4" /> Instagram
                </a>
                <a
                  href="#2gis"
                  aria-label="2GIS"
                  className="inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/10 px-3 py-2 text-sm font-medium transition hover:bg-white/20"
                >
                  <TwoGisIcon /> 2GIS
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </footer>
  )
}
