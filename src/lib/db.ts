import { neon } from "@neondatabase/serverless";

export const dbConfigured = () => Boolean(process.env.DATABASE_URL?.trim());

const getSql = () => neon(process.env.DATABASE_URL as string);

// Returns true if the email was newly saved, false if it was already on the list
export async function saveWaitlistEmail(email: string): Promise<boolean> {
  const rows = await getSql()`
    insert into waitlist (email)
    values (${email})
    on conflict do nothing
    returning id
  `;
  return rows.length > 0;
}

// Returns true if the email was on the list and has been deleted
export async function removeWaitlistEmail(email: string): Promise<boolean> {
  const rows = await getSql()`
    delete from waitlist
    where email_normalized = ${email.toLowerCase()}
    returning id
  `;
  return rows.length > 0;
}
