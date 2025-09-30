"use client";

import { useState } from 'react';

const cleanFileName = (fileName) => {
  // Remove file extension
  const nameWithoutExt = fileName.replace(/\.[^/.]+$/, '');

  // Replace underscores, hyphens, and other symbols with spaces
  let cleaned = nameWithoutExt.replace(/[_\-]+/g, ' ');

  // Remove any other special characters except spaces (numbers removed here)
  cleaned = cleaned.replace(/[^a-zA-Z\s]/g, '');

  // Remove extra spaces and trim
  cleaned = cleaned.replace(/\s+/g, ' ').trim();

  return cleaned;
};

export const useImportFlow = () => {
  const [currentStep, setCurrentStep] = useState('upload');
  const [previousStep, setPreviousStep] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [pastedLink, setPastedLink] = useState('');
  const [selectedQuestionTypes, setSelectedQuestionTypes] = useState([]);
  const [numberOfCards, setNumberOfCards] = useState(20);
  const [deckName, setDeckName] = useState('');
  const [topicTag, setTopicTag] = useState('');
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [showProModal, setShowProModal] = useState(false);

  const nextStep = () => {
    // Check if user exceeds pro limit when trying to generate deck
    if (currentStep === 'customize' && numberOfCards > 50) {
      setShowProModal(true);
      setNumberOfCards(50);
      return;
    }

    setPreviousStep(currentStep);
    switch (currentStep) {
      case 'upload':
        setCurrentStep('customize');
        break;
      case 'customize':
        setCurrentStep('loading');
        // Delay simulateLoading to allow transition to complete
        setTimeout(() => {
          simulateLoading();
        }, 300);
        break;
      case 'loading':
        setCurrentStep('ready');
        break;
      default:
        break;
    }
  };

  const handleUpgrade = () => {
    setShowProModal(false);
    // TODO: Navigate to upgrade/payment page
    console.log('Upgrade to PRO');
  };

  const closeProModal = () => {
    setShowProModal(false);
  };

  const goToUpload = () => {
    setPreviousStep(currentStep);
    setCurrentStep('upload');
    // Reset form state
    setUploadedFile(null);
    setPastedLink('');
    setSelectedQuestionTypes([]);
    setNumberOfCards(20);
    setDeckName('');
    setTopicTag('');
    setLoadingProgress(0);
  };

  const simulateLoading = () => {
    setLoadingProgress(0);
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setCurrentStep('ready'), 500);
          return 100;
        }
        return prev + 2;
      });
    }, 100);
  };

  const handleFileUpload = (file) => {
    setUploadedFile(file);
    setPastedLink(''); // Clear link if file is uploaded
    // Set deck name from cleaned file name if not already set
    if (!deckName && file?.name) {
      const cleanedName = cleanFileName(file.name);
      setDeckName(cleanedName);
    }
  };

  const handleLinkPaste = (link) => {
    setPastedLink(link);
    setUploadedFile(null); // Clear file if link is pasted
  };

  const toggleQuestionType = (type) => {
    setSelectedQuestionTypes(prev => {
      if (prev.includes(type)) {
        return prev.filter(t => t !== type);
      } else {
        return [...prev, type];
      }
    });
  };

  const selectAllQuestionTypes = () => {
    const allTypes = ['simple-flashcard', 'cloze-flashcard', 'multiple-choice', 'drag-drop', 'typing', 'image-occlusion'];
    const allSelected = selectedQuestionTypes.length === allTypes.length;

    if (allSelected) {
      setSelectedQuestionTypes([]);
    } else {
      setSelectedQuestionTypes(allTypes);
    }
  };

  const canProceedFromUpload = uploadedFile || pastedLink.trim();
  const canProceedFromCustomize = selectedQuestionTypes.length > 0;

  return {
    // State
    currentStep,
    previousStep,
    uploadedFile,
    pastedLink,
    selectedQuestionTypes,
    numberOfCards,
    deckName,
    topicTag,
    loadingProgress,
    showProModal,

    // Actions
    nextStep,
    handleFileUpload,
    handleLinkPaste,
    toggleQuestionType,
    selectAllQuestionTypes,
    setNumberOfCards,
    setDeckName,
    setTopicTag,
    handleUpgrade,
    closeProModal,
    goToUpload,

    // Validation
    canProceedFromUpload,
    canProceedFromCustomize
  };
};