import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { PlusIcon, Loader2, FolderPlus } from "lucide-react";
import { useCollections } from "@/hooks/useCollections";
// import { useToast } from "@/components/ui/use-toast";

const CollectionPickerModal = ({ 
  isOpen, 
  onClose, 
  imageId,
  onSuccess,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCollections, setSelectedCollections] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState("");
  const [isPrivate, setIsPrivate] = useState(true);
  const [creatingCollection, setCreatingCollection] = useState(false);
  const [addingToCollections, setAddingToCollections] = useState(false);
  
  const { 
    collections, 
    loading, 
    fetchCollections, 
    createCollection, 
    addImageToCollection,
    getCollectionsByImage
  } = useCollections();
  
  const toast = ({ variant, title, description }) => {
    console.log(`[${variant.toUpperCase()}] ${title}: ${description}`);
  };

  // Fetch collections when modal opens
  useEffect(() => {
    if (isOpen) {
      fetchCollections();
      checkExistingCollections();
    }
  }, [isOpen, imageId]);

  // Check which collections already contain this image
  const checkExistingCollections = async () => {
    if (!imageId) return;
    
    const existingCollections = await getCollectionsByImage(imageId);
    const existingIds = existingCollections.map(c => c._id);
    setSelectedCollections(existingIds);
  };

  // Filter collections based on search query
  const filteredCollections = collections.filter(
    (collection) =>
      collection.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (collection.description && 
       collection.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Toggle a collection selection
  const toggleCollection = (collectionId) => {
    setSelectedCollections((prev) =>
      prev.includes(collectionId)
        ? prev.filter((id) => id !== collectionId)
        : [...prev, collectionId]
    );
  };

  // Handle creating a new collection
  const handleCreateCollection = async () => {
    if (!newCollectionName.trim()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Collection name is required",
      });
      return;
    }

    try {
      setCreatingCollection(true);
      
      const newCollection = await createCollection({
        name: newCollectionName,
        visibility: isPrivate ? "private" : "public",
      });

      if (newCollection) {
        // Add the new collection to selected collections
        setSelectedCollections([...selectedCollections, newCollection._id]);
        
        // Reset form
        setNewCollectionName("");
        setShowCreateForm(false);
        
        // Refresh collections list
        fetchCollections();
        
        toast({
          title: "Success",
          description: "Collection created",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to create collection",
      });
    } finally {
      setCreatingCollection(false);
    }
  };

  // Handle adding the image to selected collections
  const handleAddToCollections = async () => {
    if (selectedCollections.length === 0) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please select at least one collection",
      });
      return;
    }

    try {
      setAddingToCollections(true);
      
      // Process each selected collection
      const promises = selectedCollections.map(collectionId => 
        addImageToCollection(collectionId, imageId)
      );
      
      await Promise.all(promises);
      
      toast({
        title: "Success",
        description: `Added to ${selectedCollections.length} collection${selectedCollections.length > 1 ? 's' : ''}`,
      });
      
      if (onSuccess) onSuccess();
      onClose();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to add to collections",
      });
    } finally {
      setAddingToCollections(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add to Collection</DialogTitle>
          <DialogDescription>
            Choose collections to add this image to or create a new one.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Search */}
          <div className="relative">
            <Input
              placeholder="Search collections..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10"
            />
          </div>

          {/* Create new collection button */}
          <Button
            variant="outline"
            onClick={() => setShowCreateForm(true)}
            className="w-full flex items-center justify-center gap-2"
            disabled={showCreateForm}
          >
            <PlusIcon className="h-4 w-4" />
            Create New Collection
          </Button>

          {/* Create collection form */}
          {showCreateForm && (
            <div className="space-y-3 p-3 border rounded-md">
              <Input
                placeholder="Collection name"
                value={newCollectionName}
                onChange={(e) => setNewCollectionName(e.target.value)}
              />
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="private"
                  checked={isPrivate}
                  onCheckedChange={setIsPrivate}
                />
                <Label htmlFor="private">Private collection</Label>
              </div>
              
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowCreateForm(false)}
                >
                  Cancel
                </Button>
                <Button
                  size="sm"
                  onClick={handleCreateCollection}
                  disabled={creatingCollection || !newCollectionName}
                >
                  {creatingCollection ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    "Create"
                  )}
                </Button>
              </div>
            </div>
          )}

          {/* Collections list */}
          <div className="max-h-60 overflow-auto space-y-2">
            {loading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              </div>
            ) : filteredCollections.length === 0 ? (
              <div className="text-center py-6 text-gray-500">
                {searchQuery ? "No collections found" : "No collections yet"}
              </div>
            ) : (
              filteredCollections.map((collection) => (
                <div
                  key={collection._id}
                  className="flex items-center p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <Checkbox
                    id={collection._id}
                    checked={selectedCollections.includes(collection._id)}
                    onCheckedChange={() => toggleCollection(collection._id)}
                  />
                  <Label
                    htmlFor={collection._id}
                    className="flex-1 ml-3 cursor-pointer"
                  >
                    <div className="font-medium">{collection.name}</div>
                    <div className="text-xs text-gray-500">
                      {collection.imageCount} images
                    </div>
                  </Label>
                  {collection.visibility === "private" && (
                    <span className="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-full">
                      Private
                    </span>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleAddToCollections}
            disabled={selectedCollections.length === 0 || addingToCollections}
            className="gap-2"
          >
            {addingToCollections ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <FolderPlus className="h-4 w-4" />
            )}
            {addingToCollections
              ? "Adding..."
              : `Add to ${selectedCollections.length} collection${
                  selectedCollections.length !== 1 ? "s" : ""
                }`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CollectionPickerModal; 