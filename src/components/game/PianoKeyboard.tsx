import { useState } from "react";
import { PianoKey } from "./PianoKey";

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

  // Calculate positions for black keys
  const getBlackKeyStyle = (index: number) => {
    const basePosition = index * 28; // Adjusted spacing
    return {
      position: 'absolute' as const,
      left: `${basePosition}px`,
    };
  };

  return (
    <div className="flex justify-center gap-1 relative">
      {/* White keys layer */}
      <div className="flex gap-1 relative">
        {whiteKeys.map((key) => (
          <PianoKey
            key={key}
            note={key}
            isHovered={hoveredKey === key}
            isPressed={pressedKey === key}
            isCorrect={isCorrect}
            onClick={() => handleKeyPress(key)}
            onHover={() => setHoveredKey(key)}
            onLeave={() => setHoveredKey(null)}
          />
        ))}
      </div>

      {/* Black keys layer */}
      <div className="absolute flex left-12 top-0">
        {blackKeys.map((key, index) => (
          <PianoKey
            key={key}
            note={key}
            isBlack
            isHovered={hoveredKey === key}
            isPressed={pressedKey === key}
            isCorrect={isCorrect}
            onClick={() => handleKeyPress(key)}
            onHover={() => setHoveredKey(key)}
            onLeave={() => setHoveredKey(null)}
            style={getBlackKeyStyle(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default PianoKeyboard;