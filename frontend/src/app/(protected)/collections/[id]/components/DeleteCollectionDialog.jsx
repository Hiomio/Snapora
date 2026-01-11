import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';

const DeleteCollectionDialog = ({
  isOpen,
  onOpenChange,
  collection,
  images,
  onConfirm,
  onCancel
}) => {
  if (!isOpen || !collection) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Delete Collection</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this collection? This action cannot be undone.
            The images will remain in your gallery.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <p className="font-medium">{collection.name}</p>
          <p className="text-muted-foreground text-sm mt-1">
            {images.length} images will be removed from this collection.
          </p>
        </div>
        
        <DialogFooter>
          <Button onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            Delete Collection
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteCollectionDialog; 