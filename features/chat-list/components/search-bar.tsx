"use client";

import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function SearchBar() {
  const [searchValue, setSearchValue] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = ["All", "Unread", "Favourites", "Groups"];

  const clearSearch = () => {
    setSearchValue("");
  };

  return (
    <div className="bg-wa-sidebar border-wa-border border-b px-3 py-2">
      <div className="relative mb-3">
        <Search className="text-wa-muted absolute top-1/2 left-3 z-10 h-4 w-4 -translate-y-1/2 transform" />
        <Input
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
          placeholder="Search or start a new chat"
          className="bg-wa-input text-wa-primary placeholder:text-wa-muted focus-visible:ring-wa-green h-9 rounded-lg border-none pr-10 pl-10 focus-visible:ring-1"
        />
        {searchValue && (
          <Button
            variant="ghost"
            size="icon"
            onClick={clearSearch}
            className="text-wa-muted hover:text-wa-primary hover:bg-wa-hover absolute top-1/2 right-1 h-7 w-7 -translate-y-1/2 transform rounded-full"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2">
        {filters.map(filter => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`rounded-full px-3 py-1.5 text-xs transition-all duration-200 ${
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
  );
}
