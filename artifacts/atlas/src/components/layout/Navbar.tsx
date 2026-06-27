import { Link, useLocation } from "wouter";
import { useLanguage } from "@/hooks/use-language";
import { cn } from "@/lib/utils";
import logo from "@assets/Atlas_Global_Resilience_Corp._1782516926969.png";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const { lang, setLang, t } = useLanguage();
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/about", label: t("À propos", "About") },
    { href: "/services", label: t("Services", "Services") },
    { href: "/sectors", label: t("Secteurs & Corridors", "Sectors & Corridors") },
    { href: "/projects", label: t("Réalisations", "Achievements") },
    { href: "/insights", label: t("Perspectives", "Insights") },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 border-b",
        isScrolled
          ? "bg-background/95 backdrop-blur-md border-border shadow-sm py-2"
          : "bg-background border-transparent py-4"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 z-50 relative">
          <img src={logo} alt="Atlas Global Resilience Corp." className="h-10 md:h-12 w-auto object-contain" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  location.startsWith(link.href) ? "text-primary font-semibold" : "text-muted-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4 border-l pl-4 border-border">
            <div className="flex bg-muted rounded-full p-1">
              <button
                onClick={() => setLang("fr")}
                className={cn(
                  "px-3 py-1 text-xs font-semibold rounded-full transition-all",
                  lang === "fr" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                )}
              >
                FR
              </button>
              <button
                onClick={() => setLang("en")}
                className={cn(
                  "px-3 py-1 text-xs font-semibold rounded-full transition-all",
                  lang === "en" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                )}
              >
                EN
              </button>
            </div>
            <Link href="/contact" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2">
              {t("Contact", "Contact")}
            </Link>
          </div>
        </nav>

        {/* Mobile Nav Toggle */}
        <button
          className="md:hidden z-50 text-foreground relative p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 bg-background pt-24 px-6 z-40 flex flex-col md:hidden overflow-y-auto">
            <nav className="flex flex-col gap-6 text-lg font-medium">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "transition-colors hover:text-primary py-2 border-b border-border/50",
                    location.startsWith(link.href) ? "text-primary" : "text-foreground"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="transition-colors hover:text-primary py-2 border-b border-border/50 text-primary"
              >
                {t("Contact", "Contact")}
              </Link>
            </nav>
            <div className="mt-8 flex items-center justify-center gap-4">
               <div className="flex bg-muted rounded-full p-1 w-full justify-center">
                <button
                  onClick={() => { setLang("fr"); setMobileMenuOpen(false); }}
                  className={cn(
                    "flex-1 px-6 py-2 text-sm font-semibold rounded-full transition-all",
                    lang === "fr" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  Français
                </button>
                <button
                  onClick={() => { setLang("en"); setMobileMenuOpen(false); }}
                  className={cn(
                    "flex-1 px-6 py-2 text-sm font-semibold rounded-full transition-all",
                    lang === "en" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  English
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
