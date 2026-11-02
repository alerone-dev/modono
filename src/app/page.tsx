import Image from "next/image";
import { SocialIcon } from "@/components/SocialIcon";
import WaitlistForm from "@/components/WaitlistForm";
import { SOCIALS } from "@/lib/constants";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <span className={styles.tag}>Coming soon</span>
        <h1 className={styles.wordmark}>
          <Image src="/wordmark.svg" alt="Modono" width={824} height={160} priority />
        </h1>
        <p className={styles.tagline}>Booking software and CRM for businesses</p>

        <WaitlistForm />

        <ul className={styles.socials}>
          {SOCIALS.map(({ label, href, icon }) => (
            <li key={icon}>
              <a
                href={href}
                aria-label={label}
                data-tooltip={label}
                {...(icon === "mail" ? {} : { target: "_blank", rel: "noopener noreferrer" })}
              >
                <SocialIcon icon={icon} />
              </a>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
