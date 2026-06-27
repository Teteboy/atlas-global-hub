import { Link } from "wouter";
import { useLanguage } from "@/hooks/use-language";
import logo from "@assets/Atlas_Global_Resilience_Corp._1782516926969.png";
import { Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  const { t } = useLanguage();

  const year = new Date().getFullYear();

  return (
    <footer className="bg-secondary/30 border-t border-border pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-1">
            <Link href="/">
              <img src={logo} alt="Atlas Global Resilience Corp." className="h-10 mb-6 object-contain" />
            </Link>
            <p className="text-muted-foreground text-sm mb-6 max-w-xs">
              {t(
                "Concevoir, structurer et faire avancer des initiatives à fort impact entre le Canada, l'Afrique et leurs partenaires.",
                "Designing, structuring and advancing high-impact initiatives between Canada, Africa and their partners."
              )}
            </p>
          </div>
          
          <div>
            <h3 className="font-bold text-foreground mb-4">{t("Navigation", "Navigation")}</h3>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-muted-foreground hover:text-primary text-sm transition-colors">{t("À propos", "About")}</Link></li>
              <li><Link href="/services" className="text-muted-foreground hover:text-primary text-sm transition-colors">{t("Services", "Services")}</Link></li>
              <li><Link href="/sectors" className="text-muted-foreground hover:text-primary text-sm transition-colors">{t("Secteurs", "Sectors")}</Link></li>
              <li><Link href="/projects" className="text-muted-foreground hover:text-primary text-sm transition-colors">{t("Réalisations", "Achievements")}</Link></li>
              <li><Link href="/insights" className="text-muted-foreground hover:text-primary text-sm transition-colors">{t("Perspectives", "Insights")}</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-foreground mb-4">{t("Expertise", "Expertise")}</h3>
            <ul className="space-y-3">
              <li className="text-muted-foreground text-sm">{t("Conseil stratégique", "Strategic advisory")}</li>
              <li className="text-muted-foreground text-sm">{t("Assistance à la mise en œuvre", "Implementation support")}</li>
              <li className="text-muted-foreground text-sm">{t("Transformation institutionnelle", "Institutional transformation")}</li>
              <li className="text-muted-foreground text-sm">{t("Partenariats complexes", "Complex partnerships")}</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-foreground mb-4">{t("Contact", "Contact")}</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-muted-foreground text-sm">
                <MapPin className="w-4 h-4 mt-0.5 text-primary" />
                <span>Canada • Afrique</span>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground text-sm">
                <Mail className="w-4 h-4 text-primary" />
                <a href="mailto:contact@atlas-grc.com" className="hover:text-primary transition-colors">contact@atlas-grc.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {year} Atlas Global Resilience Corp. {t("Tous droits réservés.", "All rights reserved.")}
          </p>
          <div className="flex gap-4">
            <Link href="/privacy" className="text-xs text-muted-foreground hover:text-primary transition-colors">{t("Politique de confidentialité", "Privacy Policy")}</Link>
            <Link href="/terms" className="text-xs text-muted-foreground hover:text-primary transition-colors">{t("Conditions d'utilisation", "Terms of Service")}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
