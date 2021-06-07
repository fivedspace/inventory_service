import axios from "axios";

/***
 *
 * @param option
 * @returns {Promise<unknown>}
 */
export default function request(option){

    // 返回一个
    return new Promise((resolve, reject)=>{
        axios({
            url:""+option.url,
            method:option.method,
            header:option.header,
            data:option.data,
            params:option.params,
            timeout:option.timeout,
        })
            .then((res)=>{resolve(res)})
            .catch((err)=>{reject(err)})
    })
}