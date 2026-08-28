import { useLanguage } from "@/hooks/use-language";
import { useSiteContent } from "@/hooks/use-site-content";
import { useListInsights } from "@workspace/api-client-react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowUpRight, Clock } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const DEFAULT_INSIGHT_IMAGES = [
  "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
];

export default function Insights() {
  const { t, lang } = useLanguage();
  const { getText, getSetting, getJson } = useSiteContent();
  const { data: insights, isLoading } = useListInsights();

  const primary = "var(--color-atlas-primary)";
  const primaryHover = "var(--color-atlas-primary-hover)";
  const dark = "var(--color-atlas-dark)";

  const heroImage = getSetting("insights.hero.image", "https://images.unsplash.com/photo-1488229297570-58520851e868?auto=format&fit=crop&w=1920&q=80");
  const ctaImage = getSetting("insights.cta.image", "https://images.unsplash.com/photo-1573167507387-6b4b98cb7c13?auto=format&fit=crop&w=1920&q=80");
  const insightImages = getJson<string[]>("insights.images.json", DEFAULT_INSIGHT_IMAGES);

  return (
    <div className="w-full">

      {/* HERO */}
      <section className={`relative min-h-[60vh] flex items-end bg-[var(--color-atlas-dark)] pb-16 pt-40 overflow-hidden`}>
        <div className="absolute inset-0 z-0">
          <img src={heroImage}
            alt={getText("insights.hero.imageAlt", "Perspectives stratégiques", "Strategic insights")} className="w-full h-full object-cover opacity-20" />
          <div className={`absolute inset-0 bg-gradient-to-r from-[var(--color-atlas-dark)] via-[var(--color-atlas-dark)]/85 to-transparent`} />
        </div>
        <div className="absolute inset-0 z-0 hero-grid opacity-40" />
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-4 flex items-center gap-3">
            <span className={`w-6 h-px bg-[var(--color-atlas-primary)]`} />
            <span className={`text-[var(--color-atlas-primary)] text-xs font-semibold tracking-[0.2em] uppercase`}>{getText("insights.hero.overline", "Perspectives", "Insights")}</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-5xl md:text-7xl text-white leading-tight max-w-3xl">
            {getText("insights.hero.title", "Analyses & réflexions", "Analyses & reflections")}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 text-white/55 text-lg max-w-2xl leading-relaxed">
            {getText("insights.hero.subtitle",
              "Nos points de vue sur les grandes tendances institutionnelles, économiques et climatiques qui façonnent les corridors Canada-Afrique.",
              "Our perspectives on major institutional, economic and climate trends shaping Canada-Africa corridors."
            )}
          </motion.p>
        </div>
      </section>

      {/* INSIGHTS GRID */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-8">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1,2,3].map(i => <Skeleton key={i} className="h-96 rounded-2xl" />)}
            </div>
          ) : !Array.isArray(insights) || insights.length === 0 ? (
            <p className="text-muted-foreground text-center py-20">{t("Aucune perspective disponible.", "No insights available.")}</p>
          ) : (
            <div>
              {/* Featured: first article full-width */}
              {Array.isArray(insights) && insights.length > 0 && (
                <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-10">
                  <Link href={`/insights/${insights[0].id}`} className="group block">
                    <div className={`border border-border hover:border-[var(--color-atlas-primary)]/40 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-black/8 transition-all duration-300`}>
                      <div className="grid grid-cols-1 lg:grid-cols-2">
                        {/* Image */}
                        <div className="relative h-64 lg:h-80 overflow-hidden">
                          <img src={insightImages[0]} alt={lang === "fr" ? (insights[0].titleFr ?? "") : (insights[0].titleEn ?? "")}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                          <div className={`absolute inset-0 bg-gradient-to-r from-transparent to-[var(--color-atlas-dark)]/20`} />
                        </div>
                        {/* Content */}
                        <div className="p-8 md:p-10 flex flex-col justify-center">
                          {insights[0].category && (
                            <span className={`inline-block px-3 py-1 text-xs font-semibold bg-[var(--color-atlas-primary)]/10 text-[var(--color-atlas-primary)] rounded-full mb-5 w-fit`}>
                              {insights[0].category}
                            </span>
                          )}
                          <h2 className={`font-display text-3xl md:text-4xl text-[var(--color-atlas-dark)] mb-4 leading-snug group-hover:text-[var(--color-atlas-primary)] transition-colors`}>
                            {lang === "fr" ? insights[0].titleFr : insights[0].titleEn}
                          </h2>
                          <p className="text-muted-foreground leading-relaxed mb-6">
                            {lang === "fr" ? insights[0].summaryFr : insights[0].summaryEn}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground mb-6">
                            {insights[0].publishedAt && (
                              <span>{new Date(insights[0].publishedAt).toLocaleDateString(lang === "fr" ? "fr-CA" : "en-CA", { year: "numeric", month: "long", day: "numeric" })}</span>
                            )}
                          </div>
                          <div className={`inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-atlas-primary)]`}>
                            {t("Lire l'analyse", "Read analysis")}
                            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )}

              {/* Remaining articles */}
              {insights && insights.length > 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {insights.slice(1).map((insight, i) => (
                    <motion.div key={insight.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }}>
                      <Link href={`/insights/${insight.id}`} className="group block h-full">
                        <div className={`h-full border border-border hover:border-[var(--color-atlas-primary)]/40 rounded-2xl overflow-hidden hover:shadow-lg hover:shadow-black/5 transition-all duration-300 flex flex-col`}>
                          {/* Thumbnail */}
                          <div className="relative h-48 overflow-hidden">
                            <img src={insightImages[(i + 1) % insightImages.length]} alt={lang === "fr" ? (insight.titleFr ?? "") : (insight.titleEn ?? "")}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                            <div className={`absolute inset-0 bg-[var(--color-atlas-dark)]/30`} />
                            {insight.category && (
                              <span className={`absolute bottom-3 left-4 px-3 py-1 text-xs font-semibold bg-[var(--color-atlas-primary)] text-white rounded-full`}>
                                {insight.category}
                              </span>
                            )}
                          </div>
                          <div className="p-6 flex flex-col flex-1">
                            <h3 className={`font-bold text-[var(--color-atlas-dark)] mb-3 group-hover:text-[var(--color-atlas-primary)] transition-colors leading-snug flex-1`}>
                              {lang === "fr" ? insight.titleFr : insight.titleEn}
                            </h3>
                            <p className="text-sm text-muted-foreground leading-relaxed mb-5 line-clamp-2">
                              {lang === "fr" ? insight.summaryFr : insight.summaryEn}
                            </p>
                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                              <span className={`flex items-center gap-1 font-semibold text-[var(--color-atlas-primary)]`}>
                                {t("Lire", "Read")} <ArrowUpRight className="w-3.5 h-3.5" />
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className={`relative py-20 bg-[var(--color-atlas-dark)] overflow-hidden`}>
        <div className="absolute inset-0 z-0">
          <img src={ctaImage}
            alt={getText("insights.cta.imageAlt", "Partenariat", "Partnership")} className="w-full h-full object-cover opacity-10" />
          <div className={`absolute inset-0 bg-[var(--color-atlas-dark)]/90`} />
        </div>
        <div className="absolute inset-0 z-0 hero-grid opacity-30" />
        <div className="container mx-auto px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="font-display text-3xl md:text-4xl text-white mb-3">{getText("insights.cta.title", "Restons connectés.", "Let's stay connected.")}</h2>
            <p className="text-white/50 max-w-lg">{getText("insights.cta.subtitle", "Abonnez-vous à nos analyses stratégiques sur les corridors Canada-Afrique.", "Subscribe to our strategic analyses on Canada-Africa corridors.")}</p>
          </div>
          <Link href="/contact"
            className={`shrink-0 inline-flex items-center gap-2 bg-[var(--color-atlas-primary)] hover:bg-[var(--color-atlas-primary-hover)] text-white font-semibold px-8 py-4 rounded-full text-sm transition-all duration-200`}>
            {getText("insights.cta.button", "Nous contacter", "Contact us")}
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

    </div>
  );
}
