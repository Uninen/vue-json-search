module.exports = {
  content: {
    enabled: process.env.NODE_ENV === 'production',
    content: ['./index.html', './src/**/*.{vue,ts}'],
  },
  plugins: [require('@tailwindcss/typography')],
}
