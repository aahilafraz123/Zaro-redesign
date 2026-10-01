import type { Metadata } from "next";
import { Journal } from "@/components/journal/journal";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Practical, science-grounded guides on blood testing, biomarkers, and how to actually use your results.",
};

export default function BlogPage() {
  return <Journal />;
}
