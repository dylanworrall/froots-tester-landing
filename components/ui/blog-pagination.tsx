import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  page: number;
  totalPages: number;
}

function hrefFor(page: number) {
  return page === 1 ? "/blog" : `/blog/page/${page}`;
}

export function BlogPagination({ page, totalPages }: Props) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const prevHref = page > 1 ? hrefFor(page - 1) : null;
  const nextHref = page < totalPages ? hrefFor(page + 1) : null;

  return (
    <nav aria-label="Blog pagination" className="mt-12 flex items-center justify-center gap-2">
      {prevHref ? (
        <Link href={prevHref} className="inline-flex h-10 items-center gap-1 rounded-full border border-border px-4 text-sm font-medium text-foreground transition hover:bg-foreground/5" rel="prev">
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Link>
      ) : (
        <span className="inline-flex h-10 items-center gap-1 rounded-full border border-border px-4 text-sm font-medium text-muted-foreground opacity-50">
          <ChevronLeft className="h-4 w-4" />
          Previous
        </span>
      )}
      <div className="flex items-center gap-1 px-2">
        {pages.map((p) =>
          p === page ? (
            <span key={p} aria-current="page" className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-foreground text-sm font-medium text-background">{p}</span>
          ) : (
            <Link key={p} href={hrefFor(p)} className="inline-flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium text-foreground transition hover:bg-foreground/5">{p}</Link>
          ),
        )}
      </div>
      {nextHref ? (
        <Link href={nextHref} className="inline-flex h-10 items-center gap-1 rounded-full border border-border px-4 text-sm font-medium text-foreground transition hover:bg-foreground/5" rel="next">
          Next
          <ChevronRight className="h-4 w-4" />
        </Link>
      ) : (
        <span className="inline-flex h-10 items-center gap-1 rounded-full border border-border px-4 text-sm font-medium text-muted-foreground opacity-50">
          Next
          <ChevronRight className="h-4 w-4" />
        </span>
      )}
    </nav>
  );
}
