const webpack = require('webpack')
const merge = require('webpack-merge')
const getConfig = require('./webpack.common.config')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const {extensions} = require('./webpack/resolve')

const config = getConfig('client')

module.exports = merge(config, {
    mode: 'development',
    entry: [
        'react-hot-loader/patch',
        './src/development.jsx'],
    output: {
        publicPath: '/dist/',
        hotUpdateChunkFilename: 'hot/[id].[hash].hot-update.js',
        hotUpdateMainFilename: 'hot/[hash].hot-update.json'
    },
    resolve: {
        extensions
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/, // Use this rule for JavaScript files
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader', // Specify babel-loader for JavaScript
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.EnvironmentPlugin({NODE_ENV: 'development'}),
        new webpack.HashedModuleIdsPlugin(),
        new HtmlWebpackPlugin({template: './index.html', hash: true})
    ],
    devtool: 'inline-source-map',
    devServer: {
        hot: true,
        writeToDisk: true,
        port: 8080
    }
})
