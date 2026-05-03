'use client';
import { motion } from 'framer-motion';

const variants = {
  hidden: {
    opacity: 0,
    clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)',
  },
  enter: {
    opacity: 1,
    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
  },
  exit: {
    opacity: 0,
    clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)',
  },
};

export default function Template({ children }) {
  return (
    <motion.main
      variants={variants}
      initial="hidden"
      animate="enter"
      exit="exit"
      transition={{
        type: 'tween',
        ease: [0.76, 0, 0.24, 1],
        duration: 0.6,
      }}
    >
      {children}
    </motion.main>
  );
}
