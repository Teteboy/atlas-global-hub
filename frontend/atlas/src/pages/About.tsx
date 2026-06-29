import { useLanguage } from "@/hooks/use-language";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 },
  }),
};

export default function About() {
  const { t } = useLanguage();

  const values = [
    { num: "01", title: t("Rigueur", "Rigor"), desc: t("Analyse approfondie et méthodologie éprouvée pour chaque mandat.", "In-depth analysis and proven methodology for every mandate.") },
    { num: "02", title: t("Clarté", "Clarity"), desc: t("Communication transparente et objectifs définis dès le départ.", "Transparent communication and clearly defined objectives from the start.") },
    { num: "03", title: t("Partenariats", "Partnerships"), desc: t("Collaboration étroite avec les clients et réseau d'associés de confiance.", "Close collaboration with clients and a network of trusted associates.") },
    { num: "04", title: t("Résultats", "Results"), desc: t("Focus sur l'impact mesurable et la valeur concrète pour le client.", "Focus on measurable impact and concrete value for the client.") },
  ];

  const atlasMeanings = [
    { label: t("Soutenir", "Support"), desc: t("Comme le Titan, nous portons le poids des défis complexes de nos clients.", "Like the Titan, we carry the weight of our clients' complex challenges.") },
    { label: t("Orienter", "Guide"), desc: t("La cartographie précise des enjeux mondiaux pour une navigation sûre.", "Precise mapping of global issues for safe navigation.") },
    { label: t("Relier", "Connect"), desc: t("Tisser des liens durables entre institutions, territoires et partenaires.", "Weaving lasting links between institutions, territories and partners.") },
  ];

  return (
    <div className="w-full">

      {/* ── HERO with background photo ── */}
      <section className="relative min-h-[65vh] flex items-end bg-[#080E1C] pb-16 pt-40 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1920&q=80"
            alt="Team collaboration"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080E1C] via-[#080E1C]/85 to-transparent" />
        </div>
        <div className="absolute inset-0 z-0 hero-grid opacity-40" />
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0} className="mb-4 flex items-center gap-3">
            <span className="w-6 h-px bg-[#00C4D4]" />
            <span className="text-[#00C4D4] text-xs font-semibold tracking-[0.2em] uppercase">{t("À propos", "About us")}</span>
          </motion.div>
          <motion.h1 initial="hidden" animate="visible" variants={fadeUp} custom={1}
            className="font-display text-5xl md:text-7xl text-white leading-tight max-w-3xl">
            {t("Au croisement de la stratégie et de l'exécution.", "At the intersection of strategy and execution.")}
          </motion.h1>
          <motion.p initial="hidden" animate="visible" variants={fadeUp} custom={2}
            className="mt-8 text-white/55 text-lg max-w-2xl leading-relaxed">
            {t(
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
                <span className="text-[#00C4D4] text-xs font-semibold tracking-[0.2em] uppercase">{t("Mission", "Mission")}</span>
                <span className="flex-1 h-px bg-border max-w-12" />
              </div>
              <h2 className="font-display text-4xl md:text-5xl text-[#080E1C] mb-8 leading-tight">
                {t("Notre raison d'être", "Our reason for being")}
              </h2>
              <div className="space-y-5 text-muted-foreground leading-relaxed">
                <p>{t(
                  "Concevoir, structurer et faire avancer des initiatives à fort impact entre le Canada, l'Afrique et leurs partenaires.",
                  "Design, structure and advance high-impact initiatives between Canada, Africa and their partners."
                )}</p>
                <p>{t(
                  "Atlas est une plateforme de conseil et d'assistance à la mise en œuvre, capable d'intervenir à l'intersection du développement économique, de la transformation numérique, des compétences, du climat, de l'éducation résiliente, des partenariats transatlantiques et du pilotage de projets.",
                  "Atlas is an advisory and implementation support platform, capable of operating at the intersection of economic development, digital transformation, skills, climate, resilient education, transatlantic partnerships and project management."
                )}</p>
              </div>
            </div>
            {/* Photo */}
            <div className="relative">
              <div className="rounded-2xl overflow-hidden h-96 lg:h-[500px]">
                <img
                  src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&w=1200&q=80"
                  alt="Strategy session"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-5 -left-5 bg-[#080E1C] text-white rounded-2xl p-5 shadow-xl hidden md:block">
                <div className="font-display text-3xl text-[#00C4D4] mb-1">10+</div>
                <div className="text-xs text-white/60 font-medium uppercase tracking-wider">{t("Années d'expérience", "Years of experience")}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY ATLAS NAME panel ── */}
      <section className="py-24 md:py-32 bg-[#F7F8FA]">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            {/* Photo */}
            <div className="relative order-2 lg:order-1">
              <div className="rounded-2xl overflow-hidden h-80 lg:h-[420px]">
                <img
                  src="https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&q=80"
                  alt="Africa skyline"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080E1C]/60 to-transparent" />
              </div>
            </div>
            {/* Why Atlas */}
            <div className="order-1 lg:order-2">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-[#00C4D4] text-xs font-semibold tracking-[0.2em] uppercase">{t("Identité", "Identity")}</span>
                <span className="flex-1 h-px bg-border max-w-12" />
              </div>
              <h2 className="font-display text-4xl md:text-5xl text-[#080E1C] mb-8 leading-tight">
                {t("Pourquoi « Atlas » ?", "Why « Atlas »?")}
              </h2>
              <div className="space-y-7">
                {atlasMeanings.map((item, i) => (
                  <div key={i} className="flex gap-5">
                    <div className="w-9 h-9 rounded-full bg-[#00C4D4]/15 border border-[#00C4D4]/30 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-[#00C4D4] text-xs font-bold">{i + 1}</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-[#080E1C] mb-1.5">{item.label}</h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
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
              <span className="text-[#00C4D4] text-xs font-semibold tracking-[0.2em] uppercase">{t("Approche", "Approach")}</span>
              <span className="flex-1 h-px bg-border max-w-12" />
            </div>
            <h2 className="font-display text-4xl md:text-5xl text-[#080E1C] leading-tight">
              {t("Notre approche : écouter, cadrer, structurer, piloter", "Our approach: listen, frame, structure, steer")}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              { step: "01", title: t("Écouter", "Listen"), desc: t("Comprendre le contexte, les besoins et les contraintes du client.", "Understand the context, needs and constraints of the client."), img: "https://images.unsplash.com/photo-1434626881859-194d67b2b86f?auto=format&fit=crop&w=600&q=80" },
              { step: "02", title: t("Cadrer", "Frame"), desc: t("Définir la stratégie, le cadre logique et les outils de mise en œuvre.", "Define the strategy, logical framework and implementation tools."), img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80" },
              { step: "03", title: t("Structurer", "Structure"), desc: t("Pilotage opérationnel, gestion des parties prenantes, suivi de la performance.", "Operational steering, stakeholder management, performance monitoring."), img: "https://images.unsplash.com/photo-1531973576160-7125cd663d86?auto=format&fit=crop&w=600&q=80" },
              { step: "04", title: t("Piloter", "Steer"), desc: t("Assurer l'exécution, transférer les compétences et capitaliser les apprentissages.", "Ensure execution, transfer skills and capitalize on learnings."), img: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&q=80" },
            ].map((step, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }}
                className="group border border-border hover:border-[#00C4D4]/40 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300">
                <div className="relative h-40 overflow-hidden">
                  <img src={step.img} alt={step.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-[#080E1C]/60" />
                  <div className="absolute top-4 left-5 font-display text-4xl text-white/20">{step.step}</div>
                  <div className="absolute bottom-4 left-5 font-bold text-white text-lg">{step.title}</div>
                </div>
                <div className="p-6 bg-white">
                  <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section className="py-24 md:py-32 bg-[#080E1C] text-white relative overflow-hidden">
        <div className="absolute inset-0 hero-grid opacity-40" />
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=1920&q=80"
            alt="Values"
            className="w-full h-full object-cover opacity-8"
          />
          <div className="absolute inset-0 bg-[#080E1C]/90" />
        </div>
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-xl mb-14">
            <div className="flex items-center gap-3 mb-5">
              <span className="text-[#00C4D4] text-xs font-semibold tracking-[0.2em] uppercase">{t("Valeurs", "Values")}</span>
              <span className="flex-1 h-px bg-white/15 max-w-12" />
            </div>
            <h2 className="font-display text-4xl md:text-5xl leading-tight">{t("Ce qui nous guide", "What guides us")}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {values.map((v, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.5 }}
                className="border border-white/10 rounded-2xl p-8 hover:border-[#00C4D4]/30 hover:bg-white/3 transition-all duration-300">
                <div className="font-display text-4xl text-[#00C4D4]/30 mb-4 leading-none">{v.num}</div>
                <h3 className="font-bold text-white text-lg mb-3">{v.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-white border-t border-border">
        <div className="container mx-auto px-6 lg:px-8 text-center">
          <h2 className="font-display text-4xl md:text-5xl text-[#080E1C] mb-6">{t("Prêt à construire ensemble ?", "Ready to build together?")}</h2>
          <Link href="/contact"
            className="inline-flex items-center gap-2 bg-[#00C4D4] hover:bg-[#00b0bf] text-white font-semibold px-8 py-4 rounded-full text-sm transition-all duration-200 shadow-lg shadow-[#00C4D4]/25 hover:-translate-y-0.5">
            {t("Nous contacter", "Contact us")}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

    </div>
  );
}
