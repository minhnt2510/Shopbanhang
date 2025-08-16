import { useState } from "react";
import {
  useFloating,
  offset,
  flip,
  shift,
  useHover,
  useDismiss,
  useRole,
  useInteractions,
  safePolygon,
} from "@floating-ui/react";

export function Dropdown({
  trigger,
  children,
}: {
  trigger: React.ReactNode;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: setOpen,
    middleware: [offset(6), flip(), shift()],
  });

  // hover thay vì click
  const hover = useHover(context, {
    move: false,
    handleClose: safePolygon(), // giúp không bị đóng ngay khi rê chuột sang menu
  });
  const dismiss = useDismiss(context);
  const role = useRole(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    dismiss,
    role,
  ]);

  return (
    <>
      <div ref={refs.setReference} {...getReferenceProps()}>
        {trigger}
      </div>
      {open && (
        <div
          ref={refs.setFloating}
          style={floatingStyles}
          {...getFloatingProps()}
          className="bg-white rounded shadow-lg p-3 w-64 z-50 transition-opacity duration-200"
        >
          {children}
        </div>
      )}
    </>
  );
}
