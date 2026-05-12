interface Props {
  imageUrl: string;
  alt?: string;
}

export function VideoShowcase({ imageUrl, alt = "Preview" }: Props) {
  return (
    <section className="relative w-full pb-24">
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
        <div className="overflow-hidden rounded-[2rem] bg-rose-200 px-6 pt-28 shadow-2xl shadow-rose-900/15 sm:px-10 sm:pt-36 md:px-12 md:pt-44">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl}
            alt={alt}
            className="block h-auto w-full rounded-t-xl drop-shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-700"
          />
        </div>
      </div>
    </section>
  );
}
