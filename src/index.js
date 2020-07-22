// import React from "react"
// import ReactDom from "react-dom";
// import Header from "_c/header"

// ReactDom.render(<Header></Header>,document.getElementById("root"))

// import {sum} from "./calc"
// sum()

import _ from "lodash"
let fn = _.after(1,function(){
    console.log('hello')
})

fn()

import moment from "moment"
import "moment/locale/zh-cn" //忽略其他语言
moment.locale("zh-CN")
console.log(moment().format("MMMM Do YYYY,h:mm:ss a"))