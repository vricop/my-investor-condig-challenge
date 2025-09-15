import { TableAlignProps } from "../types"

export const alignment: Record<
  NonNullable<TableAlignProps["align"]>,
  string
> = {
  start: "text-left",
  center: "text-center",
  end: "text-right",
}
