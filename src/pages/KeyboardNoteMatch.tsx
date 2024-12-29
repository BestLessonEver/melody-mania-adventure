import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import InstructionsModal from "@/components/game/InstructionsModal";
import ScoreDisplay from "@/components/game/ScoreDisplay";
import NoteDisplay from "@/components/game/NoteDisplay";
import PianoKeyboard from "@/components/game/PianoKeyboard";

const sharpNotes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const flatNotes = ["C", "D♭", "D", "E♭", "E", "F", "G♭", "G", "A♭", "A", "B♭", "B"];

const KeyboardNoteMatch = () => {
  const [score, setScore] = useState(0);
  const [currentNote, setCurrentNote] = useState("");
  const [showInstructions, setShowInstructions] = useState(true);
  const [useFlats, setUseFlats] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  // Use the same notation array as the current note
  const notes = currentNote.includes("♭") ? flatNotes : sharpNotes;

  useEffect(() => {
    generateNewNote();
  }, []);

  const generateNewNote = () => {
    const currentNotes = useFlats ? flatNotes : sharpNotes;
    const randomNote = currentNotes[Math.floor(Math.random() * currentNotes.length)];
    setCurrentNote(randomNote);
    setIsCorrect(null);
  };

  const handleKeyPress = (key: string) => {
    if (key === currentNote) {
      setIsCorrect(true);
      setScore((prev) => prev + 1);
      toast.success("🎵 Correct! Great job! 🌟");
      setTimeout(() => {
        setUseFlats(prev => !prev);
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

  return (
    <div className="min-h-screen p-8">
      <InstructionsModal 
        show={showInstructions} 
        onClose={() => setShowInstructions(false)} 
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto space-y-8"
      >
        <ScoreDisplay score={score} />
        <NoteDisplay note={currentNote} isCorrect={isCorrect} />
        <PianoKeyboard notes={notes} onKeyPress={handleKeyPress} />
      </motion.div>
    </div>
  );
};

export default KeyboardNoteMatch;