import Image from "next/image";
import Link from "next/link";
import type { LegalDocument } from "@/lib/legal";
import styles from "./LegalPage.module.css";

export default function LegalPage({ doc }: { doc: LegalDocument }) {
  return (
    <main className={styles.main}>
      <Link href="/" className={styles.home} aria-label="Modono home">
        <Image src="/wordmark.svg" alt="Modono" width={824} height={160} priority />
      </Link>

      <article className={styles.article}>
        <h1 className={styles.title}>{doc.title}</h1>
        <p className={styles.updated}>Last updated: {doc.updated}</p>
        <p className={styles.intro}>{doc.intro}</p>

        {doc.sections.map((section) => (
          <section key={section.heading} id={section.id} className={styles.section}>
            <h2>{section.heading}</h2>
            {section.paragraphs?.map((p) => <p key={p}>{p}</p>)}
            {section.bullets && (
              <ul>
                {section.bullets.map((b) => <li key={b}>{b}</li>)}
              </ul>
            )}
            {section.after?.map((p) => <p key={p}>{p}</p>)}
          </section>
        ))}
      </article>
    </main>
  );
}
