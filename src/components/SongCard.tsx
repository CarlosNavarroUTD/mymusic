import { ExternalLink, Play } from "lucide-react";
import type { Song } from "../App";

interface SongCardProps {
  song: Song;
}

export function SongCard({ song }: SongCardProps) {
  const youtubeUrl = `https://music.youtube.com/watch?v=${song.videoID}&list=${song.playlistId}`;

  return (
    <a
      href={youtubeUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video w-full overflow-hidden bg-secondary">
        <img
          src={song.thumbnail || "/placeholder.svg"}
          alt={song.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          crossOrigin="anonymous"
          loading="lazy"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-background/40 opacity-0 transition-opacity group-hover:opacity-100">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary shadow-lg">
            <Play className="h-5 w-5 text-primary-foreground" fill="currentColor" />
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <p className="truncate text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
          {song.title}
        </p>
        <p className="mt-1 truncate text-xs text-muted-foreground">{song.channelTitle}</p>
      </div>
    </a>
  );
}
