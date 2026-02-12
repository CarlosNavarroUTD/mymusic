'use client';

import { Search, ListMusic, Grid3X3, X } from "lucide-react";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  filterType: "all" | "title" | "artist";
  setFilterType: (f: "all" | "title" | "artist") => void;
  viewMode: "artist" | "grid";
  setViewMode: (v: "artist" | "grid") => void;
}

export function SearchBar({
  searchQuery,
  setSearchQuery,
  filterType,
  setFilterType,
  viewMode,
  setViewMode,
}: SearchBarProps) {
  const filters: { label: string; value: "all" | "title" | "artist" }[] = [
    { label: "Todo", value: "all" },
    { label: "Cancion", value: "title" },
    { label: "Artista", value: "artist" },
  ];

  return (
    <div className="mb-6 space-y-4">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Buscar canciones o artistas..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-xl border border-border bg-card py-3.5 pl-12 pr-12 text-foreground placeholder-muted-foreground outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Filters and View Mode */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Buscar por:</span>
          <div className="flex rounded-lg border border-border bg-card p-1">
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => setFilterType(f.value)}
                className={`rounded-md px-3 py-1.5 text-sm font-medium transition-all ${
                  filterType === f.value
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex rounded-lg border border-border bg-card p-1">
          <button
            onClick={() => setViewMode("artist")}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-all ${
              viewMode === "artist"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <ListMusic className="h-4 w-4" />
            <span className="hidden sm:inline">Por Artista</span>
          </button>
          <button
            onClick={() => setViewMode("grid")}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-all ${
              viewMode === "grid"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Grid3X3 className="h-4 w-4" />
            <span className="hidden sm:inline">Cuadricula</span>
          </button>
        </div>
      </div>
    </div>
  );
}
