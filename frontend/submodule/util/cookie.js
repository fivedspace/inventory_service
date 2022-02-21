function setCookie(name,value,time) {
    if(typeof(value) != 'string')value = JSON.stringify(value)
    // 判断是否设置了过期时间，如果设置了过期时间，那就在添加时设置，否则默认时效
    if (time) {
        var date = new Date();
        date.setDate(date.getDate()+time);
        document.cookie = name + '='+value+';expires'+date;
    }else{
        document.cookie =  name +'='+value;
    }
}

function getCookie(name) {
    // 读取所有cookie
    var cookie = document.cookie.split('; ');
    for(var i = 0; i<cookie.length;i++){
        if (cookie[i].indexOf(name) == 0) {
            return cookie[i].substr(name.length + 1);
        }
    }
    return null
}

function removeCookie(name) {
    // 时间设置为昨天。就表示已经过期
    setCookie(name,'',-1);
}

export {
    setCookie,
    getCookie,
    removeCookie
}