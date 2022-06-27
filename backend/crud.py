import json
import logging
import time

from loguru import logger
import base64
from util.base import strToBase64, base64ToStr
import env
from util.auth import CommonReq
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
def list_warehouse(db: Session, paginate, filter, sort):
    query = db.query(models.WareHouse)
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


def get_warehouse(db: Session, id):
    result = db.query(models.WareHouse).filter(models.WareHouse.id == id,
                                               models.WareHouse.is_del == False).first()
    if not result:
        raise HTTPException(status.HTTP_404_NOT_FOUND,
                            f"The warehouse_id:{id} is not found")

    return result


def create_warehouse(db: Session, data: schemas.RespWareHouseBase):
    appcation = CommonReq(url=f"{env.APPLICATIONS_BASE}{data.appcation_id}", method="get").data
    if not appcation:
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


def update_warehouse(db: Session, id, data: schemas.ReqCreateWareHouse):
    query = db.query(models.WareHouse).filter(models.WareHouse.id == id,
                                              models.WareHouse.is_del == False).first()

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


def del_warehouse(db: Session, id):
    m = db.query(models.WareHouse).filter(models.WareHouse.id == id,
                                          models.
                                          WareHouse.is_del == False).first()

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

    res_data = []
    for res in result:
        arr_prop = []
        props = json.loads(res.property)
        for items in props:
            m = prop_models(items)
            prop_query = db.query(m).filter(m.uuid == items['uuid']).first()
            item_dict = prop_query.to_dict()
            del item_dict["created_at"]
            del item_dict["updated_at"]
            item_dict['value'] = env.IMAGES_IP + item_dict['value']
            arr_prop.append(item_dict)
        arrs = res
        arrs.property = arr_prop
        res_data.append(arrs)

    return {"data": res_data, "count": count, "page": paginate['page'], "page_count": page_count,
            "size": paginate['limit']}


def get_freight(db: Session, id) -> models.Freight:
    data = db.query(models.Freight).filter(models.Freight.id == id, models.Freight.is_del == False).first()
    if not data:
        raise HTTPException(status.HTTP_404_NOT_FOUND, f"The freight_id:{id} is not found")
    arr_prop = []
    props = json.loads(data.property)
    for items in props:
        m = prop_models(items)
        prop_query = db.query(m).filter(m.uuid == items['uuid']).first()
        item_dict = prop_query.to_dict()
        del item_dict["created_at"]
        del item_dict["updated_at"]
        arr_prop.append(item_dict)
    data.property = arr_prop
    return data


def create_warehouse_in(db: Session, data):
    appcation = CommonReq(url=f"{env.APPLICATIONS_BASE}{data.appcation_id}", method="get").data
    if not appcation:
        raise HTTPException(status.HTTP_404_NOT_FOUND, f"The application_id: {data.appcation_id} is not found")
    warehouse = db.query(models.WareHouse).filter(models.WareHouse.id == data.warehouse_id,
                                                  models.WareHouse.is_del == False).first()

    if not warehouse:
        raise HTTPException(status.HTTP_404_NOT_FOUND, f"The warehouse_id: {data.warehouse_id} is not found")

    freight_query = db.query(models.Freight).filter(models.Freight.freight_name == data.freight_name,
                                                    models.Freight.warehouse_id == data.warehouse_id,
                                                    models.Freight.appcation_id == data.appcation_id,
                                                    models.Freight.is_del == False).first()

    propertys = []
    if data.property:
        if len(data.property):
            for f_index, item in enumerate(data.property):
                m = prop_models({'type' : item.type})
                if not m:
                    raise HTTPException(status.HTTP_404_NOT_FOUND,
                                        f"属性名为{item.name}, type :{item.type} is error /(image,video,audio,text,int,float)")

                item_data = db.query(m).filter(m.uuid == item.uuid).first()
                if not item_data:
                    raise HTTPException(status.HTTP_404_NOT_FOUND,
                                        f"属性名为{item.name}, uuid :{item.uuid} is not found")

                if not (item_data.name == item.name):
                    raise HTTPException(status.HTTP_404_NOT_FOUND,
                                        f"属性名为{item.name}, name :{item.name} is not found")
                propertys.append({'uuid': item.uuid, 'type': item.type})

    warehouse_in_data = models.WareHouseIn(
        warehouseIn_time=data.warehouseIn_time,
        amount=data.purchase_quantity,
        warehouse_id=data.warehouse_id,
        appcation_id=data.appcation_id,
        name=data.freight_name
    )
    db.add(warehouse_in_data)
    save(db)
    arr_prop = []
    if freight_query:
        # 数据库有商品
        freight_query.freight_quantity = data.purchase_quantity + freight_query.freight_quantity
        freight_query.warehouse_in_id = warehouse_in_data.id
        props = json.loads(freight_query.property)

        if len(props):  # 货物中自定义属性不为空
            if len(propertys):  # 接受数据中有自定义属性
                for index, item in enumerate(propertys):
                    for item1 in json.loads(freight_query.property):
                        if item['uuid'] == item1['uuid']:
                            raise HTTPException(status.HTTP_404_NOT_FOUND, f'uuid:{item["uuid"]}, 属性已存在')
                    props.append(item)
                freight_query.property = json.dumps(props)
        logger.info(freight_query)
        db.add(freight_query)
        save(db)
        for items in props:
            model = prop_models(items)
            prop_query = db.query(model).filter(model.uuid == items['uuid']).first()
            item_dict = prop_query.to_dict()
            del item_dict["created_at"]
            del item_dict["updated_at"]
            arr_prop.append(item_dict)
        freight_query.property = arr_prop
        return freight_query
    else:
        # 数据库没有商品
        freight_data = models.Freight(
            freight_name=data.freight_name,
            freight_quantity=data.purchase_quantity,
            manufacture_factory=data.manufacture_factory,
            manufacture_time=data.manufacture_time,
            freight_price=data.freight_price,
            warehouse_id=data.warehouse_id,
            warehouse_in_id=warehouse_in_data.id,
            appcation_id=data.appcation_id,
            property=json.dumps(propertys)
        )
        db.add(freight_data)
        save(db)
        for items in propertys:
            model = prop_models(items)
            prop_query = db.query(model).filter(model.uuid == items['uuid']).first()
            item_dict = prop_query.to_dict()
            del item_dict["created_at"]
            del item_dict["updated_at"]
            arr_prop.append(item_dict)
        freight_data.property = arr_prop
        return freight_data


def create_warehouse_out(db: Session, data: schemas.ReqWareHouseOut):
    appcation = CommonReq(url=f"{env.APPLICATIONS_BASE}{data.appcation_id}", method="get").data
    if not appcation:
        raise HTTPException(status.HTTP_404_NOT_FOUND, f"The appcation_id:{data.appcation_id} is not found")
    warehouse_query = db.query(models.WareHouse).filter(models.WareHouse.id == data.warehouse_id,
                                                        models.WareHouse.is_del == False).first()
    if not warehouse_query:
        raise HTTPException(status.HTTP_404_NOT_FOUND,
                            f"The warehouse_id:{data.warehouse_id} is not found")

    freight_query = db.query(models.Freight).filter(models.Freight.id == data.freight_id,
                                                    models.Freight.warehouse_id == data.warehouse_id,
                                                    models.Freight.appcation_id == data.appcation_id,
                                                    models.Freight.is_del == False).first()
    if not freight_query:
        raise HTTPException(status.HTTP_404_NOT_FOUND,
                            f"The freight_id:{data.freight_id} is not found")
    if int(data.shipment) > int(freight_query.freight_quantity):
        raise HTTPException(status.HTTP_422_UNPROCESSABLE_ENTITY, "货物的总数量小于出货量")

    props = json.loads(freight_query.property)

    warehouseOut_data = models.WareHouseOut(
        warehouseOut_time=data.warehouseOut_time,
        amount=data.shipment,
        freight_id=data.freight_id,
        warehouse_id=data.warehouse_id,
        appcation_id=data.appcation_id,
        name=data.freight_name
    )
    db.add(warehouseOut_data)
    save(db)

    freight_query.freight_quantity = int(freight_query.freight_quantity) - int(data.shipment)
    freight_query.warehouse_out_id = warehouseOut_data.id
    db.add(freight_query)
    save(db)
    arr_prop = []
    for items in props:
        m = prop_models(items)
        prop_query = db.query(m).filter(m.uuid == items['uuid']).first()
        item_dict = prop_query.to_dict()
        del item_dict["created_at"]
        del item_dict["updated_at"]
        arr_prop.append(item_dict)
    freight_query.property = arr_prop
    return freight_query


def update_freight(db: Session, id, data):
    warehouse_query = db.query(models.WareHouse).filter(models.WareHouse.id == data.warehouse_id,
                                                        models.WareHouse.is_del == False).first()
    if not warehouse_query:
        raise HTTPException(status.HTTP_404_NOT_FOUND,
                            f"The warehouse_id:{data.warehouse_id} is not found")
    query = db.query(models.Freight).filter(models.Freight.id == id,
                                            models.Freight.warehouse_id == data.warehouse_id,
                                            models.Freight.is_del == False).first()

    array_prop = []
    if not query:
        raise HTTPException(status.HTTP_404_NOT_FOUND,
                            f"The freight_id:{id} is not found")
    if data.freight_name:
        query.freight_name = data.freight_name
    if data.purchase_quantity:
        query.freight_quantity = data.purchase_quantity
    if data.manufacture_factory:
        query.manufacture_factory = data.manufacture_factory
    if data.manufacture_time:
        query.manufacture_time = data.manufacture_time
    if data.freight_price:
        query.freight_price = data.freight_price
    if len(data.property):
        arr_prop = []
        for item in data.property:
            arr_prop.append({"type": item.type, "uuid": item.uuid})
            m = prop_models(item)
            prop_query = db.query(m).filter(m.uuid == item['uuid']).first()
            item_dict = prop_query.to_dict()
            del item_dict["created_at"]
            del item_dict["updated_at"]
            array_prop.append(item_dict)

        query.property = json.dumps(arr_prop)
    else:
        props = json.loads(query.property)
        for items in props:
            m = prop_models(items)
            prop_query = db.query(m).filter(m.uuid == items['uuid']).first()
            item_dict = prop_query.to_dict()
            del item_dict["created_at"]
            del item_dict["updated_at"]
            array_prop.append(item_dict)
    db.add(query)
    save(db)
    db.refresh(query)
    query.property = array_prop
    return query


def del_freight(db: Session, warehouse_id, id):
    warehouse = db.query(models.WareHouse).filter(models.WareHouse.id == warehouse_id,
                                                  models.WareHouse.is_del == False).first()
    if not warehouse:
        raise HTTPException(status.HTTP_404_NOT_FOUND,
                            f"The warehouse_id:{warehouse_id} is not found")
    m = db.query(models.Freight).filter(models.Freight.id == id,
                                        models.Freight.warehouse_id == warehouse_id,
                                        models.Freight.is_del == False).first()
    if not m:
        raise HTTPException(status.HTTP_404_NOT_FOUND,
                            f"The freight_id:{id} is not found")
    m.is_del = True
    m.del_time = datetime.now()
    db.add(m)
    save(db)


# 上传
def uploading(db, data: List[schemas.uploadingBase]):
    query = None
    query_data = []
    for item in data:
        Type = item.type.lower()
        model = prop_models({'type': Type})
        if not model:
            raise HTTPException(status.HTTP_404_NOT_FOUND,
                                f"The type :{Type} is error /(image,video,audio,text,int,float)")
        prop = db.query(model).filter(model.name == item.name).first()
        if prop:
            raise HTTPException(status.HTTP_404_NOT_FOUND, f'属性名：{item.name} 已存在')
        if Type == "image" or Type == "video" or Type == "audio":
            query = file_operate(item, Type)
            query_data.append({"name": query.name, "uuid": query.uuid, "value": env.IMAGES_IP + query.value, "type": Type})
        else:
            query = model(
                name=item.name,
                value=item.value,
                uuid=str(uuid.uuid1()),
                type=Type
            )
            query_data.append({"name": query.name, "uuid": query.uuid, "value": item.value, "type": Type})
        db.add(query)
        save(db)
        db.refresh(query)
    logger.info(f"上传图片成功 :{query_data}")
    return query_data


def get_uploading(db: Session, Type, paginate, filter, sort):
    Type = Type.lower()
    model = prop_models({'type': Type})
    if not model:
        raise HTTPException(status.HTTP_404_NOT_FOUND, 'Type类型错误, 只有(int、 float、 text、image、 video、 audio)类型')
    query = db.query(model)

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
    logger.info(f'result: {result}')
    res = []
    for item in result:
        item_dict = item.to_dict()
        del item_dict['id']
        del item_dict['updated_at'],
        del item_dict['created_at']
        item_dict['value'] = env.IMAGES_IP + item.value
        res.append(item_dict)
    logger.info(f'res: {res}')
    page_count = int(math.ceil(count / paginate['limit']))
    return {"count": count, "page": paginate['page'], "page_count": page_count,
            "size": paginate['limit'], "data": res}


def cutOut_CH(str: str, query1, query2):
    return str[str.find(query1) + 1:str.find(query2)]


def file_operate(item, Type):
    data = item.value.split(',')
    suffix = cutOut_CH(data[0], '/', ';')
    name = f'mediafile/{Type}/{str(round(time.time() * 1000))}.{suffix}'
    image_data = base64.b64decode(data[1])
    with open(name, 'wb') as f:
        f.write(image_data)

    query = prop_models({"type": Type})
    return query(
                name=item.name,
                value=f'{name}',
                uuid=str(uuid.uuid1()),
                type=Type)


def prop_models(model):
    m = None
    if model['type'] == "image":
        m = models.Image
    elif model['type'] == "video":
        m = models.Video
    elif model['type'] == 'audio':
        m = models.Audio
    elif model['type'] == 'text':
        m = models.Texts
    elif model['type'] == 'int':
        m = models.Int
    elif model['type'] == 'float':
        m = models.Float
    return m

