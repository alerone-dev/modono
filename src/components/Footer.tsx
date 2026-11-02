import Link from "next/link";
import { COMPANY, CONTACT_EMAIL } from "@/lib/constants";
import styles from "./Footer.module.css";

const LINKS = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <nav aria-label="Legal" className={styles.links}>
        {LINKS.map(({ label, href }) => (
          <Link key={href} href={href}>
            {label}
          </Link>
        ))}
      </nav>
      <p>
        Modono is a product of <a href={COMPANY.url}>{COMPANY.name}</a>
      </p>
      <p>
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> · {COMPANY.address}
      </p>
    </footer>
  );
}
