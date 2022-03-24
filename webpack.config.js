
    "use strict";  
    const { VueLoaderPlugin } = require('vue-loader');  
    const path = require('path');  
    const webpack = require('webpack');  
    const UglifyJsPlugin = require('uglifyjs-webpack-plugin');  
      
    module.exports = {
        mode:'development',
        watch: true,
        watchOptions: {
            // aggregateTimeout: 200,
            // poll: 1000,
          },
        // devServer: {
        //     // watchFiles: ['src/**/*.php', 'public/**/*'],
        //     static: {
        //       directory: path.join(__dirname, 'assets'),
        //     },
        //     compress: true,
        //     port: 9000,
        //   },
        context: path.join(__dirname, 'views','js'),  
        entry: {  
            app: '/main.js',  
               },  
        plugins: [  
            new webpack.ProvidePlugin({  
                '$': 'jquery',  
                jQuery: 'jquery',  
                'window.jQuery': 'jquery',  
                Popper: ['popper.js', 'default']  
            }),  
            new VueLoaderPlugin()  
        ],  
      
        optimization: {  
            minimizer: [  
                new UglifyJsPlugin({  
                    cache: true,  
                    parallel: true,  
                    uglifyOptions: {  
                        compress: false,  
                        ecma: 6,  
                        mangle: true  
                    },  
                    sourceMap: true  
                })  
            ]  
        },  
        output: {  
            // publicPath: "/dest/js/",  
            path: path.resolve(__dirname, 'assets'),  
            filename: '[name].bundle.js'  
        },  
        module: {  
            rules: [  
                {  
                    test: /\.js$/,  
                    loader: 'babel-loader',  
                    exclude: /(node_modules)/,  
                    query: {  
                        presets: ['es2017']  
                    }  
                },  
                {  
                    test: /\.css$/,  
                    loaders: ['style-loader', 'css-loader']  
                },  
                {  
                    test: /\.(png|jpg|gif)$/,  
                    use: {  
                        loader: 'url-loader',  
                        options: {  
                            limit: 8192  
                        }  
                    }  
                },  
                {  
                    test: /\.vue$/,  
                    loader: 'vue-loader'  
                },
                {
                    test: /\.(jpe?g|png|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/, 
                    loader: 'url-loader?limit=100000'
                },
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                      // Creates `style` nodes from JS strings
                      'style-loader',
                      // Translates CSS into CommonJS
                      'css-loader',
                      // Compiles Sass to CSS
                      'sass-loader',
                    ],
                },                  
            ]  
        },  
        resolve: {  
            alias: {  
                vue: 'vue/dist/vue.js'  
            },  
            extensions: ['.js', '.vue']  
        }  
    };  