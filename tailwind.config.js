/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        void: "#030305",
        charcoal: {
          950: "#050508",
          900: "#0a0b10",
          850: "#10121a",
          800: "#161824",
          700: "#232738",
        },
        neon: {
          cyan: "#00f0ff",
          blue: "#0070f3",
          violet: "#7928ca",
          purple: "#b800ff",
          magenta: "#f81ce5",
        },
        chrome: {
          light: "#f8fafc",
          silver: "#e2e8f0",
          mute: "#94a3b8",
          dark: "#475569",
        },
      },
      fontFamily: {
        sans: ["Space Grotesk", "Inter", "sans-serif"],
        mono: ["JetBrains Mono", "Space Mono", "monospace"],
        display: ["Syncopate", "Space Grotesk", "sans-serif"],
      },
      letterSpacing: {
        tighter: "-0.05em",
        widest: "0.25em",
        ultra: "0.35em",
      },
      boxShadow: {
        "neon-cyan": "0 0 25px -5px rgba(0, 240, 255, 0.4)",
        "neon-purple": "0 0 30px -5px rgba(184, 0, 255, 0.4)",
        "neon-glow": "0 0 50px rgba(0, 240, 255, 0.2), 0 0 100px rgba(121, 40, 202, 0.15)",
        "glass": "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
      },
      animation: {
        "pulse-glow": "pulseGlow 4s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "scanline": "scanline 8s linear infinite",
        "spin-slow": "spin 20s linear infinite",
      },
      keyframes: {
        pulseGlow: {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(1.05)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(1000%)" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};

