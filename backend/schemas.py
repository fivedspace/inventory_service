from pydantic import BaseModel
from pydantic.fields import Field
from typing import List, Any
from datetime import datetime


# class Base(BaseModel):
#     status: int = Field(title="返回结果状态码", description="返回结果状态码")
#     content: str = Field(title="对status状态码说明", description="对status状态码说明")
#     data: dict = Field(title="返回请求数据", description="饭后请求数据")


class BasePage(BaseModel):
    """
    分页信息
    """
    page: int = Field(None, title="当前页码")
    size: int = Field(None, title="页大小")
    count: int = Field(None, title="数据总条数")
    page_count: int = Field(None, title="总页数")


class ReqBasePage(BaseModel):
    """
    基础页数模型
    """
    page: int = Field(title="页数", description="页数")
    size: int = Field(title="每页显示大小", description="每页显示大小")


# Admin
class SignUp(BaseModel):
    number: str = Field(title='手机号或者邮箱', description='手机号或者邮箱')
    pwd: str = Field(title='密码', description='密码')
    verify_code: str = Field(title='验证码', description='验证码')


class LogInByPwd(BaseModel):
    number: str = Field(title='手机号或者邮箱', description='手机号或者邮箱')
    pwd: str = Field(title='密码', description='密码')
    client_code: str = Field(title='客户端验证码', description='客户端验证码')
    callback_url: str = Field(title='系统回调地址', description='系统回调地址')


class LogInBycode(BaseModel):
    number: str = Field(title='手机号或者邮箱', description='手机号或者邮箱')
    verify_code: str = Field(title='手机或邮箱验证码', description='手机或邮箱验证码')
    callback_url: str = Field(title='系统回调地址', description='系统回调地址')


class ChangePwd(BaseModel):
    token: str = Field(title='Token', description='Token')
    old_pwd: str = Field(title='旧密码', description='旧密码')
    new_pwd: str = Field(title='新密码', description='新密码')


class AuditBase(BaseModel):
    created_at: datetime = Field(title='创建时间', description='创建时间')
    updated_at: datetime = Field(title='更新时间', description='更新时间')


# 上传文件
class uploadingBase(BaseModel):
    name: str = Field(title="文件名称", description="文件名称")
    type: str = Field(title="文件类型", description="(image/video/audio/text/int/float)")
    value: str = Field(title="值", description="值")


class uploading(uploadingBase):
    uuid: str = Field(title="uuid", description="uuid")

    class Config:
        orm_mode = True


class uploadingPage(BasePage):
    data: List[uploading] = Field(title="文件列表", description="文件列表")


#  WareHouse
class ReqCreateWareHouse(BaseModel):
    warehouse_name: str = Field(title="仓库名称", description="仓库名称")
    address: str = Field(None, title="仓库地址", description="仓库地址")

    class Config:
        orm_mode = True


class RespWareHouseBase(ReqCreateWareHouse):
    appcation_id: int = Field(title="应用系统id", description="应用系统id")

    class Config:
        orm_mode = True


class RespWareHouse(RespWareHouseBase, AuditBase):
    id: int = Field(title="仓库id", description="仓库id")

    class Config:
        orm_mode = True


class WarehousePage(BasePage):
    data: List[RespWareHouse] = Field(title="仓库列表", description="仓库列表")


# Freight
class ReqCreateFreight(BaseModel):
    freight_name: str = Field(title="货物名称", description="货物名称")
    freight_quantity: int = Field(title="货物总数量", description="货物总数量")
    manufacture_factory: str = Field(None, title="生产厂家", description="生产厂家")
    manufacture_time: datetime = Field(None, title="生产时间", description="生产时间")
    freight_price: int = Field(title="货物单价", description="货物单价")
    warehouse_out_id: int = Field(None, title="最近出库记录id", description="最近出库记录id")
    warehouse_in_id: int = Field(None, title="最近入库记录id", description="最近入库记录id")
    warehouse_id: int = Field(title="仓库id", description="仓库id")
    appcation_id: int = Field(title="应用系统id", description="应用系统id")
    property: List[uploading] = Field(None, title="货物属性", description='货物属性')

    class Config:
        orm_mode = True


class RespFreight(ReqCreateFreight, AuditBase):
    id: int = Field(title="货物id", description="货物id")

    class Config:
        orm_mode = True


class FreightPage(BasePage):
    data: List[RespFreight] = Field(title="货物列表", description="货物列表")


# WareHouseIn

class WareHouseInBase(BaseModel):
    name: str = Field(title="属性名", description="属性名")
    type: str = Field(title='属性类型', description="属性类型")
    uuid: str = Field(title="uuid", description="uuid")

    class Config:
        orm_mode = True


class ReqWareHouseIn(BaseModel):
    freight_name: str = Field(title="货物名称", description="货物名称")
    purchase_quantity: int = Field(title="入货数量", description="入货数量")
    manufacture_factory: str = Field(None, title="生产厂家", description="生产厂家")
    manufacture_time: datetime = Field(None, title="生产时间", description="生产时间")
    freight_price: int = Field(title="货物单价", description="货物单价")
    warehouseIn_time: datetime = Field(title="入库时间", description="入库时间")
    warehouse_id: int = Field(title="仓库id", description="仓库id")
    appcation_id: int = Field(title="应用系统id", description="应用系统id")
    property: List[WareHouseInBase] = Field(None, title="货物属性", description='货物属性')

    class Config:
        orm_mode = True


class ReqUpdateFreight(BaseModel):
    freight_name: str = Field(title="货物名称", description="货物名称")
    purchase_quantity: int = Field(title="入货数量", description="入货数量")
    manufacture_factory: str = Field(title="生产厂家", description="生产厂家")
    manufacture_time: datetime = Field(title="生产时间", description="生产时间")
    freight_price: int = Field(title="货物单价", description="货物单价")
    warehouseIn_time: datetime = Field(title="入库时间", description="入库时间")
    warehouse_id: int = Field(title="仓库id", description="仓库id")
    appcation_id: int = Field(title="应用系统id", description="应用系统id")
    property: List[uploading] = Field(None, title="货物属性", description='货物属性')

    class Config:
        orm_mode = True


# WareHouseOut
class ReqWareHouseOut(BaseModel):
    freight_id: int = Field(title="货物id", description="货物id")
    freight_name: str = Field(title="货物名称", description="货物名称")
    shipment: int = Field(title="出货数量", description="出货数量")
    warehouseOut_time: datetime = Field(title="出库时间", description="出库时间")
    warehouse_id: int = Field(title="仓库id", description="仓库id")
    appcation_id: int = Field(title="应用系统id", description="应用系统id")


# application
class ApplicationBase(BaseModel):
    name: str = Field(title='应用系统名称', description='应用系统名称')
    key: str = Field(title='约定字符串用于签名', description='应用与订单系统约定的值')
    email: str = Field(title='系统的邮箱', description='系统的邮箱')
    admin_name: str = Field(title='系统管理员姓名', description='系统管理员姓名')
    admin_phone: str = Field(title='系统管理员手机号', description='系统管理员手机号')
    ip: str = Field(title='应用系统的ip地址', description='应用系统的ip')
    remark: str = Field(None, title='备注', description='json格式备注')


class Application(ApplicationBase, AuditBase):
    id: int = Field(title='应用系统id', description='应用系统id')

    class Config:
        orm_mode = True


# 分页返回的应用
class ApplicationPage(BasePage):
    data: List[Application] = Field(title='应用系统列表', description='应用系统列表')

    class Config:
        orm_mode = True
