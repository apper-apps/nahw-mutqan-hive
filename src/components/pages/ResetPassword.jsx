import { useEffect } from 'react';

const ResetPassword = () => {
    useEffect(() => {
        const { ApperUI } = window.ApperSDK;
        ApperUI.showResetPassword('#authentication-reset-password');
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 geometric-pattern">
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md mx-auto w-[400px] max-w-full p-10 rounded-2xl shadow-xl border border-white/20 dark:border-gray-600/20">
                <div id="authentication-reset-password"></div>
            </div>
        </div>
    );
};

export default ResetPassword;