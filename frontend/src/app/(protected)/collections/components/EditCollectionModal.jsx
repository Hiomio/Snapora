import React from 'react';

const EditCollectionModal = ({
  isOpen,
  onClose,
  collectionToEdit,
  setCollectionToEdit,
  handleUpdateCollection
}) => {
  if (!isOpen || !collectionToEdit) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-zinc-900 border border-white/10 rounded-xl p-6 w-full max-w-md" onClick={e => e.stopPropagation()}>
        <h3 className="text-xl font-bold mb-4">Edit Collection</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Collection Name</label>
            <input 
              type="text" 
              className="w-full bg-zinc-800 border border-white/10 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
              placeholder="e.g. Abstract Art"
              value={collectionToEdit.name}
              onChange={(e) => setCollectionToEdit({ ...collectionToEdit, name: e.target.value })}
            />
          </div>
          
          <div>
            <label className="block text-sm text-gray-400 mb-1">Description</label>
            <textarea 
              className="w-full bg-zinc-800 border border-white/10 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-violet-500 min-h-24"
              placeholder="What's this collection about?"
              value={collectionToEdit.description || ''}
              onChange={(e) => setCollectionToEdit({ ...collectionToEdit, description: e.target.value })}
            />
          </div>
          
          <div>
            <label className="block text-sm text-gray-400 mb-1">Add Tags</label>
            <input 
              type="text" 
              className="w-full bg-zinc-800 border border-white/10 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
              placeholder="Separate tags with commas"
              value={collectionToEdit.tags}
              onChange={(e) => setCollectionToEdit({ ...collectionToEdit, tags: e.target.value })}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="edit-privacy" 
                className="mr-2" 
                checked={collectionToEdit.visibility === 'private'}
                onChange={(e) => setCollectionToEdit({
                  ...collectionToEdit,
                  visibility: e.target.checked ? 'private' : 'public'
                })}
              />
              <label htmlFor="edit-privacy" className="text-sm text-gray-300">Make this collection private</label>
            </div>

          </div>
          
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="star"
              checked={collectionToEdit.isStarred}
              onChange={(e) => 
                setCollectionToEdit({ ...collectionToEdit, isStarred: e.target.checked })
              }
            />
            <label
              htmlFor="star"
              className="text-sm text-gray-300"
            >
              Star this collection
            </label>
          </div>
          
          <div className="pt-4 flex justify-end gap-3">
            <button 
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={handleUpdateCollection}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 transition-all"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCollectionModal; 