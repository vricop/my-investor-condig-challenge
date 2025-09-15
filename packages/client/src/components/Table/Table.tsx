import { classNames } from "@/utils/classNames"
import { TableHeader } from "./TableHeader"
import { TableBody } from "./TableBody"
import { TableHeading } from "./TableHeading"
import { TableRow } from "./TableRow"
import { TableCell } from "./TableCell"

export type TableProps = React.ComponentPropsWithoutRef<"table">

/**
 * A simple `Table` compound component with some predefined styling layout &
 * props
 */
export function Table({ children, className, ...props }: TableProps) {
  return (
    <div className="overflow-x-auto">
      <div className="max-h-[60vh] table-auto overflow-y-auto">
        <table
          className={classNames(
            "min-w-[80rem] text-sm tabular-nums relative",
            className,
          )}
          {...props}
        >
          {children}
        </table>
      </div>
    </div>
  )
}

// Compound component with dot notation style
Table.Header = TableHeader
Table.Body = TableBody
Table.Heading = TableHeading
Table.Row = TableRow
Table.Cell = TableCell
