"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

const VisuallyHidden = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        "absolute -m-px h-px w-px overflow-hidden border-0 p-0 whitespace-nowrap",
        className,
      )}
      {...props}
    />
  ),
);
VisuallyHidden.displayName = "VisuallyHidden";

export { VisuallyHidden };
