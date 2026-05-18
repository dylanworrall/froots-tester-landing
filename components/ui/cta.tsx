import { DownloadCta } from "./download-cta";

export function CTA() {
  return (
    <section className="bg-background text-foreground px-6 md:px-10 pt-20 pb-16">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-3xl bg-secondary px-6 py-16 md:py-20 flex flex-col items-center gap-8">
          <h2 className="text-4xl md:text-6xl font-semibold tracking-tight text-center text-foreground">
            Run your first agent today.
          </h2>
          <DownloadCta size="lg" />
        </div>
      </div>
    </section>
  );
}
