import React from "react";
import axios from "axios";
import config from '../config/config.json'


export default function Admin(props) {
    function headen() {
        axios.get(config.httpUrl)
            .then((res)=>{
                if(res){
                    console.log(111)
                }
            }).catch((err)=>{
            if(err){
                console.log(222)
            }
        })
    }



    return (
        <div>
            <button onClick={headen}>点击</button>
        </div>
    )
}
