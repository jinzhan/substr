/**
 * @file webpack config
 */

import path from 'path';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';

export default {
    mode: 'production',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'substr.min.js',
        libraryTarget: 'umd',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: [
                    path.resolve('src'),
                ],
                use: {
                    loader: 'babel-loader',
                    query: {
                        presets: [
                            ['@babel/preset-env'],
                        ],
                        plugins: [
                            '@babel/plugin-proposal-class-properties',
                            '@babel/plugin-transform-new-target',
                        ],
                    },
                },
            },
        ],
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '.',
            name: true,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                },
            },
        },
        minimizer: [
            new UglifyJsPlugin({
                extractComments: true,
                sourceMap: false,
                parallel: true,
                uglifyOptions: {
                    compress: {
                        'drop_console': true,
                    },
                    toplevel: true,
                    'dead_code': true,
                    // mangle: false,
                },
            }),
        ],
    },
};