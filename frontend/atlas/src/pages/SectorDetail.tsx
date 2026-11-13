import { useEffect, useState } from "react";
import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Globe, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { useSiteContent } from "@/hooks/use-site-content";

const DEFAULT_CORRIDOR_IMAGES = [
  "https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80",
];

interface Sector {
  id: number;
  slug: string;
  titleFr: string;
  titleEn: string;
  descriptionFr: string;
  descriptionEn: string;
  icon: string;
  corridor: string;
  countries: string[];
  highlights: string[];
  imageUrl: string | null;
}

export default function SectorDetail() {
  const { id } = useParams<{ id: string }>();
  const { lang, t } = useLanguage();
  const { getSetting, getJson } = useSiteContent();
  const [sector, setSector] = useState<Sector | null>(null);
  const [loading, setLoading] = useState(true);

  const dark = getSetting("theme.colorDark", "var(--color-atlas-dark)");
  const primary = "var(--color-atlas-primary)";

  useEffect(() => {
    fetch(`/api/sectors/${id}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => setSector(data))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <div className="py-24 text-center text-gray-500">Loading...</div>;
  }

  if (!sector) {
    return (
      <div className="py-24 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Sector not found</h1>
        <Link href="/sectors" className={`text-[var(--color-atlas-primary)] hover:underline`}>
          Back to sectors
        </Link>
      </div>
    );
  }

  const title = t(sector.titleFr, sector.titleEn);
  const description = t(sector.descriptionFr, sector.descriptionEn);
  const corridorImages = getJson<string[]>("sectors.corridor.images.json", DEFAULT_CORRIDOR_IMAGES);
  const heroImage = sector.imageUrl || corridorImages[sector.id % corridorImages.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen"
    >
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[320px] flex items-end overflow-hidden">
        <img src={heroImage} alt={title} className="absolute inset-0 w-full h-full object-cover" />
        <div className={`absolute inset-0 bg-gradient-to-t from-[var(--color-atlas-dark)]/90 via-[var(--color-atlas-dark)]/50 to-transparent`} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
          <Link href="/sectors" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4">
            <ArrowLeft className="w-4 h-4" />
            {t("Retour aux secteurs", "Back to sectors")}
          </Link>
          <span className={`inline-block px-3 py-1 bg-[var(--color-atlas-primary)] text-[var(--color-atlas-dark)] text-xs font-bold rounded-full mb-4 uppercase tracking-wide`}>
            {sector.corridor}
          </span>
          <h1 className="text-3xl md:text-5xl font-bold text-white font-display max-w-4xl">{title}</h1>
        </div>
      </section>

      {/* Meta */}
      <section className={`bg-[var(--color-atlas-light)] py-8 border-b border-[var(--color-atlas-primary)]/20`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center gap-3">
              <Globe className={`w-5 h-5 text-[var(--color-atlas-primary)]`} />
              <div>
                <p className="text-xs text-gray-500 uppercase">{t("Corridor", "Corridor")}</p>
                <p className={`font-semibold text-[var(--color-atlas-dark)]`}>{sector.corridor}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className={`w-5 h-5 text-[var(--color-atlas-primary)]`} />
              <div>
                <p className="text-xs text-gray-500 uppercase">{t("Pays", "Countries")}</p>
                <p className={`font-semibold text-[var(--color-atlas-dark)]`}>{sector.countries.join(", ")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div>
            <h2 className={`text-2xl font-bold text-[var(--color-atlas-dark)] mb-4`}>{t("Présentation", "Overview")}</h2>
            <p className="text-gray-700 leading-relaxed">{description}</p>
          </div>
          {sector.highlights && sector.highlights.length > 0 && (
            <div className={`bg-[var(--color-atlas-light)] p-8 rounded-2xl border-l-4 border-[var(--color-atlas-primary)]`}>
              <h2 className={`text-2xl font-bold text-[var(--color-atlas-dark)] mb-6`}>{t("Axes prioritaires", "Priority areas")}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {sector.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className={`w-5 h-5 mt-0.5 shrink-0 text-[var(--color-atlas-primary)]`} />
                    <span className="text-gray-700">{h}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="flex justify-center">
            <Link
              href="/contact"
              className={`inline-flex items-center gap-2 bg-[var(--color-atlas-primary)] hover:bg-[var(--color-atlas-primary-hover)] text-[var(--color-atlas-dark)] font-semibold px-8 py-4 rounded-lg transition-colors`}
            >
              {t("Explorer ce corridor", "Explore this corridor")}
            </Link>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
