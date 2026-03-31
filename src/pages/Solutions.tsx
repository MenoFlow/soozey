import { Layout } from "@/components/Layout";
import { FadeIn } from "@/components/FadeIn";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Monitor, Brain, Settings, Building2, Users, Scale, BarChart3, Cpu, Truck, DollarSign, Briefcase } from "lucide-react";

const sections = [
  {
    title: "Digitalisation publique",
    desc: "Moderniser les services publics grâce au numérique.",
    icon: Building2,
    items: [
      { icon: Monitor, title: "Modernisation administrative", desc: "Dématérialisation des procédures, portails citoyens et guichets uniques numériques." },
      { icon: Users, title: "Gestion RH publique", desc: "Systèmes intégrés de gestion des ressources humaines pour les administrations." },
      { icon: Scale, title: "Systèmes judiciaires", desc: "Plateformes de gestion des affaires, suivi des audiences et archivage numérique." },
    ],
  },
  {
    title: "Intelligence artificielle & data",
    desc: "Exploiter la puissance des données pour une meilleure prise de décision.",
    icon: Brain,
    items: [
      { icon: BarChart3, title: "Analyse de données", desc: "Tableaux de bord intelligents, visualisation et reporting avancé." },
      { icon: Cpu, title: "Automatisation", desc: "Réduction des tâches manuelles grâce à l'IA et au machine learning." },
      { icon: Settings, title: "Aide à la décision", desc: "Systèmes prédictifs et recommandations basées sur l'analyse de données." },
    ],
  },
  {
    title: "Solutions métiers",
    desc: "Des outils spécialisés pour chaque secteur d'activité.",
    icon: Briefcase,
    items: [
      { icon: DollarSign, title: "Finance", desc: "Audit, contrôle budgétaire et gestion financière automatisée." },
      { icon: Truck, title: "Logistique", desc: "Suivi des flux, gestion de flotte et traçabilité des ressources." },
      { icon: Users, title: "Ressources humaines", desc: "Gestion de la paie, du recrutement et du développement des compétences." },
    ],
  },
];

export default function Solutions() {
  return (
    <Layout>
      <section className="py-10 sm:py-14 md:py-16 px-4 sm:px-6 md:px-8">
        <div className="container mx-auto max-w-5xl">
          <FadeIn>
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-display font-bold text-center mb-2 sm:mb-4">
              Nos <span className="gradient-text">solutions</span>
            </h1>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-8 sm:mb-16 text-xs sm:text-base">
              Trois domaines d'intervention pour accompagner la transformation digitale des organisations africaines.
            </p>
          </FadeIn>

          <div className="space-y-10 sm:space-y-20">
            {sections.map((section, si) => (
              <div key={section.title}>
                <FadeIn>
                  <div className="flex items-start gap-3 mb-4 sm:mb-8 p-3 sm:p-0 rounded-xl sm:rounded-none bg-muted/30 sm:bg-transparent">
                    <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-primary/10 flex items-center justify-center shrink-0 mt-0.5 sm:mt-0">
                      <section.icon className="w-4 h-4 sm:w-6 sm:h-6 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <h2 className="text-base sm:text-2xl md:text-3xl font-display font-bold leading-tight">{section.title}</h2>
                      <p className="text-muted-foreground text-[11px] sm:text-sm leading-snug">{section.desc}</p>
                    </div>
                  </div>
                </FadeIn>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6">
                  {section.items.map((item, i) => (
                    <FadeIn key={item.title} delay={i * 0.1}>
                      <div className="glass rounded-xl p-4 sm:p-6 h-full flex items-start gap-3 sm:block">
                        <item.icon className="w-6 h-6 sm:w-8 sm:h-8 text-accent shrink-0 mt-0.5 sm:mt-0 sm:mb-3" />
                        <div className="min-w-0">
                          <h3 className="font-display font-semibold text-sm sm:text-base mb-0.5 sm:mb-2 leading-tight">{item.title}</h3>
                          <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    </FadeIn>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <FadeIn>
            <div className="text-center mt-8 sm:mt-16 px-2 sm:px-0">
              <Button variant="hero" size="lg" asChild className="w-full sm:w-auto">
                <Link to="/contact">Discutons de votre projet</Link>
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>
    </Layout>
  );
}
