module.exports = ({ file }) => ({
  parser: 'sugarss',
  plugins: {
    'postcss-import': { root: file.dirname },
    'postcss-nesting': {},
    // to edit target browsers: use "browserslist" field in package.json
    autoprefixer: {},
  },
})
