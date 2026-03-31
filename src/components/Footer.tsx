import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-card/40">
      <div className="container mx-auto px-4 py-10 sm:py-16">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-10">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-1">
            <h3 className="font-display text-xl font-bold gradient-text mb-3 sm:mb-4">Soozey</h3>
            <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
              Solutions digitales stratégiques pour les États et les entreprises africaines.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-display font-semibold mb-3 sm:mb-4 text-foreground text-sm sm:text-base">Navigation</h4>
            <div className="flex flex-col gap-1.5 sm:gap-2">
              {[
                { label: "Solutions", path: "/solutions" },
                { label: "Produits", path: "/produits" },
                { label: "Projets", path: "/projets" },
                { label: "À propos", path: "/a-propos" },
                { label: "Blog", path: "/blog" },
              ].map((item) => (
                <Link key={item.path} to={item.path} className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Produits */}
          <div>
            <h4 className="font-display font-semibold mb-3 sm:mb-4 text-foreground text-sm sm:text-base">Produits</h4>
            <div className="flex flex-col gap-1.5 sm:gap-2">
              {["JusticeConnect", "SIIRH", "Mianara", "TrackFuel", "FinAudit AI"].map((p) => (
                <Link key={p} to={`/produits/${p.toLowerCase().replace(/ /g, "-")}`} className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors">
                  {p}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="col-span-2 sm:col-span-1">
            <h4 className="font-display font-semibold mb-3 sm:mb-4 text-foreground text-sm sm:text-base">Contact</h4>
            <div className="flex flex-col gap-2 sm:gap-3 text-xs sm:text-sm text-muted-foreground">
              <div className="flex items-start gap-2">
                <MapPin size={14} className="text-primary shrink-0 mt-0.5" />
                <span>Lot 508 Cité Ampefiloha, Antananarivo 101</span>
              </div>
              <a href="mailto:andriantsoahermenio@gmail.com" className="flex items-start gap-2 hover:text-primary transition-colors min-w-0">
                <Mail size={14} className="text-primary shrink-0 mt-0.5" />
                <span className="break-all">sales.pro@soozey.com</span>
              </a>
              <a href="tel:+261383066686" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Phone size={14} className="text-primary shrink-0" />
                <span>
                  +261 38 30 666 86
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Recrutement */}
        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-center sm:text-left">
          <p className="text-xs sm:text-sm text-muted-foreground">
            Recrutement assuré par{" "}
            <a href="https://www.kariboservices.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              Karibo Services
            </a>
          </p>
          <p className="text-xs sm:text-sm text-muted-foreground">
            © {new Date().getFullYear()} Soozey. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}
