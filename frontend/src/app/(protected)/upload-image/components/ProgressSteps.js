"use client"
import { CheckCircle } from 'lucide-react';

const ProgressSteps = ({ currentStep }) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between relative max-w-2xl mx-auto">
        <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-white/10 -translate-y-1/2 z-0"></div>

        {[1, 2, 3, 4].map((step) => (
          <div key={step} className="relative z-10 flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentStep >= step
                  ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600'
                  : 'bg-white/10'
              }`}
            >
              {currentStep > step ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                <span className="text-sm">{step}</span>
              )}
            </div>
            <span className="text-xs mt-2 text-gray-400">
              {step === 1 ? 'Select Files' :
                step === 2 ? 'Image Details' :
                  step === 3 ? 'Final Settings' : 'Complete'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressSteps; 