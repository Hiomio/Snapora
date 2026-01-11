"use client";
import Link from 'next/link';
import React from 'react';

const StorageUsage = ({ user }) => {
  const storageUsedKB = user?.storageUsed || 0;
  const totalStorageKB = 10240; // 10 MB in KB (adjust this if your storage is different)

  const storageUsedMB = (storageUsedKB / 1024).toFixed(2);
  const totalStorageMB = (totalStorageKB / 1024).toFixed(2);

  const percentageUsed = Math.min((storageUsedKB / totalStorageKB) * 100, 100).toFixed(0); // Clamp to 100%

  return (
    <div className="rounded-xl bg-zinc-900/60 border border-white/10 p-4 sm:p-6">
      <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4">Storage Usage</h3>
      <div className="mb-3 sm:mb-4">
        <div className="flex justify-between text-xs sm:text-sm mb-1">
          <span className="text-gray-400">{storageUsedMB} MB / {totalStorageMB} MB Used</span>
          <span className="text-violet-400">{percentageUsed}%</span>
        </div>
        <div className="w-full bg-white/10 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-violet-600 to-fuchsia-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${percentageUsed}%` }}
          ></div>
        </div>
      </div>
      <Link href="/settings" className="w-full text-center text-xs sm:text-sm text-violet-400 hover:text-violet-300">
        Upgrade for more storage
      </Link>
    </div>
  );
};

export default StorageUsage;