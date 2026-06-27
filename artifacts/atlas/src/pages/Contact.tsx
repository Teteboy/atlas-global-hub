import { useLanguage } from "@/hooks/use-language";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSubmitContact } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Mail, MapPin } from "lucide-react";

export default function Contact() {
  const { t, lang } = useLanguage();
  const { toast } = useToast();
  const submitMutation = useSubmitContact();

  const formSchema = z.object({
    name: z.string().min(2, { message: t("Nom requis", "Name is required") }),
    organization: z.string().min(2, { message: t("Organisation requise", "Organization is required") }),
    email: z.string().email({ message: t("Email invalide", "Invalid email") }),
    country: z.string().min(2, { message: t("Pays requis", "Country is required") }),
    subject: z.string().min(5, { message: t("Sujet requis", "Subject is required") }),
    needType: z.string().min(1, { message: t("Type de besoin requis", "Need type is required") }),
    message: z.string().min(10, { message: t("Message trop court", "Message is too short") }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      organization: "",
      email: "",
      country: "",
      subject: "",
      needType: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    submitMutation.mutate(
      { data: { ...values, lang: lang as "fr" | "en" } },
      {
        onSuccess: () => {
          toast({
            title: t("Message envoyé", "Message sent"),
            description: t(
              "Nous vous répondrons sous 48 heures ouvrables.",
              "We will respond within 48 business hours."
            ),
          });
          form.reset();
        },
        onError: () => {
          toast({
            variant: "destructive",
            title: t("Erreur", "Error"),
            description: t("Une erreur est survenue.", "An error occurred."),
          });
        }
      }
    );
  }

  const needTypes = [
    { value: "Conseil stratégique", label: t("Conseil stratégique", "Strategic advisory") },
    { value: "PMO", label: t("PMO", "PMO") },
    { value: "Partenariat", label: t("Partenariat", "Partnership") },
    { value: "Formation", label: t("Formation", "Training") },
    { value: "Autre", label: t("Autre", "Other") },
  ];

  return (
    <div className="w-full flex flex-col">
      <section className="bg-foreground text-background py-20">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-white">
              {t("Discutons de votre initiative.", "Let's discuss your initiative.")}
            </h1>
            <p className="text-xl text-zinc-400">
              {t(
                "Notre équipe d'experts est prête à vous accompagner dans vos défis les plus complexes.",
                "Our team of experts is ready to support you in your most complex challenges."
              )}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-24">
            
            <div className="lg:col-span-1 space-y-12">
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-6">
                  {t("Contactez-nous", "Get in touch")}
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-primary shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1 uppercase tracking-wider font-semibold">Email</p>
                      <a href="mailto:contact@atlas-grc.com" className="text-foreground hover:text-primary font-medium text-lg transition-colors">
                        contact@atlas-grc.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-primary shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1 uppercase tracking-wider font-semibold">
                        {t("Bureaux", "Offices")}
                      </p>
                      <p className="text-foreground font-medium text-lg">
                        Canada • Afrique
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-secondary/50 p-8 rounded-3xl border border-border">
                <h4 className="font-bold text-foreground mb-2">
                  {t("Notre engagement", "Our commitment")}
                </h4>
                <p className="text-muted-foreground">
                  {t("Réponse sous 48 heures ouvrables.", "Response within 48 business hours.")}
                </p>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="bg-card border border-border rounded-3xl p-8 md:p-12 shadow-sm">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t("Nom complet", "Full Name")}</FormLabel>
                            <FormControl>
                              <Input className="h-12 bg-background" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input type="email" className="h-12 bg-background" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="organization"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t("Organisation", "Organization")}</FormLabel>
                            <FormControl>
                              <Input className="h-12 bg-background" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="country"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t("Pays", "Country")}</FormLabel>
                            <FormControl>
                              <Input className="h-12 bg-background" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="needType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("Type de besoin", "Need Type")}</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="h-12 bg-background">
                                <SelectValue placeholder={t("Sélectionnez une option", "Select an option")} />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {needTypes.map(opt => (
                                <SelectItem key={opt.value} value={opt.value}>
                                  {opt.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("Sujet", "Subject")}</FormLabel>
                          <FormControl>
                            <Input className="h-12 bg-background" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea 
                              className="min-h-[150px] resize-none bg-background" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button 
                      type="submit" 
                      size="lg" 
                      className="w-full md:w-auto h-14 px-10 text-base font-bold"
                      disabled={submitMutation.isPending}
                    >
                      {submitMutation.isPending 
                        ? t("Envoi en cours...", "Sending...") 
                        : t("Envoyer le message", "Send message")}
                    </Button>
                  </form>
                </Form>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
