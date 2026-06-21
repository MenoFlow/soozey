import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { FadeIn } from "@/components/FadeIn";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle, ExternalLink } from "lucide-react";
import { productHighlights, products } from "@/data/products";

const productsData = Object.fromEntries(products.map((product) => [product.slug, product]));

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
  const accessUrl = (product as typeof product & { externalUrl?: string }).externalUrl ?? product.siteUrl;
  const isExternalSite = accessUrl.startsWith("http");

  return (
    <Layout>
      <section className="section-padding">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-4">
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
                <h2 className="font-display font-semibold text-lg sm:text-xl mb-2 sm:mb-3 text-accent">Positionnement</h2>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">{product.positioning}</p>
              </div>
            </FadeIn>

            <FadeIn>
              <div className="glass rounded-xl p-4 sm:p-8">
                <h2 className="font-display font-semibold text-lg sm:text-xl mb-2 sm:mb-3 text-primary">Ce qu'il fait</h2>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">{product.does}</p>
              </div>
            </FadeIn>

            <FadeIn>
              <div className="glass rounded-xl p-4 sm:p-8">
                <h2 className="font-display font-semibold text-lg sm:text-xl mb-3 sm:mb-4">Avantages stratégiques</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  {[
                    ["Avantage pour l'État malgache", product.madagascarAdvantage],
                    ["Avantage pour l'Afrique", product.africaAdvantage],
                  ].map(([label, value]) => (
                    <div key={label} className="rounded-lg bg-primary/5 p-4">
                      <CheckCircle size={14} className="text-accent shrink-0 mt-0.5" />
                      <h3 className="font-display font-semibold text-sm sm:text-base mt-3 mb-2">{label}</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            <FadeIn>
              <div className="glass rounded-xl p-4 sm:p-8">
                <h2 className="font-display font-semibold text-lg sm:text-xl mb-2 sm:mb-3">Cibles principales</h2>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">{product.targets}</p>
              </div>
            </FadeIn>

            <FadeIn>
              <div className="glass rounded-xl p-4 sm:p-8">
                <h2 className="font-display font-semibold text-lg sm:text-xl mb-3 sm:mb-4">Points forts transversaux</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                  {productHighlights.map((imp) => (
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
              {isExternalSite ? (
                  <a href={accessUrl} target="_blank" rel="noopener noreferrer">
                    Accéder au site
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                ) : (
                  <Link to={accessUrl}>
                    Accéder au site
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Link>
                )}
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
