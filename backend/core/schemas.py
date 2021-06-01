#!/usr/bin/python3

from typing import List, Optional
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


class ReturnSpec(AddSpec):
    data_type: str = Field(..., min_length=1, description='数据类型')


