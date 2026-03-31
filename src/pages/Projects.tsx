import { Layout } from "@/components/Layout";
import { FadeIn } from "@/components/FadeIn";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const projects = [
  {
    title: "Digitalisation du système judiciaire — Madagascar",
    context: "Le système judiciaire malgache fonctionnait principalement sur papier, avec un suivi manuel des dossiers et des audiences.",
    problem: "Lenteur des procédures, perte de dossiers, manque de traçabilité et difficulté de consolidation des statistiques.",
    solution: "Déploiement de JusticeConnect dans les juridictions pilotes, avec digitalisation complète du parcours judiciaire.",
    results: ["Réduction de 60% du temps de traitement des dossiers", "Archivage numérique de 50 000+ dossiers", "Traçabilité complète des affaires"],
  },
  {
    title: "Plateforme RH centralisée — Afrique de l'Ouest",
    context: "Une grande entreprise multi-sites gérait ses ressources humaines avec des outils disparates et des processus manuels.",
    problem: "Incohérence des données, erreurs de paie fréquentes, impossibilité de consolidation des effectifs.",
    solution: "Mise en place de SIIRH pour centraliser l'ensemble de la gestion RH sur une plateforme unique.",
    results: ["Gestion unifiée de 2 000+ employés", "Réduction de 40% du temps de traitement de la paie", "Reporting consolidé en temps réel"],
  },
  {
    title: "Audit financier intelligent — Institution publique",
    context: "Une institution publique malgache avait besoin de renforcer ses mécanismes de contrôle budgétaire.",
    problem: "Audits réactifs, délais importants, anomalies détectées tardivement.",
    solution: "Déploiement de FinAudit AI pour automatiser l'analyse financière et la détection d'anomalies.",
    results: ["Détection automatisée d'anomalies budgétaires", "Réduction de 70% du temps d'audit", "Conformité réglementaire renforcée"],
  },
];

export default function Projects() {
  return (
    <Layout>
      <section className="section-padding">
        <div className="container mx-auto">
          <FadeIn>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-center mb-3 sm:mb-4">
              Nos <span className="gradient-text">projets</span>
            </h1>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-10 sm:mb-16 text-sm sm:text-base">
              Des réalisations concrètes qui démontrent notre capacité à transformer les organisations.
            </p>
          </FadeIn>

          <div className="space-y-5 sm:space-y-8">
            {projects.map((p, i) => (
              <FadeIn key={p.title} delay={i * 0.15}>
                <div className="glass rounded-xl p-4 sm:p-8">
                  <h2 className="font-display font-bold text-lg sm:text-xl mb-4 sm:mb-6 gradient-text">{p.title}</h2>
                  <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <h3 className="font-display font-semibold text-xs sm:text-sm text-accent mb-1 sm:mb-2">Contexte</h3>
                      <p className="text-muted-foreground text-xs sm:text-sm mb-3 sm:mb-4">{p.context}</p>
                      <h3 className="font-display font-semibold text-xs sm:text-sm text-accent mb-1 sm:mb-2">Problème</h3>
                      <p className="text-muted-foreground text-xs sm:text-sm">{p.problem}</p>
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-xs sm:text-sm text-accent mb-1 sm:mb-2">Solution</h3>
                      <p className="text-muted-foreground text-xs sm:text-sm mb-3 sm:mb-4">{p.solution}</p>
                      <h3 className="font-display font-semibold text-xs sm:text-sm text-accent mb-1 sm:mb-2">Résultats</h3>
                      <ul className="space-y-1">
                        {p.results.map((r) => (
                          <li key={r} className="text-xs sm:text-sm text-muted-foreground flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-1.5" /> {r}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn>
            <div className="text-center mt-10 sm:mt-12">
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
