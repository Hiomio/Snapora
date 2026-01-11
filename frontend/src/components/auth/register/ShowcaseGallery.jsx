import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Sparkles, Camera, Zap, ImageIcon } from "lucide-react";

export default function ShowcaseGallery() {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Sample images for the showcase gallery
  const showcaseImages = [
    { id: 1, link: "/images/upload/img6.webp" },
    { id: 2, link: "/images/upload/img7.png" },
    { id: 3, link: "/images/upload/img5.png" },
    { id: 4, link: "/images/upload/user3.png" },
    { id: 5, link: "/images/bg-img2.jpg" },
    { id: 6, link: "/images/bg-img3.jpg" },
  ];

  // Auto-rotate showcase images
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImageIndex((prev) => (prev + 1) % showcaseImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [showcaseImages.length]);

  return (
    <div className="hidden lg:block lg:w-7/12 relative overflow-hidden">
      {/* Feature highlight text */}
      <div className="absolute top-12 left-12 z-10 max-w-sm">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <div className="flex items-center mb-4">
            <div className="p-1 rounded-full bg-purple-500/20 backdrop-blur-sm">
              <Sparkles className="h-5 w-5 text-purple-400" />
            </div>
            <span className="ml-2 text-sm font-medium text-purple-400">AI-POWERED CREATIVITY</span>
          </div>
          <h2 className="text-2xl font-bold mb-3 text-white">Unleash your creative potential</h2>
          <p className="text-gray-300">
            Generate stunning visuals with our AI tools and join a community of creators sharing their work.
          </p>
        </motion.div>

        {/* Feature Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="mt-6 flex flex-wrap gap-2"
        >
          <div className="flex items-center bg-gray-800/50 backdrop-blur-sm px-3 py-1.5 rounded-full">
            <Camera className="h-4 w-4 text-purple-400 mr-1.5" />
            <span className="text-xs text-gray-300">Powerful Image Generation</span>
          </div>
          <div className="flex items-center bg-gray-800/50 backdrop-blur-sm px-3 py-1.5 rounded-full">
            <ImageIcon className="h-4 w-4 text-purple-400 mr-1.5" />
            <span className="text-xs text-gray-300">Style Transfer</span>
          </div>
          <div className="flex items-center bg-gray-800/50 backdrop-blur-sm px-3 py-1.5 rounded-full">
            <Zap className="h-4 w-4 text-purple-400 mr-1.5" />
            <span className="text-xs text-gray-300">Fast Processing</span>
          </div>
        </motion.div>
      </div>

      {/* Image Gallery */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <div className="relative h-full w-full">
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-transparent to-transparent z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent z-10"></div>

          {/* Image Gallery */}
          <div className="relative z-0 w-full h-full">
            <AnimatePresence initial={false}>
              {showcaseImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{
                    opacity: index === activeImageIndex ? 1 : 0,
                    scale: index === activeImageIndex ? 1 : 1.1,
                  }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <div className="w-full h-full relative">
                    <Image
                      src={image.link}
                      alt="AI generated artwork"
                      className="object-cover"
                      fill
                      priority={index === 0}
                    />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Image gallery navigation dots */}
      <div className="absolute bottom-8 inset-x-0 flex justify-center z-20">
        <div className="flex space-x-2">
          {showcaseImages.map((_, index) => (
            <button
              key={index}
              className={`h-2 rounded-full transition-all ${index === activeImageIndex ? "w-6 bg-purple-500" : "w-2 bg-gray-500"
                }`}
              onClick={() => setActiveImageIndex(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
} 