import { useLanguage } from "@/hooks/use-language";
import { useSiteContent } from "@/hooks/use-site-content";
import { useListServices } from "@workspace/api-client-react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const DEFAULT_SERVICE_IMAGES = [
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1434626881859-194d67b2b86f?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1531973576160-7125cd663d86?auto=format&fit=crop&w=800&q=80",
];

export default function Services() {
  const { t, lang } = useLanguage();
  const { getText, getSetting, getJson } = useSiteContent();
  const { data: services, isLoading } = useListServices();

  const primary = "var(--color-atlas-primary)";
  const primaryHover = "var(--color-atlas-primary-hover)";
  const dark = "var(--color-atlas-dark)";
  const light = "var(--color-atlas-light)";

  const heroImage = getSetting("services.hero.image", "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1920&q=80");
  const quoteImage = getSetting("services.quote.image", "https://images.unsplash.com/photo-1573167507387-6b4b98cb7c13?auto=format&fit=crop&w=1920&q=80");
  const serviceImages = getJson<string[]>("services.images.json", DEFAULT_SERVICE_IMAGES);

  return (
    <div className="w-full">

      {/* HERO */}
      <section className={`relative min-h-[60vh] flex items-end bg-[var(--color-atlas-dark)] pb-16 pt-40 overflow-hidden`}>
        <div className="absolute inset-0 z-0">
          <img src={heroImage}
            alt={getText("services.hero.imageAlt", "Services stratégiques", "Strategic services")} className="w-full h-full object-cover opacity-20" />
          <div className={`absolute inset-0 bg-gradient-to-r from-[var(--color-atlas-dark)] via-[var(--color-atlas-dark)]/85 to-transparent`} />
        </div>
        <div className="absolute inset-0 z-0 hero-grid opacity-40" />
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-4 flex items-center gap-3">
            <span className={`w-6 h-px bg-[var(--color-atlas-primary)]`} />
            <span className={`text-[var(--color-atlas-primary)] text-xs font-semibold tracking-[0.2em] uppercase`}>{getText("services.hero.overline", "Services", "Services")}</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-5xl md:text-7xl text-white leading-tight max-w-3xl">
            {getText("services.hero.title", "Cinq domaines d'expertise", "Five domains of expertise")}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 text-white/55 text-lg max-w-2xl leading-relaxed">
            {getText("services.hero.subtitle",
              "Des solutions sur mesure, conçues pour la résilience et la compétitivité à l'échelle globale.",
              "Tailored solutions, designed for resilience and competitiveness at a global scale."
            )}
          </motion.p>
        </div>
      </section>

      {/* SERVICE LIST */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-8">
          {isLoading ? (
            <div className="space-y-10">
              {[1,2,3].map(i => <Skeleton key={i} className="w-full h-72 rounded-2xl" />)}
            </div>
          ) : (
            <div className="space-y-6">
              {Array.isArray(services) && services.map((service, i) => (
                <motion.div key={service.id} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                  className={`group border border-border hover:border-[var(--color-atlas-primary)]/40 hover:shadow-xl hover:shadow-black/5 rounded-2xl overflow-hidden transition-all duration-300`}>
                  <div className="flex flex-col lg:flex-row">
                    {/* Image */}
                    <div className="relative w-full lg:w-64 h-52 lg:h-auto overflow-hidden shrink-0">
                      <img
                        src={serviceImages[i % serviceImages.length]}
                        alt={lang === "fr" ? service.titleFr : service.titleEn}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-white/0 via-[var(--color-atlas-dark)]/30 to-[var(--color-atlas-dark)]/60`} />
                      <div className="absolute top-5 left-5 font-display text-5xl text-white/25 leading-none select-none">
                        {String(i + 1).padStart(2, "0")}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-8 lg:p-10">
                      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 mb-5">
                        <div>
                          <div className={`w-8 h-0.5 bg-[var(--color-atlas-primary)] mb-5 transition-all duration-300 group-hover:w-14`} />
                          <Link href={`/services/${service.id}`}>
                            <h2 className={`font-display text-2xl md:text-3xl text-[var(--color-atlas-dark)] group-hover:text-[var(--color-atlas-primary)] transition-colors`}>
                              {lang === "fr" ? service.titleFr : service.titleEn}
                            </h2>
                          </Link>
                        </div>
                        <Link href="/contact"
                          className={`shrink-0 inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--color-atlas-primary)] group/link hover:gap-2.5 transition-all`}>
                          {t("Discuter de ce service", "Discuss this service")}
                          <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                        </Link>
                      </div>

                      <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                        {lang === "fr" ? service.descriptionFr : service.descriptionEn}
                      </p>

                      {(() => {
                        const deliverables = lang === "fr" ? service.deliverablesFr : service.deliverablesEn;
                        if (!deliverables || deliverables.length === 0) return null;
                        return (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {deliverables.map((d: string, di: number) => (
                              <div key={di} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                                <CheckCircle2 className={`w-4 h-4 text-[var(--color-atlas-primary)] shrink-0`} />
                                <span>{d}</span>
                              </div>
                            ))}
                          </div>
                        );
                      })()}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* APPROACH PANEL with full-width image */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img src={quoteImage}
          alt={getText("services.quote.imageAlt", "Équipe Atlas", "Atlas team")} className="w-full h-full object-cover" />
        <div className={`absolute inset-0 bg-[var(--color-atlas-dark)]/75`} />
        <div className="absolute inset-0 flex items-center justify-center text-center px-6">
          <p className="font-display text-2xl md:text-4xl text-white max-w-3xl leading-tight">
            {getText("services.quote.text",
              "« Chaque mandat commence par une écoute approfondie — puis nous structurons, exécutons et mesurons. »",
              "« Every mandate begins with deep listening — then we structure, execute, and measure. »"
            )}
          </p>
        </div>
      </div>

      {/* CTA */}
      <section className={`py-20 bg-[var(--color-atlas-light)] border-t border-border`}>
        <div className="container mx-auto px-6 lg:px-8 text-center">
          <h2 className={`font-display text-3xl md:text-4xl text-[var(--color-atlas-dark)] mb-4`}>{getText("services.cta.title", "Quel service vous correspond ?", "Which service suits you?")}</h2>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">{getText("services.cta.subtitle", "Contactez-nous pour un premier entretien sans engagement.", "Contact us for a first no-obligation conversation.")}</p>
          <Link href="/contact"
            className={`inline-flex items-center gap-2 bg-[var(--color-atlas-primary)] hover:bg-[var(--color-atlas-primary-hover)] text-white font-semibold px-8 py-4 rounded-full text-sm transition-all duration-200 shadow-lg shadow-[var(--color-atlas-primary)]/25 hover:-translate-y-0.5`}>
            {getText("services.cta.button", "Parler à un consultant", "Talk to a consultant")}
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

    </div>
  );
}
