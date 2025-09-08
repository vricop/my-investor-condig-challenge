import { classNames } from "@/utils/classNames";
import { TableHeader } from "./TableHeader";
import { TableBody } from "./TableBody";
import { TableHeading } from "./TableHeading";
import { TableRow } from "./TableRow";
import { TableCell } from "./TableCell";

export type TableProps = React.ComponentPropsWithoutRef<"table">;

/**
 * A simple `Table` compound component with some predifined styling layout &
 * props
 */
export function Table({ children, className, ...props }: TableProps) {
  return (
    <table
      className={classNames("max-h-24 overflow-auto text-sm", className)}
      {...props}
    >
      {children}
    </table>
  );
}

// Compound component with dot notation style
Table.Header = TableHeader;
Table.Body = TableBody;
Table.Heading = TableHeading;
Table.Row = TableRow;
Table.Cell = TableCell;
