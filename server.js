let express = require('express')
let config = require("./webpack.config") //webpack配置
let webpack = require('webpack');

let compile= webpack(config) //webpack-dev-middleware
let middleware = require("webpack-dev-middleware")
let app = express();
app.use(middleware(compile))
app.get("/api/user",function(req,res){
    console.log(req.headers)
    res.json({name:'您好'})
})
app.listen(5000)