'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

const pageVariants = {
  initial: {
    opacity: 0,
    x: 100,
    scale: 0.95,
    rotateY: -10,
  },
  animate: {
    opacity: 1,
    x: 0,
    scale: 1,
    rotateY: 0,
  },
  exit: {
    opacity: 0,
    x: -100,
    scale: 0.95,
    rotateY: 10,
  },
};

const pageTransition = {
  type: 'spring',
  stiffness: 100,
  damping: 20,
  duration: 0.5,
};

export default function PageTransition({ children }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
        transition={pageTransition}
        style={{
          perspective: '1200px',
          transformStyle: 'preserve-3d',
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
