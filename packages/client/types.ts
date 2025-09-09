export type SortDir = "ascending" | "descending";

export type SortState = {
  id: string;
  dir: SortDir;
} | null;

export type SortType = "string" | "number";

export type Column<T> = {
  id: string;
  header: React.ReactNode;
  description?: string;
  value?: (row: T) => string | number;
  type?: SortType;
  accessor?: (row: T) => React.ReactNode;
};
