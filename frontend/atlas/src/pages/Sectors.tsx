import { useLanguage } from "@/hooks/use-language";
import { useSiteContent } from "@/hooks/use-site-content";
import { useListSectors } from "@workspace/api-client-react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowUpRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const DEFAULT_CORRIDOR_IMAGES = [
  "https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1570173655490-d4c94ba4b0c5?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80",
];

export default function Sectors() {
  const { t, lang } = useLanguage();
  const { getText, getSetting, getJson } = useSiteContent();
  const { data: sectors, isLoading } = useListSectors();

  const primary = "var(--color-atlas-primary)";
  const dark = "var(--color-atlas-dark)";
  const light = "var(--color-atlas-light)";

  const heroImage = getSetting("sectors.hero.image", "https://images.unsplash.com/photo-1502920917128-1aa500764bed?auto=format&fit=crop&w=1920&q=80");
  const thematicImage = getSetting("sectors.thematic.image", "https://images.unsplash.com/photo-1573492420057-29b4a2657440?auto=format&fit=crop&w=1920&q=80");
  const corridorImages = getJson<string[]>("sectors.corridor.images.json", DEFAULT_CORRIDOR_IMAGES);

  return (
    <div className="w-full">

      {/* HERO */}
      <section className={`relative min-h-[60vh] flex items-end bg-[var(--color-atlas-dark)] pb-16 pt-40 overflow-hidden`}>
        <div className="absolute inset-0 z-0">
          <img src={heroImage}
            alt={getText("sectors.hero.imageAlt", "Corridors mondiaux", "Global corridors")} className="w-full h-full object-cover opacity-20" />
          <div className={`absolute inset-0 bg-gradient-to-r from-[var(--color-atlas-dark)] via-[var(--color-atlas-dark)]/85 to-transparent`} />
        </div>
        <div className="absolute inset-0 z-0 hero-grid opacity-40" />
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-4 flex items-center gap-3">
            <span className={`w-6 h-px bg-[var(--color-atlas-primary)]`} />
            <span className={`text-[var(--color-atlas-primary)] text-xs font-semibold tracking-[0.2em] uppercase`}>{getText("sectors.hero.overline", "Secteurs & Corridors", "Sectors & Corridors")}</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-5xl md:text-7xl text-white leading-tight max-w-3xl">
            {getText("sectors.hero.title", "4 corridors stratégiques", "4 strategic corridors")}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 text-white/55 text-lg max-w-2xl leading-relaxed">
            {getText("sectors.hero.subtitle",
              "Des axes d'engagement prioritaires qui structurent notre présence géographique et sectorielle.",
              "Priority engagement axes that structure our geographical and sectoral presence."
            )}
          </motion.p>
        </div>
      </section>

      {/* CORRIDORS */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-8">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1,2,3,4].map(i => <Skeleton key={i} className="h-96 rounded-2xl" />)}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Array.isArray(sectors) && sectors.map((sector, i) => {
                const routes = getJson<{from: string; to: string}[]>("sectors.corridor.routes.json", [
                  { from: "Canada", to: "Cameroun" },
                  { from: "Canada", to: "Nigéria" },
                  { from: "Afrique", to: "Régionale" },
                  { from: "Transatlantique", to: "International" },
                ]);
                const route = routes[i] ?? { from: "—", to: "—" };
                return (
                  <motion.div key={sector.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.55 }}
                    className={`group rounded-2xl overflow-hidden border border-border hover:border-[var(--color-atlas-primary)]/40 hover:shadow-2xl hover:shadow-black/8 transition-all duration-300`}>
                    {/* Image header */}
                    <div className="relative h-52 overflow-hidden">
                      <img src={corridorImages[i % corridorImages.length]} alt={lang === "fr" ? sector.titleFr : sector.titleEn}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      <div className={`absolute inset-0 bg-gradient-to-t from-[var(--color-atlas-dark)]/90 via-[var(--color-atlas-dark)]/40 to-transparent`} />
                      {/* Corridor badge */}
                      <div className="absolute top-4 left-4 flex items-center gap-2">
                        <span className={`px-3 py-1.5 text-xs font-bold rounded-full text-white bg-[var(--color-atlas-primary)]`}>
                          {route.from} → {route.to}
                        </span>
                      </div>
                    </div>
                    {/* Content */}
                    <div className="p-7 bg-white">
                      <Link href={`/sectors/${sector.id}`}>
                        <h2 className={`font-display text-2xl text-[var(--color-atlas-dark)] mb-4 leading-snug group-hover:text-[var(--color-atlas-primary)] transition-colors`}>
                          {lang === "fr" ? sector.titleFr : sector.titleEn}
                        </h2>
                      </Link>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                        {lang === "fr" ? sector.descriptionFr : sector.descriptionEn}
                      </p>
                      {sector.countries && sector.countries.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-5">
                          {sector.countries.map((c: string, ci: number) => (
                            <span key={ci} className={`px-2.5 py-1 text-xs font-medium rounded-full bg-[var(--color-atlas-light)] text-muted-foreground border border-border`}>{c}</span>
                          ))}
                        </div>
                      )}
                      <Link href="/contact"
                        className={`inline-flex items-center gap-1.5 text-xs font-semibold transition-colors text-[var(--color-atlas-primary)]`}>
                        {t("Explorer ce corridor", "Explore this corridor")}
                        <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </Link>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* THEMATIC FOCUS - dark with image */}
      <section className={`relative py-24 bg-[var(--color-atlas-dark)] text-white overflow-hidden`}>
        <div className="absolute inset-0 z-0">
          <img src={thematicImage}
            alt={getText("sectors.thematic.imageAlt", "Développement africain", "Africa development")} className="w-full h-full object-cover opacity-10" />
          <div className={`absolute inset-0 bg-[var(--color-atlas-dark)]/90`} />
        </div>
        <div className="absolute inset-0 z-0 hero-grid opacity-40" />
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-xl mb-14">
            <div className="flex items-center gap-3 mb-5">
              <span className={`text-[var(--color-atlas-primary)] text-xs font-semibold tracking-[0.2em] uppercase`}>{getText("sectors.thematic.overline", "Thématiques", "Themes")}</span>
              <span className="flex-1 h-px bg-white/15 max-w-12" />
            </div>
            <h2 className="font-display text-4xl md:text-5xl leading-tight">{getText("sectors.thematic.title", "Secteurs prioritaires", "Priority sectors")}</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {getJson<string[]>("sectors.thematic.items.json", [
              "Gouvernance publique",
              "Compétitivité économique",
              "Finance verte & Climat",
              "Éducation & Formation",
              "Transformation numérique",
              "Santé & Résilience",
              "Agribusiness",
              "Infrastructure & PMO",
            ]).map((theme: string, i: number) => (
              <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className={`border border-white/10 rounded-xl px-5 py-4 hover:border-[var(--color-atlas-primary)]/40 hover:bg-white/3 transition-all duration-300`}>
                <span className="text-sm font-medium text-white/70">{theme}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
