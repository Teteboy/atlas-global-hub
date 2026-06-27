import { motion } from "framer-motion";
import { Link } from "wouter";
import { useLanguage } from "@/hooks/use-language";
import { ArrowRight, ArrowUpRight, Globe2, Zap, Network, Shield } from "lucide-react";
import { useGetSiteStats, useListServices } from "@workspace/api-client-react";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 },
  }),
};

const STATS = (t: (fr: string, en: string) => string) => [
  { value: "5", label: t("Domaines d'expertise", "Areas of expertise") },
  { value: "4", label: t("Corridors actifs", "Active corridors") },
  { value: "3", label: t("Continents", "Continents") },
  { value: "48h", label: t("Délai de réponse", "Response time") },
];

const PILLARS = (t: (fr: string, en: string) => string) => [
  {
    icon: Globe2,
    title: t("Connaissance contextuelle", "Contextual expertise"),
    desc: t(
      "Compréhension approfondie des contextes africains et institutionnels.",
      "Deep understanding of African contexts and institutional environments."
    ),
  },
  {
    icon: Zap,
    title: t("Orienté exécution", "Execution-driven"),
    desc: t(
      "Cadrage, structuration, pilotage et avancement concret des projets.",
      "Framing, structuring, steering and advancing projects concretely."
    ),
  },
  {
    icon: Network,
    title: t("Positionnement corridor", "Corridor positioning"),
    desc: t(
      "Connexion entre le Canada, l'Afrique et les partenaires internationaux.",
      "Connecting Canada, Africa and international partners around initiatives."
    ),
  },
  {
    icon: Shield,
    title: t("Souplesse de déploiement", "Deployment flexibility"),
    desc: t(
      "Modèle agile, réseau d'associés, capacité à diriger ou s'intégrer.",
      "Agile model, associate network, capacity to lead or integrate in consortiums."
    ),
  },
];

export default function Home() {
  const { t, lang } = useLanguage();
  const { data: stats } = useGetSiteStats({ query: { enabled: true } });
  const { data: services } = useListServices({ query: { enabled: true } });

  return (
    <div className="w-full flex flex-col">

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#080E1C]">
        {/* Background layers */}
        <div className="absolute inset-0 hero-grid opacity-100" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_70%_20%,rgba(0,196,212,0.12),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_80%_at_0%_80%,rgba(0,30,80,0.6),transparent)]" />

        {/* Decorative teal arc */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-[#00C4D4]/10 translate-x-1/2 hidden xl:block" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full border border-[#00C4D4]/5 translate-x-1/2 hidden xl:block" />

        <div className="container mx-auto px-6 lg:px-8 relative z-10 pt-32 pb-24 md:pt-40 md:pb-32">
          <div className="max-w-4xl">
            {/* Eyebrow */}
            <motion.div
              custom={0}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="inline-flex items-center gap-2.5 mb-8"
            >
              <span className="w-6 h-px bg-[#00C4D4]" />
              <span className="text-[#00C4D4] text-xs font-semibold tracking-[0.2em] uppercase">
                {t("Conseil Stratégique International", "International Strategic Advisory")}
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              custom={1}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="font-display text-5xl md:text-7xl lg:text-8xl text-white leading-[1.05] tracking-tight mb-8"
            >
              {lang === "fr" ? (
                <>Concevoir,<br />structurer &amp;<br />faire <em className="not-italic text-[#00C4D4]">avancer</em>.</>
              ) : (
                <>Design,<br />structure &amp;<br /><em className="not-italic text-[#00C4D4]">advance</em>.</>
              )}
            </motion.h1>

            {/* Subtext */}
            <motion.p
              custom={2}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="text-white/55 text-lg md:text-xl leading-relaxed max-w-2xl mb-12"
            >
              {t(
                "Conseil stratégique, transformation institutionnelle, finance verte et partenariats complexes — entre le Canada, l'Afrique et leurs partenaires transatlantiques.",
                "Strategic advisory, institutional transformation, green finance and complex partnerships — between Canada, Africa and their transatlantic partners."
              )}
            </motion.p>

            {/* CTAs */}
            <motion.div
              custom={3}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-[#00C4D4] hover:bg-[#00b0bf] text-white font-semibold px-7 py-3.5 rounded-full text-sm transition-all duration-200 shadow-lg shadow-[#00C4D4]/30 hover:shadow-[#00C4D4]/50 hover:-translate-y-0.5"
              >
                {t("Démarrer une conversation", "Start a conversation")}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center gap-2 bg-white/8 hover:bg-white/12 border border-white/15 text-white font-medium px-7 py-3.5 rounded-full text-sm transition-all duration-200 backdrop-blur-sm"
              >
                {t("Découvrir Atlas", "Discover Atlas")}
              </Link>
            </motion.div>
          </div>

          {/* Scroll cue */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-8 left-8 hidden md:flex items-center gap-3"
          >
            <div className="w-px h-12 bg-gradient-to-b from-transparent to-white/30" />
            <span className="text-white/30 text-xs tracking-widest uppercase rotate-90 origin-left translate-x-4">
              Scroll
            </span>
          </motion.div>
        </div>
      </section>

      {/* ── STATS STRIP ──────────────────────────────────────────────── */}
      <section className="bg-white border-b border-border">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
            {STATS(t).map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="py-8 px-6 md:px-10 text-center"
              >
                <div className="font-display text-4xl md:text-5xl text-[#080E1C] mb-1">{stat.value}</div>
                <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ─────────────────────────────────────────────────── */}
      <section className="py-28 md:py-36 bg-[#F7F8FA]">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="text-[#00C4D4] text-xs font-semibold tracking-[0.2em] uppercase">
                  {t("Nos services", "Our services")}
                </span>
                <span className="flex-1 h-px bg-border max-w-12" />
              </div>
              <h2 className="font-display text-4xl md:text-6xl text-[#080E1C] leading-tight">
                {t("Cinq domaines,", "Five domains,")}
                <br />
                <span className="text-[#00C4D4]">{t("une vision.", "one vision.")}</span>
              </h2>
            </div>
            <Link
              href="/services"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-[#080E1C] hover:text-[#00C4D4] transition-colors shrink-0"
            >
              {t("Voir tous les services", "See all services")}
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {(services ?? []).slice(0, 6).map((service, i) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link href={`/services/${service.id}`} className="group block h-full">
                  <div className="h-full bg-white rounded-2xl p-8 border border-border hover:border-[#00C4D4]/40 hover:shadow-xl hover:shadow-[#00C4D4]/5 transition-all duration-300 relative overflow-hidden flex flex-col">
                    {/* Index number */}
                    <span className="absolute top-6 right-6 font-display text-5xl text-[#F0F1F5] select-none leading-none">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {/* Accent line */}
                    <div className="w-8 h-0.5 bg-[#00C4D4] mb-8 transition-all duration-300 group-hover:w-12" />
                    <h3 className="text-lg font-bold text-[#080E1C] mb-3 group-hover:text-[#00C4D4] transition-colors relative z-10 pr-8">
                      {lang === "fr" ? service.titleFr : service.titleEn}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1 relative z-10">
                      {lang === "fr" ? service.taglineFr : service.taglineEn}
                    </p>
                    <div className="mt-8 flex items-center gap-1.5 text-xs font-semibold text-[#00C4D4] relative z-10">
                      {t("En savoir plus", "Learn more")}
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY ATLAS ────────────────────────────────────────────────── */}
      <section className="py-28 md:py-36 bg-[#080E1C] text-white relative overflow-hidden">
        <div className="absolute inset-0 hero-grid opacity-50" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_30%_50%,rgba(0,196,212,0.08),transparent)]" />
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-xl mb-16">
            <div className="flex items-center gap-3 mb-5">
              <span className="text-[#00C4D4] text-xs font-semibold tracking-[0.2em] uppercase">
                {t("Notre différence", "Our difference")}
              </span>
              <span className="flex-1 h-px bg-white/15 max-w-12" />
            </div>
            <h2 className="font-display text-4xl md:text-6xl leading-tight">
              {t("Pourquoi choisir", "Why choose")}
              <br />
              <span className="text-[#00C4D4]">Atlas ?</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PILLARS(t).map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.55 }}
                  className="bg-white/5 border border-white/10 rounded-2xl p-7 hover:bg-white/8 hover:border-[#00C4D4]/30 transition-all duration-300 group"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#00C4D4]/15 flex items-center justify-center mb-6 group-hover:bg-[#00C4D4]/25 transition-colors">
                    <Icon className="w-5 h-5 text-[#00C4D4]" />
                  </div>
                  <h3 className="font-bold text-white mb-3">{pillar.title}</h3>
                  <p className="text-sm text-white/50 leading-relaxed">{pillar.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FEATURED PROJECTS ────────────────────────────────────────── */}
      {stats?.featuredProjects && stats.featuredProjects.length > 0 && (
        <section className="py-28 md:py-36 bg-white">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-[#00C4D4] text-xs font-semibold tracking-[0.2em] uppercase">
                    {t("Réalisations", "Projects")}
                  </span>
                  <span className="flex-1 h-px bg-border max-w-12" />
                </div>
                <h2 className="font-display text-4xl md:text-6xl text-[#080E1C] leading-tight">
                  {t("Mandats récents", "Recent mandates")}
                </h2>
              </div>
              <Link
                href="/projects"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-[#080E1C] hover:text-[#00C4D4] transition-colors shrink-0"
              >
                {t("Tous les projets", "All projects")}
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {stats.featuredProjects.map((project, i) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.6 }}
                >
                  <Link href={`/projects/${project.id}`} className="group block h-full">
                    <div className="h-full border border-border rounded-2xl overflow-hidden hover:border-[#00C4D4]/40 hover:shadow-xl hover:shadow-black/5 transition-all duration-300 flex flex-col">
                      {/* Header strip */}
                      <div className="bg-[#080E1C] px-8 py-6 flex items-center gap-3 flex-wrap">
                        {project.countries.map((c: string) => (
                          <span
                            key={c}
                            className="px-2.5 py-1 text-xs font-medium rounded-full bg-white/10 text-white/70"
                          >
                            {c}
                          </span>
                        ))}
                        <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-[#00C4D4]/20 text-[#00C4D4]">
                          {project.category}
                        </span>
                      </div>
                      {/* Body */}
                      <div className="p-8 flex-1 flex flex-col">
                        <h3 className="font-display text-2xl md:text-3xl text-[#080E1C] mb-4 group-hover:text-[#00C4D4] transition-colors leading-snug">
                          {lang === "fr" ? project.titleFr : project.titleEn}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-8 flex-1">
                          {lang === "fr" ? project.taglineFr : project.taglineEn}
                        </p>
                        <div className="grid grid-cols-2 gap-6 pt-6 border-t border-border">
                          <div>
                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                              {t("Budget", "Budget")}
                            </p>
                            <p className="font-bold text-[#080E1C] text-lg">{project.budget}</p>
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                              {t("Bailleur", "Funder")}
                            </p>
                            <p className="font-bold text-[#080E1C] text-lg">{project.funder}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── INSIGHTS ─────────────────────────────────────────────────── */}
      {stats?.recentInsights && stats.recentInsights.length > 0 && (
        <section className="py-28 md:py-36 bg-[#F7F8FA]">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-[#00C4D4] text-xs font-semibold tracking-[0.2em] uppercase">
                    {t("Perspectives", "Insights")}
                  </span>
                  <span className="flex-1 h-px bg-border max-w-12" />
                </div>
                <h2 className="font-display text-4xl md:text-6xl text-[#080E1C] leading-tight">
                  {t("Analyses stratégiques", "Strategic analyses")}
                </h2>
              </div>
              <Link
                href="/insights"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-[#080E1C] hover:text-[#00C4D4] transition-colors shrink-0"
              >
                {t("Toutes les perspectives", "All insights")}
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {stats.recentInsights.map((insight: { id: string | number; category?: string; titleFr?: string; titleEn?: string; taglineFr?: string; taglineEn?: string }, i: number) => (
                <motion.div
                  key={insight.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                >
                  <Link href={`/insights/${insight.id}`} className="group block h-full">
                    <div className="h-full bg-white rounded-2xl p-7 border border-border hover:border-[#00C4D4]/40 hover:shadow-lg hover:shadow-black/5 transition-all duration-300 flex flex-col">
                      {insight.category && (
                        <span className="inline-block px-3 py-1 text-xs font-semibold bg-[#00C4D4]/10 text-[#00C4D4] rounded-full mb-5 w-fit">
                          {insight.category}
                        </span>
                      )}
                      <h3 className="font-bold text-[#080E1C] mb-3 group-hover:text-[#00C4D4] transition-colors leading-snug">
                        {lang === "fr" ? insight.titleFr : insight.titleEn}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                        {lang === "fr" ? insight.taglineFr : insight.taglineEn}
                      </p>
                      <div className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-[#00C4D4]">
                        {t("Lire l'analyse", "Read analysis")}
                        <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section className="relative py-28 md:py-36 bg-[#080E1C] overflow-hidden">
        <div className="absolute inset-0 hero-grid opacity-40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_100%,rgba(0,196,212,0.1),transparent)]" />
        <div className="container mx-auto px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="font-display text-4xl md:text-6xl text-white mb-6 leading-tight">
              {t("Discutons de votre initiative.", "Let's discuss your initiative.")}
            </h2>
            <p className="text-white/50 text-lg mb-10 leading-relaxed">
              {t(
                "Que vous cherchiez à structurer un projet complexe, pénétrer un nouveau marché ou optimiser votre gouvernance — Atlas est votre partenaire stratégique.",
                "Whether you're looking to structure a complex project, enter a new market, or optimize your governance — Atlas is your strategic partner."
              )}
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#00C4D4] hover:bg-[#00b0bf] text-white font-semibold px-8 py-4 rounded-full text-base transition-all duration-200 shadow-xl shadow-[#00C4D4]/30 hover:shadow-[#00C4D4]/50 hover:-translate-y-0.5"
            >
              {t("Demander une consultation", "Request a consultation")}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
