"use client";
import { classNames } from "@/utils/classNames";
import { TableAlignProps } from "./types";
import { alignment } from "./utils/alignment";
import { AriaAttributes } from "react";

export type TableHeadingProps = {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  textHelper?: string;
  sort?: AriaAttributes["aria-sort"];
} & Omit<React.ComponentPropsWithoutRef<"th">, "align" | "onClick"> &
  TableAlignProps;

export function TableHeading({
  children,
  className,
  align = "start",
  sort,
  onClick,
  textHelper,
  ...props
}: TableHeadingProps) {
  const helper = <span className="font-normal">{textHelper}</span>;

  return (
    <th
      {...props}
      className={classNames(align && alignment[align], className, "relative")}
    >
      {onClick ? (
        <>
          <button
            aria-sort={sort}
            type="button"
            className="cursor-pointer grid grid-flow-col gap-x-2 justify-start items-center after:absolute after:inset-0 focus-visible:outline-none ring-offset-4 focus-visible:ring-2 ring-blue-500"
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
