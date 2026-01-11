"use client"

const NavigationButtons = ({ 
  currentStep, 
  handlePrevStep, 
  handleNextStep, 
  files, 
  isUploading, 
  isStorageFull,
  imageDetails
}) => {
  const isDisabled = files.length === 0 || 
    isUploading || 
    isStorageFull || 
    (files.length > 0 && files.some(f => f.error)) || 
    (currentStep === 2 && (!imageDetails.title || !imageDetails.description));

  if (currentStep >= 4) return null;

  return (
    <div className="mt-8 flex justify-between">
      <button
        onClick={handlePrevStep}
        disabled={currentStep === 1 || isUploading}
        className={`py-2.5 px-6 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
          currentStep === 1 || isUploading
            ? 'bg-zinc-800/50 text-gray-500 cursor-not-allowed'
            : 'bg-white/10 hover:bg-white/20 text-white'
        }`}
      >
        Back
      </button>

      <button
        onClick={handleNextStep}
        disabled={isDisabled}
        className={`py-2.5 px-6 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
          isDisabled
            ? 'bg-zinc-800/50 text-gray-500 cursor-not-allowed'
            : 'bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white'
        }`}
      >
        {isUploading ? 'Uploading...' : currentStep === 3 ? 'Upload Now' : 'Continue'}
        {isStorageFull && ' (Upgrade Required)'}
      </button>
    </div>
  );
};

export default NavigationButtons; 