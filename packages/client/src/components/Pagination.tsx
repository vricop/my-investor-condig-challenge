"use client"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import {
  usePathname,
  useSearchParams,
  type ReadonlyURLSearchParams,
} from "next/navigation"

type QueryPrimitive = string | number | boolean
type QueryValue = QueryPrimitive | QueryPrimitive[] | null | undefined
type QueryObject = Record<string, QueryValue>

type PaginationProps = {
  page: number
  limit: number
  totalFunds: number
  totalPages: number
  basePath?: string
}

function fromSearchParams(searchParams: ReadonlyURLSearchParams): QueryObject {
  const query: QueryObject = {}

  for (const key of searchParams.keys()) {
    const all = searchParams.getAll(key)

    if (all.length === 0) continue

    if (all.length === 1) {
      query[key] = all[0]
      continue
    }

    query[key] = all
  }
  return query
}

function mergeQuery(base: QueryObject, patch: QueryObject): QueryObject {
  const out: QueryObject = { ...base }

  for (const [k, v] of Object.entries(patch)) {
    if (v === null || v === undefined) {
      delete out[k]
      continue
    }

    if (Array.isArray(v) && v.length === 0) {
      delete out[k]
      continue
    }

    out[k] = v
  }
  return out
}

export function Pagination(query: PaginationProps) {
  const { page, limit, totalPages, basePath } = query
  if (totalPages <= 1) return null

  const pathname = basePath ?? usePathname()
  const sp = useSearchParams()
  const baseQuery = mergeQuery(fromSearchParams(sp), { limit })
  const pages = [...Array(totalPages)].map((_, i) => i + 1)
  const prevPage = ((page - 2 + totalPages) % totalPages) + 1
  const nextPage = (page % totalPages) + 1

  const nav = `
    inline-flex divide-x divide-slate-200 overflow-hidden rounded-md border
    border-slate-200 mt-6 tabular-nums`

  const edges = `
    min-w-9 h-9 px-2 grid place-content-center text-slate-600 hover:bg-slate-50
    outline-none focus:bg-slate-200`

  const items = `
    min-w-9 h-9 px-3 grid place-content-center justify-center text-sm
    outline-none focus:bg-slate-200 aria-[current=page]:bg-slate-100
    aria-[current=page]:font-medium aria-[current=page]:text-slate-900`

  const href = (p: number) => ({
    pathname,
    query: mergeQuery(baseQuery, { page: p, limit }),
  })

  return (
    <nav aria-label="Pagination" className={nav}>
      <Link href={href(prevPage)} aria-label="Previous page" className={edges}>
        <ChevronLeft />
      </Link>

      {pages.map(p => (
        <Link
          key={p}
          href={href(p)}
          aria-current={p === page ? "page" : undefined}
          className={items}
        >
          {p}
        </Link>
      ))}

      <Link href={href(nextPage)} aria-label="Next page" className={edges}>
        <ChevronRight />
      </Link>
    </nav>
  )
}
