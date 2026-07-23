import { useEffect, useState } from "react";
import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { useSiteContent } from "@/hooks/use-site-content";

interface Insight {
  id: number;
  titleFr: string;
  titleEn: string;
  summaryFr: string;
  summaryEn: string;
  bodyFr: string;
  bodyEn: string;
  category: string;
  imageUrl: string | null;
  publishedAt: string;
}

export default function InsightDetail() {
  const { id } = useParams<{ id: string }>();
  const { lang, t } = useLanguage();
  const { getSetting } = useSiteContent();
  const [insight, setInsight] = useState<Insight | null>(null);
  const [loading, setLoading] = useState(true);

  const dark = getSetting("theme.colorDark", "var(--color-atlas-dark)");
  const primary = "var(--color-atlas-primary)";

  useEffect(() => {
    fetch(`/api/insights/${id}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => setInsight(data))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="py-24 text-center text-gray-500">Loading...</div>;
  if (!insight) {
    return (
      <div className="py-24 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Insight not found</h1>
        <Link href="/insights" className={`text-[var(--color-atlas-primary)] hover:underline`}>
          Back to insights
        </Link>
      </div>
    );
  }

  const title = t(insight.titleFr, insight.titleEn);
  const summary = t(insight.summaryFr, insight.summaryEn);
  const body = t(insight.bodyFr, insight.bodyEn);
  const published = new Date(insight.publishedAt).toLocaleDateString(lang === "fr" ? "fr-FR" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-white"
    >
      <section className="relative h-[45vh] min-h-[300px] flex items-end overflow-hidden">
        {insight.imageUrl ? (
          <>
            <img src={insight.imageUrl} alt={title} className="absolute inset-0 w-full h-full object-cover" />
            <div className={`absolute inset-0 bg-gradient-to-t from-[var(--color-atlas-dark)]/90 via-[var(--color-atlas-dark)]/60 to-transparent`} />
          </>
        ) : (
          <div className={`absolute inset-0 bg-[var(--color-atlas-dark)]`} />
        )}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
          <Link href="/insights" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4">
            <ArrowLeft className="w-4 h-4" />
            {t("Retour aux perspectives", "Back to insights")}
          </Link>
          <span className={`inline-block px-3 py-1 bg-[var(--color-atlas-primary)] text-[var(--color-atlas-dark)] text-xs font-bold rounded-full mb-4 uppercase tracking-wide`}>
            {insight.category}
          </span>
          <h1 className="text-3xl md:text-5xl font-bold text-white font-display">{title}</h1>
          <div className="flex items-center gap-2 mt-4 text-white/80">
            <Calendar className="w-4 h-4" />
            <span className="text-sm">{published}</span>
          </div>
        </div>
      </section>

      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {summary && <p className="text-xl text-gray-600 leading-relaxed mb-10">{summary}</p>}
        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed whitespace-pre-line">
          {body}
        </div>
      </section>
    </motion.article>
  );
}
