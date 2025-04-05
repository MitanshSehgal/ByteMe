import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ThumbsUp, MessageSquare, Plus } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface Suggestion {
  id: string;
  title: string;
  description: string;
  category: 'feature' | 'bug' | 'improvement' | 'other';
  status: 'pending' | 'reviewing' | 'accepted' | 'rejected' | 'implemented';
  votes: number;
  comments: number;
  author: {
    name: string;
    avatar: string;
  };
  createdAt: Date;
}

const sampleSuggestions: Suggestion[] = [
  {
    id: '1',
    title: 'Add Dark Mode Support',
    description: 'Implement a dark mode option for better night-time viewing',
    category: 'feature',
    status: 'implemented',
    votes: 156,
    comments: 24,
    author: {
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    },
    createdAt: new Date('2024-03-15'),
  },
  {
    id: '2',
    title: 'Improve Mobile Navigation',
    description: 'Make the mobile navigation more intuitive and easier to use',
    category: 'improvement',
    status: 'reviewing',
    votes: 89,
    comments: 12,
    author: {
      name: 'Michael Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    },
    createdAt: new Date('2024-03-20'),
  },
];

const categories = [
  { value: 'feature', label: 'Feature Request' },
  { value: 'bug', label: 'Bug Report' },
  { value: 'improvement', label: 'Improvement' },
  { value: 'other', label: 'Other' },
];

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  reviewing: 'bg-blue-100 text-blue-800',
  accepted: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
  implemented: 'bg-purple-100 text-purple-800',
};

function Suggestions() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredSuggestions = sampleSuggestions.filter(suggestion => {
    const matchesSearch = suggestion.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || suggestion.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-4xl font-bold mb-4 md:mb-0">Suggestions</h1>
          <button className="flex items-center px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors">
            <Plus className="w-5 h-5 mr-2" />
            New Suggestion
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search suggestions..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => setSelectedCategory(
                selectedCategory === category.value ? null : category.value
              )}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                selectedCategory === category.value
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        <div className="space-y-6">
          {filteredSuggestions.map((suggestion) => (
            <motion.div
              key={suggestion.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold mb-2">{suggestion.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {suggestion.description}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm capitalize ${
                  statusColors[suggestion.status]
                }`}>
                  {suggestion.status}
                </span>
              </div>

              <div className="flex items-center justify-between mt-6">
                <div className="flex items-center space-x-6">
                  <button className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-primary-500">
                    <ThumbsUp className="w-4 h-4" />
                    <span>{suggestion.votes}</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-primary-500">
                    <MessageSquare className="w-4 h-4" />
                    <span>{suggestion.comments}</span>
                  </button>
                </div>
                <div className="flex items-center space-x-3">
                  <img
                    src={suggestion.author.avatar}
                    alt={suggestion.author.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <div className="text-sm">
                    <p className="text-gray-600 dark:text-gray-400">
                      {suggestion.author.name}
                    </p>
                    <p className="text-gray-500">
                      {suggestion.createdAt.toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default Suggestions;