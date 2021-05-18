#!/usr/bin/python3

from typing import List, Optional
from pydantic import Field, BaseModel


class Type(BaseModel):
    type: int


# 新增商品
class Picture(BaseModel):
    type_id: int


class Specification(BaseModel):
    spec_id: int
    spec_info_val: str


class AddCommodityIn(BaseModel):
    commodity_id: Optional[int] = None
    commodity_name: str
    quantity_in_stock: int
    type: List[Type]
    picture: List[Picture]
    spec: List[Specification]
    remark: str


class AddCommodityOut(BaseModel):
    commodity_id: int
    commodity_name: str
    quantity_in_stock: int
    type: List[Type]
    picture: List[Picture]
    spec: List[Specification]
    remark: str

    class Config:
        orm_mode = True


# # 修改商品
# class ModifyCommodityIn(BaseModel):
#     commodity_id: int
#     commodity_name: str
#     quantity_in_stock: int
#     type: List[Type]
#     picture: List[Picture]
#     spec: List[Specification]
#     remark: str


# class ModifyCommodityOut(BaseModel):
#     commodity_id: int
#     commodity_name: str
#     quantity_in_stock: int
#     type: List[Type]
#     picture: List[Picture]
#     spec: List[Specification]
#     remark: str


# 类型商品
# class TypeID(BaseModel):
#     commodity_type: List[type]
#
#
# class AllTypeCommodityOut(BaseModel):
#     all_type: List[ModifyCommodityOut]


# # 查询商品
# class GetCommodity(BaseModel):
#     commodity_id: int
#     commodity_name: str
#     quantity_in_stock: int
#     type: List[Type]
#     picture: List[Picture]
#     property: dict
#     remark: str


# 增加类型
class AddTypeName(BaseModel):
    type_id: Optional[int] = None
    typename: str


# 修改类型
class ModifyTypeName(BaseModel):
    type_id: int
    typename: str

# ------------------------------
