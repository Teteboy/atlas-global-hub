import { useLanguage } from "@/hooks/use-language";
import { useListServices } from "@workspace/api-client-react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const SERVICE_BULLETS: Record<number, { fr: string[]; en: string[] }> = {
  0: {
    fr: ["Études de faisabilité", "Planification stratégique", "Analyse de marché", "Positionnement concurrentiel"],
    en: ["Feasibility studies", "Strategic planning", "Market analysis", "Competitive positioning"],
  },
  1: {
    fr: ["Pilotage de projets complexes", "Gestion des parties prenantes", "Suivi-évaluation", "Rapportage bailleur"],
    en: ["Complex project management", "Stakeholder management", "Monitoring & evaluation", "Funder reporting"],
  },
  2: {
    fr: ["Réforme organisationnelle", "Renforcement des capacités", "Gouvernance publique", "Gestion du changement"],
    en: ["Organizational reform", "Capacity building", "Public governance", "Change management"],
  },
  3: {
    fr: ["Analyse de compétitivité", "Développement des exportations", "Accès aux marchés", "Stratégie d'investissement"],
    en: ["Competitiveness analysis", "Export development", "Market access", "Investment strategy"],
  },
  4: {
    fr: ["Finance climatique", "Transition énergétique", "Éducation résiliente", "Projets à impact social"],
    en: ["Climate finance", "Energy transition", "Resilient education", "Social impact projects"],
  },
};

export default function Services() {
  const { t, lang } = useLanguage();
  const { data: services, isLoading } = useListServices();

  return (
    <div className="w-full">

      {/* HERO */}
      <section className="relative min-h-[55vh] flex items-end bg-[#080E1C] pb-16 pt-40 overflow-hidden">
        <div className="absolute inset-0 hero-grid opacity-50" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_80%_20%,rgba(0,196,212,0.1),transparent)]" />
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-4 flex items-center gap-3">
            <span className="w-6 h-px bg-[#00C4D4]" />
            <span className="text-[#00C4D4] text-xs font-semibold tracking-[0.2em] uppercase">{t("Services", "Services")}</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-5xl md:text-7xl text-white leading-tight max-w-3xl"
          >
            {t("Cinq domaines d'expertise", "Five areas of expertise")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 text-white/55 text-lg max-w-2xl leading-relaxed"
          >
            {t(
              "Des solutions sur mesure, conçues pour la résilience et la compétitivité à l'échelle globale.",
              "Customized solutions designed for resilience and competitiveness on a global scale."
            )}
          </motion.p>
        </div>
      </section>

      {/* SERVICE LIST */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-8">
          {isLoading ? (
            <div className="space-y-8">
              {[1, 2, 3].map(i => <Skeleton key={i} className="w-full h-48 rounded-2xl" />)}
            </div>
          ) : (
            <div className="space-y-6">
              {(services ?? []).map((service, i) => {
                const bullets = SERVICE_BULLETS[i] ?? { fr: [], en: [] };
                return (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06, duration: 0.55 }}
                  >
                    <div className="group bg-white border border-border hover:border-[#00C4D4]/40 rounded-2xl p-8 md:p-10 hover:shadow-xl hover:shadow-black/5 transition-all duration-300">
                      <div className="flex flex-col lg:flex-row lg:items-start gap-8">
                        {/* Left: number + title */}
                        <div className="lg:w-80 shrink-0">
                          <div className="font-display text-6xl text-[#F0F1F5] leading-none mb-4">
                            {String(i + 1).padStart(2, "0")}
                          </div>
                          <h2 className="font-bold text-2xl text-[#080E1C] group-hover:text-[#00C4D4] transition-colors mb-2">
                            {lang === "fr" ? service.titleFr : service.titleEn}
                          </h2>
                          <div className="w-8 h-0.5 bg-[#00C4D4] mb-4 transition-all duration-300 group-hover:w-16" />
                          <p className="text-muted-foreground text-sm leading-relaxed">
                            {lang === "fr" ? service.taglineFr : service.taglineEn}
                          </p>
                        </div>
                        {/* Right: bullets + CTA */}
                        <div className="flex-1">
                          {(lang === "fr" ? service.descriptionFr : service.descriptionEn) && (
                            <p className="text-muted-foreground leading-relaxed mb-6 text-sm">
                              {lang === "fr" ? service.descriptionFr : service.descriptionEn}
                            </p>
                          )}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6">
                            {(lang === "fr" ? bullets.fr : bullets.en).map((b, bi) => (
                              <div key={bi} className="flex items-center gap-2.5">
                                <CheckCircle2 className="w-4 h-4 text-[#00C4D4] shrink-0" />
                                <span className="text-sm text-muted-foreground">{b}</span>
                              </div>
                            ))}
                          </div>
                          <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 text-sm font-semibold text-[#00C4D4] hover:text-[#00a3b0] transition-colors"
                          >
                            {t("Discuter de ce service", "Discuss this service")}
                            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#F7F8FA] border-t border-border">
        <div className="container mx-auto px-6 lg:px-8 text-center">
          <h2 className="font-display text-4xl md:text-5xl text-[#080E1C] mb-6">
            {t("Vous avez un besoin spécifique ?", "Have a specific need?")}
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            {t(
              "Chaque mandat est unique. Parlons de votre situation et construisons ensemble la bonne réponse.",
              "Every mandate is unique. Let's discuss your situation and build the right response together."
            )}
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#080E1C] hover:bg-[#0f1829] text-white font-semibold px-8 py-4 rounded-full text-sm transition-all duration-200 hover:-translate-y-0.5"
          >
            {t("Nous contacter", "Contact us")}
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

    </div>
  );
}
