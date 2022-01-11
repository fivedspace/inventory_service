import socket
from binascii import unhexlify
from hashlib import sha1
from fastapi.exceptions import HTTPException

from loguru import logger
from crcmod import mkCrcFun

import crud
import env
import json

import schemas

from sqlalchemy.orm import Session
import re

socket_connection_pool = {}


def crc16_modbus(s):
    """
    生成校验码
    :param s: 要生成校验码的字符串
    :return: 校验码
    """
    crc16 = mkCrcFun(0x18005, rev=True, initCrc=0xFFFF, xorOut=0x0000)
    data = s.replace(' ', '')
    crc_out = hex(crc16(unhexlify(data))).upper()
    str_list = list(crc_out)
    if len(str_list) == 5:
        str_list.insert(2, '0')  # 位数不足补0
    crc_data = ''.join(str_list[2:])
    return crc_data[2:] + "" + crc_data[:2]


def format_data(slave_address: str, command_code: str, data: str):
    """
    # 格式化数据
    :param slave_address: 从机地址
    :param command_code: 指令
    :param data: 数据
    :return:
    """
    # 格式化从机地址
    if len(slave_address) == 1:
        slave_address = '0' + slave_address
    elif len(slave_address) > 2:
        raise Exception(print('从机地址错误,长度过长'))
    # 格式化指令
    if len(command_code) == 1:
        command_code = '0' + command_code
    elif len(command_code) > 2:
        raise Exception(print('指令错误,长度过长'))
    # 格式化数据
    if len(data) != 32:
        data = data + '0' * (32 - len(data))
    return slave_address + command_code + data


def format_grid_index(a: str):
    """
    将电机索引号转换为16进制并格式化
    :param a: 电机索引号 10进制
    :return: 16进制电机索引号
    """
    b = hex(int(a))
    c = b[b.find('x') + 1:]
    if len(c) != 2:
        c = '0' + c
    return c


def send_request(ip: str, command: str):
    """
    向柜机发送信息
    :param ip: 柜机ip
    :param command: 要发送的命令
    :return: 柜机返回信息
    """
    client = socket_connection_pool.get(ip, None)  # 从连接池中取出对应ip的连接
    if client is not None:  # 如果连接存在
        encrypted_string = command + env.KEY  # 要加密的字符串
        s1 = sha1()  # 获取加密对象
        s1.update(encrypted_string.encode("utf-8"))
        sign = s1.hexdigest()  # 获取加密后的签名
        mes = {"command": command, "sign": sign}
        mes = json.dumps(mes)
        try:
            client.send(bytes(mes.encode('utf-8')))  # 发送命令
        except ConnectionResetError as e:
            del socket_connection_pool[ip]
            raise RuntimeError("与柜机连接已断开")
        data = client.recv(1024)
        return data.decode()  # 返回消息
    else:
        raise RuntimeError("与柜机连接不存在")


def socket_server():
    """
    开启socket服务
    """
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)  # 定义socket类型，网络通信，TCP
    s.bind((env.SOCKET_HOST, env.SOCKET_PORT))  # 套接字绑定的IP与端口
    s.listen(1)  # 开始TCP监听,监听1个请求
    logger.info("服务启动，ip地址为：" + env.SOCKET_HOST + "  端口为：" + str(env.SOCKET_PORT))
    while True:
        conn, addr = s.accept()  # 接受TCP连接，并返回新的套接字与IP地址
        logger.info("收到连接请求，ip地址为：" + addr[0])
        try:
            data = conn.recv(1024)
            logger.info("柜机发送的ip地址为" + data.decode())
            socket_connection_pool[data.decode()] = conn
        except ConnectionResetError:
            logger.error("柜机发送标识时出现错误，重新等待连接...")
            logger.error(ConnectionResetError)
            continue
        except UnicodeDecodeError:
            logger.error("出现编码解析错误，重新等待连接...")
            logger.error(UnicodeDecodeError)
            continue
        except Exception as e:
            logger.error("出现未知错误，尝试重新等待连接...")
            logger.error(e)
            continue


# def operators_ex_util(db: Session, data: schemas.OperatorsIn, id=None):
#     """
#     系统操作员信息是否重复验证工具
#     :param db: 数据库连接对象
#     :param data: 验证数据
#     """
#     id_number_filtering = '[{"model": "SysOperators", "field_name": "id_number", "option": "==", "value": "' + data.id_number + '"}]'
#     # 查询工号是否已存在
#     code_filtering = '[{"model": "SysOperators", "field_name": "code", "option": "==", "value":"' + data.code + '"}]'
#     # 查询电话号码是否已存在
#     phone_filtering = '[{"model": "SysOperators", "field_name": "phone", "option": "==", "value":"' + data.phone + '"}]'
#     if id:
#         id_number_filtering = '[{"model": "SysOperators", "field_name": "id_number", "option": "==", "value": "' + data.id_number + '"}, {"model": "SysOperators", "field_name": "id", "option": "!=","value":"' + str(
#             id) + '"}]'
#         # 查询工号是否已存在
#         code_filtering = '[{"model": "SysOperators", "field_name": "code", "option": "==", "value":"' + data.code + '"},{"model": "SysOperators", "field_name": "id", "option": "!=","value":"' + str(
#             id) + '"}]'
#         # 查询电话号码是否已存在
#         phone_filtering = '[{"model": "SysOperators", "field_name": "phone", "option": "==", "value":"' + data.phone + '"},{"model": "SysOperators", "field_name": "id", "option": "!=","value":"' + str(
#             id) + '"}]'
#     id_number_filtering_result = crud.get_system_operators(db, id_number_filtering, '[]', '{"page":1,"limit":10}')
#     code_filtering_result = crud.get_system_operators(db, code_filtering, '[]', '{"page":1,"limit":10}')
#     phone_filtering_result = crud.get_system_operators(db, phone_filtering, '[]', '{"page":1,"limit":10}')
#
#     if not id_number_filtering_result:
#         raise HTTPException(422, "证件号已存在")
#     elif not code_filtering_result:
#         raise HTTPException(422, "操作员工号已存在")
#     elif not phone_filtering_result:
#         raise HTTPException(422, "电话号码已存在")


# def verify_phone(data: schemas.OperatorsUpdateIn):
#     # 手机号码格式的正则表达式
#     reg_phone = '^1(3[0-9]|4[5,7]|5[0,1,2,3,5,6,7,8,9]|6[2,5,6,7]|7[0,1,7,8]|8[0-9]|9[1,8,9])\d{8}$'
#     reg_cardnum = '[1-9][0-9]{14}([0-9]{2}[0-9X])?'
#     ret_phone = re.match(reg_phone, data.phone)
#     ret_cardnum = re.match(reg_cardnum, data.id_number)
#
#     if not ret_phone:
#         raise HTTPException(422, "手机号格式有误")
#     if not ret_cardnum:
#         raise HTTPException(422, "身份证格式有误")


def paging_data_integration(result, pagination):
    """
    分页数据整合
    :param result: crud层返回的查询结果数据
    :param pagination: crud层返回的分页数据
    :return:
    """
    return {"data": result, "count": pagination.total_results, "page": pagination.page_number,
            "page_count": pagination.num_pages,
            "size": pagination.page_size}
