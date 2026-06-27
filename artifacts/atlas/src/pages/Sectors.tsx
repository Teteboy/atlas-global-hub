import { useLanguage } from "@/hooks/use-language";
import { useListSectors } from "@workspace/api-client-react";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Sectors() {
  const { t, lang } = useLanguage();
  const { data: sectors, isLoading } = useListSectors();

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
              {t("Secteurs & Corridors", "Sectors & Corridors")}
            </h1>
            <p className="text-xl text-zinc-400">
              {t(
                "Faciliter les investissements et le transfert de connaissances à travers des corridors géographiques ciblés.",
                "Facilitating investments and knowledge transfer across targeted geographic corridors."
              )}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[1, 2, 3, 4].map(i => (
                <Skeleton key={i} className="w-full h-80 rounded-2xl" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {sectors?.map((sector, index) => (
                <motion.div 
                  key={sector.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card border border-border p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow group"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {lang === "fr" ? sector.titleFr : sector.titleEn}
                      </h3>
                      <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                        {sector.corridor}
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground mb-8 line-clamp-3">
                    {lang === "fr" ? sector.descriptionFr : sector.descriptionEn}
                  </p>
                  
                  <div className="bg-secondary/50 rounded-2xl p-6">
                    <h4 className="text-sm font-semibold mb-4 text-foreground">
                      {t("Points saillants", "Highlights")}
                    </h4>
                    <ul className="space-y-3">
                      {sector.highlights.map((h, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex gap-2">
                          <span className="text-primary mt-0.5">✓</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
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
