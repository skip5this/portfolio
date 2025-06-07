export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        fountain: '#FFCE5E',
        strike: '#FFEDED',
        hero: '#BBFFCD',
        aioz: '#E6F7FF'
      },
      fontFamily: {
        'diatype': ['"ABC Diatype"', 'sans-serif'],
        'diatype-mono': ['"ABC Diatype Mono"', 'monospace']
      }
    }
  }
}