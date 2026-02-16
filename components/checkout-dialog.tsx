"use client"

import type React from "react"

import { useState } from "react"
import { CheckCircle2 } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useCartStore } from "@/hooks/use-cart-store"

interface CheckoutDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CheckoutDialog({ open, onOpenChange }: CheckoutDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isPolicyOpen, setIsPolicyOpen] = useState(false)
  const [isPolicyAccepted, setIsPolicyAccepted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    comment: "",
  })

  const { items, total, location, clearCart } = useCartStore()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isPolicyAccepted) {
      return
    }

    setIsSubmitting(true)

    const itemsText = items
      .map((item) => {
        let name = item.product.name
        if (item.variant) name += ` (${item.variant.name})`
        return `${name} x${item.quantity}`
      })
      .join(", ")

    let formattedAddress = location?.address || "Самовывоз"
    if (location?.type === "pickup" && location.address) {
      formattedAddress = `Самовывоз - ${location.address}`
    } else if (location?.type === "delivery" && location.address) {
      formattedAddress = `Доставка - ${location.address}`
    }

    const payload = {
      name: formData.name,
      phone: formData.phone,
      address: formattedAddress,
      items: itemsText,
      total: total,
      comment: formData.comment,
    }

    try {
      await fetch(
        "https://script.google.com/macros/s/AKfycbxmEUiPm-IjB4nLZA7eu5cXJMhF9_JvcEbH_XlVxhWadVIhXZxIcUjuFw-guRFYWePZ/exec",
        {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        },
      )

      setIsSubmitting(false)
      setIsSuccess(true)

      // Clear cart after 2 seconds and close
      setTimeout(() => {
        clearCart()
        setIsSuccess(false)
        setIsPolicyAccepted(false)
        setFormData({ name: "", phone: "", comment: "" })
        onOpenChange(false)
      }, 2000)
    } catch (error) {
      console.error("Checkout error:", error)
      setIsSubmitting(false)
      // In a real app, show error toast here
    }
  }

  const handleClose = () => {
    if (!isSubmitting && !isSuccess) {
      onOpenChange(false)
    }
  }

  if (isSuccess) {
    return (
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md">
          <div className="flex flex-col items-center justify-center gap-4 py-8">
            <CheckCircle2 className="h-16 w-16 text-primary" />
            <div className="text-center">
              <h3 className="mb-2 text-2xl font-bold">Заказ принят!</h3>
              <p className="text-muted-foreground">Мы свяжемся с вами в ближайшее время</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  const locationDetails = location?.address
    ? location.type === "pickup"
      ? `Самовывоз - ${location.address}`
      : `Доставка - ${location.address}`
    : null

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md rounded-xl border-none shadow-xl">
        <DialogHeader>
          <DialogTitle>Оформление заказа</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">
              Имя <span className="text-destructive">*</span>
            </Label>
            <Input
              id="name"
              placeholder="Иван Иванов"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">
              Телефон <span className="text-destructive">*</span>
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+7 (999) 123-45-67"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
              disabled={isSubmitting}
            />
          </div>


          <div className="space-y-2">
            <Label htmlFor="comment">Комментарий к заказу</Label>
            <Textarea
              id="comment"
              placeholder="Позвоните за 10 минут до доставки..."
              value={formData.comment}
              onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
              rows={3}
              disabled={isSubmitting}
            />
          </div>

          {locationDetails && (
            <div className="space-y-2">
              <Label>Способ получения</Label>
              <div className="rounded-lg border border-border bg-muted/50 p-3">
                <p className="text-sm text-muted-foreground">{locationDetails}</p>
              </div>
            </div>
          )}

          <div className="space-y-2 rounded-lg border border-border bg-muted/30 p-3">
            <div className="flex items-start gap-3">
              <Checkbox
                id="policy-consent"
                checked={isPolicyAccepted}
                onCheckedChange={(checked) => setIsPolicyAccepted(Boolean(checked))}
                disabled={isSubmitting}
                className="mt-0.5"
              />
              <Label htmlFor="policy-consent" className="cursor-pointer text-sm leading-5">
                Я соглашаюсь с{" "}
                <button
                  type="button"
                  onClick={() => setIsPolicyOpen(true)}
                  className="font-medium text-[#E73F22] underline underline-offset-2"
                >
                  политикой обработки персональных данных
                </button>
              </Label>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-muted/50 p-4">
            <div className="flex items-center justify-between">
              <span className="font-semibold">Итого к оплате:</span>
              <span className="text-2xl font-bold">{total} ₽</span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">Оплата наличными или картой при получении</p>
          </div>

          <Button
            type="submit"
            className="h-9 w-full border-border shadow-sm transition-colors active:border-none active:bg-[#E73F22] active:text-white"
            disabled={isSubmitting || !isPolicyAccepted}
          >
            {isSubmitting ? "Отправка..." : "Подтвердить заказ"}
          </Button>
        </form>
      </DialogContent>

      <Dialog open={isPolicyOpen} onOpenChange={setIsPolicyOpen}>
        <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-4xl rounded-xl border-none shadow-xl">
          <DialogHeader>
            <DialogTitle>Политика обработки персональных данных</DialogTitle>
          </DialogHeader>

          <div className="space-y-5 text-sm leading-6 text-muted-foreground">
            <div className="space-y-1">
              <p className="text-foreground">сайта сети кафе «Шаурмания»</p>
              <p>г. Чита</p>
              <p>Редакция от «___» __________ 2026 г.</p>
            </div>

            <section className="space-y-2">
              <h3 className="font-semibold text-foreground">1. Общие положения</h3>
              <p>
                Настоящая Политика обработки персональных данных (далее — Политика) определяет порядок обработки и
                защиты персональных данных пользователей сайта сети кафе «Шаурмания» (далее — Сайт).
              </p>
              <p>Оператором персональных данных является:</p>
              <p className="text-foreground">
                <strong>[ИП/ООО «__________»]</strong>
                <br />
                ИНН: <strong>__________</strong>
                <br />
                Адрес регистрации: <strong>__________</strong>
                <br />
                E-mail для обращений: <strong>__________</strong>
              </p>
              <p>
                Используя Сайт, а также оформляя заказ через Сайт, по телефону, мессенджеры (WhatsApp, Telegram) или
                при доставке, Пользователь выражает согласие с настоящей Политикой и обработкой своих персональных
                данных.
              </p>
              <p>Если Пользователь не согласен с условиями Политики, он должен прекратить использование Сайта и сервисов.</p>
            </section>

            <section className="space-y-2">
              <h3 className="font-semibold text-foreground">2. Какие данные мы обрабатываем</h3>
              <p>Мы обрабатываем только те данные, которые пользователь предоставляет добровольно:</p>
              <ul className="list-disc space-y-1 pl-5">
                <li>имя</li>
                <li>номер телефона</li>
                <li>адрес доставки</li>
                <li>комментарий к заказу</li>
              </ul>
              <p>Также автоматически собираются технические данные:</p>
              <ul className="list-disc space-y-1 pl-5">
                <li>IP-адрес</li>
                <li>cookies</li>
                <li>данные о браузере и устройстве</li>
                <li>сведения о посещении страниц сайта</li>
              </ul>
              <p>Эти данные собираются с помощью сервиса веб-аналитики Яндекс.Метрика.</p>
              <p>Мы не обрабатываем специальные категории персональных данных (о здоровье, религии, политических взглядах и т.д.).</p>
            </section>

            <section className="space-y-2">
              <h3 className="font-semibold text-foreground">3. Цели обработки персональных данных</h3>
              <p>Персональные данные используются исключительно для:</p>
              <ul className="list-disc space-y-1 pl-5">
                <li>оформления и доставки заказа</li>
                <li>связи с клиентом по заказу</li>
                <li>уточнения адреса и времени доставки</li>
                <li>предотвращения мошенничества</li>
                <li>ведения внутреннего учета заказов</li>
                <li>улучшения работы сайта</li>
              </ul>
              <p>Мы <strong className="text-foreground">не используем</strong> персональные данные для рекламных рассылок и не передаем их рекламным компаниям.</p>
            </section>

            <section className="space-y-2">
              <h3 className="font-semibold text-foreground">4. Передача персональных данных</h3>
              <p>Мы не продаем и не распространяем персональные данные.</p>
              <p>Передача возможна только:</p>
              <ul className="list-disc space-y-1 pl-5">
                <li>сотрудникам, участвующим в приготовлении и доставке заказа</li>
                <li>службам доставки (курьерам)</li>
                <li>государственным органам — только в случаях, предусмотренных законом</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h3 className="font-semibold text-foreground">5. Хранение и защита данных</h3>
              <p>
                Персональные данные хранятся только столько, сколько необходимо для выполнения заказа и требований
                законодательства РФ (например, налогового учета).
              </p>
              <p>Мы принимаем необходимые организационные и технические меры для защиты данных от:</p>
              <ul className="list-disc space-y-1 pl-5">
                <li>утраты</li>
                <li>изменения</li>
                <li>несанкционированного доступа</li>
                <li>распространения</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h3 className="font-semibold text-foreground">6. Cookies и аналитика</h3>
              <p>
                На сайте используется сервис <strong className="text-foreground">Яндекс.Метрика</strong>, который
                собирает обезличенные данные о посещениях сайта для анализа и улучшения работы.
              </p>
              <p>Сервис может использовать cookies. Пользователь может отключить cookies в настройках браузера.</p>
            </section>

            <section className="space-y-2">
              <h3 className="font-semibold text-foreground">7. Права пользователя</h3>
              <p>Пользователь имеет право:</p>
              <ul className="list-disc space-y-1 pl-5">
                <li>узнать, какие его данные обрабатываются</li>
                <li>потребовать исправления данных</li>
                <li>отозвать согласие на обработку персональных данных</li>
                <li>потребовать удаление данных</li>
              </ul>
              <p>Для этого необходимо направить запрос на e-mail: <strong className="text-foreground">__________</strong>.</p>
              <p>
                Мы прекратим обработку персональных данных в течение 10 рабочих дней с момента получения обращения,
                если иное не требуется законодательством.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="font-semibold text-foreground">8. Изменение политики</h3>
              <p>Оператор вправе вносить изменения в настоящую Политику без предварительного уведомления.</p>
              <p>Актуальная версия всегда размещается на сайте.</p>
            </section>

            <section className="space-y-2">
              <h3 className="font-semibold text-foreground">9. Контакты</h3>
              <p>По всем вопросам, связанным с обработкой персональных данных, вы можете обратиться:</p>
              <p>
                E-mail: <strong className="text-foreground">__________</strong>
                <br />
                Оператор: <strong className="text-foreground">[ИП/ООО «__________»]</strong>
              </p>
            </section>
          </div>
        </DialogContent>
      </Dialog>
    </Dialog>
  )
}
