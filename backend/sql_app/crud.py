#!/usr/bin/python3
import sys

sys.path.append('../')

from core import schemas
from sql_app.models import *
from typing import List, Any
from sqlalchemy.orm import Session


def db_create_type(db: Session, comm_type: schemas.Type):
    """
    增加数据类型
    :param db:
    :param comm_type:
    :return:
    """
    add_type = Type(type=comm_type.type)
    db.add(add_type)
    db.commit()
    db.refresh(add_type)
    return add_type


def db_get_type(db: Session):
    """
    获取所有类型
    :param db:
    :return:
    """
    fetch_type: List[Any] = db.query(Type.type_id, Type.type).all()
    type_list = []
    for one in fetch_type:
        type_list.append(one)
    all_type = dict()
    all_type["type_list"] = type_list
    return all_type


def db_modify_type(modify_type: schemas.CommType, db: Session):
    """
    修改商品类型
    :param db:
    :param modify_type
    :return:
    """
    db.query(Type).filter(Type.type_id == modify_type.type_id).update(
        {Type.type: modify_type.type})
    db.commit()
    local_type = db.query(Type).filter(
        Type.type_id == modify_type.type_id).first()
    return local_type


def db_del_type(type_id: int, db: Session):
    """
    删除商品
    :param db:
    :param type_id:
    :return:
    """
    all_type: List[Any] = db.query(Type.type_id, Type.type).all()
    all_type_id = [item[0] for item in all_type]
    if type_id in all_type_id:
        db.query(Type).filter(Type.type_id == type_id).delete()
        db.commit()
        return {"Message": "Success!"}
    else:
        return {"Message": "Type id is error."}


def db_create_spec(spec: schemas.Spec, db: Session):
    """
    添加规格
    :param spec:
    :param db:
    :return:
    """
    datatype_id = list()
    list_addspec = list()
    for item in spec:
        add_spec = Spec(
            spec_name=item.spec_name,
            data_type_id=item.data_type_id,
            spec_remark=item.spec_remark
        )
        db.add(add_spec)
        db.commit()
        db.refresh(add_spec)
        

def db_get_datatype(db: Session):
    """
    查询所有规格值数据类型
    :param db:
    :return:
    """
    fetch_datatype: List[Any] = db.query(Datatype.data_type_id,
                                         Datatype.data_type).all()
    return fetch_datatype

