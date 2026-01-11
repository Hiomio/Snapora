import React from 'react';
import { Info } from 'lucide-react';

const TechnicalDetails = ({ image }) => {
  return (
    <div className="rounded-xl bg-zinc-900/60 border border-white/10 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold">Technical Details</h3>
        <Info className="w-5 h-5 text-gray-400" />
      </div>

      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Category</span>
          <span>{image.category || 'Not specified'}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Dimensions</span>
          <span>-</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">File Size</span>
          <span>{image.imageSize ? `${image.imageSize} KB` : '-'}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Software</span>
          <span>-</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Format</span>
          <span>JPEG</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Visibility</span>
          <span className="capitalize">{image.visibility}</span>
        </div>
      </div>
    </div>
  );
};

export default TechnicalDetails; 