"use client";

export default function LoadingScreen({ loadingProgress }) {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Main heading */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
          Swimming through your files...
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Analysing text and generating your deck
        </p>
      </div>

      {/* Content container with matching visual weight */}
      <div className=" p-16 mb-8">


        {/* Progress bar */}
        <div className="w-full mt-36 flex flex-col items-center">
          <div className="w-full max-w-2xl bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-4">
            <div
              className="bg-[#4CA3CB] h-3 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${loadingProgress}%` }}
            />
          </div>
          <span className="text-lg font-medium text-gray-600 dark:text-gray-300">
            {loadingProgress}%
          </span>
        </div>
        {/* Swimming Koala */}
        <div className="flex justify-center mt-16">
          <img
            src="/koalaswimming.jpeg"
            alt="Swimming Koala"
            className="w-64 h-64 object-contain"
          />
        </div>
      </div>
    </div>
  );
}