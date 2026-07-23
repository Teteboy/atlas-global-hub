import { Link, useLocation } from "wouter";
import { useLanguage } from "@/hooks/use-language";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const { lang, setLang, t } = useLanguage();
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  const navLinks = [
    { href: "/about", label: t("À propos", "About") },
    { href: "/services", label: t("Services", "Services") },
    { href: "/sectors", label: t("Secteurs", "Sectors") },
    { href: "/projects", label: t("Réalisations", "Projects") },
    { href: "/insights", label: t("Perspectives", "Insights") },
  ];

  const isActive = (href: string) => location.startsWith(href);

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-500",
        isScrolled
          ? "bg-[var(--color-atlas-dark)]/98 backdrop-blur-2xl border-b border-white/8 shadow-2xl shadow-black/40"
          : "bg-gradient-to-b from-black/30 to-transparent"
      )}
    >
      {/* Top accent bar */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[var(--color-atlas-primary)]/60 to-transparent" />

      <div className={cn(
        "container mx-auto px-6 lg:px-10 flex items-center justify-between transition-all duration-500",
        isScrolled ? "py-3" : "py-4"
      )}>

        {/* Logo + wordmark */}
        <Link href="/" className="flex items-center gap-2.5 z-50 relative shrink-0 group">
          <div className="relative">
            <img
              src="/logo.png"
              alt="Atlas Global Resilience Corp."
              className={cn(
                "w-auto object-contain transition-all duration-500",
                isScrolled ? "h-20" : "h-24"
              )}
            />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-display text-white font-bold text-base lg:text-xl tracking-wide">
              Atlas Global
            </span>
            <span className="text-[var(--color-atlas-primary)] text-xs lg:text-sm font-medium tracking-widest uppercase">
              Resilience Corp.
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-0.5">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "relative px-4 py-2 text-[13px] font-medium tracking-wide transition-all duration-200 rounded-md group",
                isActive(link.href)
                  ? "text-white"
                  : "text-white/60 hover:text-white"
              )}
            >
              {link.label}
              <span
                className={cn(
                  "absolute bottom-0.5 left-4 right-4 h-px rounded-full transition-all duration-300",
                  isActive(link.href)
                    ? "bg-[var(--color-atlas-primary)] opacity-100"
                    : "bg-[var(--color-atlas-primary)] opacity-0 group-hover:opacity-40"
                )}
              />
            </Link>
          ))}
        </nav>

        {/* Right controls */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Language switcher — minimal pill */}
          <div className="flex items-center rounded-md border border-white/15 overflow-hidden">
            <button
              onClick={() => setLang("fr")}
              className={cn(
                "px-3 py-1.5 text-[11px] font-bold tracking-widest uppercase transition-all duration-200",
                lang === "fr"
                  ? "bg-[var(--color-atlas-primary)] text-white"
                  : "text-white/50 hover:text-white hover:bg-white/5"
              )}
            >
              FR
            </button>
            <div className="w-px h-4 bg-white/15" />
            <button
              onClick={() => setLang("en")}
              className={cn(
                "px-3 py-1.5 text-[11px] font-bold tracking-widest uppercase transition-all duration-200",
                lang === "en"
                  ? "bg-[var(--color-atlas-primary)] text-white"
                  : "text-white/50 hover:text-white hover:bg-white/5"
              )}
            >
              EN
            </button>
          </div>

          {/* CTA */}
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-[var(--color-atlas-primary)] hover:bg-[var(--color-atlas-primary-hover)] text-white text-[13px] font-semibold px-5 py-2.5 rounded-md transition-all duration-200 shadow-lg shadow-[var(--color-atlas-primary)]/20 hover:shadow-[var(--color-atlas-primary)]/40 hover:-translate-y-px"
          >
            {t("Nous contacter", "Contact Us")}
          </Link>
        </div>

        {/* Mobile controls */}
        <div className="lg:hidden flex items-center gap-2">
          {/* Language switcher — minimal pill */}
          <div className="flex items-center rounded-md border border-white/15 overflow-hidden">
            <button
              onClick={() => setLang("fr")}
              className={cn(
                "px-2 py-1.5 text-[11px] font-bold tracking-widest uppercase transition-all duration-200",
                lang === "fr"
                  ? "bg-[var(--color-atlas-primary)] text-white"
                  : "text-white/50 hover:text-white hover:bg-white/5"
              )}
            >
              FR
            </button>
            <div className="w-px h-4 bg-white/15" />
            <button
              onClick={() => setLang("en")}
              className={cn(
                "px-2 py-1.5 text-[11px] font-bold tracking-widest uppercase transition-all duration-200",
                lang === "en"
                  ? "bg-[var(--color-atlas-primary)] text-white"
                  : "text-white/50 hover:text-white hover:bg-white/5"
              )}
            >
              EN
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            className="z-50 text-white p-2 rounded-md hover:bg-white/10 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={mobileMenuOpen ? "close" : "open"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </motion.div>
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-0 bg-[var(--color-atlas-dark)]/99 backdrop-blur-xl z-[60] flex flex-col lg:hidden"
          >
            {/* Mobile header */}
            <div className="h-px w-full bg-gradient-to-r from-transparent via-[var(--color-atlas-primary)]/60 to-transparent" />
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/8">
              <Link href="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2.5">
                <img src="/logo.png" alt="Atlas" className="h-20 w-auto object-contain" />
                <div className="flex flex-col leading-tight">
                  <span className="font-display text-white font-bold text-base">Atlas Global</span>
                  <span className="text-[var(--color-atlas-primary)] text-xs font-medium tracking-widest uppercase">Resilience Corp.</span>
                </div>
              </Link>
              <button
                className="text-white p-2 rounded-md hover:bg-white/10 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X size={22} />
              </button>
            </div>

            <nav className="flex flex-col px-6 pt-6 gap-1 flex-1 overflow-y-auto">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 + 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center justify-between py-4 text-base font-semibold border-b border-white/8 transition-colors",
                      isActive(link.href) ? "text-[var(--color-atlas-primary)]" : "text-white/75 hover:text-white"
                    )}
                  >
                    {link.label}
                    {isActive(link.href) && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-atlas-primary)]" />
                    )}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="pt-8"
              >
                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center bg-[var(--color-atlas-primary)] hover:bg-[var(--color-atlas-primary-hover)] text-white font-semibold py-3 rounded-md transition-colors text-sm"
                >
                  {t("Nous contacter", "Contact Us")}
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
