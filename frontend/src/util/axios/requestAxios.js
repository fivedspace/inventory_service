import axios from "axios";
import {_local} from "../actions/localStrore";

/**
 * js请求资源类
 * */
class ClassAxios {

    //构造函数，url：ip/域名
    constructor(url,token) {
        this.url = url
        this.token = token
        // this.data = data
    }
    url = this.url

    access(res){
        // 成功请求的响应信息
        if(res.status && res.data){
            return {status:res.status,data:res.data}
        }else {
            return {status:9999,data:'未知错误'};
        }
    }
    fail(err){
        //出现异常的响应信息
        if(err.response && err.response.status){
            return {status:err.response.status,data:err.response.data}
        }else {
            return {status:9999,data:'未知错误'};
        }
    }

    /**
     * post请求 参数跟着url中
     * uri 请求局部路径
     * params 请求参数
     * 返回值为响应的的状态以及信息
     */
    async subPostParamsData(uri,paramData) {
        return await axios({
            url:this.url+uri,
            method:'post',
            headers:{'Content-Type':'application/json', 'Accept': 'application/json',Authorization:_local.get('token')},
            params:paramData
        }).then((res)=>{return this.access(res)})
            .catch((err)=>{return this.fail(err)})
    }

    /**
     * post请求 参数包含body体中    this.handleSubmitClick=this.handleSubmitClick.bind(this);
     * */
    async subPostBodyData(uri,bodyData){
        return await axios({
            url:this.url+uri,
            method:'post',
            headers:{'Content-Type':'application/json', 'Accept': 'application/json',Authorization:_local.get('token')},
            data:bodyData
        }).then((res)=>{return this.access(res)})
            .catch((err)=>{return  this.fail(err)})
    }

    /**
     * 可用于文件上传 multipart/form-data
     * 返回值为响应的的状态以及信息
     * 参数：
     * formDate 一个formData对象
     */
    async subPostFormData(uri,formData) {
        return await axios.post(this.url+uri, formData,
            {headers: {'content-type': 'multipart/form-data',accept: 'application/json',Authorization:this.token}})
            .then((res)=>{return this.access(res)})
            .catch((err)=>{return this.fail(err)})
    }

    /**
     * get请求
     * uri 请求路径
     * */
    async subGetParamData(uri,paramData){
        return await axios({
            url:this.url+uri,
            method:'get',
            headers:{'Content-Type':'application/json', 'Accept': 'application/json',Authorization:_local.get('token')},
            params:paramData
        }).then((res)=>{return this.access(res)})
            .catch((err)=>{return this.fail(err)})
    }

    /**
     * get请求 参数跟在body/请求主体中
     * uri 请求路径
     * */
    async subGetBodyData(uri,bodyData){
        return await axios({
            url:this.url+uri,
            method:'get',
            headers:{'Content-Type':'application/x-www-form-urlencoded', 'Accept': 'application/json',Authorization:_local.get('token')},
            data:bodyData
        }).then((res)=>{return this.access(res)})
            .catch((err)=>{return this.fail(err)})
    }

    /**
     * put请求 可以文件上传，注意配置headers
     * data 请求参数
     * headers {'content-type': 'application/json',Authorization:token}
     * 返回值为响应的的状态以及信息
     */
    async subPut(uri,data,headers) {
        return await axios.put(this.url+uri,data,{headers: headers})
            .then((res)=>{return this.access(res)})
            .catch((err)=>{return this.fail(err)})
    }

    /**
     * delete请求
     * headers
     * */
    async subDelete(uri,headers){
       return await axios.delete(this.url+uri,{headers})
           .then((res)=>{return this.access(res)})
           .catch((err)=>{return this.fail(err)})
    }

    /** */
    async subAllR(uri,method,headers,date){
        return await axios({
            url:this.url+uri,
            method:method,
            headers:headers,
            data: date,
            // params:params
        })
            .then((res)=>{return this.access(res)},)
            .catch((err)=>{return this.fail(err)})
    }

}
export {ClassAxios}
