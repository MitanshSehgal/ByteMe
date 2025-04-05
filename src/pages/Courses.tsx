import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, BookOpen, Clock, Star, ChevronRight } from 'lucide-react';

interface Course {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  difficulty: string;
  duration: string;
  rating: number;
  enrolled: number;
}

const sampleCourses: Course[] = [
  {
    id: '1',
    title: 'React Fundamentals',
    description: 'Master the basics of React and modern web development',
    coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800',
    difficulty: 'Beginner',
    duration: '6 hours',
    rating: 4.8,
    enrolled: 1234,
  },
  {
    id: '2',
    title: 'Advanced TypeScript',
    description: 'Deep dive into TypeScript features and best practices',
    coverImage: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800',
    difficulty: 'Advanced',
    duration: '8 hours',
    rating: 4.9,
    enrolled: 892,
  },
];

function Courses() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);

  const difficulties = ['Beginner', 'Intermediate', 'Advanced'];

  const filteredCourses = sampleCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty = !selectedDifficulty || course.difficulty === selectedDifficulty;
    return matchesSearch && matchesDifficulty;
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
          <h1 className="text-4xl font-bold mb-4 md:mb-0">Explore Courses</h1>
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search courses..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
          {difficulties.map((difficulty) => (
            <button
              key={difficulty}
              onClick={() => setSelectedDifficulty(
                selectedDifficulty === difficulty ? null : difficulty
              )}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                selectedDifficulty === difficulty
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {difficulty}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              <img
                src={course.coverImage}
                alt={course.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {course.description}
                </p>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {course.duration}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm font-medium">{course.rating}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {course.enrolled.toLocaleString()} enrolled
                  </span>
                  <button className="flex items-center text-primary-500 hover:text-primary-600 font-medium">
                    Learn More
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default Courses;