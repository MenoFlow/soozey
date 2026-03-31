import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/FadeIn";
import { Layout } from "@/components/Layout";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  Monitor,
  Brain,
  Settings,
  ArrowRight,
  Shield,
  Target,
  Users,
  Scale,
  Briefcase,
  BarChart3,
  Truck,
  DollarSign,
} from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const expertises = [
  {
    icon: Monitor,
    title: "Digitalisation des administrations",
    desc: "Modernisation des processus publics avec des plateformes numériques performantes et sécurisées.",
  },
  {
    icon: Brain,
    title: "Intelligence artificielle & data",
    desc: "Analyse de données, automatisation et aide à la décision pour une gouvernance éclairée.",
  },
  {
    icon: Settings,
    title: "Solutions métiers sur mesure",
    desc: "Outils personnalisés pour la finance, la logistique et les ressources humaines.",
  },
];

const products = [
  { name: "JusticeConnect", slug: "justiceconnect", icon: Scale, desc: "Plateforme de gestion du système judiciaire" },
  { name: "SIIRH", slug: "siirh", icon: Users, desc: "Système intégré de gestion des ressources humaines" },
  { name: "Mianara", slug: "mianara", icon: Shield, desc: "Plateforme de surveillance et sécurité" },
  { name: "TrackFuel", slug: "trackfuel", icon: Truck, desc: "Solution de suivi logistique et carburant" },
  { name: "FinAudit AI", slug: "finaudit-ai", icon: DollarSign, desc: "Audit financier augmenté par l'IA" },
];

const projects = [
  {
    title: "Digitalisation du système judiciaire",
    client: "Ministère de la Justice — Madagascar",
    result: "Réduction de 60% du temps de traitement des dossiers",
  },
  {
    title: "Plateforme RH centralisée",
    client: "Grande entreprise privée — Afrique de l'Ouest",
    result: "Gestion unifiée de 2 000+ employés",
  },
  {
    title: "Audit financier intelligent",
    client: "Institution publique — Madagascar",
    result: "Détection automatisée d'anomalies budgétaires",
  },
];

const whyUs = [
  { icon: Target, title: "Expertise locale forte", desc: "Implantés à Madagascar, nous comprenons les réalités du terrain africain." },
  { icon: Settings, title: "Solutions adaptées", desc: "Conçues pour fonctionner dans les contextes réels : connectivité, infrastructure, usages." },
  { icon: BarChart3, title: "Approche résultats", desc: "Chaque projet est mesuré par ses impacts concrets et son retour sur investissement." },
];

const Index = () => {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroParallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <Layout>
      {/* HERO */}
      <section ref={heroRef} className="relative min-h-[70vh] sm:min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <motion.img
            src={heroBg}
            alt="Technologie digitale"
            className="w-full h-full object-cover opacity-30"
            style={{ y: heroParallaxY }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
        </div>
        <div className="container mx-auto px-4 relative z-10 pt-16 sm:pt-8">
          <FadeIn>
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight mb-4 sm:mb-6">
                Nous concevons et déployons des{" "}
                <span className="gradient-text">plateformes digitales stratégiques</span>{" "}
                pour l'Afrique
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
                Des solutions concrètes en digitalisation, intelligence artificielle et systèmes métiers, conçues pour répondre aux enjeux réels du terrain africain.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <Button variant="hero" size="lg" asChild className="w-full sm:w-auto">
                  <Link to="/solutions">Découvrir nos solutions</Link>
                </Button>
                <Button variant="hero-outline" size="lg" asChild className="w-full sm:w-auto">
                  <Link to="/produits">Explorer nos produits</Link>
                </Button>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* EXPERTISES */}
      <section className="section-padding">
        <div className="container mx-auto">
          <FadeIn>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-center mb-3 sm:mb-4">
              Nos <span className="gradient-text">expertises</span>
            </h2>
            <p className="text-muted-foreground text-center max-w-xl mx-auto mb-8 sm:mb-12 text-sm sm:text-base">
              Trois piliers pour accompagner la transformation digitale en Afrique.
            </p>
          </FadeIn>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {expertises.map((e, i) => (
              <FadeIn key={e.title} delay={i * 0.15}>
                <div className="glass rounded-xl p-5 sm:p-8 h-full hover:glow-border transition-shadow duration-300">
                  <e.icon className="w-8 h-8 sm:w-10 sm:h-10 text-primary mb-3 sm:mb-4" />
                  <h3 className="font-display font-semibold text-base sm:text-lg mb-2">{e.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{e.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUITS */}
      <section className="section-padding bg-card/30">
        <div className="container mx-auto">
          <FadeIn>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-center mb-3 sm:mb-4">
              Nos <span className="gradient-text">produits</span>
            </h2>
            <p className="text-muted-foreground text-center max-w-xl mx-auto mb-8 sm:mb-12 text-sm sm:text-base">
              Des plateformes conçues pour répondre à des besoins métiers spécifiques.
            </p>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
            {products.map((p, i) => (
              <FadeIn key={p.slug} delay={i * 0.1}>
                <Link
                  to={`/produits/${p.slug}`}
                  className="glass rounded-xl p-4 sm:p-6 flex items-center sm:flex-col gap-3 sm:gap-3 hover:glow-border transition-all duration-300 group h-full"
                >
                  <p.icon className="w-6 h-6 sm:w-8 sm:h-8 text-accent shrink-0" />
                  <div className="flex-1 min-w-0 sm:w-full">
                    <h3 className="font-display font-semibold text-sm sm:text-lg group-hover:text-primary transition-colors">{p.name}</h3>
                    <p className="text-muted-foreground text-xs sm:text-sm hidden sm:block">{p.desc}</p>
                  </div>
                  <ArrowRight size={14} className="text-primary shrink-0 sm:hidden" />
                </Link>
              </FadeIn>
            ))}
          </div>
          <FadeIn>
            <div className="text-center mt-8 sm:mt-10">
              <Button variant="hero-outline" asChild>
                <Link to="/produits">Voir tous les produits</Link>
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* PROJETS */}
      <section className="section-padding">
        <div className="container mx-auto">
          <FadeIn>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-center mb-3 sm:mb-4">
              Nos <span className="gradient-text">projets</span>
            </h2>
            <p className="text-muted-foreground text-center max-w-xl mx-auto mb-8 sm:mb-12 text-sm sm:text-base">
              Des réalisations concrètes qui transforment les organisations.
            </p>
          </FadeIn>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {projects.map((p, i) => (
              <FadeIn key={p.title} delay={i * 0.15}>
                <div className="glass rounded-xl p-5 sm:p-8 h-full">
                  <h3 className="font-display font-semibold text-base sm:text-lg mb-2">{p.title}</h3>
                  <p className="text-accent text-xs sm:text-sm font-medium mb-2 sm:mb-3">{p.client}</p>
                  <p className="text-muted-foreground text-xs sm:text-sm">{p.result}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* POURQUOI SOOZEY */}
      <section className="section-padding bg-card/30">
        <div className="container mx-auto">
          <FadeIn>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-center mb-8 sm:mb-12">
              Pourquoi choisir <span className="gradient-text">Soozey</span> ?
            </h2>
          </FadeIn>
          <div className="grid sm:grid-cols-3 gap-6 sm:gap-8">
            {whyUs.map((w, i) => (
              <FadeIn key={w.title} delay={i * 0.15}>
                <div className="text-center group">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-3 sm:mb-4 transition-transform duration-300 group-hover:scale-110">
                    <w.icon className="w-7 h-7 sm:w-8 sm:h-8 text-primary" />
                  </div>
                  <h3 className="font-display font-semibold text-base sm:text-lg mb-2">{w.title}</h3>
                  <p className="text-muted-foreground text-xs sm:text-sm">{w.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container mx-auto">
          <FadeIn>
            <div className="glass rounded-2xl p-6 sm:p-12 text-center glow-border">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-3 sm:mb-4">
                Prêt à transformer votre organisation ?
              </h2>
              <p className="text-muted-foreground mb-6 sm:mb-8 max-w-lg mx-auto text-sm sm:text-base">
                Parlons de vos enjeux et construisons ensemble la solution adaptée.
              </p>
              <Button variant="hero" size="lg" asChild className="w-full sm:w-auto">
                <Link to="/contact">Nous contacter</Link>
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
