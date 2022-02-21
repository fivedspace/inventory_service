import base64


def strToBase64(s):
    """
    将字符串转换为base64字符串
    :param s:
    :return:
    """
    strEncode = base64.b64encode(s.encode('utf8'))
    # return str(strEncode, encoding='utf8')
    return strEncode


def base64ToStr(s):
    """
    将base64字符串转换为字符串
    :param s:
    :return:
    """
    strDecode = base64.b64decode(s)
    base = str(strDecode)[1:]
    return base[1:len(s)-1]
    # return strDecode


def base64_to_hex(payload_base64):
    bytes_out = base64.b64decode(payload_base64)
    str_out = bytes_out.hex()
    print("base64_to_hex:", str_out)
    return str_out


def hex_to_base64(payload_hex2):
    bytes_out = bytes.fromhex(payload_hex2)
    str_out = base64.b64encode(bytes_out)
    print("hex_to_base64:", str_out)
    return str_out
