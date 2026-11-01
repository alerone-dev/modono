const wrap = (body: string) => `
<div style="font-family:Arial,sans-serif;max-width:480px;margin:0 auto;padding:24px;color:#111">
  ${body}
  <p style="margin-top:32px;font-size:12px;color:#777">Modono is a product of Alerone Technologies Private Limited.</p>
</div>`;

export const ADMIN_NOTIFICATION_EMAIL = {
  subject: (email: string) => `New Modono waitlist signup: ${email}`,
  html: (email: string) =>
    wrap(`<h2 style="margin:0 0 12px">New waitlist signup</h2>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Time:</strong> ${new Date().toISOString()}</p>`),
};

export const CONFIRMATION_EMAIL = {
  subject: "You're on the Modono waitlist",
  html: () =>
    wrap(`<h2 style="margin:0 0 12px">You're on the list</h2>
    <p>Thanks for your interest in Modono, booking software and CRM for businesses. We'll email you as soon as we launch.</p>
    <p>Questions? Just reply to this email.</p>`),
};
