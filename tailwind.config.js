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
        aioz: '#EBF5EC',
        'secondary-grey': 'rgba(255, 255, 255, 0.64)'
      },
      fontFamily: {
        'diatype': ['"ABC Diatype"', 'sans-serif'],
        'diatype-mono': ['"ABC Diatype Mono"', 'monospace']
      },
      fontWeight: {
        'thin': '100',
        'light': '300',
        'normal': '400',
        'medium': '500',
        'bold': '700'
      }
    }
  }
}