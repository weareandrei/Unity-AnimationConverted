const path = require('path')
const webpack = require('webpack')
const loaders = require('./webpack/loaders')
const set = require('lodash/set')
const cloneDeep = require('lodash/cloneDeep')
const concat = require('lodash/concat')
const WriteFilePlugin = require('write-file-webpack-plugin')
const {version} = require('./package.json')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const GitRevisionPlugin = require('git-revision-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
// const ESLintPlugin = require('eslint-webpack-plugin')

const gitRevisionPlugin = new GitRevisionPlugin()
const branch = gitRevisionPlugin.branch()

const buildModule = {
    rules: [
        set(cloneDeep(loaders.babel), 'options.plugins', concat(loaders.babel.options.plugins, 'react-hot-loader/babel')),
        loaders.css,
        loaders.less,
        loaders.image,
        loaders.font,
        loaders.mjs,
        loaders.worker
    ]
}

//mode 'admin' or 'client'
module.exports = (mode) => ({
    context: __dirname,
    output: getOutput(),
    plugins: getPlugins(),
    devServer: getDevServer(),
    module: buildModule,
    resolve: getResolve(mode),
    node: {fs: 'empty'}
})

const getPlugins = () => [
    new CleanWebpackPlugin(),
    new webpack.LoaderOptionsPlugin({options: {}}),
    new webpack.NamedModulesPlugin(),
    new WriteFilePlugin(),
    new CopyPlugin([{from: 'src/public', to: '.'}])
]

const getOutput = () => ({
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    chunkFilename: `[name].chunk.${version}.js`
})

const getDevServer = () => ({
    historyApiFallback: {
        index: 'index.html'
    },
    publicPath: '/dist/'
})

const getResolve = (mode) => ({
    modules: ['node_modules'],
    extensions: ['.js', '.jsx', '.json', '.less', '.css', '.mjs'],
    alias: {
        config: path.join(__dirname, './src/' + mode + '/core/config/' + getEnv() + '.js')
    }
})

// eslint-disable-next-line max-lines-per-function
const getEnv = () => {
    console.log('git branch -->', branch)
    console.log('version -->', version)
    if (branch.includes('develop')) {
        console.log('config --> ', 'dev')
        return 'dev'
    }
    if (branch === 'master' || branch.includes('hotfix') || branch === 'HEAD') {
        console.log('config --> ', 'prod')
        return 'prod'
    }
    console.log('config --> ', 'local')
    return 'local'
}
