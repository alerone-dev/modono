export type LegalSection = {
  // Anchor for deep links, e.g. /privacy#data-deletion
  id?: string;
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  // Rendered after the bullets
  after?: string[];
};

export type LegalDocument = {
  title: string;
  description: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
};

const UPDATED = "2 November 2026";

export const PRIVACY_POLICY: LegalDocument = {
  title: "Privacy Policy",
  description:
    "How Modono, a product of Alerone Technologies Private Limited, collects, uses, stores and protects personal data.",
  updated: UPDATED,
  intro:
    'Modono is booking software and CRM for businesses, operated by Alerone Technologies Private Limited ("Alerone", "we", "us"). This Privacy Policy explains what personal data we collect, why we collect it, how long we keep it, who we share it with, and the rights you have over it.',
  sections: [
    {
      heading: "1. Data we collect",
      paragraphs: [
        "The data we collect depends on how you interact with Modono. We collect only what we need to provide the service.",
      ],
      bullets: [
        "Names and contact details, such as email addresses and phone numbers, that you give us on our website, in the waitlist form, by email, or that our business customers enter for their own clients.",
        "Appointment and booking details, such as services booked, dates, times and staff assigned.",
        "Messages, including WhatsApp, SMS and email messages sent to or from Modono on behalf of a business, and messages you send to us directly.",
        "Technical data, such as device type, browser, IP address and basic usage logs, used to keep the service secure and working.",
      ],
    },
    {
      heading: "2. Our role",
      paragraphs: [
        "When a business uses Modono to manage its own clients, that business decides why and how its clients' data is used, and we process that data on its behalf as a service provider. For data you give us directly, such as the waitlist email, we decide how it is used and we are responsible for it.",
      ],
    },
    {
      heading: "3. Why we use your data",
      bullets: [
        "To provide, operate and improve Modono, including booking, reminders, messaging and customer records.",
        "To send confirmations, appointment reminders and service messages.",
        "To respond to your questions and requests, and to notify you when Modono launches if you joined the waitlist.",
        "To keep Modono secure, prevent misuse and meet legal obligations.",
      ],
      after: [
        "We do not sell personal data. If we add artificial intelligence features, we will update this policy first, and we will not use your clients' data to train public AI models without permission.",
      ],
    },
    {
      heading: "4. Who we share data with",
      paragraphs: [
        "We share data only with service providers that help us run Modono, and only as much as they need:",
      ],
      bullets: [
        "Meta Platforms (WhatsApp Business Platform), to send and receive WhatsApp messages.",
        "SMS and email providers (such as MSG91), to deliver text messages and emails.",
        "Hosting and infrastructure providers, such as Amazon Web Services, to store and run the service.",
        "Authorities, courts or other parties where the law requires it.",
      ],
    },
    {
      heading: "5. How long we keep data",
      paragraphs: [
        "We keep personal data only as long as needed for the purposes above. Waitlist emails are kept until Modono launches and you unsubscribe, or until you ask us to delete them. Booking, customer and message data is kept while the business account is active and for a limited period afterwards, unless the law requires longer. When data is no longer needed, we delete it or make it anonymous.",
      ],
    },
    {
      heading: "6. Security",
      paragraphs: [
        "We use encryption in transit, access controls and hosting with reputable providers to protect personal data. No system is completely secure, but we work to limit access to the people who need it and to fix problems quickly.",
      ],
    },
    {
      heading: "7. Your rights",
      paragraphs: [
        "Under applicable Indian law, including the Digital Personal Data Protection Act, 2023, you may have the right to:",
      ],
      bullets: [
        "Ask for a summary of the personal data we hold about you.",
        "Ask us to correct or update it.",
        "Ask us to delete it. See section 8, Data deletion, for how to do this.",
        "Withdraw consent for messages or other processing based on consent.",
        "Make a complaint about how your data is handled.",
      ],
      after: [
        "If your data was entered by a business that uses Modono, we may direct your request to that business.",
      ],
    },
    {
      id: "data-deletion",
      heading: "8. Data deletion",
      paragraphs: [
        "You can ask us to delete the personal data we hold about you at any time. To do so, send an email to info@modono.in from the email address linked to your data, with the subject line \"Data deletion request\".",
      ],
      bullets: [
        "Include your name and the email address or phone number we hold for you.",
        "Tell us if you want everything deleted or only certain data.",
        "If you joined our waitlist, tell us the email address you used.",
      ],
      after: [
        "We will confirm that we received your request, usually within 3 working days. We may ask you to confirm your identity so that data is not deleted for the wrong person. We will delete your personal data within 30 days of confirming your request, and tell you when it is done.",
        "We may keep limited data if the law requires it, for example billing and tax records, or to resolve disputes and prevent fraud. We keep only what is needed, for as long as needed, and delete it afterwards. Data held in backups is removed when those backups expire.",
        "If you are a client of a business that uses Modono, that business controls your booking and contact records. We will pass your request on to them or help them act on it.",
        "If you connected Modono through a Meta account (Facebook, Instagram or WhatsApp), you can also remove Modono from your Meta account settings. To have the data we hold deleted, email us as described above.",
      ],
    },
    {
      heading: "9. Children",
      paragraphs: [
        "Modono is built for businesses and is not directed at children under 18. We do not knowingly collect their data for our own purposes.",
      ],
    },
    {
      heading: "10. Changes to this policy",
      paragraphs: [
        "We may update this policy from time to time. The date at the top shows when it was last changed. If we make a significant change, we will take reasonable steps to let you know.",
      ],
    },
    {
      heading: "11. Grievance and contact",
      paragraphs: [
        "For questions, requests or complaints about your data, contact our Grievance Officer at info@modono.in or write to the Grievance Officer, Alerone Technologies Private Limited, 8th Floor, Levana Cyber Heights, Lucknow, Uttar Pradesh 226010, India. We aim to respond within 30 days.",
      ],
    },
  ],
};

export const TERMS_OF_SERVICE: LegalDocument = {
  title: "Terms of Service",
  description:
    "The terms that apply when you use Modono, a product of Alerone Technologies Private Limited.",
  updated: UPDATED,
  intro:
    'These Terms of Service ("Terms") apply to your use of Modono, booking software and CRM for businesses, operated by Alerone Technologies Private Limited ("Alerone", "we", "us"). By using Modono you agree to these Terms.',
  sections: [
    {
      heading: "1. The service",
      paragraphs: [
        "Modono lets businesses manage appointments, clients and communication, including messaging through WhatsApp, SMS and email. Features may change as the product develops, and some features may be offered in a pre-launch or beta form.",
      ],
    },
    {
      heading: "2. Accounts",
      bullets: [
        "You must give accurate information and keep your login details secure.",
        "You are responsible for activity under your account, including that of staff you add.",
        "You must be legally able to enter a contract to open an account on behalf of a business.",
      ],
    },
    {
      heading: "3. Acceptable use",
      paragraphs: ["You agree not to use Modono to:"],
      bullets: [
        "Break any law, or send spam, scams or misleading messages.",
        "Send marketing or other messages to people who have not agreed to receive them.",
        "Upload harmful, abusive or infringing content, or malicious code.",
        "Try to gain unauthorised access, disrupt the service, or reverse engineer it.",
      ],
    },
    {
      heading: "4. Messaging consent and opt-out",
      paragraphs: [
        "If you send messages to your clients through Modono, you are responsible for getting and keeping their consent, and for following the rules of the channel you use, including the WhatsApp Business Messaging Policy, the WhatsApp Commerce Policy and applicable messaging and telecom regulations. Every client must be able to opt out of non-essential messages at any time, and you must honour opt-outs promptly. Modono provides tools to record and respect opt-outs. We may suspend messaging that appears to break these rules.",
      ],
    },
    {
      heading: "5. Payments and credits",
      paragraphs: [
        "Some features, including messaging, may use prepaid credits or paid plans. Prices, taxes and billing terms will be shown before you pay. Unless the law or an agreement says otherwise, fees are non-refundable. Unused prepaid credits stay in your account while it is active, and we will explain any expiry or refund terms before you buy them. We may change prices with reasonable notice.",
      ],
    },
    {
      heading: "6. Your data",
      paragraphs: [
        "You keep ownership of the data you and your clients put into Modono. You give us permission to process it to provide the service, as described in our Privacy Policy. You are responsible for having the right to enter that data.",
      ],
    },
    {
      heading: "7. Intellectual property",
      paragraphs: [
        "Modono, its software, name and branding belong to Alerone Technologies Private Limited. We give you a limited, non-exclusive, non-transferable right to use the service under these Terms.",
      ],
    },
    {
      heading: "8. Suspension and ending",
      paragraphs: [
        "You can stop using Modono at any time. We may suspend or end access if you break these Terms or put the service or other users at risk. You can ask for your data to be deleted as described in the Data deletion section of our Privacy Policy.",
      ],
    },
    {
      heading: "9. Disclaimers and liability",
      paragraphs: [
        'Modono is provided "as is" and "as available". We do not promise it will be uninterrupted or error free, and we are not responsible for outages or changes in third-party services such as WhatsApp, SMS carriers or hosting providers. To the extent the law allows, Alerone is not liable for indirect or consequential losses, including lost profits or bookings, and our total liability for any claim is limited to the greater of the amount you paid us for the service in the three months before the claim and INR 10,000.',
      ],
    },
    {
      heading: "10. Governing law",
      paragraphs: [
        "These Terms are governed by the laws of India. Courts in Lucknow, Uttar Pradesh, India have exclusive jurisdiction over any dispute.",
      ],
    },
    {
      heading: "11. Changes and contact",
      paragraphs: [
        "We may update these Terms, and the date at the top shows the latest version. Continued use after a change means you accept it. Questions can be sent to info@modono.in or to Alerone Technologies Private Limited, 8th Floor, Levana Cyber Heights, Lucknow, Uttar Pradesh 226010, India.",
      ],
    },
  ],
};
