"use client"

import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function SearchBar() {
  const [searchValue, setSearchValue] = useState("")
  const [activeFilter, setActiveFilter] = useState("All")

  const filters = ["All", "Unread", "Favourites", "Groups"]

  const clearSearch = () => {
    setSearchValue("")
  }

  return (
    <div className="px-3 py-2 bg-wa-sidebar border-b border-wa-border">
      <div className="relative mb-3">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-wa-muted w-4 h-4 z-10" />
        <Input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search or start a new chat"
          className="pl-10 pr-10 h-9 bg-wa-input border-none text-wa-primary placeholder:text-wa-muted focus-visible:ring-1 focus-visible:ring-wa-green rounded-lg"
        />
        {searchValue && (
          <Button
            variant="ghost"
            size="icon"
            onClick={clearSearch}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 w-7 h-7 text-wa-muted hover:text-wa-primary hover:bg-wa-hover rounded-full"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-3 py-1.5 text-xs rounded-full transition-all duration-200 ${
              activeFilter === filter
                ? "bg-wa-green text-white shadow-sm"
                : "text-wa-muted hover:text-wa-primary hover:bg-wa-hover"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>
    </div>
  )
}
