const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')

const getBabelLoaderConfig = (presets = []) => ({
    loader: 'babel-loader',
    options: {
        presets: [
            ["@babel/preset-react", { runtime: "automatic"}],
            ...presets
        ]
    }
})

module.exports = {
    mode: "development",
    entry: './src/index',
    output: {
        filename: '[name].bundle.js',
        path: path.join(__dirname, 'dist')
    },
    devtool: "source-map",
    devServer: {
        hot: true,
        open: true
    },
    module: {
        rules: [ 
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(js|ts|jsx)$/,
                // exclude: /node_modules/,
                ...getBabelLoaderConfig()
            },
            {
                test: /\.tsx$/,
                ...getBabelLoaderConfig(['@babel/preset-typescript', 'ts-loader'])
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js', '.jsx', '.tsx']
    },
    plugins: [
        new HTMLWebpackPlugin({
            templateContent:
`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div id="app"></div>
</body>
</html>
`
        })
    ]
}