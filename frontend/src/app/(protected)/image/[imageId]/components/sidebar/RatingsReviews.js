import React, { useEffect, useMemo, useState } from 'react';
import { Star } from 'lucide-react';
import { useApi } from '@/hooks/useApi';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

const StarInput = ({ value, onChange, disabled }) => {
  const stars = [1,2,3,4,5];
  return (
    <div className="flex items-center gap-1">
      {stars.map((s) => (
        <button
          key={s}
          type="button"
          disabled={disabled}
          onClick={() => onChange(s)}
          className={`p-1 rounded-md transition-colors ${
            disabled ? 'opacity-70 cursor-not-allowed' : 'hover:bg-white/5'
          }`}
          aria-label={`Rate ${s}`}
        >
          <Star className={`w-5 h-5 transition-transform duration-150 ${
            s <= value ? 'fill-amber-400 text-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,.35)]' : 'text-gray-500'
          } ${!disabled ? 'hover:scale-110' : ''}`} />
        </button>
      ))}
    </div>
  );
};

const ProgressRow = ({ label, value, total }) => {
  const pct = total > 0 ? Math.round((value / total) * 100) : 0;
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs w-8 text-gray-300">{label}★</span>
      <div className="flex-1 h-2 rounded-full overflow-hidden bg-gradient-to-r from-white/5 via-white/10 to-white/5">
        <div
          className="h-full bg-amber-400/90 backdrop-blur-[1px]"
          style={{ width: `${pct}%` }}
        ></div>
      </div>
      <span className="text-[10px] text-gray-400 tabular-nums w-10 text-right">{pct}%</span>
    </div>
  );
};

const RatingsReviews = ({ imageId }) => {
  const api = useApi();
  const { user } = useAuth();
  const [stats, setStats] = useState({ averageRating: 0, ratingsCount: 0, distribution: {1:0,2:0,3:0,4:0,5:0} });
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [myRating, setMyRating] = useState(0);
  const [myComment, setMyComment] = useState('');
  const [error, setError] = useState('');

  const myExistingReview = useMemo(() => reviews.find(r => r.user?._id === user?._id), [reviews, user?._id]);

  useEffect(() => {
    let mounted = true;
    const fetchAll = async () => {
      setLoading(true);
      try {
        const [statsRes, listRes] = await Promise.all([
          api.get(`/api/images/${imageId}/reviews/stats`),
          api.get(`/api/images/${imageId}/reviews?limit=5`),
        ]);
        if (!mounted) return;
        setStats(statsRes.data.data);
        setReviews(listRes.data.data);
        if (myExistingReview) {
          setMyRating(myExistingReview.rating);
          setMyComment(myExistingReview.comment || '');
        }
      } catch (e) {
        if (mounted) setError(e.response?.data?.message || 'Failed to load reviews');
      } finally {
        if (mounted) setLoading(false);
      }
    };
    if (imageId) fetchAll();
    return () => { mounted = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageId]);

  useEffect(() => {
    if (myExistingReview) {
      setMyRating(myExistingReview.rating);
      setMyComment(myExistingReview.comment || '');
    }
  }, [myExistingReview]);

  const handleSubmit = async () => {
    if (!user) return;
    if (!myRating) {
      setError('Please select a rating');
      return;
    }
    setSubmitting(true);
    setError('');
    try {
      const res = await api.post(`/api/images/${imageId}/reviews`, { rating: myRating, comment: myComment });
      // refresh
      const [statsRes, listRes] = await Promise.all([
        api.get(`/api/images/${imageId}/reviews/stats`),
        api.get(`/api/images/${imageId}/reviews?limit=5`),
      ]);
      setStats(statsRes.data.data);
      setReviews(listRes.data.data);
    } catch (e) {
      setError(e.response?.data?.message || 'Failed to submit review');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    setSubmitting(true);
    setError('');
    try {
      await api.delete(`/api/images/${imageId}/reviews`);
      setMyRating(0);
      setMyComment('');
      const [statsRes, listRes] = await Promise.all([
        api.get(`/api/images/${imageId}/reviews/stats`),
        api.get(`/api/images/${imageId}/reviews?limit=5`),
      ]);
      setStats(statsRes.data.data);
      setReviews(listRes.data.data);
    } catch (e) {
      setError(e.response?.data?.message || 'Failed to delete review');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="rounded-xl bg-zinc-950/60 border border-white/10 p-6 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.03)]">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-lg font-semibold tracking-tight bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">Ratings & Reviews</h3>
        <div className="flex items-center gap-2 px-2 py-1 rounded-md bg-white/5 border border-white/10">
          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
          <span className="font-medium tabular-nums">{stats.averageRating || 0}</span>
          <span className="text-xs text-gray-400">({stats.ratingsCount || 0})</span>
        </div>
      </div>

      <div className="space-y-2.5 mb-5">
        <ProgressRow label={5} value={stats.distribution?.[5] || 0} total={stats.ratingsCount || 0} />
        <ProgressRow label={4} value={stats.distribution?.[4] || 0} total={stats.ratingsCount || 0} />
        <ProgressRow label={3} value={stats.distribution?.[3] || 0} total={stats.ratingsCount || 0} />
        <ProgressRow label={2} value={stats.distribution?.[2] || 0} total={stats.ratingsCount || 0} />
        <ProgressRow label={1} value={stats.distribution?.[1] || 0} total={stats.ratingsCount || 0} />
      </div>

      {user && (
        <div className="mb-5 p-4 rounded-lg bg-gradient-to-b from-white/5 to-white/0 border border-white/10">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-sm text-gray-300">Your rating</span>
            <StarInput value={myRating} onChange={setMyRating} disabled={submitting} />
          </div>
          <Textarea
            value={myComment}
            onChange={(e) => setMyComment(e.target.value)}
            placeholder="Share more about your rating (optional)"
            className="min-h-20 bg-transparent focus-visible:ring-amber-400/40 focus-visible:border-amber-300/30"
            disabled={submitting}
          />
          {error && <p className="text-xs text-red-400 mt-2">{error}</p>}
          <div className="flex gap-2 mt-3">
            <Button onClick={handleSubmit} disabled={submitting} size="sm" className="shadow-[0_0_0_1px_rgba(251,191,36,0.2)_inset] cursor-pointer">Save review</Button>
            {myExistingReview && (
              <Button onClick={handleDelete} disabled={submitting} className="shadow-[0_0_0_1px_rgba(251,191,36,0.2)_inset] cursor-pointer" size="sm">Delete</Button>
            )}
          </div>
        </div>
      )}

      <div className="space-y-3">
        {reviews.map((r) => (
          <div
            key={r._id}
            className="border border-white/10 rounded-lg p-3 bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img src={r.user?.profilePicture || '/images/default-profile.jpg'} alt="avatar" className="w-6 h-6 rounded-full ring-1 ring-white/10" />
                <span className="text-sm text-gray-300">{r.user?.username}</span>
              </div>
              <div className="flex items-center gap-1">
                {Array.from({ length: r.rating }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
            </div>
            {r.comment && <p className="text-sm text-gray-300 mt-2 leading-relaxed">{r.comment}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RatingsReviews;