import { useState } from "react";
import { motion } from "framer-motion";

interface PianoKeyboardProps {
  notes: string[];
  onKeyPress: (key: string) => void;
}

const PianoKeyboard = ({ notes, onKeyPress }: PianoKeyboardProps) => {
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  const [pressedKey, setPressedKey] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleKeyPress = (key: string) => {
    setPressedKey(key);
    setIsCorrect(null);
    onKeyPress(key);
  };

  // First render white keys as the base layer
  const whiteKeys = notes.filter(note => !note.includes("#") && !note.includes("♭"));
  const blackKeys = notes.filter(note => note.includes("#") || note.includes("♭"));

  return (
    <div className="flex justify-center gap-1 relative">
      {/* White keys layer */}
      <div className="flex gap-1 relative">
        {whiteKeys.map((key) => (
          <motion.div
            key={key}
            className={`pixel-border relative bg-white h-40 w-16
              flex items-end justify-center pb-4 cursor-pointer transition-colors duration-200
              ${hoveredKey === key ? "bg-black/50" : ""}
              ${pressedKey === key && isCorrect === false ? "animate-[glow_0.5s_ease-in-out] bg-retro-red" : ""}`}
            onClick={() => handleKeyPress(key)}
            onMouseEnter={() => setHoveredKey(key)}
            onMouseLeave={() => setHoveredKey(null)}
            whileHover={{ y: -5 }}
          >
            {pressedKey === key && isCorrect === true && (
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
            <span className="text-black">{key}</span>
          </motion.div>
        ))}
      </div>

      {/* Black keys layer */}
      <div className="absolute flex gap-[1.75rem] left-[1.75rem]">
        {blackKeys.map((key) => (
          <motion.div
            key={key}
            className={`pixel-border relative bg-retro-purple h-32 w-12 z-10
              flex items-end justify-center pb-4 cursor-pointer transition-colors duration-200
              ${hoveredKey === key ? "bg-white/50" : ""}
              ${pressedKey === key && isCorrect === false ? "animate-[glow_0.5s_ease-in-out] bg-retro-red" : ""}`}
            onClick={() => handleKeyPress(key)}
            onMouseEnter={() => setHoveredKey(key)}
            onMouseLeave={() => setHoveredKey(null)}
            whileHover={{ y: -5 }}
            style={{
              boxShadow: "0 0 0 2px white",
            }}
          >
            {pressedKey === key && isCorrect === true && (
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
            <span className="text-white">{key}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PianoKeyboard;