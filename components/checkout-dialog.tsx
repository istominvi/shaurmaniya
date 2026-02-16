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
import { PrivacyPolicyContent } from "@/components/privacy-policy-content"

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
            <div className="flex items-center gap-3">
              <Checkbox
                id="policy-consent"
                checked={isPolicyAccepted}
                onCheckedChange={(checked) => setIsPolicyAccepted(Boolean(checked))}
                disabled={isSubmitting}
              />
              <div className="min-w-0 overflow-x-auto">
                <span className="whitespace-nowrap text-sm leading-5 text-foreground">
                  Я соглашаюсь с
                  <button
                    type="button"
                    onClick={() => setIsPolicyOpen(true)}
                    className="ml-1 inline font-medium text-[#E73F22] underline underline-offset-2"
                  >
                    политикой обработки персональных данных
                  </button>
                </span>
              </div>
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

          <PrivacyPolicyContent />
        </DialogContent>
      </Dialog>
    </Dialog>
  )
}
