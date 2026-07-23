import { useLanguage } from "@/hooks/use-language";
import { useSiteContent } from "@/hooks/use-site-content";
import { useState } from "react";
import { useSubmitContact } from "@workspace/api-client-react";
import { ArrowRight, Mail, MapPin, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

const NEED_TYPES = (t: (fr: string, en: string) => string) => [
  { value: "strategic_advisory", label: t("Conseil stratégique", "Strategic advisory") },
  { value: "project_management", label: t("Gestion de projet", "Project management") },
  { value: "digital_transformation", label: t("Transformation numérique", "Digital transformation") },
  { value: "green_finance", label: t("Finance verte", "Green finance") },
  { value: "governance", label: t("Gouvernance", "Governance") },
  { value: "other", label: t("Autre", "Other") },
];

export default function Contact() {
  const { t, lang } = useLanguage();
  const { getText, getSetting, getJson } = useSiteContent();
  const mutation = useSubmitContact();
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "", organization: "", email: "", country: "", needType: "", subject: "", message: "",
  });

  const primary = "var(--color-atlas-primary)";
  const primaryHover = "var(--color-atlas-primary-hover)";
  const dark = "var(--color-atlas-dark)";

  const heroImage = getSetting("contact.hero.image", "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1920&q=80");
  const sidebarImage = getSetting("contact.sidebar.image", "https://images.unsplash.com/photo-1573492420057-29b4a2657440?auto=format&fit=crop&w=600&q=80");
  const contactInfo = getJson("contact.info.json", [
    { icon: "Mail", labelFr: "Email", labelEn: "Email", value: "contact@atlas-grc.com" },
    { icon: "MapPin", labelFr: "Présence", labelEn: "Presence", valueFr: "Canada · Afrique · International", valueEn: "Canada · Africa · International" },
    { icon: "Clock", labelFr: "Délai de réponse", labelEn: "Response time", valueFr: "Sous 48 heures ouvrables", valueEn: "Within 48 business hours" },
  ]);

  const iconMap: Record<string, React.ElementType> = { Mail, MapPin, Clock };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await mutation.mutateAsync({ data: { ...form, lang } });
      setSubmitted(true);
    } catch {
      setError(t("Erreur lors de l'envoi. Veuillez réessayer.", "Error sending. Please try again."));
    }
  };

  return (
    <div className="w-full min-h-screen">
      <div className={`relative h-48 md:h-56 bg-[var(--color-atlas-dark)] overflow-hidden`}>
        <img src={heroImage}
          alt={getText("contact.hero.imageAlt", "Contact Atlas", "Contact Atlas")} className="w-full h-full object-cover opacity-25" />
        <div className={`absolute inset-0 bg-gradient-to-b from-transparent to-[var(--color-atlas-dark)]/80`} />
        <div className="absolute inset-0 hero-grid opacity-40" />
        <div className="absolute bottom-8 left-0 right-0 container mx-auto px-6 lg:px-8 pt-20">
          <div className="flex items-center gap-3 mb-3">
            <span className={`w-6 h-px bg-[var(--color-atlas-primary)]`} />
            <span className={`text-[var(--color-atlas-primary)] text-xs font-semibold tracking-[0.2em] uppercase`}>{getText("contact.hero.overline", "Contact", "Contact")}</span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl text-white">{getText("contact.hero.title", "Discutons.", "Let's talk.")}</h1>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row min-h-[80vh]">
        <div className={`w-full lg:w-96 xl:w-[440px] bg-[var(--color-atlas-dark)] text-white px-6 lg:px-10 py-10 lg:py-16 flex flex-col shrink-0`}>
          <div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-3xl xl:text-4xl mb-3 leading-tight">
              {getText("contact.sidebar.title", "Discutons de votre initiative.", "Discuss your initiative.")}
            </h2>
            <p className="text-white/50 text-sm leading-relaxed mb-10">
              {getText("contact.sidebar.intro",
                "Que vous ayez un projet en développement ou que vous cherchiez un partenaire stratégique, Atlas est là pour vous accompagner.",
                "Whether you have a project in development or are looking for a strategic partner, Atlas is here to support you."
              )}
            </p>

            <div className="space-y-6 mb-10">
              {contactInfo.map((item, i) => {
                const Icon = iconMap[item.icon] || Mail;
                const label = lang === "fr" ? item.labelFr : item.labelEn;
                const value = lang === "fr" ? (item.valueFr ?? item.value) : (item.valueEn ?? item.value);
                return (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-9 h-9 rounded-lg bg-white/8 border border-white/10 flex items-center justify-center shrink-0">
                      <Icon className={`w-4 h-4 text-[var(--color-atlas-primary)]`} />
                    </div>
                    <div>
                      <p className="text-white/40 text-xs font-semibold uppercase tracking-wider mb-0.5">{label}</p>
                      <p className="text-white text-sm font-medium">{value}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-5">
              <div className="flex items-center gap-2.5 mb-2">
                <CheckCircle2 className={`w-4 h-4 text-[var(--color-atlas-primary)] shrink-0`} />
                <span className="text-sm font-bold text-white">{getText("contact.commitment.title", "Notre engagement", "Our commitment")}</span>
              </div>
              <p className="text-white/45 text-xs leading-relaxed">
                {getText("contact.commitment.body",
                  "Chaque demande est traitée personnellement par notre équipe. Pas de réponse automatique — un dialogue humain, centré sur votre réalité.",
                  "Every request is handled personally by our team. No automated replies — a human dialogue, focused on your reality."
                )}
              </p>
            </div>
          </div>

          <div className="mt-10 rounded-xl overflow-hidden h-44 relative hidden lg:block">
            <img src={sidebarImage}
              alt={getText("contact.sidebar.imageAlt", "Contact", "Contact")} className="w-full h-full object-cover" />
            <div className={`absolute inset-0 bg-gradient-to-t from-[var(--color-atlas-dark)]/80 to-transparent`} />
          </div>
        </div>

        {/* ── FORM ── */}
        <div className="flex-1 bg-white px-6 lg:px-12 xl:px-16 py-10 lg:py-16">
          {submitted ? (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="h-full flex flex-col items-center justify-center text-center py-20">
              <div className={`w-16 h-16 rounded-full bg-[var(--color-atlas-primary)]/15 flex items-center justify-center mb-6`}>
                <CheckCircle2 className={`w-8 h-8 text-[var(--color-atlas-primary)]`} />
              </div>
              <h3 className={`font-display text-3xl text-[var(--color-atlas-dark)] mb-4`}>
                {getText("contact.success.title", "Message envoyé !", "Message sent!")}
              </h3>
              <p className="text-muted-foreground max-w-sm leading-relaxed mb-8">
                {getText("contact.success.body",
                  "Merci pour votre message. Notre équipe reviendra vers vous dans les 48 heures ouvrables.",
                  "Thank you for your message. Our team will get back to you within 48 business hours."
                )}
              </p>
              <button onClick={() => setSubmitted(false)}
                className={`text-sm text-[var(--color-atlas-primary)] font-semibold hover:underline`}>
                {getText("contact.success.reset", "Envoyer un autre message", "Send another message")}
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-2xl">
              <h3 className={`font-display text-2xl md:text-3xl text-[var(--color-atlas-dark)] mb-2`}>
                {getText("contact.form.title", "Formulaire de contact", "Contact form")}
              </h3>
              <p className="text-muted-foreground text-sm mb-10">{getText("contact.form.required", "Tous les champs sont requis.", "All fields are required.")}</p>

              {error && (
                <div className="flex items-center gap-2.5 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 mb-6 text-sm">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">{getText("contact.form.name", "Nom complet", "Full name")}</label>
                  <input name="name" value={form.name} onChange={handleChange} required
                    placeholder="Jean Dupont"
                    className={`w-full px-4 py-3 border border-border rounded-xl text-sm text-[var(--color-atlas-dark)] placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-[var(--color-atlas-primary)]/30 focus:border-[var(--color-atlas-primary)] transition-all`} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">{getText("contact.form.organization", "Organisation", "Organisation")}</label>
                  <input name="organization" value={form.organization} onChange={handleChange} required
                    placeholder={getText("contact.form.organizationPlaceholder", "Nom de votre organisation", "Your organization name")}
                    className={`w-full px-4 py-3 border border-border rounded-xl text-sm text-[var(--color-atlas-dark)] placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-[var(--color-atlas-primary)]/30 focus:border-[var(--color-atlas-primary)] transition-all`} />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">{getText("contact.form.email", "Adresse email", "Email address")}</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange} required
                    placeholder="vous@organisation.com"
                    className={`w-full px-4 py-3 border border-border rounded-xl text-sm text-[var(--color-atlas-dark)] placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-[var(--color-atlas-primary)]/30 focus:border-[var(--color-atlas-primary)] transition-all`} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">{getText("contact.form.country", "Pays", "Country")}</label>
                  <input name="country" value={form.country} onChange={handleChange} required
                    placeholder={getText("contact.form.countryPlaceholder", "Canada, Cameroun, Nigéria...", "Canada, Cameroon, Nigeria...")}
                    className={`w-full px-4 py-3 border border-border rounded-xl text-sm text-[var(--color-atlas-dark)] placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-[var(--color-atlas-primary)]/30 focus:border-[var(--color-atlas-primary)] transition-all`} />
                </div>
              </div>

              <div className="mb-5">
                <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">{getText("contact.form.needType", "Type de besoin", "Type of need")}</label>
                <div className="relative">
                  <select name="needType" value={form.needType} onChange={handleChange} required
                    className={`w-full px-4 py-3 border border-border rounded-xl text-sm text-[var(--color-atlas-dark)] appearance-none focus:outline-none focus:ring-2 focus:ring-[var(--color-atlas-primary)]/30 focus:border-[var(--color-atlas-primary)] transition-all bg-white`}>
                    <option value="">{getText("contact.form.needTypePlaceholder", "Sélectionner un type", "Select a type")}</option>
                    {NEED_TYPES(t).map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">▾</div>
                </div>
              </div>

              <div className="mb-5">
                <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">{getText("contact.form.subject", "Sujet", "Subject")}</label>
                <input name="subject" value={form.subject} onChange={handleChange} required
                  placeholder={getText("contact.form.subjectPlaceholder", "Résumé de votre demande", "Summary of your request")}
                  className={`w-full px-4 py-3 border border-border rounded-xl text-sm text-[var(--color-atlas-dark)] placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-[var(--color-atlas-primary)]/30 focus:border-[var(--color-atlas-primary)] transition-all`} />
              </div>

              <div className="mb-8">
                <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">{getText("contact.form.message", "Message", "Message")}</label>
                <textarea name="message" value={form.message} onChange={handleChange} required rows={6}
                  placeholder={getText("contact.form.messagePlaceholder", "Décrivez votre projet, vos objectifs ou vos questions...", "Describe your project, objectives or questions...")}
                  className={`w-full px-4 py-3 border border-border rounded-xl text-sm text-[var(--color-atlas-dark)] placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-[var(--color-atlas-primary)]/30 focus:border-[var(--color-atlas-primary)] transition-all resize-none`} />
              </div>

              <button type="submit" disabled={mutation.isPending}
                className={`w-full flex items-center justify-center gap-2 bg-[var(--color-atlas-dark)] hover:bg-[var(--color-atlas-primary-hover)] disabled:opacity-60 text-white font-semibold px-6 py-4 rounded-xl text-sm transition-all duration-200 hover:-translate-y-0.5`}>
                {mutation.isPending ? t("Envoi en cours...", "Sending...") : getText("contact.form.submit", "Envoyer le message", "Send message")}
                {!mutation.isPending && <ArrowRight className="w-4 h-4" />}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
