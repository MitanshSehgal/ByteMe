import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, FileText, Book, Code, Download } from 'lucide-react';

interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'guide' | 'cheatsheet' | 'documentation' | 'reference';
  downloadCount: number;
  author: {
    name: string;
    avatar: string;
  };
}

const sampleResources: Resource[] = [
  {
    id: '1',
    title: 'Complete React Cheatsheet',
    description: 'A comprehensive guide to React hooks, patterns, and best practices',
    type: 'cheatsheet',
    downloadCount: 1234,
    author: {
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    },
  },
  {
    id: '2',
    title: 'TypeScript Best Practices',
    description: 'Learn advanced TypeScript patterns and techniques',
    type: 'guide',
    downloadCount: 892,
    author: {
      name: 'Michael Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    },
  },
];

const resourceTypes = [
  { type: 'guide', icon: Book, label: 'Guides' },
  { type: 'cheatsheet', icon: FileText, label: 'Cheatsheets' },
  { type: 'documentation', icon: Code, label: 'Documentation' },
  { type: 'reference', icon: FileText, label: 'References' },
];

function Resources() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const filteredResources = sampleResources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = !selectedType || resource.type === selectedType;
    return matchesSearch && matchesType;
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
          <h1 className="text-4xl font-bold mb-4 md:mb-0">Learning Resources</h1>
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search resources..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
          {resourceTypes.map(({ type, icon: Icon, label }) => (
            <button
              key={type}
              onClick={() => setSelectedType(selectedType === type ? null : type)}
              className={`flex items-center px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                selectedType === type
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              <Icon className="w-4 h-4 mr-2" />
              {label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredResources.map((resource) => (
            <motion.div
              key={resource.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold mb-2">{resource.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {resource.description}
                  </p>
                </div>
                <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-300 rounded-full text-sm capitalize">
                  {resource.type}
                </span>
              </div>

              <div className="flex items-center justify-between mt-6">
                <div className="flex items-center space-x-3">
                  <img
                    src={resource.author.avatar}
                    alt={resource.author.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {resource.author.name}
                  </span>
                </div>
                <button className="flex items-center text-primary-500 hover:text-primary-600">
                  <Download className="w-4 h-4 mr-1" />
                  <span className="text-sm font-medium">
                    {resource.downloadCount.toLocaleString()}
                  </span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default Resources;