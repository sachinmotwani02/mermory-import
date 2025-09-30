export default function ReadyScreen() {
  return (
    <div className="max-w-4xl mx-auto text-center">
      {/* Main heading */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Your Deck is Ready
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Start studying or edit your deck, Lets go!
        </p>
      </div>

      {/* Action cards */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Start Studying Card */}
        <div className="group cursor-pointer">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 rounded-3xl p-8 transition-transform duration-200 group-hover:scale-105">
            {/* Illustration placeholder */}
            <div className="mb-6">
              <div className="w-48 h-32 mx-auto bg-gradient-to-br from-green-200 to-green-300 dark:from-green-700 dark:to-green-600 rounded-2xl flex items-center justify-center">
                <div className="text-4xl">🎓</div>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              Start Studying
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Let's see your preperation
            </p>
          </div>
        </div>

        {/* Review Deck Card */}
        <div className="group cursor-pointer">
          <div className="bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-900 dark:to-pink-800 rounded-3xl p-8 transition-transform duration-200 group-hover:scale-105">
            {/* Illustration placeholder */}
            <div className="mb-6">
              <div className="w-48 h-32 mx-auto bg-gradient-to-br from-orange-200 to-orange-300 dark:from-orange-700 dark:to-orange-600 rounded-2xl flex items-center justify-center">
                <div className="text-4xl">📝</div>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              Review your deck
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Review and customise deck
            </p>
          </div>
        </div>
      </div>

      {/* Optional: Back to dashboard button */}
      <div className="mt-12">
        <button className="text-blue-400 hover:text-blue-500 transition-colors duration-200">
          ← Back to Dashboard
        </button>
      </div>
    </div>
  );
}