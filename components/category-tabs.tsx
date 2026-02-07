"use client"

import type { ProductCategory } from "@/lib/types"

interface CategoryTabsProps {
  categories: { id: string; name: string }[]
  selectedCategory: ProductCategory | "all"
  onCategoryChange: (category: ProductCategory | "all") => void
}

export function CategoryTabs({ categories, selectedCategory, onCategoryChange }: CategoryTabsProps) {
  return (
    <div className="sticky top-16 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="w-full px-4 md:px-8 py-3">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`cursor-pointer rounded-md px-4 py-2 text-sm font-medium transition-colors border ${
                selectedCategory === category.id
                  ? "bg-zinc-200 text-black border-black"
                  : "bg-white text-zinc-700 border-zinc-200 hover:bg-zinc-100 hover:text-black"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
