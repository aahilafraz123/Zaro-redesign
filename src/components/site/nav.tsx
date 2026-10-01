"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { Menu, X } from "lucide-react";
import { Logo } from "./logo";
import { LINKS, NAV } from "@/lib/content";
import { cn } from "@/lib/utils";

export function Nav() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isActive = (href: string) => !href.includes("#") && pathname.replace(/\/$/, "") === href;

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    setHidden(y > 640 && y > prev && !open);
  });

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
      animate={{ y: hidden ? -110 : 0 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      <nav
        aria-label="Main"
        className={cn(
          "relative flex w-full max-w-5xl items-center justify-between rounded-full py-2 pr-2 pl-5 transition-all duration-500",
          scrolled || open ? "glass" : "border border-transparent bg-transparent",
        )}
      >
        <Link href="/" aria-label="Zaro Health home" className="shrink-0">
          <Logo className="h-[22px]" />
        </Link>

        <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-0.5 lg:flex">
          {NAV.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={cn(
                  "rounded-full px-3.5 py-2 text-[14px] font-medium whitespace-nowrap transition-colors hover:bg-ink/[0.04] hover:text-ink",
                  isActive(item.href) ? "bg-ink/[0.05] text-ink" : "text-ink-2",
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={LINKS.getStarted}
            className="hidden rounded-full bg-ink px-5 py-2.5 text-[14px] font-semibold text-white transition-colors hover:bg-teal-night sm:inline-flex"
          >
            Get started
          </a>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid size-10 place-items-center rounded-full text-ink lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="glass absolute inset-x-0 top-[calc(100%+8px)] rounded-3xl p-3 lg:hidden"
            >
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-2xl px-4 py-3 text-[16px] font-medium text-ink"
                >
                  {item.label}
                </Link>
              ))}
              <a
                href={LINKS.getStarted}
                className="mt-2 block rounded-2xl bg-teal px-4 py-3 text-center text-[16px] font-semibold text-white"
              >
                Get started
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}
