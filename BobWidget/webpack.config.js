module.exports = {
    entry: './scripts/main.ts',
    output: {
        filename: './scripts/test-bundle.js'
    },
    resolve: {
        extensions: ['.ts']
    },
    module: {
        loaders: [
          {
              test: /\.tsx?$/,
              exclude: /node_modules/,
              loader: 'awesome-typescript-loader'
          }
        ]
    }
};