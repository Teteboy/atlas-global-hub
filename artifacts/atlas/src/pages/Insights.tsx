import { useLanguage } from "@/hooks/use-language";
import { useListInsights } from "@workspace/api-client-react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowUpRight, Clock } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Insights() {
  const { t, lang } = useLanguage();
  const { data: insights, isLoading } = useListInsights();

  return (
    <div className="w-full">

      {/* HERO */}
      <section className="relative min-h-[55vh] flex items-end bg-[#080E1C] pb-16 pt-40 overflow-hidden">
        <div className="absolute inset-0 hero-grid opacity-50" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_80%_20%,rgba(0,196,212,0.1),transparent)]" />
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-4 flex items-center gap-3">
            <span className="w-6 h-px bg-[#00C4D4]" />
            <span className="text-[#00C4D4] text-xs font-semibold tracking-[0.2em] uppercase">{t("Perspectives", "Insights")}</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-5xl md:text-7xl text-white leading-tight max-w-3xl"
          >
            {t("Analyses & réflexions", "Analyses & reflections")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 text-white/55 text-lg max-w-2xl leading-relaxed"
          >
            {t(
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
              {[1,2,3].map(i => <Skeleton key={i} className="h-72 rounded-2xl" />)}
            </div>
          ) : (insights ?? []).length === 0 ? (
            <p className="text-muted-foreground text-center py-20">{t("Aucune perspective disponible.", "No insights available.")}</p>
          ) : (
            <div>
              {/* Featured: first article larger */}
              {insights && insights.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="mb-8"
                >
                  <Link href={`/insights/${insights[0].id}`} className="group block">
                    <div className="border border-border hover:border-[#00C4D4]/40 rounded-2xl p-10 md:p-12 hover:shadow-xl hover:shadow-black/5 transition-all duration-300">
                      <div className="flex flex-col md:flex-row gap-10">
                        <div className="flex-1">
                          {insights[0].category && (
                            <span className="inline-block px-3 py-1 text-xs font-semibold bg-[#00C4D4]/10 text-[#00C4D4] rounded-full mb-5">
                              {insights[0].category}
                            </span>
                          )}
                          <h2 className="font-display text-3xl md:text-4xl text-[#080E1C] mb-4 leading-snug group-hover:text-[#00C4D4] transition-colors">
                            {lang === "fr" ? insights[0].titleFr : insights[0].titleEn}
                          </h2>
                          <p className="text-muted-foreground leading-relaxed mb-6">
                            {lang === "fr" ? insights[0].taglineFr : insights[0].taglineEn}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            {insights[0].readTimeMinutes && (
                              <span className="flex items-center gap-1.5">
                                <Clock className="w-3.5 h-3.5" />
                                {insights[0].readTimeMinutes} min
                              </span>
                            )}
                            {insights[0].publishedAt && (
                              <span>{new Date(insights[0].publishedAt).toLocaleDateString(lang === "fr" ? "fr-CA" : "en-CA", { year: "numeric", month: "long", day: "numeric" })}</span>
                            )}
                          </div>
                        </div>
                        <div className="md:w-48 shrink-0 flex flex-col justify-end">
                          <div className="inline-flex items-center gap-2 text-sm font-semibold text-[#00C4D4]">
                            {t("Lire l'analyse", "Read analysis")}
                            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )}

              {/* Remaining articles in 3-col grid */}
              {insights && insights.length > 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {insights.slice(1).map((insight, i) => (
                    <motion.div
                      key={insight.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, duration: 0.5 }}
                    >
                      <Link href={`/insights/${insight.id}`} className="group block h-full">
                        <div className="h-full border border-border hover:border-[#00C4D4]/40 rounded-2xl p-7 hover:shadow-lg hover:shadow-black/5 transition-all duration-300 flex flex-col">
                          {insight.category && (
                            <span className="inline-block px-3 py-1 text-xs font-semibold bg-[#00C4D4]/10 text-[#00C4D4] rounded-full mb-5 w-fit">
                              {insight.category}
                            </span>
                          )}
                          <h3 className="font-bold text-[#080E1C] mb-3 group-hover:text-[#00C4D4] transition-colors leading-snug flex-1">
                            {lang === "fr" ? insight.titleFr : insight.titleEn}
                          </h3>
                          <p className="text-sm text-muted-foreground leading-relaxed mb-6 line-clamp-3">
                            {lang === "fr" ? insight.taglineFr : insight.taglineEn}
                          </p>
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            {insight.readTimeMinutes && (
                              <span className="flex items-center gap-1.5">
                                <Clock className="w-3 h-3" />
                                {insight.readTimeMinutes} min
                              </span>
                            )}
                            <span className="flex items-center gap-1 font-semibold text-[#00C4D4]">
                              {t("Lire", "Read")}
                              <ArrowUpRight className="w-3.5 h-3.5" />
                            </span>
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

      {/* NEWSLETTER CTA */}
      <section className="py-20 bg-[#080E1C] relative overflow-hidden">
        <div className="absolute inset-0 hero-grid opacity-40" />
        <div className="container mx-auto px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="font-display text-3xl md:text-4xl text-white mb-3">
              {t("Restons connectés.", "Let's stay connected.")}
            </h2>
            <p className="text-white/50 max-w-lg">
              {t(
                "Abonnez-vous à nos analyses stratégiques sur les corridors Canada-Afrique.",
                "Subscribe to our strategic analyses on Canada-Africa corridors."
              )}
            </p>
          </div>
          <Link
            href="/contact"
            className="shrink-0 inline-flex items-center gap-2 bg-[#00C4D4] hover:bg-[#00b0bf] text-white font-semibold px-8 py-4 rounded-full text-sm transition-all duration-200"
          >
            {t("Nous contacter", "Contact us")}
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

    </div>
  );
}
