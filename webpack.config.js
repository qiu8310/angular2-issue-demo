var webpack = require('webpack');
var path = require('path');
var fs = require('fs-extra');
var _ = require('lodash');

var HtmlWebpackPlugin = require('html-webpack-plugin');
var CompressionPlugin = require('compression-webpack-plugin');
var WebpackMd5Hash = require('webpack-md5-hash');
var ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;

var metadata = require('./config');

module.exports = function (userConfig) {
  userConfig = userConfig || {};

  var config = {};
  config.metadata = metadata;

  // 环境变量
  var env = _.assign({
    DEV: false,
    BUILD: false,
    TEST: false,
    ENV: process.env.NODE_ENV || process.env.ENV || 'development'
  }, userConfig.env);
  metadata.env = env;

  // 常量
  var rootDir = __dirname;
  var srcDir = path.join(rootDir, 'src');
  var distDir = path.join(rootDir, 'dist');

  var tsConfig = {
    compilerOptions: {
      rootDir: srcDir
    }
  };

  var htmlConfig = {
    attrs: ['img:src', 'img:data-src'],
    root: srcDir
  };

  config.debug = env.DEV;
  config.resolve = {
    root: srcDir,
    extensions: ['', '.js', '.ts', '.jsx']
  };

  if (!env.TEST) {
    config.entry = {
      head: './src/head.ts',
      polyfill: './src/polyfill.ts',
      vendor: './src/vendor.ts',
      main: './src/main.ts'
    };
    config.output = {
      path: distDir,
      publicPath: env.BUILD ? '/' : 'http://' + metadata.host + ':' + metadata.port + '/',
      filename: env.BUILD ? '[name].js' : '[name].bundle.js',
      chunkFilename: env.BUILD ? '[name].js' : '[name].chunk.js'
    };
  }

  if (env.TEST || env.BUILD) {
    config.devtool = 'source-map';
  } else {
    config.devtool = 'eval';
  }

  // modules
  config.module = {
    loaders: [
      {
        test: /\.ts$/,
        loader: 'awesome-typescript?' + JSON.stringify(tsConfig),
        exclude: /\.e2e\.ts$/
      },
      {
        test: /\.(png|jpg|jpeg)$/,
        loader: 'url?limit=5120'
      },
      {
        test: /\.(gif|svg|woff|woff2|ttf|eot|otf)$/,
        loader: 'file'
      },
      {
        test: /\.html$/,
        loader: 'html',
        exclude: /src\/index\.html/
      }
    ],

    postLoaders: []
  };


  // plugins
  config.plugins = [
    new webpack.DefinePlugin(Object.keys(env).reduce((res, k) => {
      res['__' + k + '__'] = JSON.stringify(env[k]);
      return res;
    }, {}))
  ];


  if (env.BUILD) {
    config.plugins.push(
      new WebpackMd5Hash(),
      new webpack.NoErrorsPlugin(),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({
        beautify: false,
        comments: false,
        compress : {
          screw_ie8 : true
        },
        // mangle: false
        mangle: { // angular2 bug: https://github.com/angular/angular/issues/6380
          keep_fnames: true
        }
      })
    );
  }

  config.plugins.push(
    new ForkCheckerPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(true),
    new webpack.optimize.CommonsChunkPlugin({name: ['main', 'vendor', 'polyfill', 'head'], minChunks: Infinity}),
    new HtmlWebpackPlugin({
      template: path.join(srcDir, 'index.html'),
      chunksSortMode: 'none',
      inject: false
    })
  );


  config.devServer = {
    contentBase: srcDir,
    historyApiFallback: true,
    port: metadata.port,
    host: metadata.host,
    stats: {
      version: true,
      timings: true,
      cached: false,
      colors: true,
      modules: false,
      chunks: false,
      chunkModules: false,
      errorDetails: true
    }
  };

  config.node = {
    __filename: true,
    __dirname: true,
    global: true,
    process: true
  };

  return config;
}
