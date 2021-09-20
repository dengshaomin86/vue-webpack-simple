const path = require("path");
const webpack = require("webpack");
const htmlWebpackPlugin = require("html-webpack-plugin");
// v15 版的 vue-loader 配置需要加个 VueLoaderPlugin
const VueLoaderPlugin = require("vue-loader/lib/plugin");

module.exports = {
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  entry: path.join(__dirname, "src/main.js"),
  output: {
    filename: "bundle.[hash:7].js",
    path: path.join(__dirname, "dist"),
    publicPath: "/",
  },
  devServer: {
    port: 8080,
    hot: true,
  },
  resolve: {
    extensions: [".js", ".vue"], // js 和 vue 文件在 import 导入的时候不需要带扩展
    alias: {
      vue$: "vue/dist/vue.esm.js", // vue官方指定写法，如果不写这个，则运行的时候会提示
      "@": path.resolve(__dirname, "src"), // 给src目录起个别名@ ，引用src目录的时候，可用@替代
    },
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: ["vue-loader"],
      },
      {
        test: /\.js$/,
        use: ["babel-loader"],
      },
      {
        test: /\.css$/,
        use: [
          "style-loader", // css 嵌入页面
          "css-loader",
        ],
      },
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"],
      },
      // 它的作用是将我们的图片转换成一个base64的字串存放于我们打包生成的js里面，而不是重新生成一个文件。对于一些小的文件，几kb的文件可以帮助我们减少过多的http请求
      {
        test: /\.(jpg|jpeg|gif|png|svg)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              esModule: false, // 默认情况下，文件加载器生成使用ES modules语法的JS模块
              limit: 1024,
              name: "[name]-[hash:7].[ext]",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new htmlWebpackPlugin({
      filename: "index.html",
      template: "./public/index.html",
    }),
    new webpack.HotModuleReplacementPlugin(),
    new VueLoaderPlugin(),
  ],
};
