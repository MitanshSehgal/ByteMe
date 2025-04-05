import React from 'react';
import { motion } from 'framer-motion';

function Blog() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="glass-panel container-padding">
        <h1 className="text-4xl font-bold mb-6">Blog</h1>
        <p className="text-lg mb-4">
          Explore our collection of articles and insights.
        </p>
      </div>
    </motion.div>
  );
}

export default Blog;