import { Phone, Clock, MapPin } from "lucide-react"

export function Footer() {
  const branches = [
    {
      address: "Улица Столярова, 83",
      info: "Центральный район",
      phone: "+7 (914) 510‒91‒80",
      link2gis: "https://2gis.ru/chita/branches/70000001045033091/firm/70000001080660135/113.519281%2C52.031549?m=113.519281%2C52.031549%2F16",
      linkYandex: "https://yandex.ru/maps/org/shaurmaniya/110852738462/?ll=113.519168%2C52.031486&z=16.95",
    },
    {
      address: "Улица Красной Звезды, 70/1",
      info: "Северный м-н, Центральный район",
      phone: "+7 (914) 515‒48‒46",
      link2gis: "https://2gis.ru/chita/branches/70000001045033091/firm/70000001064444709/113.481655%2C52.076648?m=113.481655%2C52.076648%2F16",
      linkYandex: "https://yandex.ru/maps/org/shaurmaniya/71390209311/?ll=113.481627%2C52.076665&z=16",
    },
    {
      address: "Улица Новобульварная, 92 киоск",
      info: "Центральный район",
      phone: "+7 (914) 516‒96‒78",
      link2gis: "https://2gis.ru/chita/branches/70000001045033091/firm/70000001045033092/113.487478%2C52.055444?m=113.487478%2C52.055444%2F16",
      linkYandex: "https://yandex.ru/maps/org/shaurma/99059296595/?indoorLevel=1&ll=113.485975%2C52.056147&z=16.95",
    },
  ]

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
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-white" />
                <span>Ул. Столярова, 83: с 10:00 до 23:00</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-white" />
                <span>Ул. Красной Звезды, 70/1: с 10:00 до 23:00</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-white" />
                <span>Ул. Новобульварная, 92 киоск: с 10:00 до 23:00</span>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Контакты</h3>
            <div className="space-y-2 text-sm text-white/80">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-white" />
                <span>Ул. Столярова, 83: +7 (914) 510‒91‒80</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-white" />
                <span>Ул. Красной Звезды, 70/1: +7 (914) 515‒48‒46</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-white" />
                <span>Ул. Новобульварная, 92 киоск: +7 (914) 516‒96‒78</span>
              </div>
              <p className="leading-relaxed">
                Оформите заказ через наш сайт, и мы доставим вашу шаурму горячей и свежей!
              </p>
            </div>
          </div>
        </div>

        {/* Branches Section */}
        <div className="mt-12">
          <h3 className="mb-6 text-xl font-semibold text-center">Наши филиалы</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {branches.map((branch, index) => (
              <div
                key={index}
                className="group flex flex-col overflow-hidden rounded-xl bg-white text-black transition-all hover:shadow-lg h-full"
              >
                <div className="flex flex-1 flex-col p-4">
                  <h4 className="text-sm font-bold leading-tight line-clamp-2 mb-1">{branch.address}</h4>
                  <p className="text-sm text-zinc-500 line-clamp-1 mb-2">{branch.info}</p>

                  <div className="mt-auto flex flex-col gap-1">
                    <div className="flex items-center gap-1">
                      <Phone className="h-4 w-4 text-[#E73F22]" />
                      <span className="text-sm font-medium whitespace-nowrap">{branch.phone}</span>
                    </div>
                    <div className="flex gap-2 text-sm">
                      <a
                        href={branch.link2gis}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-[#E73F22] hover:underline"
                      >
                        2Gis
                      </a>
                      <a
                        href={branch.linkYandex}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-[#E73F22] hover:underline"
                      >
                        Яндекс
                      </a>
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
