import time
from typing import List
from sqlalchemy.sql.expression import null
import models
# import util.util
from database import SessionLocal
from util.utli import *
from loguru import logger
import env
import requests
# from util.org import OrderBox
from util.verify_code import get_email_code
from fastapi.encoders import jsonable_encoder
import hashlib
import qrcode
import os
import random
import string
import re
from util.auth import CommonReq
from util import connection_manager
from util.Redis import Redis
# from util.utli import operators_ex_util, verify_phone, paging_data_integration
import json
import crud
RE_PHONE = r"^1[3|4|5|6|7|8][0-9]{9}$"  # 手机号校验正则表达式
RE_EMAIL = r"^[a-z0-9][\w.\-]*@[a-z0-9\-]+(\.[a-z]{2,5}){1,2}$"  # 邮箱校验正则表达式
redis = Redis()


def get_db():
    db = SessionLocal()
    try:
        return db
    finally:
        db.close()


def static_folder():
    p = os.path.abspath("./static/")
    if not os.path.exists(p):
        os.makedirs(p)
    return p


# Admin
def send_code(number):
    urlbase = env.SINGLE_SIGN_ON_CODE + "/verify_code"
    url = urlbase + f"?number={number}"
    # send data
    response = CommonReq(url=url, method="post")

    return response.data


def client_code():
    url = env.SINGLE_SIGN_ON_CODE + "/client_code"
    response = CommonReq(url=url, method="get")
    return response.data


def change_pwd(data):
    url = env.SINGLE_SIGN_ON_USER + "/password"
    dataload = {"token": data.token, "old_pwd": data.old_pwd, "new_pwd": data.new_pwd}
    # send data
    response = CommonReq(url=url, method="patch", data=json.dumps(dataload))
    return response.data


def verify_code_password(data):
    url = env.SINGLE_SIGN_ON_USER + "/verify_code_password"
    dataload = {"number": data.number, "pwd": data.pwd, "verify_code": data.verify_code}
    # send data
    response = CommonReq(url=url, method="patch", data=json.dumps(dataload))
    return response.data


def login(data):
    """
        @data：用户数据请求体
        @role: 角色名称
    """

    url = env.SINGLE_SIGN_ON_USER + "/singin"
    # 查找用户信息
    dataload = {"number": data.number, "pwd": data.pwd, "client_code": data.client_code,
                "callback_url": data.callback_url}
    datas = json.dumps(dataload)
    # send data
    response = CommonReq(url=url, method="post", data=datas)
    if response.data["status"] == 200:
        return {"status": 200, "token": response.data["token"]}
    return {"status": response.data["status"], "token": "", "data": response.data}


# 使用验证码登录
def verify_code_login(data):

    url = env.SINGLE_SIGN_ON_USER + "/signin/verifycode"
    dataload = {"number": data.number, "verify_code": data.verify_code, "callback_url": data.callback_url}
    datas = json.dumps(dataload)
    # send data
    response = CommonReq(url=url, method="post", data=datas)
    if response.data["status"] == 200:
        return {"status": 200, "token": response.data["token"]}
    return response.data


# 注册admin
def create_user(db: Session, data):
    url = env.SINGLE_SIGN_ON_USER + "/signup"
    dataload = {"number": data.number, "pwd": data.pwd, "verify_code": data.verify_code}
    # send data
    response = CommonReq(url=url, method="post", data=json.dumps(dataload))

    if response.data["status"] == 200:
        userinfo = crud.create_admin(db, data)
        return {"status": 200, "data": userinfo}
    return response.data


# WareHouse
def list_warehouse(db, application_id, paginate, filter, sort):
    paginate = json.loads(paginate)
    filter = json.loads(filter)
    sort = json.loads(sort)

    data = crud.list_warehouse(db, application_id, paginate, filter, sort)
    return data


def get_warehouse(db, application_id, id):
    data = crud.get_warehouse(db, application_id, id)
    return data


def create_warehouse(db, data):
    return crud.create_warehouse(db, data)


def create_warehouse_out(db, data):
    return crud.create_warehouse_out(db, data)


def update_warehouse(db, application_id, id, data):
    data = crud.update_warehouse(db, application_id, id, data)
    return data


def del_warehouse(db, application_id, id):
    crud.del_warehouse(db, application_id, id)
    return {"msg": "删除仓库成功"}


# Freight
def list_freight(db, paginate, filter, sort):
    paginate = json.loads(paginate)
    filter = json.loads(filter)
    filter.append({"fieldname": "is_del", "option": "==", "value": 0})
    sort = json.loads(sort)

    data = crud.list_freight(db, paginate, filter, sort)
    return data


def get_freight(db, id):
    data = crud.get_freight(db, id)
    return data


def create_warehouse_in(db: Session, data):
    return crud.create_warehouse_in(db, data)


def update_freight(db: Session, id, data):
    data = crud.update_freight(db, id, data)
    return data


def del_freight(db: Session, warehouse_id, id):
    crud.del_freight(db, warehouse_id, id)
    return {"msg": "删除货物成功"}


# applicaitons related service
def create_application(db, app):
    return crud.create_application(db, app)


def list_applications(db, paginate, filter, sort):
    paginate = json.loads(paginate)
    filter = json.loads(filter)
    # 默认查询删除
    filter.append({"fieldname": "is_delete", "option": "==", "value": 0})
    sort = json.loads(sort)
    data = crud.list_applications(db, paginate, filter, sort)
    return data


def get_application(db, id):
    return crud.get_application(db, id)


def update_application(db, id, app):
    return crud.update_application(db, id, app)


def del_application(db, id):
    app_info = crud.del_application(db, id)
    if app_info is not None:
        if app_info.is_delete:
            return "success"
        else:
            return "failed"
    return app_info


def encry_local_prv_key(local_prv_key, charset="utf-8"):
    pk_str = json.dumps(local_prv_key).encode(charset)
    m = hashlib.sha1()
    m.update(pk_str)
    return m.hexdigest()


# 上传
def uploading(db, data):
    return crud.uploading(db, data)


# def list_uploading(db, paginate, filter, sort):
#     paginate = json.loads(paginate)
#     filter = json.loads(filter)
#     # 默认查询删除
#     sort = json.loads(sort)
#     return crud.list_uploading(db, paginate, filter, sort)