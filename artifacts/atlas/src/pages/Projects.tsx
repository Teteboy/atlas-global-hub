import { useLanguage } from "@/hooks/use-language";
import { useListProjects } from "@workspace/api-client-react";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "wouter";

export default function Projects() {
  const { t, lang } = useLanguage();
  const { data: projects, isLoading } = useListProjects();

  return (
    <div className="w-full">
      <section className="bg-foreground text-background py-20">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-white">
              {t("Nos Réalisations", "Our Achievements")}
            </h1>
            <p className="text-xl text-zinc-400">
              {t(
                "Des résultats mesurables, livrés dans des environnements complexes pour des institutions exigeantes.",
                "Measurable results delivered in complex environments for demanding institutions."
              )}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4 md:px-6">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[1, 2, 3, 4].map(i => (
                <Skeleton key={i} className="w-full h-[400px] rounded-3xl" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {projects?.map((project, index) => (
                <motion.div 
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={`/projects/${project.id}`} className="block h-full group">
                    <div className="bg-card border border-border p-8 rounded-3xl shadow-sm hover:shadow-md transition-all h-full flex flex-col">
                      <div className="flex flex-wrap gap-2 mb-6">
                        <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider rounded-full">
                          {project.category}
                        </span>
                        {project.countries.map(c => (
                          <span key={c} className="px-3 py-1 bg-secondary text-secondary-foreground text-xs font-semibold rounded-full">
                            {c}
                          </span>
                        ))}
                      </div>
                      
                      <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                        {lang === "fr" ? project.titleFr : project.titleEn}
                      </h3>
                      
                      <p className="text-muted-foreground mb-8 flex-1">
                        {lang === "fr" ? project.taglineFr : project.taglineEn}
                      </p>
                      
                      <div className="grid grid-cols-2 gap-4 pt-6 border-t border-border mt-auto">
                        <div>
                          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{t("Budget", "Budget")}</p>
                          <p className="font-semibold text-foreground">{project.budget}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{t("Bailleur", "Funder")}</p>
                          <p className="font-semibold text-foreground">{project.funder}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
