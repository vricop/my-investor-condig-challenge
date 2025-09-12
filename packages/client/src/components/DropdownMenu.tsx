import { EllipsisVertical, Eye, LogOut } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export type DropdownMenuProps = React.ComponentPropsWithoutRef<"button">;

export function DropdownMenu({ ...props }) {
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (!dialogRef.current) return;

    const dialog = dialogRef.current;
    if (!isOpen) {
      dialog.close();
      return;
    }

    dialog.show();

    const ac = new AbortController();

    document.addEventListener(
      "pointerdown",
      (e) => {
        const path = e.composedPath();
        if (path.includes(dialog)) return;
        dialog.close();
        setIsOpen(false);
      },
      { capture: true, signal: ac.signal },
    );

    document.addEventListener(
      "keydown",
      (e) => {
        if (e.key !== "Escape" || !dialog.open) return;
        dialog.close();
        setIsOpen(false);
      },
      { signal: ac.signal },
    );

    return () => ac.abort();
  }, [isOpen]);

  return (
    <div className="relative">
      <button
        {...props}
        type="button"
        className="rounded-[1lh] cursor-pointer w-6 aspect-square grid
      place-content-center outline-none ring-offset-4
      focus-visible:ring-2 ring-blue-500"
        onClick={() => setIsOpen((state) => !state)}
      >
        <EllipsisVertical className="text-blue-700" />
      </button>
      <dialog
        onClick={(e) => {
          if (e.target === dialogRef.current) {
            setIsOpen(false);
          }
        }}
        ref={dialogRef}
        role="menu"
        className="m-0 z-10 w-max absolute inset-[unset]
        top-[calc(100%+theme(spacing.3))] right-0 bg-white rounded-2xl
        overflow-hidden shadow-xl ring-1 ring-slate-200"
      >
        <ul
          role="presentation"
          className="bg-white text-blue-700 font-bold text-lg [&>*+*]:border-t
          [&>*+*]:border-slate-200"
        >
          <li role="item">
            <button
              type="button"
              className="w-full cursor-pointer grid justify-start grid-flow-col
              gap-4 leading-[.85lh] p-6 outline-none focus-visible:bg-slate-50"
            >
              <LogOut />
              Comprar
            </button>
          </li>
          <li>
            <button
              type="button"
              className="w-full cursor-pointer grid justify-start grid-flow-col
              gap-4 leading-[.85lh] p-6 outline-none focus-visible:bg-slate-50"
            >
              <Eye />
              Ver detalle
            </button>
          </li>
        </ul>
      </dialog>
    </div>
  );
}
