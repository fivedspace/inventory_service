import React from 'react';
import ReactDOM from 'react-dom';
import {Grid} from '@material-ui/core';
import {rsa_en_de} from "./rsa.test";

function Test(){
    let en = rsa_en_de.encrypt({id:"123",url:"http://192.168.0.107:3000",address:"北京市东城区",arr:[1,2,3,4,5,6,7,8],remark:"八九"})
    console.log(en)
    console.log(rsa_en_de.decrypt(en))

    return (
        <Grid>
            hello world
        </Grid>
    )
}

ReactDOM.render(
    <Test/>,
    document.getElementById('root')
);