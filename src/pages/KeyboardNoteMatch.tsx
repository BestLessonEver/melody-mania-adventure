import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

const sharpNotes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const flatNotes = ["C", "D♭", "D", "E♭", "E", "F", "G♭", "G", "A♭", "A", "B♭", "B"];

const KeyboardNoteMatch = () => {
  const [score, setScore] = useState(0);
  const [currentNote, setCurrentNote] = useState("");
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  const [showInstructions, setShowInstructions] = useState(true);
  const [useFlats, setUseFlats] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const notes = useFlats ? flatNotes : sharpNotes;
  const pianoKeys = useFlats ? flatNotes : sharpNotes;

  useEffect(() => {
    generateNewNote();
  }, []);

  const generateNewNote = () => {
    const currentNotes = useFlats ? flatNotes : sharpNotes;
    const randomNote = currentNotes[Math.floor(Math.random() * currentNotes.length)];
    setCurrentNote(randomNote);
    setUseFlats(prev => !prev);
    setIsCorrect(null);
  };

  const handleKeyPress = (key: string) => {
    if (key === currentNote) {
      setIsCorrect(true);
      setScore((prev) => prev + 1);
      toast.success("🎵 Correct! Great job! 🌟");
      setTimeout(() => {
        generateNewNote();
      }, 1000);
    } else {
      setIsCorrect(false);
      toast.error("❌ Try again! 🎹");
      setTimeout(() => {
        setIsCorrect(null);
      }, 1000);
    }
  };

  const closeInstructions = () => {
    setShowInstructions(false);
  };

  return (
    <div className="min-h-screen p-8">
      {showInstructions && (
        <motion.div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div 
            className="bg-retro-purple pixel-border p-8 rounded-lg max-w-md text-center"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h2 className="text-2xl text-retro-green mb-4">How to Play: Keyboard Note Match</h2>
            <div className="text-left space-y-4 mb-6">
              <p>🎵 A random musical note will appear on the screen.</p>
              <p>🎹 Click or tap the correct piano key that matches the note.</p>
              <p>✨ Earn points for each correct match!</p>
            </div>
            <button 
              className="pixel-button w-full"
              onClick={closeInstructions}
            >
              Got It, Let's Play!
            </button>
          </motion.div>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto space-y-8"
      >
        <div className="text-center space-y-4">
          <h1 className="text-4xl text-retro-green">Keyboard Note Match</h1>
          <p className="text-xl text-retro-yellow">Score: {score}</p>
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
              {currentNote}
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
        </div>

        <div className="flex justify-center gap-1">
          {pianoKeys.map((key) => {
            const isBlackKey = key.includes("#") || key.includes("♭");
            return (
              <motion.div
                key={key}
                className={`pixel-border ${
                  isBlackKey
                    ? "bg-retro-purple h-32 w-12"
                    : "bg-white h-40 w-16"
                } flex items-end justify-center pb-4 cursor-pointer transition-colors duration-200 ${
                  hoveredKey === key 
                    ? isBlackKey 
                      ? "bg-white/50" 
                      : "bg-black/50"
                    : ""
                }`}
                onClick={() => handleKeyPress(key)}
                onMouseEnter={() => setHoveredKey(key)}
                onMouseLeave={() => setHoveredKey(null)}
                whileHover={{ y: -5 }}
              >
                <span className={isBlackKey ? "text-white" : "text-black"}>
                  {key}
                </span>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default KeyboardNoteMatch;