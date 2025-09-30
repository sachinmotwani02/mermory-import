"use client";

import Image from "next/image";
import { FileText, Music, Video, ImageIcon, Link } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function UploadScreen({
  uploadedFile,
  pastedLink,
  handleFileUpload,
  handleLinkPaste,
  canProceedFromUpload,
  nextStep
}) {
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (uploadedFile) {
      setShowSuccess(false);
      const timer = setTimeout(() => {
        setShowSuccess(true);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setShowSuccess(false);
    }
  }, [uploadedFile]);
  return (
    <div className="max-w-4xl mx-auto">
      {/* Main heading */}
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Create a deck with your lecture notes
        </h2>
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
          or study material
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Bring your notes, files or any study material
        </p>
      </div>

      {/* Drag and drop area */}
      <div className="mb-8 relative">
        <motion.div
          animate={{
            filter: uploadedFile ? "blur(6px)" : "blur(0px)",
            opacity: uploadedFile ? 0.5 : 1
          }}
          transition={{ duration: 0.25, delay: uploadedFile ? 1 : 0 }}
          className="border-2 border-dashed border-blue-300 dark:border-gray-600 rounded-3xl px-16 pt-16 pb-10 text-center bg-[#E5F2F8] dark:bg-gray-800/30"
          onDragOver={(e) => {
            e.preventDefault();
            e.currentTarget.classList.add('border-blue-400', 'bg-blue-50');
          }}
          onDragLeave={(e) => {
            e.currentTarget.classList.remove('border-blue-400', 'bg-blue-50');
          }}
          onDrop={(e) => {
            e.preventDefault();
            e.currentTarget.classList.remove('border-blue-400', 'bg-blue-50');
            const files = Array.from(e.dataTransfer.files);
            if (files.length > 0) {
              handleFileUpload(files[0]);
            }
          }}
        >
          <div className="mb-8">
            <input
              type="file"
              id="file-upload"
              className="hidden"
              onChange={(e) => {
                if (e.target.files[0]) {
                  handleFileUpload(e.target.files[0]);
                }
              }}
              accept=".pdf,.docx,.txt,.png,.jpg,.jpeg"
            />
            <label
              htmlFor="file-upload"
              className="bg-blue-400 text-white px-8 py-4 rounded-full font-medium text-xl transition-colors duration-200 cursor-pointer"
            >
              Click to upload
            </label>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-lg mb-9">
            Drag your files here, or{" "}
            <label
              htmlFor="file-upload"
              className="text-blue-400 cursor-pointer hover:underline"
            >
              browse
            </label>{" "}
            from your computer
          </p>

          {/* File type chips - Row 1 */}
          <div className="flex flex-wrap justify-center gap-3 mb-3">
            <div className="flex items-center gap-2 px-4 py-2 bg-white/60 dark:bg-gray-700/30 backdrop-blur-sm rounded-full border border-gray-200/50 dark:border-gray-600/50">
              <FileText className="w-4 h-4 text-gray-600" />
              <span className="text-sm text-gray-700 dark:text-gray-300">PDF</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/60 dark:bg-gray-700/30 backdrop-blur-sm rounded-full border border-gray-200/50 dark:border-gray-600/50">
              <img src="/icons/poerpoint.png" alt="" className="w-4 h-4" />
              <span className="text-sm text-gray-700 dark:text-gray-300">Power Point</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/60 dark:bg-gray-700/30 backdrop-blur-sm rounded-full border border-gray-200/50 dark:border-gray-600/50">
              <img src="/icons/word.png" alt="" className="w-4 h-4" />
              <span className="text-sm text-gray-700 dark:text-gray-300">Word docx</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/60 dark:bg-gray-700/30 backdrop-blur-sm rounded-full border border-gray-200/50 dark:border-gray-600/50">
              <img src="/icons/anki.png" alt="" className="w-4 h-4" />
              <span className="text-sm text-gray-700 dark:text-gray-300">Anki import</span>
            </div>
          </div>

          {/* File type chips - Row 2 */}
          <div className="flex flex-wrap justify-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 bg-white/60 dark:bg-gray-700/30 backdrop-blur-sm rounded-full border border-gray-200/50 dark:border-gray-600/50">
              <Music className="w-4 h-4 text-gray-600" />
              <span className="text-sm text-gray-700 dark:text-gray-300">Audio file</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/60 dark:bg-gray-700/30 backdrop-blur-sm rounded-full border border-gray-200/50 dark:border-gray-600/50">
              <Video className="w-4 h-4 text-gray-600" />
              <span className="text-sm text-gray-700 dark:text-gray-300">Video file</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/60 dark:bg-gray-700/30 backdrop-blur-sm rounded-full border border-gray-200/50 dark:border-gray-600/50">
              <ImageIcon className="w-4 h-4 text-gray-600" />
              <span className="text-sm text-gray-700 dark:text-gray-300">Image</span>
            </div>
          </div>
        </motion.div>

        {/* Success animation overlay */}
        <AnimatePresence>
          {uploadedFile && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 1, duration: 0.3 }}
              className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
            >
              <div className="flex flex-col items-center">
                {/* Success illustration - scale down animation */}
                <motion.img
                  src="/file-upload-success.png"
                  alt="Success"
                  initial={{ opacity: 0, scale: 1.2, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{
                    delay: 1,
                    type: "spring",
                    stiffness: 300,
                    damping: 30
                  }}
                  className="w-32 h-32 object-contain mb-3"
                />

                {/* Success text - slide up animation */}
                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0}}
                  transition={{
                    delay: 1.08,
                    type: "spring",
                    stiffness: 300,
                    damping: 30
                  }}
                  className="text-[#27AB83] dark:text-white font-medium text-base"
                >
                  {uploadedFile.name} is successfully uploaded!
                </motion.p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Text area for links */}
      <div className="mb-10 relative">
        <div className="relative flex items-center border border-gray-300 dark:border-gray-600 rounded-2xl bg-white dark:bg-gray-800 p-6">
          <textarea
            placeholder="or paste any link here"
            value={pastedLink}
            onChange={(e) => handleLinkPaste(e.target.value)}
            disabled={uploadedFile}
            className="flex-1 bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none text-xl focus:outline-none"
            rows={1}
          />
          <div className="flex items-center gap-3 ml-4">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50/80 dark:bg-gray-700/30 backdrop-blur-sm rounded-full border border-gray-200/50 dark:border-gray-600/50">
              <Link className="w-4 h-4 text-gray-600" />
              <span className="text-sm text-gray-700 dark:text-gray-300">Websites</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50/80 dark:bg-gray-700/30 backdrop-blur-sm rounded-full border border-gray-200/50 dark:border-gray-600/50">
              <img src="/icons/youtube.png" alt="" className="w-4 h-4" />
              <span className="text-sm text-gray-700 dark:text-gray-300">YouTube</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50/80 dark:bg-gray-700/30 backdrop-blur-sm rounded-full border border-gray-200/50 dark:border-gray-600/50">
              <img src="/icons/googledoc.png" alt="" className="w-4 h-4" />
              <span className="text-sm text-gray-700 dark:text-gray-300">Google Docs</span>
            </div>
          </div>
        </div>
      </div>

      {/* Continue button */}
      <div className="text-center">
        <button
          onClick={nextStep}
          disabled={!canProceedFromUpload || (uploadedFile && !showSuccess)}
          className={`px-8 py-3 rounded-full font-medium text-lg transition-colors duration-200 ${
            canProceedFromUpload && (!uploadedFile || showSuccess)
              ? 'bg-[#4CA3CB] text-white cursor-pointer'
              : 'bg-gray-300 dark:bg-gray-600 text-gray-500 cursor-not-allowed'
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  );
}