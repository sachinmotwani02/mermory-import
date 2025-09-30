export default function LoadingScreen({ loadingProgress }) {
  return (
    <div className="max-w-4xl mx-auto text-center">
      {/* Main heading */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 flex items-center justify-center gap-4">
          Swimming through your files...
          <div className="text-3xl">📄</div>
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Analysing text and generating your deck..
        </p>
      </div>

      {/* Progress bar */}
      <div className="mb-12">
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-4">
          <div
            className="bg-blue-400 h-3 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${loadingProgress}%` }}
          />
        </div>
        <div className="text-right">
          <span className="text-lg font-medium text-gray-900 dark:text-white">
            {loadingProgress}%
          </span>
        </div>
      </div>

      {/* Koala animation placeholder */}
      <div className="flex justify-center">
        <div className="relative">
          {/* Simple koala illustration placeholder */}
          <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-800 dark:to-blue-900 rounded-full flex items-center justify-center text-6xl animate-bounce">
            🐨
          </div>

          {/* Water effect */}
          <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-100"></div>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-200"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}