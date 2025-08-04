import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LevelService from "@/services/api/LevelService";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import ThemeToggle from "@/components/molecules/ThemeToggle";
import LevelGrid from "@/components/organisms/LevelGrid";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";

const LevelsPage = () => {
  const navigate = useNavigate();
  const [levels, setLevels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadLevels();
  }, []);

  const loadLevels = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await LevelService.getAll();
      setLevels(data);
    } catch (err) {
      setError("فشل في تحميل المستويات");
      toast.error("حدث خطأ أثناء تحميل المستويات");
    } finally {
      setLoading(false);
    }
  };

  const handleLevelSelect = (level) => {
    if (level.isUnlocked) {
      navigate(`/quiz/${level.id}`);
    } else {
      toast.info("يجب إكمال المستوى السابق أولاً");
    }
  };

  const calculateOverallProgress = () => {
    if (levels.length === 0) return 0;
    const completedLevels = levels.filter(level => level.isCompleted).length;
    return Math.round((completedLevels / levels.length) * 100);
  };

  const getTotalScore = () => {
    return levels.reduce((total, level) => total + (level.highScore || 0), 0);
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadLevels} />;
  if (levels.length === 0) return <Empty title="لا توجد مستويات" description="لم يتم العثور على أي مستويات متاحة" />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 geometric-pattern">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/")}
                className="p-2"
              >
                <ApperIcon name="Home" size={20} />
              </Button>
              
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white arabic-text">
                  اختر مستواك
                </h1>
                <p className="text-gray-600 dark:text-gray-300 arabic-text text-sm">
                  ابدأ رحلتك في تعلم قواعد النحو
                </p>
              </div>
            </div>

            <ThemeToggle />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Progress Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/20 dark:border-gray-600/20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Overall Progress */}
              <div className="text-center">
                <div className="relative w-20 h-20 mx-auto mb-4">
                  <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 80 80">
                    <circle
                      cx="40"
                      cy="40"
                      r="32"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      className="text-gray-200 dark:text-gray-700"
                    />
                    <motion.circle
                      cx="40"
                      cy="40"
                      r="32"
                      stroke="url(#progressGradient)"
                      strokeWidth="8"
                      fill="transparent"
                      strokeLinecap="round"
                      initial={{ strokeDasharray: "0 201" }}
                      animate={{ 
                        strokeDasharray: `${(calculateOverallProgress() / 100) * 201} 201` 
                      }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                    <defs>
                      <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#1B4965" />
                        <stop offset="100%" stopColor="#F18F01" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-lg font-bold text-gray-900 dark:text-white">
                      {calculateOverallProgress()}%
                    </span>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 arabic-text font-medium">
                  التقدم الإجمالي
                </p>
              </div>

              {/* Completed Levels */}
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-success-400 to-success-600 rounded-full flex items-center justify-center">
                  <ApperIcon name="CheckCircle" size={32} className="text-white" />
                </div>
                <div className="text-2xl font-bold text-success-600 dark:text-success-400 mb-1">
                  {levels.filter(level => level.isCompleted).length}
                </div>
                <p className="text-gray-600 dark:text-gray-300 arabic-text">
                  مستوى مكتمل
                </p>
              </div>

              {/* Total Score */}
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-accent-400 to-accent-600 rounded-full flex items-center justify-center">
                  <ApperIcon name="Star" size={32} className="text-white" />
                </div>
                <div className="text-2xl font-bold text-accent-600 dark:text-accent-400 mb-1">
                  {getTotalScore()}
                </div>
                <p className="text-gray-600 dark:text-gray-300 arabic-text">
                  إجمالي النقاط
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Levels Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <LevelGrid levels={levels} onLevelSelect={handleLevelSelect} />
        </motion.div>

        {/* Tips Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12"
        >
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/20 dark:border-gray-600/20">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center flex-shrink-0">
                <ApperIcon name="Lightbulb" size={24} className="text-white" />
              </div>
              
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 arabic-text">
                  نصائح للنجاح
                </h3>
                
                <ul className="space-y-2 text-gray-600 dark:text-gray-300 arabic-text">
                  <li className="flex items-center gap-2">
                    <ApperIcon name="CheckCircle2" size={16} className="text-success-500 flex-shrink-0" />
                    يجب الحصول على 70% على الأقل لفتح المستوى التالي
                  </li>
                  <li className="flex items-center gap-2">
                    <ApperIcon name="CheckCircle2" size={16} className="text-success-500 flex-shrink-0" />
                    راجع التفسيرات بعناية لتحسين فهمك
                  </li>
                  <li className="flex items-center gap-2">
                    <ApperIcon name="CheckCircle2" size={16} className="text-success-500 flex-shrink-0" />
                    يمكنك إعادة المحاولة في أي مستوى لتحسين نقاطك
                  </li>
                  <li className="flex items-center gap-2">
                    <ApperIcon name="CheckCircle2" size={16} className="text-success-500 flex-shrink-0" />
                    خذ وقتك في قراءة الأسئلة بعناية
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LevelsPage;