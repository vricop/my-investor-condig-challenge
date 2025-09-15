"use client"
import { Eye, LogOut } from "lucide-react"
import { useState } from "react"
import { buyFund, type GetFundsResponse } from "@/api/funds"
import { classNames } from "@/utils/classNames"
import { percent } from "@/utils/percent"
import { sorter } from "@/utils/sorter"
import type { Fund } from "../../../server/server/data/funds"
import type { Column, SortState } from "../../types"
import { DropdownMenu } from "./DropdownMenu/DropdownMenu"
import { Table } from "./Table/Table"

function buyFundAction(id: string) {
  return (_: React.MouseEvent<HTMLButtonElement>) =>
    buyFund(id, { quantity: 1 })
}

const columns: Column<Fund>[] = [
  {
    id: "name",
    header: "Nombre",
    description: "ISIN",
    type: "string",
    accessor: row => row.name,
    value: row => row.name,
  },
  {
    id: "symbol",
    header: "Símbolo",
    type: "string",
    accessor: row => row.symbol,
    value: row => row.symbol,
  },
  {
    id: "currency",
    header: "Div",
    type: "string",
    accessor: row => row.currency,
    value: row => row.currency,
  },
  {
    id: "category",
    header: "Categoría",
    type: "string",
    accessor: row => row.category,
    value: row => row.category,
  },
  {
    id: "value",
    header: "Valor liquidativo",
    type: "number",
    accessor: row => row.value,
    value: row => row.value,
  },
  {
    id: "performance-ytd",
    header: new Date().getFullYear().toString(),
    type: "number",
    accessor: row => percent(row.profitability.YTD),
    value: row => row.profitability.YTD,
  },
  {
    id: "performance-1-y",
    header: "1A",
    type: "number",
    accessor: row => percent(row.profitability.oneYear),
    value: row => row.profitability.oneYear,
  },
  {
    id: "performance-3-y",
    header: "3A",
    type: "number",
    accessor: row => percent(row.profitability.threeYears),
    value: row => row.profitability.threeYears,
  },
  {
    id: "performance-5-y",
    header: "5A",
    type: "number",
    accessor: row => percent(row.profitability.fiveYears),
    value: row => row.profitability.fiveYears,
  },
]

export function FundsTable({ data }: Pick<GetFundsResponse, "data">) {
  const [sort, setSort] = useState<SortState>(null)

  function handleSorting(id: string) {
    if (sort?.id !== id) {
      setSort({ id, dir: "ascending" })
      return
    }
    if (sort.dir === "ascending") {
      setSort({ id, dir: "descending" })
      return
    }
    setSort(null)
  }

  const rows = sorter(data, sort, columns)

  return (
    <Table>
      <Table.Header>
        <Table.Row id="header-info" className="[&#header-info>*]:py-0">
          <Table.Heading colSpan={5} />
          <Table.Heading colSpan={4} className="font-normal text-sm">
            Rentabilidad anualizada (%)
          </Table.Heading>
        </Table.Row>

        <Table.Row>
          {columns.map(column => (
            <Table.Heading
              key={column.id}
              sortable={true}
              sortActive={sort?.id === column.id}
              sortDir={sort?.dir}
              onClick={() => handleSorting(column.id)}
              description={column.description}
            >
              {column.header}
            </Table.Heading>
          ))}
          <Table.Heading />
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {rows.map(row => (
          <Table.Row key={row.id}>
            {columns.map(column => (
              <Table.Cell
                key={column.id}
                className={classNames(
                  column.id === "name" && "text-blue-700 font-semibold",
                  column.id !== "name" && "text-slate-700",
                )}
              >
                {column.accessor?.(row)}
              </Table.Cell>
            ))}
            <Table.Cell />
            <Table.Cell>
              <DropdownMenu>
                <DropdownMenu.Item
                  onClick={buyFundAction(row.id)}
                  icon={<LogOut />}
                >
                  Comprar
                </DropdownMenu.Item>
                <DropdownMenu.Item icon={<Eye />}>
                  Ver detalle
                </DropdownMenu.Item>
              </DropdownMenu>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )
}
