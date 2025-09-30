"use client";

import { motion, AnimatePresence } from 'framer-motion';

export default function ProLimitModal({ isOpen, onClose, onUpgrade }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ ease: "easeOut", duration: 0.2 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md"
          >
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl dark:border-gray-700 overflow-hidden">
              {/* Header with gradient */}
              <div className="bg-gradient-to-r from-[#2C9CE2] to-[#7FA6EB] px-8 py-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-white">Upgrade to PRO</h2>
                  <button
                    onClick={onClose}
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="px-8 py-6">
                <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg">
                  You've selected more than 50 cards. Upgrade to PRO to generate up to 100 cards per deck.
                </p>

                {/* Features list */}
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-[#4CA3CB]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">Up to 100 cards per deck</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-[#4CA3CB]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">All question types unlocked</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-[#4CA3CB]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">Priority processing</span>
                  </li>
                </ul>

                {/* Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={onUpgrade}
                    className="flex-1 bg-gradient-to-r from-[#2C9CE2] to-[#7FA6EB] text-white font-semibold py-3 rounded-2xl hover:opacity-90 transition-opacity"
                  >
                    Upgrade Now
                  </button>
                  <button
                    onClick={onClose}
                    className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold py-3 rounded-2xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    Maybe Later
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}