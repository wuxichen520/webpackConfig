let webpack = require('webpack');
let path = require("path")
module.exports = {
    mode:"development",
    entry:{
        react:["react","react-dom"] //将两个文件打包为react
        //test:"./src/test.js"
    },
    output:{
        //library:"a", //var a =   给导出的内容增加属性名
        //libraryTarget:"this",
        //libraryTarget:"commonjs2", // module.exports =  
        library:"react",
        filename:"[name].dll.js",
        
    },
    plugins:[
        new webpack.DllPlugin({
            name:'react',
            path:path.resolve(__dirname,"dist","manifest.json")
        })
    ]
}