import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Clock, BookOpen, Star, ChevronRight, Filter } from 'lucide-react';

interface Tutorial {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  rating: number;
  author: {
    name: string;
    avatar: string;
  };
  tags: string[];
  thumbnail: string;
}

const sampleTutorials: Tutorial[] = [
  {
    id: '1',
    title: 'Getting Started with React Hooks',
    description: 'Learn the fundamentals of React Hooks and how to use them effectively in your applications.',
    duration: '45 mins',
    level: 'Beginner',
    rating: 4.8,
    author: {
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    },
    tags: ['React', 'Hooks', 'JavaScript'],
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800',
  },
  {
    id: '2',
    title: 'Advanced TypeScript Patterns',
    description: 'Explore advanced TypeScript patterns and techniques for building robust applications.',
    duration: '60 mins',
    level: 'Advanced',
    rating: 4.9,
    author: {
      name: 'Michael Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    },
    tags: ['TypeScript', 'Patterns', 'Advanced'],
    thumbnail: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800',
  },
];

const levels = ['Beginner', 'Intermediate', 'Advanced'];
const durations = ['< 30 mins', '30-60 mins', '> 60 mins'];

function Tutorials() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [selectedDuration, setSelectedDuration] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const filteredTutorials = sampleTutorials.filter(tutorial => {
    const matchesSearch = tutorial.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLevel = !selectedLevel || tutorial.level === selectedLevel;
    return matchesSearch && matchesLevel;
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
          <h1 className="text-4xl font-bold mb-4 md:mb-0">Video Tutorials</h1>
          <div className="flex items-center space-x-4">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search tutorials..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <Filter className="w-5 h-5 mr-2" />
              Filters
            </button>
          </div>
        </div>

        {showFilters && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Level</h3>
                <div className="flex flex-wrap gap-2">
                  {levels.map((level) => (
                    <button
                      key={level}
                      onClick={() => setSelectedLevel(selectedLevel === level ? null : level)}
                      className={`px-3 py-1 rounded-full text-sm ${
                        selectedLevel === level
                          ? 'bg-primary-500 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-2">Duration</h3>
                <div className="flex flex-wrap gap-2">
                  {durations.map((duration) => (
                    <button
                      key={duration}
                      onClick={() => setSelectedDuration(selectedDuration === duration ? null : duration)}
                      className={`px-3 py-1 rounded-full text-sm ${
                        selectedDuration === duration
                          ? 'bg-primary-500 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {duration}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTutorials.map((tutorial) => (
            <motion.div
              key={tutorial.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              <img
                src={tutorial.thumbnail}
                alt={tutorial.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    tutorial.level === 'Beginner'
                      ? 'bg-green-100 text-green-800'
                      : tutorial.level === 'Intermediate'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {tutorial.level}
                  </span>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 text-gray-400 mr-1" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {tutorial.duration}
                    </span>
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-2">{tutorial.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {tutorial.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {tutorial.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <img
                      src={tutorial.author.avatar}
                      alt={tutorial.author.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {tutorial.author.name}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 mr-1" />
                    <span className="text-sm font-medium">{tutorial.rating}</span>
                  </div>
                </div>

                <button className="mt-4 w-full flex items-center justify-center px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors">
                  Start Learning
                  <ChevronRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default Tutorials;