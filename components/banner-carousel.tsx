"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { cn } from "@/lib/utils"

const BANNERS = [
  {
    id: 1,
    image: "/beef-shawarma-with-pickles-and-sauce.jpg",
    alt: "Вкусная говяжья шаурма",
  },
  {
    id: 2,
    image: "/delicious-shawarma-wrap-with-chicken-and-vegetable.jpg",
    alt: "Куриная шаурма с овощами",
  },
  {
    id: 3,
    image: "/crispy-french-fries.png",
    alt: "Хрустящий картофель фри",
  },
  {
    id: 4,
    image: "/shawarma-combo-with-fries-and-drink.jpg",
    alt: "Комбо с шаурмой",
  },
]

export function BannerCarousel() {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

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
          loop: true,
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
              className="pl-2 basis-[82%] md:basis-[70%] lg:basis-[60%] cursor-pointer"
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
                href="#"
                className="block cursor-pointer h-full"
                onClick={(e) => {
                  if (current !== index) {
                    e.preventDefault()
                  }
                }}
              >
                <div className="relative aspect-[21/9] rounded-2xl md:rounded-3xl">
                  <div className="absolute inset-0 overflow-hidden rounded-2xl md:rounded-3xl">
                    <Image
                      src={banner.image}
                      alt={banner.alt}
                      fill
                      className="object-cover"
                      priority={banner.id === 1}
                    />
                  </div>
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Navigation Dots */}
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
    </section>
  )
}
