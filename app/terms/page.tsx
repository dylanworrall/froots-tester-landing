import type { Metadata } from "next";
import { LegalLayout } from "@/components/ui/legal-layout";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms that govern your use of the Froots desktop app and website, including subscriptions, bring-your-own-key model usage, and acceptable use.",
  alternates: { canonical: "/terms" },
};

const UPDATED = "July 2, 2026";

export default function TermsPage() {
  return (
    <LegalLayout title="Terms of Service" updated={UPDATED}>
      <p>
        These Terms of Service (&ldquo;Terms&rdquo;) govern your use of the Froots
        desktop application and the <a href="https://froots.ai">froots.ai</a> website
        (together, the &ldquo;Service&rdquo;), provided by Froots, Inc.
        (&ldquo;Froots,&rdquo; &ldquo;we,&rdquo; &ldquo;us&rdquo;). By using the
        Service, you agree to these Terms. If you do not agree, do not use the
        Service.
      </p>

      <h2>The Service</h2>
      <p>
        Froots is a local-first desktop application for running AI agents and
        managing a personal workspace. The Service is currently offered as beta
        software and is provided on an &ldquo;as is&rdquo; and &ldquo;as
        available&rdquo; basis; features may change, and interruptions can occur.
      </p>

      <h2>Bring your own keys and third-party services</h2>
      <p>
        Froots works with third-party services you choose to connect, including AI
        model providers (via API keys you supply), Google (Gmail and Calendar),
        Stripe (payments), and Turso (sync). Your use of those services is governed
        by their respective terms and privacy policies. You are responsible for any
        usage, fees, or limits associated with keys and accounts you provide, and
        for complying with those providers&rsquo; terms.
      </p>

      <h2>Accounts and subscriptions</h2>
      <ul>
        <li>
          The core app is free to use when you bring your own model API keys.
        </li>
        <li>
          Optional paid plans (such as cross-device sync) are billed through Stripe
          on a recurring basis at the price shown at checkout. Subscriptions renew
          automatically until cancelled.
        </li>
        <li>
          You may cancel at any time; your paid features remain active through the
          end of the current billing period, after which sync access ends. Except
          where required by law, payments are non-refundable.
        </li>
        <li>
          We may change plan pricing prospectively; changes will not affect the
          current paid period.
        </li>
      </ul>

      <h2>Your content</h2>
      <p>
        You retain all rights to the content you create in Froots. You grant us only
        the limited permission necessary to operate the Service for you — for
        example, to store and replicate your content to your private sync database
        when you enable sync. We do not claim ownership of your content and do not
        use it to train AI models.
      </p>

      <h2>Acceptable use</h2>
      <p>You agree not to use the Service to:</p>
      <ul>
        <li>violate any law or the rights of others;</li>
        <li>access accounts or data you are not authorized to access;</li>
        <li>
          disrupt or attempt to gain unauthorized access to the Service or its
          infrastructure; or
        </li>
        <li>use connected services (including Google APIs) in ways that breach their terms.</li>
      </ul>

      <h2>Intellectual property</h2>
      <p>
        The Froots application, website, and brand are owned by Froots, Inc. and are
        protected by intellectual-property laws. These Terms do not grant you any
        right to our trademarks or to the closed-source portions of the software.
      </p>

      <h2>Disclaimers</h2>
      <p>
        The Service is provided without warranties of any kind, whether express or
        implied, including merchantability, fitness for a particular purpose, and
        non-infringement. AI agents can make mistakes; you are responsible for
        reviewing agent actions and outputs before relying on them.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the fullest extent permitted by law, Froots will not be liable for any
        indirect, incidental, special, consequential, or punitive damages, or for
        lost data or profits, arising from your use of the Service. Our total
        liability for any claim will not exceed the greater of the amount you paid us
        in the twelve months before the claim or US $100.
      </p>

      <h2>Termination</h2>
      <p>
        You may stop using the Service at any time. We may suspend or terminate
        access if you breach these Terms or use the Service in a way that risks harm
        to others or to the Service.
      </p>

      <h2>Governing law</h2>
      <p>
        These Terms are governed by the laws of the State of Delaware, United States,
        without regard to its conflict-of-laws rules.
      </p>

      <h2>Changes to these Terms</h2>
      <p>
        We may update these Terms as the Service evolves. Material changes will be
        reflected here with an updated date above; continued use after changes means
        you accept them.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these Terms? Email{" "}
        <a href="mailto:hello@froots.ai">hello@froots.ai</a>. Froots, Inc.
      </p>
    </LegalLayout>
  );
}
