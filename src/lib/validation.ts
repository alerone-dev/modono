import { z } from "zod";

// Shared by the form (client) and the API routes (server)
export const emailSchema = z
  .string()
  .trim()
  .min(1, "Enter your email address")
  .max(254, "That email address is too long")
  .regex(
    /^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/,
    "Enter a valid email address",
  );

export const waitlistSchema = z.object({ email: emailSchema });
