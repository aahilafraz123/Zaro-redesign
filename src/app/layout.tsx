import type { Metadata } from "next";
import { DM_Mono, Inclusive_Sans, Quicksand } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/site/nav";
import { Footer } from "@/components/site/footer";
import { SmoothScroll } from "@/components/site/smooth-scroll";

const inclusive = Inclusive_Sans({
  variable: "--font-inclusive",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
});

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: {
    default: "Zaro Health: Know what's happening inside your body",
    template: "%s · Zaro Health",
  },
  description:
    "One blood draw at Quest, 100+ lab markers, and a single Zaro Score with a daily plan to improve it. FSA/HSA eligible, no doctor visit required.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inclusive.variable} ${quicksand.variable} ${dmMono.variable} antialiased`}
    >
      <body className="min-h-full bg-white text-ink">
        <SmoothScroll />
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
