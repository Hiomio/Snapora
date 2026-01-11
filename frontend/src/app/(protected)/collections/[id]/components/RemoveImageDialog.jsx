import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';

const RemoveImageDialog = ({
  isOpen,
  onOpenChange,
  selectedImage,
  onConfirm,
  onCancel
}) => {
  if (!isOpen || !selectedImage) return null;
  
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Remove Image from Collection</DialogTitle>
          <DialogDescription>
            Are you sure you want to remove this image from the collection? The image will still be available in your gallery.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <div className="aspect-video relative overflow-hidden rounded-lg mb-3">
            <Image
              src={selectedImage.imageUrl}
              alt={selectedImage.title}
              fill
              className="object-cover"
            />
          </div>
          <p className="font-medium">{selectedImage.title}</p>
        </div>
        
        <DialogFooter>
          <Button onClick={onCancel}>
            Cancel
          </Button>
          <Button 
            variant="destructive" 
            onClick={onConfirm}
          >
            Remove
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RemoveImageDialog; 