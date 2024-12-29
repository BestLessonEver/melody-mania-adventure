import { motion } from "framer-motion";

interface NoteDisplayProps {
  note: string;
  isCorrect: boolean | null;
}

const NoteDisplay = ({ note, isCorrect }: NoteDisplayProps) => (
  <div className="bg-retro-purple/50 p-6 rounded-lg pixel-border">
    <p className="text-2xl">Match this note:</p>
    <motion.div
      className={`text-6xl mt-4 ${
        isCorrect === true
          ? "text-retro-green animate-[pulse_0.5s_ease-in-out_3]"
          : isCorrect === false
          ? "text-retro-red animate-[shake_0.5s_ease-in-out]"
          : "text-retro-green"
      }`}
      animate={
        isCorrect === true
          ? {
              scale: [1, 1.2, 1],
              transition: {
                duration: 0.3,
                repeat: 2,
              },
            }
          : isCorrect === false
          ? {
              x: [-10, 10, -10, 10, 0],
              transition: {
                duration: 0.5,
              },
            }
          : {}
      }
    >
      {note}
      {isCorrect === true && (
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
      )}
    </motion.div>
  </div>
);

export default NoteDisplay;