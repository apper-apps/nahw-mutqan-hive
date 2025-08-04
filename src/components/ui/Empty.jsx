import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  title = "لا توجد بيانات", 
  description = "لم نجد أي عناصر لعرضها في الوقت الحالي",
  actionLabel = "ابدأ الآن",
  onAction
}) => {
  return (
    <div className="flex items-center justify-center min-h-[400px] p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md mx-auto"
      >
        <motion.div
          animate={{ 
            y: [0, -10, 0],
            rotateY: [0, 180, 360]
          }}
          transition={{ 
            y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
            rotateY: { duration: 3, repeat: Infinity, ease: "linear" }
          }}
          className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-accent-400 to-accent-600 rounded-full flex items-center justify-center"
        >
          <ApperIcon name="BookOpen" size={40} className="text-white" />
        </motion.div>
        
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 arabic-text">
          {title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-300 mb-6 arabic-text leading-relaxed">
          {description}
        </p>
        
        {onAction && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onAction}
            className="bg-gradient-to-r from-success-500 to-success-600 hover:from-success-600 hover:to-success-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl arabic-text"
          >
            <ApperIcon name="Play" size={20} className="ml-2 inline" />
            {actionLabel}
          </motion.button>
        )}
      </motion.div>
    </div>
  );
};

export default Empty;