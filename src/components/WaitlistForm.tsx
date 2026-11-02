"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { emailSchema } from "@/lib/validation";
import styles from "./WaitlistForm.module.css";

// "exists": the email was already subscribed, shown like a success
type Status = "idle" | "loading" | "success" | "exists" | "error";
type Mode = "subscribe" | "unsubscribe";

const COPY = {
  subscribe: {
    endpoint: "/api/waitlist",
    button: "Notify Me",
    done: "Subscribed",
    success: "You're on the list. Check your inbox for a confirmation.",
  },
  unsubscribe: {
    endpoint: "/api/waitlist/unsubscribe",
    button: "Unsubscribe",
    done: "Unsubscribed",
    success: "You've been removed from the waitlist.",
  },
} as const;

export default function WaitlistForm() {
  const [mode, setMode] = useState<Mode>("subscribe");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  function switchMode(next: Mode) {
    setMode(next);
    setStatus("idle");
    setMessage("");
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();

    const checked = emailSchema.safeParse(email);
    if (!checked.success) {
      setStatus("error");
      setMessage(checked.error.issues[0].message);
      return;
    }

    const copy = COPY[mode];
    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch(copy.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: checked.data }),
      });
      const data = await res.json();
      if (res.status === 409 && data.code === "already_subscribed") {
        setStatus("exists");
        setMessage(data.error);
        return;
      }
      if (!res.ok) {
        setStatus("error");
        setMessage(data.errors?.email?.[0] ?? data.error ?? "Something went wrong.");
        return;
      }
      setStatus("success");
      setMessage(copy.success);
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  }

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate>
      <div className={styles.row}>
        <input
          type="email"
          name="email"
          className={styles.input}
          placeholder="Email address"
          aria-label="Email address"
          autoComplete="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "success" || status === "exists") setStatus("idle");
          }}
          required
        />
        <button
          className={styles.button}
          type="submit"
          disabled={status === "loading"}
          data-loading={status === "loading"}
          aria-busy={status === "loading"}
        >
          {/* Label stays in place (hidden while loading) so the button keeps its width */}
          <span className={styles.label}>
            {status === "success" || status === "exists" ? COPY[mode].done : COPY[mode].button}
          </span>
          {status === "loading" && (
            <span className={styles.spinner} aria-hidden="true" />
          )}
        </button>
      </div>
      <p className={styles.consent}>
        <span>
          {mode === "subscribe" ? (
            <>
              By joining, you agree to our <Link href="/privacy">Privacy Policy</Link>.
            </>
          ) : (
            "Enter the email address you used to join the waitlist."
          )}
        </span>
        <button
          type="button"
          className={styles.link}
          onClick={() => switchMode(mode === "subscribe" ? "unsubscribe" : "subscribe")}
        >
          {mode === "subscribe" ? "Unsubscribe" : "Back to sign up"}
        </button>
      </p>
      <p className={styles.message} data-status={status} role="status">
        {message}
      </p>
    </form>
  );
}
