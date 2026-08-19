/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontSize: {
        // Larger base sizes for accessibility
        'base': '18px',
        'lg': '20px',
        'xl': '24px',
        '2xl': '28px',
        '3xl': '32px',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        sans: ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Teal-green — the brand's primary color
        primary: {
          50: '#effcf6',
          100: '#d7f7ea',
          200: '#b0eed8',
          300: '#7ddfc0',
          400: '#45c8a3',
          500: '#1fae89',
          600: '#158f70',
          700: '#12725b',
          800: '#125b49',
          900: '#0f4a3d',
        },
        // Ocean blue — accent / secondary actions
        accent: {
          50: '#eef6fd',
          100: '#d9ecfa',
          200: '#b3d9f5',
          300: '#7fbeec',
          400: '#4a9fdf',
          500: '#2980c9',
          600: '#1e66a8',
          700: '#1c5388',
          800: '#1c456e',
          900: '#1a3a5c',
        },
        cream: {
          DEFAULT: '#f5faf8',
          50: '#fbfefd',
          100: '#f5faf8',
          200: '#e9f3ef',
        },
        ink: '#1f2b28',
      },
    },
  },
  plugins: [],
}
