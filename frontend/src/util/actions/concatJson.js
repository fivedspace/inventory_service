/**
 * 合并json
 * json
 * */

const concatJson = (json,jsonT)=>{
    return JSON.parse((JSON.stringify(jsonT)+JSON.stringify(json)).replace(/}{/,','));
}

export {concatJson}
