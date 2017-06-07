const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
    entry: './app.js',
    devtool: 'source-map',　　// 调试时定位到编译前的代码位置，推荐安装react插件
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, '/build'),
        publicPath: "/build/",
        chunkFilename: '[name].js'

    },
    devServer: {
        contentBase: __dirname + "/build",
        inline: true,
        host: '0.0.0.0',
        port: 8080,
    },
    resolve: {
        modules: [path.resolve(__dirname, 'node_modules')],//优化webpack文件搜索范围
        // 现在你import文件的时候可以直接使用import Func from './file'，不用再使用import Func from './file.js'
        extensions: ['.js', '.jsx', '.json']
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/, // test 去判断是否为.js或.jsx,是的话就是进行es6和jsx的编译
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                plugins: [
                    ['import', {libraryName: 'antd', style: 'css'}],
                ],
                presets: [
                    'es2015',
                    'stage-0',
                    'stage-1',
                    'stage-2',
                    'stage-3',
                    'react'
                ]
            }
        },{
                test: /\.css$/,
            loader: ExtractTextPlugin.extract({
                fallback: 'style-loader',  //  fallbackLoader: 'style-loader',
                use:[
                    "css-loader",
                    "postcss-loader",
                    "sass-loader"]

            })
            },{
            test: /\.scss$/,
            use: [
                'style-loader',
                'css-loader',
                { loader: 'sass-loader', options: { sourceMap: true } }
            ]
        },
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new ExtractTextPlugin({
            filename: "css/[name].css?[hash]-[chunkhash]-[contenthash]-[name]",
            disable: false,
            allChunks: true
        }),
        new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'src/index.html'
    })]
}
