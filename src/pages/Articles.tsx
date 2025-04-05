import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, BookOpen, Clock, ThumbsUp, MessageSquare, Share2 } from 'lucide-react';

interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  readTime: string;
  author: {
    name: string;
    avatar: string;
  };
  likes: number;
  comments: number;
  publishedAt: Date;
}

const sampleArticles: Article[] = [
  {
    id: '1',
    title: 'The Future of AI in Education',
    excerpt: 'Exploring how artificial intelligence is transforming the learning experience',
    content: 'Full article content here...',
    coverImage: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800',
    category: 'Technology',
    readTime: '5 min read',
    author: {
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    },
    likes: 245,
    comments: 28,
    publishedAt: new Date('2024-03-15'),
  },
  {
    id: '2',
    title: 'Mastering TypeScript: Advanced Patterns',
    excerpt: 'Deep dive into advanced TypeScript patterns and best practices',
    content: 'Full article content here...',
    coverImage: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800',
    category: 'Programming',
    readTime: '8 min read',
    author: {
      name: 'Michael Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    },
    likes: 156,
    comments: 32,
    publishedAt: new Date('2024-03-10'),
  },
];

function Articles() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = ['All', 'Technology', 'Programming', 'Education', 'Career'];

  const filteredArticles = sampleArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || selectedCategory === 'All' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
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
          <h1 className="text-4xl font-bold mb-4 md:mb-0">Articles</h1>
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search articles..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                selectedCategory === category
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredArticles.map((article) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              <img
                src={article.coverImage}
                alt={article.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 rounded-full text-sm">
                    {article.category}
                  </span>
                  <div className="flex items-center text-gray-500 dark:text-gray-400">
                    <Clock className="w-4 h-4 mr-1" />
                    <span className="text-sm">{article.readTime}</span>
                  </div>
                </div>

                <h2 className="text-xl font-bold mb-2">{article.title}</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {article.excerpt}
                </p>

                <div className="flex items-center justify-between mt-6">
                  <div className="flex items-center space-x-3">
                    <img
                      src={article.author.avatar}
                      alt={article.author.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <div className="text-sm">
                      <p className="font-medium">{article.author.name}</p>
                      <p className="text-gray-500 dark:text-gray-400">
                        {article.publishedAt.toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 text-gray-500 dark:text-gray-400">
                    <button className="flex items-center space-x-1 hover:text-primary-500">
                      <ThumbsUp className="w-4 h-4" />
                      <span>{article.likes}</span>
                    </button>
                    <button className="flex items-center space-x-1 hover:text-primary-500">
                      <MessageSquare className="w-4 h-4" />
                      <span>{article.comments}</span>
                    </button>
                    <button className="hover:text-primary-500">
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default Articles;