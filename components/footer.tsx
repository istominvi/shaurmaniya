import { Phone, Clock, MapPin, ExternalLink } from "lucide-react"
import branchesData from "@/lib/branches.json"

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

export function Footer() {
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
  const staticMapParams = new URLSearchParams({
    lang: "ru_RU",
    l: "map",
    ll: `${center.lon},${center.lat}`,
    z: "11",
    size: "650,320",
    pt: mapPoints,
  })

  const cityMapUrl = `https://static-maps.yandex.ru/1.x/?${staticMapParams.toString()}`
  const cityMapLink = `https://yandex.ru/maps/68/chita/?ll=${center.lon}%2C${center.lat}&z=11`

  return (
    <footer className="relative z-10 bg-[#E73F22] text-white">
      <div className="w-full px-4 md:px-8 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* About Section */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">О нас</h3>
            <p className="text-sm text-white/80 leading-relaxed">
              Шаурмания — сеть кафе быстрого питания в Чите. Мы готовим вкусную и качественную шаурму, бургеры и другие
              блюда по доступным ценам.
            </p>
          </div>

          {/* Hours Section */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Время работы</h3>
            <div className="space-y-2 text-sm text-white/80">
              {branches.slice(0, 3).map((branch) => (
                <div key={`hours-${branch.address}`} className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-white" />
                  <span>
                    {branch.address}: {branch.schedule || "Уточняйте по телефону"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Контакты</h3>
            <div className="space-y-2 text-sm text-white/80">
              {branches.slice(0, 3).map((branch) => (
                <div key={`phone-${branch.address}`} className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-white" />
                  <span>{branch.address}: {branch.phone}</span>
                </div>
              ))}
              <p className="leading-relaxed">Оформите заказ через наш сайт, и мы доставим вашу шаурму горячей и свежей!</p>
            </div>
          </div>
        </div>

        {/* Branches Section */}
        <div className="mt-12">
          <h3 className="mb-6 text-xl font-semibold text-center">Наши филиалы</h3>
          <a
            href={cityMapLink}
            target="_blank"
            rel="noopener noreferrer"
            className="block overflow-hidden rounded-xl border border-white/25 bg-white/10"
          >
            <img src={cityMapUrl} alt="Карта Читы с отмеченными филиалами" className="h-[320px] w-full object-cover" loading="lazy" />
          </a>
          <p className="mt-2 text-center text-sm text-white/80">На карте отмечены все филиалы. Нажмите, чтобы открыть в Яндекс Картах.</p>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-4">
            {branches.map((branch, index) => (
              <div
                key={`${branch.address}-${index}`}
                className="group flex flex-col overflow-hidden rounded-xl bg-white text-black transition-all hover:shadow-lg h-full"
              >
                <div className="flex flex-1 flex-col p-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-2 text-sm text-zinc-600">
                      <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-[#E73F22]" />
                      <div className="min-w-0">
                        <h4 className="text-sm font-bold leading-tight line-clamp-2 text-black">{branch.address}</h4>
                        <p className="mt-1 pl-0 text-sm text-zinc-500">{branch.district}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 text-sm text-zinc-600">
                      <Clock className="h-4 w-4 mt-0.5 shrink-0 text-[#E73F22]" />
                      <span>{branch.schedule}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 shrink-0 text-[#E73F22]" />
                      <span className="text-sm text-zinc-700">{branch.phone}</span>
                    </div>
                  </div>

                  <div className="mt-auto flex flex-wrap gap-2 pt-3 text-sm">
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
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-6 py-2 text-center text-sm text-white/60">
          <p>© {new Date().getFullYear()} Шаурмания. Все права защищены.</p>
        </div>
      </div>
    </footer>
  )
}
