import { useState } from "react";
import { Layout } from "@/components/Layout";
import { FadeIn } from "@/components/FadeIn";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin, Send, HelpCircle, CheckCircle2, XCircle, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { sendContactEmail } from "@/lib/emailjs";
import { z } from "zod";

const errorVariants = {
  initial: { opacity: 0, height: 0, y: -4 },
  animate: { opacity: 1, height: "auto" as const, y: 0, transition: { duration: 0.25, ease: "easeOut" as const } },
  exit: { opacity: 0, height: 0, y: -4, transition: { duration: 0.2, ease: "easeIn" as const } },
};

const contactSchema = z.object({
  name: z.string().trim().min(1, "Le nom est requis.").max(100, "100 caractères max."),
  email: z.string().trim().min(1, "L'email est requis.").email("Adresse email invalide.").max(255, "255 caractères max."),
  subject: z.string().trim().min(1, "Le sujet est requis.").max(200, "200 caractères max."),
  message: z.string().trim().min(1, "Le message est requis.").max(5000, "5000 caractères max."),
});

type ContactFormErrors = Partial<Record<keyof z.infer<typeof contactSchema>, string>>;

const fieldVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.3 + i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

export default function Contact() {
  const { toast } = useToast();
  const [sending, setSending] = useState(false);
  const [errors, setErrors] = useState<ContactFormErrors>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const raw = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
    };

    const result = contactSchema.safeParse(raw);
    if (!result.success) {
      const fieldErrors: ContactFormErrors = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof ContactFormErrors;
        if (!fieldErrors[field]) fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      toast({
        title: "Champs invalides",
        description: (
          <span className="flex items-center gap-2">
            <AlertTriangle size={16} className="text-yellow-500 shrink-0" />
            Veuillez corriger les erreurs du formulaire.
          </span>
        ),
        variant: "destructive",
      });
      return;
    }

    setSending(true);
    try {
      await sendContactEmail({
        from_name: result.data.name,
        from_email: result.data.email,
        subject: result.data.subject,
        message: result.data.message,
      });
      toast({
        title: "Message envoyé",
        description: (
          <span className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-green-500 shrink-0" />
            Nous vous répondrons dans les plus brefs délais.
          </span>
        ),
      });
      form.reset();
      setErrors({});
    } catch {
      toast({
        title: "Erreur d'envoi",
        description: (
          <span className="flex items-center gap-2">
            <XCircle size={16} className="text-destructive shrink-0" />
            L'envoi a échoué. Réessayez ou contactez-nous par email.
          </span>
        ),
        variant: "destructive",
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <Layout>
      <section className="py-10 sm:py-14 md:py-16 px-3 sm:px-4 md:px-8">
        <div className="mx-auto w-full max-w-5xl">
          <FadeIn>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-center mb-3 sm:mb-4">
              <span className="gradient-text">Contactez</span>-nous
            </h1>
            <p className="text-muted-foreground text-center max-w-xl mx-auto mb-10 sm:mb-16 text-sm sm:text-base">
              Une question, un projet ? N'hésitez pas à nous écrire.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-10">
            {/* Info */}
            <FadeIn className="min-w-0">
              <div className="glass rounded-xl p-4 sm:p-6 space-y-3 sm:space-y-4 min-w-0 w-full">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Mail className="text-primary" size={16} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-display font-semibold text-sm">Email</h3>
                    <a href="mailto:andriantsoahermenio@gmail.com" className="text-muted-foreground text-[11px] sm:text-xs hover:text-primary transition-colors break-all leading-tight">
                      sales.pro@soozey.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Phone className="text-primary" size={16} />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-sm">Téléphone</h3>
                    <a href="tel:+261342179997" className="text-muted-foreground text-xs hover:text-primary transition-colors">
                      +261 34 21 799 97
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <MapPin className="text-primary" size={16} />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-sm">Adresse</h3>
                    <p className="text-muted-foreground text-xs">
                      Lot 508 Ampefiloha, Antananarivo, 101
                    </p>
                  </div>
                </div>

                {/* CTA secondaire */}
                <div className="pt-3 border-t border-border/50">
                  <Link to="/a-propos" className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors group">
                    <HelpCircle size={14} className="shrink-0" />
                    <span>En savoir plus sur Soozey →</span>
                  </Link>
                </div>
              </div>
            </FadeIn>

            {/* Form */}
            <FadeIn delay={0.15} className="min-w-0">
              <form onSubmit={handleSubmit} className="glass rounded-xl p-4 sm:p-8 space-y-3 sm:space-y-4 min-w-0 w-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <motion.div custom={0} variants={fieldVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                    <Label className="text-xs font-semibold text-foreground/80 mb-1.5 block">
                      Nom <span className="text-destructive">*</span>
                    </Label>
                    <Input name="name" placeholder="Votre nom" className={`bg-background/50 text-sm focus:ring-primary/40 focus:shadow-[0_0_12px_-3px_hsl(var(--primary)/0.4)] transition-shadow ${errors.name ? "border-destructive" : ""}`} />
                    <AnimatePresence>{errors.name && <motion.p variants={errorVariants} initial="initial" animate="animate" exit="exit" className="text-destructive text-[11px] mt-1 flex items-center gap-1 overflow-hidden"><AlertTriangle size={12} className="shrink-0" />{errors.name}</motion.p>}</AnimatePresence>
                  </motion.div>
                  <motion.div custom={1} variants={fieldVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                    <Label className="text-xs font-semibold text-foreground/80 mb-1.5 block">
                      Email <span className="text-destructive">*</span>
                    </Label>
                    <Input name="email" type="email" placeholder="votre@email.com" className={`bg-background/50 text-sm focus:ring-primary/40 focus:shadow-[0_0_12px_-3px_hsl(var(--primary)/0.4)] transition-shadow ${errors.email ? "border-destructive" : ""}`} />
                    <AnimatePresence>{errors.email && <motion.p variants={errorVariants} initial="initial" animate="animate" exit="exit" className="text-destructive text-[11px] mt-1 flex items-center gap-1 overflow-hidden"><AlertTriangle size={12} className="shrink-0" />{errors.email}</motion.p>}</AnimatePresence>
                  </motion.div>
                </div>
                <motion.div custom={2} variants={fieldVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                  <Label className="text-xs font-semibold text-foreground/80 mb-1.5 block">
                    Sujet <span className="text-destructive">*</span>
                  </Label>
                  <Input name="subject" placeholder="Objet de votre message" className={`bg-background/50 text-sm focus:ring-primary/40 focus:shadow-[0_0_12px_-3px_hsl(var(--primary)/0.4)] transition-shadow ${errors.subject ? "border-destructive" : ""}`} />
                  <AnimatePresence>{errors.subject && <motion.p variants={errorVariants} initial="initial" animate="animate" exit="exit" className="text-destructive text-[11px] mt-1 flex items-center gap-1 overflow-hidden"><AlertTriangle size={12} className="shrink-0" />{errors.subject}</motion.p>}</AnimatePresence>
                </motion.div>
                <motion.div custom={3} variants={fieldVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                  <Label className="text-xs font-semibold text-foreground/80 mb-1.5 block">
                    Message <span className="text-destructive">*</span>
                  </Label>
                  <Textarea name="message" rows={4} placeholder="Décrivez votre projet ou question..." className={`bg-background/50 text-sm focus:ring-primary/40 focus:shadow-[0_0_12px_-3px_hsl(var(--primary)/0.4)] transition-shadow ${errors.message ? "border-destructive" : ""}`} />
                  <AnimatePresence>{errors.message && <motion.p variants={errorVariants} initial="initial" animate="animate" exit="exit" className="text-destructive text-[11px] mt-1 flex items-center gap-1 overflow-hidden"><AlertTriangle size={12} className="shrink-0" />{errors.message}</motion.p>}</AnimatePresence>
                </motion.div>
                <motion.div custom={4} variants={fieldVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button variant="hero" size="lg" type="submit" disabled={sending} className="w-full relative overflow-hidden">
                      {sending && (
                        <motion.span
                          className="absolute inset-0 bg-primary/20 rounded-lg"
                          animate={{ opacity: [0.3, 0.7, 0.3] }}
                          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                        />
                      )}
                      <Send size={16} />
                      {sending ? "Envoi en cours..." : "Envoyer le message"}
                    </Button>
                  </motion.div>
                </motion.div>
              </form>
            </FadeIn>
          </div>
        </div>
      </section>
    </Layout>
  );
}
