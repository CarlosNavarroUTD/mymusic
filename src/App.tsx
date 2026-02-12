'use client';

import { useState, useEffect, useMemo } from "react";
import { Music, Loader2, AlertCircle } from "lucide-react";
import { SongCard } from "./components/SongCard";
import { ArtistSection } from "./components/ArtistSection";
import { SearchBar } from "./components/SearchBar";
import { Header } from "./components/Header";
import { EmptyState } from "./components/EmptyState";

export interface Song {
  row_number: number;
  videoID: string;
  title: string;
  channelTitle: string;
  thumbnail: string;
  playlistId: string;
}

const WEBHOOK_URL = "https://n8n.eabmodel.com/webhook/39660c1b-e56d-4256-871b-061ebafc3712";

export default function App() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<"all" | "title" | "artist">("all");
  const [viewMode, setViewMode] = useState<"artist" | "grid">("artist");

  useEffect(() => {
    async function fetchSongs() {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(WEBHOOK_URL);
        if (!response.ok) throw new Error("Error al cargar las canciones");
        const data = await response.json();

        let songList: Song[] = [];
        if (Array.isArray(data)) {
          songList = data;
        } else if (data && Array.isArray(data.data)) {
          songList = data.data;
        } else if (data && typeof data === "object") {
          const possibleArrays = Object.values(data);
          const found = possibleArrays.find((v) => Array.isArray(v));
          if (found) {
            songList = found as Song[];
          } else {
            songList = [data as Song];
          }
        }

        setSongs(songList);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido");
      } finally {
        setLoading(false);
      }
    }
    fetchSongs();
  }, []);

  const filteredSongs = useMemo(() => {
    if (!searchQuery.trim()) return songs;
    const query = searchQuery.toLowerCase();
    return songs.filter((song) => {
      if (filterType === "title") return song.title.toLowerCase().includes(query);
      if (filterType === "artist") return song.channelTitle.toLowerCase().includes(query);
      return (
        song.title.toLowerCase().includes(query) ||
        song.channelTitle.toLowerCase().includes(query)
      );
    });
  }, [songs, searchQuery, filterType]);

  const songsByArtist = useMemo(() => {
    const grouped: Record<string, Song[]> = {};
    for (const song of filteredSongs) {
      const artist = song.channelTitle || "Desconocido";
      if (!grouped[artist]) grouped[artist] = [];
      grouped[artist].push(song);
    }
    return Object.entries(grouped).sort((a, b) => a[0].localeCompare(b[0]));
  }, [filteredSongs]);

  const totalArtists = songsByArtist.length;
  const totalSongs = filteredSongs.length;

  return (
    <div className="min-h-screen bg-background">
      <Header totalSongs={songs.length} totalArtists={new Set(songs.map(s => s.channelTitle)).size} />

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filterType={filterType}
          setFilterType={setFilterType}
          viewMode={viewMode}
          setViewMode={setViewMode}
        />

        {/* Stats */}
        {!loading && !error && (
          <div className="mb-6 flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Music className="h-4 w-4" />
              {totalSongs} {totalSongs === 1 ? "cancion" : "canciones"}
            </span>
            <span className="h-1 w-1 rounded-full bg-muted-foreground" />
            <span>{totalArtists} {totalArtists === 1 ? "artista" : "artistas"}</span>
            {searchQuery && (
              <>
                <span className="h-1 w-1 rounded-full bg-muted-foreground" />
                <span className="text-primary">
                  Buscando: "{searchQuery}"
                </span>
              </>
            )}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-32">
            <div className="relative">
              <div className="absolute inset-0 animate-ping rounded-full bg-primary/20" />
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
            <p className="mt-6 text-lg text-muted-foreground">Cargando tu biblioteca musical...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="flex flex-col items-center justify-center py-32">
            <div className="rounded-full bg-destructive/10 p-4">
              <AlertCircle className="h-10 w-10 text-primary" />
            </div>
            <p className="mt-4 text-lg font-medium text-foreground">Error al cargar</p>
            <p className="mt-1 text-muted-foreground">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-6 rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Reintentar
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredSongs.length === 0 && (
          <EmptyState searchQuery={searchQuery} onClear={() => setSearchQuery("")} />
        )}

        {/* Artist View */}
        {!loading && !error && filteredSongs.length > 0 && viewMode === "artist" && (
          <div className="space-y-2">
            {songsByArtist.map(([artist, artistSongs]) => (
              <ArtistSection key={artist} artist={artist} songs={artistSongs} />
            ))}
          </div>
        )}

        {/* Grid View */}
        {!loading && !error && filteredSongs.length > 0 && viewMode === "grid" && (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredSongs.map((song) => (
              <SongCard key={song.videoID} song={song} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
