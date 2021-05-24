#!/usr/bin/python3
import sys

sys.path.append('../')

from core import schemas
from sql_app import models
from typing import List, Any
from sqlalchemy.orm import Session


def db_create_type(db: Session, comm_type: schemas.Type):
    """
    增加数据类型
    :param db:
    :param comm_type:
    :return:
    """
    add_type = models.Type(type=comm_type.type)
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
    fetch_type: List[Any] = db.query(models.Type.type_id, models.Type.type).all()
    type_list = []
    for one in fetch_type:
        type_list.append(one)
    all_type = dict()
    all_type["type_list"] = type_list
    return all_type


def db_modify_type(db: Session):
    ...