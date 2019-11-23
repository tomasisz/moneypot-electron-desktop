const rules = require('./webpack.rules');
// keep this require for now
// const plugins = require('./webpack.plugins');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const CopyPlugin = require('copy-webpack-plugin');


rules.push({
  test: /\.css$/,
  use: [{ loader: 'style-loader' }, { loader: 'css-loader' }]
});


//  WHEN CREATING EXECUTABLES: UNCOMMENT THE OUTPUT OPTIONS
//  WHEN CREATING EXECUTABLES: UNCOMMENT THE OUTPUT OPTIONS
//  WHEN CREATING EXECUTABLES: UNCOMMENT THE OUTPUT OPTIONS
//  WHEN CREATING EXECUTABLES: UNCOMMENT THE OUTPUT OPTIONS
//  WHEN IN DEVELOPMENT MODE: COMMENT THE OUTPUT OPTIONS
//  WHEN IN DEVELOPMENT MODE: COMMENT THE OUTPUT OPTIONS
//  WHEN IN DEVELOPMENT MODE: COMMENT THE OUTPUT OPTIONS
//  WHEN IN DEVELOPMENT MODE: COMMENT THE OUTPUT OPTIONS


module.exports = {
  // Put your normal webpack config below here
  mode: 'production',
  module: {
    rules,
    
  },
  
  // This is bad code
   plugins: [new ForkTsCheckerWebpackPlugin, 
  //   new CopyPlugin([{
  //    from: './images', to: './images' 
  //  }])
  ],
  // plugins: plugins,
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css']
    },
    //  output: {
    //    publicPath: (__dirname + "/.webpack/renderer/")

    //  }
    
};