let path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
let {VueLoaderPlugin} = require('vue-loader');

//sass plugin
// const extractSass = new ExtractTextPlugin({
//     filename: "css/[name].[hash].css",
//     disable: process.env.NODE_ENV === "development"
// });

let config = {
    // devtool: "source-map",
    entry: {
        main: './src/main' //配置的单入口，webpack将从这里开始工作
    },
    //output会将打包后的文件存储为 项目根目录/dist/main.js文件
    output: {
        path: path.join(__dirname, './dist'),//用来存放打包后文件的输出目录，必填
        publicPath: ('/dist/'),//指定资源文件引用的目录，本地目录或CDN地址等
        filename: '[name].js',//指定输出文件的名字
        chunkFilename: "[name].chunk.js"
    },
    module: {
        //rules属性可以指定一系列的loaders,该配置的意思是编译过程中，
        //如果遇到require()/import语句导入一个后缀名为.css的文件，先将它通过css-loader转换，再通过style-loader转换，然后继续打包
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        css: ExtractTextPlugin.extract({
                            use: 'css-loader',
                            fallback: 'vue-style-loader'
                        })
                    }
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                // use: [  //值可以是数组或者字符串，如果是数组，则编译顺序从后往前
                //     'style-loader',
                //     'css-loader'
                // ]
                use: ExtractTextPlugin.extract({
                    use: ['css-loader', 'postcss-loader'],
                    fallback: 'style-loader'
                })
            },
            {
                test:/\.scss$/,
                use: ExtractTextPlugin.extract({
                    use: [{
                        loader: "css-loader"
                    }, {
                        loader: "sass-loader"
                    }],
                    // 在开发环境使用 style-loader
                    fallback: "style-loader"
                })
            },
            {
                test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
                loader: 'url-loader?limit=1024'    //表示如果文件小于1kb，则以base64的形式加载，不会生成一个文件
            }
        ]
    },
    plugins: [
        //重命名提取出来的css文件
        //                         [name] = main  ???
        // new ExtractTextPlugin("css/base.css"),
        new ExtractTextPlugin({
            filename: 'css/[name].css',
            allChunks: true
        }),
        new VueLoaderPlugin(),
    ]
};
module.exports = config;    //相当于  export default config; (es6写法，需要相关的编译插件)