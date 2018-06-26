const path = require('path');
const webpack = require('webpack');
const fs = require('fs');

const folderlist = () => {
  return fs.readdirSync('./src', (err, list) =>{
    if (err) {
    } else {
      return list;
    }
  });
};

const entry = (list) => {
  list = list.filter((folder) => {
    return !(folder[0] == '.');
  });
  list = list.reduce((accumulator, currentValue) => {
    accumulator[`${currentValue}`] = `./src/${currentValue}/index`;
    return accumulator;
  }, {});
  return list;
};

module.exports = {
  devtool: 'eval',
  entry: entry(folderlist()),
  output: {
    path: path.join(__dirname, 'public/dist'),
    filename: '[name].js',
    publicPath: '/static/',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      use: ['babel-loader'],
      include: path.join(__dirname, 'src'),
    }],
  },
};
