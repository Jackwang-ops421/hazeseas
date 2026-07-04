"use client";

import { useState } from "react";
import { Play } from "lucide-react";

interface TrailerButtonProps {
  videoId: string;
}

export function TrailerButton({ videoId }: TrailerButtonProps) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-black">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&playsinline=1`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      className="group relative block w-full cursor-pointer overflow-hidden rounded-lg"
      onClick={() => setPlaying(true)}
      aria-label="Play trailer"
    >
      <div className="relative aspect-video w-full">
        <img
          src="/images/hero-trailer-thumbnail.jpg"
          alt="Trailer thumbnail"
          className="size-full object-cover transition-all duration-200 group-hover:brightness-90"
        />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex size-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-md transition-transform duration-200 group-hover:scale-105 sm:size-20">
          <div className="flex size-11 items-center justify-center rounded-full bg-white shadow-lg transition-transform duration-200 group-hover:scale-110 sm:size-14">
            <Play className="size-5 fill-[hsl(var(--nav-theme))] text-[hsl(var(--nav-theme))] sm:size-6" />
          </div>
        </div>
      </div>
      <span className="absolute bottom-2.5 right-2.5 rounded-md bg-black/70 px-2 py-0.5 text-[11px] text-white">YouTube</span>
    </button>
  );
}
