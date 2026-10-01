import type { Metadata } from "next";
import { PartnerPage } from "@/components/partner/partner-page";

export const metadata: Metadata = {
  title: "Dr. Rena Malik",
  description:
    "Zaro is partnering with Dr. Rena Malik, board-certified urologist, to help more people understand their hormones through their own blood.",
};

export default function RenaMalikPage() {
  return <PartnerPage />;
}
