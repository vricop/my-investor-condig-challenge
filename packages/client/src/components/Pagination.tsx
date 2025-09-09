import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

type PaginationProps = {
  page: number;
  totalPages: number;
  basePath?: string;
};

export function Pagination({
  page,
  totalPages,
  basePath = "/funds",
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = [...Array(totalPages)].map((_, i) => i + 1);
  const prevPage = ((page - 2 + totalPages) % totalPages) + 1;
  const nextPage = (page % totalPages) + 1;

  return (
    <nav aria-label="Pagination" className="inline-flex mt-6 tabular-nums">
      <div
        className="inline-flex divide-x divide-slate-200 overflow-hidden
        rounded-md border border-slate-200"
      >
        <Link
          href={`${basePath}?page=${prevPage}`}
          aria-label="Previous page"
          className="min-w-9 h-9 px-2 inline-flex items-center justify-center
          text-slate-600 hover:bg-slate-50 outline-none focus:bg-slate-200"
        >
          <ChevronLeft />
        </Link>

        {pages.map((p) => (
          <Link
            key={p}
            href={`${basePath}?page=${p}`}
            aria-current={p === page ? "page" : undefined}
            className="
              min-w-9 h-9 px-3 grid place-content-center justify-center text-sm
            outline-none focus:bg-slate-200 aria-[current=page]:bg-slate-100
            aria-[current=page]:font-medium aria-[current=page]:text-slate-900
            "
          >
            {p}
          </Link>
        ))}

        <Link
          href={`${basePath}?page=${nextPage}`}
          aria-label="Next page"
          className="min-w-9 h-9 px-2 grid place-content-center text-slate-600
          hover:bg-slate-50 outline-none focus:bg-slate-200 "
        >
          <ChevronRight />
        </Link>
      </div>
    </nav>
  );
}
