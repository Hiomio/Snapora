"use client"
import React, { useState, useEffect, useRef } from 'react'
import { IoImageOutline, IoImageSharp, IoCheckmarkCircle, IoLink, IoGrid } from 'react-icons/io5';
import { CiImageOn } from "react-icons/ci";
import { BiX } from 'react-icons/bi';
import { FiSearch, FiZoomIn, FiLink } from 'react-icons/fi';
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from '@/context/AuthContext';

const profilePictures = [
  "/images/default-profile.jpg",
  "https://res.cloudinary.com/datvbo0ey/image/upload/v1726651745/3d%20avatar/1_ijpza2.png",
  "https://res.cloudinary.com/datvbo0ey/image/upload/v1743937605/3d%20avatar/3d-avatar-boy-character_914455-603_lqwciz.avif",
  "https://res.cloudinary.com/datvbo0ey/image/upload/v1726651746/3d%20avatar/8_ff3tta.png",
  "https://res.cloudinary.com/datvbo0ey/image/upload/v1726651745/3d%20avatar/3_bmxh2t.png",
  "https://res.cloudinary.com/datvbo0ey/image/upload/v1726651746/3d%20avatar/9_s4mvtd.png",
  "https://res.cloudinary.com/datvbo0ey/image/upload/v1726651746/3d%20avatar/7_uimci3.png",
  "https://res.cloudinary.com/datvbo0ey/image/upload/v1726651745/3d%20avatar/4_d2vuip.png",
  "https://res.cloudinary.com/datvbo0ey/image/upload/v1726651746/3d%20avatar/5_xhf1vy.png",
  "https://res.cloudinary.com/datvbo0ey/image/upload/v1726651746/3d%20avatar/6_pksp2n.png",
];

const ProfilePicVerify = ({ isOpen, onClose = () => {} }) => {
  const { user, loading, isAuthenticated, updateProfile } = useAuth();
  const assignedProfilePicture = profilePictures.find((pic) => pic === user?.profilePicture) || "/images/default-profile.jpg";
  
  const [currentPic, setCurrentPic] = useState(assignedProfilePicture);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(
    profilePictures.findIndex(pic => pic === assignedProfilePicture)
  );
  const [showPreview, setShowPreview] = useState(false);
  const [activeTab, setActiveTab] = useState('gallery');
  const [customImageUrl, setCustomImageUrl] = useState('');
  const [customImageError, setCustomImageError] = useState('');
  const [isCustomImageValid, setIsCustomImageValid] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  
  const previewRef = useRef(null);

  const handleSave = async () => {
    try {
      setIsLoading(true);
      await updateProfile(user._id, {
        profilePicture: currentPic,
        isDpConfirm: true,
      });
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose(); // Close the modal after saving
      }, 2000);
    } catch (error) {
      console.error("Error updating user details:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePictureSelect = (pic, index) => {
    setCurrentPic(pic);
    setSelectedIndex(index);
    setCustomImageError('');
  };

  const togglePreview = () => {
    setShowPreview(!showPreview);
  };

  const handleCustomImageSubmit = () => {
    if (!customImageUrl.trim()) {
      setCustomImageError('Please enter an image URL');
      return;
    }

    // Basic URL validation
    if (!/^https?:\/\/.+\.(jpg|jpeg|png|webp|gif|svg)(\?.*)?$/i.test(customImageUrl)) {
      setCustomImageError('Please enter a valid image URL (jpg, png, webp, gif)');
      return;
    }

    setIsCustomImageValid(true);
    setCurrentPic(customImageUrl);
    setCustomImageError('');
  };

  // Close preview when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (showPreview && previewRef.current && !previewRef.current.contains(e.target)) {
        setShowPreview(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showPreview]);

  // Test an image URL
  const testImageUrl = (url) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = url;
    });
  };

  // Validate custom image URL
  useEffect(() => {
    if (customImageUrl) {
      const timer = setTimeout(async () => {
        const isValid = await testImageUrl(customImageUrl);
        setIsCustomImageValid(isValid);
        if (!isValid && customImageUrl.trim() !== '') {
          setCustomImageError('Unable to load this image. Please check the URL.');
        } else {
          setCustomImageError('');
        }
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [customImageUrl]);

  // Handle drag events for custom image URL
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      // In a real implementation, you would upload this file to your server/storage
      // For now, we'll just show a mock success message
      setCustomImageError('Note: In this demo, we cannot process dropped files. Please use a URL instead.');
    }
  };

  if (loading || !user || !isAuthenticated || !isOpen) return null;
  
  return (
    <AnimatePresence>
      <motion.div 
        className='h-screen w-screen fixed z-30 bg-black/90 top-0 left-0 flex items-center justify-center backdrop-blur-md'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div 
          className="w-full max-w-xl bg-gray-900 rounded-3xl shadow-2xl p-8 relative overflow-hidden border border-gray-800"
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ type: "spring", damping: 25 }}
        >
          {/* Decorative gradients */}
          <div className="absolute -top-20 -left-20 w-40 h-40 rounded-full bg-indigo-600/20 blur-3xl"></div>
          <div className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full bg-purple-600/20 blur-3xl"></div>
          
          <div className="absolute top-4 right-4 z-10">
            <motion.button 
              onClick={onClose} // Close the modal when the button is clicked
              className='p-2 rounded-full hover:bg-gray-800/50 transition-colors text-gray-400 hover:text-gray-200'
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.95 }}
            >
              <BiX size={24} />
            </motion.button>
          </div>

          <div className="flex items-center mb-8">
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.05 }}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
            >
              <div className="group relative">
                <motion.div
                  className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 opacity-75 blur-sm group-hover:opacity-100 transition duration-300"
                  animate={{ 
                    rotate: 360,
                  }}
                  transition={{ 
                    duration: 6, 
                    repeat: Infinity,
                    ease: "linear" 
                  }}
                ></motion.div>
                <img 
                  src={currentPic} 
                  alt="Selected avatar" 
                  className="h-20 w-20 rounded-full border-2 border-indigo-500 shadow-lg object-cover relative z-10" 
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = assignedProfilePicture;
                    setCustomImageError('Failed to load this image. Please try another URL.');
                  }}
                />
              </div>
              <motion.div 
                className="absolute -bottom-1 -right-1 bg-indigo-600 text-white p-1 rounded-full z-20"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <IoCheckmarkCircle size={16} />
              </motion.div>
            </motion.div>
            <div className="ml-5">
              <h2 className='font-bold text-2xl mb-1 text-white bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent'>Choose Your Avatar</h2>
              <p className="text-gray-400 text-sm">Pick a profile picture that represents you</p>
            </div>
          </div>

          {showPreview && (
            <motion.div 
              className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPreview(false)}
            >
              <motion.div
                ref={previewRef}
                onClick={(e) => e.stopPropagation()}
                className="relative"
              >
                <motion.img 
                  src={currentPic} 
                  alt="Preview" 
                  className="max-h-[80vh] max-w-[80vw] rounded-lg shadow-2xl"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                />
                <motion.div 
                  className="absolute inset-0 border-2 border-indigo-500/30 rounded-lg"
                  animate={{ 
                    boxShadow: ["0 0 0 rgba(99, 102, 241, 0.4)", "0 0 15px rgba(99, 102, 241, 0.7)", "0 0 0 rgba(99, 102, 241, 0.4)"]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                ></motion.div>
              </motion.div>
              <button 
                onClick={() => setShowPreview(false)}
                className="absolute top-6 right-6 text-white p-3 rounded-full bg-gray-800/70 hover:bg-gray-700"
              >
                <BiX size={24} />
              </button>
            </motion.div>
          )}

          {/* Tabs */}
          <div className="mb-6 border-b border-gray-800">
            <div className="flex space-x-2">
              <motion.button
                className={`py-3 px-4 font-medium flex items-center gap-2 relative ${
                  activeTab === 'gallery' 
                    ? 'text-indigo-400' 
                    : 'text-gray-400 hover:text-gray-300'
                }`}
                onClick={() => setActiveTab('gallery')}
                whileHover={{ y: -2 }}
                whileTap={{ y: 1 }}
              >
                <IoGrid />
                <span>Gallery</span>
                {activeTab === 'gallery' && (
                  <motion.div 
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500"
                    layoutId="activeTabIndicator"
                  />
                )}
              </motion.button>
              
              <motion.button
                className={`py-3 px-4 font-medium flex items-center gap-2 relative ${
                  activeTab === 'custom' 
                    ? 'text-indigo-400' 
                    : 'text-gray-400 hover:text-gray-300'
                }`}
                onClick={() => setActiveTab('custom')}
                whileHover={{ y: -2 }}
                whileTap={{ y: 1 }}
              >
                <FiLink />
                <span>Custom URL</span>
                {activeTab === 'custom' && (
                  <motion.div 
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500"
                    layoutId="activeTabIndicator"
                  />
                )}
              </motion.button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'gallery' ? (
              <motion.div 
                key="gallery"
                className="mb-6 bg-gray-800/50 p-5 rounded-2xl backdrop-blur-sm"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <motion.div 
                  className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4"
                >
                  {profilePictures.map((pic, index) => (
                    <motion.div
                      key={pic}
                      className={`relative cursor-pointer`}
                      whileHover={{ scale: 1.08, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      animate={currentPic === pic ? { y: [0, -5, 0] } : {}}
                      transition={{ 
                        duration: 0.4,
                        ease: "easeInOut",
                      }}
                    >
                      <div 
                        className={`relative overflow-hidden rounded-xl ${
                          currentPic === pic ? 'ring-2 ring-indigo-500 shadow-lg shadow-indigo-500/20' : 'ring-1 ring-gray-700 hover:ring-indigo-400'
                        } transition-all duration-300`}
                        onClick={() => handlePictureSelect(pic, index)}
                      >
                        <img src={pic} alt={`Avatar ${index + 1}`} className='aspect-square object-cover' />
                        
                        <motion.div 
                          className="absolute inset-0 flex items-center justify-center bg-black/0 hover:bg-black/50 transition-all duration-300"
                          whileHover={{ opacity: 1 }}
                          initial={{ opacity: 0 }}
                        >
                          <motion.button
                            onClick={(e) => {
                              e.stopPropagation();
                              setCurrentPic(pic);
                              togglePreview();
                            }}
                            className="p-2 bg-gray-900/80 rounded-full hover:bg-indigo-600/80 transition-colors duration-300"
                            whileHover={{ scale: 1.1 }}
                          >
                            <FiZoomIn size={16} className="text-white" />
                          </motion.button>
                        </motion.div>
                      </div>
                      
                      {currentPic === pic && (
                        <motion.div 
                          className="absolute -bottom-1 -right-1 bg-indigo-600 text-white p-1 rounded-full"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                        >
                          <IoCheckmarkCircle size={14} />
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            ) : (
              <motion.div 
                key="custom"
                className="mb-6 bg-gray-800/50 p-5 rounded-2xl backdrop-blur-sm"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <div className="space-y-4">
                  <div>
                    <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-300 mb-2">
                      Image URL
                    </label>
                    <div className="flex space-x-2">
                      <div className="relative flex-1">
                        <input
                          type="text"
                          id="imageUrl"
                          value={customImageUrl}
                          onChange={(e) => setCustomImageUrl(e.target.value)}
                          placeholder="https://example.com/image.jpg"
                          className={`w-full p-3 pl-10 bg-gray-800 text-white border ${
                            customImageError ? 'border-red-500' : customImageUrl && isCustomImageValid ? 'border-green-500' : 'border-gray-700'
                          } rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors`}
                        />
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FiLink className="text-gray-400" />
                        </div>
                        {customImageUrl && !customImageError && isCustomImageValid && (
                          <div className="absolute inset-y-0 right-3 flex items-center">
                            <IoCheckmarkCircle className="text-green-400" size={20} />
                          </div>
                        )}
                      </div>
                      <motion.button
                        onClick={handleCustomImageSubmit}
                        className={`bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-3 rounded-lg hover:from-indigo-500 hover:to-purple-500 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={!isCustomImageValid && customImageUrl.trim() !== ''}
                      >
                        <IoImageOutline />
                        <span>Apply</span>
                      </motion.button>
                    </div>
                    {customImageError && (
                      <motion.p 
                        className="mt-2 text-sm text-red-400"
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        {customImageError}
                      </motion.p>
                    )}
                  </div>
                  
                  <div 
                    className={`mt-4 border-2 border-dashed ${dragActive ? 'border-indigo-500 bg-indigo-900/20' : 'border-gray-700 bg-gray-800/30'} rounded-xl p-6 text-center transition-colors duration-300`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <div className={`p-3 rounded-full ${dragActive ? 'bg-indigo-600/30' : 'bg-gray-700/30'}`}>
                        <IoImageOutline size={24} className={`${dragActive ? 'text-indigo-300' : 'text-gray-400'}`} />
                      </div>
                      <p className="text-sm text-gray-400">
                        Drag and drop your image here or use the URL above.
                      </p>
                      <p className="text-xs text-gray-500">
                        Supported formats: JPG, PNG, GIF, WEBP
                      </p>
                    </div>
                  </div>
                  
                  {customImageUrl && isCustomImageValid && (
                    <motion.div 
                      className="mt-4 flex justify-center"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                    >
                      <div className="relative inline-block group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg opacity-50 group-hover:opacity-70 blur-sm transition-opacity duration-300"></div>
                        <div className="relative">
                          <img 
                            src={customImageUrl} 
                            alt="Custom profile picture" 
                            className="h-40 w-40 object-cover rounded-lg shadow-lg cursor-pointer" 
                            onClick={togglePreview}
                          />
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/60 transition-opacity rounded-lg">
                            <button 
                              onClick={togglePreview}
                              className="p-3 bg-indigo-600/80 rounded-full hover:bg-indigo-500 transition-colors"
                            >
                              <FiSearch size={18} className="text-white" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div 
            className="flex justify-between gap-4 mt-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <motion.button 
              onClick={() => {
                setCurrentPic(assignedProfilePicture);
                setSelectedIndex(profilePictures.findIndex(pic => pic === assignedProfilePicture));
                setCustomImageUrl('');
                setCustomImageError('');
              }} 
              type="button" 
              className="flex-1 bg-gray-800 text-gray-300 border border-gray-700 font-semibold py-3 px-4 rounded-xl hover:bg-gray-700 transition duration-300 flex items-center justify-center gap-2"
              whileHover={{ scale: 1.02, borderColor: "#6366f1" }}
              whileTap={{ scale: 0.98 }}
            >
              <IoImageSharp /> Reset Default
            </motion.button>
            
            <motion.button 
              onClick={handleSave} 
              type="button" 
              className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-3 px-4 rounded-xl hover:from-indigo-500 hover:to-purple-500 transition duration-300 flex items-center justify-center gap-2 relative overflow-hidden"
              whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(99, 102, 241, 0.5)" }}
              whileTap={{ scale: 0.98 }}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <motion.div 
                    className="h-5 w-5 border-2 border-white border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  <span>Saving...</span>
                </>
              ) : success ? (
                <>
                  <IoCheckmarkCircle size={20} />
                  <span>Saved!</span>
                </>
              ) : (
                <>
                  <CiImageOn size={20} />
                  <span>Save Selection</span>
                </>
              )}
              
              {isLoading && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-indigo-700/50 to-purple-700/50"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.5 }}
                />
              )}
            </motion.button>
          </motion.div>

          {success && (
            <motion.div 
              className="mt-4 p-3 rounded-lg bg-green-900/30 text-green-400 border border-green-700/50 flex items-center gap-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <IoCheckmarkCircle size={18} />
              <span>Profile picture updated successfully!</span>
            </motion.div>
          )}

          {/* Additional animated elements for visual appeal */}
          <div className="absolute -z-10">
            <motion.div 
              className="w-64 h-64 rounded-full bg-purple-800/5"
              animate={{ 
                scale: [1, 1.2, 1], 
                x: [0, -10, 0],
                y: [0, 10, 0],
              }}
              transition={{ 
                duration: 8, 
                repeat: Infinity,
                ease: "easeInOut" 
              }}
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default ProfilePicVerify