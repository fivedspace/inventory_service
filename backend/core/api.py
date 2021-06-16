#!/usr/bin/python3

from typing import List
from core import schemas
from sql_app import crud
from sqlalchemy.orm import Session
from sql_app.database import session
from fastapi import (Body,
                     Form,
                     Query,
                     File,
                     Depends,
                     FastAPI,
                     UploadFile,
                     HTTPException)
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.mount("/backend", StaticFiles(directory="resources"), name="static")

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


# 增加商品类型
@app.post("/type", response_model=schemas.CommType)
async def add_type(comm_type: schemas.Type,
                   db: Session = Depends(get_database)):
    return crud.db_create_type(comm_type=comm_type, db=db)


# 查询所有商品类型
@app.get("/type")
async def get_type(db: Session = Depends(get_database)):
    return crud.db_get_type(db=db)


# 修改指定商品类型
@app.patch("/type", response_model=schemas.CommType)
async def alter_type(modify_type: schemas.CommType,
                     db: Session = Depends(get_database)):
    return crud.db_modify_type(modify_type=modify_type, db=db)


# 删除商品
@app.delete("/type/{type_id}")
async def get_type(type_id: int, db: Session = Depends(get_database)):
    if type_id is None:
        raise HTTPException(status_code=404, detail="类型id错误或id不存在")
    return crud.db_del_type(type_id=type_id, db=db)


# 查询所有规格值数据类型
@app.get("/data_type", response_model=List[schemas.DataType])
async def get_datatype(db: Session = Depends(get_database)):
    return crud.db_get_datatype(db=db)


# 添加规格
@app.post("/create_spec", response_model=List[schemas.ReturnSpec])
async def add_spec(*,
                   spec: List[schemas.Spec] = Body(..., embed=True),
                   db: Session = Depends(get_database)):
    return crud.db_create_spec(spec=spec, db=db)


# 查询所有规格
@app.get("/spec", response_model=List[schemas.ReturnSpec])
async def get_all_spec(db: Session = Depends(get_database)):
    return crud.db_get_spec(db=db)


# 修改规格
@app.patch("/spec", response_model=schemas.ReturnSpec)
async def modify_spec(*,
                      spec_datatype: schemas.SpecDatatype,
                      db: Session = Depends(get_database)):

    return crud.db_modify_spec(spec_datatype=spec_datatype, db=db)


# 新增商品
@app.post("/commodity")
async def new_commodity(*,
                        commodity: schemas.Commodity,
                        db: Session = Depends(get_database)):

    return crud.db_create_commodity(commodity=commodity, db=db)


# 新增商品图片
@app.post("/commodity_image", response_model=List[schemas.Picture])
async def new_comm_image(*,
                         commodity_id: int = Form(...),
                         files: List[UploadFile] = File(...),
                         db: Session = Depends(get_database)):
    return crud.db_create_picture(commodity_id=commodity_id, files=files, db=db)


# 修改商品
@app.patch("/commodity")
async def alter_commodity(modify_commodity: schemas.ModifyCommodity,
                          db: Session = Depends(get_database)):
    return crud.db_modify_commodity(modify_commodity=modify_commodity, db=db)


# 查询指定商品
@app.get('/commodity/{commodity_id}')
async def get_commodity(commodity_id: int, db: Session = Depends(get_database)):
    return crud.db_assign_commodity(commodity_id=commodity_id, db=db)


# # 修改商品图片
# @app.patch("/commodity_image")
# async def alter_comm_image(
#                             files: List[UploadFile] = File(...),
#                             db: Session = Depends(get_database)):
#     return modify_id

