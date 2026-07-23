import { useEffect } from "react";
import { useSiteContent } from "@/hooks/use-site-content";

const DEFAULT_COLORS = {
  "--color-atlas-dark": "#041b40",
  "--color-atlas-primary": "#c1a768",
  "--color-atlas-primary-hover": "#d4bb7a",
  "--color-atlas-light": "#f5f0e6",
};

export function SiteTheme() {
  const { getSetting } = useSiteContent();

  useEffect(() => {
    const root = document.documentElement;

    const dark = getSetting("theme.colorDark", DEFAULT_COLORS["--color-atlas-dark"]);
    const primary = getSetting("theme.colorPrimary", DEFAULT_COLORS["--color-atlas-primary"]);
    const primaryHover = getSetting("theme.colorPrimaryHover", DEFAULT_COLORS["--color-atlas-primary-hover"]);
    const light = getSetting("theme.colorLight", DEFAULT_COLORS["--color-atlas-light"]);

    root.style.setProperty("--color-atlas-dark", dark);
    root.style.setProperty("--color-atlas-primary", primary);
    root.style.setProperty("--color-atlas-primary-hover", primaryHover);
    root.style.setProperty("--color-atlas-light", light);
  }, [getSetting]);

  return null;
}
