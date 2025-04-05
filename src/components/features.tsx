import { motion } from "framer-motion";
import { Bot, Users, Brain } from "lucide-react";

const features = [
  {
    icon: <Bot className="w-6 h-6" />,
    title: "AI-Powered Learning",
    description:
      "Personalized learning paths and intelligent recommendations tailored to your needs.",
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Interactive Community",
    description:
      "Connect with peers through video calls, voice chat, and collaborative study groups.",
  },
  {
    icon: <Brain className="w-6 h-6" />,
    title: "Smart Assessment",
    description:
      "AI-driven progress tracking and adaptive quizzes to optimize your learning.",
  },
];

const FeaturesSection = () => {
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        when: "beforeChildren",
      },
    },
  };

  const item = {
    hidden: {
      y: 40,
      opacity: 0,
      scale: 0.95,
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
        mass: 0.5,
      },
    },
  };

  const hoverEffect = {
    y: -8,
    scale: 1.02,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 10,
    },
  };

  return (
    <section className="relative py-20 bg-white dark:bg-gray-800 overflow-hidden">
      {/* Background elements */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary-500/20 blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-purple-500/15 blur-3xl" />
      </motion.div>

      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold text-white dark:text-white mb-4"
          >
            Powerful Features
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            Discover how our platform enhances your learning experience
          </motion.p>
        </div>

        {/* Features grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={container}
          className="grid md:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={item}
              whileHover={hoverEffect}
              className="p-8 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl border border-gray-100 dark:border-gray-600/30 transition-all"
            >
              <motion.div
                initial={{ rotateY: 90, opacity: 0 }}
                whileInView={{ rotateY: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  type: "spring",
                  bounce: 0.4,
                }}
                className="w-14 h-14 bg-primary-50 dark:bg-primary-900/30 rounded-xl flex items-center justify-center text-primary-500 dark:text-primary-400 mb-6 shadow-inner"
              >
                {feature.icon}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.1 + 0.2,
                  ease: "easeOut",
                }}
              >
                <h3 className="text-2xl font-bold mb-3 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>

              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.1 + 0.3,
                  ease: "circOut",
                }}
                className="mt-6 h-0.5 bg-gradient-to-r from-primary-500/0 via-primary-500 to-primary-500/0"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
