import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { confetti } from "@/utils/confetti";
import { useEffect } from "react";
import ApperIcon from "@/components/ApperIcon";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";

const QuizResults = ({ 
  score, 
  totalQuestions, 
  level, 
  answers, 
  questions,
  onRetry,
  onNextLevel,
  onBackToLevels 
}) => {
  const navigate = useNavigate();
  const percentage = Math.round((score / totalQuestions) * 100);
  
  const getPerformanceData = () => {
    if (percentage >= 90) {
      return {
        title: "أداء ممتاز! 🏆",
        message: "تهانينا! لقد أتقنت هذا المستوى بامتياز",
        color: "from-yellow-400 to-yellow-600",
        badgeVariant: "warning",
        celebration: true
      };
    } else if (percentage >= 70) {
      return {
        title: "أداء جيد جداً! 🌟",
        message: "عمل رائع! أنت تتقدم بشكل ممتاز",
        color: "from-success-400 to-success-600",
        badgeVariant: "success",
        celebration: false
      };
    } else if (percentage >= 50) {
      return {
        title: "أداء جيد! 👍",
        message: "تقدم ملحوظ، واصل التحسن",
        color: "from-primary-400 to-primary-600",
        badgeVariant: "primary",
        celebration: false
      };
    } else {
      return {
        title: "يمكنك التحسن! 💪",
        message: "لا تيأس، المحاولة مرة أخرى ستجعلك أفضل",
        color: "from-accent-400 to-accent-600",
        badgeVariant: "accent",
        celebration: false
      };
    }
  };

  const performance = getPerformanceData();

  useEffect(() => {
    if (performance.celebration) {
      confetti();
    }
  }, [performance.celebration]);

  const correctAnswers = answers.filter(answer => answer.isCorrect).length;
  const incorrectAnswers = totalQuestions - correctAnswers;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Main Results Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="p-8 text-center relative overflow-hidden" variant="gradient">
          {/* Background Pattern */}
          <div className="absolute inset-0 geometric-pattern opacity-20"></div>
          
          <div className="relative z-10">
            {/* Trophy/Icon */}
            <motion.div
              className={`w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br ${performance.color} flex items-center justify-center`}
              animate={{ 
                rotate: performance.celebration ? [0, -10, 10, -10, 10, 0] : 0,
                scale: performance.celebration ? [1, 1.1, 1] : 1
              }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <ApperIcon 
                name={percentage >= 70 ? "Trophy" : "Target"} 
                size={48} 
                className="text-white" 
              />
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-3xl font-bold text-gray-900 dark:text-white mb-3 arabic-text"
            >
              {performance.title}
            </motion.h1>

            {/* Message */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-gray-600 dark:text-gray-300 mb-8 arabic-text text-lg"
            >
              {performance.message}
            </motion.p>

            {/* Score Display */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="flex items-center justify-center gap-8 mb-8"
            >
              <div className="text-center">
                <div className={`text-5xl font-bold bg-gradient-to-r ${performance.color} bg-clip-text text-transparent mb-2`}>
                  {score}
                </div>
                <p className="text-gray-600 dark:text-gray-300 arabic-text">
                  من {totalQuestions}
                </p>
              </div>
              
              <div className="w-px h-16 bg-gray-300 dark:bg-gray-600"></div>
              
              <div className="text-center">
                <div className={`text-5xl font-bold bg-gradient-to-r ${performance.color} bg-clip-text text-transparent mb-2`}>
                  {percentage}%
                </div>
                <p className="text-gray-600 dark:text-gray-300 arabic-text">
                  النسبة المئوية
                </p>
              </div>
            </motion.div>

            {/* Performance Badge */}
            <Badge variant={performance.badgeVariant} size="lg" className="mb-8">
              المستوى: {level.title}
            </Badge>
          </div>
        </Card>
      </motion.div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="p-6 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-success-400 to-success-600 rounded-full flex items-center justify-center">
              <ApperIcon name="Check" size={32} className="text-white" />
            </div>
            <div className="text-2xl font-bold text-success-600 mb-2">
              {correctAnswers}
            </div>
            <p className="text-gray-600 dark:text-gray-300 arabic-text">
              إجابات صحيحة
            </p>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="p-6 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-error-400 to-error-600 rounded-full flex items-center justify-center">
              <ApperIcon name="X" size={32} className="text-white" />
            </div>
            <div className="text-2xl font-bold text-error-600 mb-2">
              {incorrectAnswers}
            </div>
            <p className="text-gray-600 dark:text-gray-300 arabic-text">
              إجابات خاطئة
            </p>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card className="p-6 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center">
              <ApperIcon name="Clock" size={32} className="text-white" />
            </div>
            <div className="text-2xl font-bold text-primary-600 mb-2">
              {totalQuestions}
            </div>
            <p className="text-gray-600 dark:text-gray-300 arabic-text">
              إجمالي الأسئلة
            </p>
          </Card>
        </motion.div>
      </div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="flex flex-col sm:flex-row gap-4 justify-center"
      >
        <Button
          variant="primary"
          size="lg"
          onClick={onRetry}
          className="flex-1 sm:flex-none"
        >
          <ApperIcon name="RotateCcw" size={20} />
          إعادة المحاولة
        </Button>

        {percentage >= 70 && onNextLevel && (
          <Button
            variant="success"
            size="lg"
            onClick={onNextLevel}
            className="flex-1 sm:flex-none"
          >
            <ApperIcon name="ArrowLeft" size={20} />
            المستوى التالي
          </Button>
        )}

        <Button
          variant="secondary"
          size="lg"
          onClick={onBackToLevels}
          className="flex-1 sm:flex-none"
        >
          <ApperIcon name="Home" size={20} />
          العودة للمستويات
        </Button>
      </motion.div>

      {/* Detailed Review */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
      >
        <Card className="p-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 arabic-text flex items-center gap-3">
            <ApperIcon name="FileText" size={24} />
            مراجعة تفصيلية
          </h3>
          
          <div className="space-y-4">
            {questions.map((question, index) => {
              const userAnswer = answers.find(a => a.questionId === question.id);
              const isCorrect = userAnswer?.isCorrect;
              
              return (
                <div key={question.id} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-b-0">
                  <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      isCorrect 
                        ? "bg-success-100 text-success-600 dark:bg-success-900 dark:text-success-400"
                        : "bg-error-100 text-error-600 dark:bg-error-900 dark:text-error-400"
                    }`}>
                      <ApperIcon name={isCorrect ? "Check" : "X"} size={16} />
                    </div>
                    
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-white arabic-text mb-2">
                        {index + 1}. <span dangerouslySetInnerHTML={{ __html: question.text }} />
                      </p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                        <p className="text-success-600 dark:text-success-400 arabic-text">
                          الإجابة الصحيحة: {question.options[question.correctAnswer]}
                        </p>
                        
                        {userAnswer && userAnswer.selectedAnswer !== question.correctAnswer && (
                          <p className="text-error-600 dark:text-error-400 arabic-text">
                            إجابتك: {question.options[userAnswer.selectedAnswer]}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default QuizResults;