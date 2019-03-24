const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');

const isProd = process.env.NODE_ENV === 'production';

exports.htmlWebpackPlugins = function() {
  const isDev = process.env.NODE_ENV === 'development';
  const minify = isDev ? false : {
    removeComments: true,
    collapseWhitespace: true,
    removeAttributeQuotes: true,
  };
  const template = path.join('./index.html');
  const filename = 'app.html';
  return new HtmlWebpackPlugin({
    template,
    filename,
    chunks: 'app',
    minify,
  });
};

exports.sassLoader = [
  !isProd
    ? 'vue-style-loader'
    : { loader: MiniCssExtractPlugin.loader },
  {
    loader: 'css-loader',
    options: { sourceMap: !isProd },
  },
  {
    loader: 'postcss-loader',
    options: {
      plugins: [autoprefixer()],
      sourceMap: !isProd ? 'inline' : false,
    },
  },
  {
    loader: 'sass-loader',
    options: {
      sourceMap: !isProd,
      indentedSyntax: true,
    },
  },
  {
    loader: 'sass-resources-loader',
    options: {
      resources: [
        path.resolve('src/assets/style/_variables.sass'),
        path.resolve('src/assets/style/_mixins.sass'),
        path.resolve('src/assets/style/_rem.sass'),
      ],
    },
  },
];

exports.cssLoader = [
  isProd
    ? { loader: MiniCssExtractPlugin.loader }
    : {
      loader: 'style-loader',
      options: { sourceMap: !isProd },
    },
  {
    loader: 'css-loader',
    options: {
      sourceMap: !isProd,
    },
  },
];

exports.urlLoaderDefault = {
  limit: 1024 * 5,
  name: '[path][name]-[hash:8].[ext]',
  context: path.resolve('src'),
};

exports.uglifyOptions = {
  cache: true,
  parallel: true,
  sourceMap: false,
  uglifyOptions: {
    ecma: 8,
    compress: true,
    output: {
      comments: false,
    },
  },
};
