"use client";
import { useState, useEffect } from "react";
import { X, Code, Github, Linkedin, Mail } from "lucide-react";

const DeveloperInfo = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Main floating button */}
      <div
        className="relative group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Developer info card - appears on hover */}
        {isHovered && (
          <div className="absolute bottom-16 right-0 w-80 bg-zinc-900 border border-zinc-700 rounded-lg shadow-2xl p-4 animate-in slide-in-from-bottom-2 duration-200">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <img src="https://i.ibb.co/7b6f6M7/animated-girl.png" className="w-10 h-10 rounded-full" />
                <div>
                  <h3 className="font-semibold text-white text-sm">Kaluri Himabindhu</h3>
                  <p className="text-zinc-400 text-xs">Built with ❤️</p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="text-zinc-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <h4 className="text-white font-medium text-sm mb-2">About This Project</h4>
                <p className="text-zinc-300 text-xs leading-relaxed">
                  Snapora is a modern image sharing platform built with Next.js by Kaluri Himabindhu
                </p>
              </div>

              <div>
                <h4 className="text-white font-medium text-sm mb-2">Connect</h4>
                <div className="flex space-x-3">
                  <a
                    href="https://github.com/Hiomio"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-zinc-400 hover:text-white transition-colors text-xs"
                  >
                    <Github className="w-4 h-4" />
                    <span>GitHub</span>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/kaluri-himabindhu-9378b927a/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-zinc-400 hover:text-white transition-colors text-xs"
                  >
                    <Linkedin className="w-4 h-4" />
                    <span>LinkedIn</span>
                  </a>
                  <a
                    href="mailto:blessykaluri@gmail.com"
                    className="flex items-center space-x-2 text-zinc-400 hover:text-white transition-colors text-xs"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Email</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Floating action button */}
        <div className="p-0.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-600">
          <img
            src="https://i.ibb.co/7b6f6M7/animated-girl.png"
            className="w-10 h-10 rounded-full border-2 border-white"
            aria-label="Developer Info"
          />
        </div>
      </div>
    </div>
  );
};

export default DeveloperInfo;
