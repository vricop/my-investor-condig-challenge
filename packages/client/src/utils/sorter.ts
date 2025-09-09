import { Column, SortState } from "../../types";
import { comparators } from "./comparators";

export function sorter<T>(
  rows: readonly T[],
  sort: SortState,
  cols: readonly Column<T>[],
) {
  if (!sort) return rows as T[];

  const col = cols.find((c) => c.id === sort.id);
  if (!col) return rows as T[];

  const project = col.value;
  if (!project) return rows as T[];

  const base = comparators[col.type ?? "string"];
  const dir = sort.dir === "ascending" ? 1 : -1;

  return [...rows].sort((ra, rb) => dir * base(project(ra), project(rb)));
}
