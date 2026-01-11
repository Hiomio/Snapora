import React from 'react';

const CreateCollectionModal = ({ 
  isOpen, 
  onClose, 
  newCollection, 
  setNewCollection, 
  handleCreateCollection
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-zinc-900 border border-white/10 rounded-xl p-6 w-full max-w-md" onClick={e => e.stopPropagation()}>
        <h3 className="text-xl font-bold mb-4">Create New Collection</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Collection Name</label>
            <input 
              type="text" 
              className="w-full bg-zinc-800 border border-white/10 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
              placeholder="e.g. Abstract Art"
              value={newCollection.name}
              onChange={(e) => setNewCollection({ ...newCollection, name: e.target.value })}
            />
          </div>
          
          <div>
            <label className="block text-sm text-gray-400 mb-1">Description</label>
            <textarea 
              className="w-full bg-zinc-800 border border-white/10 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-violet-500 min-h-24"
              placeholder="What's this collection about?"
              value={newCollection.description}
              onChange={(e) => setNewCollection({ ...newCollection, description: e.target.value })}
            />
          </div>
          
          <div>
            <label className="block text-sm text-gray-400 mb-1">Add Tags</label>
            <input 
              type="text" 
              className="w-full bg-zinc-800 border border-white/10 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
              placeholder="Separate tags with commas"
              value={newCollection.tags}
              onChange={(e) => setNewCollection({ ...newCollection, tags: e.target.value })}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="privacy" 
                className="mr-2" 
                checked={newCollection.visibility === 'private'}
                onChange={(e) => setNewCollection({
                  ...newCollection,
                  visibility: e.target.checked ? 'private' : 'public'
                })}
              />
              <label htmlFor="privacy" className="text-sm text-gray-300">Make this collection private</label>
            </div>
            

          </div>
          
          <div className="pt-4 flex justify-end gap-3">
            <button 
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={handleCreateCollection}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 transition-all"
            >
              Create Collection
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCollectionModal; 