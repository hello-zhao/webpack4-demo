const merge = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',
  output: {
    filename: '[name].js',
    publicPath: '/',
  },
  devServer: {
    hot: true,
    clientLogLevel: 'error',
    historyApiFallback: {
      rewrites: [
        {
          from: /^\/demo/,
          to: '/app.html',
        },
      ],
    },
    host: '0.0.0.0',
    port: '9008',
    disableHostCheck: true,
  },
  devtool: 'source-map',
});
