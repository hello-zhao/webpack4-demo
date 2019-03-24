const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const TerserJSPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const common = require('./webpack.common');

const { terserOptions } = require('./config');

// For NamedChunksPlugin
const seen = new Set();

module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: 'js/[name]-[chunkhash:8].js',
    chunkFilename: 'js/[name]-[chunkhash:8].js',
    publicPath: '',
    path: path.resolve('dist'),
  },
  devtool: 'hidden-source-map',
  stats: 'minimal',
  optimization: {
    runtimeChunk: true,
    splitChunks: {
      chunks: 'all',
      minSize: 30000,
      cacheGroups: {
        vendors: {
          name: 'chunk-vendors',
          test: /[\\/]node_modules[\\/]/,
          priority: 10, // 权重
          chunks: 'initial',
        },
        vuefamily: {
          name: 'chunk-vuefamily',
          // test: /[\\/]node_modules[\\/]/,
          test: /[\\/]node_modules[\\/]vue|vuex|vue-router[\\/]/,
          priority: 20, // 权重
        },
      },
    },
    minimizer: [
      new TerserJSPlugin(terserOptions),
      new OptimizeCSSAssetsPlugin(),
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name]-[contenthash:8].css',
      chunkFilename: 'css/[id].css',
    }),
    new webpack.NamedChunksPlugin((chunk) => {
      if (chunk.name) {
        return chunk.name;
      }
      const modules = Array.from(chunk.modulesIterable);
      if (modules.length > 1) {
        const hash = require('hash-sum');
        const joinedHash = hash(modules.map(m => m.id).join('_'));
        let len = 4;
        while (seen.has(joinedHash.substr(0, len))) len += 1;
        seen.add(joinedHash.substr(0, len));
        return `chunk-${joinedHash.substr(0, len)}`;
      }
      return modules[0].id;
    }),
    new webpack.HashedModuleIdsPlugin(),
    new ScriptExtHtmlWebpackPlugin({ inline: /runtime..*.js$/ }),
  ],
});
