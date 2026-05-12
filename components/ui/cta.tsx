import { ArrowRight } from "lucide-react";

const logos = ["Tandem", "ElevenLabs", "ANTHROPIC", "stripe", "Lovable", "EQT"];

export function CTA() {
  return (
    <section className="bg-background text-foreground px-6 md:px-10 pt-20 pb-16">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-3xl bg-secondary px-6 py-16 md:py-20 flex flex-col items-center gap-8">
          <h2 className="text-4xl md:text-6xl font-semibold tracking-tight text-center text-foreground">
            Multiply yourself
          </h2>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground text-sm md:text-base px-6 py-3 hover:opacity-90 transition-opacity"
          >
            Start a run
            <ArrowRight className="size-4" />
          </button>

          <p className="mt-8 text-xs md:text-sm text-muted-foreground tracking-wide">
            Trusted by fast-growing teams worldwide
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 w-full max-w-4xl">
            {logos.map((name) => (
              <span
                key={name}
                className="text-muted-foreground/70 font-semibold text-base md:text-lg tracking-wide"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
