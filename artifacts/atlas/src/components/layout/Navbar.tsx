import { Link, useLocation } from "wouter";
import { useLanguage } from "@/hooks/use-language";
import { cn } from "@/lib/utils";
import logo from "@assets/Atlas_Global_Resilience_Corp._1782516926969.png";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const { lang, setLang, t } = useLanguage();
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
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
          ? "bg-[#080E1C]/95 backdrop-blur-xl border-b border-white/10 py-3 shadow-2xl shadow-black/20"
          : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 z-50 relative shrink-0">
          <img
            src={logo}
            alt="Atlas Global Resilience Corp."
            className="h-9 md:h-10 w-auto object-contain"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "relative px-4 py-2 text-sm font-medium transition-colors rounded-lg",
                isActive(link.href)
                  ? "text-[#00C4D4]"
                  : "text-white/75 hover:text-white hover:bg-white/5"
              )}
            >
              {link.label}
              {isActive(link.href) && (
                <motion.div
                  layoutId="nav-underline"
                  className="absolute bottom-0 left-4 right-4 h-px bg-[#00C4D4]"
                />
              )}
            </Link>
          ))}
        </nav>

        {/* Right: language + CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <div className="flex items-center bg-white/10 rounded-full p-1 border border-white/15">
            <button
              onClick={() => setLang("fr")}
              className={cn(
                "px-3 py-1 text-xs font-semibold rounded-full transition-all",
                lang === "fr"
                  ? "bg-[#00C4D4] text-white shadow-sm"
                  : "text-white/60 hover:text-white"
              )}
            >
              FR
            </button>
            <button
              onClick={() => setLang("en")}
              className={cn(
                "px-3 py-1 text-xs font-semibold rounded-full transition-all",
                lang === "en"
                  ? "bg-[#00C4D4] text-white shadow-sm"
                  : "text-white/60 hover:text-white"
              )}
            >
              EN
            </button>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#00C4D4] hover:bg-[#00b0bf] text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-200 shadow-lg shadow-[#00C4D4]/25 hover:shadow-[#00C4D4]/40"
          >
            {t("Nous contacter", "Contact us")}
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden z-50 text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-0 bg-[#080E1C] z-40 flex flex-col pt-24 px-8 lg:hidden"
          >
            <nav className="flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 + 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center py-4 text-xl font-semibold border-b border-white/10 transition-colors",
                      isActive(link.href) ? "text-[#00C4D4]" : "text-white/80 hover:text-white"
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="pt-6 flex flex-col gap-4"
              >
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => { setLang("fr"); }}
                    className={cn(
                      "flex-1 py-3 text-sm font-semibold rounded-full border transition-all",
                      lang === "fr"
                        ? "bg-[#00C4D4] text-white border-[#00C4D4]"
                        : "text-white/60 border-white/20 hover:text-white"
                    )}
                  >
                    Français
                  </button>
                  <button
                    onClick={() => { setLang("en"); }}
                    className={cn(
                      "flex-1 py-3 text-sm font-semibold rounded-full border transition-all",
                      lang === "en"
                        ? "bg-[#00C4D4] text-white border-[#00C4D4]"
                        : "text-white/60 border-white/20 hover:text-white"
                    )}
                  >
                    English
                  </button>
                </div>
                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center bg-[#00C4D4] hover:bg-[#00b0bf] text-white font-semibold py-3.5 rounded-full transition-colors"
                >
                  {t("Nous contacter", "Contact us")}
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
