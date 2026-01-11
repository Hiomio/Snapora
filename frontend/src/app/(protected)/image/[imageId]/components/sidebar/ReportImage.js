import React, { useState } from 'react';
import { Flag } from 'lucide-react';
import { useApi } from '@/hooks/useApi';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

const ReportImage = ({ imageId, ownerId, currentUserId }) => {
  const api = useApi();
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const canReport = user && user._id !== ownerId;

  const submit = async () => {
    setSubmitting(true);
    setError('');
    setSuccess('');
    try {
      await api.post(`/api/images/${imageId}/report`, { message });
      setSuccess('Report submitted');
      setMessage('');
      setOpen(false);
    } catch (e) {
      setError(e.response?.data?.message || 'Failed to submit report');
    } finally {
      setSubmitting(false);
    }
  };

  if (!canReport) return null;

  return (
    <div className="rounded-xl bg-zinc-950/60 border border-white/10 p-4 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.03)]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-gray-300">
          <Flag className="w-4 h-4" />
          <span className="text-sm">Report content</span>
        </div>
        <Button variant="ghost" size="sm" onClick={() => setOpen((v) => !v)} className="bg-white/5 hover:bg-white/5 hover:text-white cursor-pointer hover:shadow-[0_0_0_1px_rgba(251,191,36,0.2)_inset]">
          {open ? 'Close' : 'Report'}
        </Button>
      </div>
      {open && (
        <div className="mt-3 animate-in fade-in slide-in-from-top-1 duration-150">
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Describe what's wrong with this image"
            className="min-h-24 bg-transparent focus-visible:ring-amber-400/40 focus-visible:border-amber-300/30"
            disabled={submitting}
          />
          {error && <p className="text-xs text-red-400 mt-2">{error}</p>}
          {success && <p className="text-xs text-green-400 mt-2">{success}</p>}
          <div className="flex justify-end mt-2">
            <Button size="sm" onClick={submit} disabled={submitting || !message.trim()} className="shadow-[0_0_0_1px_rgba(251,191,36,0.2)_inset] cursor-pointer">Submit report</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportImage;


