/**
 * Created by peterpan on 2018/5/23.
 */
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.config.js');

const { VueLoaderPlugin } = require('vue-loader');

//清空基本配置的插件列表
webpackBaseConfig.plugins = [];

//sass plugin
const extractSass = new ExtractTextPlugin({
    filename: "[name].[chunkhash:8].css",
    disable: process.env.NODE_ENV === "development"
});

module.exports = merge(webpackBaseConfig, {
    output: {
        path:path.join(path.resolve(__dirname, '..')+'/public', './dist'),//用来存放打包后文件的输出目录，必填
        publicPath: './dist/',
        //将入口文件重命名为带有20位hash值的唯一文件
        filename: '[name].[hash].js',
        chunkFilename: '[name].chunk.js'
    },
    plugins: [
        new VueLoaderPlugin(),
        new ExtractTextPlugin({
            //提取css
            filename: 'css/[name].[hash].css',
            allChunks: true
        }),
        //sass
        extractSass,
        //定义当前node环境为生产环境
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        //压缩js
        //webpack内置的JS压缩插件不能使用了，可以安装uglifyjs-webpack-plugin插件，使用同其他非内置插件；
        //"build": "webpack --mode production", 就自动压缩了
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false
        //     }
        // }),

        //提取模板,并保存入口html文件
        // 用来生成html文件，通过template选项来读取指定的模板index.ejs,然后输出到filename指定的目录。
        //模板index.ejs动态设置了静态资源的路径和文件名
        new HtmlWebpackPlugin({
            filename: '../index_prod.html',
            template: './index.ejs',
            inject: false
        })
    ]
});