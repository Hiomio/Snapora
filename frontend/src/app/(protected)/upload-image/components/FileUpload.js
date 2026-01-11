"use client"
import { useRef, useState } from 'react';
import { Upload, ImageIcon, Eye, Info, Sparkles, HelpCircle, X, AlertCircle } from 'lucide-react';
import { useSession } from 'next-auth/react';

const FileUpload = ({ 
  files, 
  setFiles, 
  handleNextStep, 
  dragActive, 
  setDragActive, 
  setCurrentStep, 
  handleFiles,
  removeFile,
  uploadError
}) => {
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  return (
    <div className="bg-zinc-900/60 border border-white/10 rounded-xl p-4 sm:p-6">
      <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">Select Images to Upload</h2>

      <div
        className={`border-2 border-dashed rounded-xl p-6 sm:p-10 flex flex-col items-center justify-center ${
          dragActive ? 'border-violet-500 bg-violet-900/20' : 'border-white/20 hover:border-violet-500/50'
        } transition-all duration-300 cursor-pointer`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />

        <div className="p-4 bg-white/5 rounded-full mb-4">
          <Upload className="w-8 h-8 text-violet-400" />
        </div>

        <h3 className="text-base sm:text-lg font-medium mb-2 text-center">Drag & Drop your images here</h3>
        <p className="text-gray-400 text-center mb-4 sm:mb-6 max-w-md text-sm sm:text-base">
          Upload high-quality images in JPG, PNG, or WebP format.
          Maximum file size: 15MB per image.
        </p>

        <button className="w-full sm:w-auto py-2.5 px-6 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 rounded-lg text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2">
          <ImageIcon className="w-4 h-4" />
          Browse Files
        </button>
      </div>

      {files.length > 0 && (
        <div className="mt-4 sm:mt-6 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
          {files.map((file, index) => (
            <div key={index} className="relative group touch-manipulation">
              <div className="aspect-square rounded-lg overflow-hidden bg-zinc-800 border border-white/10">
                <img
                  src={file.preview}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                
                {/* Show upload status indicator */}
                {file.uploading && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <div className="w-8 h-8 border-2 border-t-transparent border-violet-500 rounded-full animate-spin"></div>
                  </div>
                )}
                
                {file.error && (
                  <div className="absolute inset-0 bg-red-900/70 flex items-center justify-center">
                    <AlertCircle className="w-8 h-8 text-red-300" />
                  </div>
                )}
              </div>

              <button
                onClick={() => removeFile(index)}
                className="absolute top-2 right-2 p-2 sm:p-1.5 bg-black/50 backdrop-blur-sm rounded-full opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"
              >
                <X className="w-5 h-5 sm:w-4 sm:h-4" />
              </button>

              <div className="text-xs text-gray-400 mt-1 truncate">
                {file.name} ({file.size} MB)
                {file.error && <span className="text-red-400 ml-1">- {file.error}</span>}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 sm:mt-8">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <h3 className="font-medium text-sm sm:text-base">Upload Guidelines</h3>
          <button className="text-violet-400 text-xs sm:text-sm flex items-center gap-1">
            <HelpCircle className="w-4 h-4" />
            Help
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
          {[
            { title: 'High Quality', description: 'Minimum 1200px on the longest side', icon: <Eye /> },
            { title: 'Original Content', description: 'Must own rights to the content', icon: <Info /> },
            { title: 'Be Creative', description: 'Showcase your unique perspective', icon: <Sparkles /> }
          ].map((guideline, idx) => (
            <div key={idx} className="bg-white/5 rounded-lg p-3 sm:p-4">
              <div className="flex items-start gap-2 sm:gap-3">
                <div className="p-2 bg-white/10 rounded-lg">
                  {guideline.icon}
                </div>
                <div>
                  <h4 className="font-medium text-sm">{guideline.title}</h4>
                  <p className="text-xs text-gray-400 mt-1">{guideline.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Error display */}
      {uploadError && (
        <div className="mt-4 p-4 bg-red-500/20 border border-red-600 rounded-lg flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-red-500" />
          <p className="text-red-100">{uploadError}</p>
        </div>
      )}
    </div>
  );
};

export default FileUpload; 