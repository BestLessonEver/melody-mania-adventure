import { motion } from "framer-motion";
import { KeyAnimation } from "./KeyAnimation";

interface PianoKeyProps {
  note: string;
  isBlack?: boolean;
  isHovered: boolean;
  isPressed: boolean;
  isCorrect: boolean | null;
  onClick: () => void;
  onHover: () => void;
  onLeave: () => void;
  style?: React.CSSProperties;
}

export const PianoKey = ({
  note,
  isBlack = false,
  isHovered,
  isPressed,
  isCorrect,
  onClick,
  onHover,
  onLeave,
  style,
}: PianoKeyProps) => {
  const baseClasses = `relative ${
    isBlack
      ? "bg-retro-purple h-32 w-12 z-10"
      : "bg-white h-40 w-16"
  } flex items-end justify-center pb-4 cursor-pointer transition-all duration-200`;

  const hoverClasses = isHovered
    ? isBlack
      ? "bg-gray-700"
      : "bg-gray-100"
    : "";

  const pressedClasses = isPressed
    ? isCorrect === true
      ? "animate-[glow_0.5s_ease-in-out] bg-retro-green"
      : isCorrect === false
      ? "animate-[glow_0.5s_ease-in-out] bg-retro-red"
      : ""
    : "";

  return (
    <motion.div
      className={`${baseClasses} ${hoverClasses} ${pressedClasses} pixel-border`}
      onClick={onClick}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      whileHover={{ y: 2 }}
      whileTap={{ y: 4 }}
      style={style}
    >
      {isPressed && isCorrect !== null && (
        <KeyAnimation isCorrect={isCorrect} />
      )}
      <span className={`${isBlack ? "text-white" : "text-black"} text-sm`}>
        {note}
      </span>
    </motion.div>
  );
};