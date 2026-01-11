import { AlertTriangle } from 'lucide-react'
import React from 'react'

const ProfileSuspended = () => {
  return (
    <div className="bg-zinc-900/60 backdrop-blur-sm border border-yellow-500/30 rounded-lg p-6 my-6 text-center mx-6 md:mx-10">
      <div className="bg-yellow-500/20 p-3 rounded-full w-fit mx-auto mb-3">
        <AlertTriangle className="h-6 w-6 text-yellow-500" />
      </div>
      <h3 className="text-lg font-semibold text-yellow-400 mb-1">Account Suspended</h3>
      <p className="text-gray-300">This account has been temporarily suspended for violating our community guidelines.</p>
    </div>
  )
}

export default ProfileSuspended