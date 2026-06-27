import { motion } from "framer-motion";
import { Link } from "wouter";
import { useLanguage } from "@/hooks/use-language";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronRight, Globe, Layers, ShieldCheck, Zap } from "lucide-react";
import { useGetSiteStats, useListServices } from "@workspace/api-client-react";
import heroBg from "@/assets/images/hero-bg.jpg";

export default function Home() {
  const { t, lang } = useLanguage();
  
  // Try to load site stats for featured projects/insights
  const { data: stats } = useGetSiteStats({ query: { enabled: true } });
  const { data: services } = useListServices({ query: { enabled: true } });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };

  return (
    <div className="w-full flex flex-col">
      {/* HERO SECTION */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-foreground text-background">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={heroBg} 
            alt="Global Network" 
            className="w-full h-full object-cover opacity-30 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground via-foreground/90 to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10 py-20">
          <motion.div 
            className="max-w-3xl"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div variants={itemVariants} className="mb-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary border border-primary/30 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span className="text-xs font-medium tracking-wider uppercase">
                {t("Conseil Global & Résilience", "Global Advisory & Resilience")}
              </span>
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight mb-6 text-white leading-tight">
              {t(
                "Concevoir, structurer et faire avancer des initiatives à fort impact.",
                "Designing, structuring and advancing high-impact initiatives."
              )}
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-lg md:text-xl text-zinc-300 mb-10 max-w-2xl leading-relaxed">
              {t(
                "Conseil stratégique, assistance à la mise en œuvre, transformation institutionnelle, compétitivité, climat, éducation résiliente et partenariats complexes entre le Canada, l'Afrique et leurs partenaires.",
                "Strategic advisory, implementation support, institutional transformation, competitiveness, climate, resilient education and complex partnerships between Canada, Africa and their partners."
              )}
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 text-base font-semibold px-8 h-14" asChild>
                <Link href="/contact">
                  {t("Parler à Atlas", "Talk to Atlas")} <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-foreground bg-white hover:bg-zinc-100 hover:text-foreground text-base font-medium px-8 h-14" asChild>
                <Link href="/contact">
                  {t("Demander un appel découverte", "Request a discovery call")}
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CREDIBILITY STRIP */}
      <div className="bg-primary text-primary-foreground py-4 overflow-hidden border-y border-primary/20">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 text-sm font-medium tracking-wide uppercase">
            <span>Canada–{t("Afrique", "Africa")}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-primary-foreground/50"></span>
            <span>{t("Stratégie + exécution", "Strategy + execution")}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-primary-foreground/50"></span>
            <span>{t("Approche bilingue", "Bilingual approach")}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-primary-foreground/50"></span>
            <span>{t("Mandats institutionnels", "Institutional mandates")}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-primary-foreground/50"></span>
            <span>{t("Partenariats complexes", "Complex partnerships")}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-primary-foreground/50"></span>
            <span>{t("Focus résultats", "Results focus")}</span>
          </div>
        </div>
      </div>

      {/* SERVICES PREVIEW */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-foreground">
                {t("Nos Baskets de Services", "Our Service Baskets")}
              </h2>
              <p className="text-muted-foreground text-lg">
                {t(
                  "Une offre structurée pour répondre aux défis multidimensionnels des institutions publiques et privées.",
                  "A structured offering to address the multidimensional challenges of public and private institutions."
                )}
              </p>
            </div>
            <Button variant="ghost" className="shrink-0 font-semibold group" asChild>
              <Link href="/services">
                {t("Voir tous les services", "View all services")} 
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services?.slice(0, 5).map((service, index) => (
              <motion.div 
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={`/services/${service.id}`} className="block h-full group">
                  <div className="h-full bg-card rounded-xl p-8 shadow-sm border border-border transition-all duration-300 hover:shadow-md hover:border-primary/50 relative overflow-hidden flex flex-col">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
                      {/* Placeholder icon since we map from strings in DB usually */}
                      <Layers className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                      {lang === "fr" ? service.titleFr : service.titleEn}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-6 flex-1">
                      {lang === "fr" ? service.taglineFr : service.taglineEn}
                    </p>
                    <div className="mt-auto flex items-center text-primary font-medium text-sm">
                      {t("En savoir plus", "Learn more")} 
                      <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY ATLAS */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-16 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-foreground">
              {t("Pourquoi choisir Atlas ?", "Why choose Atlas?")}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Globe,
                title: t("Connaissance contextuelle forte", "Strong contextual knowledge"),
                desc: t("Compréhension approfondie des contextes africains, des environnements institutionnels et des réalités de mise en œuvre.", "Deep understanding of African contexts, institutional environments and implementation realities.")
              },
              {
                icon: Zap,
                title: t("Approche orientée exécution", "Execution-driven approach"),
                desc: t("Cadrage, test, structuration, pilotage et avancement concret des projets.", "Framing, testing, structuring, piloting and advancing concrete projects.")
              },
              {
                icon: Layers,
                title: t("Positionnement corridor", "Corridor positioning"),
                desc: t("Connexion entre le Canada, l'Afrique et les partenaires internationaux autour d'initiatives concrètes.", "Connecting Canada, Africa and international partners around concrete initiatives.")
              },
              {
                icon: ShieldCheck,
                title: t("Souplesse de déploiement", "Deployment flexibility"),
                desc: t("Modèle agile, réseau d'associés, capacité à diriger ou à s'intégrer dans des consortiums.", "Agile model, associate network, capacity to lead or partner in consortiums.")
              }
            ].map((pillar, i) => (
              <motion.div 
                key={i}
                className="bg-card/50 border border-border/50 p-8 rounded-2xl text-center flex flex-col items-center hover:bg-card hover:shadow-sm transition-colors"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-6">
                  <pillar.icon className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-lg mb-3 text-foreground">{pillar.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{pillar.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS (API Driven) */}
      {stats?.featuredProjects && stats.featuredProjects.length > 0 && (
        <section className="py-24 bg-foreground text-background relative overflow-hidden">
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div className="max-w-2xl">
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-white">
                  {t("Mandats récents", "Recent Mandates")}
                </h2>
                <p className="text-zinc-400 text-lg">
                  {t(
                    "Des projets transformateurs réalisés avec rigueur et impact.",
                    "Transformative projects delivered with rigor and impact."
                  )}
                </p>
              </div>
              <Button variant="outline" className="shrink-0 bg-transparent text-white border-zinc-700 hover:bg-white hover:text-foreground group" asChild>
                <Link href="/projects">
                  {t("Tous les projets", "All projects")} 
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {stats.featuredProjects.map((project, i) => (
                <motion.div 
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                >
                  <Link href={`/projects/${project.id}`} className="group block">
                    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-primary/50 transition-colors h-full flex flex-col">
                      <div className="p-8 flex-1">
                        <div className="flex flex-wrap gap-2 mb-6">
                          {project.countries.map(c => (
                            <span key={c} className="px-2.5 py-1 text-xs font-semibold rounded-full bg-zinc-800 text-zinc-300">
                              {c}
                            </span>
                          ))}
                          <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-primary/20 text-primary">
                            {project.category}
                          </span>
                        </div>
                        <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-primary transition-colors line-clamp-2">
                          {lang === "fr" ? project.titleFr : project.titleEn}
                        </h3>
                        <p className="text-zinc-400 line-clamp-3 mb-6">
                          {lang === "fr" ? project.taglineFr : project.taglineEn}
                        </p>
                        
                        <div className="grid grid-cols-2 gap-4 mt-auto pt-6 border-t border-zinc-800">
                          <div>
                            <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">{t("Budget", "Budget")}</p>
                            <p className="font-semibold text-white">{project.budget}</p>
                          </div>
                          <div>
                            <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">{t("Bailleur", "Funder")}</p>
                            <p className="font-semibold text-white">{project.funder}</p>
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

      {/* CTA SECTION */}
      <section className="py-24 bg-primary text-primary-foreground text-center">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
            {t("Discutons de votre initiative.", "Let's discuss your initiative.")}
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-10">
            {t(
              "Que vous cherchiez à structurer un projet complexe, pénétrer un nouveau marché ou optimiser votre gouvernance, notre équipe est prête à vous accompagner.",
              "Whether you're looking to structure a complex project, enter a new market, or optimize your governance, our team is ready to support you."
            )}
          </p>
          <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90 font-bold px-8 h-14 shadow-xl text-base" asChild>
            <Link href="/contact">
              {t("Demander une consultation", "Request a consultation")}
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
