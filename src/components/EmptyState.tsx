'use client';

import { Search } from "lucide-react";

interface EmptyStateProps {
  searchQuery: string;
  onClear: () => void;
}

export function EmptyState({ searchQuery, onClear }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-32">
      <div className="rounded-full bg-secondary p-4">
        <Search className="h-10 w-10 text-muted-foreground" />
      </div>
      <p className="mt-4 text-lg font-medium text-foreground">Sin resultados</p>
      <p className="mt-1 text-center text-muted-foreground">
        No se encontraron canciones para "{searchQuery}"
      </p>
      <button
        onClick={onClear}
        className="mt-6 rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
      >
        Limpiar busqueda
      </button>
    </div>
  );
}
