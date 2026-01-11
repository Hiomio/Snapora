"use client"
import { useState, useRef, useEffect } from 'react';
import { AlertCircle } from 'lucide-react';
import { useApi } from '@/hooks/useApi';
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';

import {
  UploadHeader,
  ProgressSteps,
  FileUpload,
  ImageDetails,
  PublishingSettings,
  UploadSuccess,
  UploadSummary,
  NavigationButtons,
  StorageLimitWarning
} from './components';

const ImageUpload = () => {
  const api = useApi();
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const initialCollectionId = searchParams.get('collection');
  
  const [files, setFiles] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedVisibility, setSelectedVisibility] = useState('public');
  const [selectedTags, setSelectedTags] = useState([]);
  const [inputTag, setInputTag] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [selectedCollectionId, setSelectedCollectionId] = useState(null);
  const [collections, setCollections] = useState([]);
  const [loadingCollections, setLoadingCollections] = useState(false);
  const fileInputRef = useRef(null);
  const [isStorageFull, setIsStorageFull] = useState(false);

  const [imageDetails, setImageDetails] = useState({
    title: '',
    description: '',
    category: 'portrait',
    license: 'standard'
  });
  const [commentsAllowed, setCommentsAllowed] = useState(true);

  const categories = [
    { id: 'abstract', name: 'Abstract' },
    { id: 'portrait', name: 'Portrait' },
    { id: 'landscape', name: 'Landscape' },
    { id: 'cyberpunk', name: 'Cyberpunk' },
    { id: 'minimal', name: 'Minimal' },
    { id: 'other', name: 'Other' },
  ];

  const licenses = [
    { id: 'standard', name: 'Standard License', description: 'For personal and commercial use' },
    { id: 'extended', name: 'Extended License', description: 'For extensive commercial projects' },
  ];

  const suggestedTags = ['photography', 'digital art', 'graphic design', 'illustration', 'abstract', 'minimalism', '3d render'];

  // Fetch user collections on mount
  useEffect(() => {
    const fetchUserCollections = async () => {
      try {
        setLoadingCollections(true);
        const response = await api.get('/api/collections');
        
        if (response.data.success) {
          setCollections(response.data.data);
          // If there's a collection ID in the URL, select it
          if (initialCollectionId) {
            setSelectedCollectionId(initialCollectionId);
          }
        }
      } catch (error) {
        console.error("Failed to fetch collections:", error);
      } finally {
        setLoadingCollections(false);
      }
    };
    
    fetchUserCollections();
  }, [initialCollectionId]);

  const handleFiles = async (fileList) => {
    try {
      setUploadError(null);

      const filesArray = Array.from(fileList).map(file => ({
        file,
        preview: URL.createObjectURL(file),
        name: file.name,
        size: (file.size / 1024 / 1024).toFixed(2), // in MB
        progress: 0,
        uploading: true,
        error: null,
        uploaded: false,
        publicId: null,
        cloudinaryUrl: null
      }));

      setFiles(prev => [...prev, ...filesArray]);

      // Move to step 2 immediately after choosing files
      if (currentStep === 1) {
        setCurrentStep(2);
      }

      // Start uploading each file to Cloudinary in the background
      for (let i = 0; i < filesArray.length; i++) {
        const file = filesArray[i];

        try {
          // Create FormData for the file
        const formData = new FormData();
          formData.append('image', file.file);

          // Simulate progress
          const updateProgress = () => {
            setFiles(prev =>
              prev.map((f, idx) => {
                if (idx === prev.length - filesArray.length + i && f.progress < 90) {
                  return { ...f, progress: f.progress + 10 };
                }
                return f;
              })
            );
          };

          // Update progress every 300ms
          const progressInterval = setInterval(updateProgress, 300);

          try {
            // Use fetch instead of axios for file upload
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API || 'http://localhost:5000'}/api/images/upload-temp`, {
            method: 'POST',
            headers: {
                // Don't set Content-Type with FormData - fetch sets it automatically with boundary
              Authorization: session?.backendToken ? `Bearer ${session.backendToken}` : '',
            },
              credentials: 'include',
              body: formData
          });

            clearInterval(progressInterval);

          if (!response.ok) {
              const errorData = await response.json();
              throw new Error(errorData.message || 'Failed to upload image');
            }

            const data = await response.json();

            // Update file with Cloudinary info
            setFiles(prev => prev.map((f, index) => {
              if (index === prev.length - filesArray.length + i) {
                return {
                  ...f,
                  progress: 100,
                uploading: false,
                uploaded: true,
                  publicId: data.data.publicId,
                  cloudinaryUrl: data.data.imageUrl,
                  imageSize: data.data.imageSize
              };
            }
              return f;
            }));
          } catch (error) {
            clearInterval(progressInterval);
            throw error;
          }
        } catch (error) {
          console.error('Pre-upload error:', error);

          if (error.message.includes('Storage limit reached')) {
            setIsStorageFull(true);
            setUploadError(error.message);
          }
          
          // Update file with error
          setFiles(prev => prev.map((f, index) => {
            if (index === prev.length - filesArray.length + i) {
              return {
                ...f,
                progress: 0,
                uploading: false,
                error: error.message || 'Upload failed'
              };
            }
            return f;
          }));
        }
      }
    } catch (error) {
      console.error('Error processing files:', error);
      setUploadError(error.message || 'Error processing files');
    }
  };

  const removeFile = async (index) => {
    const file = files[index];

    // Delete from Cloudinary if it was uploaded successfully
    if (file.publicId) {
      try {
        await api.delete(`/api/images/cloudinary/${file.publicId}`);

      } catch (error) {
        console.error('Error deleting from Cloudinary:', error);
      }
    }

    // Remove from state
    const newFiles = [...files];
    URL.revokeObjectURL(newFiles[index].preview); // Clean up object URL
    newFiles.splice(index, 1);
    setFiles(newFiles);

    if (newFiles.length === 0 && currentStep > 1) {
      setCurrentStep(1);
    }
  };

  const uploadToServer = async () => {
    try {
      setIsUploading(true);
      setUploadError(null);

      if (files.length === 0) {
        throw new Error("Please select at least one image");
      }

      if (!imageDetails.title || !imageDetails.description) {
        throw new Error("Title and description are required");
      }

      // Check if file was successfully pre-uploaded
      if (!files[0].publicId || !files[0].cloudinaryUrl) {
        throw new Error("Image was not properly uploaded. Please try again.");
      }

      // Create a request body with the image details
      const imageData = {
        publicId: files[0].publicId,
        imageUrl: files[0].cloudinaryUrl,
        title: imageDetails.title,
        description: imageDetails.description,
        category: imageDetails.category,
        license: imageDetails.license,
        visibility: selectedVisibility,
        imageSize: files[0].imageSize,
        commentsAllowed: commentsAllowed,
        tags: selectedTags.length > 0 ? selectedTags : undefined,
        collectionId: selectedCollectionId
      };

      try {
        // Use fetch for saving details too
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API || 'http://localhost:5000'}/api/images/save-details`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: session?.backendToken ? `Bearer ${session.backendToken}` : '',
          },
          credentials: 'include',
          body: JSON.stringify(imageData)
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to save image details');
        }

        // Add to collection if selected
        const result = await response.json();
        const imageId = result.data._id;
        
        if (selectedCollectionId && imageId) {
          try {
            await api.post(`/api/collections/${selectedCollectionId}/images/${imageId}`);
          } catch (error) {
            console.error('Error adding to collection:', error);
            // Don't fail the entire upload if just adding to collection fails
          }
        }

        setCurrentStep(4); // Move to success step
      } catch (error) {
        throw error;
      }
    } catch (error) {
      console.error('Upload error:', error);
      setUploadError(error.message || 'Failed to save image details');
    } finally {
      setIsUploading(false);
    }
  };

  const handleNextStep = () => {
    if (currentStep < 4) {
      // Add validation for step 2
      if (currentStep === 2 && (!imageDetails.title.trim() || !imageDetails.description.trim())) {
        // Show error or validation message
        setUploadError("Please provide both title and description before continuing");
        return;
      }

      setCurrentStep(currentStep + 1);

      if (currentStep === 3) {
        uploadToServer();
      }
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setImageDetails({ ...imageDetails, [name]: value });

    // Clear error when user types in title or description
    if ((name === 'title' || name === 'description') && uploadError) {
      setUploadError(null);
    }
  };

  const resetUpload = () => {
    // Clean up file preview URLs
    files.forEach(file => {
      URL.revokeObjectURL(file.preview);
    });

    setFiles([]);
    setCurrentStep(1);
    setSelectedTags([]);
    setSelectedCollectionId(initialCollectionId); // Reset to initial if provided in URL
    setImageDetails({
      title: '',
      description: '',
      category: 'portrait',
      license: 'standard'
    });
  };

  return (
    <div className="p-4 sm:p-6">
      <UploadHeader />
      <ProgressSteps currentStep={currentStep} />
      <StorageLimitWarning isStorageFull={isStorageFull} />

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
        <div className="lg:col-span-8">
          {/* Step 1: File Upload */}
          {currentStep === 1 && (
            <FileUpload
              files={files}
              setFiles={setFiles}
              handleNextStep={handleNextStep}
              dragActive={dragActive}
              setDragActive={setDragActive}
              setCurrentStep={setCurrentStep}
              handleFiles={handleFiles}
              removeFile={removeFile}
              uploadError={uploadError}
            />
          )}

          {/* Step 2: Image Details */}
          {currentStep === 2 && (
            <ImageDetails
              imageDetails={imageDetails}
              handleChange={handleChange}
              files={files}
              selectedTags={selectedTags}
              setSelectedTags={setSelectedTags}
              inputTag={inputTag}
              setInputTag={setInputTag}
              uploadError={uploadError}
              removeFile={removeFile}
              suggestedTags={suggestedTags}
              categories={categories}
              collections={collections}
              loadingCollections={loadingCollections}
              selectedCollectionId={selectedCollectionId}
              setSelectedCollectionId={setSelectedCollectionId}
            />
          )}

          {/* Step 3: Final Settings */}
          {currentStep === 3 && (
            <PublishingSettings
              selectedVisibility={selectedVisibility}
              setSelectedVisibility={setSelectedVisibility}
              imageDetails={imageDetails}
              handleChange={handleChange}
              commentsAllowed={commentsAllowed}
              setCommentsAllowed={setCommentsAllowed}
              licenses={licenses}
              uploadError={uploadError}
            />
          )}

        </div>

        <div className="lg:col-span-4">
          {/* Right sidebar */}
          {currentStep < 4 && (
            <UploadSummary
              files={files}
              imageDetails={imageDetails}
              selectedVisibility={selectedVisibility}
              categories={categories}
              licenses={licenses}
              selectedCollectionId={selectedCollectionId}
              collections={collections}
            />
          )}
        </div>
      </div>
      
      {/* Step 4: Complete */}
      {currentStep === 4 && (
        <UploadSuccess resetUpload={resetUpload} />
      )}

      {/* Error display for step 3 and general errors */}
      {uploadError && currentStep !== 2 && currentStep !== 1 && (
        <div className="mt-4 p-3 sm:p-4 bg-red-500/20 border border-red-600 rounded-lg flex flex-wrap items-center gap-2">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
          <p className="text-red-100 text-sm sm:text-base">{uploadError}</p>
        </div>
      )}

      {/* Navigation Buttons */}
      <NavigationButtons
        currentStep={currentStep}
        handlePrevStep={handlePrevStep}
        handleNextStep={handleNextStep}
        files={files}
        isUploading={isUploading}
        isStorageFull={isStorageFull}
        imageDetails={imageDetails}
      />
    </div>
  );
};

export default ImageUpload;