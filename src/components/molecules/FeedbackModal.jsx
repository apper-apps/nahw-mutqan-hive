import { motion, AnimatePresence } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Card from "@/components/atoms/Card";

const FeedbackModal = ({ 
  isVisible, 
  isCorrect, 
  message, 
  explanation,
  onNext 
}) => {
  const correctMessages = [
    "أحسنت! إجابة رائعة! 🌟",
    "ممتاز! واصل التقدم! 🎉", 
    "برافو! أنت على الطريق الصحيح! ✨",
    "عظيم! إجابة صحيحة! 🏆",
    "رائع! تقدم ملحوظ! 💫"
  ];

  const incorrectMessages = [
    "لا بأس، المحاولة جزء من التعلم! 💪",
    "لا تيأس، ستنجح في المرة القادمة! 🌱",
    "استمر في المحاولة، أنت تتحسن! 🚀",
    "التعلم رحلة، واصل السير! 🎯",
    "كل خطأ يقربك من النجاح! ⭐"
  ];

  const displayMessage = message || (isCorrect 
    ? correctMessages[Math.floor(Math.random() * correctMessages.length)]
    : incorrectMessages[Math.floor(Math.random() * incorrectMessages.length)]
  );

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
          >
            <Card className="max-w-md mx-auto p-8 text-center">
              {/* Icon */}
              <motion.div
                className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center ${
                  isCorrect 
                    ? "bg-gradient-to-br from-success-400 to-success-600" 
                    : "bg-gradient-to-br from-accent-400 to-accent-600"
                }`}
                animate={isCorrect ? { 
                  scale: [1, 1.2, 1],
                  rotate: [0, 360]
                } : {
                  x: [-5, 5, -5, 5, 0]
                }}
                transition={{ 
                  duration: isCorrect ? 0.6 : 0.5,
                  ease: "easeInOut"
                }}
              >
                <ApperIcon 
                  name={isCorrect ? "Check" : "X"} 
                  size={40} 
                  className="text-white" 
                />
              </motion.div>

              {/* Message */}
              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl font-bold mb-4 arabic-text text-gray-900 dark:text-white"
              >
                {displayMessage}
              </motion.h3>

              {/* Explanation */}
              {explanation && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-gray-600 dark:text-gray-300 mb-6 arabic-text leading-relaxed"
                >
                  {explanation}
                </motion.p>
              )}

              {/* Auto advance indicator */}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 2, ease: "linear" }}
                className="h-1 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full"
              />
              
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 arabic-text">
                الانتقال التلقائي للسؤال التالي...
              </p>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FeedbackModal;