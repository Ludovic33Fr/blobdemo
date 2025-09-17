import type { Config } from 'tailwindcss'
const config: Config = {
darkMode: ['class'],
content: [ './app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}' ],
theme: {
extend: {
colors: {
background: '#0b0f14',
foreground: '#e6eef5',
muted: '#151a21',
blob: {
DEFAULT: '#fcd34d', // yellow-300
dim: '#fbbf24', // yellow-400-ish
},
good: '#34d399',
bad: '#ef4444',
}
}
},
plugins: [],
}
export default config