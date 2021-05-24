#!/usr/bin/python3
from typing import List, Optional
from pydantic import BaseModel, Field


class Type(BaseModel):
    type: str = Field(min_length=1, description='类型名称')


class CommType(Type):
    type_id: int

    class Config:
        orm_mode = True




