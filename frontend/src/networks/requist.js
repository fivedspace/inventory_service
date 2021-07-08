import axios from 'axios';


/**
 * 封装了网络请求公共函数，
 * 1. 给定一个基础路径
 * 2. 返回一个异步对象
 * options：
 * */
export default function request(options) {

    /*
    *  Promise 异步操作对象
    * */
    const base_url = "http://192.168.0.124:8000";
    return new Promise((resolve, reject) => {
        axios({
            url: base_url + options.url,
            method: options.method,
            headers: options.headers,
            config: options.config,
            params: options.params,
            data: options.data
        })
            .then(response => { resolve(response.data) }) //异步请求成功回调
            .catch(error => { reject(error) })  //异步请求失败回调
    })

}


/**
 * 关于POST请求方式的  三种内容类别说明(Content-Type)
 * */

axios.post("", "", { headers: { "Content-Type": "application/x-www-form-urlencoded" } }).then(r => r) //form表单提交
axios.post("", "", { headers: { "Content-Type": "multipart/form-data" } }).then(r => r)    //常用于文件上传，data需要使用formData对象
axios.post("", "", { headers: { "Content-Type": "application/json" } }).then(r => r)  //正常post请求，不包含文件类型
