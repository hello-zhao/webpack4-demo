const path = require('path');
const webpack = require('webpack');
const ManifestPlugin = require('webpack-manifest-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const {
  htmlWebpackPlugins,
  sassLoader,
  cssLoader,
  urlLoaderDefault,
} = require('./config');

module.exports = {
  entry: {
    app: ['@/index'],
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': path.resolve('src'),
    },
  },
  plugins: [
    new ManifestPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: `'${process.env.NODE_ENV}'`,
      },
    }),
    new VueLoaderPlugin(),
    htmlWebpackPlugins(),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader'],
      },
      {
        test: /\.vue$/,
        use: ['vue-loader', 'eslint-loader'],
      },
      {
        test: /\.(sass|scss)$/,
        loader: sassLoader,
      },
      {
        test: /\.css$/,
        loader: cssLoader,
      },
      {
        test: /\.(jpg|jpeg|png|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              ...urlLoaderDefault,
              outputPath: 'images/',
            },
          },
        ],
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          ...urlLoaderDefault,
          outputPath: 'media/',
        },
      },
      {
        test: /\.(woff|eot|ttf)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              ...urlLoaderDefault,
              outputPath: 'fonts/',
            },
          },
        ],
      },
    ],
  },
};
