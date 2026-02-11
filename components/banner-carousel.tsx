"use client"

import * as React from "react"
import Image from "next/image"
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
    <section className="bg-[#E73F22] py-4 overflow-hidden">
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
        <CarouselContent className="-ml-2 md:-ml-4">
          {BANNERS.map((banner) => (
            <CarouselItem key={banner.id} className="pl-2 md:pl-4 basis-[82%] md:basis-[70%] lg:basis-[60%]">
              <div className="relative aspect-[21/9] overflow-hidden rounded-2xl md:rounded-3xl shadow-lg border-2 border-white/10">
                <Image
                  src={banner.image}
                  alt={banner.alt}
                  fill
                  className="object-cover"
                  priority={banner.id === 1}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Navigation Dots */}
      <div className="flex justify-center gap-2 mt-4">
        {Array.from({ length: count }).map((_, index) => (
          <button
            key={index}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
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
