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
    {
      num: "01",
      title: t("Rigueur analytique", "Analytical rigor"),
      desc: t(
        "Chaque diagnostic, chaque recommandation repose sur une analyse approfondie du contexte institutionnel, politique et économique.",
        "Every diagnosis and recommendation rests on a thorough analysis of the institutional, political and economic context."
      ),
    },
    {
      num: "02",
      title: t("Exécution centrée résultats", "Results-centered execution"),
      desc: t(
        "Nous croyons que la stratégie sans mise en œuvre reste une intention. Atlas accompagne jusqu'à la ligne d'arrivée.",
        "We believe strategy without implementation remains an intention. Atlas accompanies you to the finish line."
      ),
    },
    {
      num: "03",
      title: t("Intégrité & Transparence", "Integrity & Transparency"),
      desc: t(
        "Nos mandats sont conduits avec éthique, clarté et responsabilité envers les parties prenantes.",
        "Our mandates are conducted with ethics, clarity and accountability towards all stakeholders."
      ),
    },
    {
      num: "04",
      title: t("Ancrage local, vision globale", "Local roots, global vision"),
      desc: t(
        "Compréhension des réalités de terrain combinée à une expertise des marchés et standards internationaux.",
        "Understanding of on-the-ground realities combined with expertise in international markets and standards."
      ),
    },
  ];

  const atlasMeanings = [
    {
      label: t("Soutenir", "Support"),
      desc: t("Comme le Titan, nous portons le poids des défis complexes de nos clients.", "Like the Titan, we carry the weight of our clients' complex challenges."),
    },
    {
      label: t("Orienter", "Guide"),
      desc: t("La cartographie précise des enjeux mondiaux pour une navigation sûre.", "Precise mapping of global issues for safe navigation."),
    },
    {
      label: t("Relier", "Connect"),
      desc: t("Tisser des liens durables entre institutions, territoires et partenaires.", "Weaving lasting links between institutions, territories and partners."),
    },
  ];

  return (
    <div className="w-full">

      {/* ── HERO ── */}
      <section className="relative min-h-[60vh] flex items-end bg-[#080E1C] pb-16 pt-40 overflow-hidden">
        <div className="absolute inset-0 hero-grid opacity-50" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_80%_20%,rgba(0,196,212,0.1),transparent)]" />
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0} className="mb-4 flex items-center gap-3">
            <span className="w-6 h-px bg-[#00C4D4]" />
            <span className="text-[#00C4D4] text-xs font-semibold tracking-[0.2em] uppercase">{t("À propos", "About us")}</span>
          </motion.div>
          <motion.h1
            initial="hidden" animate="visible" variants={fadeUp} custom={1}
            className="font-display text-5xl md:text-7xl text-white leading-tight max-w-3xl"
          >
            {t("Au croisement de la stratégie et de l'exécution.", "At the intersection of strategy and execution.")}
          </motion.h1>
          <motion.p
            initial="hidden" animate="visible" variants={fadeUp} custom={2}
            className="mt-8 text-white/55 text-lg max-w-2xl leading-relaxed"
          >
            {t(
              "Atlas Global Resilience Corp. est une firme internationale de conseil stratégique qui bâtit des ponts solides entre le Canada, l'Afrique et leurs partenaires transatlantiques.",
              "Atlas Global Resilience Corp. is an international strategic advisory firm building strong bridges between Canada, Africa and their transatlantic partners."
            )}
          </motion.p>
        </div>
      </section>

      {/* ── MISSION ── */}
      <section className="py-28 md:py-36 bg-white">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-[#00C4D4] text-xs font-semibold tracking-[0.2em] uppercase">{t("Mission", "Mission")}</span>
                <span className="flex-1 h-px bg-border max-w-12" />
              </div>
              <h2 className="font-display text-4xl md:text-5xl text-[#080E1C] mb-8 leading-tight">
                {t("Notre raison d'être", "Our reason for being")}
              </h2>
              <div className="space-y-5 text-muted-foreground leading-relaxed">
                <p>
                  {t(
                    "Accélérer le développement institutionnel et économique en concevant, structurant et accompagnant la mise en œuvre de projets complexes et innovants.",
                    "Accelerate institutional and economic development by designing, structuring, and supporting the implementation of complex and innovative projects."
                  )}
                </p>
                <p>
                  {t(
                    "Nous croyons fermement que les meilleures stratégies échouent sans une exécution impeccable. C'est pourquoi Atlas s'engage non seulement à concevoir la feuille de route, mais à piloter le navire vers sa destination.",
                    "We firmly believe that the best strategies fail without flawless execution. That is why Atlas commits not just to designing the roadmap, but to steering the ship to its destination."
                  )}
                </p>
                <p>
                  {t(
                    "Fondée sur des décennies d'expérience accumulées entre le Canada et l'Afrique, notre firme apporte une compréhension intime des réalités institutionnelles, politiques et économiques qui façonnent chaque projet.",
                    "Founded on decades of accumulated experience between Canada and Africa, our firm brings an intimate understanding of the institutional, political and economic realities that shape every project."
                  )}
                </p>
              </div>
            </div>

            {/* Why Atlas panel */}
            <div className="bg-[#080E1C] rounded-3xl p-10 text-white">
              <h3 className="font-display text-3xl mb-8 text-white">{t("Pourquoi « Atlas » ?", "Why « Atlas »?")}</h3>
              <div className="space-y-8">
                {atlasMeanings.map((item, i) => (
                  <div key={i} className="flex gap-5">
                    <div className="w-8 h-8 rounded-full bg-[#00C4D4]/20 border border-[#00C4D4]/30 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-[#00C4D4] text-xs font-bold">{i + 1}</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">{item.label}</h4>
                      <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── APPROACH ── */}
      <section className="py-28 md:py-36 bg-[#F7F8FA]">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-xl mb-16">
            <div className="flex items-center gap-3 mb-5">
              <span className="text-[#00C4D4] text-xs font-semibold tracking-[0.2em] uppercase">{t("Approche", "Approach")}</span>
              <span className="flex-1 h-px bg-border max-w-12" />
            </div>
            <h2 className="font-display text-4xl md:text-5xl text-[#080E1C] leading-tight">
              {t("Notre méthode en 4 étapes", "Our 4-step method")}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              {
                step: "01",
                title: t("Diagnostic", "Diagnosis"),
                desc: t("Analyse contextuelle, cartographie des enjeux, identification des leviers d'action.", "Contextual analysis, stakeholder mapping, identification of action levers."),
              },
              {
                step: "02",
                title: t("Conception", "Design"),
                desc: t("Élaboration de la stratégie, du cadre logique et des outils de mise en œuvre.", "Developing the strategy, logical framework and implementation tools."),
              },
              {
                step: "03",
                title: t("Exécution", "Execution"),
                desc: t("Pilotage opérationnel, gestion des parties prenantes, suivi de la performance.", "Operational steering, stakeholder management, performance monitoring."),
              },
              {
                step: "04",
                title: t("Impact & Capitalisation", "Impact & Learning"),
                desc: t("Évaluation de l'impact, documentation des apprentissages, valorisation des résultats.", "Impact assessment, learning documentation, result dissemination."),
              },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="bg-white rounded-2xl p-8 border border-border hover:border-[#00C4D4]/40 hover:shadow-lg hover:shadow-black/5 transition-all duration-300"
              >
                <div className="font-display text-5xl text-[#F0F1F5] mb-6 leading-none">{step.step}</div>
                <h3 className="font-bold text-[#080E1C] text-xl mb-3">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section className="py-28 md:py-36 bg-[#080E1C] text-white relative overflow-hidden">
        <div className="absolute inset-0 hero-grid opacity-40" />
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-xl mb-16">
            <div className="flex items-center gap-3 mb-5">
              <span className="text-[#00C4D4] text-xs font-semibold tracking-[0.2em] uppercase">{t("Valeurs", "Values")}</span>
              <span className="flex-1 h-px bg-white/15 max-w-12" />
            </div>
            <h2 className="font-display text-4xl md:text-5xl leading-tight">{t("Ce qui nous guide", "What guides us")}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {values.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="border border-white/10 rounded-2xl p-8 hover:border-[#00C4D4]/30 hover:bg-white/3 transition-all duration-300"
              >
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
          <h2 className="font-display text-4xl md:text-5xl text-[#080E1C] mb-6">
            {t("Prêt à construire ensemble ?", "Ready to build together?")}
          </h2>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#00C4D4] hover:bg-[#00b0bf] text-white font-semibold px-8 py-4 rounded-full text-sm transition-all duration-200 shadow-lg shadow-[#00C4D4]/25 hover:-translate-y-0.5"
          >
            {t("Nous contacter", "Contact us")}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

    </div>
  );
}
