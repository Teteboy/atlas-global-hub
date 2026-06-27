import { useLanguage } from "@/hooks/use-language";
import { motion } from "framer-motion";
import { ShieldCheck, Target, Users, Zap } from "lucide-react";

export default function About() {
  const { t } = useLanguage();

  return (
    <div className="w-full">
      {/* Header */}
      <section className="bg-foreground text-background py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-white">
              {t("Au croisement de la stratégie et de l'exécution.", "At the intersection of strategy and execution.")}
            </h1>
            <p className="text-xl text-zinc-400">
              {t(
                "Atlas Global Resilience Corp. est une firme internationale de conseil stratégique qui bâtit des ponts solides entre le Canada, l'Afrique et leurs partenaires transatlantiques.",
                "Atlas Global Resilience Corp. is an international strategic advisory firm building strong bridges between Canada, Africa, and their transatlantic partners."
              )}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-foreground">
                {t("Notre Mission", "Our Mission")}
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                {t(
                  "Accélérer le développement institutionnel et économique en concevant, structurant et accompagnant la mise en œuvre de projets complexes et innovants.",
                  "Accelerate institutional and economic development by designing, structuring, and supporting the implementation of complex and innovative projects."
                )}
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t(
                  "Nous croyons fermement que les meilleures stratégies échouent sans une exécution impeccable. C'est pourquoi Atlas s'engage non seulement à concevoir la feuille de route, mais à piloter le navire vers sa destination.",
                  "We firmly believe that the best strategies fail without flawless execution. That is why Atlas commits not just to designing the roadmap, but to steering the ship to its destination."
                )}
              </p>
            </div>
            <div className="bg-secondary/50 p-12 rounded-3xl border border-border relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Target className="w-48 h-48 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-8 relative z-10 text-foreground">
                {t("Pourquoi 'Atlas' ?", "Why 'Atlas'?")}
              </h3>
              <div className="space-y-6 relative z-10">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                    <span className="font-bold text-primary">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">{t("Soutenir", "To Support")}</h4>
                    <p className="text-muted-foreground text-sm">{t("Comme le Titan, nous portons le poids des défis complexes de nos clients.", "Like the Titan, we bear the weight of our clients' complex challenges.")}</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                    <span className="font-bold text-primary">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">{t("Orienter", "To Guide")}</h4>
                    <p className="text-muted-foreground text-sm">{t("La cartographie précise des enjeux mondiaux pour une navigation sûre.", "Precise mapping of global issues for safe navigation.")}</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                    <span className="font-bold text-primary">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">{t("Connecter", "To Connect")}</h4>
                    <p className="text-muted-foreground text-sm">{t("Relier les continents, spécifiquement l'Amérique du Nord et l'Afrique.", "Linking continents, specifically North America and Africa.")}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
