const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path');

module.exports = async () => {
  return {
    entry: {
      main:    ['./src/index.jsx']
    },
    mode: 'development',        // Set the mode (development or production)
    output: {
      path: path.resolve(__dirname, 'dist'),  // Output directory
      filename: "[name].[chunkhash].js",
      clean: true
    },
    resolve: {
      extensions: ['.ts', '.js', '.tsx', '.jsx'],  // Add .ts to the extensions list
    },
    module: {
      rules: [
        // {
        //   test: /\.ts$/,         // Apply this rule to .ts files (TypeScript)
        //   exclude: /node_modules/,
        //   use: {
        //     loader: "babel-loader",
        //     options: {
        //       presets: ["@babel/preset-typescript"],
        //     },
        //   },     // Use ts-loader to transpile TypeScript
        // },
        // {
        //   test: /\.html$/,
        //   exclude: /node_modules/,
        //   use: "html-loader",
        // },
        {
          test: /\.(js|jsx)?$/,
          exclude: /node_modules/,
          use: {
              loader: 'babel-loader', // Use Babel loader to transpile code
              options: {
                  presets: ['@babel/preset-env', '@babel/preset-react'] // Babel presets for env and React
              }
          },
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, "css-loader"],
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "[name].[contenthash].css",
        chunkFilename: "[id].[contenthash].css",
      }),
      new HtmlWebpackPlugin({
          template: 'index.html',
          filename: 'index.spa.html',
          chunks: ['main']
      }),
    ],
    devServer: {
      hot: true,
      static: './dist',
      open: 'http://localhost:9000/index.spa.html',
      compress: true,
      port: 9000,
    }
  }
};