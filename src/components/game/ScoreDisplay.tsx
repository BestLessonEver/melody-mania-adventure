import { motion } from "framer-motion";

interface ScoreDisplayProps {
  score: number;
}

const ScoreDisplay = ({ score }: ScoreDisplayProps) => (
  <div className="text-center space-y-4">
    <motion.h1 
      className="text-4xl text-retro-green"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      Keyboard Note Match
    </motion.h1>
    <p className="text-xl text-retro-yellow">Score: {score}</p>
  </div>
);

export default ScoreDisplay;