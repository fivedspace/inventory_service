import { encrypt } from "util/jsencrypt/jsencryptUtil";

/**
 * 跳转登录页面
 * @param {当前页面地址} currentUrl 
 * @param {string} callbackUrl
 * @param {公钥} publicKey 
 * @param {单点登录系统登录页面请求地址} singleUrl
 */
export default function toSignIn(currentUrl, callbackUrl, publicKey, singleUrl) {
    currentUrl = currentUrl.substring(0, currentUrl.lastIndexOf("/"))
    const rsaCurrentUrl = encrypt(currentUrl, publicKey);
    const rsaCallbackUrl = encrypt(callbackUrl, publicKey);

    // 跳转到登录页面， 传递一个当前页地址  和一个回调地址
    window.location.href = singleUrl + "/" + rsaCurrentUrl + "/" + rsaCallbackUrl;
}

 