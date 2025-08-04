import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

const ProgressBar = ({ 
  current, 
  total, 
  score = 0, 
  className 
}) => {
  const percentage = (current / total) * 100;

  return (
    <div className={cn("space-y-2", className)}>
      {/* Stats Row */}
      <div className="flex justify-between items-center text-sm font-medium arabic-text">
        <span className="text-gray-600 dark:text-gray-300">
          السؤال {current} من {total}
        </span>
        <span className="text-primary-600 dark:text-primary-400">
          النقاط: {score}
        </span>
      </div>
      
      {/* Progress Bar */}
      <div className="relative h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          className="absolute top-0 right-0 h-full bg-gradient-to-l from-primary-500 to-accent-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
        
        {/* Shimmer Effect */}
        <motion.div
          className="absolute top-0 left-0 h-full w-8 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          animate={{ x: [-32, 320] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;