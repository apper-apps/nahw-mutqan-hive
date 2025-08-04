import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import LevelService from "@/services/api/LevelService";
import QuestionService from "@/services/api/QuestionService";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import ThemeToggle from "@/components/molecules/ThemeToggle";
import ProgressBar from "@/components/molecules/ProgressBar";
import QuizQuestion from "@/components/organisms/QuizQuestion";
import QuizResults from "@/components/organisms/QuizResults";
import FeedbackModal from "@/components/molecules/FeedbackModal";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";

const QuizPage = () => {
  const { levelId } = useParams();
  const navigate = useNavigate();
  
  // Data state
  const [level, setLevel] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  // Quiz state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  
  // Feedback state
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackData, setFeedbackData] = useState({});

  useEffect(() => {
    loadQuizData();
  }, [levelId]);

  const loadQuizData = async () => {
    try {
      setLoading(true);
      setError("");
      
      const [levelData, questionsData] = await Promise.all([
        LevelService.getById(parseInt(levelId)),
        QuestionService.getByLevelId(parseInt(levelId))
      ]);
      
      if (!levelData) {
        throw new Error("المستوى غير موجود");
      }
      
      if (!levelData.isUnlocked) {
        toast.error("يجب إكمال المستوى السابق أولاً");
        navigate("/levels");
        return;
      }
      
      setLevel(levelData);
      setQuestions(questionsData);
    } catch (err) {
      console.error("Error loading quiz data:", err);
      setError(err.message || "فشل في تحميل بيانات الاختبار");
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = async (answerIndex) => {
    if (isAnswered) return;

    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = answerIndex === currentQuestion.correctAnswer;
    
    setIsAnswered(true);
    setSelectedAnswer(answerIndex);
    
    // Update answers array
    const newAnswer = {
      questionId: currentQuestion.id,
      selectedAnswer: answerIndex,
      isCorrect,
      timeSpent: 0 // Could track actual time
    };
    
    const updatedAnswers = [...answers, newAnswer];
    setAnswers(updatedAnswers);
    
    // Update score
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
    
    // Show feedback
    setFeedbackData({
      isCorrect,
      message: "",
      explanation: currentQuestion.explanation
    });
    setShowFeedback(true);
    
    // Auto advance after 2 seconds
    setTimeout(() => {
      setShowFeedback(false);
      
      if (currentQuestionIndex < questions.length - 1) {
        // Next question
        setCurrentQuestionIndex(prev => prev + 1);
        setIsAnswered(false);
        setSelectedAnswer(null);
      } else {
        // Quiz complete
        completeQuiz(updatedAnswers, isCorrect ? score + 1 : score);
      }
    }, 2000);
  };

  const completeQuiz = async (finalAnswers, finalScore) => {
    try {
      // Update level progress
      const updatedLevel = {
        ...level,
        isCompleted: finalScore >= 7, // 70% to complete
        highScore: Math.max(level.highScore || 0, finalScore)
      };
      
      await LevelService.update(level.id, updatedLevel);
      
      // Unlock next level if completed
      if (finalScore >= 7) {
        const nextLevelId = level.id + 1;
        try {
          const nextLevel = await LevelService.getById(nextLevelId);
          if (nextLevel && !nextLevel.isUnlocked) {
            await LevelService.update(nextLevelId, { ...nextLevel, isUnlocked: true });
          }
        } catch (err) {
          // Next level doesn't exist, that's ok
        }
        
        toast.success("مبروك! لقد أكملت المستوى بنجاح! 🎉");
      } else {
        toast.info("حاول مرة أخرى للحصول على 70% لفتح المستوى التالي");
      }
      
      setIsQuizComplete(true);
    } catch (err) {
      console.error("Error completing quiz:", err);
      toast.error("حدث خطأ أثناء حفظ النتائج");
      setIsQuizComplete(true);
    }
  };

  const handleRetry = () => {
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setScore(0);
    setIsQuizComplete(false);
    setIsAnswered(false);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setFeedbackData({});
  };

  const handleNextLevel = () => {
    const nextLevelId = level.id + 1;
    navigate(`/quiz/${nextLevelId}`);
  };

  const handleBackToLevels = () => {
    navigate("/levels");
  };

  const handleExitQuiz = () => {
    if (window.confirm("هل أنت متأكد من الخروج؟ ستفقد تقدمك الحالي.")) {
      navigate("/levels");
    }
  };

  if (loading) return <Loading variant="quiz" />;
  if (error) return <Error message={error} onRetry={loadQuizData} />;
  if (!level || questions.length === 0) return <Error message="لم يتم العثور على أسئلة لهذا المستوى" />;

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 geometric-pattern">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleExitQuiz}
                className="p-2"
              >
                <ApperIcon name="X" size={20} />
              </Button>
              
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white arabic-text">
                  {level.title}
                </h1>
                <p className="text-gray-600 dark:text-gray-300 arabic-text text-sm">
                  {level.description}
                </p>
              </div>
            </div>

            <ThemeToggle />
          </div>
          
          {!isQuizComplete && (
            <div className="mt-4">
              <ProgressBar
                current={currentQuestionIndex + 1}
                total={questions.length}
                score={score}
              />
            </div>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {!isQuizComplete ? (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <QuizQuestion
                question={currentQuestion}
                onAnswer={handleAnswer}
                isAnswered={isAnswered}
                selectedAnswer={selectedAnswer}
                questionNumber={currentQuestionIndex + 1}
                totalQuestions={questions.length}
              />
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <QuizResults
                score={score}
                totalQuestions={questions.length}
                level={level}
                answers={answers}
                questions={questions}
                onRetry={handleRetry}
                onNextLevel={score >= 7 && level.id < 10 ? handleNextLevel : null}
                onBackToLevels={handleBackToLevels}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Feedback Modal */}
      <FeedbackModal
        isVisible={showFeedback}
        isCorrect={feedbackData.isCorrect}
        message={feedbackData.message}
        explanation={feedbackData.explanation}
      />
    </div>
  );
};

export default QuizPage;