const path = require('path');
const webpack = require('webpack');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const InterpolateHtmlPlugin = require('interpolate-html-plugin');
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');

const publicFolderPath = path.join(__dirname, 'react', 'public');
const appPath = path.join(__dirname, 'react', 'src');
const distPath = path.resolve(__dirname, 'dist');
const appEnv = process.env.NODE_ENV || 'localhost';
const envConfig = require(`./config/${appEnv}.js`);

const config = {
  watch: false,
  entry: {
    app: ['appPath/index.js']
  },

  resolve: {
    modules: ['node_modules', appPath],

    extensions: ['.js'],

    alias: {
      appPath: appPath,
      jquery: 'jquery/dist/jquery.slim.js',
      'lodash-es': 'lodash',
      'lodash.get': 'lodash/get',
      'lodash.isfunction': 'lodash/isFunction',
      'lodash.isobject': 'lodash/isObject',
      'lodash.merge': 'lodash/merge',
      'lodash.reduce': 'lodash/reduce',
      'lodash.set': 'lodash/set',
      'lodash.unset': 'lodash/unset',
      'lodash.topath': 'lodash/toPath',
      'lodash.throttle': 'lodash/throttle',
      'lodash.debounce': 'lodash/debounce'
    }
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: 'vendor',
          chunks: 'all',
          test: /node_modules/,
          priority: 20
        },
        styles: {
          name: 'styles',
          test: /\.(sa|sc|c)ss$/,
          chunks: 'all',
          enforce: true
        }
      }
    }
  },

  output: {
    path: distPath,
    filename:
      appEnv === 'production' || appEnv === 'staging' ? '[name].[chunkhash].js' : '[name].js',
    chunkFilename:
      appEnv === 'production' || appEnv === 'staging'
        ? '[name].bundle.[chunkhash].js'
        : '[name].bundle.js'
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        enforce: 'pre',
        include: appPath,
        loader: 'eslint-loader',
        options: {
          configFile: '.eslintrc',
          failOnError: false,
          failOnWarning: false
        }
      },

      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        include: [appPath],
        use: ['babel-loader', 'stylelint-custom-processor-loader']
      },

      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: true }
          }
        ]
      },

      {
        test: require.resolve('react'),
        loader: 'expose-loader?React'
      },

      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: true,
              importLoaders: 1,
              localIdentName: '[name]__[local]'
            }
          },
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              sourceMapContents: true,
              includePaths: [
                path.join(appPath, 'assets', 'stylesheets', 'scss'),
                appPath,
                path.join(appPath, 'assets', 'stylesheets', 'fonts')
              ]
            }
          }
        ],
        include: appPath
      },

      {
        test: /\.css$/,
        include: /node_modules/,
        use: [
          //(appEnv !== 'production' && appEnv !== 'staging') ? 'style-loader' : MiniCssExtractPlugin.loader,
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          }
        ],
        exclude: /flexboxgrid/
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[name]__[local]'
            }
          }
        ],
        include: /flexboxgrid/
      },
      {
        test: /\.scss$/,
        include: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              sourceMapContents: true
            }
          }
        ]
      },

      // Allow `require`ing image/font files (also when included in CSS)
      // Inline assets under 5kb as Base64 data URI, otherwise uses `file-loader`
      {
        test: /\.(eot|woff2?|ttf|otf)(\?.*)?$/i,
        loader: 'url-loader?limit=5120&name=[path][name].[hash].[ext]'
      },

      {
        test: /\.(jpe?g|png|gif|svg)(\?.*)?$/i,
        loader: 'url-loader?limit=5120&name=[path][name].[hash].[ext]!img-loader'
      }
    ]
  },

  plugins: [
    new FilterWarningsPlugin({
      exclude: /mini-css-extract-plugin[^]*Conflicting order between:/
    }),

    new webpack.DefinePlugin({
      __ENV: JSON.stringify(envConfig.__ENV),
      'process.env': { NODE_ENV: JSON.stringify(envConfig.__ENV) },
      CONFIG: JSON.stringify(envConfig)
    }),

    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),

    new HtmlWebpackPlugin({
      template: path.join(publicFolderPath, 'index.html'),
      inject: true,
      favicon: './react/public/favicon.ico',
      minify: {
        collapseBooleanAttributes: true,
        collapseInlineTagWhitespace: true,
        collapseWhitespace: true,
        minifyCSS: true,
        minifyJS: true,
        minifyURLs: true,
        preventAttributesEscaping: true,
        removeComments: true,
        removeRedundantAttributes: true
      }
    }),

    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename:
        appEnv === 'production' || appEnv === 'staging' ? '[name].[chunkhash].css' : '[name].css',
      chunkFilename:
        appEnv === 'production' || appEnv === 'staging'
          ? '[name].bundle.[chunkhash].css'
          : '[name].bundle.css'
    }),
    new ScriptExtHtmlWebpackPlugin({
      custom: [
        {
          test: /\.js$/,
          attribute: 'async',
          value: true
        }
      ]
    }),

    new InterpolateHtmlPlugin({
      NEW_RELIC_APPLICATIONID: JSON.stringify(envConfig.NEW_RELIC_APPLICATIONID),
      LOGGLY_APPLICATIONID: JSON.stringify(envConfig.LOGGLY_APPLICATIONID)
    }),

    new webpack.LoaderOptionsPlugin({
      options: {
        context: __dirname,
        output: { path: './' }
      }
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
  ],

  devServer: {
    port: 5001
  }
};

if (appEnv !== 'production' && appEnv !== 'staging' && appEnv !== 'development') {
  config.devtool = 'cheap-module-eval-source-map';
  config.plugins.push(
    new BundleAnalyzerPlugin({
      analyzerPort: 8889
    })
  );
}

config.output.publicPath = '/';

const devCopyItems = [
  {
    from: path.resolve(publicFolderPath, 'silent.html'),
    to: path.resolve(distPath)
  }
];

const copyItems = devCopyItems.concat([
  {
    from: path.resolve(__dirname, 'web.config'),
    to: path.resolve(distPath)
  }
]);

config.plugins.push(new CopyWebpackPlugin(appEnv !== 'development' ? copyItems : devCopyItems));

module.exports = config;
