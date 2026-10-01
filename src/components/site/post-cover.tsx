import type { Post } from "@/lib/content";
import { cn } from "@/lib/utils";

const TONES: Record<Post["cover"]["tone"], { bg: string; ink: string; sub: string; ring: string }> = {
  teal: { bg: "bg-[linear-gradient(140deg,#069494,#068080)]", ink: "text-white", sub: "text-white/75", ring: "border-white/25" },
  night: { bg: "bg-[linear-gradient(140deg,#0c3b3b,#0f4d4d)]", ink: "text-white", sub: "text-teal-soft", ring: "border-teal/40" },
  sand: { bg: "bg-sand", ink: "text-ink", sub: "text-ink-3", ring: "border-line" },
  sage: { bg: "bg-[linear-gradient(140deg,#dfeae3,#c9dccf)]", ink: "text-[#2f4a3a]", sub: "text-sage", ring: "border-sage/30" },
  mist: { bg: "bg-teal-mist", ink: "text-teal-night", sub: "text-teal", ring: "border-teal/25" },
};

// Typographic covers in the brand palette instead of stock photography.
export function PostCover({ post, size = "md", className }: { post: Post; size?: "md" | "lg"; className?: string }) {
  const t = TONES[post.cover.tone];
  return (
    <div className={cn("relative isolate flex flex-col justify-end overflow-hidden p-6 md:p-8", t.bg, className)} aria-hidden>
      <span className={cn("absolute -top-16 -right-16 size-56 rounded-full border", t.ring)} />
      <span className={cn("absolute -top-4 -right-4 size-32 rounded-full border", t.ring)} />
      <span className="absolute top-6 left-6 font-mono text-[10px] tracking-[0.2em] uppercase opacity-70 md:top-8 md:left-8">
        <span className={t.sub}>{post.topic}</span>
      </span>
      <p
        className={cn(
          "display relative transition-transform duration-700 ease-out group-hover:-translate-y-1",
          t.ink,
          size === "lg" ? "text-[clamp(4rem,9vw,8rem)]" : "text-[clamp(3rem,5vw,4.25rem)]",
        )}
      >
        {post.cover.glyph}
      </p>
      <p className={cn("relative mt-2 font-mono text-[11px] tracking-wider uppercase", t.sub)}>{post.cover.caption}</p>
    </div>
  );
}
