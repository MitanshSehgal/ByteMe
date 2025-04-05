import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, ThumbsUp, Share2, Flag, X } from 'lucide-react';
import toast from 'react-hot-toast';

interface Post {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  likes: number;
  comments: number;
  category: string;
  createdAt: Date;
}

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (post: Omit<Post, 'id' | 'likes' | 'comments' | 'createdAt'>) => void;
}

function CreatePostModal({ isOpen, onClose, onSubmit }: CreatePostModalProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('discussion');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    onSubmit({
      title,
      content,
      category,
      author: {
        name: 'Current User',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      },
    });

    setTitle('');
    setContent('');
    setCategory('discussion');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
        >
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.95 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-lg"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Create Post</h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium mb-1">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border dark:bg-gray-700"
                  maxLength={100}
                  required
                />
              </div>

              <div>
                <label htmlFor="content" className="block text-sm font-medium mb-1">
                  Content
                </label>
                <textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border dark:bg-gray-700 min-h-[100px]"
                  maxLength={1000}
                  required
                />
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium mb-1">
                  Category
                </label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border dark:bg-gray-700"
                >
                  <option value="academic">Academic Article</option>
                  <option value="notes">Study Notes</option>
                  <option value="discussion">Discussion</option>
                </select>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg border hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-primary-500 text-white hover:bg-primary-600"
                >
                  Create Post
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Community() {
  const [activeTab, setActiveTab] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      title: 'Understanding React Hooks',
      content: 'A comprehensive guide to React Hooks and their practical applications...',
      author: {
        name: 'Sarah Johnson',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      },
      likes: 42,
      comments: 12,
      category: 'academic',
      createdAt: new Date(),
    },
  ]);

  const tabs = [
    { id: 'all', label: 'All Posts' },
    { id: 'academic', label: 'Academic Articles' },
    { id: 'notes', label: 'Study Notes' },
    { id: 'discussion', label: 'Discussions' },
  ];

  const handleCreatePost = useCallback((newPost: Omit<Post, 'id' | 'likes' | 'comments' | 'createdAt'>) => {
    const post: Post = {
      ...newPost,
      id: crypto.randomUUID(),
      likes: 0,
      comments: 0,
      createdAt: new Date(),
    };
    setPosts(prev => [post, ...prev]);
    toast.success('Post created successfully');
  }, []);

  const handleLike = useCallback((postId: string) => {
    setPosts(prev => prev.map(post => 
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ));
  }, []);

  const filteredPosts = posts.filter(post => 
    activeTab === 'all' || post.category === activeTab
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="glass-panel container-padding">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Community Hub</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors"
          >
            Create Post
          </button>
        </div>

        <div className="flex space-x-2 mb-8 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors
                ${activeTab === tab.id
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="space-y-6">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No posts in this category yet
            </div>
          ) : (
            filteredPosts.map((post) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <h3 className="font-medium">{post.author.name}</h3>
                    <p className="text-sm text-gray-500">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {post.content}
                </p>

                <div className="flex items-center space-x-6 text-gray-500">
                  <button
                    onClick={() => handleLike(post.id)}
                    className="flex items-center space-x-2 hover:text-primary-500 transition-colors"
                  >
                    <ThumbsUp className="w-5 h-5" />
                    <span>{post.likes}</span>
                  </button>
                  <button className="flex items-center space-x-2 hover:text-primary-500 transition-colors">
                    <MessageSquare className="w-5 h-5" />
                    <span>{post.comments}</span>
                  </button>
                  <button
                    onClick={() => toast.error('Sharing coming soon')}
                    className="flex items-center space-x-2 hover:text-primary-500 transition-colors"
                  >
                    <Share2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => toast.error('Reporting coming soon')}
                    className="flex items-center space-x-2 hover:text-red-500 transition-colors"
                  >
                    <Flag className="w-5 h-5" />
                  </button>
                </div>
              </motion.article>
            ))
          )}
        </div>
      </div>

      <CreatePostModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreatePost}
      />
    </motion.div>
  );
}

export default Community;