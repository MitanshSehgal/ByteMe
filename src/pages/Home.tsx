"use client";
import React, { useEffect, useRef } from "react";
import { Testimonials } from "../components/review";
import { motion, useAnimation, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import {
  BookOpen,
  Users,
  Star,
  ArrowRight,
  Sparkles,
  Bot,
  Brain,
  Zap,
  Code,
  Laptop,
  Globe,
} from "lucide-react";
import FeaturesSection from "../components/features";

const stats = [
  { label: "Active Learners", value: "50K+" },
  { label: "Course Hours", value: "1000+" },
  { label: "Live Sessions", value: "200+" },
  { label: "Success Rate", value: "95%" },
];

function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary-500/30  rounded-full filter blur-[80px] animate-float" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-500/20 rounded-full filter blur-[60px] animate-float-delayed" />
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] dark:opacity-[0.05]" />
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary-500/30 rounded-full animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

function FadeInWhenVisible({ children }: { children: React.ReactNode }) {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref);

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, y: 0 });
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={controls}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
}

function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-20">
        <AnimatedBackground />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mb-6 inline-block"
            >
              <div className="p-3 bg-white/20 backdrop-blur-lg rounded-2xl dark:bg-black/20">
                <Code className="w-12 h-12 text-primary-500 dark:text-white" />
              </div>
            </motion.div>

            <h1 className="text-6xl md:text-7xl font-display font-bold mb-6 bg-gradient-to-r from-primary-500 via-purple-500 to-pink-500 text-transparent bg-clip-text dark:text-white">
              Learn. Code. Create.
            </h1>

            <p className="text-xl text-gray-600 dark:text-white mb-8 max-w-2xl mx-auto">
              Experience the future of education with our AI-enhanced platform.
              Master coding through interactive learning and real-time
              collaboration.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/courses"
                className="group inline-flex items-center justify-center px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-all transform hover:scale-105 dark:bg-primary-600 dark:hover:bg-primary-700"
              >
                Start Learning
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <ArrowRight className="ml-2 w-5 h-5 dark:text-white" />
                </motion.span>
              </Link>
              <Link
                to="/video-chat"
                className="inline-flex items-center justify-center px-6 py-3 bg-white/10 backdrop-blur-lg text-primary-500 rounded-lg hover:bg-white/20 transition-all transform hover:scale-105 dark:bg-white/20 dark:text-white dark:hover:bg-white/30"
              >
                Join Live Session{" "}
                <Users className="ml-2 w-5 h-5 dark:text-white" />
              </Link>
            </div>

            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl font-bold text-primary-500 dark:text-white mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 dark:text-gray-200">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="absolute inset-0 pointer-events-none">
          {[Code, Laptop, Globe].map((Icon, index) => (
            <motion.div
              key={index}
              className="absolute"
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0.2, 0.5, 0.2],
                y: [0, -20, 0],
              }}
              transition={{
                duration: 3,
                delay: index * 0.5,
                repeat: Infinity,
              }}
              style={{
                left: `${20 + index * 30}%`,
                top: `${30 + index * 20}%`,
              }}
            >
              <Icon className="w-8 h-8 text-primary-500/50 dark:text-white/50" />
            </motion.div>
          ))}
        </div>
      </section>

      <FeaturesSection />

      {/* Testimonials Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <Testimonials />
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary-500 to-purple-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10 dark:opacity-20" />
        <div className="container mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-display font-bold mb-4 dark:text-white">
              Ready to Start Your Learning Journey?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto dark:opacity-100 dark:text-white">
              Join thousands of learners who are already part of our community
              and start your coding journey today.
            </p>
            <Link
              to="/auth"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary-500 rounded-lg hover:bg-gray-50 transition-all transform hover:scale-105 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800"
            >
              Get Started <Sparkles className="ml-2 w-5 h-5 dark:text-white" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default Home;
