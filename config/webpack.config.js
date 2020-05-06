"use strict";
const path = require("path");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const chalk = require("chalk");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const AppConfig = require("./config.json");

module.exports = {
    context: path.resolve(__dirname, "../"),
    entry: {
        "index": path.resolve(__dirname, "../frontend/", "index.jsx")
    },
    output: {
        // path: path.resolve(__dirname, "../public"),
        path: path.resolve(__dirname, AppConfig.FE_OUTPUT_DIR),
        filename: "js/[name].[hash:6].js",
        chunkFilename: "js/[name].[chunkhash:6].chunk.js",
        publicPath: "/",
    },
    resolve: {
        modules: [path.resolve(__dirname, "../node_modules")],
        extensions: [".jsx", ".js", ".json"],
        alias: {
            "@": path.resolve(__dirname, "../frontend")
        }
    },
    module: {
        rules: [
            {
                //test: /\.(js|jsx)$/,
                test: /\.jsx$/,
                //test: /\.jsx?$/,
                use: [
                    {
                        loader: "babel-loader",
                    }
                ],
                exclude: [/backend/, /node_modules/, ],
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader"
                    }
                ]
            },
            {
                test: /\.css$/,
                loaders: [
                    MiniCssExtractPlugin.loader,
                    //"style-loader",
                    "css-loader",
                ],
                //loader: "style-loader!css-loader",
                include: /node_modules/,
                exclude: [
                    path.resolve(__dirname, "../frontend"),
                    path.resolve(__dirname, "../backend")
                ],
                //exclude: path.resolve(__dirname, "../frontend")
            },
            {
                test: /\.less$/,
                loaders: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "postcss-loader",
                    "less-loader",
                ],
                include: path.resolve(__dirname, "../frontend"),
                exclude: [
                    /node_modules/,
                    path.resolve(__dirname, "../backend")
                ],
                //exclude: /node_modules/
            },
            {
                test: /\.(ttf|eot|woff|woff2|jpg|jpeg|png|gif|mp3|svg|ico|otf)$/,
                // test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                use: {
                    loader: "url-loader",
                    options: {
                        name: path.posix.join(AppConfig.FE_STATIC_DIR + "/" + AppConfig.FE_IMAGE_DIR + "/[name].[hash:7].[ext]"),
                        limit: 7 * 1024
                    }
                },
                include: path.resolve(__dirname, "../frontend"),
                exclude: [
                    /node_modules/,
                    path.resolve(__dirname, "../backend")
                ],
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "css/[name].[chunkhash:6].css",
            chunkFilename: "css/[name].[chunkhash:6].css",
        }),
        new ProgressBarPlugin({
            format: "  build [:bar] " + chalk.green.bold(":percent") + " (:elapsed seconds)"
        }),
        new HtmlWebPackPlugin({
            template: "./frontend/index.html",
            filename: "./index.html"
        })
    ],
    // Dev server Options
    devServer: {
        hot: true,
        contentBase: path.join(__dirname,  AppConfig.FE_OUTPUT_DIR),
        port: process.env.PORT || 8086,
        host: "0.0.0.0",
        overlay: true,
        historyApiFallback: true,
        allowedHosts: [".webtopaz.local", "localhost"],
        disableHostCheck: true,
        compress: false,
        contentBasePublicPath: "/",
        //inline: true,
        proxy: {
            "/api": {
                target: "http://localhost:" + AppConfig.SERVER_PORT,
                //pathRewrite: {"^/api": ""},
                changeOrigin: true
            }
        }
    },
    watchOptions: {
        ignored: /node_modules/,
        aggregateTimeout: 500,
        poll: 1000
    },
    externals: {
        //jquery: 'jQuery',
    }
};
