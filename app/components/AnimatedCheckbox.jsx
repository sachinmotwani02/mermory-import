"use client";

import { motion } from 'framer-motion';

export default function AnimatedCheckbox({
  checked,
  onChange,
  size = 'normal',
  className = ''
}) {
  const dimensions = size === 'small' ? 'w-5 h-5' : 'w-7 h-7';
  const svgSize = size === 'small' ? 'w-3 h-3' : 'w-4 h-4';

  return (
    <div className={`cursor-pointer flex items-center ${className}`} onClick={(e) => onChange(e)}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="absolute w-px h-px p-0 -m-px overflow-hidden clip-rect-0 border-0"
      />

      <div
        className={`${dimensions} relative rounded-md border-2 border-gray-300 dark:border-white/20 flex-shrink-0`}
        style={{
          background: 'transparent'
        }}
      >

        {/* Fill animation */}
        <motion.div
          className="absolute inset-0 bg-[#4CA3CB] rounded-sm flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            opacity: checked ? 1 : 0,
            scale: checked ? 1 : 0.5,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 25,
            duration: 0.5
          }}
        >
          {/* Checkmark SVG */}
          <svg
            className={svgSize}
            viewBox="0 0 16 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.path
              d="M2 6L6 10L14 2"
              stroke="#fff"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              pathLength={1}
              initial={{ strokeDasharray: "1 1", strokeDashoffset: 1 }}
              animate={{
                strokeDashoffset: checked ? 0 : 1
              }}
              transition={{
                type: "easeOut",
                          duration: 0.1,
                delay: checked ? 0.1 : 0
              }}
            />
          </svg>
        </motion.div>

        {/* Hover effect */}
        <motion.div
          className="absolute inset-0 bg-gray-400 dark:bg-white rounded-md"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 0.1 }}
          transition={{ duration: 0.2 }}
        />
      </div>
    </div>
  );
}