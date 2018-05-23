var webpack = require('webpack');
var path = require('path');
var jsFolder = path.resolve() + '/assets/js';
// var dePath = jsFolder + '/dependencies';
// var modelsPath = jsFolder + '/models/';
var modulesPath = jsFolder + '/modules';

module.exports = function (grunt) {
    var config = {
        dev: {
            entry: {
                main: ['./assets/js/index.js'],
                vendor: [
                    'whatwg-fetch',
                ]
            },
            output: {
                // path: './.tmp/public/js',
                path: path.resolve() + '/.tmp/public/js',
                filename: 'bundle.js',
                sourceMapFilename: "[file].map"
            },
            module: {
                loaders: [
                    {
                        test: /(\.js|\.jsx)$/,
                        include: jsFolder,
                        exclude: /node_modules/,
                        loader: 'babel-loader',
                        // babelrc: false,
                        query: {
                            babelrc: false,
                            presets: ["es2015", "stage-0", "react"]
                        }
                    },

                    {
                        test: /\.css$/,
                        use: [ 'style-loader', 'css-loader' ]                      
                    }
                    
                ],
            },
            plugins: [
                new webpack.optimize.CommonsChunkPlugin({name: 'vendor', filename: 'vendor.bundle.js'}),
            ],
            resolve: {
                alias: {
                    'modules': modulesPath,
                    'app': jsFolder,
                },
                extensions: ['.js', '.json']
            },
            devtool: 'source-map'
        }
    }

    grunt.config.set('webpack', config);
    grunt.loadNpmTasks('grunt-webpack');
}
