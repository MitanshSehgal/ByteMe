import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Send, Bot, X, Minimize2, Maximize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const quickResponses = [
  'How do I get started?',
  'What courses are available?',
  'Technical support',
  'Account issues',
];

const pageSpecificResponses: Record<string, string[]> = {
  '/courses': [
    'Course recommendations',
    'Learning path help',
    'Course difficulty',
    'Prerequisites',
  ],
  '/community': [
    'Find study partners',
    'Join discussion',
    'Create study group',
    'Community guidelines',
  ],
  '/resources': [
    'Find learning materials',
    'Download guides',
    'Resource types',
    'Submit resource',
  ],
  '/video-chat': [
    'Join a session',
    'Audio issues',
    'Video quality',
    'Connection help',
  ],
};

function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const getCurrentResponses = useCallback(() => {
    return pageSpecificResponses[location.pathname] || quickResponses;
  }, [location.pathname]);

  const handleSend = async () => {
    if (!message.trim()) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      text: message,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setMessage('');

    // Simulate context-aware bot response
    setTimeout(() => {
      let response = `Thanks for your message! This is a contextual response to: "${message}"`;
      
      // Add page-specific context to response
      if (location.pathname === '/courses') {
        response += ' I see you\'re interested in our courses.';
      } else if (location.pathname === '/community') {
        response += ' I can help you connect with our community.';
      } else if (location.pathname === '/resources') {
        response += ' Let me help you find the right resources.';
      }

      const botMessage: Message = {
        id: crypto.randomUUID(),
        text: response,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  const handleQuickResponse = (response: string) => {
    setMessage(response);
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-4 right-4 p-4 bg-primary-500 text-white rounded-full shadow-lg hover:bg-primary-600 transition-all z-50 group"
          >
            <Bot className="w-6 h-6" />
            <span className="absolute right-full mr-2 bg-white text-gray-800 px-2 py-1 rounded text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
              Need help?
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              scale: 1,
              height: isMinimized ? 'auto' : '500px'
            }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className={`fixed bottom-4 right-4 w-96 bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden z-50 ${
              isMinimized ? 'h-auto' : 'h-[500px]'
            }`}
          >
            {/* Header */}
            <div className="p-4 bg-primary-500 text-white flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Bot className="w-5 h-5" />
                <span className="font-medium">AI Assistant</span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1 hover:bg-primary-600 rounded transition-colors"
                >
                  {isMinimized ? (
                    <Maximize2 className="w-4 h-4" />
                  ) : (
                    <Minimize2 className="w-4 h-4" />
                  )}
                </button>
                
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-primary-600 rounded transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages */}
                <div className="p-4 h-[350px] overflow-y-auto">
                  {messages.length === 0 ? (
                    <div className="text-center text-gray-500 dark:text-gray-400 mt-4">
                      <Bot className="w-12 h-12 mx-auto mb-2 text-primary-500" />
                      <p>Hi! How can I help you today?</p>
                      <p className="text-sm mt-2">I can provide assistance specific to this page.</p>
                    </div>
                  ) : (
                    messages.map((msg) => (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`mb-4 flex ${
                          msg.sender === 'user' ? 'justify-end' : 'justify-start'
                        }`}
                      >
                        <div
                          className={`max-w-[80%] p-3 rounded-lg ${
                            msg.sender === 'user'
                              ? 'bg-primary-500 text-white'
                              : 'bg-gray-100 dark:bg-gray-700'
                          }`}
                        >
                          <p>{msg.text}</p>
                          <p
                            className={`text-xs mt-1 ${
                              msg.sender === 'user'
                                ? 'text-primary-100'
                                : 'text-gray-500 dark:text-gray-400'
                            }`}
                          >
                            {msg.timestamp.toLocaleTimeString()}
                          </p>
                        </div>
                      </motion.div>
                    ))
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Responses */}
                <div className="p-4 border-t dark:border-gray-700">
                  <div className="flex flex-wrap gap-2">
                    {getCurrentResponses().map((response) => (
                      <motion.button
                        key={response}
                        whileHover={{ scale: 1.05 }}
                        onClick={() => handleQuickResponse(response)}
                        className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                      >
                        {response}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Input */}
                <div className="p-4 border-t dark:border-gray-700">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                      placeholder="Type your message..."
                      className="flex-1 px-4 py-2 border dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700"
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleSend}
                      className="p-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
                    >
                      <Send className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default ChatBot;