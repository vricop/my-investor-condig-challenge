import { classNames } from "@/utils/classNames";
import { TableAlignProps } from "./types";
import { alignment } from "./utils/alignment";

type TableCellProps = Omit<React.ComponentPropsWithoutRef<"td">, "align"> &
  TableAlignProps;

export function TableCell({
  children,
  className,
  align,
  ...props
}: TableCellProps) {
  return (
    <td {...props} className={classNames(align && alignment[align], className)}>
      {children}
    </td>
  );
};
