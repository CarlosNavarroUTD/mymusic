import { Music } from "lucide-react";

interface HeaderProps {
  totalSongs: number;
  totalArtists: number;
}

export function Header({ totalSongs, totalArtists }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
            <Music className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground sm:text-xl">Mi Biblioteca Musical</h1>
            <p className="hidden text-xs text-muted-foreground sm:block">
              YouTube Music Collection
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden items-center gap-6 sm:flex">
            <div className="text-center">
              <p className="text-xl font-bold text-foreground">{totalSongs}</p>
              <p className="text-xs text-muted-foreground">Canciones</p>
            </div>
            <div className="h-8 w-px bg-border" />
            <div className="text-center">
              <p className="text-xl font-bold text-foreground">{totalArtists}</p>
              <p className="text-xs text-muted-foreground">Artistas</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
