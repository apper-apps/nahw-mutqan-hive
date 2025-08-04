import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const Error = ({ message = "حدث خطأ أثناء تحميل البيانات", onRetry }) => {
  return (
    <div className="flex items-center justify-center min-h-screen p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center max-w-md mx-auto"
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 0.5, repeat: 2 }}
          className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-error-400 to-error-600 rounded-full flex items-center justify-center"
        >
          <ApperIcon name="AlertTriangle" size={40} className="text-white" />
        </motion.div>
        
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 arabic-text">
          عذراً، حدث خطأ
        </h3>
        
        <p className="text-gray-600 dark:text-gray-300 mb-6 arabic-text leading-relaxed">
          {message}
        </p>
        
        {onRetry && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onRetry}
            className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl arabic-text"
          >
            <ApperIcon name="RotateCcw" size={20} className="ml-2 inline" />
            إعادة المحاولة
          </motion.button>
        )}
      </motion.div>
    </div>
  );
};

export default Error;