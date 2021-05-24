#!/usr/bin/python3
import sys

sys.path.append('../')

from typing import List
from core import schemas
from sql_app import crud
from sqlalchemy.orm import Session
from fastapi import Body, Depends, FastAPI
from sql_app.database import session


app = FastAPI()


# ------------数据库操作依赖-----------
def get_database():
    db = ''
    try:
        db = session
        yield db
    finally:
        db.close()


# 增加商品类型
@app.post("/type", response_model=schemas.CommType)
async def add_type(comm_type: schemas.Type, db: Session = Depends(get_database)):
    return crud.db_create_type(comm_type=comm_type, db=db)


# 查询所有商品类型
@app.get("/type")
async def get_type(db: Session = Depends(get_database)):
    return crud.db_get_type(db=db)

