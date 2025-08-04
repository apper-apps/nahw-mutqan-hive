import { forwardRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

const Card = forwardRef(({ 
  className, 
  variant = "default", 
  children, 
  hover = true,
  ...props 
}, ref) => {
  const baseStyles = "rounded-2xl transition-all duration-300";
  
  const variants = {
    default: "bg-white dark:bg-gray-800 shadow-lg border border-gray-100 dark:border-gray-700",
    glass: "bg-white/70 dark:bg-gray-800/70 backdrop-blur-md shadow-xl border border-white/20 dark:border-gray-600/20",
    gradient: "bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 shadow-lg border border-gray-100 dark:border-gray-700",
    elevated: "bg-white dark:bg-gray-800 shadow-2xl border border-gray-100 dark:border-gray-700"
  };

  const hoverStyles = hover ? "hover:shadow-xl hover:-translate-y-1" : "";

  return (
    <motion.div
      ref={ref}
      whileHover={hover ? { y: -4, transition: { duration: 0.2 } } : {}}
      className={cn(
        baseStyles,
        variants[variant],
        hoverStyles,
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
});

Card.displayName = "Card";

export default Card;