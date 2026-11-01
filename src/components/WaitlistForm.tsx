"use client";

import { FormEvent, useState } from "react";
import styles from "./WaitlistForm.module.css";

type Status = "idle" | "loading" | "success" | "error";

export default function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus("error");
        setMessage(data.errors?.email?.[0] ?? data.error ?? "Something went wrong.");
        return;
      }
      setStatus("success");
      setMessage("You're on the list. Check your inbox for a confirmation.");
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
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button className={styles.button} type="submit" disabled={status === "loading"}>
          {status === "loading" ? "Sending…" : "Notify Me"}
        </button>
      </div>
      <p className={styles.message} data-status={status} role="status">
        {message}
      </p>
    </form>
  );
}
