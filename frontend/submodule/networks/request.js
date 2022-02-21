import axios from 'axios';
import {base_url} from "base/base";

 class Request {
    constructor() {
        // GET 请求
        this.get = (url, params) => {
            return axios.get(base_url + url, params)
        };
        // POST 请求
        this.post = (url, data) => {
            return  axios.post(base_url + url, data)
        };
        // PATCH 请求
        this.patch = (url, data) => {
            return axios.patch(base_url + url, data)
        };
        // PUT 请求
        this.put = (url, data) => {
            return axios.put(base_url + url, data)
        };
        // DELETE 请求
        this.delete = (url, params) => {
            return axios.delete(base_url + url, params)
        };
    }
}
Promise.prototype.req_result = async function(){
    try {
        const res = await this;
        return [res['data'], null];
    } catch (err) {
        if (JSON.stringify(err).indexOf('Network Error') > -1) {
            return [null, 'Network Error，网络错误！！'];
        }
        if (err.response) {
            return [null, err.response.data.detail];
        }
        return [null, err];
    }
}

// 同时 发送多个请求
function request_all(){
    let resList = [],
        reqList = Array.from(arguments);
        // eslint-disable-next-line array-callback-return
        reqList.map((item,index) => {
            resList.push(('res' + (index + 1)))
        })
    return axios.all(reqList).then(axios.spread((...res_list)=>{
        let arr = [];
        res_list.map(item=>{
            arr.push(item.data)
        })
        return [arr,null]
    })).catch(err => {
        if(JSON.stringify(err).indexOf('Network Error')>-1){
            return [null,'Network Error，网络错误！！']
        }
        if(err.response){
            return [null , err.response.data.detail]
        }
        return [null,err]
    })
}

let request = new Request()

export {
    request,
    request_all
}