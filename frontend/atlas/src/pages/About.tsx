import { useLanguage } from "@/hooks/use-language";
import { useSiteContent } from "@/hooks/use-site-content";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay: i * 0.1 },
  }),
};

export default function About() {
  const { t, lang } = useLanguage();
  const { getText, getSetting, getJson } = useSiteContent();

  const primary = "var(--color-atlas-primary)";
  const primaryHover = "var(--color-atlas-primary-hover)";
  const dark = "var(--color-atlas-dark)";
  const light = "var(--color-atlas-light)";

  const heroImage = getSetting("about.hero.image", "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1920&q=80");
  const missionImage = getSetting("about.mission.image", "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&w=1200&q=80");
  const identityImage = getSetting("about.identity.image", "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&q=80");
  const valuesImage = getSetting("about.values.image", "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=1920&q=80");

  const values = getJson("about.values.json", [
    { num: "01", titleFr: "Rigueur", titleEn: "Rigor", descFr: "Analyse approfondie et méthodologie éprouvée pour chaque mandat.", descEn: "In-depth analysis and proven methodology for every mandate." },
    { num: "02", titleFr: "Clarté", titleEn: "Clarity", descFr: "Communication transparente et objectifs définis dès le départ.", descEn: "Transparent communication and clearly defined objectives from the start." },
    { num: "03", titleFr: "Partenariats", titleEn: "Partnerships", descFr: "Collaboration étroite avec les clients et réseau d'associés de confiance.", descEn: "Close collaboration with clients and a network of trusted associates." },
    { num: "04", titleFr: "Résultats", titleEn: "Results", descFr: "Focus sur l'impact mesurable et la valeur concrète pour le client.", descEn: "Focus on measurable impact and concrete value for the client." },
  ]);

  const atlasMeanings = getJson("about.identity.json", [
    { titleFr: "Soutenir", titleEn: "Support", descFr: "Comme le Titan, nous portons le poids des défis complexes de nos clients.", descEn: "Like the Titan, we carry the weight of our clients' complex challenges." },
    { titleFr: "Orienter", titleEn: "Guide", descFr: "La cartographie précise des enjeux mondiaux pour une navigation sûre.", descEn: "Precise mapping of global issues for safe navigation." },
    { titleFr: "Relier", titleEn: "Connect", descFr: "Tisser des liens durables entre institutions, territoires et partenaires.", descEn: "Weaving lasting links between institutions, territories and partners." },
  ]);

  const approach = getJson("about.approach.json", [
    { step: "01", titleFr: "Écouter", titleEn: "Listen", descFr: "Comprendre le contexte, les besoins et les contraintes du client.", descEn: "Understand the context, needs and constraints of the client.", img: "https://images.unsplash.com/photo-1434626881859-194d67b2b86f?auto=format&fit=crop&w=600&q=80" },
    { step: "02", titleFr: "Cadrer", titleEn: "Frame", descFr: "Définir la stratégie, le cadre logique et les outils de mise en œuvre.", descEn: "Define the strategy, logical framework and implementation tools.", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80" },
    { step: "03", titleFr: "Structurer", titleEn: "Structure", descFr: "Pilotage opérationnel, gestion des parties prenantes, suivi de la performance.", descEn: "Operational steering, stakeholder management, performance monitoring.", img: "https://images.unsplash.com/photo-1531973576160-7125cd663d86?auto=format&fit=crop&w=600&q=80" },
    { step: "04", titleFr: "Piloter", titleEn: "Steer", descFr: "Assurer l'exécution, transférer les compétences et capitaliser les apprentissages.", descEn: "Ensure execution, transfer skills and capitalize on learnings.", img: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&q=80" },
  ]);

  return (
    <div className="w-full">

      {/* ── HERO with background photo ── */}
      <section className={`relative min-h-[65vh] flex items-end bg-[var(--color-atlas-dark)] pb-16 pt-40 overflow-hidden`}>
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt={getText("about.hero.imageAlt", "Collaboration d'équipe", "Team collaboration")}
            className="w-full h-full object-cover opacity-20"
          />
          <div className={`absolute inset-0 bg-gradient-to-r from-[var(--color-atlas-dark)] via-[var(--color-atlas-dark)]/85 to-transparent`} />
        </div>
        <div className="absolute inset-0 z-0 hero-grid opacity-40" />
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0} className="mb-4 flex items-center gap-3">
            <span className={`w-6 h-px bg-[var(--color-atlas-primary)]`} />
            <span className={`text-[var(--color-atlas-primary)] text-xs font-semibold tracking-[0.2em] uppercase`}>{getText("about.hero.overline", "À propos", "About us")}</span>
          </motion.div>
          <motion.h1 initial="hidden" animate="visible" variants={fadeUp} custom={1}
            className="font-display text-5xl md:text-7xl text-white leading-tight max-w-3xl">
            {getText("about.hero.title", "Au croisement de la stratégie et de l'exécution.", "At the intersection of strategy and execution.")}
          </motion.h1>
          <motion.p initial="hidden" animate="visible" variants={fadeUp} custom={2}
            className="mt-8 text-white/55 text-lg max-w-2xl leading-relaxed">
            {getText("about.hero.subtitle",
              "Atlas Global Resilience Corp. est une firme internationale de conseil stratégique qui bâtit des ponts solides entre le Canada, l'Afrique et leurs partenaires transatlantiques.",
              "Atlas Global Resilience Corp. is an international strategic advisory firm building strong bridges between Canada, Africa and their transatlantic partners."
            )}
          </motion.p>
        </div>
      </section>

      {/* ── MISSION with image ── */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className={`text-[var(--color-atlas-primary)] text-xs font-semibold tracking-[0.2em] uppercase`}>{getText("about.mission.overline", "Mission", "Mission")}</span>
                <span className="flex-1 h-px bg-border max-w-12" />
              </div>
              <h2 className={`font-display text-4xl md:text-5xl text-[var(--color-atlas-dark)] mb-8 leading-tight`}>
                {getText("about.mission.title", "Notre raison d'être", "Our reason for being")}
              </h2>
              <div className="space-y-5 text-muted-foreground leading-relaxed">
                <p>{getText("about.mission.p1",
                  "Concevoir, structurer et faire avancer des initiatives à fort impact entre le Canada, l'Afrique et leurs partenaires.",
                  "Design, structure and advance high-impact initiatives between Canada, Africa and their partners."
                )}</p>
                <p>{getText("about.mission.p2",
                  "Atlas est une plateforme de conseil et d'assistance à la mise en œuvre, capable d'intervenir à l'intersection du développement économique, de la transformation numérique, des compétences, du climat, de l'éducation résiliente, des partenariats transatlantiques et du pilotage de projets.",
                  "Atlas is an advisory and implementation support platform, capable of operating at the intersection of economic development, digital transformation, skills, climate, resilient education, transatlantic partnerships and project management."
                )}</p>
              </div>
            </div>
            <div className="relative">
              <div className="rounded-2xl overflow-hidden h-96 lg:h-[500px]">
                <img
                  src={missionImage}
                  alt={getText("about.mission.imageAlt", "Session stratégique", "Strategy session")}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className={`absolute -bottom-5 -left-5 bg-[var(--color-atlas-dark)] text-white rounded-2xl p-5 shadow-xl hidden md:block`}>
                <div className={`font-display text-3xl text-[var(--color-atlas-primary)] mb-1`}>{getText("about.mission.badge.value", "10+", "10+")}</div>
                <div className="text-xs text-white/60 font-medium uppercase tracking-wider">{getText("about.mission.badge.label", "Années d'expérience", "Years of experience")}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY ATLAS NAME panel ── */}
      <section className={`py-24 md:py-32 bg-[var(--color-atlas-light)]`}>
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="rounded-2xl overflow-hidden h-80 lg:h-[420px]">
                <img
                  src={identityImage}
                  alt={getText("about.identity.imageAlt", "Paysage africain", "Africa skyline")}
                  className="w-full h-full object-cover"
                />
                <div className={`absolute inset-0 bg-gradient-to-t from-[var(--color-atlas-dark)]/60 to-transparent`} />
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="flex items-center gap-3 mb-6">
                <span className={`text-[var(--color-atlas-primary)] text-xs font-semibold tracking-[0.2em] uppercase`}>{getText("about.identity.overline", "Identité", "Identity")}</span>
                <span className="flex-1 h-px bg-border max-w-12" />
              </div>
              <h2 className={`font-display text-4xl md:text-5xl text-[var(--color-atlas-dark)] mb-8 leading-tight`}>
                {getText("about.identity.title", "Pourquoi « Atlas » ?", "Why « Atlas »?")}
              </h2>
              <div className="space-y-7">
                {atlasMeanings.map((item, i) => (
                  <div key={i} className="flex gap-5">
                    <div className={`w-9 h-9 rounded-full bg-[var(--color-atlas-primary)]/15 border border-[var(--color-atlas-primary)]/30 flex items-center justify-center shrink-0 mt-0.5`}>
                      <span className={`text-[var(--color-atlas-primary)] text-xs font-bold`}>{i + 1}</span>
                    </div>
                    <div>
                      <h4 className={`font-bold text-[var(--color-atlas-dark)] mb-1.5`}>{lang === "fr" ? item.titleFr : item.titleEn}</h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">{lang === "fr" ? item.descFr : item.descEn}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── APPROACH steps ── */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-xl mb-14">
            <div className="flex items-center gap-3 mb-5">
              <span className={`text-[var(--color-atlas-primary)] text-xs font-semibold tracking-[0.2em] uppercase`}>{getText("about.approach.overline", "Approche", "Approach")}</span>
              <span className="flex-1 h-px bg-border max-w-12" />
            </div>
            <h2 className={`font-display text-4xl md:text-5xl text-[var(--color-atlas-dark)] leading-tight`}>
              {getText("about.approach.title", "Notre approche : écouter, cadrer, structurer, piloter", "Our approach: listen, frame, structure, steer")}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {approach.map((step, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }}
                className={`group border border-border hover:border-[var(--color-atlas-primary)]/40 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300`}>
                <div className="relative h-40 overflow-hidden">
                  <img src={step.img} alt={lang === "fr" ? step.titleFr : step.titleEn} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className={`absolute inset-0 bg-[var(--color-atlas-dark)]/60`} />
                  <div className="absolute top-4 left-5 font-display text-4xl text-white/20">{step.step}</div>
                  <div className="absolute bottom-4 left-5 font-bold text-white text-lg">{lang === "fr" ? step.titleFr : step.titleEn}</div>
                </div>
                <div className="p-6 bg-white">
                  <p className="text-muted-foreground text-sm leading-relaxed">{lang === "fr" ? step.descFr : step.descEn}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section className={`py-24 md:py-32 bg-[var(--color-atlas-dark)] text-white relative overflow-hidden`}>
        <div className="absolute inset-0 hero-grid opacity-40" />
        <div className="absolute inset-0 z-0">
          <img
            src={valuesImage}
            alt={getText("about.values.imageAlt", "Valeurs", "Values")}
            className="w-full h-full object-cover opacity-8"
          />
          <div className={`absolute inset-0 bg-[var(--color-atlas-dark)]/90`} />
        </div>
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-xl mb-14">
            <div className="flex items-center gap-3 mb-5">
              <span className={`text-[var(--color-atlas-primary)] text-xs font-semibold tracking-[0.2em] uppercase`}>{getText("about.values.overline", "Valeurs", "Values")}</span>
              <span className="flex-1 h-px bg-white/15 max-w-12" />
            </div>
            <h2 className="font-display text-4xl md:text-5xl leading-tight">{getText("about.values.title", "Ce qui nous guide", "What guides us")}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {values.map((v, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.5 }}
                className={`border border-white/10 rounded-2xl p-8 hover:border-[var(--color-atlas-primary)]/30 hover:bg-white/3 transition-all duration-300`}>
                <div className={`font-display text-4xl text-[var(--color-atlas-primary)]/30 mb-4 leading-none`}>{v.num}</div>
                <h3 className="font-bold text-white text-lg mb-3">{lang === "fr" ? v.titleFr : v.titleEn}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{lang === "fr" ? v.descFr : v.descEn}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-white border-t border-border">
        <div className="container mx-auto px-6 lg:px-8 text-center">
          <h2 className={`font-display text-4xl md:text-5xl text-[var(--color-atlas-dark)] mb-6`}>{getText("about.cta.title", "Prêt à construire ensemble ?", "Ready to build together?")}</h2>
          <Link href="/contact"
            className={`inline-flex items-center gap-2 bg-[var(--color-atlas-primary)] hover:bg-[var(--color-atlas-primary-hover)] text-white font-semibold px-8 py-4 rounded-full text-sm transition-all duration-200 shadow-lg shadow-[var(--color-atlas-primary)]/25 hover:-translate-y-0.5`}>
            {getText("about.cta.button", "Nous contacter", "Contact us")}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

    </div>
  );
}
