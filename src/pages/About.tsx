import { Layout } from "@/components/Layout";
import { FadeIn } from "@/components/FadeIn";
import { Eye, Target, Heart } from "lucide-react";
import soozeyVideo from "@/assets/soozey-presentation.mp4";

const values = [
  { icon: Eye, title: "Vision", desc: "Devenir le partenaire technologique de référence pour la transformation digitale en Afrique." },
  { icon: Target, title: "Mission", desc: "Concevoir et déployer des solutions digitales concrètes, performantes et durables, adaptées aux réalités africaines." },
  { icon: Heart, title: "Valeurs", desc: "Excellence, innovation, impact terrain et engagement durable auprès de nos partenaires." },
];

export default function About() {
  return (
    <Layout>
      <section className="section-padding">
        <div className="container mx-auto max-w-4xl">
          <FadeIn>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-center mb-6 sm:mb-8">
              À propos de <span className="gradient-text">Soozey</span>
            </h1>
          </FadeIn>

          <FadeIn>
            <div className="glass rounded-xl p-3 sm:p-6 mb-8 sm:mb-12 overflow-hidden">
              <div className="aspect-video w-full rounded-lg overflow-hidden">
                <video
                  className="w-full h-full object-cover"
                  src={soozeyVideo}
                  controls
                  autoPlay
                  muted
                  loop
                  playsInline
                  title="Présentation Soozey"
                />
              </div>
              <p className="text-muted-foreground text-xs sm:text-sm mt-3 text-center">
                Découvrez Soozey — Solutions digitales adaptées aux réalités africaines.
              </p>
            </div>
          </FadeIn>

          <div className="grid sm:grid-cols-3 gap-4 sm:gap-6">
            {values.map((v, i) => (
              <FadeIn key={v.title} delay={i * 0.15}>
                <div className="glass rounded-xl p-5 sm:p-8 text-center h-full">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <v.icon className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
                  </div>
                  <h2 className="font-display font-bold text-lg sm:text-xl mb-2 sm:mb-3">{v.title}</h2>
                  <p className="text-muted-foreground text-xs sm:text-sm">{v.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
