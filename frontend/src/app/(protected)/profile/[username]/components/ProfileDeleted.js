import { Trash2 } from 'lucide-react'
import React from 'react'

const ProfileDeleted = () => {
  return (
    <div className="bg-zinc-900/60 backdrop-blur-sm border border-red-500/30 rounded-lg p-6 my-6 text-center mx-6 md:mx-10">
      <div className="bg-red-500/20 p-3 rounded-full w-fit mx-auto mb-3">
        <Trash2 className="h-6 w-6 text-red-500" />
      </div>
      <h3 className="text-lg font-semibold text-red-400 mb-1">Account Deleted</h3>
      <p className="text-gray-300">This account has been permanently deleted and is no longer available.</p>
    </div>
  )
}

export default ProfileDeleted