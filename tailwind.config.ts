import type { Config } from 'tailwindcss'

export default {
    darkMode: ['class'],
    content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {}
  	}
  },
  plugins: [require("tailwindcss-animated")],
} satisfies Config