import Image from "next/image";

const cards = [
  {
    title: "Start Studying",
    description: "Let's see your preperation",
    cta: "Start Studying",
    illustration: "/quiz-illustration.png",
    border: "border-[#4CA3CB]",
    background: "bg-[#E5F2F8]",
    accent: "from-[#d5e8f2] to-[#eaf4f8]",
    aspect: "aspect-[686/438]",
    shadowColor: "#4CA3CB",
    priority: true,
  },
  {
    title: "Review your deck",
    description: "Review and customise deck",
    cta: "Review your deck",
    illustration: "/review-illustration.png",
    border: "border-[#FF8CBA]",
    background: "bg-[#FFE3EC]",
    accent: "from-[#ffd4e4] to-[#ffeef4]",
    aspect: "aspect-[688/424]",
    shadowColor: "#FF8CBA",
    priority: false,
  },
];

export default function ReadyScreen({ goToUpload }) {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Main heading */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
          Your Deck is Ready
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Start studying or edit your deck, let's go!
        </p>
      </div>

      {/* Cards container */}
      <div className="grid gap-6 md:grid-cols-2 mb-8">
        {cards.map((card) => {
          const cardStyle = {
            "--card-shadow-color": card.shadowColor,
          };

          return (
            <article
              key={card.title}
              className="group relative w-full cursor-pointer transition-transform duration-200"
            >
              <div
                className={`relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border-2 ${card.border} ${card.background} shadow-[0_4px_0_var(--card-shadow-color)] transition-all duration-200 hover:shadow-[0_6px_0_var(--card-shadow-color)] hover:-translate-y-1`}
                style={cardStyle}
              >
                <div className="relative mt-6 px-0">
                  <div className={`relative w-full ${card.aspect} overflow-hidden`}>
                    <Image
                      src={card.illustration}
                      alt={card.title}
                      fill
                      className="object-cover"
                      sizes="(min-width: 768px) 320px, 70vw"
                      priority={card.priority}
                    />
                  </div>
                </div>

                <div className="relative z-10 px-6 pb-8 pt-5 text-center">
                  <div className="absolute inset-x-0 top-0 -z-10 h-[150px] bg-white/40 blur-3xl" />
                  <h2 className="text-xl font-bold text-gray-900 mb-2">
                    {card.title}
                  </h2>
                  <p className="text-gray-600 mb-4">
                    {card.description}
                  </p>
                  <span className="inline-flex items-center justify-center text-gray-900 font-medium">
                    {card.cta}
                    <svg
                      className="ml-2 h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8 5L13 10L8 15"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </div>

                <div
                  className={`absolute inset-x-0 bottom-[-90px] h-[190px] bg-gradient-to-t ${card.accent}`}
                />
              </div>
            </article>
          );
        })}
      </div>

      {/* Back button */}
      <div className="text-center mt-20">
        <button
          onClick={goToUpload}
          className="text-blue-400 hover:text-blue-500 font-medium text-lg transition-colors duration-200"
        >
          ← Back to Import
        </button>
      </div>
    </div>
  );
}