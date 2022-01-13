""" 配置文件 """
MYSQL_USERNAME = "root"
MYSQL_PASSWORD = ""
MYSQL_DATABASE = "inventory_system"
MYSQL_PORT = "3306"
MYSQL_IP = "localhost"
HOST_IP = "localhost"
# HOST_IP = "172.16.2.110"

HOST_PORT = 8002

# 单点登录桥接配置   SINGLE_SIGN_ON
SINGLE_SIGN_ON_IP = "localhost"
# SINGLE_SIGN_ON_IP = "http://172.16.2.110"
SINGLE_SIGN_ON_PORT = "8008"
SINGLE_SIGN_ON_BASE = SINGLE_SIGN_ON_IP+":"+SINGLE_SIGN_ON_PORT
SINGLE_SIGN_ON_USER = SINGLE_SIGN_ON_BASE+"/users"
SINGLE_SIGN_ON_CODE = SINGLE_SIGN_ON_BASE+"/code"

# -------- redis 配置 ----------
REDIS_HOST: str = "localhost"
REDIS_PASSWORD: str = ""
REDIS_DB: int = 1
REDIS_PORT: int = 6379
