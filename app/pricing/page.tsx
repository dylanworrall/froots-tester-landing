import CardNav from "@/components/ui/card-nav";
import { CTA } from "@/components/ui/cta";
import { FAQ } from "@/components/ui/faq";
import { Footer } from "@/components/ui/footer";
import { PricingSection } from "@/components/ui/pricing-section";
import { WorksWithStack } from "@/components/ui/works-with-stack";

export default function PricingPage() {
  return (
    <main className="min-h-screen">
      <CardNav
        logo="/froots-logo.png"
        logoAlt="Froots"
        logoText="Froots"
        ctaLabel="Login"
        items={[
          {
            label: "Product",
            bgColor: "#D7EFD3",
            textColor: "#0a0a0a",
            links: [
              { label: "Memory", ariaLabel: "Memory", href: "/memory" },
              { label: "Routines", ariaLabel: "Routines", href: "/routines" },
              { label: "Skills", ariaLabel: "Skills", href: "/skills" },
            ],
          },
          {
            label: "Harnesses",
            bgColor: "#5191F8",
            textColor: "#0a0a0a",
            links: [
              { label: "Models", ariaLabel: "Models", href: "/models" },
              { label: "Pricing", ariaLabel: "Pricing", href: "/pricing" },
            ],
          },
          {
            label: "Resources",
            bgColor: "#FBD9DA",
            textColor: "#0a0a0a",
            links: [
              { label: "Blog", ariaLabel: "Blog", href: "/blog" },
              { label: "Docs", ariaLabel: "Docs", href: "/" },
              { label: "Changelog", ariaLabel: "Changelog", href: "/" },
              { label: "Discord", ariaLabel: "Discord", href: "https://discord.gg/y7cq9A5bYu" },
            ],
          },
        ]}
      />
      <div className="pt-28">
        <PricingSection />
      </div>
      <WorksWithStack />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}
