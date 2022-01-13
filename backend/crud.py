import json
import random
import time
from sqlalchemy.sql.expression import or_
from database import engine
from sqlalchemy.orm import Session
from common import get_password_hash
from typing import Optional, Dict, List
import schemas
from sqlalchemy_filters import apply_filters, apply_pagination
from sqlalchemy_filters.sorting import apply_sort
from fastapi import HTTPException, status
import math
import uuid
import models
from datetime import datetime

# 生成数据表
models.Base.metadata.create_all(bind=engine)


def save(db):
    try:
        db.commit()
    except Exception as e:
        db.rollback()
        raise e


def data_package(data):
    if "value" in data:
        j_data = {'model': data["model"], 'field': data["field_name"], 'op': data["option"],
                  'value': data["value"]}
    else:
        j_data = {'model': data["model"], 'field': data["field_name"], 'op': data["option"]}
    return j_data


def get_by_username(db: Session, *, username: str) -> Optional[models.SysAdmin]:
    return db.query(models.SysAdmin).filter(models.SysAdmin.admin_name == username)


def filter_util(query, filter, sort, paginate):
    # 多处使用，要做封装
    paginate = json.loads(paginate)
    filter = json.loads(filter)
    sort = json.loads(sort)

    if 'or' in filter:
        filters = {"or": []}
        for f_data in filter["or"]:
            j_data = data_package(f_data)
            filters["or"].append(j_data)
    else:
        filters = []
        for f_data in filter:
            j_data = data_package(f_data)
            filters.append(j_data)
    query = apply_filters(query, filters)
    sorts = []

    for s_data in sort:
        js_data = {"model": s_data["model"], "field": s_data['field_name'], "direction": s_data['direction']}
        sorts.append(js_data)
    query = apply_sort(query, sorts)

    query, pagination = apply_pagination(
        query, paginate['page'], paginate['limit']
    )
    return query, pagination


# 查询admin
def load_admin(db: Session, data) -> Optional[models.SysAdmin]:
    user = db.query(models.SysAdmin).filter(models.SysAdmin.phone == data.number)
    if not user:
        raise HTTPException(status_code=404, detail=f"用户不存在")
    return user


# 创建admin
def create_admin(db: Session, data):
    db_obj = models.SysAdmin(
        phone=data.number,
        password=get_password_hash(data.pwd)
    )
    db.add(db_obj)
    save(db)
    db.refresh(db_obj)
    return db_obj


# WareHouse
def list_warehouse(db: Session, appcation_id, paginate, filter, sort):
    result = db.query(models.Application).filter(models.Application.id == appcation_id,
                                                 models.Application.is_delete == False).first()
    if not result:
        raise HTTPException(status.HTTP_404_NOT_FOUND,
                            f"The appcation_id:{appcation_id} is not found")

    query = db.query(models.WareHouse).filter(models.WareHouse.appcation_id == appcation_id)
    filters = []
    for f_data in filter:
        if "value" in f_data:
            j_data = {'field': f_data["fieldname"], 'op': f_data["option"], 'value': f_data["value"]}
        else:
            j_data = {'field': f_data["fieldname"], 'op': f_data["option"]}
        filters.append(j_data)

    filtered_query = apply_filters(query, filters)
    count = len(filtered_query.all())

    sorts = []
    for s_data in sort:
        js_data = {"field": s_data['field'], "direction": s_data['direction']}
        sorts.append(js_data)
    data = apply_sort(filtered_query, sorts)

    paginated_query, pagination = apply_pagination(
        data, paginate['page'], paginate['limit']
    )

    result = paginated_query.all()
    page_count = int(math.ceil(count / paginate['limit']))

    return {"data": result, "count": count, "page": paginate['page'], "page_count": page_count,
            "size": paginate['limit']}


def get_warehouse(db: Session, application_id, id):
    application_data = db.query(models.Application).filter(models.Application.id == application_id,
                                                           models.Application.is_delete == False).first()
    result = db.query(models.WareHouse).filter(models.WareHouse.id == id,
                                               models.WareHouse.appcation_id == application_id,
                                               models.WareHouse.is_del == False).first()
    if not application_data:
        raise HTTPException(status.HTTP_404_NOT_FOUND,
                            f"The application_id:{application_id} is not found")
    if not result:
        raise HTTPException(status.HTTP_404_NOT_FOUND,
                            f"The warehouse_id:{id} is not found")

    return result


def create_warehouse(db: Session, data: schemas.RespWareHouseBase):
    application = db.query(models.Application).filter(models.Application.id == data.appcation_id,
                                                      models.Application.is_delete == False).first()
    if not application:
        raise HTTPException(status.HTTP_404_NOT_FOUND,
                            f"The application_id:{data.appcation_id} is not found")
    data = models.WareHouse(
        warehouse_name=data.warehouse_name,
        address=data.address,
        appcation_id=data.appcation_id
    )
    db.add(data)
    save(db)
    db.refresh(data)
    return data


def update_warehouse(db: Session, id, application_id, data: schemas.ReqCreateWareHouse):
    application = db.query(models.Application).filter(models.Application.id == application_id,
                                                      models.Application.is_delete == False).first()
    query = db.query(models.WareHouse).filter(models.WareHouse.id == id,
                                              models.WareHouse.appcation_id == application_id,
                                              models.WareHouse.is_del == False).first()
    if not application:
        raise HTTPException(status.HTTP_404_NOT_FOUND, f"The application_id:{application_id} is not found")

    if not query:
        raise HTTPException(status.HTTP_404_NOT_FOUND, f"The WareHouse_id:{id} is not found")

    if data.warehouse_name:
        query.warehouse_name = data.warehouse_name
    if data.address:
        query.address = data.address

    db.add(query)
    save(db)
    db.refresh(query)
    return query


def del_warehouse(db: Session, application_id, id):
    m = db.query(models.WareHouse).filter(models.WareHouse.id == id,
                                          models.WareHouse.appcation_id == application_id,
                                          models.
                                          WareHouse.is_del == False).first()
    application = db.query(models.Application).filter(models.Application.id == application_id,
                                                      models.Application.is_delete == False).first()
    if not application:
        raise HTTPException(status.HTTP_404_NOT_FOUND, f"The application_id:{application_id} is not found")

    if not m:
        raise HTTPException(status.HTTP_404_NOT_FOUND,
                            f"The WareHouse_id:{id} is not found")
    m.is_del = True
    m.del_time = datetime.now()
    db.add(m)
    save(db)


# Freight
def list_freight(db: Session, paginate, filter, sort):
    query = db.query(models.Freight)
    filters = []
    for f_data in filter:
        if "value" in f_data:
            j_data = {'field': f_data["fieldname"], 'op': f_data["option"], 'value': f_data["value"]}
        else:
            j_data = {'field': f_data["fieldname"], 'op': f_data["option"]}
        filters.append(j_data)

    filtered_query = apply_filters(query, filters)
    count = len(filtered_query.all())

    sorts = []
    for s_data in sort:
        js_data = {"field": s_data['field'], "direction": s_data['direction']}
        sorts.append(js_data)
    data = apply_sort(filtered_query, sorts)

    paginated_query, pagination = apply_pagination(
        data, paginate['page'], paginate['limit']
    )

    result = paginated_query.all()
    page_count = int(math.ceil(count / paginate['limit']))

    return {"data": result, "count": count, "page": paginate['page'], "page_count": page_count,
            "size": paginate['limit']}


def get_freight(db: Session, id) -> models.Freight:
    data = db.query(models.Freight).filter(models.Freight.id == id, models.Freight.is_del == False)
    if not data:
        raise HTTPException(status.HTTP_404_NOT_FOUND, f"The freight_id:{id} is not found")

    return data


def create_warehouse_in(db: Session, data: schemas.ReqWareHouseIn):
    appcation = db.query(models.Application).filter(models.Application.id == data.appcation_id,
                                                    models.Application.is_delete == False).first()
    if not appcation:
        raise HTTPException(status.HTTP_404_NOT_FOUND, f"The application_id: {data.appcation_id} is not found")
    warehouse = db.query(models.WareHouse).filter(models.WareHouse.id == data.warehouse_id,
                                                  models.WareHouse.is_del == False).first()

    if not warehouse:
        raise HTTPException(status.HTTP_404_NOT_FOUND, f"The warehouse_id: {data.warehouse_id} is not found")

    freight_query = db.query(models.Freight).filter(models.Freight.freight_name == data.freight_name,
                                                    models.Freight.warehouse_id == data.warehouse_id,
                                                    models.Freight.warehouse_id == data.appcation_id,
                                                    models.Freight.is_del == False).first()

    propertys = []
    if len(data.property):
        for item, index in data.property:
            if item.type == "image":
                m = models.Image
            elif item.type == "video":
                m = models.Video
            elif item.type == 'audio':
                m = models.Audio
            elif item.type == 'text':
                m = models.Text
            elif item.type == 'int':
                m = models.Int
            elif item.type == 'float':
                m = models.Float
            else:
                raise HTTPException(status.HTTP_404_NOT_FOUND,
                                    f"The property[{index}].type :{item.type} is error /(image,video,audio,text,int,float)")

            item_data = db.query(m).filter(m.uuid == item.uuid).first()
            if not item_data:
                raise HTTPException(status.HTTP_404_NOT_FOUND, f"The property[{index}].uuid :{item.type} is not found")
            item_data.append({"type": item.type})
            propertys.append(item_data)

    warehouse_in_data = models.WareHouseIn(
        warehouseIn_time=data.warehouseIn_time,
        amount=data.purchase_quantity,
        warehouse_id=data.warehouse_id
    )
    db.add(warehouse_in_data)
    save(db)
    db.refresh(warehouse_in_data)

    # 数据库没有商品
    freight_data = models.Freight(
        freight_name=data.freight_name,
        freight_quantity=data.purchase_quantity,
        manufacture_factory=data.manufacture_factory,
        manufacture_time=data.manufacture_time,
        freight_price=data.freight_price,
        warehouse_id=data.warehouse_id,
        warehouse_in_id=warehouse_in_data.id,
        property=json.dumps(propertys)
    )

    if freight_query:
        # 数据库有商品
        freight_data = models.Freight(
            freight_quantity=data.purchase_quantity + freight_query.freight_quantity,
            warehouse_in_id=warehouse_in_data.id,
            property=json.dumps(propertys)
        )

    db.add(freight_data)
    save(db)
    db.refresh(freight_data, warehouse_in_data)
    return freight_data


def create_warehouse_out(db: Session, data: schemas.ReqWareHouseOut):
    appcation = db.query(models.Application).filter(models.Application.id == data.appcation_id,
                                                    models.Application.is_delete == False).first()
    if not appcation:
        raise HTTPException(status.HTTP_404_NOT_FOUND, f"The appcation_id:{data.appcation_id} is not found")
    warehouse_query = db.query(models.WareHouse).filter(models.WareHouse.id == data.warehouse_id,
                                                        models.WareHouse.is_del == False)

    freight_query = db.query(models.Freight).filter(models.Freight.id == data.freight_id,
                                                    models.Freight.is_del == False)
    if not freight_query:
        raise HTTPException(status.HTTP_404_NOT_FOUND,
                            f"The freight_id:{data.freight_id} is not found")

    if not warehouse_query:
        raise HTTPException(status.HTTP_404_NOT_FOUND,
                            f"The warehouse_id:{data.warehouse_id} is not found")

    if data.shipment > freight_query.freight_quantity:
        raise HTTPException(status.HTTP_422_UNPROCESSABLE_ENTITY, "货物的总数量小于出货量")

    warehouseOut_data = models.WareHouseOut(
        warehouseOut_time=data.warehouseOut_time,
        amount=data.shipment,
        freight_id=data.freight_id,
        warehouse_id=data.warehouse_id,
        appcation_id=data.appcation_id
    )
    db.add(warehouseOut_data)
    save(db)
    db.refresh(warehouse_query)

    freight_data = models.Freight(
        freight_quantity=freight_query.freight_query - data.shipment,
        warehouse_out_id=warehouseOut_data.id
    )

    db.add(freight_data, warehouseOut_data)
    save(db)
    db.refresh(freight_data, warehouseOut_data)
    return freight_query


def update_freight(db: Session, id, data: schemas.ReqCreateFreight):
    warehouse_query = db.query(models.WareHouse).filter(models.WareHouse.id == data.warehouse_id,
                                                        models.WareHouse.is_del == False)
    if not warehouse_query:
        raise HTTPException(status.HTTP_404_NOT_FOUND,
                            f"The warehouse_id:{data.warehouse_id} is not found")
    query = db.query(models.Freight).filter(models.Freight.id == id,
                                            models.Freight.warehouse_id == data.warehouse_id,
                                            models.Freight.is_del == False)

    if not query:
        raise HTTPException(status.HTTP_404_NOT_FOUND,
                            f"The freight_id:{id} is not found")
    if data.freight_name:
        query.freight_name = data.freight_name
    if data.freight_amount:
        query.freight_quantity = data.freight_amount
    if data.manufacture_factory:
        query.manufacture_factory = data.manufacture_factory
    if data.manufacture_time:
        query.manufacture_time = data.manufacture_time
    if data.freight_price:
        query.freight_price = data.freight_price
    db.add(query)
    save(db)
    db.refresh(query)
    return query


def del_freight(db: Session, warehouse_id, id):
    warehouse = db.query(models.WareHouse).filter(models.WareHouse.id == warehouse_id,
                                                  models.WareHouse.is_del == False).first()
    if not warehouse:
        raise HTTPException(status.HTTP_404_NOT_FOUND,
                            f"The warehouse_id:{warehouse_id} is not found")
    m = db.query(models.Freight).filter(models.Freight.id == id,
                                        models.
                                        Freight.is_del == False)
    if not m:
        raise HTTPException(status.HTTP_404_NOT_FOUND,
                            f"The freight_id:{id} is not found")
    m.is_del = True
    m.del_time = datetime.now()
    db.add(m)
    save(db)


# application
def create_application(db, app):
    application = models.Application(name=app.name,
                                     key=app.key,
                                     email=app.email,
                                     admin_name=app.admin_name,
                                     admin_phone=app.admin_phone,
                                     ip=app.ip,
                                     remark=app.remark)
    db.add(application)
    save(db)
    db.refresh(application)
    return application


def list_applications(db, paginate, filter, sort):
    query = db.query(models.Application)
    filters = []
    for f_data in filter:
        if "value" in f_data:
            j_data = {'field': f_data["fieldname"], 'op': f_data["option"], 'value': f_data["value"]}
        else:
            j_data = {'field': f_data["fieldname"], 'op': f_data["option"]}
        filters.append(j_data)
    filtered_query = apply_filters(query, filters)
    count = len(filtered_query.all())

    sorts = []
    for s_data in sort:
        js_data = {"field": s_data['field'], "direction": s_data['direction']}
        sorts.append(js_data)
    data = apply_sort(filtered_query, sorts)

    paginated_query, pagination = apply_pagination(
        data, paginate['page'], paginate['limit']
    )

    result = paginated_query.all()
    page_count = int(math.ceil(count / paginate['limit']))

    return {"data": result, "count": count, "page": paginate['page'], "page_count": page_count,
            "size": paginate['limit']}


def get_application(db, id):
    data = db.query(models.Application).filter(
        models.Application.id == id,
        models.Application.is_delete == False).first()
    if not data:
        raise HTTPException(status.HTTP_404_NOT_FOUND,
                            f"The appcation_id: {id} is not found")

    return data


def update_application(db, id, app):
    app_info = db.query(models.Application).filter(
        models.Application.id == id,
        models.Application.is_delete == False).first()
    if not app_info:
        raise HTTPException(status.HTTP_404_NOT_FOUND,
                            f"The appcation_id: {id} is not found")

    if app.name is not None: app_info.name = app.name
    if app.key is not None: app_info.key = app.key
    if app.email is not None: app_info.email = app.email
    if app.admin_name is not None: app_info.admin_name = app.admin_name
    if app.admin_phone is not None: app_info.admin_phone = app.admin_phone
    if app.ip is not None: app_info.ip = app.ip
    if app.remark is not None: app_info.remark = app.remark

    db.add(app_info)
    save(db)
    db.refresh(app_info)
    return app_info


def del_application(db, id):
    app_info = db.query(models.Application).filter(
        models.Application.id == id,
        models.Application.is_delete == False).first()
    if not app_info:
        return None
    app_info.is_delete = True
    db.add(app_info)
    save(db)
    db.refresh(app_info)
    return app_info


# 上传
def uploading(db, data):
    if data.type == "image":
        upload = db.query(models.Image).filter(models.Image.name == data.name).first()
        if upload:
            raise HTTPException(status.HTTP_404_NOT_FOUND, f"上传文件名称{data.name}以存在")
        query = models.Image(
            name=data.name,
            value=data.value,
            uuid=str(uuid.uuid1())
        )
    elif data.type == "video":
        upload = db.query(models.Video).filter(models.Video.name == data.name).first()
        if upload:
            raise HTTPException(status.HTTP_404_NOT_FOUND, f"上传文件名称{data.name}以存在")
        query = models.Video(
            name=data.name,
            value=data.value,
            uuid=str(uuid.uuid1())
        )
    elif data.type == 'audio':
        upload = db.query(models.Audio).filter(models.Audio.name == data.name).first()
        if upload:
            raise HTTPException(status.HTTP_404_NOT_FOUND, f"上传文件名称{data.name}以存在")
        query = models.Audio(
            name=data.name,
            value=data.value,
            uuid=str(uuid.uuid1())
        )
    elif data.type == 'text':
        upload = db.query(models.Texts).filter(models.Texts.name == data.name).first()
        if upload:
            raise HTTPException(status.HTTP_404_NOT_FOUND, f"上传文件名称{data.name}以存在")
        query = models.Texts(
            name=data.name,
            value=data.value,
            uuid=str(uuid.uuid1())
        )
    elif data.type == 'int':
        upload = db.query(models.Int).filter(models.Int.name == data.name).first()
        if upload:
            raise HTTPException(status.HTTP_404_NOT_FOUND, f"上传文件名称{data.name}以存在")
        query = models.Int(
            name=data.name,
            value=data.value,
            uuid=str(uuid.uuid1())
        )
    elif data.type == 'float':
        upload = db.query(models.Float).filter(models.Float.name == data.name).first()
        if upload:
            raise HTTPException(status.HTTP_404_NOT_FOUND, f"上传文件名称{data.name}以存在")
        query = models.Float(
            name=data.name,
            value=data.value,
            uuid=str(uuid.uuid1())
        )
    else:
        raise HTTPException(status.HTTP_404_NOT_FOUND,
                            f"The type :{data.type} is error /(image,video,audio,text,int,float)")
    db.add(query)
    save(db)
    db.refresh(query)
    return {"msg": '上传成功', "data": query}


# def list_uploading(db, paginate, filter, sort):
#     query = db.query(models.File)
#     filters = []
#     for f_data in filter:
#         if "value" in f_data:
#             j_data = {'field': f_data["fieldname"], 'op': f_data["option"], 'value': f_data["value"]}
#         else:
#             j_data = {'field': f_data["fieldname"], 'op': f_data["option"]}
#         filters.append(j_data)
#     filtered_query = apply_filters(query, filters)
#     count = len(filtered_query.all())
#
#     sorts = []
#     for s_data in sort:
#         js_data = {"field": s_data['field'], "direction": s_data['direction']}
#         sorts.append(js_data)
#     data = apply_sort(filtered_query, sorts)
#
#     paginated_query, pagination = apply_pagination(
#         data, paginate['page'], paginate['limit']
#     )
#
#     result = paginated_query.all()
#     page_count = int(math.ceil(count / paginate['limit']))
#
#     return {"data": result, "count": count, "page": paginate['page'], "page_count": page_count,
#             "size": paginate['limit']}
