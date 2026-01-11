"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ImagePlus, ChevronDown, Layers, FileText, Calendar } from "lucide-react";

const CreateMenu = ({ activeDropdown, toggleDropdown, setActiveDropdown }) => {
  return (
    <div className="relative dropdown-container">
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleDropdown("createMenu");
        }}
        className={`hidden md:flex items-center px-4 py-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 rounded-full text-white text-sm font-medium transition-all duration-300 ${
          activeDropdown === "createMenu" ? "shadow-lg shadow-violet-500/20" : ""
        }`}
      >
        <ImagePlus className="w-4 h-4 mr-2" />
        <span>Create</span>
        <ChevronDown
          className={`ml-1 w-4 h-4 transition-transform ${
            activeDropdown === "createMenu" ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Create Menu Dropdown */}
      <AnimatePresence>
        {activeDropdown === "createMenu" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-64 rounded-xl bg-zinc-900/95 backdrop-blur-xl border border-white/10 shadow-xl shadow-black/30 overflow-hidden z-50"
          >
            <div className="p-3 border-b border-white/10">
              <h3 className="text-sm font-medium">Create New</h3>
            </div>
            <div className="p-2">
              <Link
                href="/upload-image"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition-colors"
                onClick={() => setActiveDropdown(null)}
              >
                <div className="p-2 rounded-lg bg-gradient-to-r from-violet-600 to-fuchsia-600">
                  <ImagePlus className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="font-medium">Upload Image</div>
                  <div className="text-xs text-gray-400">Share your work with the community</div>
                </div>
              </Link>
              <Link
                href="/collections"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition-colors"
                onClick={() => setActiveDropdown(null)}
              >
                <div className="p-2 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600">
                  <Layers className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="font-medium">Create Collection</div>
                  <div className="text-xs text-gray-400">Organize your work into collections</div>
                </div>
              </Link>
              {/* <Link
                href="/create-story"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition-colors"
                onClick={() => setActiveDropdown(null)}
              >
                <div className="p-2 rounded-lg bg-gradient-to-r from-amber-600 to-orange-600">
                  <FileText className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="font-medium">Create Story</div>
                  <div className="text-xs text-gray-400">Share the process behind your work</div>
                </div>
              </Link> */}
              {/* <Link
                href="/schedule-post"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition-colors"
                onClick={() => setActiveDropdown(null)}
              >
                <div className="p-2 rounded-lg bg-gradient-to-r from-sky-600 to-blue-600">
                  <Calendar className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="font-medium">Schedule Post</div>
                  <div className="text-xs text-gray-400">Plan your content calendar</div>
                </div>
              </Link> */}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CreateMenu; 