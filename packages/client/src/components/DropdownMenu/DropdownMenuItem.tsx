type MergeProps<T extends React.ElementType, P> = P &
  Omit<React.ComponentPropsWithRef<T>, keyof P>

export type DropdownMenuItemProps<T extends React.ElementType = "button"> =
  MergeProps<T, DropdownMenuItemCustomProps<T>>

type DropdownMenuItemCustomProps<T> = {
  children?: React.ReactNode
  /** Although a polymorphic component use only `a` | `button` | `Link`  */
  as?: T
  icon?: React.ReactNode
}

/**
 * A polymorphic compound component
 *
 * **Note**: Although this is a polymorphic component use only
 * `a` | `button` | `Link` (Next.js link component)
 */
export function DropdownMenuItem<T extends React.ElementType = "button">({
  children,
  icon,
  as,
  ...props
}: DropdownMenuItemProps<T>) {
  const Tag = as ?? "button"

  return (
    <li role="presentation">
      <Tag
        role="menuitem"
        type="button"
        className="w-full cursor-pointer grid justify-start grid-flow-col
              gap-4 leading-[.85lh] p-6 outline-none focus-visible:bg-slate-50"
        {...props}
      >
        {icon}
        {children}
      </Tag>
    </li>
  )
}
