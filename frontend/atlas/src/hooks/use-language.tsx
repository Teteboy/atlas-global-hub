import { createContext, useContext, useState, ReactNode } from "react";
import { SiteContentContext, type SiteContentContextValue } from "./site-content-context";

type Language = "fr" | "en";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>("fr");

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const languageContext = useContext(LanguageContext);
  if (languageContext === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  const { lang, setLang } = languageContext;
  const siteContent = useContext(SiteContentContext);
  const { content } = siteContent ?? { content: {} as SiteContentContextValue["content"] };

  const t = (fr: string | undefined | null, en: string | undefined | null): string => {
    const key = (fr ?? "") as string;
    const item = content[key];
    if (lang === "fr") {
      return item?.valueFr?.trim() || fr || en || "";
    }
    return item?.valueEn?.trim() || en || fr || "";
  };

  return { lang, setLang, t };
}
