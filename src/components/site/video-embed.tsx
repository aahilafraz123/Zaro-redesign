"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";

// Loads YouTube only after a click: faster pages and no third-party cookies until the viewer opts in.
export function VideoEmbed({ id, title, className }: { id: string; title: string; className?: string }) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className={cn("group relative aspect-video overflow-hidden rounded-3xl bg-teal-night", className)}>
      {playing ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`Play video: ${title}`}
          className="absolute inset-0 h-full w-full text-left"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
            alt=""
            loading="lazy"
            className="absolute inset-0 h-full w-full scale-[1.02] object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <span className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,59,59,0)_40%,rgba(12,59,59,0.85))]" />
          <span className="absolute top-1/2 left-1/2 grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-teal-night shadow-xl backdrop-blur transition-transform duration-500 group-hover:scale-110">
            <Play className="ml-0.5 size-6 fill-current" />
          </span>
          <span className="absolute inset-x-0 bottom-0 p-5 text-[15px] leading-snug font-semibold text-white">{title}</span>
        </button>
      )}
    </div>
  );
}
