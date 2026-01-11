"use client"
import { ArrowLeft } from 'lucide-react';

const UploadHeader = () => {
  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center">
        <button
          onClick={() => window.history.back()}
          className="mr-4 p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl font-bold">Upload New Images</h1>
      </div>
    </div>
  );
};

export default UploadHeader; 