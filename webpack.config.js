const CopyWebpackPlugin = require('copy-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = (env = {}, argv) => {
  return {
    entry: {
      main: ['babel-polyfill', 'whatwg-fetch', './src/index.jsx'],
    },
    resolve: {
      extensions: ['.js', '.jsx'],
    },
    devtool: argv.mode === 'production' ? 'hidden-source-map' : 'eval-cheap-module-source-map',
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: ['babel-loader', { loader: 'eslint-loader', options: { emitWarning: true } }],
        },
        {
          test: /\.pcss$/,
          use: [
            'style-loader',
            { loader: 'css-loader', options: { importLoaders: 1 } },
            'postcss-loader',
          ],
        },
        {
          test: /\.(svg)$/,
          use: [
            {
              loader: 'react-svg-loader',
            },
          ],
        },
      ],
    },

    plugins: [
      new CleanWebpackPlugin('dist', {}),
      new CopyWebpackPlugin([{ from: './src/static/**/*', to: './', flatten: true }]),
      new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: './index.html',
      }),
    ],
    devServer: {
      historyApiFallback: true,
    },
  }
}
