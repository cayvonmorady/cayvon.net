"use client";

import type { ReactNode } from "react";
import { BeveledButton } from "@/components/retro-desktop/controls/beveled-button";

type DialogAction = {
  id: string;
  label: string;
  onClick: () => void;
};

type DialogProps = {
  title: string;
  body: ReactNode;
  actions?: DialogAction[];
};

export function Dialog({ title, body, actions = [] }: DialogProps) {
  return (
    <div className="window retro-dialog-window">
      <div className="title-bar">
        <div className="title-bar-text">{title}</div>
      </div>
      <div className="window-body retro-dialog-body">
        <div>{body}</div>
        {actions.length > 0 ? (
          <div className="retro-dialog-actions">
            {actions.map((action) => (
              <BeveledButton key={action.id} onClick={action.onClick}>
                {action.label}
              </BeveledButton>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
