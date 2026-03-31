import { Layout } from "@/components/Layout";
import { FadeIn } from "@/components/FadeIn";
import { Link } from "react-router-dom";
import { Scale, Users, Shield, Truck, DollarSign, ArrowRight } from "lucide-react";

const products = [
  { name: "JusticeConnect", slug: "justiceconnect", icon: Scale, desc: "Plateforme intégrée de gestion du système judiciaire : suivi des affaires, gestion des audiences, archivage numérique.", color: "from-blue-500 to-cyan-500" },
  { name: "SIIRH", slug: "siirh", icon: Users, desc: "Système intégré de gestion des ressources humaines : paie, congés, évaluations, formation.", color: "from-emerald-500 to-teal-500" },
  { name: "Mianara", slug: "mianara", icon: Shield, desc: "Plateforme de surveillance, monitoring et sécurité pour les infrastructures critiques.", color: "from-violet-500 to-purple-500" },
  { name: "TrackFuel", slug: "trackfuel", icon: Truck, desc: "Solution de suivi logistique, gestion de flotte et traçabilité du carburant.", color: "from-orange-500 to-amber-500" },
  { name: "FinAudit AI", slug: "finaudit-ai", icon: DollarSign, desc: "Audit financier augmenté par l'intelligence artificielle : détection d'anomalies, reporting automatisé.", color: "from-rose-500 to-pink-500" },
];

export default function Products() {
  return (
    <Layout>
      <section className="section-padding">
        <div className="container mx-auto">
          <FadeIn>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-center mb-3 sm:mb-4">
              Nos <span className="gradient-text">produits</span>
            </h1>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-10 sm:mb-16 text-sm sm:text-base">
              Des plateformes conçues et déployées pour résoudre des problématiques métiers concrètes.
            </p>
          </FadeIn>

          <div className="space-y-4 sm:space-y-6">
            {products.map((p, i) => (
              <FadeIn key={p.slug} delay={i * 0.1}>
                <Link
                  to={`/produits/${p.slug}`}
                  className="glass rounded-xl p-4 sm:p-8 flex items-center gap-4 sm:gap-6 hover:glow-border transition-all duration-300 group block"
                >
                  <div className={`w-11 h-11 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br ${p.color} flex items-center justify-center shrink-0`}>
                    <p.icon className="w-5 h-5 sm:w-7 sm:h-7 text-background" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="font-display font-bold text-sm sm:text-xl mb-0.5 sm:mb-1 group-hover:text-primary transition-colors break-words">{p.name}</h2>
                    <p className="text-muted-foreground text-xs sm:text-sm line-clamp-2">{p.desc}</p>
                  </div>
                  <ArrowRight className="text-muted-foreground group-hover:text-primary transition-colors shrink-0 w-4 h-4 sm:w-5 sm:h-5" />
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
