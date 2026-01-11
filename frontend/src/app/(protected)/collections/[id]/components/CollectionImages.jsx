import React from 'react';
import { Grid, Plus, MoreVertical, ExternalLink, Download, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MasonryGrid from '@/components/layouts/MasonryGrid';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ListViewItem = ({ image, isOwner, isEditor, onImageOptions }) => {
  return (
    <div className="flex items-center gap-4 p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors group">
      {/* Thumbnail */}
      <Link href={`/images/${image._id}`} className="block relative w-20 h-20 rounded-md overflow-hidden bg-zinc-800 flex-shrink-0">
        <img 
          src={image.imageUrl || image.url} 
          alt={image.title || 'Image'} 
          className="w-full h-full object-cover"
        />
      </Link>
      
      {/* Info */}
      <div className="flex-1 min-w-0">
        <Link href={`/images/${image._id}`} className="block">
          <h3 className="font-medium text-white truncate">{image.title || 'Untitled Image'}</h3>
        </Link>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-xs text-zinc-400">
          {image.user && (
            <span>By {image.user.username || 'Unknown'}</span>
          )}
          {image.dimensions && (
            <span>{image.dimensions.width}×{image.dimensions.height}</span>
          )}
          {image.tags && image.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {image.tags.slice(0, 3).map(tag => (
                <Link 
                  key={tag} 
                  href={`/tags/${tag}`}
                  className="text-violet-400 hover:text-violet-300"
                >
                  #{tag}
                </Link>
              ))}
              {image.tags.length > 3 && <span>+{image.tags.length - 3}</span>}
            </div>
          )}
        </div>
      </div>
      
      {/* Actions */}
      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Link href={`/images/${image._id}`} target="_blank" className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors">
          <ExternalLink className="w-4 h-4" />
        </Link>
        <a href={image.imageUrl || image.url} download target="_blank" rel="noreferrer" className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors">
          <Download className="w-4 h-4" />
        </a>
        {(isOwner || isEditor) && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors">
                <MoreVertical className="w-4 h-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="min-w-32 bg-zinc-900 border-zinc-700 text-white">
              <DropdownMenuItem 
                onClick={() => onImageOptions(image)}
                className="text-red-400 hover:text-red-300 hover:bg-red-950/30 cursor-pointer focus:bg-red-950/30 focus:text-red-300"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                <span>Remove</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
};

const CollectionImages = ({
  images,
  loading,
  isOwner,
  isEditor,
  collectionId,
  viewMode = 'grid',
  onImageOptions,
  onAddImagesClick
}) => {
  // Empty state
  if (images.length === 0) {
    return ;
  }
  
  // Grid view
  if (viewMode === 'grid') {
    return (
      <div>
        <MasonryGrid 
          images={images} 
          loading={loading}
          onImageOptions={onImageOptions}
        />
      </div>
    );
  }
  
  // List view
  return (
    <div className="space-y-2">
      {images.map(image => (
        <ListViewItem 
          key={image._id}
          image={image}
          isOwner={isOwner}
          isEditor={isEditor}
          onImageOptions={onImageOptions}
        />
      ))}
    </div>
  );
};

export default CollectionImages; 