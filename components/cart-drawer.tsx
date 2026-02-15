"use client"

import Image from "next/image"
import { Minus, Plus, ShoppingBag, Store, Trash2, Truck } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { getAssetPath } from "@/lib/utils"
import { useCartStore } from "@/hooks/use-cart-store"

interface CartDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCheckout: () => void
  onLocationClick: () => void
}

export function CartDrawer({ open, onOpenChange, onCheckout, onLocationClick }: CartDrawerProps) {
  const { items, deliveryFee, total, updateQuantity, removeItem, location } = useCartStore()
  const locationType = location?.type ?? "delivery"
  const LocationIcon = locationType === "delivery" ? Truck : Store

  if (items.length === 0) {
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent side="right" className="w-full sm:max-w-lg">
          <SheetHeader>
            <SheetTitle>Корзина</SheetTitle>
          </SheetHeader>
          <div className="flex h-[calc(100vh-8rem)] flex-col items-center justify-center gap-4">
            <ShoppingBag className="h-16 w-16 text-muted-foreground" />
            <p className="text-center text-muted-foreground">Ваша корзина пуста</p>
            <Button onClick={() => onOpenChange(false)}>Перейти к меню</Button>
          </div>
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="flex flex-col h-full w-full p-0 sm:max-w-lg">
        <SheetHeader className="border-b border-border p-6">
          <SheetTitle>Корзина</SheetTitle>
        </SheetHeader>

        <ScrollArea className="flex-1 overflow-y-auto">
          <div className="space-y-4 p-6">
            {items.map((item) => (
              <div key={item.cartItemId} className="group relative rounded-lg border border-border p-4">
                <div className="flex gap-4">
                  <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md bg-muted">
                    <Image
                      src={getAssetPath(item.product.image || "/placeholder.svg")}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>

                  <div className="flex flex-1 flex-col gap-2">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="font-semibold leading-tight">{item.product.name}</h4>
                        {item.variant && <p className="text-sm text-muted-foreground">{item.variant.name}</p>}
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100"
                        onClick={() => removeItem(item.cartItemId)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    {item.modifiers.length > 0 && (
                      <div className="space-y-1">
                        {item.modifiers.map((modifier) => (
                          <div key={modifier.modifierId} className="text-xs text-muted-foreground">
                            {modifier.modifierName}: {modifier.options.map((opt) => opt.optionName).join(", ")}
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="flex h-8 items-center justify-between rounded-md bg-[#E73F22] border border-transparent px-0 text-white shadow-sm">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-md p-0 text-white hover:bg-white/10 hover:text-white"
                          onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="min-w-8 text-center text-sm font-semibold text-white">{item.quantity}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-md p-0 text-white hover:bg-white/10 hover:text-white"
                          onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      <span className="font-semibold">{item.totalPrice} ₽</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="mt-auto border-t border-border bg-background p-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-auto p-0 text-muted-foreground hover:bg-transparent hover:text-foreground"
                onClick={onLocationClick}
              >
                <LocationIcon className="h-4 w-4" />
                {locationType === "delivery" ? "Доставка" : "Самовывоз"}
              </Button>
              {locationType === "delivery" ? (
                <span className="font-medium">{deliveryFee} ₽</span>
              ) : (
                <span className="font-medium text-primary">Бесплатно</span>
              )}
            </div>
            <Separator />
            <div className="flex items-center justify-between text-lg font-bold">
              <span>Итого</span>
              <span>{total} ₽</span>
            </div>

            <Button
              className="w-full h-10 transition-colors active:bg-[#E73F22] active:text-white active:border-none border-border shadow-sm"
              size="lg"
              onClick={onCheckout}
            >
              Оформить заказ
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
