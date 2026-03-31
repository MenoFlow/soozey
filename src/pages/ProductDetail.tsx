import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { FadeIn } from "@/components/FadeIn";
import { Button } from "@/components/ui/button";
import { Scale, Users, Shield, Truck, DollarSign, CheckCircle, ArrowLeft, Clock, TrendingUp, AlertTriangle } from "lucide-react";

const productsData: Record<string, {
  name: string;
  icon: any;
  color: string;
  context: string;
  solution: string;
  features: string[];
  useCase: string;
  impacts: { icon: any; label: string }[];
}> = {
  justiceconnect: {
    name: "JusticeConnect",
    icon: Scale,
    color: "from-blue-500 to-cyan-500",
    context: "Les systèmes judiciaires en Afrique souffrent souvent d'un manque de digitalisation : dossiers papier, suivi manuel des audiences, difficultés d'archivage et lenteur des procédures.",
    solution: "JusticeConnect est une plateforme intégrée qui digitalise l'ensemble du parcours judiciaire, de l'enregistrement des affaires à l'archivage des décisions, en passant par la gestion des audiences.",
    features: ["Gestion complète des dossiers judiciaires", "Planification et suivi des audiences", "Archivage numérique sécurisé", "Tableaux de bord et statistiques", "Gestion des utilisateurs et rôles", "Notifications et alertes automatiques"],
    useCase: "Le Ministère de la Justice de Madagascar utilise JusticeConnect pour gérer plus de 50 000 dossiers par an, avec une réduction de 60% du temps de traitement.",
    impacts: [
      { icon: Clock, label: "Réduction de 60% du temps de traitement" },
      { icon: TrendingUp, label: "Amélioration de la traçabilité des affaires" },
      { icon: AlertTriangle, label: "Réduction drastique des erreurs de saisie" },
    ],
  },
  siirh: {
    name: "SIIRH",
    icon: Users,
    color: "from-emerald-500 to-teal-500",
    context: "La gestion RH dans les grandes organisations africaines reste complexe : multiplicité des sites, diversité des statuts, difficulté de consolidation des données.",
    solution: "SIIRH est un système intégré de gestion des ressources humaines qui centralise et automatise l'ensemble des processus RH.",
    features: ["Gestion de la paie multi-sites", "Suivi des congés et absences", "Évaluations de performance", "Gestion de la formation", "Reporting RH avancé", "Portail employé self-service"],
    useCase: "Une grande entreprise ouest-africaine gère ses 2 000+ employés sur SIIRH avec une consolidation automatique de la paie.",
    impacts: [
      { icon: Clock, label: "Gain de 40% sur le traitement de la paie" },
      { icon: TrendingUp, label: "Visibilité complète sur les effectifs" },
      { icon: AlertTriangle, label: "Élimination des doublons et erreurs" },
    ],
  },
  mianara: {
    name: "Mianara",
    icon: Shield,
    color: "from-violet-500 to-purple-500",
    context: "La surveillance des infrastructures critiques nécessite des outils fiables, temps réel et adaptés aux contraintes terrain.",
    solution: "Mianara est une plateforme de monitoring et de surveillance qui permet le suivi en temps réel des infrastructures et la gestion des alertes.",
    features: ["Monitoring temps réel", "Alertes intelligentes configurables", "Cartographie des installations", "Historique et rapports", "Application mobile terrain", "Intégration IoT"],
    useCase: "Déployé pour la surveillance d'infrastructures critiques, Mianara permet une détection précoce des incidents.",
    impacts: [
      { icon: Clock, label: "Détection d'incidents en temps réel" },
      { icon: TrendingUp, label: "Réduction de 45% des temps d'intervention" },
      { icon: AlertTriangle, label: "Prévention proactive des pannes" },
    ],
  },
  trackfuel: {
    name: "TrackFuel",
    icon: Truck,
    color: "from-orange-500 to-amber-500",
    context: "Le suivi du carburant et la gestion de flotte représentent un enjeu financier majeur pour les entreprises africaines, avec des risques de pertes et de fraudes.",
    solution: "TrackFuel offre une traçabilité complète du carburant et un suivi de flotte en temps réel pour optimiser les coûts logistiques.",
    features: ["Suivi GPS de flotte", "Traçabilité du carburant", "Alertes de consommation anormale", "Rapports de performance véhicule", "Gestion des conducteurs", "Intégration avec les stations-service"],
    useCase: "Une entreprise de transport utilise TrackFuel pour suivre 150 véhicules et a réduit ses coûts de carburant de 25%.",
    impacts: [
      { icon: Clock, label: "Économie de 25% sur les coûts carburant" },
      { icon: TrendingUp, label: "Optimisation des itinéraires" },
      { icon: AlertTriangle, label: "Détection automatique des fraudes" },
    ],
  },
  "finaudit-ai": {
    name: "FinAudit AI",
    icon: DollarSign,
    color: "from-rose-500 to-pink-500",
    context: "L'audit financier traditionnel est chronophage, sujet aux erreurs humaines et souvent réactif plutôt que préventif.",
    solution: "FinAudit AI utilise l'intelligence artificielle pour automatiser l'analyse financière, détecter les anomalies et produire des rapports d'audit en temps réel.",
    features: ["Détection d'anomalies par IA", "Analyse prédictive des risques", "Reporting automatisé", "Conformité réglementaire", "Tableaux de bord temps réel", "Audit trail complet"],
    useCase: "Une institution publique malgache utilise FinAudit AI pour auditer ses budgets et a détecté des anomalies précédemment invisibles.",
    impacts: [
      { icon: Clock, label: "Réduction de 70% du temps d'audit" },
      { icon: TrendingUp, label: "Détection proactive des risques" },
      { icon: AlertTriangle, label: "Conformité améliorée" },
    ],
  },
};

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const product = slug ? productsData[slug] : null;

  if (!product) {
    return (
      <Layout>
        <div className="section-padding text-center">
          <h1 className="text-2xl font-display font-bold mb-4">Produit non trouvé</h1>
          <Button variant="hero" asChild>
            <Link to="/produits">Retour aux produits</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const Icon = product.icon;

  return (
    <Layout>
      <section className="section-padding">
        <div className="container mx-auto max-w-4xl">
          <FadeIn>
            <Link to="/produits" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6 sm:mb-8 text-sm">
              <ArrowLeft size={16} /> Tous les produits
            </Link>

            <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
              <div className={`w-11 h-11 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br ${product.color} flex items-center justify-center shrink-0`}>
                <Icon className="w-5 h-5 sm:w-8 sm:h-8 text-background" />
              </div>
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-display font-bold">{product.name}</h1>
            </div>
          </FadeIn>

          <div className="space-y-4 sm:space-y-6">
            <FadeIn>
              <div className="glass rounded-xl p-4 sm:p-8">
                <h2 className="font-display font-semibold text-lg sm:text-xl mb-2 sm:mb-3 text-accent">Contexte & Problématique</h2>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">{product.context}</p>
              </div>
            </FadeIn>

            <FadeIn>
              <div className="glass rounded-xl p-4 sm:p-8">
                <h2 className="font-display font-semibold text-lg sm:text-xl mb-2 sm:mb-3 text-primary">Solution proposée</h2>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">{product.solution}</p>
              </div>
            </FadeIn>

            <FadeIn>
              <div className="glass rounded-xl p-4 sm:p-8">
                <h2 className="font-display font-semibold text-lg sm:text-xl mb-3 sm:mb-4">Fonctionnalités clés</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                  {product.features.map((f) => (
                    <div key={f} className="flex items-start gap-2">
                      <CheckCircle size={14} className="text-accent shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-muted-foreground">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            <FadeIn>
              <div className="glass rounded-xl p-4 sm:p-8">
                <h2 className="font-display font-semibold text-lg sm:text-xl mb-2 sm:mb-3">Cas d'usage</h2>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">{product.useCase}</p>
              </div>
            </FadeIn>

            <FadeIn>
              <div className="glass rounded-xl p-4 sm:p-8">
                <h2 className="font-display font-semibold text-lg sm:text-xl mb-3 sm:mb-4">Impacts mesurés</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                  {product.impacts.map((imp) => (
                    <div key={imp.label} className="flex sm:flex-col items-center gap-3 sm:gap-2 sm:text-center p-3 sm:p-4 rounded-lg bg-primary/5 transition-all duration-300 hover:scale-[1.03] hover:bg-primary/10">
                      <imp.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary shrink-0" />
                      <p className="text-xs sm:text-sm text-muted-foreground">{imp.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>

          <FadeIn>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mt-8 sm:mt-10">
              <Button variant="hero" size="lg" asChild className="w-full sm:w-auto">
                <Link to="/contact">Demander une démo</Link>
              </Button>
              <Button variant="hero-outline" size="lg" asChild className="w-full sm:w-auto">
                <Link to="/contact">Nous contacter</Link>
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>
    </Layout>
  );
}
