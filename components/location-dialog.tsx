"use client"

import { useState } from "react"
import { Store, Truck } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useCartStore } from "@/hooks/use-cart-store"
import type { LocationInfo } from "@/lib/types"
import branches from "@/lib/branches.json"

const BRANCHES = branches.map((branch) => branch.address)

interface LocationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function LocationDialog({ open, onOpenChange }: LocationDialogProps) {
  const location = useCartStore((state) => state.location)
  const setLocation = useCartStore((state) => state.setLocation)

  const [locationType, setLocationType] = useState<"delivery" | "pickup">(location?.type || "delivery")
  const [address, setAddress] = useState(location?.type === "delivery" ? location?.address || "" : "")
  const [selectedBranch, setSelectedBranch] = useState(location?.type === "pickup" ? location?.address || "" : "")

  const handleSave = () => {
    const trimmedAddress = address.trim()
    const newLocation: LocationInfo = {
      type: locationType,
    }

    if (locationType === "delivery" && trimmedAddress) {
      newLocation.address = trimmedAddress
    } else if (locationType === "pickup" && selectedBranch) {
      newLocation.address = selectedBranch
    }

    setLocation(newLocation)
    onOpenChange(false)
  }

  const isSaveDisabled = (locationType === "delivery" && !address.trim()) || (locationType === "pickup" && !selectedBranch)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md rounded-3xl border-none shadow-xl">
        <DialogHeader>
          <DialogTitle>Способ получения</DialogTitle>
          <DialogDescription>Выберите доставку или самовывоз</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <RadioGroup value={locationType} onValueChange={(value) => setLocationType(value as "delivery" | "pickup")}>
            <div className="space-y-3">
              <div
                className={`flex cursor-pointer flex-col gap-4 rounded-md border p-4 transition-all duration-300 ${
                  locationType === "delivery"
                    ? "border-[#E73F22] bg-[#E73F22]/50"
                    : "border-zinc-200 bg-white hover:bg-zinc-50"
                }`}
                onClick={() => setLocationType("delivery")}
              >
                <div className="flex items-start gap-4">
                  <RadioGroupItem value="delivery" id="delivery" className="mt-1" />
                  <div className="flex-1">
                    <Label htmlFor="delivery" className="flex cursor-pointer items-center gap-2 font-semibold">
                      <Truck className="h-5 w-5" />
                      Доставка
                    </Label>
                    <p className="mt-1 text-sm text-muted-foreground">Доставим по вашему адресу за 100 ₽</p>
                  </div>
                </div>

                <div
                  className={`overflow-hidden pl-8 transition-all duration-300 ease-out ${
                    locationType === "delivery" ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                  }`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="space-y-2 pt-1">
                    <Label htmlFor="address">
                      Адрес доставки <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="address"
                      placeholder="ул. Ленина, 45, кв. 10"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">Укажите улицу, дом, квартиру</p>
                  </div>
                </div>
              </div>

              <div
                className={`flex cursor-pointer flex-col gap-4 rounded-md border p-4 transition-all duration-300 ${
                  locationType === "pickup"
                    ? "border-[#E73F22] bg-[#E73F22]/50"
                    : "border-zinc-200 bg-white hover:bg-zinc-50"
                }`}
                onClick={() => setLocationType("pickup")}
              >
                <div className="flex items-start gap-4">
                  <RadioGroupItem value="pickup" id="pickup" className="mt-1" />
                  <div className="flex-1">
                    <Label htmlFor="pickup" className="flex cursor-pointer items-center gap-2 font-semibold">
                      <Store className="h-5 w-5" />
                      Самовывоз
                    </Label>
                    <p className="mt-1 text-sm text-muted-foreground">Заберите заказ сами - бесплатно</p>
                  </div>
                </div>

                <div
                  className={`overflow-hidden pl-8 transition-all duration-300 ease-out ${
                    locationType === "pickup" ? "max-h-72 opacity-100" : "max-h-0 opacity-0"
                  }`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <RadioGroup
                    value={selectedBranch}
                    onValueChange={setSelectedBranch}
                    className="max-h-52 space-y-1 overflow-y-auto pr-2 [scrollbar-color:#E73F22_#e4e4e7] [scrollbar-width:thin] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#E73F22] [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-zinc-200 [&::-webkit-scrollbar]:w-2"
                  >
                    {BRANCHES.map((branch) => (
                      <div key={branch} className="flex items-center space-x-2 py-1.5">
                        <RadioGroupItem value={branch} id={branch} />
                        <Label htmlFor={branch} className="cursor-pointer text-sm font-normal">
                          {branch}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </div>
            </div>
          </RadioGroup>

          <Button
            className="h-9 w-full border-border shadow-sm transition-colors active:border-none active:bg-[#E73F22] active:text-white"
            onClick={handleSave}
            disabled={isSaveDisabled}
          >
            Сохранить
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
