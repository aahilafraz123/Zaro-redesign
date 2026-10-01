import Link from "next/link";
import { LINKS, SOCIAL } from "@/lib/content";
import { Logo } from "./logo";
import { asset } from "@/lib/utils";

const COLS: { h: string; l: [string, string][] }[] = [
  {
    h: "Product",
    l: [
      ["How it works", "/#how"],
      ["Panels", "/#panels"],
      ["Our tests", "https://zarohealth.com/our-tests"],
      ["Pricing", "https://zarohealth.com/pricing"],
    ],
  },
  {
    h: "Learn",
    l: [
      ["Zaro Journal", "/blog"],
      ["Dr. Rena Malik", "/dr-rena-malik"],
      ["FAQ", "/#faq"],
      ["About", "https://zarohealth.com/about"],
    ],
  },
  {
    h: "Legal",
    l: [
      ["Terms of Service", "https://zarohealth.com/terms"],
      ["Privacy Policy", "https://zarohealth.com/privacy"],
      ["HIPAA Authorization", "https://zarohealth.com/hipaa-authorization"],
      ["Contact", "/contact"],
    ],
  },
];

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  const cls = "text-[15px] text-ink-2 transition-colors hover:text-ink";
  return href.startsWith("/") ? (
    <Link href={href} className={cls}>
      {children}
    </Link>
  ) : (
    <a href={href} className={cls}>
      {children}
    </a>
  );
}

export function Footer() {
  return (
    <footer className="bg-white pt-20 pb-10">
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo className="h-6" />
            <p className="mt-5 max-w-xs text-[15px] leading-relaxed text-ink-2">
              Preventive health intelligence for everyone. Know your body before it tells you something is wrong.
            </p>
            <div className="mt-6 flex items-center gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={asset("/logos/app-qr-code.svg")}
                alt="Scan to download the Zaro app"
                width={104}
                height={104}
                className="rounded-xl border border-line"
              />
              <div className="flex flex-col gap-2">
                <a href={LINKS.appStore} className="block transition-opacity hover:opacity-80">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={asset("/badges/app-store.svg")} alt="Download on the App Store" width={120} height={40} className="h-10 w-auto" />
                </a>
                <a href={LINKS.googlePlay} className="block transition-opacity hover:opacity-80">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={asset("/badges/google-play.png")} alt="Get it on Google Play" width={134} height={40} className="h-10 w-auto" />
                </a>
              </div>
            </div>
          </div>
          {COLS.map((c) => (
            <div key={c.h}>
              <p className="font-mono text-[11px] tracking-[0.16em] text-ink-3 uppercase">{c.h}</p>
              <ul className="mt-4 space-y-2.5">
                {c.l.map(([t, href]) => (
                  <li key={t}>
                    <FooterLink href={href}>{t}</FooterLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <ul className="mt-14 flex flex-wrap gap-2">
          {SOCIAL.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-[13px] font-semibold text-ink-2 transition-colors hover:border-teal hover:text-teal"
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-col gap-3 border-t border-line pt-6 text-[13px] text-ink-3 md:flex-row md:items-center md:justify-between">
          <p>© 2026 Zaro Health, Inc. All rights reserved.</p>
          <p>FSA/HSA eligible · Quest Diagnostics · Labcorp & BioReference coming soon</p>
        </div>
      </div>
    </footer>
  );
}
