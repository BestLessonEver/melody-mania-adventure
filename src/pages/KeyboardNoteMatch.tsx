import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";

const notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const pianoKeys = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

const KeyboardNoteMatch = () => {
  const [score, setScore] = useState(0);
  const [currentNote, setCurrentNote] = useState("");
  const [draggedNote, setDraggedNote] = useState<string | null>(null);

  useEffect(() => {
    generateNewNote();
  }, []);

  const generateNewNote = () => {
    const randomNote = notes[Math.floor(Math.random() * notes.length)];
    setCurrentNote(randomNote);
  };

  const handleDragStart = (note: string) => {
    setDraggedNote(note);
  };

  const handleDrop = (key: string) => {
    if (draggedNote === key) {
      setScore((prev) => prev + 1);
      toast.success("Correct! Great job!");
      generateNewNote();
    } else {
      toast.error("Try again!");
    }
    setDraggedNote(null);
  };

  return (
    <div className="min-h-screen p-8">
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
              className="text-6xl text-retro-green mt-4"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              {currentNote}
            </motion.div>
          </div>
        </div>

        {/* Draggable Notes */}
        <div className="flex justify-center gap-4 mb-8">
          {notes.map((note) => (
            <motion.div
              key={note}
              draggable
              onDragStart={() => handleDragStart(note)}
              className="pixel-border bg-retro-blue p-4 cursor-grab active:cursor-grabbing"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {note}
            </motion.div>
          ))}
        </div>

        {/* Piano Keys */}
        <div className="flex justify-center gap-1">
          {pianoKeys.map((key) => (
            <motion.div
              key={key}
              className={`pixel-border ${
                key.includes("#")
                  ? "bg-retro-purple h-32 w-12"
                  : "bg-white h-40 w-16"
              } flex items-end justify-center pb-4 cursor-pointer`}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDrop(key)}
              whileHover={{ y: -5 }}
            >
              <span className={key.includes("#") ? "text-white" : "text-black"}>
                {key}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default KeyboardNoteMatch;