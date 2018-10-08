const path = require('path');

module.exports = {
    entry: './src/js/cmp.consentstring.js',
    output: {
        path: path.resolve(__dirname, 'build/js/lib'),
        filename: 'cmp.consentstring.js'
    },
    mode: 'production',
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              "presets": [
                [
                  "@babel/preset-env",
                  {
                    "useBuiltIns": "entry",
                    "targets": {
                      "firefox": "48",
                      "chrome": "53",
                      "ie": "10"
                    }
                  }
                ]
              ],
              "plugins": [
                "@babel/plugin-transform-destructuring",
                "@babel/plugin-proposal-function-bind",
              ]
            }
          }
        }
      ]
    }
};
