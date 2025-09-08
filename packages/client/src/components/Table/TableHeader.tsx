import { classNames } from "@/utils/classNames";
import { TableAlignProps } from "./types";
import { alignment } from "./utils/alignment";

export type TableHeaderProps = {
  /** Make header sticky to improve redability. Default: `true`. */
  isSticky?: boolean;
} & React.ComponentPropsWithoutRef<"thead"> &
  TableAlignProps;

export function TableHeader({
  children,
  className,
  isSticky = true,
  align,
  ...props
}: TableHeaderProps) {
  return (
    <thead
      className={classNames(
        isSticky && "sticky top-0 border-b border-slate-300",
        "bg-white",
        align && alignment[align],
        className,
      )}
      {...props}
    >
      {children}
    </thead>
  );
}
