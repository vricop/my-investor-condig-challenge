"use client";
import { classNames } from "@/utils/classNames";
import { TableAlignProps } from "./types";
import { alignment } from "./utils/alignment";
import { ArrowDown, ArrowDownUp, ArrowUp } from "lucide-react";
import type { SortDir } from "../types";

type SortVisualProps = {
  sortable?: boolean;
  sortActive?: boolean;
  sortDir?: SortDir;
};

export type TableHeadingProps = {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  description?: string;
} & SortVisualProps &
  Omit<React.ComponentPropsWithoutRef<"th">, "align" | "onClick"> &
  TableAlignProps;

function SortIcon({ active, dir }: { active: boolean; dir?: SortDir }) {
  if (!active) return <ArrowDownUp size="1.25em" className="text-slate-400" />;
  return dir === "ascending" ? (
    <ArrowUp size="1.25em" className="text-inherit" />
  ) : (
    <ArrowDown size="1.25em" className="text-inherit" />
  );
}

export function TableHeading({
  children,
  className,
  align = "start",
  sortable,
  sortActive,
  sortDir,
  onClick,
  description,
  ...props
}: TableHeadingProps) {
  const ariaSort = sortable ? (sortActive ? sortDir : "none") : undefined;

  return (
    <th
      {...props}
      aria-sort={ariaSort}
      className={classNames(alignment[align], className, "relative")}
    >
      {sortable ? (
        <>
          <button
            type="button"
            className="cursor-pointer grid grid-flow-col gap-x-2 justify-start
            items-center after:absolute after:inset-0 ring-offset-4
            focus-visible:outline-none focus-visible:ring-2 ring-blue-500"
            onClick={(e) => {
              sortable && onClick?.(e);
            }}
            aria-pressed={!!sortActive}
          >
            {children}
            <SortIcon active={!!sortActive} dir={sortDir} />
          </button>
          {description && <span className="font-normal">{description}</span>}
        </>
      ) : (
        <>
          {children}
          {description && <span className="font-normal">{description}</span>}
        </>
      )}
    </th>
  );
}
