import { useLanguage } from "@/hooks/use-language";
import { useListSectors } from "@workspace/api-client-react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowUpRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const CORRIDOR_DATA: Record<number, { from: string; to: string; color: string; img: string }> = {
  0: { from: "Canada", to: "Cameroun", color: "#00C4D4", img: "https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=800&q=80" },
  1: { from: "Canada", to: "Nigéria", color: "#0EA5E9", img: "https://images.unsplash.com/photo-1570173655490-d4c94ba4b0c5?auto=format&fit=crop&w=800&q=80" },
  2: { from: "Afrique", to: "Régionale", color: "#10B981", img: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=800&q=80" },
  3: { from: "Transatlantique", to: "International", color: "#8B5CF6", img: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80" },
};

export default function Sectors() {
  const { t, lang } = useLanguage();
  const { data: sectors, isLoading } = useListSectors();

  return (
    <div className="w-full">

      {/* HERO */}
      <section className="relative min-h-[60vh] flex items-end bg-[#080E1C] pb-16 pt-40 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1502920917128-1aa500764bed?auto=format&fit=crop&w=1920&q=80"
            alt="Global corridors" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080E1C] via-[#080E1C]/85 to-transparent" />
        </div>
        <div className="absolute inset-0 z-0 hero-grid opacity-40" />
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-4 flex items-center gap-3">
            <span className="w-6 h-px bg-[#00C4D4]" />
            <span className="text-[#00C4D4] text-xs font-semibold tracking-[0.2em] uppercase">{t("Secteurs & Corridors", "Sectors & Corridors")}</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-5xl md:text-7xl text-white leading-tight max-w-3xl">
            {t("4 corridors stratégiques", "4 strategic corridors")}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 text-white/55 text-lg max-w-2xl leading-relaxed">
            {t(
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
              {(sectors ?? []).map((sector, i) => {
                const meta = CORRIDOR_DATA[i] ?? { from: "—", to: "—", color: "#00C4D4", img: "" };
                return (
                  <motion.div key={sector.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.55 }}
                    className="group rounded-2xl overflow-hidden border border-border hover:border-[#00C4D4]/40 hover:shadow-2xl hover:shadow-black/8 transition-all duration-300">
                    {/* Image header */}
                    <div className="relative h-52 overflow-hidden">
                      <img src={meta.img} alt={lang === "fr" ? sector.titleFr : sector.titleEn}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#080E1C]/90 via-[#080E1C]/40 to-transparent" />
                      {/* Corridor badge */}
                      <div className="absolute top-4 left-4 flex items-center gap-2">
                        <span className="px-3 py-1.5 text-xs font-bold rounded-full text-white" style={{ backgroundColor: meta.color }}>
                          {meta.from} → {meta.to}
                        </span>
                      </div>
                    </div>
                    {/* Content */}
                    <div className="p-7 bg-white">
                      <h2 className="font-display text-2xl text-[#080E1C] mb-4 leading-snug group-hover:text-[#00C4D4] transition-colors">
                        {lang === "fr" ? sector.titleFr : sector.titleEn}
                      </h2>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                        {lang === "fr" ? sector.descriptionFr : sector.descriptionEn}
                      </p>
                      {sector.countries && sector.countries.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-5">
                          {sector.countries.map((c: string, ci: number) => (
                            <span key={ci} className="px-2.5 py-1 text-xs font-medium rounded-full bg-[#F7F8FA] text-muted-foreground border border-border">{c}</span>
                          ))}
                        </div>
                      )}
                      <Link href="/contact"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold transition-colors" style={{ color: meta.color }}>
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
      <section className="relative py-24 bg-[#080E1C] text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1573492420057-29b4a2657440?auto=format&fit=crop&w=1920&q=80"
            alt="Africa development" className="w-full h-full object-cover opacity-10" />
          <div className="absolute inset-0 bg-[#080E1C]/90" />
        </div>
        <div className="absolute inset-0 z-0 hero-grid opacity-40" />
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-xl mb-14">
            <div className="flex items-center gap-3 mb-5">
              <span className="text-[#00C4D4] text-xs font-semibold tracking-[0.2em] uppercase">{t("Thématiques", "Themes")}</span>
              <span className="flex-1 h-px bg-white/15 max-w-12" />
            </div>
            <h2 className="font-display text-4xl md:text-5xl leading-tight">{t("Secteurs prioritaires", "Priority sectors")}</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              t("Gouvernance publique", "Public governance"),
              t("Compétitivité économique", "Economic competitiveness"),
              t("Finance verte & Climat", "Green finance & Climate"),
              t("Éducation & Formation", "Education & Training"),
              t("Transformation numérique", "Digital transformation"),
              t("Santé & Résilience", "Health & Resilience"),
              t("Agribusiness", "Agribusiness"),
              t("Infrastructure & PMO", "Infrastructure & PMO"),
            ].map((theme, i) => (
              <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="border border-white/10 rounded-xl px-5 py-4 hover:border-[#00C4D4]/40 hover:bg-white/3 transition-all duration-300">
                <span className="text-sm font-medium text-white/70">{theme}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
