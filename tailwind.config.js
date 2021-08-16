const plugin = require('tailwindcss/plugin')

module.exports = {
  purge: {
    mode: "all",
    enabled: true,
    content: ["./_posts/**/*.md", "./_includes/**/*.html", "./_layouts/**/*.html", "./about.md", "./index.html"],
  },
  plugins: [
    require('@tailwindcss/typography')
  ]
};
