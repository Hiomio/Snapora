"use client"
import Link from 'next/link';
import { AlertCircle } from 'lucide-react';

const StorageLimitWarning = ({ isStorageFull }) => {
  if (!isStorageFull) return null;

  return (
    <div className="mb-6 p-4 bg-yellow-500/20 border border-yellow-600 rounded-lg">
      <div className="flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-yellow-500 mt-0.5" />
        <div>
          <h3 className="font-medium text-lg text-yellow-200">Storage Limit Reached</h3>
          <p className="text-yellow-100 mt-1">
            You&apos;ve reached your 10MB storage limit. Upgrade to premium to unlock unlimited storage and continue uploading your images.
          </p>
          <Link
            href="/settings"
            className="mt-3 inline-block py-2 px-4 bg-gradient-to-r from-yellow-500 to-amber-600 rounded-lg text-sm font-medium"
          >
            Upgrade to Premium
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StorageLimitWarning; 