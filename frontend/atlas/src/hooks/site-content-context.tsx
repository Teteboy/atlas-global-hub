import { createContext } from "react";

export interface SiteContentItem {
  id: number;
  key: string;
  valueFr: string | null;
  valueEn: string | null;
  value: string | null;
  type: string;
  category: string;
}

export interface SiteContentResponse {
  rows: SiteContentItem[];
  byKey: Record<string, SiteContentItem>;
}

export interface SiteSettingsResponse {
  rows: { key: string; value: string }[];
  byKey: Record<string, string>;
}

export interface SiteContentContextValue {
  content: Record<string, SiteContentItem>;
  settings: Record<string, string>;
  isLoading: boolean;
  error: unknown;
  getText: (key: string, fallbackFr?: string, fallbackEn?: string) => string;
  getValue: (key: string, fallback?: string) => string;
  getJson: <T = unknown>(key: string, fallback?: T) => T;
  getSetting: (key: string, fallback?: string) => string;
  refetch: () => Promise<void>;
}

export const SiteContentContext = createContext<SiteContentContextValue | undefined>(undefined);
