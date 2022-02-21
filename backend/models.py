from sqlalchemy import Column, String, Integer, DateTime, Boolean, TEXT, Table, ForeignKey, func, BIGINT
from sqlalchemy.orm import relationship

from database import Base


# 创建及操作时间的基类
class BaseTime:
    created_at = Column(
        DateTime(timezone=True),
        default=func.now(),
    )

    updated_at = Column(DateTime(timezone=True),
                        server_default=func.now(),
                        onupdate=func.now())


# SystemAdmin
# 系统中管理员的权限 System-Admin-Auth
class SysAdmin(Base, BaseTime):
    __tablename__ = "is_system_admin"

    id = Column(Integer, primary_key=True, comment="主键id")
    admin_name = Column(String(255), comment="管理员名称")
    password = Column(String(255), comment="登录密码")
    phone = Column(String(25), comment="联系方式")
    nickname = Column(String(255), comment="昵称")
    is_lock = Column(Boolean(), default=0, comment="该管理员状态是否有效")
    # contains
    admin = relationship("SysRoleAdmin", back_populates="admin")


# 系统管理员对应的角色
class SysRoleAdmin(Base, BaseTime):
    __tablename__ = "is_system_role_admin"
    id = Column(Integer, primary_key=True, comment="主键id")
    admin_id = Column(Integer, ForeignKey("is_system_admin.id"), comment="管理员id")
    role_id = Column(Integer, ForeignKey("is_system_role.id"), comment="角色id")
    # contains
    admin = relationship("SysAdmin", back_populates="admin")
    admin_role = relationship("SysRole", back_populates="admin_role")


# 系统管理员的角色
class SysRole(Base, BaseTime):
    __tablename__ = "is_system_role"
    id = Column(Integer, primary_key=True, comment="主键id")
    role_name = Column(String(255), comment="角色名称")
    remark = Column(String(255), comment="备注")
    is_lock = Column(Boolean, comment="该角色是否锁定")

    # contains
    role = relationship("SysRoleAuth", back_populates="role")
    admin_role = relationship("SysRoleAdmin", back_populates="admin_role")


# 角色对应的权限
class SysRoleAuth(Base, BaseTime):
    __tablename__ = "is_system_role_auth"
    id = Column(Integer, primary_key=True, comment="主键id")
    role_id = Column(Integer, ForeignKey("is_system_role.id"), comment="角色id")
    auth_id = Column(Integer, ForeignKey("is_system_auth.id"), comment="权限id")

    auth = relationship("SysAuth", back_populates="auth")
    role = relationship("SysRole", back_populates="role")


# 系统中的权限
class SysAuth(Base, BaseTime):
    __tablename__ = "is_system_auth"
    id = Column(Integer, primary_key=True, comment="主键id")
    authname = Column(String(255), comment="权限名称")
    controller = Column(String(255), comment="路由地址")
    remark = Column(String(255), comment="备注")
    title = Column(String(255), comment="操作名称")
    is_use = Column(Boolean, comment="是否推出该权限menu")
    is_lock = Column(Boolean, comment="是否弃用")

    # contains
    auth = relationship("SysRoleAuth", back_populates="auth")


# 仓库
class WareHouse(Base, BaseTime):
    __tablename__ = "is_warehouse"

    id = Column(Integer, primary_key=True, comment="主键id")
    address = Column(String(255), default="无", comment="仓库地址")
    warehouse_name = Column(String(255), comment="仓库名称")
    is_del = Column(Boolean(), default=0, comment="删除仓库(0:未删除,1:已删除)")
    del_time = Column(DateTime(timezone=True))
    appcation_id = Column(Integer, comment="应用系统id")


# 货物
class Freight(Base, BaseTime):
    __tablename__ = "is_freight"

    id = Column(Integer, primary_key=True, comment="主键id")
    appcation_id = Column(Integer, comment="应用系统id")
    freight_name = Column(String(255), comment="货物名称")
    freight_quantity = Column(Integer, comment="货物总数量")
    manufacture_factory = Column(String(255), comment="生产厂家")
    manufacture_time = Column(DateTime(timezone=True), comment="生产日期")
    freight_price = Column(Integer, comment="货物单价")
    warehouse_out_id = Column(Integer, comment="最近出库记录的id")
    warehouse_in_id = Column(Integer, comment="最近入库记录的id")
    warehouse_id = Column(Integer, ForeignKey("is_warehouse.id"), comment="仓库编码")
    is_del = Column(Boolean(), default=0, comment="删除货物(0:未删除,1:已删除)")
    del_time = Column(DateTime(timezone=True), comment="删除时间")
    property = Column(String(255), comment="其他属性")


# 入库
class WareHouseIn(Base, BaseTime):
    __tablename__ = "is_warehouse_in"

    id = Column(Integer, primary_key=True, comment="主键id")
    warehouseIn_time = Column(DateTime(timezone=True), comment="入库日期")
    amount = Column(String(255), comment="入库货物数量")
    name = Column(String(255), comment="货物名称")
    warehouse_id = Column(Integer, ForeignKey("is_warehouse.id"), comment="仓库编码")
    appcation_id = Column(Integer, comment="应用系统id")


# 出库
class WareHouseOut(Base, BaseTime):
    __tablename__ = "is_warehouse_out"

    id = Column(Integer, primary_key=True, comment="主键id")
    warehouseOut_time = Column(DateTime(timezone=True), comment="出库日期")
    amount = Column(Integer, comment="出库货物数量")
    freight_id = Column(Integer, ForeignKey('is_freight.id'), comment='货物编码')
    warehouse_id = Column(Integer, ForeignKey("is_warehouse.id"), comment="仓库编码")
    appcation_id = Column(Integer, comment="应用系统id")
    name = Column(String(255), comment="货物名称")


class Image(Base, BaseTime):
    __tablename__ = "is_image"

    id = Column(Integer, primary_key=True, comment="主键id")
    name = Column(String(255))
    uuid = Column(String(255))
    value = Column(TEXT, comment="路径")
    type = Column(String(255))


class Video(Base, BaseTime):
    __tablename__ = "is_video"

    id = Column(Integer, primary_key=True, comment="主键id")
    name = Column(String(255))
    uuid = Column(String(255))
    value = Column(TEXT, comment="路径")
    type = Column(String(255))


class Audio(Base, BaseTime):
    __tablename__ = "is_audio"

    id = Column(Integer, primary_key=True, comment="主键id")
    name = Column(String(255))
    uuid = Column(String(255))
    value = Column(TEXT, comment="路径")
    type = Column(String(255))


class Texts(Base, BaseTime):
    __tablename__ = "is_text"

    id = Column(Integer, primary_key=True, comment="主键id")
    name = Column(String(255))
    uuid = Column(String(255))
    value = Column(TEXT, comment="路径")
    type = Column(String(255))


class Int(Base, BaseTime):
    __tablename__ = "is_int"

    id = Column(Integer, primary_key=True, comment="主键id")
    name = Column(String(255))
    uuid = Column(String(255))
    value = Column(TEXT, comment="路径")
    type = Column(String(255))


class Float(Base, BaseTime):
    __tablename__ = "is_float"

    id = Column(Integer, primary_key=True, comment="主键id")
    name = Column(String(255))
    value = Column(TEXT, comment="路径")
    uuid = Column(String(255))
    type = Column(String(255))
