import logging
from typing import List
from fastapi import APIRouter, Depends
from loguru import logger

import schemas
import service
from database import SessionLocal
from sqlalchemy.orm import Session


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# Code
code_router = APIRouter()


@code_router.post('/code/verify', summary="发送验证码")
async def verify_code(*,
                      number: str):
    return service.send_code(number)


@code_router.post('/code/client', summary="客户端验证码生成")
async def client_code():
    return service.client_code()


@code_router.patch('/password/reset', summary="修改密码")
async def reset_password(*,
                         data: schemas.ChangePwd):
    return service.change_pwd(data)


@code_router.patch('/password/forget', summary="忘记密码")
async def forget_password(*,
                          data: schemas.SignUp):
    return service.verify_code_password(data)


# Admin
admin_router = APIRouter()


@admin_router.post('/login', response_model=None, summary="使用账号密码登录")
def login(data: schemas.LogInByPwd):
    return service.login(data)


@admin_router.post('/login/verifycode', response_model=None, summary="使用验证码登录")
def verify_code_login(data: schemas.LogInBycode):
    return service.verify_code_login(data)


@admin_router.post('/register', summary="使用账号+密码+验证码注册")
async def register(data: schemas.SignUp, db: Session = Depends(get_db)):
    return service.create_user(db, data)


# WareHouse
warehouse_router = APIRouter()


@warehouse_router.get("", response_model=schemas.WarehousePage, summary="查询该应用系统下所有仓库")
async def list_warehouse(*, db: Session = Depends(get_db), paginate='{"page":1,"limit":10}',
                         filter='[{"fieldname":"id","option":"is_not_null"}]',
                         sort='[{"field":"id","direction":"desc"}]'):
    return service.list_warehouse(db, paginate, filter, sort)


@warehouse_router.get("/{id}", response_model=schemas.RespWareHouse, summary="根据id查询仓库信息")
async def get_warehouse(*, id: int, db: Session = Depends(get_db)):
    """
    :return:
    """
    return service.get_warehouse(db, id)


@warehouse_router.post("", response_model=schemas.RespWareHouse, summary="添加仓库信息")
async def create_warehouse(*, data: schemas.RespWareHouseBase, db: Session = Depends(get_db)):
    """
    :param data:
    :param request:
    :param db:
    :return:
    """
    return service.create_warehouse(db, data)


@warehouse_router.put("/{id}", response_model=schemas.RespWareHouse, summary="修改仓库信息")
async def update_warehouse(*, id: int, data: schemas.ReqCreateWareHouse, db: Session = Depends(get_db)):
    return service.update_warehouse(db, id, data)


@warehouse_router.delete("/{id}", summary="删除仓库信息")
async def delete_warehouse(*, id: int, db: Session = Depends(get_db)):
    return service.del_warehouse(db, id)


# Freight
freight_router = APIRouter()


@freight_router.get('', response_model=schemas.FreightPage, summary="查询所有货物")
async def list_freight(*, db: Session = Depends(get_db), paginate='{"page":1,"limit":10}',
                       filter='[{"fieldname":"id","option":"is_not_null"}]',
                       sort='[{"field":"id","direction":"desc"}]'):
    return service.list_freight(db, paginate, filter, sort)


@freight_router.get('/{id}', response_model=schemas.RespFreight, summary="根据id查询仓库下货物信息")
async def get_freight(*, id: int, db: Session = Depends(get_db)):
    return service.get_freight(db, id)


@freight_router.put('/{id}', response_model=schemas.RespFreight, summary="修改仓库下货物信息")
async def update_freight(*, id: int, data: schemas.ReqUpdateFreight, db: Session = Depends(get_db)):
    return service.update_freight(db, id, data)


@freight_router.delete('/{warehouse_id}/{id}', summary="删除仓库下货物信息")
async def delete_freight(*, warehouse_id: int, id: int, db: Session = Depends(get_db)):
    return service.del_freight(db, warehouse_id, id)


@freight_router.post('/warehouse_in', response_model=schemas.RespFreight, summary="入库货物")
async def create_warehouse_in(*, data: schemas.ReqWareHouseIn, db: Session = Depends(get_db)):
    return service.create_warehouse_in(db, data)


@freight_router.post('/warehouse_out', response_model=schemas.RespFreight, summary="出库货物")
async def create_warehouse_out(*, data: schemas.ReqWareHouseOut, db: Session = Depends(get_db)):
    return service.create_warehouse_out(db, data)


# applications
application_router = APIRouter()


# 新增系统
@application_router.post("",
                         response_model=schemas.Application,
                         summary="新增应用系统")
def create_application(app: schemas.ApplicationBase):
    return service.create_application(app)


# 查询所有系统信息
# filter_mes  过滤参数,例如：查询某个时间段的订单信息,等具体需求出来再写
@application_router.get("",
                        response_model=schemas.ApplicationPage,
                        summary="列出所有应用系统信息")
def list_applications(paginate='{"page":1,"limit":10}',
                      filter='[{"fieldname":"id","option":"is_not_null"}]', sort='[{"field":"id","direction":"desc"}]'):
    return service.list_applications(paginate, filter, sort)


# 根据id查询系统信息
@application_router.get("/{id}",
                        response_model=schemas.Application,
                        summary="根据id查詢应用系統信息")
def get_application(id: int):
    return service.get_application(id)


# 修改系统信息
@application_router.put("/{id}",
                        response_model=schemas.Application,
                        summary="修改应用系统信息")
def update_application(id: int,
                       app: schemas.ApplicationBase):
    return service.update_application(id, app)


# 删除系统信息
@application_router.delete("/{id}", summary="删除一个系统信息")
def del_application(id: int):
    return service.del_application(id)


uploading_router = APIRouter()


# 上传文件

@uploading_router.get("", response_model=schemas.uploadingPage, summary="查询上传文件")
def list_uploading(*, Type: str, paginate='{"page":1,"limit":10}',
                   filter='[{"fieldname":"id","option":"is_not_null"}]',
                   sort='[{"field":"id","direction":"desc"}]',
                   db: Session = Depends(get_db)):
    return service.get_uploading(db, Type, paginate, filter, sort)


@uploading_router.post("", response_model=List[schemas.uploading], summary="上传文件")
def uploading(data: List[schemas.uploadingBase], db: Session = Depends(get_db)):
    logger.info(f'上传文件的数据: {data}')
    return service.uploading(db, data)
