"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Minus, Plus } from "lucide-react"
import type { Product } from "@/lib/types"
import { getAssetPath } from "@/lib/utils"
import { useCartStore } from "@/hooks/use-cart-store"

interface ProductCardProps {
  product: Product
  onAddToCart: (product: Product) => void
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const { items, addItem, updateQuantity } = useCartStore()

  // Find all cart items for this product and sum their quantities
  const cartItems = items.filter((item) => item.product.id === product.id)
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  const handleAdd = () => {
    addItem(product, undefined, [], 1)
  }

  const handleIncrease = () => {
    if (cartItems.length > 0) {
      // Update the first cart item's quantity
      updateQuantity(cartItems[0].cartItemId, cartItems[0].quantity + 1)
    }
  }

  const handleDecrease = () => {
    if (cartItems.length > 0 && cartItems[0].quantity > 0) {
      updateQuantity(cartItems[0].cartItemId, cartItems[0].quantity - 1)
    }
  }

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-xl bg-card shadow-sm transition-all hover:shadow-lg">
      <div className="relative aspect-square w-full overflow-hidden rounded-xl">
        <Image
          src={getAssetPath(product.image || "/placeholder.svg")}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
        />
        {!product.available && (
          <Badge variant="secondary" className="absolute right-2 top-2">
            Нет в наличии
          </Badge>
        )}
      </div>
      <div className="flex flex-1 flex-col p-3">
        <h3 className="text-base font-semibold leading-tight text-card-foreground">{product.name}</h3>
        {product.description && (
          <p className="mt-0.5 text-xs text-muted-foreground">{product.description}</p>
        )}
        <div className="mt-auto flex flex-col gap-1 pt-1">
          <div className="flex items-center justify-between">
            <span className="whitespace-nowrap text-lg font-bold">{product.basePrice} ₽</span>
            {product.weight && <span className="text-sm text-muted-foreground">{product.weight}</span>}
          </div>
          {totalQuantity > 0 ? (
            <div className="flex h-9 w-full items-center justify-between rounded-md bg-[#E73F22] border border-transparent shadow-sm px-0 text-white">
              <Button
                onClick={handleDecrease}
                size="icon"
                variant="ghost"
                className="h-9 w-9 rounded-md p-0 text-white hover:bg-white/10 hover:text-white"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="text-sm font-semibold text-white">{totalQuantity}</span>
              <Button
                onClick={handleIncrease}
                size="icon"
                variant="ghost"
                className="h-9 w-9 rounded-md p-0 text-white hover:bg-white/10 hover:text-white"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Button
              onClick={handleAdd}
              disabled={!product.available}
              className="w-full h-9 transition-colors active:bg-[#E73F22] active:text-white active:border-none border-border shadow-sm"
            >
              Выбрать
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
