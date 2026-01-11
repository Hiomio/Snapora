"use client"
import { EyeIcon, Lock, Users, FileCheck, Tag, FolderPlus } from 'lucide-react';

const UploadSummary = ({ 
  files,
  imageDetails,
  selectedVisibility, 
  categories,
  licenses,
  selectedCollectionId,
  collections
}) => {
  // Helper functions
  const getCategoryName = (id) => {
    const category = categories.find(cat => cat.id === id);
    return category ? category.name : '';
  };

  const getLicenseName = (id) => {
    const license = licenses.find(lic => lic.id === id);
    return license ? license.name : '';
  };

  const getCollectionInfo = () => {
    if (!selectedCollectionId) return null;
    const collection = collections.find(c => c._id === selectedCollectionId);
    return collection ? collection : null;
  };

  const getVisibilityInfo = () => {
    switch(selectedVisibility) {
      case 'public':
        return { icon: <EyeIcon className="w-4 h-4 text-green-400" />, name: 'Public' };
      case 'private':
        return { icon: <Lock className="w-4 h-4 text-amber-400" />, name: 'Private' };
      case 'followers':
        return { icon: <Users className="w-4 h-4 text-blue-400" />, name: 'Followers Only' };
      default:
        return { icon: <EyeIcon className="w-4 h-4" />, name: 'Public' };
    }
  };

  // Do not display the summary if there are no files
  if (files.length === 0) {
    return null;
  }

  const collection = getCollectionInfo();
  const visibilityInfo = getVisibilityInfo();

  return (
    <div className="bg-zinc-900/60 border border-white/10 rounded-xl p-4 sm:p-6 sticky top-4 sm:top-6">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl font-bold">Upload Summary</h2>
        <button className="md:hidden text-sm text-violet-400 hover:text-violet-300">
          View Summary
        </button>
      </div>
      
      <div className="space-y-4 sm:space-y-5">
        <div>
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-sm text-gray-400">File Status</h3>
            <span className="text-xs bg-violet-600/20 text-violet-400 py-1 px-2.5 rounded-full">
              {files.every(f => f.uploaded) ? 'Ready to Publish' : 'Processing...'}
            </span>
          </div>
          
          <div className="space-y-2">
            {files.map((file, index) => (
              <div 
                key={index} 
                className="flex items-center gap-2 sm:gap-3 p-2.5 rounded-lg bg-zinc-800/50"
              >
                <div className="w-12 h-12 sm:w-10 sm:h-10 rounded-lg overflow-hidden bg-zinc-700 flex-shrink-0">
                  <img 
                    src={file.preview} 
                    alt={file.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm truncate">{file.name}</p>
                  <p className="text-xs text-gray-400">{file.size} MB</p>
                </div>
                <div className="flex-shrink-0">
                  {file.error ? (
                    <span className="text-red-400 text-xs">Error</span>
                  ) : file.uploaded ? (
                    <FileCheck className="w-5 h-5 sm:w-4 sm:h-4 text-green-400" />
                  ) : (
                    <div className="w-5 h-5 sm:w-4 sm:h-4 border-2 border-t-transparent border-violet-500 rounded-full animate-spin"></div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-4">
          <h3 className="text-sm text-gray-400 mb-2 sm:mb-3">Image Details</h3>
          
          <div className="space-y-3">
            {imageDetails.title && (
              <div>
                <h4 className="text-xs text-gray-400 mb-0.5 sm:mb-1">Title</h4>
                <p className="text-xs sm:text-sm">{imageDetails.title}</p>
              </div>
            )}
            
            {imageDetails.category && (
              <div>
                <h4 className="text-xs text-gray-400 mb-0.5 sm:mb-1">Category</h4>
                <p className="text-xs sm:text-sm">{getCategoryName(imageDetails.category)}</p>
              </div>
            )}
            
            {imageDetails.license && (
              <div>
                <h4 className="text-xs text-gray-400 mb-0.5 sm:mb-1">License</h4>
                <p className="text-xs sm:text-sm">{getLicenseName(imageDetails.license)}</p>
              </div>
            )}
            
            {collection && (
              <div>
                <h4 className="text-xs text-gray-400 mb-0.5 sm:mb-1 flex items-center gap-1">
                  <FolderPlus className="w-3 h-3 text-violet-400" />
                  Collection
                </h4>
                <p className="text-xs sm:text-sm">{collection.name}</p>
              </div>
            )}
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-4">
          <h3 className="text-sm text-gray-400 mb-2 sm:mb-3">Publishing Settings</h3>
          
          <div className="space-y-2 sm:space-y-3">
            <div className="flex items-center gap-2">
              {visibilityInfo.icon}
              <span className="text-xs sm:text-sm">{visibilityInfo.name}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadSummary; 