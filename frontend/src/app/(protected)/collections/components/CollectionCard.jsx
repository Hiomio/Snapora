import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  MoreHorizontal,
  Eye,
  EyeOff,
  Edit,
  Trash2,
  Star,
  Calendar,
  Tag,
  Lock,
  Globe,
} from "lucide-react";
import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";

const DEFAULT_COVER = "/images/placeholder-collection.jpg";

const CollectionCard = ({
  collection,
  onDelete,
  onEdit,
  onToggleStar,
  onToggleVisibility,
  className = "",
}) => {
  const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);

  // Format the last updated time
  const formattedTime = collection.updatedAt
    ? formatDistanceToNow(new Date(collection.updatedAt), { addSuffix: true })
    : "";

  // Format created date
  const createdDate = collection.createdAt
    ? new Date(collection.createdAt).toLocaleDateString()
    : "";

  // Handle card actions
  const handleDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onDelete) onDelete(collection);
  };

  const handleEdit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onEdit) onEdit(collection);
  };

  const handleToggleStar = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onToggleStar) onToggleStar(collection);
  };

  const handleToggleVisibility = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onToggleVisibility) onToggleVisibility(collection);
  };

  const toggleContextMenu = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsContextMenuOpen(!isContextMenuOpen);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className={`group bg-zinc-900/60 border border-white/10 rounded-xl overflow-hidden hover:border-violet-500/50 transition-colors cursor-pointer relative ${className}`}
    >
      <Link href={`/collections/${collection._id}`}>
        <div className="aspect-video relative overflow-hidden">
          <Image
            src={collection.coverImage || DEFAULT_COVER}
            alt={collection.name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-70 group-hover:opacity-100 transition-opacity"></div>

          <div className="absolute bottom-0 left-0 right-0 p-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-bold text-lg">{collection.name}</h3>
                <p className="text-sm text-gray-300">
                  {collection.imageCount || 0} images
                </p>
              </div>

              {/* Visibility indicator */}
              <div className={`p-2 rounded-lg ${
                collection.visibility === "private" 
                  ? "bg-amber-500/20 border border-amber-500/30" 
                  : "bg-emerald-500/20 border border-emerald-500/30"
              }`}>
                {collection.visibility === "private" ? (
                  <Lock className="w-4 h-4 text-amber-400" />
                ) : (
                  <Globe className="w-4 h-4 text-emerald-400" />
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <Calendar className="w-3 h-3" />
              <span>Created {createdDate}</span>
            </div>

            {/* Visibility status */}
            <div className={`flex items-center gap-1 text-xs ${
              collection.visibility === "private" ? "text-amber-400" : "text-emerald-400"
            }`}>
              {collection.visibility === "private" ? (
                <>
                  <Lock className="w-3 h-3" />
                  <span>Private</span>
                </>
              ) : (
                <>
                  <Globe className="w-3 h-3" />
                  <span>Public</span>
                </>
              )}
            </div>
          </div>

          {collection.description ? (
            <p className="text-sm text-gray-300 line-clamp-2 mb-3">
              {collection.description}
            </p>
          ) : (
            <p className="italic text-sm text-gray-300 line-clamp-2 mb-3">
              No description available
            </p>
          )}

          <div className="flex flex-wrap gap-2">
            {collection.tags &&
              collection.tags.length > 0 &&
              collection.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-white/5 hover:bg-white/10 rounded-full text-xs cursor-pointer"
                >
                  #{tag}
                </span>
              ))}
            {collection.tags && collection.tags.length > 3 && (
              <span className="px-2 py-1 bg-white/5 hover:bg-white/10 rounded-full text-xs cursor-pointer">
                +{collection.tags.length - 3} more
              </span>
            )}
          </div>
        </div>
      </Link>
      
      {/* Collection actions overlay */}
      <div className="absolute top-3 right-3 flex gap-2 transform translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
        <button
          className="p-2 rounded-lg bg-white/10 backdrop-blur-md hover:bg-white/20 cursor-pointer"
          onClick={handleToggleStar}
        >
          <Star
            className={`w-4 h-4 ${
              collection.isStarred ? "text-yellow-400 fill-yellow-400" : ""
            }`}
          />
        </button>
        <button
          className="p-2 rounded-lg bg-white/10 backdrop-blur-md hover:bg-white/20 cursor-pointer"
          onClick={toggleContextMenu}
        >
          <MoreHorizontal className="w-4 h-4" />
        </button>

        {/* Context menu */}
        {isContextMenuOpen && (
          <div
            className="absolute right-0 top-full mt-2 bg-zinc-800 border border-white/10 rounded-lg shadow-lg overflow-hidden z-20 min-w-40"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="w-full text-left px-4 py-2 text-sm hover:bg-white/5 transition-colors flex items-center gap-2"
              onClick={handleEdit}
            >
              <Edit className="w-4 h-4" />
              <span>Edit Collection</span>
            </button>
            <button 
              className="w-full text-left px-4 py-2 text-sm hover:bg-white/5 transition-colors flex items-center gap-2"
              onClick={handleToggleVisibility}
            >
              {collection.visibility === "private" ? (
                <>
                  <Globe className="w-4 h-4" />
                  <span>Make Public</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Make Private</span>
                </>
              )}
            </button>
            <button
              className="w-full text-left px-4 py-2 text-sm hover:bg-white/5 transition-colors flex items-center gap-2 text-rose-400"
              onClick={handleDelete}
            >
              <Trash2 className="w-4 h-4" />
              <span>Delete</span>
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default CollectionCard;
