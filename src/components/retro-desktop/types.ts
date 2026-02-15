export type DesktopWindowId =
  | "profile"
  | "experience"
  | "skills"
  | "education"
  | "explorer"
  | "about"
  | "error"
  | "loading"
  | "properties";

export type WindowState = {
  id: DesktopWindowId;
  title: string;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  isActive: boolean;
};

export type DesktopIcon = {
  id: string;
  label: string;
  windowId: DesktopWindowId;
  iconSrc?: string;
  fallbackIconSrc?: string;
};

export type ContextMenuAction =
  | "refresh"
  | "arrange-icons"
  | "open-all"
  | "close-all"
  | "properties";
