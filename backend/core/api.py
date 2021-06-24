#!/usr/bin/python3

from typing import List
from core import schemas
from sql_app import crud
from sqlalchemy.orm import Session
from sql_app.database import session
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from fastapi import (Body, Form,
                     File, Query, Depends,
                     FastAPI, UploadFile, APIRouter)

app = FastAPI()
app.mount("/backend", StaticFiles(directory="resources"), name="static")


# 跨域
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ------------------数据库操作依赖------------------
def get_database():
    db = ''
    try:
        db = session
        yield db
    finally:
        db.close()


# 注册路由
type_router = APIRouter(tags=["Type"])
data_type_router = APIRouter(tags=["Data_type"])
spec_router = APIRouter(tags=["Spec"])
commodity_router = APIRouter(tags=["Commodity"])


# 增加商品类型
@type_router.post("/type", response_model=schemas.CommType)
async def add_type(comm_type: schemas.Type,
                   db: Session = Depends(get_database)):
    return crud.db_create_type(comm_type=comm_type, db=db)


# 查询所有商品类型
@type_router.get("/type")
async def get_type(db: Session = Depends(get_database)):
    return crud.db_get_type(db=db)


# 修改指定商品类型
@type_router.patch("/type", response_model=schemas.CommType)
async def alter_type(modify_type: schemas.CommType,
                     db: Session = Depends(get_database)):
    return crud.db_modify_type(modify_type=modify_type, db=db)


# 删除商品类型
@type_router.delete("/type/{type_id}")
async def del_type(type_id: int, db: Session = Depends(get_database)):
    return crud.db_del_type(type_id=type_id, db=db)


# 查询所有规格值数据类型
@data_type_router.get("/data_type", response_model=List[schemas.DataType])
async def get_datatype(db: Session = Depends(get_database)):
    return crud.db_get_datatype(db=db)


# 添加规格
@spec_router.post("/spec/create_spec", response_model=List[schemas.ReturnSpec])
async def add_spec(*,
                   spec: List[schemas.Spec] = Body(..., embed=True),
                   db: Session = Depends(get_database)):
    return crud.db_create_spec(spec=spec, db=db)


# 查询所有规格
@spec_router.get("/spec", response_model=List[schemas.ReturnSpec])
async def get_all_spec(db: Session = Depends(get_database)):
    return crud.db_get_spec(db=db)


# 修改规格
@spec_router.patch("/spec", response_model=schemas.ReturnSpec)
async def modify_spec(*,
                      spec_datatype: schemas.SpecDatatype,
                      db: Session = Depends(get_database)):

    return crud.db_modify_spec(spec_datatype=spec_datatype, db=db)


# 新增商品
@commodity_router.post("/commodity")
async def new_commodity(*,
                        commodity: schemas.Commodity,
                        db: Session = Depends(get_database)):

    return crud.db_create_commodity(commodity=commodity, db=db)


# 新增商品图片
@commodity_router.post("/commodity/commodity_image", response_model=List[schemas.Picture])
async def new_comm_image(*,
                         commodity_id: int = Form(...),
                         files: List[UploadFile] = File(...),
                         db: Session = Depends(get_database)):
    return crud.db_create_picture(commodity_id=commodity_id, files=files, db=db)


# 修改商品
@commodity_router.patch("/commodity")
async def alter_commodity(modify_commodity: schemas.ModifyCommodity,
                          db: Session = Depends(get_database)):
    return crud.db_modify_commodity(modify_commodity=modify_commodity, db=db)


# 修改商品图片
@commodity_router.patch("/commodity/commodity_image")
async def alter_comm_image(commodity_id: int = Form(...),
                           files: List[UploadFile] = File(...),
                           db: Session = Depends(get_database)):
    return crud.db_modify_images(commodity_id=commodity_id, files=files, db=db)


# 查询指定商品
@commodity_router.get('/commodity/{commodity_id}')
async def get_commodity(commodity_id: int, db: Session = Depends(get_database)):
    return crud.db_assign_commodity(commodity_id=commodity_id, db=db)


# 查询所有商品
@commodity_router.get("/commodity", response_model=List[schemas.AllCommodity])
async def get_all_commodity(db: Session = Depends(get_database)):
    return crud.fetchall_commodity(db=db)


# 根据类型查商品
@commodity_router.get("/commodity/type_commodity")
async def get_type_commodity(type_id: List[int] = Query(...),
                             db: Session = Depends(get_database)):
    return crud.fetch_type_commodity(type_id=type_id, db=db)


# 删除商品
@commodity_router.delete("/commodity/{commodity_id}")
async def del_commodity(commodity_id: int, db: Session = Depends(get_database)):
    return crud.db_del_commodity(commodity_id=commodity_id, db=db)