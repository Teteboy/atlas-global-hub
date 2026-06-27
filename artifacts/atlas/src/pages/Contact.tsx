import { useLanguage } from "@/hooks/use-language";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSubmitContact } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Mail, MapPin, Clock, CheckCircle2, ArrowRight } from "lucide-react";

export default function Contact() {
  const { t, lang } = useLanguage();
  const { toast } = useToast();
  const submitMutation = useSubmitContact();

  const formSchema = z.object({
    name: z.string().min(2, { message: t("Nom requis (min. 2 car.)", "Name required (min. 2 chars)") }),
    organization: z.string().min(2, { message: t("Organisation requise", "Organization required") }),
    email: z.string().email({ message: t("Adresse email invalide", "Invalid email address") }),
    country: z.string().min(2, { message: t("Pays requis", "Country required") }),
    subject: z.string().min(5, { message: t("Sujet requis (min. 5 car.)", "Subject required (min. 5 chars)") }),
    needType: z.string().min(1, { message: t("Veuillez sélectionner un type de besoin", "Please select a need type") }),
    message: z.string().min(10, { message: t("Message trop court (min. 10 car.)", "Message too short (min. 10 chars)") }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", organization: "", email: "", country: "", subject: "", needType: "", message: "" },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    submitMutation.mutate(
      { data: { ...values, lang: lang as "fr" | "en" } },
      {
        onSuccess: () => {
          toast({
            title: t("Message envoyé ✓", "Message sent ✓"),
            description: t("Nous vous répondrons sous 48 heures ouvrables.", "We will respond within 48 business hours."),
          });
          form.reset();
        },
        onError: () => {
          toast({
            variant: "destructive",
            title: t("Erreur d'envoi", "Send error"),
            description: t("Une erreur est survenue. Veuillez réessayer.", "An error occurred. Please try again."),
          });
        },
      }
    );
  }

  const needTypes = [
    { value: "Conseil stratégique", label: t("Conseil stratégique", "Strategic advisory") },
    { value: "PMO", label: t("PMO / Gestion de projet", "PMO / Project management") },
    { value: "Partenariat", label: t("Partenariat institutionnel", "Institutional partnership") },
    { value: "Formation", label: t("Formation & Renforcement des capacités", "Training & Capacity building") },
    { value: "Finance verte", label: t("Finance verte & Climat", "Green finance & Climate") },
    { value: "Autre", label: t("Autre demande", "Other request") },
  ];

  const inputClass = "bg-white border-border text-[#080E1C] placeholder:text-muted-foreground/60 focus-visible:ring-[#00C4D4] focus-visible:border-[#00C4D4] h-12 rounded-xl";
  const labelClass = "text-sm font-semibold text-[#080E1C] mb-1.5";

  return (
    <div className="w-full min-h-screen flex flex-col lg:flex-row">

      {/* ── LEFT DARK SIDEBAR ── */}
      <div className="relative lg:w-[42%] xl:w-[38%] bg-[#080E1C] text-white flex flex-col pt-40 pb-16 px-10 xl:px-16 overflow-hidden">
        <div className="absolute inset-0 hero-grid opacity-40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_0%_80%,rgba(0,196,212,0.08),transparent)]" />
        <div className="relative z-10 flex flex-col h-full">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-6">
            <span className="w-6 h-px bg-[#00C4D4]" />
            <span className="text-[#00C4D4] text-xs font-semibold tracking-[0.2em] uppercase">{t("Contact", "Contact")}</span>
          </div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-display text-4xl md:text-5xl leading-tight mb-6"
          >
            {t("Discutons de votre initiative.", "Let's discuss your initiative.")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-white/55 leading-relaxed mb-12"
          >
            {t(
              "Que vous ayez un projet en développement ou que vous cherchiez un partenaire stratégique, Atlas est là pour vous accompagner.",
              "Whether you have a project in development or are looking for a strategic partner, Atlas is here to support you."
            )}
          </motion.p>

          {/* Contact details */}
          <div className="space-y-6 mb-12">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/8 border border-white/10 flex items-center justify-center shrink-0">
                <Mail className="w-4 h-4 text-[#00C4D4]" />
              </div>
              <div>
                <p className="text-xs text-white/40 font-semibold uppercase tracking-wider mb-1">{t("Email", "Email")}</p>
                <a href="mailto:contact@atlas-grc.com" className="text-white hover:text-[#00C4D4] transition-colors font-medium">
                  contact@atlas-grc.com
                </a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/8 border border-white/10 flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4 text-[#00C4D4]" />
              </div>
              <div>
                <p className="text-xs text-white/40 font-semibold uppercase tracking-wider mb-1">{t("Présence", "Presence")}</p>
                <p className="text-white font-medium">Canada · Afrique · International</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/8 border border-white/10 flex items-center justify-center shrink-0">
                <Clock className="w-4 h-4 text-[#00C4D4]" />
              </div>
              <div>
                <p className="text-xs text-white/40 font-semibold uppercase tracking-wider mb-1">{t("Délai de réponse", "Response time")}</p>
                <p className="text-white font-medium">{t("Sous 48 heures ouvrables", "Within 48 business hours")}</p>
              </div>
            </div>
          </div>

          {/* Promise */}
          <div className="mt-auto border border-white/10 rounded-2xl p-6 bg-white/3">
            <div className="flex items-center gap-3 mb-3">
              <CheckCircle2 className="w-5 h-5 text-[#00C4D4]" />
              <span className="text-sm font-semibold text-white">{t("Notre engagement", "Our commitment")}</span>
            </div>
            <p className="text-sm text-white/50 leading-relaxed">
              {t(
                "Chaque demande est traitée personnellement par notre équipe. Pas de réponse automatique — un dialogue humain, centré sur votre réalité.",
                "Every request is handled personally by our team. No automated reply — a human dialogue, centered on your reality."
              )}
            </p>
          </div>
        </div>
      </div>

      {/* ── RIGHT FORM AREA ── */}
      <div className="flex-1 bg-[#F7F8FA] flex items-start justify-center pt-32 md:pt-40 pb-20 px-6 lg:px-12 xl:px-16">
        <div className="w-full max-w-xl">
          <div className="mb-10">
            <h2 className="font-display text-3xl text-[#080E1C] mb-2">
              {t("Formulaire de contact", "Contact form")}
            </h2>
            <p className="text-muted-foreground text-sm">
              {t("Tous les champs sont requis.", "All fields are required.")}
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <FormField control={form.control} name="name" render={({ field }) => (
                  <FormItem>
                    <FormLabel className={labelClass}>{t("Nom complet", "Full name")}</FormLabel>
                    <FormControl>
                      <Input placeholder={t("Jean Dupont", "John Doe")} className={inputClass} {...field} />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )} />
                <FormField control={form.control} name="organization" render={({ field }) => (
                  <FormItem>
                    <FormLabel className={labelClass}>{t("Organisation", "Organization")}</FormLabel>
                    <FormControl>
                      <Input placeholder={t("Nom de votre organisation", "Your organization")} className={inputClass} {...field} />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )} />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <FormField control={form.control} name="email" render={({ field }) => (
                  <FormItem>
                    <FormLabel className={labelClass}>{t("Adresse email", "Email address")}</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="vous@organisation.com" className={inputClass} {...field} />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )} />
                <FormField control={form.control} name="country" render={({ field }) => (
                  <FormItem>
                    <FormLabel className={labelClass}>{t("Pays", "Country")}</FormLabel>
                    <FormControl>
                      <Input placeholder={t("Canada, Cameroun, Nigéria…", "Canada, Cameroon, Nigeria…")} className={inputClass} {...field} />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )} />
              </div>

              <FormField control={form.control} name="needType" render={({ field }) => (
                <FormItem>
                  <FormLabel className={labelClass}>{t("Type de besoin", "Type of need")}</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className={inputClass}>
                        <SelectValue placeholder={t("Sélectionner un type", "Select a type")} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {needTypes.map(nt => (
                        <SelectItem key={nt.value} value={nt.value}>{nt.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-xs" />
                </FormItem>
              )} />

              <FormField control={form.control} name="subject" render={({ field }) => (
                <FormItem>
                  <FormLabel className={labelClass}>{t("Sujet", "Subject")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("Résumé de votre demande", "Summary of your request")} className={inputClass} {...field} />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )} />

              <FormField control={form.control} name="message" render={({ field }) => (
                <FormItem>
                  <FormLabel className={labelClass}>{t("Message", "Message")}</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={t(
                        "Décrivez votre projet, vos objectifs ou vos questions…",
                        "Describe your project, goals or questions…"
                      )}
                      className="bg-white border-border text-[#080E1C] placeholder:text-muted-foreground/60 focus-visible:ring-[#00C4D4] focus-visible:border-[#00C4D4] rounded-xl resize-none min-h-[140px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )} />

              <button
                type="submit"
                disabled={submitMutation.isPending}
                className="w-full flex items-center justify-center gap-2 bg-[#080E1C] hover:bg-[#0f1829] disabled:opacity-60 text-white font-semibold py-3.5 rounded-xl transition-all duration-200 text-sm hover:-translate-y-0.5"
              >
                {submitMutation.isPending
                  ? t("Envoi en cours…", "Sending…")
                  : t("Envoyer le message", "Send message")}
                {!submitMutation.isPending && <ArrowRight className="w-4 h-4" />}
              </button>
            </form>
          </Form>
        </div>
      </div>

    </div>
  );
}
