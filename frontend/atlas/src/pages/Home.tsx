import { motion } from "framer-motion";
import { Link } from "wouter";
import { useLanguage } from "@/hooks/use-language";
import { ArrowRight, ArrowUpRight, Globe2, Zap, Network, Shield } from "lucide-react";
import { useGetSiteStats, useListServices } from "@workspace/api-client-react";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 },
  }),
};

const STATS = (t: (fr: string, en: string) => string) => [
  { value: "5+", label: t("Domaines d'expertise", "Areas of expertise") },
  { value: "4", label: t("Corridors actifs", "Active corridors") },
  { value: "3", label: t("Continents", "Continents") },
  { value: "48h", label: t("Délai de réponse", "Response time") },
];

const PILLARS = (t: (fr: string, en: string) => string) => [
  {
    icon: Globe2,
    title: t("Connaissance contextuelle", "Contextual expertise"),
    desc: t("Compréhension approfondie des contextes africains et institutionnels.", "Deep understanding of African contexts and institutional environments."),
  },
  {
    icon: Zap,
    title: t("Orienté exécution", "Execution-driven"),
    desc: t("Cadrage, structuration, pilotage et avancement concret des projets.", "Framing, structuring, steering and advancing projects concretely."),
  },
  {
    icon: Network,
    title: t("Positionnement corridor", "Corridor positioning"),
    desc: t("Connexion entre le Canada, l'Afrique et les partenaires internationaux.", "Connecting Canada, Africa and international partners around initiatives."),
  },
  {
    icon: Shield,
    title: t("Souplesse de déploiement", "Deployment flexibility"),
    desc: t("Modèle agile, réseau d'associés, capacité à diriger ou s'intégrer.", "Agile model, associate network, capacity to lead or integrate in consortiums."),
  },
];

const PROJECT_IMAGES = [
  "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1577041677443-8bbef8a04d1f?auto=format&fit=crop&w=800&q=80",
];

const INSIGHT_IMAGES = [
  "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
];

export default function Home() {
  const { t, lang } = useLanguage();
  const { data: stats } = useGetSiteStats({ query: { enabled: true } });
  const { data: services } = useListServices({ query: { enabled: true } });

  return (
    <div className="w-full flex flex-col">

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#080E1C]">
        {/* Real photo background */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1573167507387-6b4b98cb7c13?auto=format&fit=crop&w=1920&q=80"
            alt="Global consulting"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080E1C]/40 via-[#080E1C]/30 to-[#080E1C]/20" />
        </div>
        {/* Grid overlay */}
        <div className="absolute inset-0 z-0 hero-grid opacity-60" />
        {/* Teal glow */}
        <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_60%_50%_at_70%_30%,rgba(0,196,212,0.12),transparent)]" />
        {/* Decorative arcs */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-[#00C4D4]/10 translate-x-1/2 hidden xl:block z-0" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full border border-[#00C4D4]/5 translate-x-1/2 hidden xl:block z-0" />

        <div className="container mx-auto px-6 lg:px-8 relative z-10 pt-32 pb-24 md:pt-40 md:pb-32">
          <div className="max-w-4xl">
            <motion.div custom={0} initial="hidden" animate="visible" variants={fadeUp} className="inline-flex items-center gap-2.5 mb-8">
              <span className="w-6 h-px bg-[#00C4D4]" />
              <span className="text-[#00C4D4] text-xs font-semibold tracking-[0.2em] uppercase">
                {t("Conseil Stratégique International", "International Strategic Advisory")}
              </span>
            </motion.div>

            <motion.h1 custom={1} initial="hidden" animate="visible" variants={fadeUp}
              className="font-display text-5xl md:text-7xl lg:text-8xl text-white leading-[1.05] tracking-tight mb-8">
              {lang === "fr" ? (
                <>Concevoir,<br />structurer &amp;<br />faire <em className="not-italic text-[#00C4D4]">avancer</em>.</>
              ) : (
                <>Design,<br />structure &amp;<br /><em className="not-italic text-[#00C4D4]">advance</em>.</>
              )}
            </motion.h1>

            <motion.p custom={2} initial="hidden" animate="visible" variants={fadeUp}
              className="text-white/55 text-lg md:text-xl leading-relaxed max-w-2xl mb-12">
              {t(
                "Conseil stratégique, transformation institutionnelle, finance verte et partenariats complexes — entre le Canada, l'Afrique et leurs partenaires transatlantiques.",
                "Strategic advisory, institutional transformation, green finance and complex partnerships — between Canada, Africa and their transatlantic partners."
              )}
            </motion.p>

            <motion.div custom={3} initial="hidden" animate="visible" variants={fadeUp}
              className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-[#00C4D4] hover:bg-[#00b0bf] text-white font-semibold px-7 py-3.5 rounded-full text-sm transition-all duration-200 shadow-lg shadow-[#00C4D4]/30 hover:shadow-[#00C4D4]/50 hover:-translate-y-0.5">
                {t("Démarrer une conversation", "Start a conversation")}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/about"
                className="inline-flex items-center justify-center gap-2 bg-white/8 hover:bg-white/12 border border-white/15 text-white font-medium px-7 py-3.5 rounded-full text-sm transition-all duration-200 backdrop-blur-sm">
                {t("Découvrir Atlas", "Discover Atlas")}
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── STATS STRIP ──────────────────────────────────────────────── */}
      <section className="bg-white border-b border-border">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-border">
            {STATS(t).map((stat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.5 }}
                className="py-8 px-4 md:px-10 text-center">
                <div className="font-display text-4xl md:text-5xl text-[#080E1C] mb-1">{stat.value}</div>
                <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ─────────────────────────────────────────────────── */}
      <section className="py-24 md:py-32 bg-[#F7F8FA]">
        <div className="container mx-auto px-6 lg:px-8">
          {/* Section header with image */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="text-[#00C4D4] text-xs font-semibold tracking-[0.2em] uppercase">{t("Nos services", "Our services")}</span>
                <span className="flex-1 h-px bg-border max-w-12" />
              </div>
              <h2 className="font-display text-4xl md:text-5xl text-[#080E1C] leading-tight mb-6">
                {t("Cinq domaines,", "Five domains,")}
                <br /><span className="text-[#00C4D4]">{t("une vision.", "one vision.")}</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                {t(
                  "Une offre structurée pour répondre aux défis multidimensionnels des institutions publiques et privées opérant entre le Canada et l'Afrique.",
                  "A structured offering to address the multidimensional challenges of public and private institutions operating between Canada and Africa."
                )}
              </p>
              <Link href="/services"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-[#080E1C] hover:text-[#00C4D4] transition-colors">
                {t("Voir tous les services", "See all services")}
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
            {/* Feature image */}
            <div className="relative h-72 md:h-80 rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80"
                alt="Strategic consulting"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080E1C]/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <div className="text-2xl font-display mb-1">Canada · Afrique</div>
                <div className="text-white/60 text-sm">{t("Stratégie & exécution", "Strategy & execution")}</div>
              </div>
            </div>
          </div>

          {/* Service cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.isArray(services) && services.slice(0, 6).map((service, i) => (
              <motion.div key={service.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
                <Link href={`/services/${service.id}`} className="group block h-full">
                  <div className="h-full bg-white rounded-2xl p-8 border border-border hover:border-[#00C4D4]/40 hover:shadow-xl hover:shadow-[#00C4D4]/5 transition-all duration-300 relative overflow-hidden flex flex-col">
                    <span className="absolute top-6 right-6 font-display text-5xl text-[#F0F1F5] select-none leading-none">
                      {String(i + 1).padStart(2, "0")}
                    </span>
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

      {/* ── VISION BAND (full-width image) ───────────────────────────── */}
      <div className="relative h-72 md:h-96 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1920&q=80"
          alt="Canada Africa Partnership"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#080E1C]/70" />
        <div className="absolute inset-0 flex items-center justify-center text-center px-6">
          <div>
            <p className="text-white/60 text-sm tracking-widest uppercase mb-4">
              {t("Notre mission", "Our mission")}
            </p>
            <h2 className="font-display text-3xl md:text-5xl text-white max-w-3xl leading-tight">
              {t(
                "« Concevoir des ponts solides entre le Canada, l'Afrique et leurs partenaires. »",
                "« Building solid bridges between Canada, Africa and their partners. »"
              )}
            </h2>
          </div>
        </div>
      </div>

      {/* ── WHY ATLAS ────────────────────────────────────────────────── */}
      <section className="py-24 md:py-32 bg-[#080E1C] text-white relative overflow-hidden">
        <div className="absolute inset-0 hero-grid opacity-40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_30%_50%,rgba(0,196,212,0.08),transparent)]" />
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-xl mb-14">
            <div className="flex items-center gap-3 mb-5">
              <span className="text-[#00C4D4] text-xs font-semibold tracking-[0.2em] uppercase">{t("Notre différence", "Our difference")}</span>
              <span className="flex-1 h-px bg-white/15 max-w-12" />
            </div>
            <h2 className="font-display text-4xl md:text-5xl leading-tight">
              {t("Pourquoi choisir", "Why choose")}<br />
              <span className="text-[#00C4D4]">Atlas ?</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PILLARS(t).map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.55 }}
                  className="bg-white/5 border border-white/10 rounded-2xl p-7 hover:bg-white/8 hover:border-[#00C4D4]/30 transition-all duration-300 group">
                  <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-xl bg-[#00C4D4]/15 flex items-center justify-center mb-6 group-hover:bg-[#00C4D4]/25 transition-colors">
                    <Icon className="w-6 h-6 lg:w-8 lg:h-8 text-[#00C4D4]" />
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
        <section className="py-24 md:py-32 bg-white">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-[#00C4D4] text-xs font-semibold tracking-[0.2em] uppercase">{t("Réalisations", "Projects")}</span>
                  <span className="flex-1 h-px bg-border max-w-12" />
                </div>
                <h2 className="font-display text-4xl md:text-5xl text-[#080E1C] leading-tight">{t("Mandats récents", "Recent mandates")}</h2>
              </div>
              <Link href="/projects"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-[#080E1C] hover:text-[#00C4D4] transition-colors shrink-0">
                {t("Tous les projets", "All projects")}
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
              {Array.isArray(stats?.featuredProjects) && stats.featuredProjects.map((project, i) => (
                <motion.div key={project.id} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.15, duration: 0.6 }}>
                  <Link href={`/projects/${project.id}`} className="group block h-full">
                    <div className="h-full border border-border rounded-2xl overflow-hidden hover:border-[#00C4D4]/40 hover:shadow-2xl hover:shadow-black/8 transition-all duration-300 flex flex-col">
                      {/* Project image */}
                      <div className="relative h-52 overflow-hidden">
                        <img
                          src={PROJECT_IMAGES[i % PROJECT_IMAGES.length]}
                          alt={lang === "fr" ? project.titleFr : project.titleEn}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#080E1C]/80 via-[#080E1C]/30 to-transparent" />
                        <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                          {project.countries.map((c: string) => (
                            <span key={c} className="px-2.5 py-1 text-xs font-medium rounded-full bg-white/20 text-white backdrop-blur-sm">{c}</span>
                          ))}
                          <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-[#00C4D4]/80 text-white backdrop-blur-sm">{project.category}</span>
                        </div>
                      </div>
                      {/* Body */}
                      <div className="p-7 flex-1 flex flex-col">
                        <h3 className="font-display text-2xl text-[#080E1C] mb-3 group-hover:text-[#00C4D4] transition-colors leading-snug">
                          {lang === "fr" ? project.titleFr : project.titleEn}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1">
                          {lang === "fr" ? project.taglineFr : project.taglineEn}
                        </p>
                        <div className="grid grid-cols-2 gap-4 pt-5 border-t border-border">
                          <div>
                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">{t("Budget", "Budget")}</p>
                            <p className="font-bold text-[#080E1C]">{project.budget}</p>
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">{t("Bailleur", "Funder")}</p>
                            <p className="font-bold text-[#080E1C]">{project.funder}</p>
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
        <section className="py-24 md:py-32 bg-[#F7F8FA]">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-[#00C4D4] text-xs font-semibold tracking-[0.2em] uppercase">{t("Perspectives", "Insights")}</span>
                  <span className="flex-1 h-px bg-border max-w-12" />
                </div>
                <h2 className="font-display text-4xl md:text-5xl text-[#080E1C] leading-tight">{t("Analyses stratégiques", "Strategic analyses")}</h2>
              </div>
              <Link href="/insights"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-[#080E1C] hover:text-[#00C4D4] transition-colors shrink-0">
                {t("Toutes les perspectives", "All insights")}
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Array.isArray(stats?.recentInsights) && stats.recentInsights.map((insight: { id: string | number; category?: string; titleFr?: string; titleEn?: string; taglineFr?: string; taglineEn?: string }, i: number) => (
                <motion.div key={insight.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }}>
                  <Link href={`/insights/${insight.id}`} className="group block h-full">
                    <div className="h-full bg-white rounded-2xl border border-border hover:border-[#00C4D4]/40 hover:shadow-lg hover:shadow-black/5 transition-all duration-300 flex flex-col overflow-hidden">
                      {/* Insight image */}
                      <div className="relative h-44 overflow-hidden">
                        <img
                          src={INSIGHT_IMAGES[i % INSIGHT_IMAGES.length]}
                          alt={lang === "fr" ? (insight.titleFr ?? "") : (insight.titleEn ?? "")}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-[#080E1C]/40" />
                        {insight.category && (
                          <span className="absolute bottom-3 left-4 px-3 py-1 text-xs font-semibold bg-[#00C4D4] text-white rounded-full">
                            {insight.category}
                          </span>
                        )}
                      </div>
                      <div className="p-6 flex flex-col flex-1">
                        <h3 className="font-bold text-[#080E1C] mb-3 group-hover:text-[#00C4D4] transition-colors leading-snug flex-1">
                          {lang === "fr" ? insight.titleFr : insight.titleEn}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-5 line-clamp-2">
                          {lang === "fr" ? insight.taglineFr : insight.taglineEn}
                        </p>
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-[#00C4D4]">
                          {t("Lire l'analyse", "Read analysis")}
                          <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1920&q=80"
            alt="Partnership"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#080E1C]/85" />
          <div className="absolute inset-0 hero-grid opacity-30" />
        </div>
        <div className="container mx-auto px-6 lg:px-8 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }} className="max-w-3xl mx-auto">
            <h2 className="font-display text-4xl md:text-6xl text-white mb-6 leading-tight">
              {t("Discutons de votre initiative.", "Let's discuss your initiative.")}
            </h2>
            <p className="text-white/55 text-lg mb-10 leading-relaxed">
              {t(
                "Que vous cherchiez à structurer un projet complexe, pénétrer un nouveau marché ou optimiser votre gouvernance — Atlas est votre partenaire stratégique.",
                "Whether you're looking to structure a complex project, enter a new market, or optimize your governance — Atlas is your strategic partner."
              )}
            </p>
            <Link href="/contact"
              className="inline-flex items-center gap-2 bg-[#00C4D4] hover:bg-[#00b0bf] text-white font-semibold px-8 py-4 rounded-full text-base transition-all duration-200 shadow-xl shadow-[#00C4D4]/30 hover:shadow-[#00C4D4]/50 hover:-translate-y-0.5">
              {t("Demander une consultation", "Request a consultation")}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
