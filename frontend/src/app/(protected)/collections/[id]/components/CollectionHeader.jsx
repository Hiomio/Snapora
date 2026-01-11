import React from 'react';
import {
  ArrowLeft,
  Plus,
  Users,
  MoreHorizontal,
  Pencil,
  Share2,
  Trash2,
  Star,
  Eye,
  EyeOff,
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';

const CollectionHeader = ({
  collection,
  isOwner,
  isEditor,
  onBackClick,
  onAddImagesClick,
  onShowCollaboratorsClick,
  onShowEditDialog,
  onShowDeleteDialog,
  collaborators,
}) => {
  // Format dates
  const updatedAtFormatted = collection.updatedAt
    ? formatDistanceToNow(new Date(collection.updatedAt), { addSuffix: true })
    : '';
  const createdAtFormatted = collection.createdAt
    ? formatDistanceToNow(new Date(collection.createdAt), { addSuffix: true })
    : '';

  // Handle the different visibility options
  const getVisibilityDisplay = () => {
    switch (collection.visibility) {
      case 'public':
        return { icon: <Eye className="h-4 w-4 text-green-400" />, label: 'Public' };
      case 'private':
        return { icon: <EyeOff className="h-4 w-4 text-gray-400" />, label: 'Private' };
      case 'shared':
        return { icon: <Users className="h-4 w-4 text-blue-400" />, label: 'Shared' };
      default:
        return { icon: <Eye className="h-4 w-4" />, label: 'Public' };
    }
  };

  return (
    <>
      {/* Header navigation */}
      <Button
        size="sm"
        className="mb-6"
        onClick={onBackClick}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Collections
      </Button>

      {/* Collection Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold flex items-center gap-2">
              {collection.name}
              {collection.isStarred && (
                <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
              )}
            </h1>
            <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-slate-700 text-xs">
              {getVisibilityDisplay().icon}
              <span>{getVisibilityDisplay().label}</span>
            </span>
          </div>
          {collection.description && (
            <p className="text-muted-foreground mt-2 max-w-xl">{collection.description}</p>
          )}
          
          <div className="flex flex-wrap mt-3 gap-2">
            {collection.tags && collection.tags.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-primary/10 text-primary-foreground rounded-sm text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
          
          <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
            <span>Updated {updatedAtFormatted}</span>
            <span>Created {createdAtFormatted}</span>
            <span>{collection.imageCount || collection.images?.length || 0} images</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {(isOwner || isEditor) && (
            <Button onClick={onAddImagesClick}>
              <Plus className="mr-2 h-4 w-4" />
              Add Images
            </Button>
          )}
          
          {collaborators?.length > 0 || isOwner ? (
            <Button 
              onClick={onShowCollaboratorsClick}
              className="flex items-center gap-2"
            >
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Collaborators</span>
              <span className="inline sm:hidden">{collaborators?.length || 0}</span>
            </Button>
          ) : null}
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {isOwner && (
                <>
                  <DropdownMenuItem onClick={onShowEditDialog}>
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit Collection
                  </DropdownMenuItem>
                  {collection.visibility !== 'public' && (
                    <DropdownMenuItem>
                      <Share2 className="mr-2 h-4 w-4" />
                      Share Collection
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={onShowDeleteDialog}
                    className="text-destructive focus:text-destructive"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Collection
                  </DropdownMenuItem>
                </>
              )}
              {!isOwner && (
                <DropdownMenuItem>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Leave Collection
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      <Separator className="my-6" />
    </>
  );
};

export default CollectionHeader; 