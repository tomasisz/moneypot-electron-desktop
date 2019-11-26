module.exports = [
  // Add support for native node modules
  {
    test: /\.node$/,
    use: "node-loader"
  },

  // added
    // {
    //   test: /\.(png|svg|jpg|gif)$/,
    //   use: ["file-loader"]
    // },
  {
    test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
    use: ["file-loader"]
    },
  {
    test: /\.(m?js|node)$/,
    parser: { amd: false },
    use: {
      loader: "@marshallofsound/webpack-asset-relocator-loader",
      options: {
        outputAssetBase: "native_modules"
      }
    }
  },
  // static
  {
    test: /\.tsx?$/,
    exclude: /(node_modules|.webpack)/,
    loaders: [
      {
        loader: "ts-loader",
        options: {
          transpileOnly: true
        }
      }
    ]
  },
      
   {
     test: /\.(png|jp(e*)g|svg)$/,  
     use: [{
         loader: 'url-loader',
         options: { 
            limit: 8000, // Convert images < 8kb to base64 strings
            // outputPath: 'main_window',

            //  publicPath: (__dirname + "/.webpack/renderer")

        } 
     }]
 }
  
      
 
  
  // Put your webpack loader rules in this array.  This is where you would put
  // your ts-loader configuration for instance:
  /**
   * Typescript Example:
   *
   * {
   *   test: /\.tsx?$/,
   *   exclude: /(node_modules|.webpack)/,
   *   loaders: [{
   *     loader: 'ts-loader',
   *     options: {
   *       transpileOnly: true
   *     }
   *   }]
   * }
   */
  // {
  //   test: /\.(png|jpe?g|gif)$/i,
  //   loader: 'file-loader',
  //   options: {
  //     outputPath: 'main_window/'  
  //     },
  //   },
  

];


