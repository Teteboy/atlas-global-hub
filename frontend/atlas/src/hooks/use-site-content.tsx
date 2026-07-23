import { createContext, useContext, ReactNode, useMemo } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useLanguage } from "./use-language";

export interface SiteContentItem {
  id: number;
  key: string;
  valueFr: string | null;
  valueEn: string | null;
  value: string | null;
  type: string;
  category: string;
}

interface SiteContentResponse {
  rows: SiteContentItem[];
  byKey: Record<string, SiteContentItem>;
}

interface SiteSettingsResponse {
  rows: { key: string; value: string }[];
  byKey: Record<string, string>;
}

interface SiteContentContextValue {
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

const SiteContentContext = createContext<SiteContentContextValue | undefined>(undefined);

async function fetchSiteContent(): Promise<SiteContentResponse> {
  const res = await fetch("/api/site-content", { credentials: "include" });
  if (!res.ok) throw new Error("Failed to load site content");
  return res.json();
}

async function fetchSiteSettings(): Promise<SiteSettingsResponse> {
  const res = await fetch("/api/site-settings", { credentials: "include" });
  if (!res.ok) throw new Error("Failed to load site settings");
  return res.json();
}

export function SiteContentProvider({ children }: { children: ReactNode }) {
  const { lang } = useLanguage();
  const queryClient = useQueryClient();

  const contentQuery = useQuery<SiteContentResponse>({
    queryKey: ["site-content"],
    queryFn: fetchSiteContent,
    staleTime: 2 * 60 * 1000,
    retry: 1,
  });

  const settingsQuery = useQuery<SiteSettingsResponse>({
    queryKey: ["site-settings"],
    queryFn: fetchSiteSettings,
    staleTime: 2 * 60 * 1000,
    retry: 1,
  });

  const content = contentQuery.data?.byKey ?? {};
  const settings = settingsQuery.data?.byKey ?? {};

  const value = useMemo<SiteContentContextValue>(() => {
    const getValue = (key: string, fallback = ""): string => {
      const item = content[key];
      if (!item) return fallback;
      return item.value ?? fallback;
    };

    const getText = (key: string, fallbackFr = "", fallbackEn = ""): string => {
      const item = content[key];
      if (!item) return lang === "fr" ? fallbackFr : fallbackEn;
      if (lang === "fr") return item.valueFr ?? item.value ?? fallbackFr ?? fallbackEn;
      return item.valueEn ?? item.value ?? fallbackEn ?? fallbackFr;
    };

    const getJson = <T = unknown,>(key: string, fallback?: T): T => {
      const item = content[key];
      const raw = item?.value;
      if (!raw) return fallback as T;
      try {
        return JSON.parse(raw) as T;
      } catch {
        return fallback as T;
      }
    };

    const getSetting = (key: string, fallback = ""): string => {
      return settings[key] ?? fallback;
    };

    return {
      content,
      settings,
      isLoading: contentQuery.isLoading || settingsQuery.isLoading,
      error: contentQuery.error ?? settingsQuery.error,
      getText,
      getValue,
      getJson,
      getSetting,
      refetch: async () => {
        await queryClient.invalidateQueries({ queryKey: ["site-content"] });
        await queryClient.invalidateQueries({ queryKey: ["site-settings"] });
      },
    };
  }, [content, settings, lang, contentQuery.isLoading, contentQuery.error, settingsQuery.isLoading, settingsQuery.error, queryClient]);

  return <SiteContentContext.Provider value={value}>{children}</SiteContentContext.Provider>;
}

export function useSiteContent() {
  const context = useContext(SiteContentContext);
  if (context === undefined) {
    throw new Error("useSiteContent must be used within a SiteContentProvider");
  }
  return context;
}
