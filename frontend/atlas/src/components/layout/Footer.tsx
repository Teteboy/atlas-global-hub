import { Link } from "wouter";
import { useLanguage } from "@/hooks/use-language";
import { useSiteContent } from "@/hooks/use-site-content";

const LINKS = (t: (fr: string, en: string) => string) => [
  {
    title: t("Services", "Services"),
    links: [
      { label: t("Économie Numérique", "Digital Economy"), href: "/services" },
      { label: t("Gouvernance", "Governance"), href: "/services" },
      { label: t("Finance Verte", "Green Finance"), href: "/services" },
      { label: t("Éducation", "Education"), href: "/services" },
      { label: t("Coopération", "Cooperation"), href: "/services" },
    ],
  },
  {
    title: t("Corridors", "Corridors"),
    links: [
      { label: "Canada–Cameroun", href: "/sectors" },
      { label: "Canada–Nigéria", href: "/sectors" },
      { label: t("Afrique Régionale", "Regional Africa"), href: "/sectors" },
      { label: t("Transatlantique", "Transatlantic"), href: "/sectors" },
    ],
  },
  {
    title: t("Entreprise", "Company"),
    links: [
      { label: t("À propos", "About"), href: "/about" },
      { label: t("Réalisations", "Projects"), href: "/projects" },
      { label: t("Perspectives", "Insights"), href: "/insights" },
      { label: t("Contact", "Contact"), href: "/contact" },
    ],
  },
];

export default function Footer() {
  const { t } = useLanguage();
  const { getSetting } = useSiteContent();
  const dark = getSetting("theme.colorDark", "var(--color-atlas-dark)");
  const primary = "var(--color-atlas-primary)";
  const primaryHover = "var(--color-atlas-primary-hover)";

  return (
    <footer className={`bg-[var(--color-atlas-dark)] text-white relative overflow-hidden`}>
      {/* Top image band */}
      <div className="relative h-40 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1920&q=80"
          alt="Atlas Global"
          className="w-full h-full object-cover opacity-15"
        />
        <div className={`absolute inset-0 bg-gradient-to-b from-transparent to-[var(--color-atlas-dark)]`} />
        <div className="absolute inset-0 flex items-center container mx-auto px-6 lg:px-8">
          <p className="font-display text-2xl md:text-3xl text-white/70 max-w-2xl leading-snug">
            {t(
              "Bâtir des partenariats durables entre le Canada, l'Afrique et le monde.",
              "Building lasting partnerships between Canada, Africa and the world."
            )}
          </p>
        </div>
      </div>

      {/* Main footer */}
      <div className="container mx-auto px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-5">
              <img 
                src="/logo.png" 
                alt="Atlas Global Resilience Corp." 
                className="h-28 w-auto object-contain"
              />
              <div className="flex flex-col leading-tight">
                <span className="font-display text-white font-bold text-lg lg:text-xl tracking-wide">Atlas Global</span>
                <span className={`text-[var(--color-atlas-primary)] text-xs lg:text-sm font-medium tracking-widest uppercase`}>Resilience Corp.</span>
              </div>
            </div>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs mb-6">
              {t(
                "Firme internationale de conseil stratégique opérant à l'intersection du Canada, de l'Afrique et de leurs partenaires mondiaux.",
                "International strategic advisory firm operating at the intersection of Canada, Africa and their global partners."
              )}
            </p>
            <Link href="/contact"
              className={`inline-flex items-center gap-2 bg-[var(--color-atlas-primary)] hover:bg-[var(--color-atlas-primary-hover)] text-white text-xs font-semibold px-5 py-2.5 rounded-full transition-colors`}>
              {t("Nous contacter", "Contact us")} →
            </Link>
          </div>

          {/* Links */}
          {LINKS(t).map((col, i) => (
            <div key={i}>
              <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-5">{col.title}</h4>
              <ul className="space-y-3">
                {col.links.map((link, li) => (
                  <li key={li}>
                    <Link href={link.href}
                      className={`text-white/40 hover:text-[var(--color-atlas-primary)] text-sm transition-colors`}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/30">
          <span>© 2024 Atlas Global Resilience Corp. {t("Tous droits réservés.", "All rights reserved.")}</span>
          <div className="flex items-center gap-2">
            <span className={`w-1.5 h-1.5 rounded-full bg-[var(--color-atlas-primary)]`} />
            <span className={`text-[var(--color-atlas-primary)]/60`}>{t("Canada · Cameroun · Nigéria · International", "Canada · Cameroon · Nigeria · International")}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
