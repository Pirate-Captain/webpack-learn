const webpack = require("webpack");
const htmlWebpackPlugin = require("html-webpack-plugin");
const extractTextWebPackPlugin = require("extract-text-webpack-plugin");
const miniCssExtractPlugin = require("mini-css-extract-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");

module.exports = {
    // devtool: 'eval-source-map',
    entry: __dirname + "/app/main.js",
    output: {
        path: __dirname + "/public",
        filename: "bundle-[hash].js"
    },
    optimization: {
        minimize: true
    },
    devServer: {
        contentBase: './public',//本地服务器所加载的页面所在的目录
        historyApiFallback: true,//不跳转
        inline: true//实时刷新
    },
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: "babel-loader"
                },
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: extractTextWebPackPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                }),
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new webpack.BannerPlugin("版权所有，翻版必究"),
        new htmlWebpackPlugin({
            template: __dirname + "/app/index.tmpl.html"
        }),
        new miniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new extractTextWebPackPlugin("[name]-[hash].css"),
        new CleanWebpackPlugin()
    ]
}