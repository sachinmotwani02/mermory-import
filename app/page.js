"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useImportFlow } from "./hooks/useImportFlow";
import UploadScreen from "./components/UploadScreen";
import CustomizeScreen from "./components/CustomizeScreen";
import LoadingScreen from "./components/LoadingScreen";
import ReadyScreen from "./components/ReadyScreen";

export default function Home() {
  const flowState = useImportFlow();

  const pageVariants = {
    initial: { opacity: 0, x: 5 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -5 }
  };

  const pageTransition = {
    type: "spring",
    stiffness: 600,
    damping: 30,
  };

  return (
    <div className="flex h-screen">
      {/* Fixed Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-56 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 z-20">
        <div className="p-4">
          <Image
            src="/Sidebar.png"
            alt="Sidebar"
            width={220}
            height={440}
            className="w-full h-auto"
          />
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 pl-56">
        {/* Fixed Navigation */}
        <nav className="fixed top-0 right-30 h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 z-10">
          <div className="flex items-center justify-between h-full px-6">
            <Image
              src="/Nav.png"
              alt="Navigation"
              width={100}
              height={40}
              className="h-10 w-auto object-contain"
              style={{ imageRendering: 'crisp-edges' }}
              priority
              unoptimized
            />
          </div>
        </nav>

        {/* Content Area - starts after sidebar and below navbar */}
        <div className="pt-30 p-6">
          <AnimatePresence mode="popLayout">
            {flowState.currentStep === 'upload' && (
              <motion.div
                key="upload"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={pageTransition}
              >
                <UploadScreen {...flowState} />
              </motion.div>
            )}

            {flowState.currentStep === 'customize' && (
              <motion.div
                key="customize"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={pageTransition}
              >
                <CustomizeScreen {...flowState} />
              </motion.div>
            )}

            {flowState.currentStep === 'loading' && (
              <motion.div
                key="loading"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={pageTransition}
              >
                <LoadingScreen {...flowState} />
              </motion.div>
            )}

            {flowState.currentStep === 'ready' && (
              <motion.div
                key="ready"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={pageTransition}
              >
                <ReadyScreen {...flowState} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
