import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { label: "Accueil", path: "/" },
  { label: "Solutions", path: "/solutions" },
  { label: "Produits", path: "/produits" },
  { label: "Projets", path: "/projets" },
  { label: "À propos", path: "/a-propos" },
  { label: "Blog", path: "/blog" },
  { label: "Contact", path: "/contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
    
  // Variants pour le contenu (liens et boutons)
  const contentVariants = {
    hidden: { 
      opacity: 0,
      transition: {
        staggerChildren: 0.05, // Effet cascade rapide
        staggerDirection: -1,  // S'éteint dans l'ordre inverse (du bas vers le haut)
      }
    },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.08, // Effet cascade à l'ouverture
        delayChildren: 0.2,    // Attend que le fond soit ouvert
      }
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="font-display text-2xl font-bold gradient-text">
          Soozey
        </Link>

        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                location.pathname === item.path
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden lg:block">
          <Button variant="hero" size="sm" asChild>
            <Link to="/contact">Nous contacter</Link>
          </Button>
        </div>

        {/* Mobile toggle */}
        <button className="lg:hidden text-foreground" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            // Animation du CONTENEUR (Fond)
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            layout
            className="lg:hidden glass border-t border-border/50 overflow-hidden"
          >
            {/* Animation du CONTENU */}
            <motion.div
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              exit="hidden" // Déclenche la fermeture des éléments
              className="container mx-auto px-4 py-4 flex flex-col gap-2"
            >
              {navItems.map((item) => (
                <motion.div key={item.path} variants={itemVariants}>
                  <Link
                    to={item.path}
                    onClick={() => setOpen(false)}
                    className={`block px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                      location.pathname === item.path
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              
              <motion.div variants={itemVariants}>
                <Button variant="hero" size="sm" asChild className="mt-2 w-full">
                  <Link to="/contact">Nous contacter</Link>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
