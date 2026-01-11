"use client"
import { Globe, Users, Lock, Tag, Sliders, MessageSquare, AlertCircle } from 'lucide-react';

const PublishingSettings = ({ 
  selectedVisibility, 
  setSelectedVisibility, 
  imageDetails, 
  handleChange,
  commentsAllowed,
  setCommentsAllowed,
  licenses,
  uploadError
}) => {
  return (
    <div className="bg-zinc-900/60 border border-white/10 rounded-xl p-4 sm:p-6">
      <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">Publishing Settings</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <div>
          <div className="mb-4 sm:mb-6">
            <label className="block text-sm font-medium mb-2 sm:mb-3">Visibility</label>
            <div className="space-y-2 sm:space-y-3">
              {[
                { id: 'public', icon: <Globe />, title: 'Public', description: 'Visible to everyone' },
                { id: 'followers', icon: <Users />, title: 'Followers Only', description: 'Only visible to your followers' },
                { id: 'private', icon: <Lock />, title: 'Private', description: 'Only visible to you' }
              ].map(option => (
                <div
                  key={option.id}
                  onClick={() => setSelectedVisibility(option.id)}
                  className={`p-3 sm:p-4 rounded-lg cursor-pointer flex items-start gap-3 border ${selectedVisibility === option.id
                    ? 'border-violet-500 bg-violet-900/20'
                    : 'border-white/10 active:bg-white/5 hover:bg-white/5'
                    } transition-colors touch-manipulation`}
                >
                  <div className={`p-2 rounded-lg flex-shrink-0 ${selectedVisibility === option.id ? 'bg-violet-500' : 'bg-white/10'}`}>
                    {option.icon}
                  </div>
                  <div>
                    <h4 className="font-medium text-sm sm:text-base">{option.title}</h4>
                    <p className="text-xs sm:text-sm text-gray-400">{option.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-4 sm:mb-6">
            <label className="block text-sm font-medium mb-2 sm:mb-3">License</label>
            <select
              name="license"
              value={imageDetails.license}
              onChange={handleChange}
              className="w-full bg-zinc-800/50 border border-white/10 rounded-lg py-2.5 px-3 sm:px-4 focus:outline-none focus:ring-2 focus:ring-violet-500 transition text-sm sm:text-base"
            >
              {licenses.map(license => (
                <option key={license.id} value={license.id}>{license.name}</option>
              ))}
            </select>
            <p className="text-xs sm:text-sm text-gray-400 mt-2">
              {licenses.find(l => l.id === imageDetails.license)?.description}
            </p>
          </div>
        </div>

        <div>
          <div className="mb-4 sm:mb-6">
            <label className="block text-sm font-medium mb-2 sm:mb-3">Advanced Settings</label>

            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center justify-between p-3 sm:p-4 bg-white/5 rounded-lg">
                <div className="flex items-center gap-2 sm:gap-3">
                  <Tag className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  <div>
                    <h4 className="text-xs sm:text-sm font-medium">Enable Alt Text</h4>
                    <p className="text-xs text-gray-400">Improve accessibility</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer touch-manipulation">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-zinc-700 peer-focus:ring-2 peer-focus:ring-violet-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-violet-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-3 sm:p-4 bg-white/5 rounded-lg">
                <div className="flex items-center gap-2 sm:gap-3">
                  <Sliders className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  <div>
                    <h4 className="text-xs sm:text-sm font-medium">Show EXIF Data</h4>
                    <p className="text-xs text-gray-400">Display camera information</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer touch-manipulation">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-zinc-700 peer-focus:ring-2 peer-focus:ring-violet-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-violet-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-3 sm:p-4 bg-white/5 rounded-lg">
                <div className="flex items-center gap-2 sm:gap-3">
                  <MessageSquare className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  <div>
                    <h4 className="text-xs sm:text-sm font-medium">Allow Comments</h4>
                    <p className="text-xs text-gray-400">Enable community feedback</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer touch-manipulation">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={commentsAllowed}
                    onChange={(e) => setCommentsAllowed(e.target.checked)}
                  />
                  <div className="w-11 h-6 bg-zinc-700 peer-focus:ring-2 peer-focus:ring-violet-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-violet-600"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Error display */}
      {uploadError && (
        <div className="mt-4 p-3 sm:p-4 bg-red-500/20 border border-red-600 rounded-lg flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
          <p className="text-red-100 text-sm">{uploadError}</p>
        </div>
      )}
    </div>
  );
};

export default PublishingSettings; 