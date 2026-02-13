import { Phone, Clock, MapPin } from "lucide-react"
import branchesData from "@/lib/branches.json"

interface Branch {
  address: string
  district: string
  phone: string
  schedule: string
  link2gis: string
  linkYandex: string
}

export function Footer() {
  const branches = branchesData as Branch[]

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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-4">
            {branches.map((branch, index) => (
              <div
                key={`${branch.address}-${index}`}
                className="group flex flex-col overflow-hidden rounded-xl bg-white text-black transition-all hover:shadow-lg h-full"
              >
                <div className="flex flex-1 flex-col p-4">
                  <h4 className="text-sm font-bold leading-tight line-clamp-2 mb-3">{branch.address}</h4>

                  <div className="space-y-2 mb-3">
                    <div className="flex items-start gap-2 text-sm text-zinc-600">
                      <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-[#E73F22]" />
                      <span>{branch.district}</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm text-zinc-600">
                      <Clock className="h-4 w-4 mt-0.5 shrink-0 text-[#E73F22]" />
                      <span>{branch.schedule}</span>
                    </div>
                  </div>

                  <div className="mt-auto flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 shrink-0 text-[#E73F22]" />
                      <span className="text-sm font-medium">{branch.phone}</span>
                    </div>

                    <div className="flex flex-wrap gap-2 text-sm">
                      {branch.link2gis && (
                        <a
                          href={branch.link2gis}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-md border border-zinc-200 bg-white px-3 py-1.5 font-medium text-zinc-700 transition-colors hover:bg-zinc-50"
                        >
                          2Gis
                        </a>
                      )}
                      {branch.linkYandex && (
                        <a
                          href={branch.linkYandex}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-md border border-zinc-200 bg-white px-3 py-1.5 font-medium text-zinc-700 transition-colors hover:bg-zinc-50"
                        >
                          Яндекс
                        </a>
                      )}
                    </div>
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
