import React, { useCallback, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import { FileText, Upload, Folder, Search } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

interface Document {
  id: string;
  title: string;
  type: string;
  size: number;
  uploadedAt: Date;
  category?: string;
}

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

function Documents() {
  const { user } = useAuth();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Filter documents based on search query and category
  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const onDrop = useCallback((acceptedFiles: File[]) => {
    try {
      const oversizedFiles = acceptedFiles.filter(file => file.size > MAX_FILE_SIZE);
      if (oversizedFiles.length > 0) {
        toast.error('Some files exceed the 10MB size limit');
        return;
      }

      const newDocs = acceptedFiles.map(file => ({
        id: crypto.randomUUID(),
        title: file.name,
        type: file.type,
        size: file.size,
        uploadedAt: new Date(),
        category: selectedCategory || undefined,
      }));

      setDocuments(prev => [...prev, ...newDocs]);
      toast.success('Files uploaded successfully');
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload files');
    }
  }, [selectedCategory]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc', '.docx'],
      'text/plain': ['.txt'],
    },
    maxSize: MAX_FILE_SIZE,
  });

  const categories = [
    { name: 'Course Notes', icon: <FileText className="w-5 h-5" /> },
    { name: 'Study Materials', icon: <Folder className="w-5 h-5" /> },
    { name: 'Academic Resources', icon: <FileText className="w-5 h-5" /> },
  ];

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Clear search when component unmounts
  useEffect(() => {
    return () => setSearchQuery('');
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="glass-panel container-padding">
        <h1 className="text-4xl font-bold mb-6">Document Repository</h1>
        
        {/* Search Bar */}
        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search documents..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search documents"
          />
        </div>

        {/* Categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {categories.map((category) => (
            <motion.button
              key={category.name}
              onClick={() => setSelectedCategory(
                selectedCategory === category.name ? null : category.name
              )}
              whileHover={{ scale: 1.02 }}
              className={`p-4 rounded-lg shadow-sm border transition-colors ${
                selectedCategory === category.name
                  ? 'bg-primary-50 dark:bg-primary-900/20 border-primary-500'
                  : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
              }`}
            >
              <div className="flex items-center space-x-3">
                {category.icon}
                <h3 className="font-semibold">{category.name}</h3>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Upload Area */}
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center mb-8 transition-colors
            ${isDragActive 
              ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/10' 
              : 'border-gray-300 dark:border-gray-700'
            }`}
        >
          <input {...getInputProps()} />
          <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <p className="text-lg mb-2">
            {isDragActive
              ? 'Drop your files here'
              : 'Drag & drop files here, or click to select'}
          </p>
          <p className="text-sm text-gray-500">
            Supported formats: PDF, DOC, DOCX, TXT (Max size: 10MB)
          </p>
        </div>

        {/* Document List */}
        <div className="space-y-4">
          {filteredDocuments.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              {searchQuery
                ? 'No documents match your search'
                : 'No documents uploaded yet'}
            </div>
          ) : (
            filteredDocuments.map((doc) => (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-lg bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <FileText className="w-5 h-5 text-gray-400" />
                    <div>
                      <h4 className="font-medium">{doc.title}</h4>
                      <div className="flex space-x-2 text-sm text-gray-500">
                        <span>{formatFileSize(doc.size)}</span>
                        <span>•</span>
                        <span>{new Date(doc.uploadedAt).toLocaleDateString()}</span>
                        {doc.category && (
                          <>
                            <span>•</span>
                            <span>{doc.category}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <button 
                    className="text-primary-500 hover:text-primary-600 transition-colors"
                    onClick={() => toast.error('Download feature coming soon')}
                  >
                    Download
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default Documents;