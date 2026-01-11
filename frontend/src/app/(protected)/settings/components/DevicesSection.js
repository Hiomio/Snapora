"use client"
import React from 'react';
import { Globe, LogOut } from 'lucide-react';

const DevicesSection = ({ user, handleLogout }) => {
  // Format date helper
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-zinc-900/60 border border-white/10 rounded-xl p-4 sm:p-6">
      <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">Active Sessions</h2>

      {user?.loginHistory && user.loginHistory.length > 0 ? (
        <div className="space-y-3 sm:space-y-4">
          {user.loginHistory.slice(0, 5).map((session, index) => (
            <div key={index} className="border border-white/10 rounded-lg p-3 sm:p-4 bg-white/5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0 mb-2">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="p-1.5 sm:p-2 bg-white/10 rounded-lg">
                    <Globe className="w-4 sm:w-5 h-4 sm:h-5" />
                  </div>
                  <div>
                    <p className="text-sm sm:text-base font-medium">{session.device || 'Unknown Device'}</p>
                    <p className="text-[10px] sm:text-xs text-gray-400">
                      {index === 0 ? 'Current session' : formatDate(session.timestamp)}
                    </p>
                  </div>
                </div>
                {index === 0 ? (
                  <span className="text-[10px] sm:text-xs bg-emerald-500/20 text-emerald-400 rounded-full px-2 py-0.5 w-fit">
                    Active now
                  </span>
                ) : (
                  <button className="text-rose-400 hover:text-rose-300 text-xs sm:text-sm w-fit">
                    Not active
                  </button>
                )}
              </div>
              <div className="mt-2 pt-2 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 sm:gap-0">
                <span className="text-[10px] sm:text-xs text-gray-400">Location: {session.location || 'Unknown'}</span>
                <span className="text-[10px] sm:text-xs text-gray-400">IP: {session.ip ? session.ip.replace(/\d+\.\d+$/, 'XX.XX') : 'Unknown'}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="border border-white/10 rounded-lg p-3 sm:p-4 bg-white/5">
          <p className="text-sm sm:text-base text-gray-400">No active sessions found</p>
        </div>
      )}

      <div className="mt-4 sm:mt-6">
        <button
          onClick={handleLogout}
          className="w-full sm:w-auto px-3 sm:px-4 py-2 border border-white/10 bg-white/5 hover:bg-white/10 rounded-lg text-xs sm:text-sm font-medium transition-colors flex items-center justify-center sm:justify-start gap-1.5 sm:gap-2"
        >
          <LogOut className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
          Log out of all other sessions
        </button>
      </div>
    </div>
  );
};

export default DevicesSection; 