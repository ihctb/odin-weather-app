const path = require('path');
const webpack = require('webpack');
require('dotenv').config();
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/js/init.js',
    plugins: [
        new HtmlWebpackPlugin({
            templateContent: '',
        }),
        new webpack.DefinePlugin({
            API_KEY: JSON.stringify(process.env.API_KEY),
        }),
    ],
    performance: {
        hints: false, // disables size warnings
    },
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
        ],
    },
};
