/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  darkMode: 'class', // Enable dark mode with the 'class' strategy
  theme: {
    extend: {
      // Optional: Add custom colors for a refined dark theme
      colors: {
        gray: {
          900: '#1a202c', // Dark background
          800: '#2d3748', // Slightly lighter dark
          700: '#4a5568', // Borders or muted elements
          600: '#718096', // Subtle text
          500: '#a0aec0', // Light gray for empty states
          400: '#cbd5e0', // Even lighter gray
          300: '#e2e8f0', // Light text in dark mode
          200: '#edf2f7', // Very light gray
          100: '#f7fafc', // Almost white
          50: '#fafafa',   // Off-white
        },
        blue: {
          600: '#3182ce', // Primary blue (light mode)
          500: '#4299e1', // Slightly lighter blue
          400: '#63b3ed', // Hover state for dark mode
        },
        red: {
          600: '#e53e3e', // Red for delete buttons (light mode)
          500: '#f56565', // Lighter red
        },
        green: {
          600: '#38a169', // Green for register button
          500: '#48bb78', // Lighter green
        },
        teal: {
          600: '#319795', // Teal for gradient
          500: '#4fd1c5', // Lighter teal
        },
      },
      // Optional: Add custom transition properties
      transitionProperty: {
        'colors-opacity': 'background-color, color, opacity', // For smooth theme toggling
      },
    },
  },
  plugins: [],
};