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
    const whiteKeyWidth = 64; // 16 * 4 (w-16)
    const blackKeyOffset = whiteKeyWidth * 0.7;
    let position = 0;

    // Calculate position based on the musical scale pattern
    const pattern = [0, 1, 2, 3, 4]; // Represents the pattern of black keys
    const patternIndex = index % 5;
    const groupOffset = Math.floor(index / 5) * (whiteKeyWidth * 7);

    switch (pattern[patternIndex]) {
      case 0: // C#
        position = whiteKeyWidth - blackKeyOffset / 2;
        break;
      case 1: // D#
        position = whiteKeyWidth * 2 - blackKeyOffset / 2;
        break;
      case 2: // F#
        position = whiteKeyWidth * 4 - blackKeyOffset / 2;
        break;
      case 3: // G#
        position = whiteKeyWidth * 5 - blackKeyOffset / 2;
        break;
      case 4: // A#
        position = whiteKeyWidth * 6 - blackKeyOffset / 2;
        break;
    }

    return {
      position: 'absolute' as const,
      left: `${position + groupOffset}px`,
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
      <div className="absolute top-0">
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