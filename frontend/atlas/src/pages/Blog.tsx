import { useSiteContent } from "@/hooks/use-site-content";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, ArrowUpRight } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay: i * 0.1 },
  }),
};

export default function Blog() {
  const { getText, getSetting } = useSiteContent();

  const heroImage = getSetting("blog.hero.image", "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1920&q=80");
  const postImage = getSetting("blog.post.image", "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80");

  return (
    <div className="w-full">


      <section className="relative min-h-[60vh] flex items-end bg-[var(--color-atlas-dark)] pb-16 pt-40 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt={getText("blog.hero.imageAlt", "Journal d'Atlas", "Atlas journal")}
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-atlas-dark)] via-[var(--color-atlas-dark)]/85 to-transparent" />
        </div>
        <div className="absolute inset-0 z-0 hero-grid opacity-40" />
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0} className="mb-4 flex items-center gap-3">
            <span className="w-6 h-px bg-[var(--color-atlas-primary)]" />
            <span className="text-[var(--color-atlas-primary)] text-xs font-semibold tracking-[0.2em] uppercase">
              {getText("blog.hero.overline", "Actualités", "News")}
            </span>
          </motion.div>
          <motion.h1 initial="hidden" animate="visible" variants={fadeUp} custom={1}
            className="font-display text-5xl md:text-7xl text-white leading-tight max-w-3xl">
            {getText("blog.hero.title", "Blog Atlas", "Atlas Blog")}
          </motion.h1>
          <motion.p initial="hidden" animate="visible" variants={fadeUp} custom={2}
            className="mt-8 text-white/55 text-lg max-w-2xl leading-relaxed">
            {getText("blog.hero.subtitle",
              "Réflexions, actualités et analyses sur les corridors Canada-Afrique et les grands enjeux internationaux.",
              "Reflections, news and analysis on Canada-Africa corridors and major international issues."
            )}
          </motion.p>
        </div>
      </section>


      <section className="py-24 md:py-32 bg-white">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="rounded-2xl overflow-hidden h-80 lg:h-[500px]">
                <img
                  src={postImage}
                  alt={getText("blog.post.imageAlt", "Article en vedette", "Featured article")}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-[var(--color-atlas-primary)] text-xs font-semibold tracking-[0.2em] uppercase">
                  {getText("blog.post.overline", "Article en vedette", "Featured article")}
                </span>
                <span className="flex-1 h-px bg-border max-w-12" />
              </div>
              <h2 className="font-display text-4xl md:text-5xl text-[var(--color-atlas-dark)] mb-8 leading-tight">
                {getText("blog.post.title", "Le pouvoir des corridors durables", "The power of sustainable corridors")}
              </h2>
              <div className="space-y-5 text-muted-foreground leading-relaxed mb-8">
                <p>{getText("blog.post.p1",
                  "Les corridors économiques entre le Canada et l'Afrique ne sont pas de simples routes commerciales : ce sont des vecteurs de résilience, d'innovation et de coopération.",
                  "Economic corridors between Canada and Africa are more than trade routes: they are vectors of resilience, innovation and cooperation."
                )}</p>
                <p>{getText("blog.post.p2",
                  "Chez Atlas Global Resilience Corp., nous croyons que leur succès repose sur une compréhension fine des contextes locaux, un pilotage rigoureux et des partenariats inclusifs.",
                  "At Atlas Global Resilience Corp., we believe their success relies on a deep understanding of local contexts, rigorous steering and inclusive partnerships."
                )}</p>
              </div>
              <Link href="/insights"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-atlas-primary)] hover:gap-3 transition-all">
                {getText("blog.post.link", "Lire l'article", "Read article")}
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>


      <section className="py-24 md:py-32 bg-[var(--color-atlas-light)]">
        <div className="container mx-auto px-6 lg:px-8 text-center">
          <h2 className="font-display text-4xl md:text-5xl text-[var(--color-atlas-dark)] mb-6">
            {getText("blog.cta.title", "Découvrez toutes nos perspectives", "Discover all our insights")}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            {getText("blog.cta.subtitle",
              "Explorez nos analyses approfondies sur les marchés, les politiques publiques et les opportunités de partenariat.",
              "Explore our in-depth analyses on markets, public policy and partnership opportunities."
            )}
          </p>
          <Link href="/insights"
            className="inline-flex items-center gap-2 bg-[var(--color-atlas-primary)] hover:bg-[var(--color-atlas-primary-hover)] text-white font-semibold px-8 py-4 rounded-full text-sm transition-all duration-200 shadow-lg shadow-[var(--color-atlas-primary)]/25 hover:-translate-y-0.5">
            {getText("blog.cta.button", "Toutes les analyses", "All analyses")}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

    </div>
  );
}
