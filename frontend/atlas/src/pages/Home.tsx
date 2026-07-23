import { motion } from "framer-motion";
import { Link } from "wouter";
import { useLanguage } from "@/hooks/use-language";
import { useSiteContent } from "@/hooks/use-site-content";
import { ArrowRight, ArrowUpRight, Globe2, Zap, Network, Shield } from "lucide-react";
import { useGetSiteStats, useListServices } from "@workspace/api-client-react";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay: i * 0.1 },
  }),
};

export default function Home() {
  const { t, lang } = useLanguage();
  const { getText, getSetting } = useSiteContent();
  const { data: stats } = useGetSiteStats();
  const { data: services } = useListServices();

  const primary = "var(--color-atlas-primary)";
  const primaryHover = "var(--color-atlas-primary-hover)";
  const dark = "var(--color-atlas-dark)";
  const light = "var(--color-atlas-light)";

  const heroBg = getSetting("home.hero.image", "https://images.unsplash.com/photo-1573167507387-6b4b98cb7c13?auto=format&fit=crop&w=1920&q=80");
  const servicesImage = getSetting("home.services.image", "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80");
  const visionImage = getSetting("home.vision.image", "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1920&q=80");
  const ctaImage = getSetting("home.cta.image", "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1920&q=80");
  const projectImages = getSetting("home.project.images", "").split(",").filter(Boolean).length
    ? getSetting("home.project.images", "").split(",").filter(Boolean)
    : [
        "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1577041677443-8bbef8a04d1f?auto=format&fit=crop&w=800&q=80",
      ];
  const insightImages = getSetting("home.insight.images", "").split(",").filter(Boolean).length
    ? getSetting("home.insight.images", "").split(",").filter(Boolean)
    : [
        "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
      ];

  const statsStrip = getText("home.stats.json", JSON.stringify([
    { value: "5+", labelFr: "Domaines d'expertise", labelEn: "Areas of expertise" },
    { value: "4", labelFr: "Corridors actifs", labelEn: "Active corridors" },
    { value: "3", labelFr: "Continents", labelEn: "Continents" },
    { value: "48h", labelFr: "Délai de réponse", labelEn: "Response time" },
  ]));

  const pillars = getText("home.pillars.json", JSON.stringify([
    { icon: "Globe2", titleFr: "Connaissance contextuelle", titleEn: "Contextual expertise", descFr: "Compréhension approfondie des contextes africains et institutionnels.", descEn: "Deep understanding of African contexts and institutional environments." },
    { icon: "Zap", titleFr: "Orienté exécution", titleEn: "Execution-driven", descFr: "Cadrage, structuration, pilotage et avancement concret des projets.", descEn: "Framing, structuring, steering and advancing projects concretely." },
    { icon: "Network", titleFr: "Positionnement corridor", titleEn: "Corridor positioning", descFr: "Connexion entre le Canada, l'Afrique et les partenaires internationaux.", descEn: "Connecting Canada, Africa and international partners around initiatives." },
    { icon: "Shield", titleFr: "Souplesse de déploiement", titleEn: "Deployment flexibility", descFr: "Modèle agile, réseau d'associés, capacité à diriger ou s'intégrer.", descEn: "Agile model, associate network, capacity to lead or integrate in consortiums." },
  ]));

  const iconMap: Record<string, React.ComponentType<{ className?: string }>> = { Globe2, Zap, Network, Shield };

  let parsedStats: { value: string; labelFr: string; labelEn: string }[] = [];
  let parsedPillars: { icon: string; titleFr: string; titleEn: string; descFr: string; descEn: string }[] = [];
  try { parsedStats = JSON.parse(statsStrip); } catch {}
  try { parsedPillars = JSON.parse(pillars); } catch {}

  return (
    <div className="w-full flex flex-col">

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className={`relative min-h-screen flex flex-col justify-center overflow-hidden bg-[var(--color-atlas-dark)]`}>
        <div className="absolute inset-0 z-0">
          <img
            src={heroBg}
            alt={getText("home.hero.imageAlt", "Consultation internationale", "International consulting")}
            className="w-full h-full object-cover opacity-40"
          />
          <div className={`absolute inset-0 bg-gradient-to-r from-[var(--color-atlas-dark)]/40 via-[var(--color-atlas-dark)]/30 to-[var(--color-atlas-dark)]/20`} />
        </div>
        <div className="absolute inset-0 z-0 hero-grid opacity-60" />
        <div className={`absolute inset-0 z-0 bg-[radial-gradient(ellipse_60%_50%_at_70%_30%,color-mix(in_srgb,var(--color-atlas-primary)_12%,transparent),transparent)]`} />
        <div className={`absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-[var(--color-atlas-primary)]/10 translate-x-1/2 hidden xl:block z-0`} />
        <div className={`absolute right-0 top-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full border border-[var(--color-atlas-primary)]/5 translate-x-1/2 hidden xl:block z-0`} />

        <div className="container mx-auto px-6 lg:px-8 relative z-10 pt-32 pb-24 md:pt-40 md:pb-32">
          <div className="max-w-4xl">
            <motion.div custom={0} initial="hidden" animate="visible" variants={fadeUp} className="inline-flex items-center gap-2.5 mb-8">
              <span className={`w-6 h-px bg-[var(--color-atlas-primary)]`} />
              <span className={`text-[var(--color-atlas-primary)] text-xs font-semibold tracking-[0.2em] uppercase`}>
                {getText("home.hero.overline", "Conseil Stratégique International", "International Strategic Advisory")}
              </span>
            </motion.div>

            <motion.h1 custom={1} initial="hidden" animate="visible" variants={fadeUp}
              className="font-display text-5xl md:text-7xl lg:text-8xl text-white leading-[1.05] tracking-tight mb-8">
              {lang === "fr" ? (
                <>Concevoir,<br />structurer &amp;<br />faire <em className={`not-italic text-[var(--color-atlas-primary)]`}>avancer</em>.</>
              ) : (
                <>Design,<br />structure &amp;<br /><em className={`not-italic text-[var(--color-atlas-primary)]`}>advance</em>.</>
              )}
            </motion.h1>

            <motion.p custom={2} initial="hidden" animate="visible" variants={fadeUp}
              className="text-white/55 text-lg md:text-xl leading-relaxed max-w-2xl mb-12">
              {getText("home.hero.subtitle",
                "Conseil stratégique, transformation institutionnelle, finance verte et partenariats complexes — entre le Canada, l'Afrique et leurs partenaires transatlantiques.",
                "Strategic advisory, institutional transformation, green finance and complex partnerships — between Canada, Africa and their transatlantic partners."
              )}
            </motion.p>

            <motion.div custom={3} initial="hidden" animate="visible" variants={fadeUp}
              className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact"
                className={`inline-flex items-center justify-center gap-2 bg-[var(--color-atlas-primary)] hover:bg-[var(--color-atlas-primary-hover)] text-white font-semibold px-7 py-3.5 rounded-full text-sm transition-all duration-200 shadow-lg shadow-[var(--color-atlas-primary)]/30 hover:shadow-[var(--color-atlas-primary)]/50 hover:-translate-y-0.5`}>
                {getText("home.hero.ctaPrimary", "Démarrer une conversation", "Start a conversation")}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/about"
                className="inline-flex items-center justify-center gap-2 bg-white/8 hover:bg-white/12 border border-white/15 text-white font-medium px-7 py-3.5 rounded-full text-sm transition-all duration-200 backdrop-blur-sm">
                {getText("home.hero.ctaSecondary", "Découvrir Atlas", "Discover Atlas")}
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── STATS STRIP ──────────────────────────────────────────────── */}
      <section className="bg-white border-b border-border">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-border">
            {parsedStats.map((stat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.5 }}
                className="py-8 px-4 md:px-10 text-center">
                <div className={`font-display text-4xl md:text-5xl text-[var(--color-atlas-dark)] mb-1`}>{stat.value}</div>
                <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{lang === "fr" ? stat.labelFr : stat.labelEn}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ─────────────────────────────────────────────────── */}
      <section className={`py-24 md:py-32 bg-[var(--color-atlas-light)]`}>
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className={`text-[var(--color-atlas-primary)] text-xs font-semibold tracking-[0.2em] uppercase`}>{getText("home.services.overline", "Nos services", "Our services")}</span>
                <span className="flex-1 h-px bg-border max-w-12" />
              </div>
              <h2 className={`font-display text-4xl md:text-5xl text-[var(--color-atlas-dark)] leading-tight mb-6`}>
                {getText("home.services.titleFr", "Cinq domaines,", "Five domains,")}
                <br /><span className={`text-[var(--color-atlas-primary)]`}>{getText("home.services.titleFr2", "une vision.", "one vision.")}</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                {getText("home.services.desc",
                  "Une offre structurée pour répondre aux défis multidimensionnels des institutions publiques et privées opérant entre le Canada et l'Afrique.",
                  "A structured offering to address the multidimensional challenges of public and private institutions operating between Canada and Africa."
                )}
              </p>
              <Link href="/services"
                className={`group inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-atlas-dark)] hover:text-[var(--color-atlas-primary)] transition-colors`}>
                {getText("home.services.link", "Voir tous les services", "See all services")}
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
            <div className="relative h-72 md:h-80 rounded-2xl overflow-hidden">
              <img
                src={servicesImage}
                alt={getText("home.services.imageAlt", "Conseil stratégique", "Strategic consulting")}
                className="w-full h-full object-cover"
              />
              <div className={`absolute inset-0 bg-gradient-to-t from-[var(--color-atlas-dark)]/60 via-transparent to-transparent`} />
              <div className="absolute bottom-6 left-6 text-white">
                <div className="text-2xl font-display mb-1">{getText("home.services.cardTitle", "Canada · Afrique", "Canada · Africa")}</div>
                <div className="text-white/60 text-sm">{getText("home.services.cardSub", "Stratégie & exécution", "Strategy & execution")}</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.isArray(services) && services.slice(0, 6).map((service, i) => (
              <motion.div key={service.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}>
                <Link href={`/services/${service.id}`} className="group block h-full">
                  <div className={`h-full bg-white rounded-2xl p-8 border border-border hover:border-[var(--color-atlas-primary)]/40 hover:shadow-xl hover:shadow-[var(--color-atlas-primary)]/5 transition-all duration-300 relative overflow-hidden flex flex-col`}>
                    <span className="absolute top-6 right-6 font-display text-5xl text-[#F0F1F5] select-none leading-none">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className={`w-8 h-0.5 bg-[var(--color-atlas-primary)] mb-8 transition-all duration-300 group-hover:w-12`} />
                    <h3 className={`text-lg font-bold text-[var(--color-atlas-dark)] mb-3 group-hover:text-[var(--color-atlas-primary)] transition-colors relative z-10 pr-8`}>
                      {lang === "fr" ? service.titleFr : service.titleEn}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1 relative z-10">
                      {lang === "fr" ? service.taglineFr : service.taglineEn}
                    </p>
                    <div className={`mt-8 flex items-center gap-1.5 text-xs font-semibold text-[var(--color-atlas-primary)] relative z-10`}>
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

      {/* ── VISION BAND ───────────────────────────── */}
      <div className="relative h-72 md:h-96 overflow-hidden">
        <img
          src={visionImage}
          alt={getText("home.vision.imageAlt", "Partenariat Canada-Afrique", "Canada-Africa partnership")}
          className="w-full h-full object-cover"
        />
        <div className={`absolute inset-0 bg-[var(--color-atlas-dark)]/70`} />
        <div className="absolute inset-0 flex items-center justify-center text-center px-6">
          <div>
            <p className="text-white/60 text-sm tracking-widest uppercase mb-4">
              {getText("home.vision.overline", "Notre mission", "Our mission")}
            </p>
            <h2 className="font-display text-3xl md:text-5xl text-white max-w-3xl leading-tight">
              {getText("home.vision.quote", "« Concevoir des ponts solides entre le Canada, l'Afrique et leurs partenaires. »", "« Building solid bridges between Canada, Africa and their partners. »")}
            </h2>
          </div>
        </div>
      </div>

      {/* ── WHY ATLAS ────────────────────────────────────────────────── */}
      <section className={`py-24 md:py-32 bg-[var(--color-atlas-dark)] text-white relative overflow-hidden`}>
        <div className="absolute inset-0 hero-grid opacity-40" />
        <div className={`absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_30%_50%,color-mix(in_srgb,var(--color-atlas-primary)_8%,transparent),transparent)]`} />
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-xl mb-14">
            <div className="flex items-center gap-3 mb-5">
              <span className={`text-[var(--color-atlas-primary)] text-xs font-semibold tracking-[0.2em] uppercase`}>{getText("home.why.overline", "Notre différence", "Our difference")}</span>
              <span className="flex-1 h-px bg-white/15 max-w-12" />
            </div>
            <h2 className="font-display text-4xl md:text-5xl leading-tight">
              {getText("home.why.title", "Pourquoi choisir", "Why choose")}<br />
              <span className={`text-[var(--color-atlas-primary)]`}>Atlas ?</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {parsedPillars.map((pillar, i) => {
              const Icon = iconMap[pillar.icon];
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.55 }}
                  className={`bg-white/5 border border-white/10 rounded-2xl p-7 hover:bg-white/8 hover:border-[var(--color-atlas-primary)]/30 transition-all duration-300 group`}>
                  <div className={`w-12 h-12 lg:w-16 lg:h-16 rounded-xl bg-[var(--color-atlas-primary)]/15 flex items-center justify-center mb-6 group-hover:bg-[var(--color-atlas-primary)]/25 transition-colors`}>
                    {Icon && <Icon className={`w-6 h-6 lg:w-8 lg:h-8 text-[var(--color-atlas-primary)]`} />}
                  </div>
                  <h3 className="font-bold text-white mb-3">{lang === "fr" ? pillar.titleFr : pillar.titleEn}</h3>
                  <p className="text-sm text-white/50 leading-relaxed">{lang === "fr" ? pillar.descFr : pillar.descEn}</p>
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
                  <span className={`text-[var(--color-atlas-primary)] text-xs font-semibold tracking-[0.2em] uppercase`}>{getText("home.projects.overline", "Réalisations", "Projects")}</span>
                  <span className="flex-1 h-px bg-border max-w-12" />
                </div>
                <h2 className={`font-display text-4xl md:text-5xl text-[var(--color-atlas-dark)] leading-tight`}>{getText("home.projects.title", "Mandats récents", "Recent mandates")}</h2>
              </div>
              <Link href="/projects"
                className={`group inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-atlas-dark)] hover:text-[var(--color-atlas-primary)] transition-colors shrink-0`}>
                {getText("home.projects.link", "Tous les projets", "All projects")}
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
              {Array.isArray(stats?.featuredProjects) && stats.featuredProjects.map((project, i) => (
                <motion.div key={project.id} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.15, duration: 0.6 }}>
                  <Link href={`/projects/${project.id}`} className="group block h-full">
                    <div className={`h-full border border-border rounded-2xl overflow-hidden hover:border-[var(--color-atlas-primary)]/40 hover:shadow-2xl hover:shadow-black/8 transition-all duration-300 flex flex-col`}>
                      <div className="relative h-52 overflow-hidden">
                        <img
                          src={projectImages[i % projectImages.length]}
                          alt={lang === "fr" ? project.titleFr : project.titleEn}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className={`absolute inset-0 bg-gradient-to-t from-[var(--color-atlas-dark)]/80 via-[var(--color-atlas-dark)]/30 to-transparent`} />
                        <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                          {project.countries.map((c: string) => (
                            <span key={c} className="px-2.5 py-1 text-xs font-medium rounded-full bg-white/20 text-white backdrop-blur-sm">{c}</span>
                          ))}
                          <span className={`px-2.5 py-1 text-xs font-medium rounded-full bg-[var(--color-atlas-primary)]/80 text-white backdrop-blur-sm`}>{project.category}</span>
                        </div>
                      </div>
                      <div className="p-7 flex-1 flex flex-col">
                        <h3 className={`font-display text-2xl text-[var(--color-atlas-dark)] mb-3 group-hover:text-[var(--color-atlas-primary)] transition-colors leading-snug`}>
                          {lang === "fr" ? project.titleFr : project.titleEn}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1">
                          {lang === "fr" ? project.taglineFr : project.taglineEn}
                        </p>
                        <div className="grid grid-cols-2 gap-4 pt-5 border-t border-border">
                          <div>
                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">{t("Budget", "Budget")}</p>
                            <p className={`font-bold text-[var(--color-atlas-dark)]`}>{project.budget}</p>
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">{t("Bailleur", "Funder")}</p>
                            <p className={`font-bold text-[var(--color-atlas-dark)]`}>{project.funder}</p>
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
        <section className={`py-24 md:py-32 bg-[var(--color-atlas-light)]`}>
          <div className="container mx-auto px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <span className={`text-[var(--color-atlas-primary)] text-xs font-semibold tracking-[0.2em] uppercase`}>{getText("home.insights.overline", "Perspectives", "Insights")}</span>
                  <span className="flex-1 h-px bg-border max-w-12" />
                </div>
                <h2 className={`font-display text-4xl md:text-5xl text-[var(--color-atlas-dark)] leading-tight`}>{getText("home.insights.title", "Analyses stratégiques", "Strategic analyses")}</h2>
              </div>
              <Link href="/insights"
                className={`group inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-atlas-dark)] hover:text-[var(--color-atlas-primary)] transition-colors shrink-0`}>
                {getText("home.insights.link", "Toutes les perspectives", "All insights")}
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Array.isArray(stats?.recentInsights) && stats.recentInsights.map((insight: { id: string | number; category?: string; titleFr?: string; titleEn?: string; taglineFr?: string; taglineEn?: string; imageUrl?: string | null }, i: number) => (
                <motion.div key={insight.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }}>
                  <Link href={`/insights/${insight.id}`} className="group block h-full">
                    <div className={`h-full bg-white rounded-2xl border border-border hover:border-[var(--color-atlas-primary)]/40 hover:shadow-lg hover:shadow-black/5 transition-all duration-300 flex flex-col overflow-hidden`}>
                      <div className="relative h-44 overflow-hidden">
                        <img
                          src={insight.imageUrl ?? insightImages[i % insightImages.length]}
                          alt={lang === "fr" ? (insight.titleFr ?? "") : (insight.titleEn ?? "")}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className={`absolute inset-0 bg-[var(--color-atlas-dark)]/40`} />
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
                          {lang === "fr" ? insight.taglineFr : insight.taglineEn}
                        </p>
                        <div className={`flex items-center gap-1.5 text-xs font-semibold text-[var(--color-atlas-primary)]`}>
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
            src={ctaImage}
            alt={getText("home.cta.imageAlt", "Partenariat", "Partnership")}
            className="w-full h-full object-cover"
          />
          <div className={`absolute inset-0 bg-[var(--color-atlas-dark)]/85`} />
          <div className="absolute inset-0 hero-grid opacity-30" />
        </div>
        <div className="container mx-auto px-6 lg:px-8 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }} className="max-w-3xl mx-auto">
            <h2 className="font-display text-4xl md:text-6xl text-white mb-6 leading-tight">
              {getText("home.cta.title", "Discutons de votre initiative.", "Let's discuss your initiative.")}
            </h2>
            <p className="text-white/55 text-lg mb-10 leading-relaxed">
              {getText("home.cta.desc",
                "Que vous cherchiez à structurer un projet complexe, pénétrer un nouveau marché ou optimiser votre gouvernance — Atlas est votre partenaire stratégique.",
                "Whether you're looking to structure a complex project, enter a new market, or optimize your governance — Atlas is your strategic partner."
              )}
            </p>
            <Link href="/contact"
              className={`inline-flex items-center gap-2 bg-[var(--color-atlas-primary)] hover:bg-[var(--color-atlas-primary-hover)] text-white font-semibold px-8 py-4 rounded-full text-base transition-all duration-200 shadow-xl shadow-[var(--color-atlas-primary)]/30 hover:shadow-[var(--color-atlas-primary)]/50 hover:-translate-y-0.5`}>
              {getText("home.cta.button", "Demander une consultation", "Request a consultation")}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
