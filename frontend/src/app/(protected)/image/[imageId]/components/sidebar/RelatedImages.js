import React from 'react';
import Link from 'next/link';

const RelatedImages = ({ image, relatedImages }) => {
  return (
    <div className="rounded-xl bg-zinc-900/60 border border-white/10 p-6">
      <h3 className="text-lg font-bold mb-4">More from this creator</h3>

      <div className="grid grid-cols-2 gap-3">
        {relatedImages && relatedImages.length > 0 ? (
          relatedImages
            .filter(relImg => relImg._id !== image._id) // Filter out current image
            .slice(0, 4) // Limit to 4 images
            .map((relatedImage) => (
              <div key={relatedImage._id} className="group cursor-pointer">
                <Link href={`/image/${relatedImage._id}`}>
                  <div className="rounded-lg overflow-hidden mb-2 relative">
                    <img
                      src={relatedImage.imageUrl}
                      alt={relatedImage.title}
                      className="w-full aspect-[4/5] object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                      <div>
                        <h4 className="text-sm font-medium text-white">{relatedImage.title}</h4>
                        <p className="text-xs text-gray-300">{relatedImage.user?.username}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))
        ) : (
          <div className="col-span-2 text-center py-8 text-gray-400">
            No other images from this creator
          </div>
        )}
      </div>

      <Link href={`/profile/${image.user.username}`} className="w-full py-2 text-center bg-white/5 hover:bg-white/10 rounded-lg text-violet-400 transition-colors mt-4 block">
        View all by this creator
      </Link>
    </div>
  );
};

export default RelatedImages; 