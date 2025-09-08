import { classNames } from "@/utils/classNames";
import { TableAlignProps } from "./types";
import { alignment } from "./utils/alignment";

export type TableRowProps = React.ComponentPropsWithoutRef<"tr"> &
  TableAlignProps;

export function TableRow({
  children,
  className,
  align,
  ...props
}: TableRowProps) {
  return (
    <tr
      {...props}
      className={classNames(
        "align-top [&>*+*]:pl-8 [&>*]:pt-4 [&>:where(th)]:pb-4",
        align && alignment[align],
        className,
      )}
    >
      {children}
    </tr>
  );
}
