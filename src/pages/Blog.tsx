import { Layout } from "@/components/Layout";
import { FadeIn } from "@/components/FadeIn";
import { Link } from "react-router-dom";
import { Calendar, ArrowRight } from "lucide-react";

const articles = [
  {
    title: "Digitalisation des administrations en Afrique : enjeux et perspectives",
    excerpt: "Comment les gouvernements africains peuvent tirer parti du numérique pour moderniser leurs services publics.",
    date: "2026-03-01",
    slug: "digitalisation-administrations-afrique",
  },
  {
    title: "L'intelligence artificielle au service des institutions publiques",
    excerpt: "Applications concrètes de l'IA dans la gestion publique : audit, prédiction et automatisation.",
    date: "2026-02-15",
    slug: "ia-institutions-publiques",
  },
  {
    title: "Étude de cas : la transformation digitale du système judiciaire malgache",
    excerpt: "Retour d'expérience sur le déploiement de JusticeConnect à Madagascar.",
    date: "2026-02-01",
    slug: "etude-cas-justice-madagascar",
  },
  {
    title: "Transformation digitale des entreprises africaines : par où commencer ?",
    excerpt: "Guide pratique pour les dirigeants souhaitant engager la transformation numérique de leur organisation.",
    date: "2026-01-15",
    slug: "transformation-digitale-entreprises",
  },
];

export default function Blog() {
  return (
    <Layout>
      <section className="section-padding">
        <div className="container mx-auto">
          <FadeIn>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-center mb-3 sm:mb-4">
              Blog & <span className="gradient-text">Insights</span>
            </h1>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-10 sm:mb-16 text-sm sm:text-base">
              Analyses, retours d'expérience et réflexions sur la transformation digitale en Afrique.
            </p>
          </FadeIn>

          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">
            {articles.map((a, i) => (
              <FadeIn key={a.slug} delay={i * 0.1}>
                <div className="glass rounded-xl p-4 sm:p-6 h-full flex flex-col group hover:glow-border transition-all duration-300">
                  <div className="flex items-center gap-2 text-muted-foreground text-xs mb-2 sm:mb-3">
                    <Calendar size={12} />
                    <span>{new Date(a.date).toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" })}</span>
                  </div>
                  <h2 className="font-display font-semibold text-sm sm:text-lg mb-1.5 sm:mb-2 group-hover:text-primary transition-colors">{a.title}</h2>
                  <p className="text-muted-foreground text-xs sm:text-sm flex-1">{a.excerpt}</p>
                  <span className="text-primary text-xs sm:text-sm flex items-center gap-1 mt-3 sm:mt-4">
                    Lire l'article <ArrowRight size={12} />
                  </span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
