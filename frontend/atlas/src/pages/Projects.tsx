import { useLanguage } from "@/hooks/use-language";
import { useSiteContent } from "@/hooks/use-site-content";
import { useListProjects } from "@workspace/api-client-react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowUpRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const DEFAULT_PROJECT_IMAGES = [
  "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1577041677443-8bbef8a04d1f?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=1200&q=80",
];

export default function Projects() {
  const { t, lang } = useLanguage();
  const { getText, getSetting, getJson } = useSiteContent();
  const { data: projects, isLoading } = useListProjects();

  const primary = "var(--color-atlas-primary)";
  const primaryHover = "var(--color-atlas-primary-hover)";
  const dark = "var(--color-atlas-dark)";
  const light = "var(--color-atlas-light)";

  const heroImage = getSetting("projects.hero.image", "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1920&q=80");
  const projectImages = getJson<string[]>("projects.images.json", DEFAULT_PROJECT_IMAGES);

  return (
    <div className="w-full">

      {/* HERO */}
      <section className={`relative min-h-[60vh] flex items-end bg-[var(--color-atlas-dark)] pb-16 pt-40 overflow-hidden`}>
        <div className="absolute inset-0 z-0">
          <img src={heroImage}
            alt={getText("projects.hero.imageAlt", "Projets", "Projects")} className="w-full h-full object-cover opacity-20" />
          <div className={`absolute inset-0 bg-gradient-to-r from-[var(--color-atlas-dark)] via-[var(--color-atlas-dark)]/85 to-transparent`} />
        </div>
        <div className="absolute inset-0 z-0 hero-grid opacity-40" />
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-4 flex items-center gap-3">
            <span className={`w-6 h-px bg-[var(--color-atlas-primary)]`} />
            <span className={`text-[var(--color-atlas-primary)] text-xs font-semibold tracking-[0.2em] uppercase`}>{getText("projects.hero.overline", "Réalisations", "Projects")}</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-5xl md:text-7xl text-white leading-tight max-w-3xl">
            {getText("projects.hero.title", "Mandats & réalisations", "Mandates & achievements")}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 text-white/55 text-lg max-w-2xl leading-relaxed">
            {getText("projects.hero.subtitle",
              "Des projets transformateurs conduits avec rigueur, transparence et un focus sur l'impact mesurable.",
              "Transformative projects conducted with rigor, transparency and a focus on measurable impact."
            )}
          </motion.p>
        </div>
      </section>

      {/* PROJECT LIST */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-8">
          {isLoading ? (
            <div className="space-y-8">
              {[1, 2].map(i => <Skeleton key={i} className="w-full h-96 rounded-2xl" />)}
            </div>
          ) : (
            <div className="space-y-10">
              {Array.isArray(projects) && projects.map((project, i) => (
                <motion.div key={project.id} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.6 }}
                  className={`group border border-border hover:border-[var(--color-atlas-primary)]/40 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-black/8 transition-all duration-300`}>
                  {/* Image header */}
                  <Link href={`/projects/${project.id}`} className="block">
                    <div className="relative h-64 md:h-72 overflow-hidden">
                      <img
                        src={projectImages[i % projectImages.length]}
                        alt={lang === "fr" ? project.titleFr : project.titleEn}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t from-[var(--color-atlas-dark)]/90 via-[var(--color-atlas-dark)]/40 to-transparent`} />
                      <div className="absolute bottom-5 left-6 flex flex-wrap gap-2">
                        {project.countries.map((c: string) => (
                          <span key={c} className="px-2.5 py-1 text-xs font-medium rounded-full bg-white/20 text-white backdrop-blur-sm">{c}</span>
                        ))}
                        <span className={`px-2.5 py-1 text-xs font-medium rounded-full bg-[var(--color-atlas-primary)]/80 text-white backdrop-blur-sm`}>{project.category}</span>
                      </div>
                    </div>
                  </Link>

                  {/* Body */}
                  <div className="p-8 md:p-10 flex flex-col lg:flex-row gap-10">
                    <div className="flex-1">
                      <Link href={`/projects/${project.id}`}>
                        <h2 className={`font-display text-3xl md:text-4xl text-[var(--color-atlas-dark)] mb-4 leading-snug group-hover:text-[var(--color-atlas-primary)] transition-colors`}>
                          {lang === "fr" ? project.titleFr : project.titleEn}
                        </h2>
                      </Link>
                      <p className="text-muted-foreground leading-relaxed mb-5">
                        {lang === "fr" ? project.taglineFr : project.taglineEn}
                      </p>
                    </div>
                    {/* Metrics sidebar */}
                    <div className="lg:w-60 shrink-0 flex flex-col gap-4">
                      <div className={`bg-[var(--color-atlas-light)] rounded-xl p-5 border border-border`}>
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">{t("Budget total", "Total budget")}</p>
                        <p className={`font-display text-2xl text-[var(--color-atlas-dark)]`}>{project.budget}</p>
                      </div>
                      <div className={`bg-[var(--color-atlas-light)] rounded-xl p-5 border border-border`}>
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">{t("Bailleur de fonds", "Funder")}</p>
                        <p className={`font-bold text-[var(--color-atlas-dark)]`}>{project.funder}</p>
                      </div>
                      {project.duration && (
                        <div className={`bg-[var(--color-atlas-light)] rounded-xl p-5 border border-border`}>
                          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">{t("Durée", "Duration")}</p>
                          <p className={`font-bold text-[var(--color-atlas-dark)]`}>{project.duration}</p>
                        </div>
                      )}
                      <Link href="/contact"
                        className={`inline-flex items-center justify-center gap-2 bg-[var(--color-atlas-primary)] hover:bg-[var(--color-atlas-primary-hover)] text-white text-sm font-semibold px-5 py-3 rounded-xl transition-colors`}>
                        {t("Projet similaire ?", "Similar project?")}
                        <ArrowUpRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className={`py-20 bg-[var(--color-atlas-light)] border-t border-border`}>
        <div className="container mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className={`font-display text-3xl md:text-4xl text-[var(--color-atlas-dark)] mb-3`}>{getText("projects.cta.title", "Vous avez un projet en tête ?", "Have a project in mind?")}</h2>
            <p className="text-muted-foreground max-w-xl">{getText("projects.cta.subtitle", "Partagez votre vision et découvrons ensemble comment Atlas peut vous accompagner.", "Share your vision and let's discover together how Atlas can support you.")}</p>
          </div>
          <Link href="/contact"
            className={`shrink-0 inline-flex items-center gap-2 bg-[var(--color-atlas-dark)] hover:bg-[var(--color-atlas-primary-hover)] text-white font-semibold px-8 py-4 rounded-full text-sm transition-all duration-200 hover:-translate-y-0.5`}>
            {getText("projects.cta.button", "Discutons-en", "Let's discuss")}
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

    </div>
  );
}
