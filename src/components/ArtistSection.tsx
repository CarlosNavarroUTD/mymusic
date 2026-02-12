'use client';

import { useState } from "react";
import { ChevronDown, ChevronRight, User } from "lucide-react";
import type { Song } from "../App";
import { SongRow } from "./SongRow";

interface ArtistSectionProps {
  artist: string;
  songs: Song[];
}

export function ArtistSection({ artist, songs }: ArtistSectionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <button
        onClick={() => setIsOpen(prev => !prev)}
        className="flex w-full items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-accent/50"
      >
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary">
          <User className="h-5 w-5 text-muted-foreground" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm font-semibold text-foreground">{artist}</h3>
          <p className="text-xs text-muted-foreground">
            {songs.length} {songs.length === 1 ? "cancion" : "canciones"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
            {songs.length}
          </span>
          {isOpen ? (
            <ChevronDown className="h-5 w-5 text-muted-foreground transition-transform" />
          ) : (
            <ChevronRight className="h-5 w-5 text-muted-foreground transition-transform" />
          )}
        </div>
      </button>

      {isOpen && (
        <div className="border-t border-border">
          {songs.map((song, index) => (
            <SongRow key={song.videoID} song={song} index={index} isLast={index === songs.length - 1} />
          ))}
        </div>
      )}
    </div>
  );
}
