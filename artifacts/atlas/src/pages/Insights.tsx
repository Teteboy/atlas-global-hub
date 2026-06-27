import { useLanguage } from "@/hooks/use-language";
import { useListInsights } from "@workspace/api-client-react";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "wouter";
import { Calendar } from "lucide-react";
import { format } from "date-fns";

export default function Insights() {
  const { t, lang } = useLanguage();
  // Call hook with params object (requires 'lang' prop which is defined as fr/en)
  const { data: insights, isLoading } = useListInsights({ lang: lang });

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
              {t("Perspectives", "Insights")}
            </h1>
            <p className="text-xl text-zinc-400">
              {t(
                "Notes stratégiques, analyses de marché et réflexions sur le développement global.",
                "Strategic notes, market analyses and reflections on global development."
              )}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map(i => (
                <div key={i} className="space-y-4">
                  <Skeleton className="w-full h-48 rounded-2xl" />
                  <Skeleton className="w-3/4 h-6" />
                  <Skeleton className="w-full h-4" />
                  <Skeleton className="w-full h-4" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {insights?.map((insight, index) => (
                <motion.div 
                  key={insight.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={`/insights/${insight.id}`} className="group block">
                    <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all h-full flex flex-col">
                      <div className="h-48 bg-secondary/50 flex items-center justify-center p-6 relative overflow-hidden">
                         {insight.imageUrl ? (
                           <img src={insight.imageUrl} alt="" className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-multiply group-hover:scale-105 transition-transform duration-500" />
                         ) : (
                           <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5"></div>
                         )}
                         <span className="relative z-10 px-3 py-1 bg-background text-foreground text-xs font-bold uppercase tracking-wider rounded-full shadow-sm">
                           {insight.category}
                         </span>
                      </div>
                      
                      <div className="p-8 flex-1 flex flex-col">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                          <Calendar className="w-3 h-3" />
                          <span>{format(new Date(insight.publishedAt), 'MMMM d, yyyy')}</span>
                        </div>
                        <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors line-clamp-2">
                          {lang === "fr" ? insight.titleFr : insight.titleEn}
                        </h3>
                        <p className="text-muted-foreground text-sm line-clamp-3 mb-6 flex-1">
                          {lang === "fr" ? insight.summaryFr : insight.summaryEn}
                        </p>
                        <span className="text-primary text-sm font-semibold mt-auto group-hover:underline">
                          {t("Lire l'article", "Read article")} →
                        </span>
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
