const HtmlWebpackPlugin  = require('html-webpack-plugin');
let webpack = require('webpack');
let path = require("path");
let AddAssetsPlugin = require("add-asset-html-webpack-plugin") //在html插件之后执行
module.exports = {
    mode:"development",
    entry:"./src/index.js",
    output:{
        filename:"bundle.js"
    },
    optimization:{
        splitChunks:{
            chunks:"all"
        }

    },
    module:{
        rules:[
            {
                test: /\.js?$/, 
                use:'babel-loader', //默认调用.babelrc
                exclude:/node_module/
            },
            {
                test: /\.css?$/, 
                use:["style-loader","css-loader"], //默认调用.babelrc
            }
        ]
    },
    resolve:{ //解析查找的规则
        alias:{ //别名
            _c:path.resolve(__dirname,"src","components")
        },
        //扩展名
        extensions:[".js",".css"], //查找顺序  先找js  后css

    },
    plugins:[
        new webpack.IgnorePlugin(/\.\/locale/),
        new webpack.DllReferencePlugin({ //引用dllPlugin
            manifest:path.resolve(__dirname,"dist","manifest.json")
        }),
        new HtmlWebpackPlugin({
            template:'./src/index.html' , //克隆模板
        }),
        new AddAssetsPlugin({
            filepath : path.resolve(__dirname,"dist","react.dll.js") //在html中引用react.dll.js
        })
        

    ]
}


//babel-loader 
//@babel/core 
//@babel/preset-env  
//@babel/preset-react 
//style-loader 
//css-loader
//webpack-dev-server
//html-webpack-plugin