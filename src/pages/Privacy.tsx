import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, Database } from 'lucide-react';

function Privacy() {
  const sections = [
    {
      icon: <Database className="w-6 h-6" />,
      title: 'Data Collection',
      content: `We collect information that you provide directly to us, including:
        • Account information (name, email, password)
        • Profile information
        • Course progress and interaction data
        • Communication preferences`,
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: 'Data Security',
      content: `We implement appropriate technical and organizational security measures to protect your personal data against accidental or unlawful destruction, loss, alteration, and unauthorized disclosure or access.`,
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: 'Data Usage',
      content: `Your data is used to:
        • Provide and improve our services
        • Personalize your learning experience
        • Send important updates and communications
        • Analyze platform usage and trends`,
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Your Rights',
      content: `You have the right to:
        • Access your personal data
        • Request data correction
        • Request data deletion
        • Object to data processing
        • Data portability`,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen py-20"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </motion.div>

          <div className="prose dark:prose-invert max-w-none">
            <p className="text-lg mb-8">
              At ByteMe, we take your privacy seriously. This Privacy Policy explains how we collect,
              use, disclose, and safeguard your information when you use our platform.
            </p>

            <div className="space-y-12">
              {sections.map((section, index) => (
                <motion.section
                  key={section.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
                >
                  <div className="flex items-center mb-4">
                    <div className="p-2 bg-primary-100 dark:bg-primary-900/20 rounded-lg text-primary-500">
                      {section.icon}
                    </div>
                    <h2 className="text-2xl font-bold ml-4">{section.title}</h2>
                  </div>
                  <div className="text-gray-600 dark:text-gray-400 whitespace-pre-line">
                    {section.content}
                  </div>
                </motion.section>
              ))}
            </div>

            <section className="mt-12">
              <h2 className="text-2xl font-bold mb-4">Cookies</h2>
              <p className="mb-4">
                We use cookies and similar tracking technologies to track activity on our platform
                and hold certain information. You can instruct your browser to refuse all cookies
                or to indicate when a cookie is being sent.
              </p>
            </section>

            <section className="mt-12">
              <h2 className="text-2xl font-bold mb-4">Changes to This Policy</h2>
              <p className="mb-4">
                We may update our Privacy Policy from time to time. We will notify you of any
                changes by posting the new Privacy Policy on this page and updating the "Last
                updated" date.
              </p>
            </section>

            <section className="mt-12">
              <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us through
                our support channels.
              </p>
            </section>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Privacy;