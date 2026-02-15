"use client";

import type { MouseEvent, ReactNode } from "react";

type AnchorLinkProps = {
  targetId: string;
  className?: string;
  children: ReactNode;
};

export function AnchorLink({ targetId, className, children }: AnchorLinkProps) {
  return (
    <a
      href={`#${targetId}`}
      className={className}
      onClick={(event: MouseEvent<HTMLAnchorElement>) => {
        const target = document.getElementById(targetId);
        if (!target) {
          return;
        }

        event.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });

        const { pathname, search } = window.location;
        window.history.replaceState(null, "", `${pathname}${search}`);
      }}
    >
      {children}
    </a>
  );
}
