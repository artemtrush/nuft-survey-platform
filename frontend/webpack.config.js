var webpack = require("webpack");
var path = require("path");

var node_modules = __dirname + "/node_modules";
var admin_lte = node_modules + "/admin-lte";
var fullcalendar = node_modules + "/@fullcalendar";

var ExtractTextPlugin = require("extract-text-webpack-plugin");

var autoprefixer = require('autoprefixer');

module.exports = {
    resolve: {
        alias: {
            jqueryUi: admin_lte + "/plugins/jQueryUI/jquery-ui.min.js",
            dataTableBsCss: node_modules + '/datatables.net-bs/css/dataTables.bootstrap.css',
            bootstrapCss: node_modules + "/bootstrap/dist/css/bootstrap.min.css",
            admCss: admin_lte + "/dist/css/AdminLTE.min.css",
            admSkin: admin_lte + "/dist/css/skins/_all-skins.min.css",
            admJs: admin_lte + "/dist/js/app.min.js",
            fontAwesome: node_modules + "/font-awesome/css/font-awesome.css",
            momentJs: node_modules + "/moment/moment.js",
            fullcalendarCoreCss: fullcalendar + "/core/main.css",
            fullcalendarDaygridCss: fullcalendar + "/daygrid/main.css"
        }
    },
    entry: [
        "./src/index.js"
    ],
    output: {
        path: __dirname + "/public/build/",
        filename: "main.js",
        publicPath: "/build/"
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({output: {comments: false}}),
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.OccurenceOrderPlugin(true),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        }),
        new ExtractTextPlugin("[name].css")
    ],
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader!postcss-loader")
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader!postcss-loader!less-loader")
            },
            {
                test: /\.scss/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader!postcss-loader!sass-loader")
            },
            { test: /\.gif$/, loader: "url-loader?limit=10000&mimetype=image/gif" },
            { test: /\.jpg$/, loader: "url-loader?limit=10000&mimetype=image/jpg" },
            { test: /\.png$/, loader: "url-loader?limit=10000&mimetype=image/png" },
            { test: /\.svg$/, loader: "url-loader?limit=26000&mimetype=image/svg+xml" },
            { test: /\.js$/, loader: "babel-loader", exclude: [/node_modules/, /\.worker\.js$/] },
            { test: /\.json$/, loader: "json-loader" },
            { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "url-loader?limit=10000&mimetype=application/font-woff" },
            { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" }

        ],
        resolve: {
            extensions: ["", ".js"]
        }
    },
    postcss: function () {
        return [autoprefixer];
    },
    eslint: {
        configFile: ".eslintrc"
    },
    devServer: {
        headers: { "Access-Control-Allow-Origin": "*" }
    },
    noParse: /\/node_modules\/jquery\//
};
