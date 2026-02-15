"use client"

import { ShoppingBag, Store, Truck } from "lucide-react"
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
  const locationType = location?.type ?? "delivery"
  const LocationIcon = locationType === "delivery" ? Truck : Store

  return (
    <header className="sticky top-0 z-50 w-full bg-[#E73F22]">
      <div className="w-full px-4 md:px-8 flex h-16 items-center justify-between">
        <div className="flex items-center min-w-0">
          <Image
            src={getAssetPath("/images/logo_header.svg")}
            alt="Шаурмания"
            width={284}
            height={40}
            className="h-8 w-auto max-w-full object-contain"
            priority
          />
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={onLocationClick} className="gap-2 text-white hover:bg-white/10">
            <LocationIcon className="h-4 w-4 text-white" />
            <span className="hidden md:inline text-white">{locationType === "delivery" ? "Доставка" : "Самовывоз"}</span>
          </Button>

          <Button variant="ghost" size="sm" onClick={onCartClick} className="relative gap-2 text-white hover:bg-white/10">
            <ShoppingBag className="h-5 w-5 text-white" />
            {itemCount > 0 && (
              <Badge variant="destructive" className="absolute -right-1 -top-1 h-5 min-w-5 rounded-full p-0 text-xs bg-white text-[#E73F22] border border-white">
                {itemCount}
              </Badge>
            )}
            <span className="hidden md:inline text-white">Корзина</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
