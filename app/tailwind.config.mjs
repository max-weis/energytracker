/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
      extend: {
        colors: {
          primary: {
            DEFAULT: 'hsl(var(--color-primary) / <alpha-value>)',
            foreground: 'hsl(var(--color-primary) / 1)',
          },
          secondary: {
            DEFAULT: 'hsl(var(--color-secondary) / <alpha-value>)',
            foreground: 'hsl(var(--color-secondary) / 1)',
          },
          tertiary: {
            DEFAULT: 'hsl(var(--color-tertiary) / <alpha-value>)',
            foreground: 'hsl(var(--color-tertiary) / 1)',
          },
          background: 'hsl(var(--color-background) / 1)',
          foreground: 'hsl(var(--color-foreground) / 1)',
        }
      }
    }
}
