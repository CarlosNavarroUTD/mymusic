import { ExternalLink, Play } from "lucide-react";
import type { Song } from "../App";

interface SongRowProps {
  song: Song;
  index: number;
  isLast: boolean;
}

export function SongRow({ song, index, isLast }: SongRowProps) {
  const youtubeUrl = `https://music.youtube.com/watch?v=${song.videoID}&list=${song.playlistId}`;

  return (
    <a
      href={youtubeUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`group flex items-center gap-4 px-5 py-3 transition-colors hover:bg-accent/50 ${
        !isLast ? "border-b border-border/50" : ""
      }`}
    >
      {/* Thumbnail */}
      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg">
        <img
          src={song.thumbnail || "/placeholder.svg"}
          alt={song.title}
          className="h-full w-full object-cover"
          crossOrigin="anonymous"
          loading="lazy"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-background/60 opacity-0 transition-opacity group-hover:opacity-100">
          <Play className="h-5 w-5 text-primary" fill="currentColor" />
        </div>
      </div>

      {/* Song Info */}
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-foreground group-hover:text-primary transition-colors">
          {song.title}
        </p>
        <p className="truncate text-xs text-muted-foreground">{song.channelTitle}</p>
      </div>

      {/* External Link Icon */}
      <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
    </a>
  );
}
