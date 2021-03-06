# 导入SQLAlchemy部分
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import env

link_mysql = env.MYSQL_USERNAME + ":" + env.MYSQL_PASSWORD + "@" + env.MYSQL_IP + ":" + env.MYSQL_PORT + "/" + env.MYSQL_DATABASE
engine = create_engine("mysql+pymysql://" + link_mysql, pool_pre_ping=True, pool_recycle=86400)

# 相对路径下创建sqlite
# engine = create_engine('sqlite:///locker_machine.db')

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


def to_dict(self):
    return {c.name: getattr(self, c.name, None) for c in self.__table__.columns}


Base.to_dict = to_dict

