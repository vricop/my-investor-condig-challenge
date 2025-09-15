import { classNames } from "@/utils/classNames"

export type TableBodyProps = React.ComponentPropsWithoutRef<"tbody">

export function TableBody({ children, className, ...props }: TableBodyProps) {
  return (
    <tbody {...props} className={classNames("pt-4", className)}>
      {children}
    </tbody>
  )
}
