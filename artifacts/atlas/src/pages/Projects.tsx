import { useLanguage } from "@/hooks/use-language";
import { useListProjects } from "@workspace/api-client-react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowUpRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const PROJECT_IMAGES = [
  "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1577041677443-8bbef8a04d1f?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=1200&q=80",
];

export default function Projects() {
  const { t, lang } = useLanguage();
  const { data: projects, isLoading } = useListProjects();

  return (
    <div className="w-full">

      {/* HERO */}
      <section className="relative min-h-[60vh] flex items-end bg-[#080E1C] pb-16 pt-40 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1920&q=80"
            alt="Projects" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080E1C] via-[#080E1C]/85 to-transparent" />
        </div>
        <div className="absolute inset-0 z-0 hero-grid opacity-40" />
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-4 flex items-center gap-3">
            <span className="w-6 h-px bg-[#00C4D4]" />
            <span className="text-[#00C4D4] text-xs font-semibold tracking-[0.2em] uppercase">{t("Réalisations", "Projects")}</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-5xl md:text-7xl text-white leading-tight max-w-3xl">
            {t("Mandats & réalisations", "Mandates & achievements")}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 text-white/55 text-lg max-w-2xl leading-relaxed">
            {t(
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
              {(projects ?? []).map((project, i) => (
                <motion.div key={project.id} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.6 }}
                  className="group border border-border hover:border-[#00C4D4]/40 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-black/8 transition-all duration-300">
                  {/* Image header */}
                  <div className="relative h-64 md:h-72 overflow-hidden">
                    <img
                      src={PROJECT_IMAGES[i % PROJECT_IMAGES.length]}
                      alt={lang === "fr" ? project.titleFr : project.titleEn}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#080E1C]/90 via-[#080E1C]/40 to-transparent" />
                    <div className="absolute bottom-5 left-6 flex flex-wrap gap-2">
                      {project.countries.map((c: string) => (
                        <span key={c} className="px-2.5 py-1 text-xs font-medium rounded-full bg-white/20 text-white backdrop-blur-sm">{c}</span>
                      ))}
                      <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-[#00C4D4]/80 text-white backdrop-blur-sm">{project.category}</span>
                    </div>
                    {project.status && (
                      <div className="absolute top-5 right-5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-white/80 text-xs font-semibold border border-white/20">
                        {project.status}
                      </div>
                    )}
                  </div>

                  {/* Body */}
                  <div className="p-8 md:p-10 flex flex-col lg:flex-row gap-10">
                    <div className="flex-1">
                      <h2 className="font-display text-3xl md:text-4xl text-[#080E1C] mb-4 leading-snug group-hover:text-[#00C4D4] transition-colors">
                        {lang === "fr" ? project.titleFr : project.titleEn}
                      </h2>
                      <p className="text-muted-foreground leading-relaxed mb-5">
                        {lang === "fr" ? project.taglineFr : project.taglineEn}
                      </p>
                      {(lang === "fr" ? project.descriptionFr : project.descriptionEn) && (
                        <p className="text-muted-foreground text-sm leading-relaxed border-l-2 border-[#00C4D4]/40 pl-4 italic">
                          {lang === "fr" ? project.descriptionFr : project.descriptionEn}
                        </p>
                      )}
                    </div>
                    {/* Metrics sidebar */}
                    <div className="lg:w-60 shrink-0 flex flex-col gap-4">
                      <div className="bg-[#F7F8FA] rounded-xl p-5 border border-border">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">{t("Budget total", "Total budget")}</p>
                        <p className="font-display text-2xl text-[#080E1C]">{project.budget}</p>
                      </div>
                      <div className="bg-[#F7F8FA] rounded-xl p-5 border border-border">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">{t("Bailleur de fonds", "Funder")}</p>
                        <p className="font-bold text-[#080E1C]">{project.funder}</p>
                      </div>
                      {project.year && (
                        <div className="bg-[#F7F8FA] rounded-xl p-5 border border-border">
                          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">{t("Année", "Year")}</p>
                          <p className="font-bold text-[#080E1C]">{project.year}</p>
                        </div>
                      )}
                      <Link href="/contact"
                        className="inline-flex items-center justify-center gap-2 bg-[#00C4D4] hover:bg-[#00b0bf] text-white text-sm font-semibold px-5 py-3 rounded-xl transition-colors">
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
      <section className="py-20 bg-[#F7F8FA] border-t border-border">
        <div className="container mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="font-display text-3xl md:text-4xl text-[#080E1C] mb-3">{t("Vous avez un projet en tête ?", "Have a project in mind?")}</h2>
            <p className="text-muted-foreground max-w-xl">{t("Partagez votre vision et découvrons ensemble comment Atlas peut vous accompagner.", "Share your vision and let's discover together how Atlas can support you.")}</p>
          </div>
          <Link href="/contact"
            className="shrink-0 inline-flex items-center gap-2 bg-[#080E1C] hover:bg-[#0f1829] text-white font-semibold px-8 py-4 rounded-full text-sm transition-all duration-200 hover:-translate-y-0.5">
            {t("Discutons-en", "Let's discuss")}
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

    </div>
  );
}
