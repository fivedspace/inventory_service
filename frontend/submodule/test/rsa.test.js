
/* js 使用rsa加密 引入nodejs的第三方库：npm install node-jsencrypt  */
import jsEncrypt from "node-jsencrypt";
import config from "config/config.json";

/**
 * 加解密数据
 * */
const rsa_en_de = {

    encrypt(data){
        let rsa = new jsEncrypt();
        rsa.setPublicKey(config.pub_key);  // 设置公钥
        // return rsa.encryptUnicodeLong(JSON.stringify(data)); //加密后的数据密文
        return rsa.encrypt(JSON.stringify(data)); //加密后的数据密文
    },

    decrypt(data){
        let rsa = new jsEncrypt();
        rsa.setPrivateKey(config.pri_key); // 设置私钥
        // return rsa.decryptUnicodeLong(data)
        return rsa.decrypt(data)
    }

}

export { rsa_en_de}