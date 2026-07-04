"use client";

import { useState, useRef, useEffect } from "react";
import { Play } from "lucide-react";

interface TrailerCardProps {
  videoId: string;
  onPlay: () => void;
}

export function TrailerCard({ videoId, onPlay }: TrailerCardProps) {
  return (
    <button
      type="button"
      className="w-full cursor-pointer"
      onClick={onPlay}
      aria-label="Play trailer"
    >
      <div className="group relative overflow-hidden rounded-2xl border border-border shadow-lg transition-all duration-200">
        <div className="relative aspect-video w-full">
          <img
            src="/images/hero-trailer-thumbnail.jpg"
            alt="Trailer thumbnail"
            className="size-full object-cover transition-all duration-200 group-hover:brightness-80"
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex size-20 items-center justify-center rounded-full bg-primary/10 backdrop-blur-md transition-transform duration-200 group-hover:scale-105 sm:size-24">
            <div className="flex size-14 items-center justify-center rounded-full bg-gradient-to-b from-primary/30 to-primary shadow-md transition-transform duration-200 group-hover:scale-110 sm:size-16">
              <Play
                className="size-6 fill-white text-white sm:size-7"
                style={{ filter: "drop-shadow(rgba(0,0,0,0.07) 0 4px 3px) drop-shadow(rgba(0,0,0,0.06) 0 2px 2px)" }}
              />
            </div>
          </div>
        </div>
        <span className="absolute bottom-2.5 right-2.5 rounded-md bg-black/70 px-2 py-0.5 text-[11px] text-white">YouTube</span>
      </div>
    </button>
  );
}

interface TrailerDialogProps {
  videoId: string;
  open: boolean;
  onClose: () => void;
}

export function TrailerDialog({ videoId, open, onClose }: TrailerDialogProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (open && iframeRef.current) {
      iframeRef.current.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&playsinline=1`;
    }
    if (!open && iframeRef.current) {
      iframeRef.current.src = "";
    }
  }, [open, videoId]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="relative mx-4 w-full max-w-4xl">
        <iframe
          ref={iframeRef}
          className="aspect-video w-full rounded-xl"
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
          title="Trailer"
        />
        <button
          className="absolute -top-10 right-0 text-sm font-medium text-white/80 hover:text-white"
          onClick={onClose}
        >
          ✕ Close
        </button>
      </div>
    </div>
  );
}

interface TrailerButtonProps {
  videoId: string;
}

export function TrailerButton({ videoId }: TrailerButtonProps) {
  const [open, setOpen] = useState(false);
  if (!videoId) return null;
  return (
    <>
      <TrailerCard videoId={videoId} onPlay={() => setOpen(true)} />
      <TrailerDialog videoId={videoId} open={open} onClose={() => setOpen(false)} />
    </>
  );
}
