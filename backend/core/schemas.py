#!/usr/bin/python3

from typing import List
from pydantic import BaseModel, Field


class Type(BaseModel):
    type: str = Field(min_length=1, description='类型名称')


# 类型相关验证
class CommType(Type):
    type_id: int

    class Config:
        orm_mode = True


# 数据类型
class DataType(BaseModel):
    data_type_id: int = Field(..., description='数据类型id')
    data_type: str = Field(..., min_length=1, description='数据类型')

    class Config:
        orm_mode = True


# 商品规格
class Spec(BaseModel):
    spec_name: str = Field(..., min_length=1, description='规格名称')
    data_type_id: int = Field(..., description='规格值数据类型id')
    spec_remark: str = Field(..., min_length=1, description='规格的描述')


class AddSpec(BaseModel):
    spec_id: int
    spec_name: str = Field(..., min_length=1, description='规格名称')
    spec_remark: str = Field(..., min_length=1, description='规格的描述')


class SpecDatatype(AddSpec):
    data_type_id: int = Field(..., description='规格值数据类型id')

    class Config:
        orm_mode = True


class ReturnSpec(AddSpec):
    data_type: str = Field(..., min_length=1, description='数据类型')

    class Config:
        orm_mode = True


# 商品
class TypeID(BaseModel):
    type_id: int


class CommSpec(BaseModel):
    spec_id: int = Field(..., description='规格值id')
    spec_info_val: str = Field(..., description='规格值')


class Commodity(BaseModel):
    commodity_name: str = Field(..., min_length=1, description="商品名称")
    quantity_in_stock: int = Field(..., description="商品库存数量")
    type: List[TypeID] = Field(..., description="商品类型id")
    spec: List[CommSpec] = Field(..., description='商品规格')
    remark: str = Field(..., description="商品描述信息")


class ModifyCommodity(Commodity):
    commodity_id: int = Field(..., description="商品id")


# 商品图片
class Picture(BaseModel):
    picture_id: int = Field(..., description="图片id")
    path: str = Field(..., description="图片名称")
    picture_name: str = Field(..., description="图片路径")

    class Config:
        orm_mode = True


# 所有商品
class AllCommodity(BaseModel):
    commodity_id: int
    commodity_name: str = Field(..., description="商品名称")
    quantity_in_stock: int = Field(..., description="库存数量")
    remark: str = Field(..., description="商品备注")


class Data(BaseModel):
    data: List[AllCommodity]
    page_count: int = Field(..., description="总页数")
