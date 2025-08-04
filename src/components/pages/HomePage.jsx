import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../App";
import ApperIcon from "@/components/ApperIcon";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import ThemeToggle from "@/components/molecules/ThemeToggle";

const HomePage = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const features = [
    {
      icon: "Layers",
      title: "10 مستويات متدرجة",
      description: "من المبتدئ إلى المتقدم في قواعد النحو"
    },
    {
      icon: "Target",
      title: "100 سؤال شامل",
      description: "أسئلة متنوعة تغطي جميع قواعد النحو"
    },
    {
      icon: "Award",
      title: "نظام نقاط تحفيزي",
      description: "تتبع تقدمك واكسب النقاط"
    },
    {
      icon: "Zap",
      title: "تغذية راجعة فورية",
      description: "تعلم من أخطائك مباشرة"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 geometric-pattern">
{/* Header */}
      <div className="absolute top-4 left-4 z-10 flex gap-2">
        <ThemeToggle />
        <Button
          variant="ghost"
          size="sm"
          onClick={logout}
          className="p-2"
        >
          <ApperIcon name="LogOut" size={20} />
          تسجيل الخروج
        </Button>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center shadow-2xl">
              <ApperIcon name="BookOpen" size={64} className="text-white" />
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4 arabic-text">
              نحو <span className="bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent">مُتقن</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 arabic-text leading-relaxed max-w-3xl mx-auto">
              اكتشف جمال اللغة العربية وأتقن قواعد النحو من خلال رحلة تعليمية تفاعلية مليئة بالتحدي والمتعة
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <Button
              variant="primary"
              size="xl"
              onClick={() => navigate("/levels")}
              className="shadow-2xl hover:shadow-3xl transform hover:scale-105"
            >
              <ApperIcon name="Play" size={24} />
              ابدأ رحلة التعلم
            </Button>
          </motion.div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
            >
              <Card className="p-6 text-center h-full" variant="glass">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary-400 to-accent-500 rounded-full flex items-center justify-center">
                  <ApperIcon name={feature.icon} size={32} className="text-white" />
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 arabic-text">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 arabic-text leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <Card className="p-8 text-center" variant="gradient">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <div className="text-4xl font-bold bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent mb-2">
                  10
                </div>
                <p className="text-gray-600 dark:text-gray-300 arabic-text">
                  مستويات متدرجة
                </p>
              </div>
              
              <div>
                <div className="text-4xl font-bold bg-gradient-to-r from-success-500 to-success-600 bg-clip-text text-transparent mb-2">
                  100
                </div>
                <p className="text-gray-600 dark:text-gray-300 arabic-text">
                  سؤال شامل
                </p>
              </div>
              
              <div>
                <div className="text-4xl font-bold bg-gradient-to-r from-accent-500 to-error-500 bg-clip-text text-transparent mb-2">
                  ∞
                </div>
                <p className="text-gray-600 dark:text-gray-300 arabic-text">
                  محاولات لا محدودة
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="text-center mt-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 arabic-text">
            مستعد لبدء رحلة الإتقان؟
          </h2>
          
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 arabic-text max-w-2xl mx-auto leading-relaxed">
            انضم إلى آلاف الطلاب الذين يتعلمون قواعد النحو بطريقة ممتعة وتفاعلية
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate("/levels")}
              className="flex-shrink-0"
            >
              <ApperIcon name="BookOpen" size={20} />
              اختر مستواك
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate("/levels")}
              className="flex-shrink-0"
            >
              <ApperIcon name="Info" size={20} />
              تعرف على المزيد
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HomePage;