#! /usr/bin/env python

# coding=UTF-8

# 公共函数库
from passlib.context import CryptContext
import IPy
import json


class MyEncoder(json.JSONEncoder):

    def default(self, obj):
        """
        只要检查到了是bytes类型的数据就把它转为str类型
        :param obj:
        :return:
        """
        if isinstance(obj, bytes):
            return str(obj, encoding='utf-8')
        return json.JSONEncoder.default(self, obj)


pwd_context = CryptContext(schemes=['bcrypt'], deprecated='auto')

ALGORITHM = 'HS256'


def verify_password(password: str, hashed_password: str) -> bool:
    print(pwd_context.verify(password, hashed_password))
    return pwd_context.verify(password, hashed_password)


# generate hash password
def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)


# 合法IP测试
def ip_identify(ip):
    try:
        iplist = ip.split(".")
    except AttributeError:
        return False
    try:
        if len(iplist) == 4:
            for i in iplist:
                if not (int(i) <= 255 and int(i) >= 0):
                    return False  # ip格式错误
            return True  # ip
        else:
            return False
    except ValueError:
        return False


#
def is_ip(ip):
    try:
        IPy.IP(ip)
        return True
    except Exception as e:
        return False
