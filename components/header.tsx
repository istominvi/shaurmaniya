"use client"

import { ShoppingBag, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCartStore } from "@/hooks/use-cart-store"
import { getAssetPath } from "@/lib/utils"
import Image from "next/image"

interface HeaderProps {
  onCartClick: () => void
  onLocationClick: () => void
}

export function Header({ onCartClick, onLocationClick }: HeaderProps) {
  const items = useCartStore((state) => state.items)
  const location = useCartStore((state) => state.location)
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-white shadow-sm">
      <div className="w-full px-4 md:px-8 flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Image
            src={getAssetPath("/images/shaurmania-logo.png")}
            alt="Шаурмания"
            width={120}
            height={40}
            className="h-8 w-auto brightness-0"
            priority
          />
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={onLocationClick} className="gap-2 text-black hover:bg-zinc-100">
            <MapPin className="h-4 w-4 text-black" />
            <span className="hidden md:inline text-black">{location?.type === "delivery" ? "Доставка" : "Самовывоз"}</span>
          </Button>

          <Button variant="ghost" size="sm" onClick={onCartClick} className="relative gap-2 text-black hover:bg-zinc-100">
            <ShoppingBag className="h-5 w-5 text-black" />
            {itemCount > 0 && (
              <Badge variant="destructive" className="absolute -right-1 -top-1 h-5 min-w-5 rounded-full p-0 text-xs bg-white text-black border border-black">
                {itemCount}
              </Badge>
            )}
            <span className="hidden md:inline text-black">Корзина</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
