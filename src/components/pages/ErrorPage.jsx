import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';

const ErrorPage = () => {
  const [searchParams] = useSearchParams();
  const errorMessage = searchParams.get('message') || 'حدث خطأ أثناء المصادقة';
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 geometric-pattern">
      <div className="w-full max-w-md p-8 bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 dark:border-gray-600/20 text-center">
        <h1 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4 arabic-text">خطأ في المصادقة</h1>
        <p className="text-gray-700 dark:text-gray-300 mb-6 arabic-text">{errorMessage}</p>
        <Link to="/login" className="inline-block px-6 py-3 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors arabic-text">
          العودة لتسجيل الدخول
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;