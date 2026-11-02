import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { PRIVACY_POLICY } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Privacy Policy | Modono",
  description: PRIVACY_POLICY.description,
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return <LegalPage doc={PRIVACY_POLICY} />;
}
