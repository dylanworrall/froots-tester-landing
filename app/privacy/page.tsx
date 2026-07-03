import type { Metadata } from "next";
import { LegalLayout } from "@/components/ui/legal-layout";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Froots collects, uses, stores, and protects your data — including data accessed through Google APIs (Gmail and Google Calendar).",
  alternates: { canonical: "/privacy" },
};

const UPDATED = "July 2, 2026";

export default function PrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy" updated={UPDATED}>
      <p>
        Froots, Inc. (&ldquo;Froots,&rdquo; &ldquo;we,&rdquo; &ldquo;us&rdquo;) builds a
        local-first desktop application for running AI agents and managing your
        personal workspace. This Privacy Policy explains what information the app
        handles, how it is used, and the choices you have. It applies to the Froots
        desktop app and the <a href="https://froots.ai">froots.ai</a> website.
      </p>
      <p>
        Froots is <strong>local-first</strong>: your workspace and the data you
        connect are stored and processed on your own device by default. We
        operate only the limited cloud services described below (optional sync,
        payments, and real-time coordination).
      </p>

      <h2>Information we handle</h2>
      <ul>
        <li>
          <strong>Account &amp; billing information.</strong> If you subscribe to
          cloud sync, we process your email address and manage your subscription
          through our payment processor, Stripe. We do not receive or store your
          full card number.
        </li>
        <li>
          <strong>Google account data (Gmail and Google Calendar).</strong> If you
          choose to connect a Google account, Froots requests your permission to
          access your Gmail messages and Google Calendar events so it can show your
          inbox and calendar inside the app and let you triage mail and manage
          events. See the dedicated section below.
        </li>
        <li>
          <strong>Workspace content.</strong> Notes, tasks, contacts, agent
          configurations, and memory files you create in the app. This lives on
          your device and, if you enable sync, in your private cloud database.
        </li>
        <li>
          <strong>Model provider keys.</strong> API keys you supply for AI
          providers (e.g. Anthropic, OpenAI, Google, or a local model) are stored
          in your operating system&rsquo;s secure keystore on your device. We never
          receive them.
        </li>
      </ul>

      <h2>How Froots uses Google user data</h2>
      <p>
        When you connect a Google account, Froots requests these permissions
        (scopes), and uses them only for the features described:
      </p>
      <ul>
        <li>
          <strong>Gmail (read and modify).</strong> To display your inbox in the
          app, open individual messages, send replies you compose, and triage mail
          (mark as read, archive, label). Message content is fetched to your device
          on demand.
        </li>
        <li>
          <strong>Google Calendar (events).</strong> To display your calendar and
          let you create, edit, and delete events from within the app.
        </li>
        <li>
          <strong>Basic profile (openid, email).</strong> To identify which Google
          account is connected.
        </li>
      </ul>
      <p>
        Google data is processed on your device to power these features. If you
        explicitly ask an in-app AI agent to act on your mail or calendar (for
        example, &ldquo;summarize this thread&rdquo;), the relevant content is sent
        to the AI provider you configured with your own API key, and is handled
        under that provider&rsquo;s terms. Froots does not send your Google data to
        any other destination.
      </p>

      <h2 id="limited-use">Limited Use — Google API Services User Data Policy</h2>
      <p>
        Froots&rsquo;s use and transfer to any other app of information received
        from Google APIs will adhere to the{" "}
        <a
          href="https://developers.google.com/terms/api-services-user-data-policy"
          target="_blank"
          rel="noopener noreferrer"
        >
          Google API Services User Data Policy
        </a>
        , including the Limited Use requirements. Specifically, Froots:
      </p>
      <ul>
        <li>uses Google user data only to provide and improve the features you request;</li>
        <li>does not sell Google user data;</li>
        <li>does not use or transfer Google user data for advertising;</li>
        <li>
          does not use Google user data to train, develop, or improve generalized
          or non-personalized AI or machine-learning models; and
        </li>
        <li>
          does not allow humans to read your Google user data, except with your
          affirmative agreement for specific messages, when necessary for security
          purposes (such as investigating abuse), to comply with applicable law, or
          where the data has been aggregated and anonymized.
        </li>
      </ul>

      <h2>Optional cloud sync</h2>
      <p>
        Cloud sync is off by default. If you turn it on, your workspace content is
        replicated to a private database provisioned for your account (hosted on
        Turso) so it stays consistent across your devices. Data is transmitted over
        encrypted connections (TLS). Gmail message bodies are fetched on demand and
        are not stored in the synced database; however, if you or an agent save
        email-derived content into your notes or memory, that saved content syncs
        like any other workspace content you create.
      </p>

      <h2>How we store and protect data</h2>
      <ul>
        <li>Google OAuth tokens are stored in your device&rsquo;s secure OS keystore.</li>
        <li>Local workspace data resides in your user application-support directory.</li>
        <li>Synced data is transmitted over TLS to your private database.</li>
        <li>We retain synced data for as long as your account is active.</li>
      </ul>

      <h2>Your choices and controls</h2>
      <ul>
        <li>
          <strong>Disconnect Google.</strong> Remove a connected Google account at
          any time in the app&rsquo;s Settings; this deletes the stored tokens on
          your device.
        </li>
        <li>
          <strong>Revoke at Google.</strong> You can revoke Froots&rsquo;s access
          directly at{" "}
          <a
            href="https://myaccount.google.com/permissions"
            target="_blank"
            rel="noopener noreferrer"
          >
            myaccount.google.com/permissions
          </a>
          .
        </li>
        <li>
          <strong>Delete your data.</strong> Turn off sync to keep data only on your
          device, or contact us to delete your account and synced data.
        </li>
      </ul>

      <h2>Third-party services</h2>
      <p>
        Froots relies on a small number of third parties to operate: Google (for the
        Gmail and Calendar features you connect), the AI providers you configure with
        your own keys, Stripe (payments), and Turso (sync database). Each processes
        data under its own privacy terms.
      </p>

      <h2>Children</h2>
      <p>Froots is not directed to children under 16, and we do not knowingly collect their data.</p>

      <h2>Changes to this policy</h2>
      <p>
        We may update this policy as the product evolves. Material changes will be
        reflected here with an updated date above.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about this policy or your data? Email{" "}
        <a href="mailto:hello@froots.ai">hello@froots.ai</a>. Froots, Inc.
      </p>
    </LegalLayout>
  );
}
