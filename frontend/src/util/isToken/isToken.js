import cookie from "react-cookies";

/**
 * 判断token是否存在
*/
const isToken = (props) => {

    // console.log(props.match.path.length)  //17
    // console.log(window.location.pathname.length)  //21
    // console.log(window.location.pathname.substring(props.match.path.length,window.location.pathname.length))
    // const token = props.match.params.token;
    const token = window.location.pathname.substring(props.match.path.length,window.location.pathname.length);         // 判断路径是否有 token

    console.log(token)
    let isToken = false;
    if (token !== "" && token.length > 100) {  // （token.length > 100）用来初步校验用户是否非法输入
        let inFifteenMinutes = new Date(new Date().getTime() + 24 * 3600 * 1000);   // 一天
        cookie.save('token', props.match.params.token, { expires: inFifteenMinutes });
        isToken = true;
    } else {    //判断缓存中是否有token
        const token = cookie.load("token");       // 读取 cookie 中的 token
        if (token) {                                // token 存在
            isToken = true;
        } else {                                    // token 不存在 
            isToken = false;
        }
    }

    return isToken;
}


/* 认证token是否有效*/


export default isToken;



