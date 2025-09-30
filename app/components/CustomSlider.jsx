import { motion, AnimatePresence } from 'framer-motion';

export default function CustomSlider({ value, onChange, min = 0, max = 100, freeLimit = 50 }) {
  const percentage = ((value - min) / (max - min)) * 100;
  const freePercentage = ((freeLimit - min) / (max - min)) * 100;

  return (
    <div className="relative">
      {/* Hidden native range input for functionality */}
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="w-full h-3 opacity-0 absolute z-20 cursor-pointer"
      />

      {/* Custom visual slider */}
      <div className="relative w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full shadow-inner">
        {/* Fill track - continuous blue */}
        <div
          className="absolute top-0 left-0 h-full bg-linear-to-r from-[#4CA3CB] to-[#99CBE1] rounded-full transition-all duration-150 ease-out shadow-sm"
          style={{ width: `${percentage}%` }}
        />

        {/* Free limit marker */}
        <div
          className="absolute top-0 w-0.5 h-3 bg-gray-400"
          style={{ left: `${freePercentage}%` }}
        />

        {/* Custom thumb */}
        <div
          className="absolute top-1/2 w-5 h-5 rounded-full border-2 border-white shadow-lg transform -translate-y-1/2 transition-all duration-150 ease-out bg-[#4CA3CB] hover:bg-[#3396C4] hover:scale-110 cursor-pointer"
          style={{ left: `calc(${percentage}% - 10px)` }}
        />
      </div>

      {/* Labels */}
      <div className="flex justify-between mt-2 px-1">
        <span className="text-sm text-gray-600 dark:text-gray-400">{min}</span>
        <span className="text-sm text-gray-600 dark:text-gray-400">{max}</span>
      </div>

      {/* Current value display */}
      <div className="text-center mt-1">
        <div className="inline-flex items-center justify-center">
          <motion.span
            className="text-2xl font-bold text-gray-900 dark:text-white"
            animate={{
              x: value > freeLimit ? -12 : 0
            }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 25,
              duration: 0.4
            }}
          >
            {value}
          </motion.span>
          <AnimatePresence mode="wait">
            {value > freeLimit && (
              <motion.span
                key="pro-badge"
                className="px-2 py-1 bg-gray-50 text-sm font-bold rounded-full shadow-lg bg-gradient-to-r from-[#2C9CE2] to-[#7FA6EB] bg-clip-text text-transparent"
                initial={{
                  opacity: 0,
                  x: -8,
                  scale: 0.7,
                  blur: 2,
                  y: -2
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                  scale: 1,
                  blur: 0,
                  y: 0
                }}
                exit={{
                  opacity: 0,
                  x: -8,
                  scale: 0.7,
                  blur: 2,
                  y: -2
                }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 30,
                  duration: 0.25,
                  // delay: 0.05
                }}
              >
                PRO
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Free/Pro indicator */}
      <div className="text-center mt-2">
        <AnimatePresence mode="wait">
          <motion.span
            key={value <= freeLimit ? 'remaining' : 'pro'}
            className="text-sm text-gray-500 dark:text-gray-400 inline-block"
            initial={{ opacity: 0, x: 2 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -2 }}
            transition={{ duration: 0.05 }}
          >
            {value <= freeLimit
              ? `${freeLimit - value} free cards remaining`
              : 'Upgrade to PRO for upto 100 cards'
            }
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}