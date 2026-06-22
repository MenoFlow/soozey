import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { z } from "zod";
import { Send, AlertTriangle, CheckCircle2, XCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { sendContactEmail } from "@/lib/emailjs";

const errorVariants = {
  initial: { opacity: 0, height: 0, y: -4 },
  animate: { opacity: 1, height: "auto" as const, y: 0, transition: { duration: 0.25, ease: "easeOut" as const } },
  exit: { opacity: 0, height: 0, y: -4, transition: { duration: 0.2, ease: "easeIn" as const } },
};

const fieldVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.4, ease: "easeOut" as const },
  }),
};

const demoSchema = z.object({
  name: z.string().trim().min(1, "Le nom est requis.").max(100, "100 caractères max."),
  email: z.string().trim().min(1, "L'email est requis.").email("Adresse email invalide.").max(255, "255 caractères max."),
  organization: z.string().trim().min(1, "L'organisation est requise.").max(200, "200 caractères max."),
  phone: z.string().trim().max(30, "30 caractères max.").optional(),
});

type DemoFormErrors = Partial<Record<keyof z.infer<typeof demoSchema>, string>>;

interface DemoRequestModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productName: string;
}

export function DemoRequestModal({ open, onOpenChange, productName }: DemoRequestModalProps) {
  const { toast } = useToast();
  const [sending, setSending] = useState(false);
  const [errors, setErrors] = useState<DemoFormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const raw = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      organization: formData.get("organization") as string,
      phone: (formData.get("phone") as string) || undefined,
    };

    const result = demoSchema.safeParse(raw);
    if (!result.success) {
      const fieldErrors: DemoFormErrors = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof DemoFormErrors;
        if (!fieldErrors[field]) fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setSending(true);
    try {
      const phoneInfo = result.data.phone ? `\nTéléphone : ${result.data.phone}` : "";
      await sendContactEmail({
        from_name: result.data.name,
        from_email: result.data.email,
        subject: `Demande de démo — ${productName}`,
        message: `Organisation : ${result.data.organization}${phoneInfo}\n\nDemande de démonstration pour le produit : ${productName}`,
      });
      setSubmitted(true);
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

  const handleClose = () => {
    onOpenChange(false);
    // Reset après la fermeture de l'animation
    setTimeout(() => {
      setSubmitted(false);
      setErrors({});
    }, 300);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md w-full">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">
            {submitted ? "Demande envoyée" : "Demander une démo"}
          </DialogTitle>
          {!submitted && (
            <DialogDescription className="text-sm text-muted-foreground">
              Remplissez le formulaire ci-dessous. Nous vous enverrons le lien de démonstration par email.
            </DialogDescription>
          )}
        </DialogHeader>

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-4 py-6 text-center"
            >
              <div className="w-14 h-14 rounded-full bg-green-500/10 flex items-center justify-center">
                <CheckCircle2 className="text-green-500" size={28} />
              </div>
              <div>
                <p className="font-display font-semibold text-base mb-1">Merci pour votre intérêt !</p>
                <p className="text-muted-foreground text-sm">
                  Votre demande de démo pour <span className="text-foreground font-medium">{productName}</span> a bien été reçue. Vous recevrez le lien de démonstration sous peu.
                </p>
              </div>
              <Button variant="hero-outline" onClick={handleClose} className="mt-2 w-full">
                Fermer
              </Button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-3 mt-2"
            >
              {/* Nom */}
              <motion.div custom={0} variants={fieldVariants} initial="hidden" animate="visible">
                <Label className="text-xs font-semibold text-foreground/80 mb-1.5 block">
                  Nom complet <span className="text-destructive">*</span>
                </Label>
                <Input
                  name="name"
                  placeholder="Votre nom"
                  className={`bg-background/50 text-sm ${errors.name ? "border-destructive" : ""}`}
                />
                <AnimatePresence>
                  {errors.name && (
                    <motion.p variants={errorVariants} initial="initial" animate="animate" exit="exit"
                      className="text-destructive text-[11px] mt-1 flex items-center gap-1 overflow-hidden">
                      <AlertTriangle size={12} className="shrink-0" />{errors.name}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Email */}
              <motion.div custom={1} variants={fieldVariants} initial="hidden" animate="visible">
                <Label className="text-xs font-semibold text-foreground/80 mb-1.5 block">
                  Email professionnel <span className="text-destructive">*</span>
                </Label>
                <Input
                  name="email"
                  type="email"
                  placeholder="votre@organisation.com"
                  className={`bg-background/50 text-sm ${errors.email ? "border-destructive" : ""}`}
                />
                <AnimatePresence>
                  {errors.email && (
                    <motion.p variants={errorVariants} initial="initial" animate="animate" exit="exit"
                      className="text-destructive text-[11px] mt-1 flex items-center gap-1 overflow-hidden">
                      <AlertTriangle size={12} className="shrink-0" />{errors.email}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Organisation */}
              <motion.div custom={2} variants={fieldVariants} initial="hidden" animate="visible">
                <Label className="text-xs font-semibold text-foreground/80 mb-1.5 block">
                  Organisation / Institution <span className="text-destructive">*</span>
                </Label>
                <Input
                  name="organization"
                  placeholder="Nom de votre organisation"
                  className={`bg-background/50 text-sm ${errors.organization ? "border-destructive" : ""}`}
                />
                <AnimatePresence>
                  {errors.organization && (
                    <motion.p variants={errorVariants} initial="initial" animate="animate" exit="exit"
                      className="text-destructive text-[11px] mt-1 flex items-center gap-1 overflow-hidden">
                      <AlertTriangle size={12} className="shrink-0" />{errors.organization}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Téléphone (optionnel) */}
              <motion.div custom={3} variants={fieldVariants} initial="hidden" animate="visible">
                <Label className="text-xs font-semibold text-foreground/80 mb-1.5 block">
                  Téléphone <span className="text-muted-foreground font-normal">(optionnel)</span>
                </Label>
                <Input
                  name="phone"
                  type="tel"
                  placeholder="+261 xx xx xxx xx"
                  className="bg-background/50 text-sm"
                />
              </motion.div>

              {/* Produit concerné (readonly) */}
              <motion.div custom={4} variants={fieldVariants} initial="hidden" animate="visible">
                <Label className="text-xs font-semibold text-foreground/80 mb-1.5 block">
                  Produit concerné
                </Label>
                <Input
                  value={productName}
                  readOnly
                  className="bg-background/30 text-sm text-muted-foreground cursor-default"
                />
              </motion.div>

              <motion.div custom={5} variants={fieldVariants} initial="hidden" animate="visible" className="pt-1">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button variant="hero" size="lg" type="submit" disabled={sending} className="w-full relative overflow-hidden">
                    {sending && (
                      <motion.span
                        className="absolute inset-0 bg-primary/20 rounded-lg"
                        animate={{ opacity: [0.3, 0.7, 0.3] }}
                        transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                      />
                    )}
                    <Send size={16} />
                    {sending ? "Envoi en cours..." : "Envoyer la demande"}
                  </Button>
                </motion.div>
              </motion.div>
            </motion.form>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
