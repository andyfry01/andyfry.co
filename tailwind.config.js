const plugin = require('tailwindcss/plugin')

module.exports = {
  purge: {
    mode: "all",
    enabled: true,
    content: ["./_posts/**/*.md", "./_includes/**/*.html", "./_layouts/**/*.html", "./about.md", "./index.html", "./public/**/*.mjs"],
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
  theme: {
    extend: {
      typography: {
        default: {
          css: {
            pre: false,
            code: false,
            'pre code': false,
            'code::before': false,
            'code::after': false
          }
        }
      }
    }
  }
};
