import React from 'react';

const DeleteConfirmationModal = ({
  isOpen,
  onClose,
  collectionToDelete,
  handleConfirmDelete
}) => {
  if (!isOpen || !collectionToDelete) return null;
  
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-zinc-900 border border-white/10 rounded-xl p-6 w-full max-w-md" onClick={e => e.stopPropagation()}>
        <h3 className="text-xl font-bold mb-2">Confirm Deletion</h3>
        <p className="text-gray-400 mb-4">
          Are you sure you want to delete this collection? This action cannot be undone.
        </p>
        
        <div className="py-4">
          <p className="font-medium">{collectionToDelete.name}</p>
          <p className="text-muted-foreground text-sm mt-1 text-gray-400">
            {collectionToDelete.imageCount || 0} images will be removed from this collection.
          </p>
        </div>
        
        <div className="pt-4 flex justify-end gap-3">
          <button 
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={handleConfirmDelete}
            className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 transition-all"
          >
            Delete Collection
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal; 