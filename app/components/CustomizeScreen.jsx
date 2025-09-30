import CustomSlider from './CustomSlider';
import AnimatedCheckbox from './AnimatedCheckbox';
import ProLimitModal from './ProLimitModal';
import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';

export default function CustomizeScreen({
  selectedQuestionTypes,
  numberOfCards,
  toggleQuestionType,
  selectAllQuestionTypes,
  setNumberOfCards,
  deckName,
  setDeckName,
  topicTag,
  setTopicTag,
  canProceedFromCustomize,
  nextStep,
  showProModal,
  handleUpgrade,
  closeProModal
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  const topicOptions = [
    'Architecture',
    'Art History',
    'Biology',
    'Business',
    'Chemistry',
    'Computer Science',
    'Economics',
    'Engineering',
    'English Literature',
    'Environmental Science',
    'Geography',
    'History',
    'Law',
    'Mathematics',
    'Medicine',
    'Music Theory',
    'Philosophy',
    'Physics',
    'Political Science',
    'Psychology',
    'Sociology',
    'Statistics'
  ];

  const filteredTopics = topicOptions.filter(topic =>
    topic.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
        setSearchTerm('');
        setHighlightedIndex(-1);
      }
    };

    const handleKeyDown = (event) => {
      if (!isDropdownOpen) return;

      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          setHighlightedIndex(prev =>
            prev < filteredTopics.length - 1 ? prev + 1 : 0
          );
          break;
        case 'ArrowUp':
          event.preventDefault();
          setHighlightedIndex(prev =>
            prev > 0 ? prev - 1 : filteredTopics.length - 1
          );
          break;
        case 'Enter':
          event.preventDefault();
          if (highlightedIndex >= 0 && highlightedIndex < filteredTopics.length) {
            setTopicTag(filteredTopics[highlightedIndex]);
            setIsDropdownOpen(false);
            setSearchTerm('');
            setHighlightedIndex(-1);
          }
          break;
        case 'Escape':
          setIsDropdownOpen(false);
          setSearchTerm('');
          setHighlightedIndex(-1);
          buttonRef.current?.focus();
          break;
        default:
          if (event.key.length === 1) {
            const newSearchTerm = searchTerm + event.key.toLowerCase();
            setSearchTerm(newSearchTerm);

            // Find first match and highlight it
            const matchIndex = filteredTopics.findIndex(topic =>
              topic.toLowerCase().startsWith(newSearchTerm)
            );
            setHighlightedIndex(matchIndex >= 0 ? matchIndex : -1);
          } else if (event.key === 'Backspace') {
            const newSearchTerm = searchTerm.slice(0, -1);
            setSearchTerm(newSearchTerm);

            if (newSearchTerm) {
              const matchIndex = filteredTopics.findIndex(topic =>
                topic.toLowerCase().startsWith(newSearchTerm)
              );
              setHighlightedIndex(matchIndex >= 0 ? matchIndex : -1);
            } else {
              setHighlightedIndex(-1);
            }
          }
          break;
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isDropdownOpen, searchTerm, filteredTopics, highlightedIndex, setTopicTag]);

  const questionTypes = [
    {
      id: 'simple-flashcard',
      label: 'Simple Flashcard',
      svgPath: '/CardSVGs/Simple Flashcard.svg'
    },
    {
      id: 'cloze-flashcard',
      label: 'Cloze Flashcard',
      svgPath: '/CardSVGs/Cloze Flashcard.svg'
    },
    {
      id: 'multiple-choice',
      label: 'Multiple Choice',
      svgPath: '/CardSVGs/Multiple Choice.svg'
    },
    {
      id: 'drag-drop',
      label: 'Drag & Drop',
      svgPath: '/CardSVGs/Drag&Drop.svg'
    },
    {
      id: 'typing',
      label: 'Typing',
      svgPath: '/CardSVGs/Typing.svg'
    },
    {
      id: 'image-occlusion',
      label: 'Image Occlusion',
      svgPath: '/CardSVGs/Image Occlusion.svg'
    }
  ];

  const allSelected = selectedQuestionTypes.length === questionTypes.length;
  const maxFree = 50;
  const maxPro = 100;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Main heading */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
          Customise your deck
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Bring your notes, files or any study material
        </p>
      </div>

      {/* Deck Name and Topic Tag Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Deck Name Field */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Deck Name
          </h3>
          <input
            type="text"
            id="deckName"
            value={deckName}
            onChange={(e) => setDeckName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-[#4CA3CB] focus:ring-2 focus:ring-[#CCE5F0] focus:outline-none transition-all duration-200"
            placeholder="Enter deck name..."
          />
        </div>

        {/* Topic Tag Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Topic Tag
          </h3>
          <div className="relative">
            <button
              type="button"
              ref={buttonRef}
              onClick={() => {
                setIsDropdownOpen(!isDropdownOpen);
                if (!isDropdownOpen) {
                  setSearchTerm('');
                  setHighlightedIndex(-1);
                }
              }}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-left text-gray-900 dark:text-white focus:border-[#4CA3CB] focus:ring-2 focus:ring-[#CCE5F0] focus:outline-none transition-all duration-200 flex items-center justify-between"
            >
              <span className={topicTag ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}>
                {topicTag || 'Select a topic...'}
              </span>
              <svg
                className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                  isDropdownOpen ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute z-50 w-full mt-2 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 rounded-xl shadow-lg max-h-60 overflow-hidden">
                {/* Search indicator */}
                {searchTerm && (
                  <div className="px-4 py-2 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Searching: <span className="font-medium text-[#3396C4]">"{searchTerm}"</span>
                    </span>
                  </div>
                )}

                {/* Options List */}
                <div className="max-h-48 overflow-y-auto">
                  {filteredTopics.length > 0 ? (
                    filteredTopics.map((topic, index) => (
                      <button
                        key={topic}
                        type="button"
                        onClick={() => {
                          setTopicTag(topic);
                          setIsDropdownOpen(false);
                          setSearchTerm('');
                          setHighlightedIndex(-1);
                        }}
                        className={`w-full px-4 py-2 text-left transition-colors duration-150 ${
                          index === highlightedIndex
                            ? 'bg-[#4CA3CB] text-white'
                            : 'text-gray-900 dark:text-white hover:bg-[#CCE5F0] dark:hover:bg-gray-700 hover:text-[#004982]'
                        }`}
                      >
                        {topic}
                      </button>
                    ))
                  ) : (
                    <div className="px-4 py-2 text-gray-500 dark:text-gray-400 text-sm">
                      {searchTerm ? `No topics found for "${searchTerm}"` : 'No topics found'}
                    </div>
                  )}
                </div>

                {/* Help text */}
                {!searchTerm && (
                  <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Start typing to search, use ↑↓ to navigate, Enter to select
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Select Question Types label and Select All checkbox */}
      <div className="flex justify-between items-end mb-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          Select Question Types
        </h3>
        <div className="flex items-center gap-3">
          <AnimatedCheckbox
            checked={allSelected}
            onChange={selectAllQuestionTypes}
            size="small"
          />
          <span className="text-gray-600 dark:text-gray-400">Select All</span>
        </div>
      </div>

      {/* Question type cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
        {questionTypes.map((type) => {
          const isSelected = selectedQuestionTypes.includes(type.id);
          return (
            <motion.div
              key={type.id}
              onClick={() => toggleQuestionType(type.id)}
              className={`relative p-6 rounded-2xl border-2 cursor-pointer ${
                isSelected
                  ? 'border-[#4CA3CB]'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
              animate={{
                y: isSelected ? 0 : 0,
                boxShadow: isSelected ? '0 3px 0 0 #4CA3CB' : '0 3px 0 0 #D3D3D3'
              }}
              whileTap={{
                y: 3,
                boxShadow: '0 0px 0 0 #fff'
              }}
              initial={{ y: 0 }}
              transition={{ type: "spring", stiffness: 550, damping: 30 }}
            >
              {/* Animated Checkmark */}
              <div className="absolute top-3 right-3">
                <div className="w-5 h-5 relative rounded-md border-2 border-[#4CA3CB]/30 flex-shrink-0 overflow-hidden">
                  {/* Fill animation */}
                  <motion.div
                    className="absolute inset-0 bg-[#4CA3CB] rounded-sm flex items-center justify-center"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{
                      opacity: isSelected ? 1 : 0,
                      scale: isSelected ? 1 : 0.5,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 25,
                      duration: 0.5
                    }}
                  >
                    {/* Checkmark SVG */}
                    <svg
                      className="w-3 h-3"
                      viewBox="0 0 16 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <motion.path
                        d="M2 6L6 10L14 2"
                        stroke="#fff"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                        pathLength={1}
                        initial={{ strokeDasharray: "1 1", strokeDashoffset: 1 }}
                        animate={{
                          strokeDashoffset: isSelected ? 0 : 1
                        }}
                        transition={{
                          type: "easeOut",
                          duration: 0.1,
                          delay: isSelected ? 0.1 : 0
                        }}
                      />
                    </svg>
                  </motion.div>
                </div>
              </div>

              {/* Icon */}
              <div className="mb-4 text-center select-none pointer-events-none">
                <div className="w-16 h-16 mx-auto flex items-center justify-center">
                  <img
                    src={type.svgPath}
                    alt={type.label}
                    className="w-full h-full object-contain select-none"
                    style={{
                      filter: isSelected
                        ? 'brightness(0) saturate(100%) invert(63%) sepia(67%) saturate(434%) hue-rotate(158deg) brightness(91%) contrast(88%)'
                        : 'brightness(0) saturate(100%) invert(70%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)'
                    }}
                    draggable={false}
                  />
                </div>
              </div>

              {/* Label */}
              <h3 className="text-center font-medium text-gray-900 text-sm select-none pointer-events-none">
                {type.label}
              </h3>
            </motion.div>
          );
        })}
      </div>

      {/* Number of cards slider */}
      <div className="mb-12">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
          Number of cards
        </h3>

        <CustomSlider
          value={numberOfCards}
          onChange={setNumberOfCards}
          min={0}
          max={maxPro}
          freeLimit={maxFree}
        />
      </div>

      {/* Generate Deck button */}
      <div className="text-center">
        <button
          onClick={nextStep}
          disabled={!canProceedFromCustomize}
          className={`px-8 py-3 rounded-2xl font-medium text-lg transition-all duration-200 ${
            canProceedFromCustomize
              ? 'bg-[#007CB5] text-white cursor-pointer'
              : 'bg-gray-300 dark:bg-gray-600 text-gray-500 cursor-not-allowed'
          }`}
        >
          Generate Deck →
        </button>
      </div>

      {/* Pro Limit Modal */}
      <ProLimitModal
        isOpen={showProModal}
        onClose={closeProModal}
        onUpgrade={handleUpgrade}
      />
    </div>
  );
}