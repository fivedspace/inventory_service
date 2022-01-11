# 导入SQLAlchemy部分
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import env

link_mysql = env.MYSQL_USERNAME + ":" + env.MYSQL_PASSWORD + "@" + env.MYSQL_IP + ":" + env.MYSQL_PORT + "/" + env.MYSQL_DATABASE
engine = create_engine("mysql+pymysql://" + link_mysql)

# 相对路径下创建sqlite
# engine = create_engine('sqlite:///locker_machine.db')

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

