let devConfig = {
    mode:'development',
    devServer:{
        port:3000, //端口号
        //overlay:true,//  增加代码校验弹层
        //open:true, //自动打开浏览器
        compress:true ,//启动gzip压缩
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
    module:{
        rules:{
                
            test: /\.css/,
            use:[
                'style-loader',
                {
                    loader:'css-loader',
                    options:{
                        modules:true //实现css模块化
                    }
                },
                //'less-loader', 
                'sass-loader',
                'postcss-loader' ,//添加前缀  新建postcss.config.js  暂时没生效
               
            ],
            //enforce:'pre' //loader顺序从下往上 强制前置  //post 后置  normal普通
        },
    }
}