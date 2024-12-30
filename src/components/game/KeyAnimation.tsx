import { motion } from "framer-motion";

interface KeyAnimationProps {
  isCorrect: boolean;
}

export const KeyAnimation = ({ isCorrect }: KeyAnimationProps) => {
  if (!isCorrect) return null;

  return (
    <motion.div
      className="absolute inset-0 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-retro-yellow rounded-full"
          initial={{
            x: "50%",
            y: "50%",
          }}
          animate={{
            x: `${Math.random() * 200 - 100}%`,
            y: `${Math.random() * 200 - 100}%`,
            opacity: [1, 0],
            scale: [0, 1],
          }}
          transition={{
            duration: 0.8,
            delay: Math.random() * 0.2,
          }}
        />
      ))}
    </motion.div>
  );
};