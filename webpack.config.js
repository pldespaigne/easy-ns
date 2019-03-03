
const path = require('path')
// const TypedocWebpackPlugin = require('typedoc-webpack-plugin')
// const CleanWebpackPlugin = require('clean-webpack-plugin')

// let paths = [
//   'dist',
//   'docs',
// ]

module.exports = {
  mode: 'development',
  entry: './src/index.ts',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  output: {
    filename: 'bundle.js',
    library: 'easyns',
    libraryTarget: 'var',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    // new CleanWebpackPlugin(paths),
    // new TypedocWebpackPlugin({
    //   target: 'es6',
    //   out: '../docs',
    //   name: 'Easy-NS',
    //   readme: 'none',
    // }),
  ],
}
