import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { TERMS_OF_SERVICE } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Terms of Service | Modono",
  description: TERMS_OF_SERVICE.description,
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return <LegalPage doc={TERMS_OF_SERVICE} />;
}
