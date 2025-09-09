"use client";
import { GetFundsResponse } from "@/lib/api/funds";
import { percent } from "@/utils/percent";
import { Table } from "./Table/Table";
import { useState } from "react";
import { Fund } from "../../../server/server/data/funds";
import { classNames } from "@/utils/classNames";
import { ArrowDown, ArrowDownUp, ArrowUp } from "lucide-react";

type SortType = "string" | "number" | "date";
type SortDir = "ascending" | "descending";

type SortState = {
  id: string;
  dir: SortDir;
} | null;

type Column<T> = {
  id: string;
  header: React.ReactNode;
  value?: (row: T) => string | number;
  sortType?: SortType;
  accessor?: (row: T) => React.ReactNode;
};

const columns: Column<Fund>[] = [
  {
    id: "name",
    header: "Nombre",
    sortType: "string",
    accessor: (row) => row.name,
    value: (row) => row.value,
  },
  {
    id: "symbol",
    header: "Símbolo",
    sortType: "string",
    accessor: (row) => row.symbol,
    value: (row) => row.symbol,
  },
  {
    id: "currency",
    header: "Div",
    sortType: "string",
    accessor: (row) => row.currency,
    value: (row) => row.currency,
  },
  {
    id: "category",
    header: "Categoría",
    sortType: "string",
    accessor: (row) => row.category,
    value: (row) => row.category,
  },
  {
    id: "value",
    header: "Valor liquidativo",
    sortType: "number",
    accessor: (row) => row.value,
    value: (row) => row.value,
  },
  {
    id: "performance-ytd",
    header: new Date().getFullYear().toString(),
    sortType: "date",
    accessor: (row) => percent(row.profitability.YTD),
    value: (row) => row.profitability.YTD,
  },
  {
    id: "performance-1-y",
    header: "1A",
    sortType: "date",
    accessor: (row) => percent(row.profitability.oneYear),
    value: (row) => row.profitability.oneYear,
  },
  {
    id: "performance-3-y",
    header: "3A",
    sortType: "date",
    accessor: (row) => percent(row.profitability.threeYears),
    value: (row) => row.profitability.threeYears,
  },
  {
    id: "performance-5-y",
    header: "5A",
    sortType: "date",
    accessor: (row) => percent(row.profitability.fiveYears),
    value: (row) => row.profitability.fiveYears,
  },
];

export default function FundsTable({ data }: Pick<GetFundsResponse, "data">) {
  const [sort, setSort] = useState<SortState>(null);

  function handleSorting(id: string) {
    // 1) ASC
    if (sort?.id !== id) {
      setSort({ id, dir: "ascending" });
      return;
    }
    // 2) DESC
    if (sort.dir === "ascending") {
      setSort({ id, dir: "descending" });
      return;
    }
    // 3) Remove sorting
    setSort(null);
  }

  /** Set `helperText` prop conditionally  */
  function getHelper(cond: boolean, textHelper: string) {
    return cond && { textHelper };
  }

  return (
    <>
      <Table>
        <Table.Header>
          <Table.Row id="header-info" className="[&#header-info>*]:py-0">
            <Table.Heading colSpan={5} />
            <Table.Heading colSpan={4} className="font-normal text-sm">
              Rentabilidad anualizada (%)
            </Table.Heading>
          </Table.Row>
          <Table.Row>
            {columns.map((column, i) => (
              <Table.Heading
                sort={sort?.dir}
                onClick={() => handleSorting(column.id)}
                key={i}
                {...getHelper(column.id === "name", "ISIN")}
              >
                {column.header}{" "}
                {sort?.id === column.id ? (
                  sort.dir === "ascending" ? (
                    <ArrowUp size="1.25em" />
                  ) : (
                    <ArrowDown className="text-inherit" size="1.25em" />
                  )
                ) : (
                  <ArrowDownUp className="text-slate-400" size="1.25em" />
                )}
              </Table.Heading>
            ))}
            <Table.Heading />
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.map((row) => (
            <Table.Row key={row.id}>
              {columns.map((column) => (
                <Table.Cell
                  key={column.id}
                  children={column.accessor?.(row)}
                  className={classNames(
                    column.id === "name"
                      ? "text-blue-700 font-semibold"
                      : "text-slate-700",
                  )}
                />
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </>
  );
}
