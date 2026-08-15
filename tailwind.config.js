/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Primary — from logo.svg
        primary: "#d45500",
        primaryHover: "#e07a00",
        brown: "#784421",
        // Complementary accent — teal (complement of orange)
        teal: {
          DEFAULT: "#0d9488",
          50: "#f0fdfa",
          100: "#ccfbf1",
          200: "#99f6e4",
          300: "#5eead4",
          400: "#2dd4bf",
          500: "#14b8a3",
          600: "#0d9488",
          700: "#0d9488",
          800: "#115459",
          900: "#132f30",
        },
        // Solarized light blue (used for text in solarized light theme)
        solarBlue: "#268bd2",
        solarBlueLight: "#e6f0fa",
        milk: "#fdf6e3",
        // Light theme (solarized-inspired)
        light: {
          50: "#fdf6e3",
          100: "#fdf0e0",
          200: "#f5e9d3",
          300: "#f3f4f6",
          400: "#e5e7eb",
          500: "#9ca3af",
          600: "#9ca3af",
          700: "#6b7280",
          800: "#374151",
          900: "#1f2937",
          950: "#111827",
        },
        // Dark theme
        dark: {
          50: "#111827",
          100: "#1f2937",
          200: "#1a1a1a",
          300: "#374151",
          400: "#4b5563",
          500: "#6b7280",
          600: "#9ca3af",
          700: "#d1d5db",
          800: "#e5e7eb",
          900: "#f9fafb",
          950: "#fefefe",
        },
      },
      fontFamily: {
        sans: ['"Inter"', '"system-ui"', "sans-serif"],
        mono: ['"JetBrains Mono"', '"Courier New"', "monospace"],
      },
      boxShadow: {
        sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        DEFAULT:
          "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
        md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        "orange-sm":
          "0 1px 3px rgba(212, 85, 0, 0.2), 0 1px 2px rgba(212, 85, 0, 0.12)",
        orange:
          "0 4px 12px rgba(212, 85, 0, 0.25), 0 2px 6px rgba(212, 85, 0, 0.15)",
        "orange-lg":
          "0 8px 24px rgba(212, 85, 0, 0.3), 0 4px 12px rgba(212, 85, 0, 0.2)",
      },
      borderRadius: {
        none: "0",
        sm: "0.25rem",
        lg: "0.5rem",
        xl: "1rem",
      },
      width: {
        17: "4.25rem",
      },
      borderWidth: {
        DEFAULT: "1px",
        0: "0",
        2: "2px",
        3: "3px",
        4: "4px",
        8: "8px",
      },
    },
  },
  plugins: [],
};
