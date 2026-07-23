import { useEffect, useState } from "react";
import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { useSiteContent } from "@/hooks/use-site-content";

interface Service {
  id: number;
  slug: string;
  titleFr: string;
  titleEn: string;
  taglineFr: string;
  taglineEn: string;
  descriptionFr: string;
  descriptionEn: string;
  icon: string;
  color: string;
  deliverablesFr: string[];
  deliverablesEn: string[];
  mandateExamplesFr: string[];
  mandateExamplesEn: string[];
}

export default function ServiceDetail() {
  const { id } = useParams<{ id: string }>();
  const { lang, t } = useLanguage();
  const { getSetting } = useSiteContent();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);

  const dark = getSetting("theme.colorDark", "var(--color-atlas-dark)");
  const primary = "var(--color-atlas-primary)";
  const primaryHover = "var(--color-atlas-primary-hover)";

  useEffect(() => {
    fetch(`/api/services/${id}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => setService(data))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="py-24 text-center text-gray-500">Loading...</div>;
  if (!service) {
    return (
      <div className="py-24 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Service not found</h1>
        <Link href="/services" className={`text-[var(--color-atlas-primary)] hover:underline`}>
          Back to services
        </Link>
      </div>
    );
  }

  const title = t(service.titleFr, service.titleEn);
  const tagline = t(service.taglineFr, service.taglineEn);
  const description = t(service.descriptionFr, service.descriptionEn);
  const deliverables = lang === "fr" ? service.deliverablesFr : service.deliverablesEn;
  const mandates = lang === "fr" ? service.mandateExamplesFr : service.mandateExamplesEn;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-white"
    >
      <section className="relative py-20 overflow-hidden" style={{ backgroundColor: service.color || dark }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link href="/services" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6">
            <ArrowLeft className="w-4 h-4" />
            {t("Retour aux services", "Back to services")}
          </Link>
          <div className="text-5xl mb-4">{service.icon}</div>
          <h1 className="text-3xl md:text-5xl font-bold text-white font-display">{title}</h1>
          {tagline && <p className="mt-4 text-xl text-white/90">{tagline}</p>}
        </div>
      </section>

      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-lg text-gray-700 leading-relaxed mb-12">{description}</p>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className={`text-2xl font-bold text-[var(--color-atlas-dark)] mb-6`}>{t("Livrables", "Deliverables")}</h2>
            <ul className="space-y-3">
              {deliverables.map((d, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className={`mt-1.5 w-2 h-2 rounded-full bg-[var(--color-atlas-primary)] shrink-0`} />
                  <span className="text-gray-700">{d}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className={`text-2xl font-bold text-[var(--color-atlas-dark)] mb-6`}>{t("Exemples de mandats", "Mandate examples")}</h2>
            <ul className="space-y-3">
              {mandates.map((m, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className={`mt-1.5 w-2 h-2 rounded-full bg-[var(--color-atlas-primary)] shrink-0`} />
                  <span className="text-gray-700">{m}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 text-center">
          <Link
            href="/contact"
            className={`inline-flex items-center gap-2 bg-[var(--color-atlas-primary)] hover:bg-[var(--color-atlas-primary-hover)] text-[var(--color-atlas-dark)] font-semibold px-8 py-4 rounded-lg transition-colors`}
          >
            {t("Discuter de ce service", "Discuss this service")}
          </Link>
        </div>
      </section>
    </motion.div>
  );
}
