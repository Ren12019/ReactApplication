const path = require("path");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    // モード値を production に設定すると最適化された状態で、
    // development に設定するとソースマップ有効でJSファイルが出力される
    mode: "development",

    // メインとなるJavaScriptファイル（エントリーポイント）
    entry: "./src/index.tsx",
    // ファイルの出力設定
    output: {
      //  出力ファイルのディレクトリ名
      path: `${__dirname}/dist`,
      // 出力ファイル名
      filename: "main.js"
    },
    module: {
      rules: [
        {
          // 拡張子 .ts もしくは .tsx の場合
          test: /\.tsx?$/,
          // TypeScript をコンパイルする
          use: "ts-loader"
        }
      ]
    },
    // import 文で .ts や .tsx ファイルを解決するため
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".json"]
    },
    // ES5(IE11等)向けの指定（webpack 5以上で必要）
    target: ["web", "es5"],
    // pluginの設定　htmlの設定
    plugins: [
      new CleanWebpackPlugin({
        cleanAfterEveryBuildPatterns:['build']
      }),
      new HtmlWebpackPlugin({
          template: 'src/templates/index.html',
      }),
    ],
    devtool: 'inline-source-map',
    // webpack dev serverの設定
    // contentBaseはstaticのdirectoryに変更されている。
    devServer: {
        open: true,
        static: {
          directory:path.resolve(__dirname, 'dist'),
        }
    },
  };