/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        leckerli: ['Leckerli One', 'cursive'],
      },
        animation: {
            pulse: 'pulse 1.5s infinite',
        },
        keyframes: {
            pulse: {
                '0%, 100%': {
                    transform: 'scale(1)',
                    opacity: '1',
                },
                '50%': {
                    transform: 'scale(1.1)',
                    opacity: '0.7',
                },
            },
        },
    },
},
  plugins: [],
};
