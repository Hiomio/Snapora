"use client"
import React from 'react';
import { Tag } from 'lucide-react';
import Link from 'next/link';

const TagsTab = ({ loading, tagResults }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {loading ? (
        Array(6).fill(0).map((_, idx) => (
          <div key={idx} className="bg-zinc-900/60 border border-white/10 rounded-full px-4 py-3 animate-pulse">
            <div className="h-5 w-3/4 bg-zinc-800 rounded-full"></div>
          </div>
        ))
      ) : tagResults.length > 0 ? (
        tagResults.map(tag => (
          <Link 
            href={`/tags/${tag.name}`} 
            key={tag.name} 
            className="bg-zinc-900/60 border border-white/10 rounded-full px-4 py-3 flex items-center justify-between hover:border-violet-500/50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-violet-400"/>
              <span className="text-sm font-medium">#{tag.name}</span>
            </div>
            <span className="text-xs text-gray-400">{tag.count} posts</span>
          </Link>
        ))
      ) : (
        <div className="col-span-3 text-center py-16 bg-zinc-900/60 border border-white/10 rounded-xl">
          <Tag className="w-12 h-12 text-gray-500 mx-auto mb-3" />
          <h3 className="text-xl font-medium mb-2">No tags found</h3>
          <p className="text-gray-400">Try different keywords or check the spelling</p>
        </div>
      )}
    </div>
  );
};

export default TagsTab; 