import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";

const QuizQuestion = ({ 
  question, 
  onAnswer, 
  isAnswered, 
  selectedAnswer,
  questionNumber,
  totalQuestions 
}) => {
  const [localSelectedAnswer, setLocalSelectedAnswer] = useState(null);

useEffect(() => {
    setLocalSelectedAnswer(null);
  }, [question.Id]);

  const handleAnswerSelect = (answerIndex) => {
    if (isAnswered) return;
    
    setLocalSelectedAnswer(answerIndex);
    setTimeout(() => {
      onAnswer(answerIndex);
    }, 300);
  };

  const getAnswerIcon = (index) => {
    if (!isAnswered) return "Circle";
    if (index === question.correctAnswer) return "CheckCircle";
    if (index === selectedAnswer && index !== question.correctAnswer) return "XCircle";
    return "Circle";
  };

  const getAnswerVariant = (index) => {
    if (!isAnswered) {
      return localSelectedAnswer === index ? "primary" : "secondary";
    }
    if (index === question.correctAnswer) return "success";
    if (index === selectedAnswer && index !== question.correctAnswer) return "error";
    return "secondary";
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Question Card */}
      <Card className="p-8 mb-8" variant="gradient">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-lg">
              {questionNumber}
            </span>
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <ApperIcon name="HelpCircle" size={20} className="text-primary-500" />
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300 arabic-text">
                السؤال {questionNumber} من {totalQuestions}
              </span>
            </div>
            
<h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white arabic-text leading-relaxed">
              <span dangerouslySetInnerHTML={{ __html: question.text }} />
            </h2>
          </div>
        </div>
      </Card>

{/* Answer Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {(typeof question.options === 'string' ? question.options.split(',') : question.options || []).map((option, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={!isAnswered ? { scale: 1.02 } : {}}
            whileTap={!isAnswered ? { scale: 0.98 } : {}}
          >
            <Button
              variant={getAnswerVariant(index)}
              className={`w-full p-6 text-right justify-start text-base md:text-lg h-auto min-h-[80px] relative overflow-hidden ${
                isAnswered ? "cursor-default" : "cursor-pointer"
              }`}
              onClick={() => handleAnswerSelect(index)}
              disabled={isAnswered}
            >
              {/* Background Animation */}
              {localSelectedAnswer === index && !isAnswered && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-accent-500/20"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}

              <div className="flex items-center gap-4 relative z-10 w-full">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  getAnswerVariant(index) === "success" 
                    ? "bg-white text-success-500"
                    : getAnswerVariant(index) === "error"
                    ? "bg-white text-error-500"
                    : "bg-white/20 text-current"
                }`}>
                  <ApperIcon name={getAnswerIcon(index)} size={20} />
                </div>
                
                <span className="arabic-text leading-relaxed flex-1 text-right">
                  <span dangerouslySetInnerHTML={{ __html: option }} />
                </span>
                
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">
                  {String.fromCharCode(65 + index)}
                </div>
              </div>

              {/* Selection Ripple Effect */}
              {localSelectedAnswer === index && !isAnswered && (
                <motion.div
                  className="absolute inset-0 bg-white/30 rounded-xl"
                  initial={{ scale: 0, opacity: 1 }}
                  animate={{ scale: 2, opacity: 0 }}
                  transition={{ duration: 0.6 }}
                />
              )}
            </Button>
          </motion.div>
        ))}
      </div>

      {/* Answer Explanation */}
      {isAnswered && question.explanation && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8"
        >
          <Card className="p-6" variant="glass">
            <div className="flex items-start gap-3">
              <ApperIcon name="Lightbulb" size={24} className="text-accent-500 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-2 arabic-text">
                  التفسير:
                </h4>
                <p className="text-gray-700 dark:text-gray-300 arabic-text leading-relaxed">
                  {question.explanation}
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      )}
    </div>
  );
};

export default QuizQuestion;