import { useEffect, useState } from "react";
import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Calendar, DollarSign, Building2 } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { useSiteContent } from "@/hooks/use-site-content";

interface Project {
  id: number;
  titleFr: string;
  titleEn: string;
  taglineFr: string;
  taglineEn: string;
  challengeFr: string;
  challengeEn: string;
  approachFr: string;
  approachEn: string;
  scopeFr: string;
  scopeEn: string;
  resultFr: string;
  resultEn: string;
  countries: string[];
  duration: string;
  budget: string;
  funder: string;
  category: string;
  featured: boolean;
  imageUrl: string | null;
  ctaLabelFr: string | null;
  ctaLabelEn: string | null;
}

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const { lang, t } = useLanguage();
  const { getSetting } = useSiteContent();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  const dark = getSetting("theme.colorDark", "var(--color-atlas-dark)");
  const primary = "var(--color-atlas-primary)";
  const primaryHover = "var(--color-atlas-primary-hover)";
  const light = "var(--color-atlas-light)";

  useEffect(() => {
    fetch(`/api/projects/${id}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => setProject(data))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <div className="py-24 text-center text-gray-500">Loading...</div>;
  }

  if (!project) {
    return (
      <div className="py-24 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Project not found</h1>
        <Link href="/projects" className={`text-[var(--color-atlas-primary)] hover:underline`}>
          Back to projects
        </Link>
      </div>
    );
  }

  const title = t(project.titleFr, project.titleEn);
  const tagline = t(project.taglineFr, project.taglineEn);
  const challenge = t(project.challengeFr, project.challengeEn);
  const approach = t(project.approachFr, project.approachEn);
  const scope = t(project.scopeFr, project.scopeEn);
  const result = t(project.resultFr, project.resultEn);
  const ctaLabel = t(project.ctaLabelFr, project.ctaLabelEn) || t("En savoir plus", "Learn more");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen"
    >
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[320px] flex items-end overflow-hidden">
        {project.imageUrl ? (
          <>
            <img src={project.imageUrl} alt={title} className="absolute inset-0 w-full h-full object-cover" />
            <div className={`absolute inset-0 bg-gradient-to-t from-[var(--color-atlas-dark)]/90 via-[var(--color-atlas-dark)]/50 to-transparent`} />
          </>
        ) : (
          <div className={`absolute inset-0 bg-[var(--color-atlas-dark)]`} />
        )}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
          <Link href="/projects" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4">
            <ArrowLeft className="w-4 h-4" />
            {t("Retour aux projets", "Back to projects")}
          </Link>
          <span className={`inline-block px-3 py-1 bg-[var(--color-atlas-primary)] text-[var(--color-atlas-dark)] text-xs font-bold rounded-full mb-4 uppercase tracking-wide`}>
            {project.category}
          </span>
          <h1 className="text-3xl md:text-5xl font-bold text-white font-display max-w-4xl">{title}</h1>
          {tagline && <p className="mt-4 text-xl text-white/90 max-w-3xl">{tagline}</p>}
        </div>
      </section>

      {/* Meta */}
      <section className={`bg-[var(--color-atlas-light)] py-8 border-b border-[var(--color-atlas-primary)]/20`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <MapPin className={`w-5 h-5 text-[var(--color-atlas-primary)]`} />
              <div>
                <p className="text-xs text-gray-500 uppercase">{t("Pays", "Countries")}</p>
                <p className={`font-semibold text-[var(--color-atlas-dark)]`}>{project.countries.join(", ")}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className={`w-5 h-5 text-[var(--color-atlas-primary)]`} />
              <div>
                <p className="text-xs text-gray-500 uppercase">{t("Durée", "Duration")}</p>
                <p className={`font-semibold text-[var(--color-atlas-dark)]`}>{project.duration}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <DollarSign className={`w-5 h-5 text-[var(--color-atlas-primary)]`} />
              <div>
                <p className="text-xs text-gray-500 uppercase">{t("Budget", "Budget")}</p>
                <p className={`font-semibold text-[var(--color-atlas-dark)]`}>{project.budget}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Building2 className={`w-5 h-5 text-[var(--color-atlas-primary)]`} />
              <div>
                <p className="text-xs text-gray-500 uppercase">{t("Financeur", "Funder")}</p>
                <p className={`font-semibold text-[var(--color-atlas-dark)]`}>{project.funder}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div>
            <h2 className={`text-2xl font-bold text-[var(--color-atlas-dark)] mb-4`}>{t("Le défi", "The challenge")}</h2>
            <p className="text-gray-700 leading-relaxed">{challenge}</p>
          </div>
          <div>
            <h2 className={`text-2xl font-bold text-[var(--color-atlas-dark)] mb-4`}>{t("Notre approche", "Our approach")}</h2>
            <p className="text-gray-700 leading-relaxed">{approach}</p>
          </div>
          <div>
            <h2 className={`text-2xl font-bold text-[var(--color-atlas-dark)] mb-4`}>{t("Périmètre", "Scope")}</h2>
            <p className="text-gray-700 leading-relaxed">{scope}</p>
          </div>
          <div className={`bg-[var(--color-atlas-light)] p-8 rounded-2xl border-l-4 border-[var(--color-atlas-primary)]`}>
            <h2 className={`text-2xl font-bold text-[var(--color-atlas-dark)] mb-4`}>{t("Résultat", "Result")}</h2>
            <p className="text-gray-700 leading-relaxed">{result}</p>
          </div>
          <div className="flex justify-center">
            <Link
              href="/contact"
              className={`inline-flex items-center gap-2 bg-[var(--color-atlas-primary)] hover:bg-[var(--color-atlas-primary-hover)] text-[var(--color-atlas-dark)] font-semibold px-8 py-4 rounded-lg transition-colors`}
            >
              {ctaLabel}
            </Link>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
