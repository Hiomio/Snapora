"use client"
import Link from 'next/link';
import { CheckCircle, Grid, Upload } from 'lucide-react';

const UploadSuccess = ({ resetUpload }) => {
  return (
    <div className="bg-zinc-900/60 border border-white/10 rounded-xl p-10 text-center mx-auto max-w-4xl">
      <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle className="w-8 h-8" />
      </div>

      <h2 className="text-2xl font-bold mb-3">Upload Complete!</h2>
      <p className="text-gray-300 mb-8 max-w-md mx-auto">
        Your images have been successfully uploaded and are now being processed. They&apos;ll be available on your profile shortly. Thank you for contributing to our community!
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link 
          href={"/feed"} 
          className="py-2.5 px-6 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 rounded-lg text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2"
        >
          <Grid className="w-4 h-4" />
          Go to My Gallery
        </Link>
        <button
          onClick={resetUpload}
          className="py-2.5 px-6 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2"
        >
          <Upload className="w-4 h-4" />
          Upload More Images
        </button>
      </div>
    </div>
  );
};

export default UploadSuccess; 