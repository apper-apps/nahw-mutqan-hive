import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";

const LevelGrid = ({ levels, onLevelSelect }) => {
  const navigate = useNavigate();

  const handleLevelClick = (level) => {
    if (level.isUnlocked) {
onLevelSelect(level);
      navigate(`/quiz/${level.Id}`);
    }
  };

  const getLevelIcon = (level) => {
    if (level.isCompleted) return "CheckCircle";
    if (level.isUnlocked) return "Play";
    return "Lock";
  };

  const getLevelStatus = (level) => {
    if (level.isCompleted) return { text: "مكتمل", variant: "success" };
    if (level.isUnlocked) return { text: "متاح", variant: "primary" };
    return { text: "مقفل", variant: "default" };
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {levels.map((level, index) => {
        const status = getLevelStatus(level);
        
        return (
<motion.div
            key={level.Id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={level.isUnlocked ? { scale: 1.02 } : {}}
            whileTap={level.isUnlocked ? { scale: 0.98 } : {}}
          >
            <Card
              className={`p-6 cursor-pointer relative overflow-hidden ${
                level.isUnlocked 
                  ? "hover:shadow-xl transform transition-all duration-300" 
                  : "opacity-60 cursor-not-allowed"
              }`}
              onClick={() => handleLevelClick(level)}
              hover={level.isUnlocked}
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 geometric-pattern opacity-30"></div>
              
              {/* Content */}
              <div className="relative z-10">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <Badge variant={status.variant} size="sm">
                    {status.text}
                  </Badge>
                  
                  <motion.div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      level.isCompleted 
                        ? "bg-gradient-to-br from-success-400 to-success-600" 
                        : level.isUnlocked
                        ? "bg-gradient-to-br from-primary-400 to-primary-600"
                        : "bg-gray-300 dark:bg-gray-600"
                    }`}
                    whileHover={level.isUnlocked ? { rotate: 360 } : {}}
                    transition={{ duration: 0.3 }}
                  >
                    <ApperIcon 
                      name={getLevelIcon(level)} 
                      size={20} 
                      className="text-white" 
                    />
                  </motion.div>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 arabic-text">
                  {level.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 arabic-text leading-relaxed">
                  {level.description}
                </p>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-gray-500 dark:text-gray-400 arabic-text">
                      التقدم
                    </span>
                    {level.highScore > 0 && (
                      <span className="text-xs font-medium text-primary-600 dark:text-primary-400 arabic-text">
                        أفضل نتيجة: {level.highScore}
                      </span>
                    )}
                  </div>
                  
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full ${
                        level.isCompleted 
                          ? "bg-gradient-to-r from-success-500 to-success-600"
                          : level.isUnlocked && level.highScore > 0
                          ? "bg-gradient-to-r from-primary-500 to-accent-500"
                          : "bg-gray-300 dark:bg-gray-600"
                      }`}
                      initial={{ width: 0 }}
                      animate={{ 
                        width: level.isCompleted ? "100%" : `${(level.highScore || 0) * 10}%` 
                      }}
                      transition={{ duration: 0.8, delay: index * 0.1 }}
                    />
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400 arabic-text">
                    10 أسئلة
                  </span>
                  
                  {level.isUnlocked && (
                    <span className="text-primary-600 dark:text-primary-400 font-medium arabic-text">
                      ابدأ الآن ←
                    </span>
                  )}
                </div>
              </div>

              {/* Hover Effect Overlay */}
              {level.isUnlocked && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-accent-500/10 opacity-0"
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
};

export default LevelGrid;