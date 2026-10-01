import type { Metadata } from "next";
import { ContactPage } from "@/components/contact/contact-page";

export const metadata: Metadata = {
  title: "Contact",
  description: "Have a question about your results, your order, or how Zaro works? Send us a message.",
};

export default function Contact() {
  return <ContactPage />;
}
