import logging

from database import SessionLocal
from util.utli import *
import env
import hashlib
from fastapi import HTTPException, status
import os
from util.auth import CommonReq
from util.Redis import Redis
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
    p = os.path.abspath("./mediafile/")
    if not os.path.exists(p):
        os.makedirs(p)
    return p


# Admin
def send_code(number):
    urlbase = env.SINGLE_SIGN_ON_CODE + "/verify_code"
    url = urlbase + f"?number={number}"
    logging.info(f'发送验证码的路径：{url}')
    # send data
    response = CommonReq(url=url, method="post")
    return response.data


def client_code():
    url = env.SINGLE_SIGN_ON_CODE + "/client_code"
    logging.info(f'发送客户验证码的路径：{url}')
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
def list_warehouse(db, paginate, filter, sort):
    paginate = json.loads(paginate)
    filter = json.loads(filter)
    sort = json.loads(sort)
    filter.append({"fieldname": "is_del", "option": "==", "value": 0})
    data = crud.list_warehouse(db, paginate, filter, sort)
    return data


def get_warehouse(db, id):
    data = crud.get_warehouse(db, id)
    return data


def create_warehouse(db, data):
    return crud.create_warehouse(db, data)


def create_warehouse_out(db, data):
    return crud.create_warehouse_out(db, data)


def update_warehouse(db, id, data):
    data = crud.update_warehouse(db, id, data)
    return data


def del_warehouse(db, id):
    crud.del_warehouse(db, id)
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
def create_application(app: schemas.ApplicationBase):
    logger.info(f'url: {env.APPLICATIONS_BASE}')
    data = {
        "name": app.name,
        "key": app.key,
        "email": app.email,
        "admin_name": app.admin_name,
        "admin_phone": app.admin_phone,
        "ip": app.ip,
        "remark": app.remark,
        "app_id": app.app_id
    }

    request = CommonReq(url=env.APPLICATIONS_BASE, method="post", data=json.dumps(data))
    return request.data


def list_applications(paginate, filter, sort):
    data = {"paginate": paginate, "filter": filter, "sort": sort}
    request = CommonReq(url=env.APPLICATIONS_BASE, method="get", data=data)
    request_data = request.data
    return {"page": request_data["page"], "size": request_data["page_size"], "count": request_data["data_count"], "page_count": request_data["page_count"], "data": request_data["data"]}


def get_application(id):
    url = env.APPLICATIONS_BASE + f"{id}"
    request = CommonReq(url=url, method="get")
    if not request.data:
        raise HTTPException(status.HTTP_404_NOT_FOUND, f"The id:{id} is not found")
    return request.data


def update_application(id, app: schemas.ApplicationBase):
    url = env.APPLICATIONS_BASE + f"{id}"
    data = {
        "name": app.name,
        "key": app.key,
        "email": app.email,
        "admin_name": app.admin_name,
        "admin_phone": app.admin_phone,
        "ip": app.ip,
        "app_id": app.app_id,
        "remark": app.remark
    }
    request = CommonReq(url=url, method="put", data=json.dumps(data))
    if not request.data:
        raise HTTPException(status.HTTP_404_NOT_FOUND, f"The id: {id} is not found")
    return request.data


def del_application(id):
    url = env.APPLICATIONS_BASE + f"{id}"
    request = CommonReq(url=url, method="delete")
    return request.data


def encry_local_prv_key(local_prv_key, charset="utf-8"):
    pk_str = json.dumps(local_prv_key).encode(charset)
    m = hashlib.sha1()
    m.update(pk_str)
    return m.hexdigest()


# 上传
def uploading(db, data):
    return crud.uploading(db, data)


def get_uploading(db, Type, paginate, filter, sort):
    paginate = json.loads(paginate)
    filter = json.loads(filter)
    # filter.append({"fieldname": "is_del", "option": "==", "value": 0})
    sort = json.loads(sort)

    data = crud.get_uploading(db, Type, paginate, filter, sort)
    return data

