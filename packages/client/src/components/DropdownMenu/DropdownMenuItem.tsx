export type DropdownMenuItemProps = {
  icon?: React.ReactNode;
} & React.ComponentPropsWithoutRef<"button">;

export function DropdownMenuItem({
  children,
  icon,
  ...props
}: DropdownMenuItemProps) {
  return (
    <li role="item">
      <button
        type="button"
        className="w-full cursor-pointer grid justify-start grid-flow-col
              gap-4 leading-[.85lh] p-6 outline-none focus-visible:bg-slate-50"
        {...props}
      >
        {icon}
        {children}
      </button>
    </li>
  );
}
