#!/usr/bin/python3
import sys

sys.path.append('../')

from core import schemas
from sql_app.database import session
from fastapi import FastAPI


app = FastAPI()


# ------------数据库操作依赖-----------
def get_database():
    global db
    try:
        db = session
        yield db
    finally:
        db.close()


@app.post("/commodity", response_model=schemas.AddCommodityOut)  # 完成
async def add_commodity(addcommodity: schemas.AddCommodityIn):
    """
    新增商品
    :param addcommodity: 新增请求体
    :return:
    """
    # if addcommodity:
    #     session.add(addcommodity)
    #     session.commit()
    #     session.close()
    return addcommodity


# @app.patch("/commodity", response_model=schemas.ModifyCommodityOut)   # 完成
# async def modify_commodity(modifycommodity: schemas.ModifyCommodityIn):
#     """
#     修改商品
#     :param modifycommodity:修改请求体
#     :return:
#     """
#     return modifycommodity


# @app.get("/commodity/", response_model=schemas.AllTypeCommodityOut)
# async def type_commodity(typeid: schemas.TypeID):
#     """
#     所有类型商品
#     :param typeid:
#     :return:
#     """
#     return typeid

# @app.get("/commodity/{commodity_id}")  # 有问题
# async def get_one_commodity(commodity_id: int,):
#     """
#     查询指定商品信息
#     :param commodity_id: 商品id
#     :return:
#     """
#     result = {
#         "commodity_id": commodity_id,
#         "commodity_name": str,
#         "quantity_in_stock": int,
#         "type": [
#             {
#                 "type_id": int,
#                 "type": str
#             },
#             {
#                 "type_id": int,
#                 "type": str
#             }
#         ],
#         "picture": [
#             {
#                 "picture_name": str,
#                 "picture_file": str
#             },
#             {
#                 "picture_name": str,
#                 "picture_file": str
#             }
#         ],
#         "spec": [
#             {
#                 "spec_id": int,
#                 "spec_name": str,
#                 "spec_info_val": str
#             },
#             {
#                 "spec_id": int,
#                 "spec_name": str,
#                 "spec_info_val": str
#             }
#         ],
#         "remark": str
#     }
#     return result


# @app.delete("/commodity/{commodity_id}")  # 完成
# async def modify_commodity(commodity_id: int):
#     """
#     删除商品
#     :param commodity_id:
#     :return:
#     """
#     return {"Stat": 200, "Msg": "Success！"}
#
#
# @app.post('/type', response_model=schemas.AddTypeName)  # 完成
# async def add_commodity_type(addtypename: schemas.AddTypeName):
#     """
#     增加商品类型
#     :param addtype:
#     :return:
#     """
#     return addtypename


# @app.patch('/type', response_model=schemas.ModifyTypeName)
# async def modify_type(modifytypename: schemas.ModifyTypeName):
#     """
#     修改商品类型
#     :param addtype:
#     :return:
#     """
#     return modifytypename


# @app.get('type')
# async def all_type():
#     """
#     查询所有类型
#     :return:
#     """

# @app.get('type')
# async def all_type():


# @app.delete("/type/{type_id}")
# async def del_type(type_id: int):
#     """
#     删除商品类型
#     :param type_id: 接收 int 类型参数 id
#     :return:
#     """
#     return {"Stat": 200, "Msg": "Success！"}

# ---------------------------------------------------
