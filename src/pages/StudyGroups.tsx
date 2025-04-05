import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Users, Lock, Globe, Plus } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface StudyGroup {
  id: string;
  name: string;
  description: string;
  isPrivate: boolean;
  memberCount: number;
  maxMembers: number;
  creator: {
    name: string;
    avatar: string;
  };
}

const sampleGroups: StudyGroup[] = [
  {
    id: '1',
    name: 'React Masters',
    description: 'A group for advanced React developers to share knowledge and collaborate',
    isPrivate: false,
    memberCount: 24,
    maxMembers: 50,
    creator: {
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    },
  },
  {
    id: '2',
    name: 'TypeScript Study Circle',
    description: 'Weekly TypeScript discussions and problem-solving sessions',
    isPrivate: true,
    memberCount: 12,
    maxMembers: 20,
    creator: {
      name: 'Michael Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    },
  },
];

function StudyGroups() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [showPrivate, setShowPrivate] = useState(false);

  const filteredGroups = sampleGroups.filter(group => {
    const matchesSearch = group.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesVisibility = showPrivate ? true : !group.isPrivate;
    return matchesSearch && matchesVisibility;
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-4xl font-bold mb-4 md:mb-0">Study Groups</h1>
          <button className="flex items-center px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors">
            <Plus className="w-5 h-5 mr-2" />
            Create Group
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search study groups..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button
            onClick={() => setShowPrivate(!showPrivate)}
            className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
              showPrivate
                ? 'bg-primary-500 text-white'
                : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {showPrivate ? <Lock className="w-4 h-4 mr-2" /> : <Globe className="w-4 h-4 mr-2" />}
            {showPrivate ? 'Show All' : 'Public Only'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredGroups.map((group) => (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="text-xl font-bold">{group.name}</h3>
                    {group.isPrivate && (
                      <Lock className="w-4 h-4 text-gray-400" />
                    )}
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mt-2">
                    {group.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between mt-6">
                <div className="flex items-center space-x-3">
                  <img
                    src={group.creator.avatar}
                    alt={group.creator.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <div className="text-sm">
                    <p className="text-gray-600 dark:text-gray-400">Created by</p>
                    <p className="font-medium">{group.creator.name}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {group.memberCount}/{group.maxMembers}
                  </span>
                </div>
              </div>

              <button className="w-full mt-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors">
                Join Group
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default StudyGroups;