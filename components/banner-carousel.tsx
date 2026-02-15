"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { cn, getAssetPath } from "@/lib/utils"
import bannersData from "@/lib/banners.json"

interface Banner {
  id: string
  image: string
  link: string
}

const BANNERS = bannersData as Banner[]


export function BannerCarousel() {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

  const shouldLoop = BANNERS.length > 1

  if (BANNERS.length === 0) {
    return null
  }

  React.useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap())

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  return (
    <section className="bg-[#E73F22] py-2">
      <Carousel
        setApi={setApi}
        opts={{
          align: "center",
          loop: shouldLoop,
        }}
        plugins={[
          Autoplay({
            delay: 4000,
          }),
        ]}
        className="w-full"
      >
        <CarouselContent className="-ml-2">
          {BANNERS.map((banner, index) => (
            <CarouselItem
              key={banner.id}
              className="pl-2 basis-[80%] md:basis-[74%] lg:basis-[68%] cursor-pointer"
              onClick={() => {
                if (!api) return
                if (index === (current - 1 + BANNERS.length) % BANNERS.length) {
                  api.scrollPrev()
                } else if (index === (current + 1) % BANNERS.length) {
                  api.scrollNext()
                }
              }}
            >
              <Link
                href={banner.link || "#"}
                className="block cursor-pointer h-full"
                onClick={(e) => {
                  if (current !== index) {
                    e.preventDefault()
                  }
                }}
              >
                <div className="relative aspect-[2/1] rounded-xl border border-white/50 bg-transparent">
                  <div className="absolute inset-0 overflow-hidden rounded-xl">
                    <Image
                      src={getAssetPath(banner.image)}
                      alt={`Баннер ${index + 1}`}
                      fill
                      className="object-cover"
                      priority={index === 0}
                    />
                  </div>
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Navigation Dots */}
      {count > 1 && (
        <div className="flex justify-center gap-2 mt-2">
        {Array.from({ length: count }).map((_, index) => (
          <button
            key={index}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300 cursor-pointer",
              current === index ? "w-8 bg-white" : "w-1.5 bg-white/40"
            )}
            onClick={() => api?.scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
        </div>
      )}
    </section>
  )
}
