import { useState } from "react";
import { motion } from "framer-motion";

const Index = () => {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  const games = [
    {
      id: "keyboard-match",
      title: "Keyboard Note Match",
      description: "Match notes to piano keys in this exciting game!",
      status: "available",
    },
    {
      id: "note-quiz",
      title: "Note Recognition",
      description: "Test your knowledge of musical notes!",
      status: "available",
    },
    {
      id: "note-worksheet",
      title: "Note Naming Practice",
      description: "Practice naming notes with instant feedback!",
      status: "available",
    },
    ...Array(12).fill(null).map((_, i) => ({
      id: `future-game-${i}`,
      title: "Coming Soon",
      description: "A new musical adventure awaits!",
      status: "locked",
    })),
  ];

  return (
    <div className="min-h-screen p-8">
      <header className="text-center mb-16">
        <motion.h1 
          className="text-4xl mb-4 text-retro-green"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Best Lesson Ever
        </motion.h1>
        <motion.p 
          className="text-xl text-retro-yellow"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Learn Music Through Play
        </motion.p>
      </header>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        {games.map((game, index) => (
          <motion.div
            key={game.id}
            className={`game-card ${game.status === "locked" ? "opacity-50" : ""}`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            onClick={() => game.status === "available" && setSelectedGame(game.id)}
          >
            <div className="space-y-4">
              <div className="h-40 bg-retro-blue/20 rounded-lg flex items-center justify-center">
                <span className="text-4xl">🎮</span>
              </div>
              <h3 className="text-xl text-retro-green">{game.title}</h3>
              <p className="text-sm text-gray-300">{game.description}</p>
              {game.status === "locked" ? (
                <div className="pixel-border bg-retro-red/50 p-2 text-center text-sm">
                  Coming Soon!
                </div>
              ) : (
                <button className="pixel-button w-full">
                  Play Now
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>

      <footer className="text-center mt-16 text-sm text-gray-400">
        <p>Best Lesson Ever © 2024 - All rights reserved</p>
      </footer>
    </div>
  );
};

export default Index;