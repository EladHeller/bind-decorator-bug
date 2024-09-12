const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = () => {
  return {
    entry: {
      bind: './proposal-decorators/bind.ts',
      bindDecorator: './proposal-decorators/bindDecorator.ts',
      index: './proposal-decorators/index.ts',
      logDecorator: './proposal-decorators/logDecorator.ts'
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              "plugins": [
                  [
                      "@babel/plugin-proposal-decorators",
                      {
                          "version": "2023-05"
                      }
                  ]
              ],
              "presets": [
                  "@babel/preset-typescript",
                  ["@babel/preset-env",{
                      "targets": {
                          "node": "current"
                      }
                  }]
              ]
            }
          }
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './proposal-decorators/index.html',
        filename: 'index.html',
        inject: 'body'
      })
    ],
    devServer: {
      port: 3003
    },
  }
}