import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Shield, AlertTriangle, CheckCircle } from 'lucide-react';

function Terms() {
  const sections = [
    {
      icon: <FileText className="w-6 h-6" />,
      title: 'Terms of Use',
      content: `By accessing and using ByteMe's platform, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the service.`,
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'User Responsibilities',
      content: `Users must:
        • Maintain accurate account information
        • Protect account credentials
        • Comply with all applicable laws
        • Respect intellectual property rights
        • Maintain appropriate conduct in community interactions`,
    },
    {
      icon: <AlertTriangle className="w-6 h-6" />,
      title: 'Prohibited Activities',
      content: `Users must not:
        • Share account credentials
        • Upload malicious content
        • Engage in unauthorized scraping
        • Interfere with platform operation
        • Violate others' intellectual property rights`,
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: 'Content Guidelines',
      content: `All content must:
        • Be accurate and original
        • Respect copyright laws
        • Not be offensive or harmful
        • Not contain malicious code
        • Follow community guidelines`,
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
            <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </motion.div>

          <div className="prose dark:prose-invert max-w-none">
            <p className="text-lg mb-8">
              Welcome to ByteMe. By using our platform, you agree to these terms. Please read them carefully.
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
              <h2 className="text-2xl font-bold mb-4">Intellectual Property</h2>
              <p className="mb-4">
                The platform and its original content, features, and functionality are owned by
                ByteMe and are protected by international copyright, trademark, patent, trade
                secret, and other intellectual property or proprietary rights laws.
              </p>
            </section>

            <section className="mt-12">
              <h2 className="text-2xl font-bold mb-4">Termination</h2>
              <p className="mb-4">
                We may terminate or suspend your account and bar access to the platform
                immediately, without prior notice or liability, under our sole discretion,
                for any reason whatsoever and without limitation, including but not limited
                to a breach of the Terms.
              </p>
            </section>

            <section className="mt-12">
              <h2 className="text-2xl font-bold mb-4">Changes to Terms</h2>
              <p className="mb-4">
                We reserve the right to modify or replace these Terms at any time. If a
                revision is material, we will provide at least 30 days' notice prior to any
                new terms taking effect.
              </p>
            </section>

            <section className="mt-12">
              <h2 className="text-2xl font-bold mb-4">Contact</h2>
              <p>
                If you have any questions about these Terms, please contact us through
                our support channels.
              </p>
            </section>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Terms;