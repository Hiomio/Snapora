import React, { useState, useEffect, useRef } from 'react';
import { ThumbsUp, MoreHorizontal, Reply, Edit, Trash2, X, Check, Loader2 } from 'lucide-react';
import { useApi } from '@/hooks/useApi';
import { formatDistanceToNow } from 'date-fns';
import Link from 'next/link';

const CommentActions = ({ 
  comment, 
  user, 
  onEdit, 
  onDelete, 
  onReply, 
  setReplying, 
  isReplying 
}) => {
  const [showOptions, setShowOptions] = useState(false);
  const actionsRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (actionsRef.current && !actionsRef.current.contains(event.target)) {
        setShowOptions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const isOwner = user && comment.user._id === user._id;

  if (!user) return null;

  return (
    <div className="relative" ref={actionsRef}>
      <button 
        className="p-1 text-gray-400 hover:text-white"
        onClick={() => setShowOptions(!showOptions)}
      >
        <MoreHorizontal className="w-4 h-4" />
      </button>
      
      {showOptions && (
        <div className="absolute right-0 top-6 w-36 bg-zinc-800 border border-white/10 rounded-lg shadow-lg z-10">
          <ul className="py-2">
            {isOwner && (
              <>
                <li>
                  <button 
                    className="w-full px-4 py-2 text-left flex items-center gap-2 hover:bg-white/5 text-sm"
                    onClick={() => {
                      onEdit(comment);
                      setShowOptions(false);
                    }}
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                </li>
                <li>
                  <button 
                    className="w-full px-4 py-2 text-left flex items-center gap-2 hover:bg-white/5 text-red-400 text-sm"
                    onClick={() => {
                      onDelete(comment._id);
                      setShowOptions(false);
                    }}
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </li>
              </>
            )}
            <li>
              <button 
                className="w-full px-4 py-2 text-left flex items-center gap-2 hover:bg-white/5 text-sm"
                onClick={() => {
                  onReply(comment);
                  setShowOptions(false);
                }}
              >
                <Reply className="w-4 h-4" />
                Reply
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

const CommentItem = ({ 
  comment, 
  user, 
  imageId, 
  onReplySubmit, 
  onCommentDeleted, 
  onCommentUpdated, 
  onToggleLike 
}) => {
  const api = useApi();
  const [isReplying, setIsReplying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(comment.text);
  const [replyText, setReplyText] = useState('');
  const [replies, setReplies] = useState([]);
  const [showReplies, setShowReplies] = useState(false);
  const [loadingReplies, setLoadingReplies] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(comment.likesCount || 0);
  const [repliesCount, setRepliesCount] = useState(comment.repliesCount || 0);

  // Check if the user has already liked this comment
  useEffect(() => {
    const checkLikeStatus = async () => {
      if (!user) return;
      
      // Comment will have a likes array that contains user IDs
      if (comment.likes && comment.likes.some(id => id === user._id)) {
        setIsLiked(true);
      }
    };
    
    checkLikeStatus();
  }, [comment, user]);

  // Update local text state if comment is updated externally
  useEffect(() => {
    setEditText(comment.text);
  }, [comment.text]);

  // Handle updates for reply comments
  const handleReplyUpdated = (updatedReply) => {
    if (showReplies) {
      setReplies(prev => prev.map(reply =>
        reply._id === updatedReply._id ? { ...reply, ...updatedReply } : reply
      ));
    }
  };

  const handleStartReply = () => {
    setIsReplying(true);
  };

  const handleStartEdit = () => {
    setIsEditing(true);
    setEditText(comment.text);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleSaveEdit = async () => {
    if (!editText.trim()) return;
    
    // Optimistic update
    const originalText = comment.text;
    
    // Update locally first
    onCommentUpdated({
      ...comment,
      text: editText
    });
    
    setIsEditing(false);
    
    try {
      await api.patch(`/api/comments/${comment._id}`, { text: editText });
    } catch (error) {
      // Revert on error
      console.error("Failed to update comment:", error);
      onCommentUpdated({
        ...comment,
        text: originalText
      });
    }
  };

  const handleDeleteComment = async () => {
    // Optimistic update - remove comment locally first
    onCommentDeleted(comment._id);
    
    try {
      await api.delete(`/api/comments/${comment._id}`);
    } catch (error) {
      console.error("Failed to delete comment:", error);
      // We should add the comment back, but this would require passing the full comment object
      // This would need to be handled in the parent component
    }
  };

  const handleSubmitReply = async () => {
    if (!replyText.trim()) return;
    
    // Create a temporary reply for optimistic update
    const tempReply = {
      _id: 'temp-' + Date.now(),
      text: replyText,
      user: user,
      createdAt: new Date().toISOString(),
      likesCount: 0,
      repliesCount: 0,
      parentComment: comment._id,
      isOptimistic: true
    };
    
    // Update UI immediately
    if (showReplies) {
      setReplies(prev => [tempReply, ...prev]);
    }
    
    // Update reply count
    setRepliesCount(prev => prev + 1);
    setReplyText('');
    setIsReplying(false);
    
    try {
      // Send to backend
      const response = await api.post(`/api/comments/${imageId}`, {
        text: replyText,
        parentCommentId: comment._id
      });
      
      // On success, replace temp reply with real one if replies are showing
      if (showReplies) {
        setReplies(prev => prev.map(reply => 
          reply._id === tempReply._id ? response.data.data : reply
        ));
      }
      
      // Call the parent handler to update any state there
      onReplySubmit(response.data.data);
    } catch (error) {
      console.error("Failed to post reply:", error);
      
      // Revert optimistic updates
      if (showReplies) {
        setReplies(prev => prev.filter(reply => reply._id !== tempReply._id));
      }
      setRepliesCount(prev => prev - 1);
    }
  };

  const loadReplies = async () => {
    if (!showReplies) {
      setLoadingReplies(true);
      try {
        const response = await api.get(`/api/comments/${comment._id}/replies`);
        setReplies(response.data.data);
        setShowReplies(true);
      } catch (error) {
        console.error("Failed to load replies:", error);
      } finally {
        setLoadingReplies(false);
      }
    } else {
      setShowReplies(false);
    }
  };

  const handleToggleLike = async () => {
    if (!user) return;
    
    // Optimistic update
    const wasLiked = isLiked;
    setIsLiked(!isLiked);
    setLikesCount(prev => wasLiked ? prev - 1 : prev + 1);
    
    try {
      await api.post(`/api/comments/${comment._id}/like`);
      // After successful API call, the state is already updated
      onToggleLike(comment._id, !wasLiked);
    } catch (error) {
      console.error("Failed to toggle like:", error);
      // Revert on error
      setIsLiked(wasLiked);
      setLikesCount(prev => wasLiked ? prev + 1 : prev - 1);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-3">
        <Link href={`/profile/${comment.user.username}`} className="block">
          <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 cursor-pointer hover:ring-2 hover:ring-violet-500/50 transition-all duration-200">
            <img 
              src={comment.user.profilePicture || "/images/default-profile.jpg"} 
              alt={comment.user.username} 
              className="w-full h-full object-cover" 
            />
          </div>
        </Link>
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <Link href={`/profile/${comment.user.username}`} className="block">
                <p className="font-medium hover:text-violet-300 cursor-pointer transition-colors duration-200 hover:underline">{comment.user.fullName || comment.user.username}</p>
              </Link>
              <p className="text-xs text-gray-400">
                {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
              </p>
            </div>
            <CommentActions 
              comment={comment}
              user={user}
              onEdit={handleStartEdit}
              onDelete={handleDeleteComment}
              onReply={handleStartReply}
              setReplying={setIsReplying}
              isReplying={isReplying}
            />
          </div>
          
          {isEditing ? (
            <div className="mt-2">
              <textarea
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 sm:p-3 min-h-[60px] sm:min-h-[80px] text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 transition text-white placeholder-gray-400"
              />
              <div className="flex gap-2 mt-2">
                <button 
                  onClick={handleSaveEdit}
                  className="px-2.5 sm:px-3 py-1 bg-violet-600 hover:bg-violet-500 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 flex items-center gap-1"
                >
                  <Check className="w-3.5 sm:w-4 h-3.5 sm:h-4" /> Save
                </button>
                <button 
                  onClick={handleCancelEdit}
                  className="px-2.5 sm:px-3 py-1 bg-white/10 hover:bg-white/20 rounded-lg text-xs sm:text-sm transition-all duration-300 flex items-center gap-1"
                >
                  <X className="w-3.5 sm:w-4 h-3.5 sm:h-4" /> Cancel
                </button>
              </div>
            </div>
          ) : (
            <p className="mt-2 text-gray-200">{comment.text}</p>
          )}

          <div className="flex items-center gap-3 sm:gap-4 mt-2">
            <button 
              className={`flex items-center gap-1 text-xs sm:text-sm ${isLiked ? 'text-violet-400' : 'text-gray-400 hover:text-white'}`}
              onClick={handleToggleLike}
            >
              <ThumbsUp className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
              <span>{likesCount}</span>
            </button>
            <button 
              className="text-xs sm:text-sm text-gray-400 hover:text-white"
              onClick={handleStartReply}
            >
              Reply
            </button>
            
            {repliesCount > 0 && (
              <button 
                onClick={loadReplies}
                className="text-sm text-gray-400 hover:text-white flex items-center gap-1"
              >
                {loadingReplies ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    {showReplies ? 'Hide' : 'Show'} {repliesCount} {repliesCount === 1 ? 'reply' : 'replies'}
                  </>
                )}
              </button>
            )}
          </div>
          
          {isReplying && (
            <div className="mt-4 flex gap-3">
              <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                <img 
                  src={user?.profilePicture || "/images/default-profile.jpg"} 
                  alt="Your avatar" 
                  className="w-full h-full object-cover" 
                />
              </div>
              <div className="flex-1">
                <textarea
                  placeholder="Write a reply..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg p-3 min-h-[60px] focus:outline-none focus:ring-2 focus:ring-violet-500 transition text-white placeholder-gray-400 text-sm"
                />
                <div className="flex gap-2 mt-2">
                  <button 
                    onClick={handleSubmitReply}
                    className="px-3 py-1 bg-violet-600 hover:bg-violet-500 rounded-lg text-sm font-medium transition-all duration-300"
                  >
                    Post Reply
                  </button>
                  <button 
                    onClick={() => setIsReplying(false)}
                    className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded-lg text-sm transition-all duration-300"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Display replies */}
      {showReplies && replies.length > 0 && (
        <div className="pl-12 space-y-4">
          {replies.map((reply) => (
            <CommentItem 
              key={reply._id} 
              comment={reply} 
              user={user} 
              imageId={imageId}
              onReplySubmit={onReplySubmit}
              onCommentDeleted={onCommentDeleted}
              onCommentUpdated={(updatedComment) => {
                // First update the local replies state
                handleReplyUpdated(updatedComment);
                // Then propagate to the parent handler
                onCommentUpdated(updatedComment);
              }}
              onToggleLike={onToggleLike}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const CommentsSection = ({ 
  imageId,
  user
}) => {
  const api = useApi();
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalComments, setTotalComments] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  // Fetch comments
  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/api/comments/${imageId}?page=${page}&limit=10`);
        
        // First page: replace comments, otherwise append
        if (page === 1) {
          setComments(response.data.data);
        } else {
          setComments(prev => [...prev, ...response.data.data]);
        }
        
        setTotalComments(response.data.metadata.total);
        setHasMore(page < response.data.metadata.pages);
      } catch (err) {
        setError("Failed to load comments");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [imageId, page, api]);

  const handleLoadMore = () => {
    if (hasMore && !loading) {
      setPage(prev => prev + 1);
    }
  };

  const handlePostComment = async () => {
    if (!commentText.trim() || !user) return;
    
    // Create temporary comment for optimistic update
    const tempComment = {
      _id: 'temp-' + Date.now(),
      text: commentText,
      user: user,
      createdAt: new Date().toISOString(),
      likesCount: 0,
      repliesCount: 0,
      isOptimistic: true
    };
    
    // Update UI immediately
    setComments(prev => [tempComment, ...prev]);
    setTotalComments(prev => prev + 1);
    setCommentText('');
    setSubmitting(true);
    
    try {
      // Post to backend
      const response = await api.post(`/api/comments/${imageId}`, { text: commentText });
      
      // Replace temporary comment with real one
      setComments(prev => prev.map(comment => 
        comment._id === tempComment._id ? response.data.data : comment
      ));
    } catch (error) {
      console.error("Failed to post comment:", error);
      
      // Remove temporary comment on error
      setComments(prev => prev.filter(comment => comment._id !== tempComment._id));
      setTotalComments(prev => prev - 1);
      setCommentText(tempComment.text); // Restore the text
    } finally {
      setSubmitting(false);
    }
  };

  const handleReplySubmit = (newReply) => {
    // If this is a reply to an existing comment, increment its reply count
    if (newReply.parentComment) {
      setComments(prev => prev.map(comment => 
        comment._id === newReply.parentComment 
          ? { ...comment, repliesCount: (comment.repliesCount || 0) + 1 }
          : comment
      ));
    }
  };

  const handleCommentDeleted = (commentId) => {
    // Remove the comment from the list
    setComments(prev => prev.filter(c => c._id !== commentId));
    setTotalComments(prev => prev - 1);
  };

  const handleCommentUpdated = (updatedComment) => {
    // Update the comment in the list
    setComments(prev => prev.map(c => 
      c._id === updatedComment._id ? { ...c, ...updatedComment } : c
    ));
  };

  const handleToggleLike = (commentId, isNowLiked) => {
    // Update like count in the comment
    setComments(prev => prev.map(comment => 
      comment._id === commentId 
        ? { 
            ...comment, 
            likesCount: isNowLiked ? (comment.likesCount || 0) + 1 : (comment.likesCount || 1) - 1,
            isLiked: isNowLiked 
          }
        : comment
    ));
  };

  return (
    <div className="rounded-xl bg-zinc-900/60 border border-white/10 p-4 sm:p-6">
      <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">Comments ({totalComments})</h3>

      {/* Comment input */}
      {user ? (
        <div className="flex gap-2 sm:gap-3 mb-6 sm:mb-8">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden flex-shrink-0">
            <img 
              src={user?.profilePicture || "/images/default-profile.jpg"} 
              alt="Your avatar" 
              className="w-full h-full object-cover" 
            />
          </div>
          <div className="flex-1">
            <div className="relative mb-2">
              <textarea
                placeholder="Add a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 sm:p-3 min-h-[60px] sm:min-h-[80px] text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-violet-500 transition text-white placeholder-gray-400"
              />
            </div>
            <button 
              className={`px-4 py-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2 disabled:opacity-50 disabled:pointer-events-none`}
              onClick={handlePostComment}
              disabled={!commentText.trim() || submitting}
            >
              {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
              Post Comment
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white/5 border border-white/10 rounded-lg p-4 mb-6 text-center">
          <p className="text-gray-400">Please sign in to leave a comment</p>
        </div>
      )}

      {/* Comment list */}
      {loading && page === 1 ? (
        <div className="py-8 flex justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-violet-500" />
        </div>
      ) : error ? (
        <div className="bg-red-900/20 border border-red-500/20 rounded-lg p-4 text-center">
          <p className="text-red-400">{error}</p>
        </div>
      ) : comments.length === 0 ? (
        <div className="py-8 text-center">
          <p className="text-gray-400">No comments yet. Be the first to share your thoughts!</p>
        </div>
      ) : (
        <>
          <div className="space-y-6">
            {comments.map((comment) => (
              <CommentItem 
                key={comment._id} 
                comment={comment} 
                user={user} 
                imageId={imageId}
                onReplySubmit={handleReplySubmit}
                onCommentDeleted={handleCommentDeleted}
                onCommentUpdated={handleCommentUpdated}
                onToggleLike={handleToggleLike}
              />
            ))}
          </div>
          
          {hasMore && (
            <div className="mt-6 text-center">
              <button 
                className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm transition-all duration-300 flex items-center gap-2 mx-auto"
                onClick={handleLoadMore}
                disabled={loading}
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                Load More Comments
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CommentsSection; 