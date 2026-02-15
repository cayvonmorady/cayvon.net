"use client";

import type { ContextMenuAction } from "@/components/retro-desktop/types";

type ContextMenuProps = {
  x: number;
  y: number;
  onAction: (action: ContextMenuAction) => void;
};

const MENU_ITEMS: Array<{ action: ContextMenuAction; label: string }> = [
  { action: "refresh", label: "Refresh" },
  { action: "arrange-icons", label: "Arrange Icons by Name" },
  { action: "open-all", label: "Open All Windows" },
  { action: "close-all", label: "Close All Windows" },
  { action: "properties", label: "Properties" },
];

export function ContextMenu({ x, y, onAction }: ContextMenuProps) {
  return (
    <div
      className="window retro-context-menu"
      style={{
        left: x,
        top: y,
      }}
      role="menu"
      aria-label="Desktop context menu"
    >
      <ul>
        {MENU_ITEMS.map((item) => (
          <li key={item.action}>
            <button
              type="button"
              className="retro-context-menu__item"
              onClick={() => onAction(item.action)}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
