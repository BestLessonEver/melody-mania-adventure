import { motion } from "framer-motion";

interface PianoKeyboardProps {
  notes: string[];
  onKeyPress: (key: string) => void;
}

const PianoKeyboard = ({ notes, onKeyPress }: PianoKeyboardProps) => {
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);

  return (
    <div className="flex justify-center gap-1">
      {notes.map((key) => {
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
            onClick={() => onKeyPress(key)}
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
  );
};

export default PianoKeyboard;