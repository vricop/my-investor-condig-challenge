"use client";
import { classNames } from "@/utils/classNames";
import { TableAlignProps } from "./types";
import { alignment } from "./utils/alignment";

export type TableHeadingProps = {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  textHelper?: string;
} & Omit<React.ComponentPropsWithoutRef<"th">, "align" | "onClick"> &
  TableAlignProps;

export function TableHeading({
  children,
  className,
  align,
  onClick,
  textHelper,
  ...props
}: TableHeadingProps) {
  const helper = <span className="font-normal">{textHelper}</span>;

  return (
    <th {...props} className={classNames(align && alignment[align], className)}>
      {onClick ? (
        <>
          <button
            type="button"
            className="cursor-pointer grid grid-flow-col gap-x-2 justify-start items-baseline"
            onClick={onClick}
          >
            {children}
          </button>
          {helper}
        </>
      ) : (
        <>
          {children}
          {helper}
        </>
      )}
    </th>
  );
}
