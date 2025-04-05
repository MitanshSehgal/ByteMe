"use client";

import { motion } from "framer-motion";

interface Testimonial {
  text: string;
  name: string;
  title: string;
}

const testimonials: Testimonial[] = [
  {
    text: "“I couldn't believe the low prices! I was hesitant at first, but after receiving the product, I'm beyond impressed with both the quality and the cost.”",
    name: "ShadowBlazeX",
    title: "Customer",
  },
  {
    text: "“PowerEngine's support team is outstanding. They helped me with every question and made the process seamless. Excellent service, with fast responses and helpful advice!”",
    name: "PixelPhantom",
    title: "Customer",
  },
  {
    text: "“The quality of their products is exactly what I was looking for. Everything works smoothly, and they always keep you updated. A reliable service all around!”",
    name: "NovaFury",
    title: "Customer",
  },
  {
    text: "“As someone new to the scene, I had tons of questions. Their customer service was incredibly kind and patient, walking me through everything I needed.”",
    name: "VortexVanguard",
    title: "Customer",
  },
];

export const Testimonials = () => {
  return (
    <section className="py-20 md:py-24 bg-white dark:bg-gray-800 font-space-grotesk">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl md:text-6xl text-center tracking-tighter font-medium text-white dark:text-white"
        >
          Experience the Unbelievable
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-white dark:text-white/70 text-lg md:text-xl text-center mt-5 tracking-tight max-w-sm mx-auto"
        >
          Unmatched quality, lightning-fast service, and support that exceeds
          expectations.
        </motion.p>

        <div className="flex overflow-hidden mt-10 [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]">
          <motion.div
            initial={{ translateX: "-50%" }}
            animate={{ translateX: "0" }}
            transition={{
              repeat: Infinity,
              duration: 30,
              ease: "linear",
            }}
            className="flex gap-5 pr-5 flex-none"
          >
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <motion.div
                key={`${testimonial.name}-${index}`}
                whileHover={{ y: -5 }}
                className=" dark:border-gray-500 p-6 md:p-10 rounded-xl bg-white dark:bg-gradient-to-br dark:from-blue-500/80 dark:to-black max-w-xs md:max-w-md flex-none shadow-lg dark:shadow-none"
              >
                <div className="text-lg tracking-tight md:text-2xl text-white dark:text-white">
                  {testimonial.text}
                </div>
                <div className="flex items-center gap-3 mt-5">
                  <div className="flex flex-col">
                   <div className="font-medium text-white dark:text-white">
                      {testimonial.name}
                    </div>
                    <div className="text-white dark:text-white/50 text-sm">
                      {testimonial.title}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
