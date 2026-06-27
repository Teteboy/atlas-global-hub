import { Link } from "wouter";
import { useLanguage } from "@/hooks/use-language";
import logo from "@assets/Atlas_Global_Resilience_Corp._1782516926969.png";
import { Mail, MapPin, ArrowUpRight } from "lucide-react";

export function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  const navLinks = [
    { href: "/about", label: t("À propos", "About") },
    { href: "/services", label: t("Services", "Services") },
    { href: "/sectors", label: t("Secteurs & Corridors", "Sectors & Corridors") },
    { href: "/projects", label: t("Réalisations", "Projects") },
    { href: "/insights", label: t("Perspectives", "Insights") },
    { href: "/contact", label: t("Contact", "Contact") },
  ];

  const expertise = [
    t("Conseil stratégique", "Strategic advisory"),
    t("Assistance à la mise en œuvre", "Implementation support"),
    t("Transformation institutionnelle", "Institutional transformation"),
    t("Partenariats complexes", "Complex partnerships"),
    t("Gouvernance & Résilience", "Governance & Resilience"),
    t("Finance verte & Climat", "Green finance & Climate"),
  ];

  return (
    <footer className="bg-[#060C19] text-white">
      {/* Top bar */}
      <div className="border-b border-white/10">
        <div className="container mx-auto px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand column */}
            <div className="lg:col-span-1">
              <Link href="/">
                <img
                  src={logo}
                  alt="Atlas Global Resilience Corp."
                  className="h-10 mb-6 object-contain"
                />
              </Link>
              <p className="text-white/50 text-sm leading-relaxed mb-6">
                {t(
                  "Firme internationale de conseil stratégique, structurant des initiatives à fort impact entre le Canada, l'Afrique et leurs partenaires.",
                  "International strategic advisory firm, structuring high-impact initiatives between Canada, Africa and their partners."
                )}
              </p>
              <div className="flex flex-col gap-3 text-sm text-white/50">
                <a
                  href="mailto:contact@atlas-grc.com"
                  className="flex items-center gap-2 hover:text-[#00C4D4] transition-colors"
                >
                  <Mail className="w-4 h-4 shrink-0" />
                  contact@atlas-grc.com
                </a>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 shrink-0" />
                  Canada · Afrique · International
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div>
              <h3 className="text-xs font-semibold tracking-widest uppercase text-white/30 mb-6">
                {t("Navigation", "Navigation")}
              </h3>
              <ul className="space-y-3">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/55 hover:text-white transition-colors flex items-center gap-1 group"
                    >
                      {link.label}
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Expertise */}
            <div>
              <h3 className="text-xs font-semibold tracking-widest uppercase text-white/30 mb-6">
                {t("Expertise", "Expertise")}
              </h3>
              <ul className="space-y-3">
                {expertise.map((item, i) => (
                  <li key={i} className="text-sm text-white/55">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <div>
              <h3 className="text-xs font-semibold tracking-widest uppercase text-white/30 mb-6">
                {t("Travaillons ensemble", "Let's work together")}
              </h3>
              <p className="text-sm text-white/50 mb-6 leading-relaxed">
                {t(
                  "Vous avez un projet ? Prenons le temps d'en discuter.",
                  "Have a project? Let's take the time to discuss it."
                )}
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-[#00C4D4] hover:bg-[#00b0bf] text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors"
              >
                {t("Nous contacter", "Contact us")}
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="container mx-auto px-6 lg:px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs text-white/30">
          &copy; {year} Atlas Global Resilience Corp.{" "}
          {t("Tous droits réservés.", "All rights reserved.")}
        </p>
        <div className="flex items-center gap-6">
          <span className="text-xs text-white/20">
            Canada · Cameroun · Nigéria · International
          </span>
        </div>
      </div>
    </footer>
  );
}
