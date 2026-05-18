interface Props {
  imageUrl: string;
  alt?: string;
}

export function VideoShowcase({ imageUrl, alt = "Preview" }: Props) {
  return (
    <section className="relative w-full pb-24">
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
        <div className="overflow-hidden rounded-[2rem] shadow-2xl shadow-black/15">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl}
            alt={alt}
            className="block h-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-700"
          />
        </div>
      </div>
    </section>
  );
}
