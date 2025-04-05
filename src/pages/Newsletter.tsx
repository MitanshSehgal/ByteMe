import React from 'react';
import { motion } from 'framer-motion';

function Newsletter() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="glass-panel container-padding">
        <h1 className="text-4xl font-bold mb-6">Newsletter</h1>
        <p className="text-lg mb-4">
          Subscribe to our newsletter to stay updated with the latest content.
        </p>
      </div>
    </motion.div>
  );
}

export default Newsletter;