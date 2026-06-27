import { useLanguage } from "@/hooks/use-language";
import { useListServices } from "@workspace/api-client-react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronRight, Layers, Settings, Leaf, Globe, Briefcase } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Services() {
  const { t, lang } = useLanguage();
  const { data: services, isLoading } = useListServices();

  const getIconForIndex = (index: number) => {
    const icons = [Settings, Layers, Leaf, Globe, Briefcase];
    const Icon = icons[index % icons.length];
    return <Icon className="w-8 h-8" />;
  };

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
              {t("Nos Domaines d'Intervention", "Our Areas of Intervention")}
            </h1>
            <p className="text-xl text-zinc-400">
              {t(
                "Des solutions sur mesure conçues pour la résilience et la compétitivité à l'échelle globale.",
                "Customized solutions designed for resilience and competitiveness on a global scale."
              )}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          {isLoading ? (
            <div className="space-y-12">
              {[1, 2, 3].map(i => (
                <Skeleton key={i} className="w-full h-64 rounded-3xl" />
              ))}
            </div>
          ) : (
            <div className="space-y-16">
              {services?.map((service, index) => (
                <motion.div 
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="bg-card border border-border rounded-3xl p-8 md:p-12 shadow-sm flex flex-col md:flex-row gap-12"
                >
                  <div className="md:w-1/3">
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-8">
                      {getIconForIndex(index)}
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                      {lang === "fr" ? service.titleFr : service.titleEn}
                    </h2>
                    <p className="text-primary font-medium mb-6">
                      {lang === "fr" ? service.taglineFr : service.taglineEn}
                    </p>
                  </div>
                  
                  <div className="md:w-2/3 flex flex-col">
                    <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                      {lang === "fr" ? service.descriptionFr : service.descriptionEn}
                    </p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
                      <div>
                        <h4 className="font-semibold text-foreground mb-4 uppercase tracking-wider text-xs">
                          {t("Livrables clés", "Key Deliverables")}
                        </h4>
                        <ul className="space-y-2">
                          {(lang === "fr" ? service.deliverablesFr : service.deliverablesEn).map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <span className="text-primary mt-1">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-4 uppercase tracking-wider text-xs">
                          {t("Exemples de mandats", "Mandate Examples")}
                        </h4>
                        <ul className="space-y-2">
                          {(lang === "fr" ? service.mandateExamplesFr : service.mandateExamplesEn).map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <span className="text-primary mt-1">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="mt-auto pt-8 border-t border-border">
                      <Button variant="outline" className="group" asChild>
                        <Link href="/contact">
                          {t("Discuter d'un mandat", "Discuss a mandate")}
                          <ChevronRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
