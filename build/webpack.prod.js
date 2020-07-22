const  MiniCssExtractPlugin = require('mini-css-extract-plugin');
let prodConfig = {
    mode:'production', //模式 开发 生产 development  production
    module:{
        rules:{
                
            test: /\.css/,
            
        //    use:['style-loader','css-loader']
        use:[
                MiniCssExtractPlugin.loader, //抽离css样式  生产模式
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
    },
    plugins:[
        
        new MiniCssExtractPlugin({  //还需要配合loader使用
            filename:'[name].css'
        }),
       
    ]
    
}