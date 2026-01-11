"use client"
import React from 'react';
import { ImageIcon, Users, Grid, Tag } from 'lucide-react';

const ResultTabs = ({ activeTab, setActiveTab, counts }) => {
  const tabs = [
    { 
      id: 'all', 
      name: 'All Results', 
      count: (counts.images || 0) + (counts.users || 0) + (counts.collections || 0) + (counts.tags || 0) 
    },
    { 
      id: 'images', 
      name: 'Images', 
      count: counts.images || 0, 
      icon: <ImageIcon className="w-4 h-4" /> 
    },
    { 
      id: 'users', 
      name: 'Users', 
      count: counts.users || 0, 
      icon: <Users className="w-4 h-4" /> 
    },
    { 
      id: 'collections', 
      name: 'Collections', 
      count: counts.collections || 0, 
      icon: <Grid className="w-4 h-4" /> 
    },
    { 
      id: 'tags', 
      name: 'Tags', 
      count: counts.tags || 0, 
      icon: <Tag className="w-4 h-4" /> 
    },
  ];

  return (
    <div className="border-b border-white/10 mb-4 sm:mb-6 w-full">
      <div className="grid grid-cols-5 gap-1 sm:flex sm:items-center sm:space-x-4 md:space-x-6 w-full">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-0.5 sm:gap-2 py-2 sm:py-4 border-b-2 text-[10px] sm:text-sm font-medium ${
              activeTab === tab.id
                ? 'border-violet-500 text-white'
                : 'border-transparent text-gray-400 hover:text-gray-300'
            } transition-colors duration-200`}
          >
            {tab.icon && <span className="sm:inline-flex">{tab.icon}</span>}
            <span className="hidden sm:inline">{tab.name}</span>
            <span className="sm:hidden text-center">{tab.name.split(' ')[0]}</span>
            <span className="bg-white/10 text-[10px] sm:text-xs px-1 sm:px-2 py-0.5 rounded-full">{tab.count}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ResultTabs; 