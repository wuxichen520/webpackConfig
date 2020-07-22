
const path = require("path");
const HtmlWebpackPlugin  = require('html-webpack-plugin');
const  {CleanWebpackPlugin} = require('clean-webpack-plugin');
const  MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const webpack = require('webpack')
let HtmlPliguns = [ //多个html
    'index',
    'other'
].map(chunkname=>{
    return new HtmlWebpackPlugin({
        filename:`${chunkname}.html`,
        chunks:[chunkname], //引入各自的js
        template:`./src/${chunkname}.html`
    })
})
let base = { //node commonJS规范
    //entry:'./src/a.js', //入口文件
    entry:{  //多入口文件
        index:"./src/a.js",
        other:"./src/b.js",
    }, 
    output:{
        filename:'[name].[contenthash:8].js',//多出口  占位符  contentHash防止缓存
        
    },
    module:{
      
        rules: [
            {
                test: /\.js?$/, 
                exclude:/node_modules/, //忽略不要进行loader处理的文件
                include:path.resolve(__dirname,'src'),
                use:{
                    loader:'babel-loader',
                    options:{
                        presets:[['@babel/preset-env',
                    ]], //预设
                        plugins:[
                            ["@babel/plugin-proposal-decorators", { "legacy": true }],
                            ["@babel/plugin-proposal-class-properties", { "loose" : true }],
                            //'@babel/plugin-transform-runtime' //并不支持实例上的方法  string.includes
                        ]
                    }
                },
               
            },
          /*   {
                test:/\.html$/,  //有bug
                use:'html-withimg-loader'
            }, */

            {
                    test:/\.(woff|woff2|ttf|eot|svg|otf)$/,  //字体不能变成base64 特殊处理
                    use:{
                        loader:'file-loader',
                        }
            },
            {
                test:/\.(jpg|png|bmp|gif)/,
                use:{
                    loader:'url-loader', //会调用file-loader
                    options:{
                        limit:4096, //base64 超过限制会变成源文件
                        //publicPath:'http://www.baidu.com', //增加访问前缀
                        outputPath:'image', //输出到某个文件夹
                       
                    } 
                 }
            },
          
           
        ]
    },
    plugins:[
        new CleanWebpackPlugin({cleanOnceBeforeBuildPatterns: ['**/*', '!static-files*']}),
        ...HtmlPliguns,
        
    ]
    
}

let dev = require("./webpack.dev")
let prod = require("./webpack.prod")
let merge = require("webpack-merge")
module.exports = (env)=>{
    console.log(env)
    if(env.production){
        return merge(base,prod)
    }else{
        return merge(base,dev)
    }
    
}