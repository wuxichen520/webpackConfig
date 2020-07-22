//默认webpack.config.js  文件

//loader 加载器 翻译官
    // css  
        //style-loader 
        //css-loader   
        //postcss-loader 
        //autoprefixer
    // less    
        //less-loader
    // sass
        //node-sass 
        //sass-loader
    // images
        //file-loader 生成一个文件放在dist目录下 会返回拷贝的路劲
        //url-loader 可以把小图片变成base64打包进去
    // html
        //html-withimg-loader  在页面中用图片路劲
    // 转化es6...
        // babel-loader 
        //@babel/core 
        //@babel/preset-env  
        //@babel/preset-react 
    // 去除js重复的代码 
        //@babel/plugin-transform-runtime
        //@babel/runtime
    //装饰器
        //@babel/plugin-proposal-decorators
    //类的属性
        //@babel/plugin-proposal-class-properties
    //es-lint
        //1.手动配置
        //2.直接初始化规范
//插件
    //html-webpack-plugin  用来根据模板来产生一个打包后的html
    //clean-webpack-plugin 打包之前清除目录
    //mini-css-extract-plugin 
        //optimize-css-assets-webpack-plugin 优化css资源插件

//webpack-dev-server
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
module.exports = { //node commonJS规范
    externals:{
        'jquery':'$'
    },
    /* optimization:{
        minimizer: [
            //压缩js
            new TerserPlugin({
                parallel: true,
                cache: true
           }),
           //压缩css
           new OptimizeCSSAssetsPlugin({
                assetNameRegExp:/\.css$/g,
                //cssnano是PostCSS的CSS优化和分解插件。cssnano采用格式很好的CSS，并通过许多优化，以确保最终的生产环境尽可能小。
                cssProcessor:require('cssnano')
            })
        ]
    }, */
    devtool:"source-map", //inline cheap module eval source-map(全面 打包速度慢)  cheap-module-source-map(生产)   cheap-module-eval-source-map(开发)
    devServer:{
        port:3000, //端口号
        //overlay:true,//  增加代码校验弹层
        //open:true, //自动打开浏览器
        compress:true ,//启动gzip压缩
        hot:true,
        contentBase:"./dist", //配置开发服务运行时的文件根目录  express.static(dist)
       /*  before(app){ //http监听函数
            app.get('/api/user',function(req,res){
                res.json({name:"zs"})
            })
        } */
        //自己写一个服务 吧webpack跑在自己的服务器上 webpack-dev-middleware
       /*  proxy:{ //代理
            "/api": {
                target: 'http://localhost:5000',
                changeOrigin:true, //主要把host改成访问服务器的地址
                pathRewrite:{"^/api":""}        
             }
        } */
    },
    mode:'development', //模式 开发 生产 development  production
    //entry:'./src/a.js', //入口文件
    entry:{  //多入口文件
        index:"./src/a.js",
        other:"./src/b.js",
    }, 
   /*  output:{
        filename:'build.js',//默认main.js   指定输入文件的名字
        //path:path.resolve(__dirname,"a"),//默认dist文件 改变输出文件夹名字
    }, */
    output:{
        filename:'[name].[hash:8].js',//多出口  占位符  contentHash防止缓存
        
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
                        // {
                        //     useBuiltIns:'usage', //只转化使用的api promise
                        //      corejs:{version:3} 需要额外安装corejs
                        // }
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
            {
                
                test: /\.css/,
                
            //    use:['style-loader','css-loader']
            use:[
                    'style-loader',
                    MiniCssExtractPlugin.loader, //抽离css样式  生产模式
                    {
                        loader:'css-loader',
                        options:{
                            //modules:true //实现css模块化
                        }
                    },
                    //'less-loader', 
                    'sass-loader',
                    'postcss-loader' ,//添加前缀  新建postcss.config.js  暂时没生效
                   
                ],
                //enforce:'pre' //loader顺序从下往上 强制前置  //post 后置  normal普通
            },
           
        ]
    },
    plugins:[
        new CleanWebpackPlugin({cleanOnceBeforeBuildPatterns: ['**/*', '!static-files*']}),
        ...HtmlPliguns,
        /* new HtmlWebpackPlugin({
            template:'./src/index.html' , //克隆模板
            minify:{
                removeAttributeQuotes:true,//去掉双引号
                collapseWhitespace:true, //去除空格
            },
            //hash:true,//引入文件的hash
            filename:'login.html' //默认模板文件名 可更改
        }) */
        new MiniCssExtractPlugin({  //还需要配合loader使用
            filename:'[name].css'
        }),
        new webpack.HotModuleReplacementPlugin()
       /*  new webpack.ProvidePlugin({
            "$":"jquery"
        }) */
    ]
    
}