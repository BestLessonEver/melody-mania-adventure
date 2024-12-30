import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    extend: {
      colors: {
        retro: {
          red: "#FF4B4B",
          green: "#4BFFA5",
          yellow: "#FFD54B",
          blue: "#4B4BFF",
          purple: "#1A1221",
        },
        border: "hsl(var(--border))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
      },
      keyframes: {
        "pixel-in": {
          "0%": { transform: "scale(0)", opacity: "0" },
          "80%": { transform: "scale(1.1)", opacity: "0.8" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "pixel-out": {
          "0%": { transform: "scale(1)", opacity: "0" },
          "20%": { transform: "scale(1.1)", opacity: "0.8" },
          "100%": { transform: "scale(0)", opacity: "0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "25%": { transform: "translateX(-5px)" },
          "75%": { transform: "translateX(5px)" },
        },
        glow: {
          "0%, 100%": { boxShadow: "0 0 0 rgba(255, 75, 75, 0)" },
          "50%": { boxShadow: "0 0 20px rgba(255, 75, 75, 0.8)" },
        },
      },
      animation: {
        "pixel-in": "pixel-in 0.3s ease-out",
        "pixel-out": "pixel-out 0.3s ease-out",
        float: "float 3s ease-in-out infinite",
        blink: "blink 1s step-start infinite",
        shake: "shake 0.5s ease-in-out",
        glow: "glow 0.5s ease-in-out",
      },
      fontFamily: {
        pixel: ["'Press Start 2P'", "cursive"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;