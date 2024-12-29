import { motion } from "framer-motion";

interface InstructionsModalProps {
  show: boolean;
  onClose: () => void;
}

const InstructionsModal = ({ show, onClose }: InstructionsModalProps) => {
  if (!show) return null;

  return (
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
          onClick={onClose}
        >
          Got It, Let's Play!
        </button>
      </motion.div>
    </motion.div>
  );
};

export default InstructionsModal;