import React from "react";

import { cn } from "@/lib/utils";

interface GradientTextProps extends React.HTMLAttributes<HTMLElement> {
  className?: string;
  children: React.ReactNode;
  as?: React.ElementType;
}

function GradientText({
  className,
  children,
  as: Component = "span",
  ...props
}: GradientTextProps) {
  return React.createElement(
    Component,
    {
      className: cn("title-accent", className),
      ...props,
    },
    children,
  );
}

export { GradientText };
